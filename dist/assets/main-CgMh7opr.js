(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const ig="modulepreload",cg=function(n){return"/"+n},rl={},Be=function(e,t,r){let o=Promise.resolve();if(t&&t.length>0){let d=function(h){return Promise.all(h.map(g=>Promise.resolve(g).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};var i=d;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=d(t.map(h=>{if(h=cg(h),h in rl)return;rl[h]=!0;const g=h.endsWith(".css"),m=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${m}`))return;const v=document.createElement("link");if(v.rel=g?"stylesheet":ig,g||(v.as="script"),v.crossOrigin="",v.href=h,c&&v.setAttribute("nonce",c),document.head.appendChild(v),g)return new Promise((b,_)=>{v.addEventListener("load",b),v.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return o.then(l=>{for(const c of l||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})};function Yt({title:n="",content:e="",onClose:t=null}){console.log("🔧 Modal sendo criado com:",{title:n,content:e.substring(0,100)+"..."});const r=document.createElement("div");r.id="app-modal",r.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",r.onclick=s=>{s.target===r&&t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()};const o=document.createElement("div");return o.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",o.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,r.appendChild(o),o.querySelector("#modal-close-btn").onclick=s=>{s.stopPropagation(),t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),console.log("🔧 Modal criado:",r),console.log("🔧 Modal HTML:",r.outerHTML.substring(0,200)+"..."),r}function lg({onSubmit:n,initialData:e={}}){const t=document.createElement("form");t.className="space-y-4",t.innerHTML=`
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
        ${(window.appState.categories||[]).sort((o,s)=>o.nome.localeCompare(s.nome,"pt-BR",{sensitivity:"base"})).map(o=>{const s=new Date,i=s.getFullYear(),l=s.getMonth()+1,d=(window.appState.transactions||[]).filter(v=>{if(v.categoriaId!==o.id||v.tipo!==o.tipo)return!1;let b;v.createdAt&&typeof v.createdAt=="object"&&v.createdAt.seconds?b=new Date(v.createdAt.seconds*1e3):b=new Date(v.createdAt);const _=b.getFullYear(),S=b.getMonth()+1;return _===i&&S===l}).reduce((v,b)=>v+parseFloat(b.valor),0),h=parseFloat(o.limite||0),g=o.tipo==="receita"?d:h-d;let m=o.nome;return h>0&&(m+=` - Limite: R$ ${h.toFixed(2)}`,o.tipo==="despesa"?m+=` (Disponível: R$ ${Math.max(0,g).toFixed(2)})`:m+=` (Recebido: R$ ${d.toFixed(2)})`),`<option value="${o.id}" ${e.categoriaId===o.id?"selected":""} style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 8px;">${m}</option>`}).join("")}
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
  `;function r(){const o=document.getElementById("rec-valor"),s=document.getElementById("rec-parcelas"),i=t.querySelector('input[name="tipo-valor"]:checked'),l=o&&parseFloat(o.value)||0,c=s&&parseInt(s.value)||0,d=i?i.value:"total",h=document.getElementById("recorrente-valores-info");if(c>1&&l>0)if(d==="total"){const g=l/c;h.innerHTML=`<b>Valor total:</b> R$ ${l.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${g.toFixed(2)}`}else{const g=l*c;h.innerHTML=`<b>Valor total:</b> R$ ${g.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${l.toFixed(2)}`}else l>0?h.innerHTML=`<b>Valor:</b> R$ ${l.toFixed(2)}`:h.innerHTML=""}return t.querySelector("#rec-valor").addEventListener("input",r),t.querySelector("#rec-parcelas").addEventListener("input",r),t.querySelectorAll('input[name="tipo-valor"]').forEach(o=>{o.addEventListener("change",r)}),setTimeout(()=>{if(r(),!t.querySelector('input[name="tipo-valor"]:checked')){const i=t.querySelector('input[name="tipo-valor"][value="total"]');i&&(i.checked=!0,i.dispatchEvent(new Event("change")))}const s=t.querySelector("#rec-efetivar");if(s){const i=e.efetivarMesAtual===!0||e.efetivarMesAtual==="true";s.checked=i}},100),t.addEventListener("submit",o=>{o.preventDefault();const s=parseFloat(document.getElementById("rec-valor").value);let i=document.getElementById("rec-parcelas").value?parseInt(document.getElementById("rec-parcelas").value):null;i!==null&&i<1&&(i=null);const l=t.querySelector('input[name="tipo-valor"]:checked').value;let c=s,d=s;i&&i>1?l==="total"?(c=+(s/i).toFixed(2),d=+(c.toFixed(2)*i).toFixed(2)):(c=+s.toFixed(2),d=+(c*i).toFixed(2)):(c=+s.toFixed(2),d=+s.toFixed(2));const h={descricao:document.getElementById("rec-desc").value,valor:c,valorTotal:d,categoriaId:document.getElementById("rec-categoria").value,dataInicio:document.getElementById("rec-data").value,parcelasRestantes:i,parcelasTotal:i,ativa:!0,efetivarMesAtual:document.getElementById("rec-efetivar").checked};n(h)}),t}const dg=()=>{};var ol={};/**
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
 */const Vd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let o=n.charCodeAt(r);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},ug=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const o=n[t++];if(o<128)e[r++]=String.fromCharCode(o);else if(o>191&&o<224){const s=n[t++];e[r++]=String.fromCharCode((o&31)<<6|s&63)}else if(o>239&&o<365){const s=n[t++],i=n[t++],l=n[t++],c=((o&7)<<18|(s&63)<<12|(i&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],i=n[t++];e[r++]=String.fromCharCode((o&15)<<12|(s&63)<<6|i&63)}}return e.join("")},Od={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<n.length;o+=3){const s=n[o],i=o+1<n.length,l=i?n[o+1]:0,c=o+2<n.length,d=c?n[o+2]:0,h=s>>2,g=(s&3)<<4|l>>4;let m=(l&15)<<2|d>>6,v=d&63;c||(v=64,i||(m=64)),r.push(t[h],t[g],t[m],t[v])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ug(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<n.length;){const s=t[n.charAt(o++)],l=o<n.length?t[n.charAt(o)]:0;++o;const d=o<n.length?t[n.charAt(o)]:64;++o;const g=o<n.length?t[n.charAt(o)]:64;if(++o,s==null||l==null||d==null||g==null)throw new hg;const m=s<<2|l>>4;if(r.push(m),d!==64){const v=l<<4&240|d>>2;if(r.push(v),g!==64){const b=d<<6&192|g;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class hg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pg=function(n){const e=Vd(n);return Od.encodeByteArray(e,!0)},qo=function(n){return pg(n).replace(/\./g,"")},Fd=function(n){try{return Od.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function gg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fg=()=>gg().__FIREBASE_DEFAULTS__,mg=()=>{if(typeof process>"u"||typeof ol>"u")return;const n=ol.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},wg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Fd(n[1]);return e&&JSON.parse(e)},ds=()=>{try{return dg()||fg()||mg()||wg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$d=n=>ds()?.emulatorHosts?.[n],yg=n=>{const e=$d(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Bd=()=>ds()?.config,Ud=n=>ds()?.[`_${n}`];/**
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
 */class vg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Kn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function zd(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function bg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",o=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i={iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[qo(JSON.stringify(t)),qo(JSON.stringify(i)),""].join(".")}const br={};function _g(){const n={prod:[],emulator:[]};for(const e of Object.keys(br))br[e]?n.emulator.push(e):n.prod.push(e);return n}function xg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let sl=!1;function qd(n,e){if(typeof window>"u"||typeof document>"u"||!Kn(window.location.host)||br[n]===e||br[n]||sl)return;br[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=_g().prod.length>0;function i(){const m=document.getElementById(r);m&&m.remove()}function l(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function c(m,v){m.setAttribute("width","24"),m.setAttribute("id",v),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function d(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{sl=!0,i()},m}function h(m,v){m.setAttribute("id",v),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function g(){const m=xg(r),v=t("text"),b=document.getElementById(v)||document.createElement("span"),_=t("learnmore"),S=document.getElementById(_)||document.createElement("a"),N=t("preprendIcon"),M=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const F=m.element;l(F),h(S,_);const Z=d();c(M,N),F.append(M,b,S,Z),document.body.appendChild(F)}s?(b.innerText="Preview backend disconnected.",M.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(M.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,b.innerText="Preview backend running in this workspace."),b.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
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
 */function Le(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Eg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Le())}function Tg(){const n=ds()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ig(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ag(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function kg(){const n=Le();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Cg(){return!Tg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Rg(){try{return typeof indexedDB=="object"}catch{return!1}}function Pg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{e(o.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const Dg="FirebaseError";class At extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Dg,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jr.prototype.create)}}class jr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},o=`${this.service}/${e}`,s=this.errors[e],i=s?Ng(s,r):"Error",l=`${this.serviceName}: ${i} (${o}).`;return new At(o,l,r)}}function Ng(n,e){return n.replace(Mg,(t,r)=>{const o=e[r];return o!=null?String(o):`<${r}?>`})}const Mg=/\{\$([^}]+)}/g;function Lg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function xt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const o of t){if(!r.includes(o))return!1;const s=n[o],i=e[o];if(al(s)&&al(i)){if(!xt(s,i))return!1}else if(s!==i)return!1}for(const o of r)if(!t.includes(o))return!1;return!0}function al(n){return n!==null&&typeof n=="object"}/**
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
 */function Hr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Vg(n,e){const t=new Og(n,e);return t.subscribe.bind(t)}class Og{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let o;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Fg(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:r},o.next===void 0&&(o.next=ua),o.error===void 0&&(o.error=ua),o.complete===void 0&&(o.complete=ua);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Fg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ua(){}/**
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
 */function ke(n){return n&&n._delegate?n._delegate:n}class dn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const sn="[DEFAULT]";/**
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
 */class $g{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new vg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ug(e))try{this.getOrInitializeService({instanceIdentifier:sn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:o});r.resolve(s)}catch{}}}}clearInstance(e=sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=sn){return this.instances.has(e)}getOptions(e=sn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,i]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&i.resolve(o)}return o}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(r)??new Set;o.add(e),this.onInitCallbacks.set(r,o);const s=this.instances.get(r);return s&&e(s,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const o of r)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Bg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=sn){return this.component?this.component.multipleInstances?e:sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Bg(n){return n===sn?void 0:n}function Ug(n){return n.instantiationMode==="EAGER"}/**
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
 */class zg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new $g(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Q||(Q={}));const qg={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},jg=Q.INFO,Hg={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},Gg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),o=Hg[e];if(o)console[o](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ya{constructor(e){this.name=e,this._logLevel=jg,this._logHandler=Gg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}const Wg=(n,e)=>e.some(t=>n instanceof t);let il,cl;function Kg(){return il||(il=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xg(){return cl||(cl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const jd=new WeakMap,Ta=new WeakMap,Hd=new WeakMap,ha=new WeakMap,Ja=new WeakMap;function Qg(n){const e=new Promise((t,r)=>{const o=()=>{n.removeEventListener("success",s),n.removeEventListener("error",i)},s=()=>{t(Vt(n.result)),o()},i=()=>{r(n.error),o()};n.addEventListener("success",s),n.addEventListener("error",i)});return e.then(t=>{t instanceof IDBCursor&&jd.set(t,n)}).catch(()=>{}),Ja.set(e,n),e}function Yg(n){if(Ta.has(n))return;const e=new Promise((t,r)=>{const o=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",i),n.removeEventListener("abort",i)},s=()=>{t(),o()},i=()=>{r(n.error||new DOMException("AbortError","AbortError")),o()};n.addEventListener("complete",s),n.addEventListener("error",i),n.addEventListener("abort",i)});Ta.set(n,e)}let Sa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ta.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Hd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Vt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Jg(n){Sa=n(Sa)}function Zg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(pa(this),e,...t);return Hd.set(r,e.sort?e.sort():[e]),Vt(r)}:Xg().includes(n)?function(...e){return n.apply(pa(this),e),Vt(jd.get(this))}:function(...e){return Vt(n.apply(pa(this),e))}}function ef(n){return typeof n=="function"?Zg(n):(n instanceof IDBTransaction&&Yg(n),Wg(n,Kg())?new Proxy(n,Sa):n)}function Vt(n){if(n instanceof IDBRequest)return Qg(n);if(ha.has(n))return ha.get(n);const e=ef(n);return e!==n&&(ha.set(n,e),Ja.set(e,n)),e}const pa=n=>Ja.get(n);function tf(n,e,{blocked:t,upgrade:r,blocking:o,terminated:s}={}){const i=indexedDB.open(n,e),l=Vt(i);return r&&i.addEventListener("upgradeneeded",c=>{r(Vt(i.result),c.oldVersion,c.newVersion,Vt(i.transaction),c)}),t&&i.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),o&&c.addEventListener("versionchange",d=>o(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const nf=["get","getKey","getAll","getAllKeys","count"],rf=["put","add","delete","clear"],ga=new Map;function ll(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ga.get(e))return ga.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,o=rf.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(o||nf.includes(t)))return;const s=async function(i,...l){const c=this.transaction(i,o?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),o&&c.done]))[0]};return ga.set(e,s),s}Jg(n=>({...n,get:(e,t,r)=>ll(e,t)||n.get(e,t,r),has:(e,t)=>!!ll(e,t)||n.has(e,t)}));/**
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
 */class of{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(sf(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function sf(n){return n.getComponent()?.type==="VERSION"}const Ia="@firebase/app",dl="0.14.0";/**
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
 */const Et=new Ya("@firebase/app"),af="@firebase/app-compat",cf="@firebase/analytics-compat",lf="@firebase/analytics",df="@firebase/app-check-compat",uf="@firebase/app-check",hf="@firebase/auth",pf="@firebase/auth-compat",gf="@firebase/database",ff="@firebase/data-connect",mf="@firebase/database-compat",wf="@firebase/functions",yf="@firebase/functions-compat",vf="@firebase/installations",bf="@firebase/installations-compat",_f="@firebase/messaging",xf="@firebase/messaging-compat",Ef="@firebase/performance",Tf="@firebase/performance-compat",Sf="@firebase/remote-config",If="@firebase/remote-config-compat",Af="@firebase/storage",kf="@firebase/storage-compat",Cf="@firebase/firestore",Rf="@firebase/ai",Pf="@firebase/firestore-compat",Df="firebase",Nf="12.0.0";/**
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
 */const Aa="[DEFAULT]",Mf={[Ia]:"fire-core",[af]:"fire-core-compat",[lf]:"fire-analytics",[cf]:"fire-analytics-compat",[uf]:"fire-app-check",[df]:"fire-app-check-compat",[hf]:"fire-auth",[pf]:"fire-auth-compat",[gf]:"fire-rtdb",[ff]:"fire-data-connect",[mf]:"fire-rtdb-compat",[wf]:"fire-fn",[yf]:"fire-fn-compat",[vf]:"fire-iid",[bf]:"fire-iid-compat",[_f]:"fire-fcm",[xf]:"fire-fcm-compat",[Ef]:"fire-perf",[Tf]:"fire-perf-compat",[Sf]:"fire-rc",[If]:"fire-rc-compat",[Af]:"fire-gcs",[kf]:"fire-gcs-compat",[Cf]:"fire-fst",[Pf]:"fire-fst-compat",[Rf]:"fire-vertex","fire-js":"fire-js",[Df]:"fire-js-all"};/**
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
 */const jo=new Map,Lf=new Map,ka=new Map;function ul(n,e){try{n.container.addComponent(e)}catch(t){Et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Fn(n){const e=n.name;if(ka.has(e))return Et.debug(`There were multiple attempts to register component ${e}.`),!1;ka.set(e,n);for(const t of jo.values())ul(t,n);for(const t of Lf.values())ul(t,n);return!0}function Za(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Je(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Vf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ot=new jr("app","Firebase",Vf);/**
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
 */class Of{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ot.create("app-deleted",{appName:this._name})}}/**
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
 */const Xn=Nf;function Gd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Aa,automaticDataCollectionEnabled:!0,...e},o=r.name;if(typeof o!="string"||!o)throw Ot.create("bad-app-name",{appName:String(o)});if(t||(t=Bd()),!t)throw Ot.create("no-options");const s=jo.get(o);if(s){if(xt(t,s.options)&&xt(r,s.config))return s;throw Ot.create("duplicate-app",{appName:o})}const i=new zg(o);for(const c of ka.values())i.addComponent(c);const l=new Of(t,r,i);return jo.set(o,l),l}function Wd(n=Aa){const e=jo.get(n);if(!e&&n===Aa&&Bd())return Gd();if(!e)throw Ot.create("no-app",{appName:n});return e}function Ft(n,e,t){let r=Mf[n]??n;t&&(r+=`-${t}`);const o=r.match(/\s|\//),s=e.match(/\s|\//);if(o||s){const i=[`Unable to register library "${r}" with version "${e}":`];o&&i.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&s&&i.push("and"),s&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Et.warn(i.join(" "));return}Fn(new dn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Ff="firebase-heartbeat-database",$f=1,Dr="firebase-heartbeat-store";let fa=null;function Kd(){return fa||(fa=tf(Ff,$f,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Dr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ot.create("idb-open",{originalErrorMessage:n.message})})),fa}async function Bf(n){try{const t=(await Kd()).transaction(Dr),r=await t.objectStore(Dr).get(Xd(n));return await t.done,r}catch(e){if(e instanceof At)Et.warn(e.message);else{const t=Ot.create("idb-get",{originalErrorMessage:e?.message});Et.warn(t.message)}}}async function hl(n,e){try{const r=(await Kd()).transaction(Dr,"readwrite");await r.objectStore(Dr).put(e,Xd(n)),await r.done}catch(t){if(t instanceof At)Et.warn(t.message);else{const r=Ot.create("idb-set",{originalErrorMessage:t?.message});Et.warn(r.message)}}}function Xd(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Uf=1024,zf=30;class qf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Hf(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=pl();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>zf){const o=Gf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Et.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=pl(),{heartbeatsToSend:t,unsentEntries:r}=jf(this._heartbeatsCache.heartbeats),o=qo(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Et.warn(e),""}}}function pl(){return new Date().toISOString().substring(0,10)}function jf(n,e=Uf){const t=[];let r=n.slice();for(const o of n){const s=t.find(i=>i.agent===o.agent);if(s){if(s.dates.push(o.date),gl(t)>e){s.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),gl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Hf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Rg()?Pg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Bf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return hl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return hl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function gl(n){return qo(JSON.stringify({version:2,heartbeats:n})).length}function Gf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Wf(n){Fn(new dn("platform-logger",e=>new of(e),"PRIVATE")),Fn(new dn("heartbeat",e=>new qf(e),"PRIVATE")),Ft(Ia,dl,n),Ft(Ia,dl,"esm2020"),Ft("fire-js","")}Wf("");var fl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $t,Qd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(x,w){function y(){}y.prototype=w.prototype,x.D=w.prototype,x.prototype=new y,x.prototype.constructor=x,x.C=function(T,I,A){for(var E=Array(arguments.length-2),D=2;D<arguments.length;D++)E[D-2]=arguments[D];return w.prototype[I].apply(T,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(x,w,y){y||(y=0);var T=Array(16);if(typeof w=="string")for(var I=0;16>I;++I)T[I]=w.charCodeAt(y++)|w.charCodeAt(y++)<<8|w.charCodeAt(y++)<<16|w.charCodeAt(y++)<<24;else for(I=0;16>I;++I)T[I]=w[y++]|w[y++]<<8|w[y++]<<16|w[y++]<<24;w=x.g[0],y=x.g[1],I=x.g[2];var A=x.g[3],E=w+(A^y&(I^A))+T[0]+3614090360&4294967295;w=y+(E<<7&4294967295|E>>>25),E=A+(I^w&(y^I))+T[1]+3905402710&4294967295,A=w+(E<<12&4294967295|E>>>20),E=I+(y^A&(w^y))+T[2]+606105819&4294967295,I=A+(E<<17&4294967295|E>>>15),E=y+(w^I&(A^w))+T[3]+3250441966&4294967295,y=I+(E<<22&4294967295|E>>>10),E=w+(A^y&(I^A))+T[4]+4118548399&4294967295,w=y+(E<<7&4294967295|E>>>25),E=A+(I^w&(y^I))+T[5]+1200080426&4294967295,A=w+(E<<12&4294967295|E>>>20),E=I+(y^A&(w^y))+T[6]+2821735955&4294967295,I=A+(E<<17&4294967295|E>>>15),E=y+(w^I&(A^w))+T[7]+4249261313&4294967295,y=I+(E<<22&4294967295|E>>>10),E=w+(A^y&(I^A))+T[8]+1770035416&4294967295,w=y+(E<<7&4294967295|E>>>25),E=A+(I^w&(y^I))+T[9]+2336552879&4294967295,A=w+(E<<12&4294967295|E>>>20),E=I+(y^A&(w^y))+T[10]+4294925233&4294967295,I=A+(E<<17&4294967295|E>>>15),E=y+(w^I&(A^w))+T[11]+2304563134&4294967295,y=I+(E<<22&4294967295|E>>>10),E=w+(A^y&(I^A))+T[12]+1804603682&4294967295,w=y+(E<<7&4294967295|E>>>25),E=A+(I^w&(y^I))+T[13]+4254626195&4294967295,A=w+(E<<12&4294967295|E>>>20),E=I+(y^A&(w^y))+T[14]+2792965006&4294967295,I=A+(E<<17&4294967295|E>>>15),E=y+(w^I&(A^w))+T[15]+1236535329&4294967295,y=I+(E<<22&4294967295|E>>>10),E=w+(I^A&(y^I))+T[1]+4129170786&4294967295,w=y+(E<<5&4294967295|E>>>27),E=A+(y^I&(w^y))+T[6]+3225465664&4294967295,A=w+(E<<9&4294967295|E>>>23),E=I+(w^y&(A^w))+T[11]+643717713&4294967295,I=A+(E<<14&4294967295|E>>>18),E=y+(A^w&(I^A))+T[0]+3921069994&4294967295,y=I+(E<<20&4294967295|E>>>12),E=w+(I^A&(y^I))+T[5]+3593408605&4294967295,w=y+(E<<5&4294967295|E>>>27),E=A+(y^I&(w^y))+T[10]+38016083&4294967295,A=w+(E<<9&4294967295|E>>>23),E=I+(w^y&(A^w))+T[15]+3634488961&4294967295,I=A+(E<<14&4294967295|E>>>18),E=y+(A^w&(I^A))+T[4]+3889429448&4294967295,y=I+(E<<20&4294967295|E>>>12),E=w+(I^A&(y^I))+T[9]+568446438&4294967295,w=y+(E<<5&4294967295|E>>>27),E=A+(y^I&(w^y))+T[14]+3275163606&4294967295,A=w+(E<<9&4294967295|E>>>23),E=I+(w^y&(A^w))+T[3]+4107603335&4294967295,I=A+(E<<14&4294967295|E>>>18),E=y+(A^w&(I^A))+T[8]+1163531501&4294967295,y=I+(E<<20&4294967295|E>>>12),E=w+(I^A&(y^I))+T[13]+2850285829&4294967295,w=y+(E<<5&4294967295|E>>>27),E=A+(y^I&(w^y))+T[2]+4243563512&4294967295,A=w+(E<<9&4294967295|E>>>23),E=I+(w^y&(A^w))+T[7]+1735328473&4294967295,I=A+(E<<14&4294967295|E>>>18),E=y+(A^w&(I^A))+T[12]+2368359562&4294967295,y=I+(E<<20&4294967295|E>>>12),E=w+(y^I^A)+T[5]+4294588738&4294967295,w=y+(E<<4&4294967295|E>>>28),E=A+(w^y^I)+T[8]+2272392833&4294967295,A=w+(E<<11&4294967295|E>>>21),E=I+(A^w^y)+T[11]+1839030562&4294967295,I=A+(E<<16&4294967295|E>>>16),E=y+(I^A^w)+T[14]+4259657740&4294967295,y=I+(E<<23&4294967295|E>>>9),E=w+(y^I^A)+T[1]+2763975236&4294967295,w=y+(E<<4&4294967295|E>>>28),E=A+(w^y^I)+T[4]+1272893353&4294967295,A=w+(E<<11&4294967295|E>>>21),E=I+(A^w^y)+T[7]+4139469664&4294967295,I=A+(E<<16&4294967295|E>>>16),E=y+(I^A^w)+T[10]+3200236656&4294967295,y=I+(E<<23&4294967295|E>>>9),E=w+(y^I^A)+T[13]+681279174&4294967295,w=y+(E<<4&4294967295|E>>>28),E=A+(w^y^I)+T[0]+3936430074&4294967295,A=w+(E<<11&4294967295|E>>>21),E=I+(A^w^y)+T[3]+3572445317&4294967295,I=A+(E<<16&4294967295|E>>>16),E=y+(I^A^w)+T[6]+76029189&4294967295,y=I+(E<<23&4294967295|E>>>9),E=w+(y^I^A)+T[9]+3654602809&4294967295,w=y+(E<<4&4294967295|E>>>28),E=A+(w^y^I)+T[12]+3873151461&4294967295,A=w+(E<<11&4294967295|E>>>21),E=I+(A^w^y)+T[15]+530742520&4294967295,I=A+(E<<16&4294967295|E>>>16),E=y+(I^A^w)+T[2]+3299628645&4294967295,y=I+(E<<23&4294967295|E>>>9),E=w+(I^(y|~A))+T[0]+4096336452&4294967295,w=y+(E<<6&4294967295|E>>>26),E=A+(y^(w|~I))+T[7]+1126891415&4294967295,A=w+(E<<10&4294967295|E>>>22),E=I+(w^(A|~y))+T[14]+2878612391&4294967295,I=A+(E<<15&4294967295|E>>>17),E=y+(A^(I|~w))+T[5]+4237533241&4294967295,y=I+(E<<21&4294967295|E>>>11),E=w+(I^(y|~A))+T[12]+1700485571&4294967295,w=y+(E<<6&4294967295|E>>>26),E=A+(y^(w|~I))+T[3]+2399980690&4294967295,A=w+(E<<10&4294967295|E>>>22),E=I+(w^(A|~y))+T[10]+4293915773&4294967295,I=A+(E<<15&4294967295|E>>>17),E=y+(A^(I|~w))+T[1]+2240044497&4294967295,y=I+(E<<21&4294967295|E>>>11),E=w+(I^(y|~A))+T[8]+1873313359&4294967295,w=y+(E<<6&4294967295|E>>>26),E=A+(y^(w|~I))+T[15]+4264355552&4294967295,A=w+(E<<10&4294967295|E>>>22),E=I+(w^(A|~y))+T[6]+2734768916&4294967295,I=A+(E<<15&4294967295|E>>>17),E=y+(A^(I|~w))+T[13]+1309151649&4294967295,y=I+(E<<21&4294967295|E>>>11),E=w+(I^(y|~A))+T[4]+4149444226&4294967295,w=y+(E<<6&4294967295|E>>>26),E=A+(y^(w|~I))+T[11]+3174756917&4294967295,A=w+(E<<10&4294967295|E>>>22),E=I+(w^(A|~y))+T[2]+718787259&4294967295,I=A+(E<<15&4294967295|E>>>17),E=y+(A^(I|~w))+T[9]+3951481745&4294967295,x.g[0]=x.g[0]+w&4294967295,x.g[1]=x.g[1]+(I+(E<<21&4294967295|E>>>11))&4294967295,x.g[2]=x.g[2]+I&4294967295,x.g[3]=x.g[3]+A&4294967295}r.prototype.u=function(x,w){w===void 0&&(w=x.length);for(var y=w-this.blockSize,T=this.B,I=this.h,A=0;A<w;){if(I==0)for(;A<=y;)o(this,x,A),A+=this.blockSize;if(typeof x=="string"){for(;A<w;)if(T[I++]=x.charCodeAt(A++),I==this.blockSize){o(this,T),I=0;break}}else for(;A<w;)if(T[I++]=x[A++],I==this.blockSize){o(this,T),I=0;break}}this.h=I,this.o+=w},r.prototype.v=function(){var x=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);x[0]=128;for(var w=1;w<x.length-8;++w)x[w]=0;var y=8*this.o;for(w=x.length-8;w<x.length;++w)x[w]=y&255,y/=256;for(this.u(x),x=Array(16),w=y=0;4>w;++w)for(var T=0;32>T;T+=8)x[y++]=this.g[w]>>>T&255;return x};function s(x,w){var y=l;return Object.prototype.hasOwnProperty.call(y,x)?y[x]:y[x]=w(x)}function i(x,w){this.h=w;for(var y=[],T=!0,I=x.length-1;0<=I;I--){var A=x[I]|0;T&&A==w||(y[I]=A,T=!1)}this.g=y}var l={};function c(x){return-128<=x&&128>x?s(x,function(w){return new i([w|0],0>w?-1:0)}):new i([x|0],0>x?-1:0)}function d(x){if(isNaN(x)||!isFinite(x))return g;if(0>x)return S(d(-x));for(var w=[],y=1,T=0;x>=y;T++)w[T]=x/y|0,y*=4294967296;return new i(w,0)}function h(x,w){if(x.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(x.charAt(0)=="-")return S(h(x.substring(1),w));if(0<=x.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(w,8)),T=g,I=0;I<x.length;I+=8){var A=Math.min(8,x.length-I),E=parseInt(x.substring(I,I+A),w);8>A?(A=d(Math.pow(w,A)),T=T.j(A).add(d(E))):(T=T.j(y),T=T.add(d(E)))}return T}var g=c(0),m=c(1),v=c(16777216);n=i.prototype,n.m=function(){if(_(this))return-S(this).m();for(var x=0,w=1,y=0;y<this.g.length;y++){var T=this.i(y);x+=(0<=T?T:4294967296+T)*w,w*=4294967296}return x},n.toString=function(x){if(x=x||10,2>x||36<x)throw Error("radix out of range: "+x);if(b(this))return"0";if(_(this))return"-"+S(this).toString(x);for(var w=d(Math.pow(x,6)),y=this,T="";;){var I=Z(y,w).g;y=N(y,I.j(w));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(x);if(y=I,b(y))return A+T;for(;6>A.length;)A="0"+A;T=A+T}},n.i=function(x){return 0>x?0:x<this.g.length?this.g[x]:this.h};function b(x){if(x.h!=0)return!1;for(var w=0;w<x.g.length;w++)if(x.g[w]!=0)return!1;return!0}function _(x){return x.h==-1}n.l=function(x){return x=N(this,x),_(x)?-1:b(x)?0:1};function S(x){for(var w=x.g.length,y=[],T=0;T<w;T++)y[T]=~x.g[T];return new i(y,~x.h).add(m)}n.abs=function(){return _(this)?S(this):this},n.add=function(x){for(var w=Math.max(this.g.length,x.g.length),y=[],T=0,I=0;I<=w;I++){var A=T+(this.i(I)&65535)+(x.i(I)&65535),E=(A>>>16)+(this.i(I)>>>16)+(x.i(I)>>>16);T=E>>>16,A&=65535,E&=65535,y[I]=E<<16|A}return new i(y,y[y.length-1]&-2147483648?-1:0)};function N(x,w){return x.add(S(w))}n.j=function(x){if(b(this)||b(x))return g;if(_(this))return _(x)?S(this).j(S(x)):S(S(this).j(x));if(_(x))return S(this.j(S(x)));if(0>this.l(v)&&0>x.l(v))return d(this.m()*x.m());for(var w=this.g.length+x.g.length,y=[],T=0;T<2*w;T++)y[T]=0;for(T=0;T<this.g.length;T++)for(var I=0;I<x.g.length;I++){var A=this.i(T)>>>16,E=this.i(T)&65535,D=x.i(I)>>>16,W=x.i(I)&65535;y[2*T+2*I]+=E*W,M(y,2*T+2*I),y[2*T+2*I+1]+=A*W,M(y,2*T+2*I+1),y[2*T+2*I+1]+=E*D,M(y,2*T+2*I+1),y[2*T+2*I+2]+=A*D,M(y,2*T+2*I+2)}for(T=0;T<w;T++)y[T]=y[2*T+1]<<16|y[2*T];for(T=w;T<2*w;T++)y[T]=0;return new i(y,0)};function M(x,w){for(;(x[w]&65535)!=x[w];)x[w+1]+=x[w]>>>16,x[w]&=65535,w++}function F(x,w){this.g=x,this.h=w}function Z(x,w){if(b(w))throw Error("division by zero");if(b(x))return new F(g,g);if(_(x))return w=Z(S(x),w),new F(S(w.g),S(w.h));if(_(w))return w=Z(x,S(w)),new F(S(w.g),w.h);if(30<x.g.length){if(_(x)||_(w))throw Error("slowDivide_ only works with positive integers.");for(var y=m,T=w;0>=T.l(x);)y=K(y),T=K(T);var I=ne(y,1),A=ne(T,1);for(T=ne(T,2),y=ne(y,2);!b(T);){var E=A.add(T);0>=E.l(x)&&(I=I.add(y),A=E),T=ne(T,1),y=ne(y,1)}return w=N(x,I.j(w)),new F(I,w)}for(I=g;0<=x.l(w);){for(y=Math.max(1,Math.floor(x.m()/w.m())),T=Math.ceil(Math.log(y)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),A=d(y),E=A.j(w);_(E)||0<E.l(x);)y-=T,A=d(y),E=A.j(w);b(A)&&(A=m),I=I.add(A),x=N(x,E)}return new F(I,x)}n.A=function(x){return Z(this,x).h},n.and=function(x){for(var w=Math.max(this.g.length,x.g.length),y=[],T=0;T<w;T++)y[T]=this.i(T)&x.i(T);return new i(y,this.h&x.h)},n.or=function(x){for(var w=Math.max(this.g.length,x.g.length),y=[],T=0;T<w;T++)y[T]=this.i(T)|x.i(T);return new i(y,this.h|x.h)},n.xor=function(x){for(var w=Math.max(this.g.length,x.g.length),y=[],T=0;T<w;T++)y[T]=this.i(T)^x.i(T);return new i(y,this.h^x.h)};function K(x){for(var w=x.g.length+1,y=[],T=0;T<w;T++)y[T]=x.i(T)<<1|x.i(T-1)>>>31;return new i(y,x.h)}function ne(x,w){var y=w>>5;w%=32;for(var T=x.g.length-y,I=[],A=0;A<T;A++)I[A]=0<w?x.i(A+y)>>>w|x.i(A+y+1)<<32-w:x.i(A+y);return new i(I,x.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Qd=r,i.prototype.add=i.prototype.add,i.prototype.multiply=i.prototype.j,i.prototype.modulo=i.prototype.A,i.prototype.compare=i.prototype.l,i.prototype.toNumber=i.prototype.m,i.prototype.toString=i.prototype.toString,i.prototype.getBits=i.prototype.i,i.fromNumber=d,i.fromString=h,$t=i}).apply(typeof fl<"u"?fl:typeof self<"u"?self:typeof window<"u"?window:{});var Io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yd,wr,Jd,Do,Ca,Zd,eu,tu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,p){return a==Array.prototype||a==Object.prototype||(a[u]=p.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Io=="object"&&Io];for(var u=0;u<a.length;++u){var p=a[u];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=t(this);function o(a,u){if(u)e:{var p=r;a=a.split(".");for(var f=0;f<a.length-1;f++){var k=a[f];if(!(k in p))break e;p=p[k]}a=a[a.length-1],f=p[a],u=u(f),u!=f&&u!=null&&e(p,a,{configurable:!0,writable:!0,value:u})}}function s(a,u){a instanceof String&&(a+="");var p=0,f=!1,k={next:function(){if(!f&&p<a.length){var C=p++;return{value:u(C,a[C]),done:!1}}return f=!0,{done:!0,value:void 0}}};return k[Symbol.iterator]=function(){return k},k}o("Array.prototype.values",function(a){return a||function(){return s(this,function(u,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function d(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function h(a,u,p){return a.call.apply(a.bind,arguments)}function g(a,u,p){if(!a)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var k=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(k,f),a.apply(u,k)}}return function(){return a.apply(u,arguments)}}function m(a,u,p){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:g,m.apply(null,arguments)}function v(a,u){var p=Array.prototype.slice.call(arguments,1);return function(){var f=p.slice();return f.push.apply(f,arguments),a.apply(this,f)}}function b(a,u){function p(){}p.prototype=u.prototype,a.aa=u.prototype,a.prototype=new p,a.prototype.constructor=a,a.Qb=function(f,k,C){for(var L=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)L[ie-2]=arguments[ie];return u.prototype[k].apply(f,L)}}function _(a){const u=a.length;if(0<u){const p=Array(u);for(let f=0;f<u;f++)p[f]=a[f];return p}return[]}function S(a,u){for(let p=1;p<arguments.length;p++){const f=arguments[p];if(c(f)){const k=a.length||0,C=f.length||0;a.length=k+C;for(let L=0;L<C;L++)a[k+L]=f[L]}else a.push(f)}}class N{constructor(u,p){this.i=u,this.j=p,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function M(a){return/^[\s\xa0]*$/.test(a)}function F(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function Z(a){return Z[" "](a),a}Z[" "]=function(){};var K=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function ne(a,u,p){for(const f in a)u.call(p,a[f],f,a)}function x(a,u){for(const p in a)u.call(void 0,a[p],p,a)}function w(a){const u={};for(const p in a)u[p]=a[p];return u}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,u){let p,f;for(let k=1;k<arguments.length;k++){f=arguments[k];for(p in f)a[p]=f[p];for(let C=0;C<y.length;C++)p=y[C],Object.prototype.hasOwnProperty.call(f,p)&&(a[p]=f[p])}}function I(a){var u=1;a=a.split(":");const p=[];for(;0<u&&a.length;)p.push(a.shift()),u--;return a.length&&p.push(a.join(":")),p}function A(a){l.setTimeout(()=>{throw a},0)}function E(){var a=qe;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class D{constructor(){this.h=this.g=null}add(u,p){const f=W.get();f.set(u,p),this.h?this.h.next=f:this.g=f,this.h=f}}var W=new N(()=>new X,a=>a.reset());class X{constructor(){this.next=this.g=this.h=null}set(u,p){this.h=u,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let j,ae=!1,qe=new D,Qe=()=>{const a=l.Promise.resolve(void 0);j=()=>{a.then(xn)}};var xn=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(p){A(p)}var u=W;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}ae=!1};function je(){this.s=this.s,this.C=this.C}je.prototype.s=!1,je.prototype.ma=function(){this.s||(this.s=!0,this.N())},je.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Se(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Se.prototype.h=function(){this.defaultPrevented=!0};var kp=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};l.addEventListener("test",p,u),l.removeEventListener("test",p,u)}catch{}return a}();function nr(a,u){if(Se.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var p=this.type=a.type,f=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(K){e:{try{Z(u.nodeName);var k=!0;break e}catch{}k=!1}k||(u=null)}}else p=="mouseover"?u=a.fromElement:p=="mouseout"&&(u=a.toElement);this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Cp[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&nr.aa.h.call(this)}}b(nr,Se);var Cp={2:"touch",3:"pen",4:"mouse"};nr.prototype.h=function(){nr.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ao="closure_listenable_"+(1e6*Math.random()|0),Rp=0;function Pp(a,u,p,f,k){this.listener=a,this.proxy=null,this.src=u,this.type=p,this.capture=!!f,this.ha=k,this.key=++Rp,this.da=this.fa=!1}function io(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function co(a){this.src=a,this.g={},this.h=0}co.prototype.add=function(a,u,p,f,k){var C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);var L=qs(a,u,f,k);return-1<L?(u=a[L],p||(u.fa=!1)):(u=new Pp(u,this.src,C,!!f,k),u.fa=p,a.push(u)),u};function zs(a,u){var p=u.type;if(p in a.g){var f=a.g[p],k=Array.prototype.indexOf.call(f,u,void 0),C;(C=0<=k)&&Array.prototype.splice.call(f,k,1),C&&(io(u),a.g[p].length==0&&(delete a.g[p],a.h--))}}function qs(a,u,p,f){for(var k=0;k<a.length;++k){var C=a[k];if(!C.da&&C.listener==u&&C.capture==!!p&&C.ha==f)return k}return-1}var js="closure_lm_"+(1e6*Math.random()|0),Hs={};function oc(a,u,p,f,k){if(Array.isArray(u)){for(var C=0;C<u.length;C++)oc(a,u[C],p,f,k);return null}return p=ic(p),a&&a[ao]?a.K(u,p,d(f)?!!f.capture:!1,k):Dp(a,u,p,!1,f,k)}function Dp(a,u,p,f,k,C){if(!u)throw Error("Invalid event type");var L=d(k)?!!k.capture:!!k,ie=Ws(a);if(ie||(a[js]=ie=new co(a)),p=ie.add(u,p,f,L,C),p.proxy)return p;if(f=Np(),p.proxy=f,f.src=a,f.listener=p,a.addEventListener)kp||(k=L),k===void 0&&(k=!1),a.addEventListener(u.toString(),f,k);else if(a.attachEvent)a.attachEvent(ac(u.toString()),f);else if(a.addListener&&a.removeListener)a.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return p}function Np(){function a(p){return u.call(a.src,a.listener,p)}const u=Mp;return a}function sc(a,u,p,f,k){if(Array.isArray(u))for(var C=0;C<u.length;C++)sc(a,u[C],p,f,k);else f=d(f)?!!f.capture:!!f,p=ic(p),a&&a[ao]?(a=a.i,u=String(u).toString(),u in a.g&&(C=a.g[u],p=qs(C,p,f,k),-1<p&&(io(C[p]),Array.prototype.splice.call(C,p,1),C.length==0&&(delete a.g[u],a.h--)))):a&&(a=Ws(a))&&(u=a.g[u.toString()],a=-1,u&&(a=qs(u,p,f,k)),(p=-1<a?u[a]:null)&&Gs(p))}function Gs(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[ao])zs(u.i,a);else{var p=a.type,f=a.proxy;u.removeEventListener?u.removeEventListener(p,f,a.capture):u.detachEvent?u.detachEvent(ac(p),f):u.addListener&&u.removeListener&&u.removeListener(f),(p=Ws(u))?(zs(p,a),p.h==0&&(p.src=null,u[js]=null)):io(a)}}}function ac(a){return a in Hs?Hs[a]:Hs[a]="on"+a}function Mp(a,u){if(a.da)a=!0;else{u=new nr(u,this);var p=a.listener,f=a.ha||a.src;a.fa&&Gs(a),a=p.call(f,u)}return a}function Ws(a){return a=a[js],a instanceof co?a:null}var Ks="__closure_events_fn_"+(1e9*Math.random()>>>0);function ic(a){return typeof a=="function"?a:(a[Ks]||(a[Ks]=function(u){return a.handleEvent(u)}),a[Ks])}function Ce(){je.call(this),this.i=new co(this),this.M=this,this.F=null}b(Ce,je),Ce.prototype[ao]=!0,Ce.prototype.removeEventListener=function(a,u,p,f){sc(this,a,u,p,f)};function Oe(a,u){var p,f=a.F;if(f)for(p=[];f;f=f.F)p.push(f);if(a=a.M,f=u.type||u,typeof u=="string")u=new Se(u,a);else if(u instanceof Se)u.target=u.target||a;else{var k=u;u=new Se(f,a),T(u,k)}if(k=!0,p)for(var C=p.length-1;0<=C;C--){var L=u.g=p[C];k=lo(L,f,!0,u)&&k}if(L=u.g=a,k=lo(L,f,!0,u)&&k,k=lo(L,f,!1,u)&&k,p)for(C=0;C<p.length;C++)L=u.g=p[C],k=lo(L,f,!1,u)&&k}Ce.prototype.N=function(){if(Ce.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var p=a.g[u],f=0;f<p.length;f++)io(p[f]);delete a.g[u],a.h--}}this.F=null},Ce.prototype.K=function(a,u,p,f){return this.i.add(String(a),u,!1,p,f)},Ce.prototype.L=function(a,u,p,f){return this.i.add(String(a),u,!0,p,f)};function lo(a,u,p,f){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var k=!0,C=0;C<u.length;++C){var L=u[C];if(L&&!L.da&&L.capture==p){var ie=L.listener,Ie=L.ha||L.src;L.fa&&zs(a.i,L),k=ie.call(Ie,f)!==!1&&k}}return k&&!f.defaultPrevented}function cc(a,u,p){if(typeof a=="function")p&&(a=m(a,p));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function lc(a){a.g=cc(()=>{a.g=null,a.i&&(a.i=!1,lc(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class Lp extends je{constructor(u,p){super(),this.m=u,this.l=p,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:lc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function rr(a){je.call(this),this.h=a,this.g={}}b(rr,je);var dc=[];function uc(a){ne(a.g,function(u,p){this.g.hasOwnProperty(p)&&Gs(u)},a),a.g={}}rr.prototype.N=function(){rr.aa.N.call(this),uc(this)},rr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xs=l.JSON.stringify,Vp=l.JSON.parse,Op=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Qs(){}Qs.prototype.h=null;function hc(a){return a.h||(a.h=a.i())}function pc(){}var or={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ys(){Se.call(this,"d")}b(Ys,Se);function Js(){Se.call(this,"c")}b(Js,Se);var tn={},gc=null;function uo(){return gc=gc||new Ce}tn.La="serverreachability";function fc(a){Se.call(this,tn.La,a)}b(fc,Se);function sr(a){const u=uo();Oe(u,new fc(u))}tn.STAT_EVENT="statevent";function mc(a,u){Se.call(this,tn.STAT_EVENT,a),this.stat=u}b(mc,Se);function Fe(a){const u=uo();Oe(u,new mc(u,a))}tn.Ma="timingevent";function wc(a,u){Se.call(this,tn.Ma,a),this.size=u}b(wc,Se);function ar(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function ir(){this.g=!0}ir.prototype.xa=function(){this.g=!1};function Fp(a,u,p,f,k,C){a.info(function(){if(a.g)if(C)for(var L="",ie=C.split("&"),Ie=0;Ie<ie.length;Ie++){var te=ie[Ie].split("=");if(1<te.length){var Re=te[0];te=te[1];var Pe=Re.split("_");L=2<=Pe.length&&Pe[1]=="type"?L+(Re+"="+te+"&"):L+(Re+"=redacted&")}}else L=null;else L=C;return"XMLHTTP REQ ("+f+") [attempt "+k+"]: "+u+`
`+p+`
`+L})}function $p(a,u,p,f,k,C,L){a.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+k+"]: "+u+`
`+p+`
`+C+" "+L})}function En(a,u,p,f){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+Up(a,p)+(f?" "+f:"")})}function Bp(a,u){a.info(function(){return"TIMEOUT: "+u})}ir.prototype.info=function(){};function Up(a,u){if(!a.g)return u;if(!u)return null;try{var p=JSON.parse(u);if(p){for(a=0;a<p.length;a++)if(Array.isArray(p[a])){var f=p[a];if(!(2>f.length)){var k=f[1];if(Array.isArray(k)&&!(1>k.length)){var C=k[0];if(C!="noop"&&C!="stop"&&C!="close")for(var L=1;L<k.length;L++)k[L]=""}}}}return Xs(p)}catch{return u}}var ho={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},yc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Zs;function po(){}b(po,Qs),po.prototype.g=function(){return new XMLHttpRequest},po.prototype.i=function(){return{}},Zs=new po;function kt(a,u,p,f){this.j=a,this.i=u,this.l=p,this.R=f||1,this.U=new rr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new vc}function vc(){this.i=null,this.g="",this.h=!1}var bc={},ea={};function ta(a,u,p){a.L=1,a.v=wo(pt(u)),a.m=p,a.P=!0,_c(a,null)}function _c(a,u){a.F=Date.now(),go(a),a.A=pt(a.v);var p=a.A,f=a.R;Array.isArray(f)||(f=[String(f)]),Lc(p.i,"t",f),a.C=0,p=a.j.J,a.h=new vc,a.g=Zc(a.j,p?u:null,!a.m),0<a.O&&(a.M=new Lp(m(a.Y,a,a.g),a.O)),u=a.U,p=a.g,f=a.ca;var k="readystatechange";Array.isArray(k)||(k&&(dc[0]=k.toString()),k=dc);for(var C=0;C<k.length;C++){var L=oc(p,k[C],f||u.handleEvent,!1,u.h||u);if(!L)break;u.g[L.key]=L}u=a.H?w(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),sr(),Fp(a.i,a.u,a.A,a.l,a.R,a.m)}kt.prototype.ca=function(a){a=a.target;const u=this.M;u&&gt(a)==3?u.j():this.Y(a)},kt.prototype.Y=function(a){try{if(a==this.g)e:{const Pe=gt(this.g);var u=this.g.Ba();const In=this.g.Z();if(!(3>Pe)&&(Pe!=3||this.g&&(this.h.h||this.g.oa()||zc(this.g)))){this.J||Pe!=4||u==7||(u==8||0>=In?sr(3):sr(2)),na(this);var p=this.g.Z();this.X=p;t:if(xc(this)){var f=zc(this.g);a="";var k=f.length,C=gt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){nn(this),cr(this);var L="";break t}this.h.i=new l.TextDecoder}for(u=0;u<k;u++)this.h.h=!0,a+=this.h.i.decode(f[u],{stream:!(C&&u==k-1)});f.length=0,this.h.g+=a,this.C=0,L=this.h.g}else L=this.g.oa();if(this.o=p==200,$p(this.i,this.u,this.A,this.l,this.R,Pe,p),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Ie=this.g;if((ie=Ie.g?Ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!M(ie)){var te=ie;break t}}te=null}if(p=te)En(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ra(this,p);else{this.o=!1,this.s=3,Fe(12),nn(this),cr(this);break e}}if(this.P){p=!0;let Ye;for(;!this.J&&this.C<L.length;)if(Ye=zp(this,L),Ye==ea){Pe==4&&(this.s=4,Fe(14),p=!1),En(this.i,this.l,null,"[Incomplete Response]");break}else if(Ye==bc){this.s=4,Fe(15),En(this.i,this.l,L,"[Invalid Chunk]"),p=!1;break}else En(this.i,this.l,Ye,null),ra(this,Ye);if(xc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Pe!=4||L.length!=0||this.h.h||(this.s=1,Fe(16),p=!1),this.o=this.o&&p,!p)En(this.i,this.l,L,"[Invalid Chunked Response]"),nn(this),cr(this);else if(0<L.length&&!this.W){this.W=!0;var Re=this.j;Re.g==this&&Re.ba&&!Re.M&&(Re.j.info("Great, no buffering proxy detected. Bytes received: "+L.length),la(Re),Re.M=!0,Fe(11))}}else En(this.i,this.l,L,null),ra(this,L);Pe==4&&nn(this),this.o&&!this.J&&(Pe==4?Xc(this.j,this):(this.o=!1,go(this)))}else sg(this.g),p==400&&0<L.indexOf("Unknown SID")?(this.s=3,Fe(12)):(this.s=0,Fe(13)),nn(this),cr(this)}}}catch{}finally{}};function xc(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function zp(a,u){var p=a.C,f=u.indexOf(`
`,p);return f==-1?ea:(p=Number(u.substring(p,f)),isNaN(p)?bc:(f+=1,f+p>u.length?ea:(u=u.slice(f,f+p),a.C=f+p,u)))}kt.prototype.cancel=function(){this.J=!0,nn(this)};function go(a){a.S=Date.now()+a.I,Ec(a,a.I)}function Ec(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ar(m(a.ba,a),u)}function na(a){a.B&&(l.clearTimeout(a.B),a.B=null)}kt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Bp(this.i,this.A),this.L!=2&&(sr(),Fe(17)),nn(this),this.s=2,cr(this)):Ec(this,this.S-a)};function cr(a){a.j.G==0||a.J||Xc(a.j,a)}function nn(a){na(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,uc(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function ra(a,u){try{var p=a.j;if(p.G!=0&&(p.g==a||oa(p.h,a))){if(!a.K&&oa(p.h,a)&&p.G==3){try{var f=p.Da.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var k=f;if(k[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<a.F)Eo(p),_o(p);else break e;ca(p),Fe(18)}}else p.za=k[1],0<p.za-p.T&&37500>k[2]&&p.F&&p.v==0&&!p.C&&(p.C=ar(m(p.Za,p),6e3));if(1>=Ic(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else on(p,11)}else if((a.K||p.g==a)&&Eo(p),!M(u))for(k=p.Da.g.parse(u),u=0;u<k.length;u++){let te=k[u];if(p.T=te[0],te=te[1],p.G==2)if(te[0]=="c"){p.K=te[1],p.ia=te[2];const Re=te[3];Re!=null&&(p.la=Re,p.j.info("VER="+p.la));const Pe=te[4];Pe!=null&&(p.Aa=Pe,p.j.info("SVER="+p.Aa));const In=te[5];In!=null&&typeof In=="number"&&0<In&&(f=1.5*In,p.L=f,p.j.info("backChannelRequestTimeoutMs_="+f)),f=p;const Ye=a.g;if(Ye){const So=Ye.g?Ye.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(So){var C=f.h;C.g||So.indexOf("spdy")==-1&&So.indexOf("quic")==-1&&So.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(sa(C,C.h),C.h=null))}if(f.D){const da=Ye.g?Ye.g.getResponseHeader("X-HTTP-Session-Id"):null;da&&(f.ya=da,de(f.I,f.D,da))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-a.F,p.j.info("Handshake RTT: "+p.R+"ms")),f=p;var L=a;if(f.qa=Jc(f,f.J?f.ia:null,f.W),L.K){Ac(f.h,L);var ie=L,Ie=f.L;Ie&&(ie.I=Ie),ie.B&&(na(ie),go(ie)),f.g=L}else Wc(f);0<p.i.length&&xo(p)}else te[0]!="stop"&&te[0]!="close"||on(p,7);else p.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?on(p,7):ia(p):te[0]!="noop"&&p.l&&p.l.ta(te),p.v=0)}}sr(4)}catch{}}var qp=class{constructor(a,u){this.g=a,this.map=u}};function Tc(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Sc(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Ic(a){return a.h?1:a.g?a.g.size:0}function oa(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function sa(a,u){a.g?a.g.add(u):a.h=u}function Ac(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}Tc.prototype.cancel=function(){if(this.i=kc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function kc(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const p of a.g.values())u=u.concat(p.D);return u}return _(a.i)}function jp(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],p=a.length,f=0;f<p;f++)u.push(a[f]);return u}u=[],p=0;for(f in a)u[p++]=a[f];return u}function Hp(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var p=0;p<a;p++)u.push(p);return u}u=[],p=0;for(const f in a)u[p++]=f;return u}}}function Cc(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var p=Hp(a),f=jp(a),k=f.length,C=0;C<k;C++)u.call(void 0,f[C],p&&p[C],a)}var Rc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Gp(a,u){if(a){a=a.split("&");for(var p=0;p<a.length;p++){var f=a[p].indexOf("="),k=null;if(0<=f){var C=a[p].substring(0,f);k=a[p].substring(f+1)}else C=a[p];u(C,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function rn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof rn){this.h=a.h,fo(this,a.j),this.o=a.o,this.g=a.g,mo(this,a.s),this.l=a.l;var u=a.i,p=new ur;p.i=u.i,u.g&&(p.g=new Map(u.g),p.h=u.h),Pc(this,p),this.m=a.m}else a&&(u=String(a).match(Rc))?(this.h=!1,fo(this,u[1]||"",!0),this.o=lr(u[2]||""),this.g=lr(u[3]||"",!0),mo(this,u[4]),this.l=lr(u[5]||"",!0),Pc(this,u[6]||"",!0),this.m=lr(u[7]||"")):(this.h=!1,this.i=new ur(null,this.h))}rn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(dr(u,Dc,!0),":");var p=this.g;return(p||u=="file")&&(a.push("//"),(u=this.o)&&a.push(dr(u,Dc,!0),"@"),a.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&a.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(dr(p,p.charAt(0)=="/"?Xp:Kp,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",dr(p,Yp)),a.join("")};function pt(a){return new rn(a)}function fo(a,u,p){a.j=p?lr(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function mo(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function Pc(a,u,p){u instanceof ur?(a.i=u,Jp(a.i,a.h)):(p||(u=dr(u,Qp)),a.i=new ur(u,a.h))}function de(a,u,p){a.i.set(u,p)}function wo(a){return de(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function lr(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function dr(a,u,p){return typeof a=="string"?(a=encodeURI(a).replace(u,Wp),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Wp(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Dc=/[#\/\?@]/g,Kp=/[#\?:]/g,Xp=/[#\?]/g,Qp=/[#\?@]/g,Yp=/#/g;function ur(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Ct(a){a.g||(a.g=new Map,a.h=0,a.i&&Gp(a.i,function(u,p){a.add(decodeURIComponent(u.replace(/\+/g," ")),p)}))}n=ur.prototype,n.add=function(a,u){Ct(this),this.i=null,a=Tn(this,a);var p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(u),this.h+=1,this};function Nc(a,u){Ct(a),u=Tn(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function Mc(a,u){return Ct(a),u=Tn(a,u),a.g.has(u)}n.forEach=function(a,u){Ct(this),this.g.forEach(function(p,f){p.forEach(function(k){a.call(u,k,f,this)},this)},this)},n.na=function(){Ct(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),p=[];for(let f=0;f<u.length;f++){const k=a[f];for(let C=0;C<k.length;C++)p.push(u[f])}return p},n.V=function(a){Ct(this);let u=[];if(typeof a=="string")Mc(this,a)&&(u=u.concat(this.g.get(Tn(this,a))));else{a=Array.from(this.g.values());for(let p=0;p<a.length;p++)u=u.concat(a[p])}return u},n.set=function(a,u){return Ct(this),this.i=null,a=Tn(this,a),Mc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function Lc(a,u,p){Nc(a,u),0<p.length&&(a.i=null,a.g.set(Tn(a,u),_(p)),a.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var p=0;p<u.length;p++){var f=u[p];const C=encodeURIComponent(String(f)),L=this.V(f);for(f=0;f<L.length;f++){var k=C;L[f]!==""&&(k+="="+encodeURIComponent(String(L[f]))),a.push(k)}}return this.i=a.join("&")};function Tn(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function Jp(a,u){u&&!a.j&&(Ct(a),a.i=null,a.g.forEach(function(p,f){var k=f.toLowerCase();f!=k&&(Nc(this,f),Lc(this,k,p))},a)),a.j=u}function Zp(a,u){const p=new ir;if(l.Image){const f=new Image;f.onload=v(Rt,p,"TestLoadImage: loaded",!0,u,f),f.onerror=v(Rt,p,"TestLoadImage: error",!1,u,f),f.onabort=v(Rt,p,"TestLoadImage: abort",!1,u,f),f.ontimeout=v(Rt,p,"TestLoadImage: timeout",!1,u,f),l.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=a}else u(!1)}function eg(a,u){const p=new ir,f=new AbortController,k=setTimeout(()=>{f.abort(),Rt(p,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:f.signal}).then(C=>{clearTimeout(k),C.ok?Rt(p,"TestPingServer: ok",!0,u):Rt(p,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(k),Rt(p,"TestPingServer: error",!1,u)})}function Rt(a,u,p,f,k){try{k&&(k.onload=null,k.onerror=null,k.onabort=null,k.ontimeout=null),f(p)}catch{}}function tg(){this.g=new Op}function ng(a,u,p){const f=p||"";try{Cc(a,function(k,C){let L=k;d(k)&&(L=Xs(k)),u.push(f+C+"="+encodeURIComponent(L))})}catch(k){throw u.push(f+"type="+encodeURIComponent("_badmap")),k}}function yo(a){this.l=a.Ub||null,this.j=a.eb||!1}b(yo,Qs),yo.prototype.g=function(){return new vo(this.l,this.j)},yo.prototype.i=function(a){return function(){return a}}({});function vo(a,u){Ce.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(vo,Ce),n=vo.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,pr(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,hr(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,pr(this)),this.g&&(this.readyState=3,pr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Vc(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Vc(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?hr(this):pr(this),this.readyState==3&&Vc(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,hr(this))},n.Qa=function(a){this.g&&(this.response=a,hr(this))},n.ga=function(){this.g&&hr(this)};function hr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,pr(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var p=u.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=u.next();return a.join(`\r
`)};function pr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(vo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Oc(a){let u="";return ne(a,function(p,f){u+=f,u+=":",u+=p,u+=`\r
`}),u}function aa(a,u,p){e:{for(f in p){var f=!1;break e}f=!0}f||(p=Oc(p),typeof a=="string"?p!=null&&encodeURIComponent(String(p)):de(a,u,p))}function pe(a){Ce.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(pe,Ce);var rg=/^https?$/i,og=["POST","PUT"];n=pe.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,p,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Zs.g(),this.v=this.o?hc(this.o):hc(Zs),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(C){Fc(this,C);return}if(a=p||"",p=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var k in f)p.set(k,f[k]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const C of f.keys())p.set(C,f.get(C));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(p.keys()).find(C=>C.toLowerCase()=="content-type"),k=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(og,u,void 0))||f||k||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,L]of p)this.g.setRequestHeader(C,L);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Uc(this),this.u=!0,this.g.send(a),this.u=!1}catch(C){Fc(this,C)}};function Fc(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,$c(a),bo(a)}function $c(a){a.A||(a.A=!0,Oe(a,"complete"),Oe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Oe(this,"complete"),Oe(this,"abort"),bo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bo(this,!0)),pe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Bc(this):this.bb())},n.bb=function(){Bc(this)};function Bc(a){if(a.h&&typeof i<"u"&&(!a.v[1]||gt(a)!=4||a.Z()!=2)){if(a.u&&gt(a)==4)cc(a.Ea,0,a);else if(Oe(a,"readystatechange"),gt(a)==4){a.h=!1;try{const L=a.Z();e:switch(L){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var p;if(!(p=u)){var f;if(f=L===0){var k=String(a.D).match(Rc)[1]||null;!k&&l.self&&l.self.location&&(k=l.self.location.protocol.slice(0,-1)),f=!rg.test(k?k.toLowerCase():"")}p=f}if(p)Oe(a,"complete"),Oe(a,"success");else{a.m=6;try{var C=2<gt(a)?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.Z()+"]",$c(a)}}finally{bo(a)}}}}function bo(a,u){if(a.g){Uc(a);const p=a.g,f=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Oe(a,"ready");try{p.onreadystatechange=f}catch{}}}function Uc(a){a.I&&(l.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function gt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<gt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Vp(u)}};function zc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function sg(a){const u={};a=(a.g&&2<=gt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<a.length;f++){if(M(a[f]))continue;var p=I(a[f]);const k=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const C=u[k]||[];u[k]=C,C.push(p)}x(u,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function gr(a,u,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||u}function qc(a){this.Aa=0,this.i=[],this.j=new ir,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=gr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=gr("baseRetryDelayMs",5e3,a),this.cb=gr("retryDelaySeedMs",1e4,a),this.Wa=gr("forwardChannelMaxRetries",2,a),this.wa=gr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Tc(a&&a.concurrentRequestLimit),this.Da=new tg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=qc.prototype,n.la=8,n.G=1,n.connect=function(a,u,p,f){Fe(0),this.W=a,this.H=u||{},p&&f!==void 0&&(this.H.OSID=p,this.H.OAID=f),this.F=this.X,this.I=Jc(this,null,this.W),xo(this)};function ia(a){if(jc(a),a.G==3){var u=a.U++,p=pt(a.I);if(de(p,"SID",a.K),de(p,"RID",u),de(p,"TYPE","terminate"),fr(a,p),u=new kt(a,a.j,u),u.L=2,u.v=wo(pt(p)),p=!1,l.navigator&&l.navigator.sendBeacon)try{p=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!p&&l.Image&&(new Image().src=u.v,p=!0),p||(u.g=Zc(u.j,null),u.g.ea(u.v)),u.F=Date.now(),go(u)}Yc(a)}function _o(a){a.g&&(la(a),a.g.cancel(),a.g=null)}function jc(a){_o(a),a.u&&(l.clearTimeout(a.u),a.u=null),Eo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function xo(a){if(!Sc(a.h)&&!a.s){a.s=!0;var u=a.Ga;j||Qe(),ae||(j(),ae=!0),qe.add(u,a),a.B=0}}function ag(a,u){return Ic(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ar(m(a.Ga,a,u),Qc(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const k=new kt(this,this.j,a);let C=this.o;if(this.S&&(C?(C=w(C),T(C,this.S)):C=this.S),this.m!==null||this.O||(k.H=C,C=null),this.P)e:{for(var u=0,p=0;p<this.i.length;p++){t:{var f=this.i[p];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(u+=f,4096<u){u=p;break e}if(u===4096||p===this.i.length-1){u=p+1;break e}}u=1e3}else u=1e3;u=Gc(this,k,u),p=pt(this.I),de(p,"RID",a),de(p,"CVER",22),this.D&&de(p,"X-HTTP-Session-Id",this.D),fr(this,p),C&&(this.O?u="headers="+encodeURIComponent(String(Oc(C)))+"&"+u:this.m&&aa(p,this.m,C)),sa(this.h,k),this.Ua&&de(p,"TYPE","init"),this.P?(de(p,"$req",u),de(p,"SID","null"),k.T=!0,ta(k,p,null)):ta(k,p,u),this.G=2}}else this.G==3&&(a?Hc(this,a):this.i.length==0||Sc(this.h)||Hc(this))};function Hc(a,u){var p;u?p=u.l:p=a.U++;const f=pt(a.I);de(f,"SID",a.K),de(f,"RID",p),de(f,"AID",a.T),fr(a,f),a.m&&a.o&&aa(f,a.m,a.o),p=new kt(a,a.j,p,a.B+1),a.m===null&&(p.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Gc(a,p,1e3),p.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),sa(a.h,p),ta(p,f,u)}function fr(a,u){a.H&&ne(a.H,function(p,f){de(u,f,p)}),a.l&&Cc({},function(p,f){de(u,f,p)})}function Gc(a,u,p){p=Math.min(a.i.length,p);var f=a.l?m(a.l.Na,a.l,a):null;e:{var k=a.i;let C=-1;for(;;){const L=["count="+p];C==-1?0<p?(C=k[0].g,L.push("ofs="+C)):C=0:L.push("ofs="+C);let ie=!0;for(let Ie=0;Ie<p;Ie++){let te=k[Ie].g;const Re=k[Ie].map;if(te-=C,0>te)C=Math.max(0,k[Ie].g-100),ie=!1;else try{ng(Re,L,"req"+te+"_")}catch{f&&f(Re)}}if(ie){f=L.join("&");break e}}}return a=a.i.splice(0,p),u.D=a,f}function Wc(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;j||Qe(),ae||(j(),ae=!0),qe.add(u,a),a.v=0}}function ca(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ar(m(a.Fa,a),Qc(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Kc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ar(m(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Fe(10),_o(this),Kc(this))};function la(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Kc(a){a.g=new kt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=pt(a.qa);de(u,"RID","rpc"),de(u,"SID",a.K),de(u,"AID",a.T),de(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&de(u,"TO",a.ja),de(u,"TYPE","xmlhttp"),fr(a,u),a.m&&a.o&&aa(u,a.m,a.o),a.L&&(a.g.I=a.L);var p=a.g;a=a.ia,p.L=1,p.v=wo(pt(u)),p.m=null,p.P=!0,_c(p,a)}n.Za=function(){this.C!=null&&(this.C=null,_o(this),ca(this),Fe(19))};function Eo(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Xc(a,u){var p=null;if(a.g==u){Eo(a),la(a),a.g=null;var f=2}else if(oa(a.h,u))p=u.D,Ac(a.h,u),f=1;else return;if(a.G!=0){if(u.o)if(f==1){p=u.m?u.m.length:0,u=Date.now()-u.F;var k=a.B;f=uo(),Oe(f,new wc(f,p)),xo(a)}else Wc(a);else if(k=u.s,k==3||k==0&&0<u.X||!(f==1&&ag(a,u)||f==2&&ca(a)))switch(p&&0<p.length&&(u=a.h,u.i=u.i.concat(p)),k){case 1:on(a,5);break;case 4:on(a,10);break;case 3:on(a,6);break;default:on(a,2)}}}function Qc(a,u){let p=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(p*=2),p*u}function on(a,u){if(a.j.info("Error code "+u),u==2){var p=m(a.fb,a),f=a.Xa;const k=!f;f=new rn(f||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||fo(f,"https"),wo(f),k?Zp(f.toString(),p):eg(f.toString(),p)}else Fe(2);a.G=0,a.l&&a.l.sa(u),Yc(a),jc(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Fe(2)):(this.j.info("Failed to ping google.com"),Fe(1))};function Yc(a){if(a.G=0,a.ka=[],a.l){const u=kc(a.h);(u.length!=0||a.i.length!=0)&&(S(a.ka,u),S(a.ka,a.i),a.h.i.length=0,_(a.i),a.i.length=0),a.l.ra()}}function Jc(a,u,p){var f=p instanceof rn?pt(p):new rn(p);if(f.g!="")u&&(f.g=u+"."+f.g),mo(f,f.s);else{var k=l.location;f=k.protocol,u=u?u+"."+k.hostname:k.hostname,k=+k.port;var C=new rn(null);f&&fo(C,f),u&&(C.g=u),k&&mo(C,k),p&&(C.l=p),f=C}return p=a.D,u=a.ya,p&&u&&de(f,p,u),de(f,"VER",a.la),fr(a,f),f}function Zc(a,u,p){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new pe(new yo({eb:p})):new pe(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function el(){}n=el.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function To(){}To.prototype.g=function(a,u){return new He(a,u)};function He(a,u){Ce.call(this),this.g=new qc(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!M(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!M(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new Sn(this)}b(He,Ce),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){ia(this.g)},He.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.u&&(p={},p.__data__=Xs(a),a=p);u.i.push(new qp(u.Ya++,a)),u.G==3&&xo(u)},He.prototype.N=function(){this.g.l=null,delete this.j,ia(this.g),delete this.g,He.aa.N.call(this)};function tl(a){Ys.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const p in u){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}b(tl,Ys);function nl(){Js.call(this),this.status=1}b(nl,Js);function Sn(a){this.g=a}b(Sn,el),Sn.prototype.ua=function(){Oe(this.g,"a")},Sn.prototype.ta=function(a){Oe(this.g,new tl(a))},Sn.prototype.sa=function(a){Oe(this.g,new nl)},Sn.prototype.ra=function(){Oe(this.g,"b")},To.prototype.createWebChannel=To.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,tu=function(){return new To},eu=function(){return uo()},Zd=tn,Ca={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ho.NO_ERROR=0,ho.TIMEOUT=8,ho.HTTP_ERROR=6,Do=ho,yc.COMPLETE="complete",Jd=yc,pc.EventType=or,or.OPEN="a",or.CLOSE="b",or.ERROR="c",or.MESSAGE="d",Ce.prototype.listen=Ce.prototype.K,wr=pc,pe.prototype.listenOnce=pe.prototype.L,pe.prototype.getLastError=pe.prototype.Ka,pe.prototype.getLastErrorCode=pe.prototype.Ba,pe.prototype.getStatus=pe.prototype.Z,pe.prototype.getResponseJson=pe.prototype.Oa,pe.prototype.getResponseText=pe.prototype.oa,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Ha,Yd=pe}).apply(typeof Io<"u"?Io:typeof self<"u"?self:typeof window<"u"?window:{});const ml="@firebase/firestore",wl="4.9.0";/**
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
 */let Qn="12.0.0";/**
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
 */const un=new Ya("@firebase/firestore");function Cn(){return un.logLevel}function O(n,...e){if(un.logLevel<=Q.DEBUG){const t=e.map(ei);un.debug(`Firestore (${Qn}): ${n}`,...t)}}function Tt(n,...e){if(un.logLevel<=Q.ERROR){const t=e.map(ei);un.error(`Firestore (${Qn}): ${n}`,...t)}}function hn(n,...e){if(un.logLevel<=Q.WARN){const t=e.map(ei);un.warn(`Firestore (${Qn}): ${n}`,...t)}}function ei(n){if(typeof n=="string")return n;try{/**
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
 */function z(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,nu(n,r,t)}function nu(n,e,t){let r=`FIRESTORE (${Qn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Tt(r),new Error(r)}function se(n,e,t,r){let o="Unexpected state";typeof t=="string"?o=t:r=t,n||nu(e,o,r)}function G(n,e){return n}/**
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
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends At{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class bt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class ru{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ou{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ne.UNAUTHENTICATED))}shutdown(){}}class Kf{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Xf{constructor(e){this.t=e,this.currentUser=Ne.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){se(this.o===void 0,42304);let r=this.i;const o=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new bt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new bt,e.enqueueRetryable(()=>o(this.currentUser))};const i=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await o(this.currentUser)})},l=c=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new bt)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(se(typeof r.accessToken=="string",31837,{l:r}),new ru(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return se(e===null||typeof e=="string",2055,{h:e}),new Ne(e)}}class Qf{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ne.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Yf{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Qf(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ne.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class yl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Jf{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Je(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){se(this.o===void 0,3512);const r=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const i=s.token!==this.m;return this.m=s.token,O("FirebaseAppCheckTokenProvider",`Received ${i?"new":"existing"} token.`),i?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const o=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>o(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?o(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new yl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(se(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new yl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Zf(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class us{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const o=Zf(40);for(let s=0;s<o.length;++s)r.length<20&&o[s]<t&&(r+=e.charAt(o[s]%62))}return r}}function Y(n,e){return n<e?-1:n>e?1:0}function Ra(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const o=n.charAt(r),s=e.charAt(r);if(o!==s)return ma(o)===ma(s)?Y(o,s):ma(o)?1:-1}return Y(n.length,e.length)}const em=55296,tm=57343;function ma(n){const e=n.charCodeAt(0);return e>=em&&e<=tm}function $n(n,e,t){return n.length===e.length&&n.every((r,o)=>t(r,e[o]))}/**
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
 */const vl="__name__";class ot{constructor(e,t,r){t===void 0?t=0:t>e.length&&z(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&z(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ot.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ot?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let o=0;o<r;o++){const s=ot.compareSegments(e.get(o),t.get(o));if(s!==0)return s}return Y(e.length,t.length)}static compareSegments(e,t){const r=ot.isNumericId(e),o=ot.isNumericId(t);return r&&!o?-1:!r&&o?1:r&&o?ot.extractNumericId(e).compare(ot.extractNumericId(t)):Ra(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return $t.fromString(e.substring(4,e.length-2))}}class ce extends ot{construct(e,t,r){return new ce(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(o=>o.length>0))}return new ce(t)}static emptyPath(){return new ce([])}}const nm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ee extends ot{construct(e,t,r){return new Ee(e,t,r)}static isValidIdentifier(e){return nm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ee.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===vl}static keyField(){return new Ee([vl])}static fromServerFormat(e){const t=[];let r="",o=0;const s=()=>{if(r.length===0)throw new V(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let i=!1;for(;o<e.length;){const l=e[o];if(l==="\\"){if(o+1===e.length)throw new V(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[o+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new V(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,o+=2}else l==="`"?(i=!i,o++):l!=="."||i?(r+=l,o++):(s(),o++)}if(s(),i)throw new V(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ee(t)}static emptyPath(){return new Ee([])}}/**
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
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(ce.fromString(e))}static fromName(e){return new B(ce.fromString(e).popFirst(5))}static empty(){return new B(ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new ce(e.slice()))}}/**
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
 */function su(n,e,t){if(!t)throw new V(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function au(n,e,t,r){if(e===!0&&r===!0)throw new V(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function bl(n){if(!B.isDocumentKey(n))throw new V(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function _l(n){if(B.isDocumentKey(n))throw new V(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function iu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function hs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function $e(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=hs(n);throw new V(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function rm(n,e){if(e<=0)throw new V(R.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function ye(n,e){const t={typeString:n};return e&&(t.value=e),t}function Gr(n,e){if(!iu(n))throw new V(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const o=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const i=n[r];if(o&&typeof i!==o){t=`JSON field '${r}' must be a ${o}.`;break}if(s!==void 0&&i!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new V(R.INVALID_ARGUMENT,t);return!0}/**
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
 */const xl=-62135596800,El=1e6;class le{static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*El);return new le(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<xl)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/El}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:le._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Gr(e,le._jsonSchema))return new le(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-xl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}le._jsonSchemaVersion="firestore/timestamp/1.0",le._jsonSchema={type:ye("string",le._jsonSchemaVersion),seconds:ye("number"),nanoseconds:ye("number")};/**
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
 */class H{static fromTimestamp(e){return new H(e)}static min(){return new H(new le(0,0))}static max(){return new H(new le(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Nr=-1;function om(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,o=H.fromTimestamp(r===1e9?new le(t+1,0):new le(t,r));return new jt(o,B.empty(),e)}function sm(n){return new jt(n.readTime,n.key,Nr)}class jt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new jt(H.min(),B.empty(),Nr)}static max(){return new jt(H.max(),B.empty(),Nr)}}function am(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=B.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
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
 */const im="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class cm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Yn(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==im)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,o)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,o)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,o)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let o=0,s=0,i=!1;e.forEach(l=>{++o,l.next(()=>{++s,i&&s===o&&t()},c=>r(c))}),i=!0,s===o&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(o=>o?P.resolve(o):r());return t}static forEach(e,t){const r=[];return e.forEach((o,s)=>{r.push(t.call(this,o,s))}),this.waitFor(r)}static mapArray(e,t){return new P((r,o)=>{const s=e.length,i=new Array(s);let l=0;for(let c=0;c<s;c++){const d=c;t(e[d]).next(h=>{i[d]=h,++l,l===s&&r(i)},h=>o(h))}})}static doWhile(e,t){return new P((r,o)=>{const s=()=>{e()===!0?t().next(()=>{s()},o):r()};s()})}}function lm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Jn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ps{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ps.ce=-1;/**
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
 */const ti=-1;function gs(n){return n==null}function Ho(n){return n===0&&1/n==-1/0}function dm(n){return typeof n=="number"&&Number.isInteger(n)&&!Ho(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const cu="";function um(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Tl(e)),e=hm(n.get(t),e);return Tl(e)}function hm(n,e){let t=e;const r=n.length;for(let o=0;o<r;o++){const s=n.charAt(o);switch(s){case"\0":t+="";break;case cu:t+="";break;default:t+=s}}return t}function Tl(n){return n+cu+""}/**
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
 */function Sl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Jt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function lu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class he{constructor(e,t){this.comparator=e,this.root=t||Ae.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ae.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ae.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const o=this.comparator(e,r.key);if(o===0)return t+r.left.size;o<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ao(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ao(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ao(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ao(this.root,e,this.comparator,!0)}}class Ao{constructor(e,t,r,o){this.isReverse=o,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&o&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ae{constructor(e,t,r,o,s){this.key=e,this.value=t,this.color=r??Ae.RED,this.left=o??Ae.EMPTY,this.right=s??Ae.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,o,s){return new Ae(e??this.key,t??this.value,r??this.color,o??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let o=this;const s=r(e,o.key);return o=s<0?o.copy(null,null,null,o.left.insert(e,t,r),null):s===0?o.copy(null,t,null,null,null):o.copy(null,null,null,null,o.right.insert(e,t,r)),o.fixUp()}removeMin(){if(this.left.isEmpty())return Ae.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,o=this;if(t(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,t),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),t(e,o.key)===0){if(o.right.isEmpty())return Ae.EMPTY;r=o.right.min(),o=o.copy(r.key,r.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,t))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ae.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ae.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw z(27949);return e+(this.isRed()?0:1)}}Ae.EMPTY=null,Ae.RED=!0,Ae.BLACK=!1;Ae.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(e,t,r,o,s){return this}insert(e,t,r){return new Ae(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class be{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const o=r.getNext();if(this.comparator(o.key,e[1])>=0)return;t(o.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Il(this.data.getIterator())}getIteratorFrom(e){return new Il(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof be)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const o=t.getNext().key,s=r.getNext().key;if(this.comparator(o,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new be(this.comparator);return t.data=e,t}}class Il{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class We{constructor(e){this.fields=e,e.sort(Ee.comparator)}static empty(){return new We([])}unionWith(e){let t=new be(Ee.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new We(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $n(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class du extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Te{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(o){try{return atob(o)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new du("Invalid base64 string: "+s):s}}(e);return new Te(t)}static fromUint8Array(e){const t=function(o){let s="";for(let i=0;i<o.length;++i)s+=String.fromCharCode(o[i]);return s}(e);return new Te(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let o=0;o<t.length;o++)r[o]=t.charCodeAt(o);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Te.EMPTY_BYTE_STRING=new Te("");const pm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ht(n){if(se(!!n,39018),typeof n=="string"){let e=0;const t=pm.exec(n);if(se(!!t,46558,{timestamp:n}),t[1]){let o=t[1];o=(o+"000000000").substr(0,9),e=Number(o)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ge(n.seconds),nanos:ge(n.nanos)}}function ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gt(n){return typeof n=="string"?Te.fromBase64String(n):Te.fromUint8Array(n)}/**
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
 */const uu="server_timestamp",hu="__type__",pu="__previous_value__",gu="__local_write_time__";function ni(n){return(n?.mapValue?.fields||{})[hu]?.stringValue===uu}function fs(n){const e=n.mapValue.fields[pu];return ni(e)?fs(e):e}function Mr(n){const e=Ht(n.mapValue.fields[gu].timestampValue);return new le(e.seconds,e.nanos)}/**
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
 */class gm{constructor(e,t,r,o,s,i,l,c,d,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=o,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=d,this.isUsingEmulator=h}}const Go="(default)";class Bn{constructor(e,t){this.projectId=e,this.database=t||Go}static empty(){return new Bn("","")}get isDefaultDatabase(){return this.database===Go}isEqual(e){return e instanceof Bn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const fu="__type__",fm="__max__",ko={mapValue:{}},mu="__vector__",Wo="value";function Wt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ni(n)?4:wm(n)?9007199254740991:mm(n)?10:11:z(28295,{value:n})}function ct(n,e){if(n===e)return!0;const t=Wt(n);if(t!==Wt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Mr(n).isEqual(Mr(e));case 3:return function(o,s){if(typeof o.timestampValue=="string"&&typeof s.timestampValue=="string"&&o.timestampValue.length===s.timestampValue.length)return o.timestampValue===s.timestampValue;const i=Ht(o.timestampValue),l=Ht(s.timestampValue);return i.seconds===l.seconds&&i.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(o,s){return Gt(o.bytesValue).isEqual(Gt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(o,s){return ge(o.geoPointValue.latitude)===ge(s.geoPointValue.latitude)&&ge(o.geoPointValue.longitude)===ge(s.geoPointValue.longitude)}(n,e);case 2:return function(o,s){if("integerValue"in o&&"integerValue"in s)return ge(o.integerValue)===ge(s.integerValue);if("doubleValue"in o&&"doubleValue"in s){const i=ge(o.doubleValue),l=ge(s.doubleValue);return i===l?Ho(i)===Ho(l):isNaN(i)&&isNaN(l)}return!1}(n,e);case 9:return $n(n.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return function(o,s){const i=o.mapValue.fields||{},l=s.mapValue.fields||{};if(Sl(i)!==Sl(l))return!1;for(const c in i)if(i.hasOwnProperty(c)&&(l[c]===void 0||!ct(i[c],l[c])))return!1;return!0}(n,e);default:return z(52216,{left:n})}}function Lr(n,e){return(n.values||[]).find(t=>ct(t,e))!==void 0}function Un(n,e){if(n===e)return 0;const t=Wt(n),r=Wt(e);if(t!==r)return Y(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return function(s,i){const l=ge(s.integerValue||s.doubleValue),c=ge(i.integerValue||i.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return Al(n.timestampValue,e.timestampValue);case 4:return Al(Mr(n),Mr(e));case 5:return Ra(n.stringValue,e.stringValue);case 6:return function(s,i){const l=Gt(s),c=Gt(i);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,i){const l=s.split("/"),c=i.split("/");for(let d=0;d<l.length&&d<c.length;d++){const h=Y(l[d],c[d]);if(h!==0)return h}return Y(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,i){const l=Y(ge(s.latitude),ge(i.latitude));return l!==0?l:Y(ge(s.longitude),ge(i.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return kl(n.arrayValue,e.arrayValue);case 10:return function(s,i){const l=s.fields||{},c=i.fields||{},d=l[Wo]?.arrayValue,h=c[Wo]?.arrayValue,g=Y(d?.values?.length||0,h?.values?.length||0);return g!==0?g:kl(d,h)}(n.mapValue,e.mapValue);case 11:return function(s,i){if(s===ko.mapValue&&i===ko.mapValue)return 0;if(s===ko.mapValue)return 1;if(i===ko.mapValue)return-1;const l=s.fields||{},c=Object.keys(l),d=i.fields||{},h=Object.keys(d);c.sort(),h.sort();for(let g=0;g<c.length&&g<h.length;++g){const m=Ra(c[g],h[g]);if(m!==0)return m;const v=Un(l[c[g]],d[h[g]]);if(v!==0)return v}return Y(c.length,h.length)}(n.mapValue,e.mapValue);default:throw z(23264,{he:t})}}function Al(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=Ht(n),r=Ht(e),o=Y(t.seconds,r.seconds);return o!==0?o:Y(t.nanos,r.nanos)}function kl(n,e){const t=n.values||[],r=e.values||[];for(let o=0;o<t.length&&o<r.length;++o){const s=Un(t[o],r[o]);if(s)return s}return Y(t.length,r.length)}function zn(n){return Pa(n)}function Pa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Ht(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Gt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return B.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",o=!0;for(const s of t.values||[])o?o=!1:r+=",",r+=Pa(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let o="{",s=!0;for(const i of r)s?s=!1:o+=",",o+=`${i}:${Pa(t.fields[i])}`;return o+"}"}(n.mapValue):z(61005,{value:n})}function No(n){switch(Wt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=fs(n);return e?16+No(e):16;case 5:return 2*n.stringValue.length;case 6:return Gt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((o,s)=>o+No(s),0)}(n.arrayValue);case 10:case 11:return function(r){let o=0;return Jt(r.fields,(s,i)=>{o+=s.length+No(i)}),o}(n.mapValue);default:throw z(13486,{value:n})}}function Cl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Da(n){return!!n&&"integerValue"in n}function ri(n){return!!n&&"arrayValue"in n}function Rl(n){return!!n&&"nullValue"in n}function Pl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Mo(n){return!!n&&"mapValue"in n}function mm(n){return(n?.mapValue?.fields||{})[fu]?.stringValue===mu}function _r(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Jt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=_r(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=_r(n.arrayValue.values[t]);return e}return{...n}}function wm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===fm}/**
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
 */class ze{constructor(e){this.value=e}static empty(){return new ze({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Mo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=_r(t)}setAll(e){let t=Ee.emptyPath(),r={},o=[];e.forEach((i,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,r,o),r={},o=[],t=l.popLast()}i?r[l.lastSegment()]=_r(i):o.push(l.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,o)}delete(e){const t=this.field(e.popLast());Mo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let o=t.mapValue.fields[e.get(r)];Mo(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=o),t=o}return t.mapValue.fields}applyChanges(e,t,r){Jt(t,(o,s)=>e[o]=s);for(const o of r)delete e[o]}clone(){return new ze(_r(this.value))}}function wu(n){const e=[];return Jt(n.fields,(t,r)=>{const o=new Ee([t]);if(Mo(r)){const s=wu(r.mapValue).fields;if(s.length===0)e.push(o);else for(const i of s)e.push(o.child(i))}else e.push(o)}),new We(e)}/**
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
 */class Me{constructor(e,t,r,o,s,i,l){this.key=e,this.documentType=t,this.version=r,this.readTime=o,this.createTime=s,this.data=i,this.documentState=l}static newInvalidDocument(e){return new Me(e,0,H.min(),H.min(),H.min(),ze.empty(),0)}static newFoundDocument(e,t,r,o){return new Me(e,1,t,H.min(),r,o,0)}static newNoDocument(e,t){return new Me(e,2,t,H.min(),H.min(),ze.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,H.min(),H.min(),ze.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ze.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ze.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ko{constructor(e,t){this.position=e,this.inclusive=t}}function Dl(n,e,t){let r=0;for(let o=0;o<n.position.length;o++){const s=e[o],i=n.position[o];if(s.field.isKeyField()?r=B.comparator(B.fromName(i.referenceValue),t.key):r=Un(i,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Nl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ct(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Vr{constructor(e,t="asc"){this.field=e,this.dir=t}}function ym(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class yu{}class we extends yu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new bm(e,t,r):t==="array-contains"?new Em(e,r):t==="in"?new Tm(e,r):t==="not-in"?new Sm(e,r):t==="array-contains-any"?new Im(e,r):new we(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new _m(e,r):new xm(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Un(t,this.value)):t!==null&&Wt(this.value)===Wt(t)&&this.matchesComparison(Un(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rt extends yu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new rt(e,t)}matches(e){return vu(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function vu(n){return n.op==="and"}function bu(n){return vm(n)&&vu(n)}function vm(n){for(const e of n.filters)if(e instanceof rt)return!1;return!0}function Na(n){if(n instanceof we)return n.field.canonicalString()+n.op.toString()+zn(n.value);if(bu(n))return n.filters.map(e=>Na(e)).join(",");{const e=n.filters.map(t=>Na(t)).join(",");return`${n.op}(${e})`}}function _u(n,e){return n instanceof we?function(r,o){return o instanceof we&&r.op===o.op&&r.field.isEqual(o.field)&&ct(r.value,o.value)}(n,e):n instanceof rt?function(r,o){return o instanceof rt&&r.op===o.op&&r.filters.length===o.filters.length?r.filters.reduce((s,i,l)=>s&&_u(i,o.filters[l]),!0):!1}(n,e):void z(19439)}function xu(n){return n instanceof we?function(t){return`${t.field.canonicalString()} ${t.op} ${zn(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(xu).join(" ,")+"}"}(n):"Filter"}class bm extends we{constructor(e,t,r){super(e,t,r),this.key=B.fromName(r.referenceValue)}matches(e){const t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class _m extends we{constructor(e,t){super(e,"in",t),this.keys=Eu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class xm extends we{constructor(e,t){super(e,"not-in",t),this.keys=Eu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Eu(n,e){return(e.arrayValue?.values||[]).map(t=>B.fromName(t.referenceValue))}class Em extends we{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ri(t)&&Lr(t.arrayValue,this.value)}}class Tm extends we{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Lr(this.value.arrayValue,t)}}class Sm extends we{constructor(e,t){super(e,"not-in",t)}matches(e){if(Lr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Lr(this.value.arrayValue,t)}}class Im extends we{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ri(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Lr(this.value.arrayValue,r))}}/**
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
 */class Am{constructor(e,t=null,r=[],o=[],s=null,i=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=o,this.limit=s,this.startAt=i,this.endAt=l,this.Te=null}}function Ml(n,e=null,t=[],r=[],o=null,s=null,i=null){return new Am(n,e,t,r,o,s,i)}function oi(n){const e=G(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Na(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),gs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>zn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>zn(r)).join(",")),e.Te=t}return e.Te}function si(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!ym(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_u(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Nl(n.startAt,e.startAt)&&Nl(n.endAt,e.endAt)}function Ma(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Zn{constructor(e,t=null,r=[],o=[],s=null,i="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=o,this.limit=s,this.limitType=i,this.startAt=l,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function km(n,e,t,r,o,s,i,l){return new Zn(n,e,t,r,o,s,i,l)}function ms(n){return new Zn(n)}function Ll(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Tu(n){return n.collectionGroup!==null}function xr(n){const e=G(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(i){let l=new be(Ee.comparator);return i.filters.forEach(c=>{c.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Vr(s,r))}),t.has(Ee.keyField().canonicalString())||e.Ie.push(new Vr(Ee.keyField(),r))}return e.Ie}function st(n){const e=G(n);return e.Ee||(e.Ee=Cm(e,xr(n))),e.Ee}function Cm(n,e){if(n.limitType==="F")return Ml(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(o=>{const s=o.dir==="desc"?"asc":"desc";return new Vr(o.field,s)});const t=n.endAt?new Ko(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ko(n.startAt.position,n.startAt.inclusive):null;return Ml(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function La(n,e){const t=n.filters.concat([e]);return new Zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Xo(n,e,t){return new Zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ws(n,e){return si(st(n),st(e))&&n.limitType===e.limitType}function Su(n){return`${oi(st(n))}|lt:${n.limitType}`}function Rn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(o=>xu(o)).join(", ")}]`),gs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(o=>function(i){return`${i.field.canonicalString()} (${i.dir})`}(o)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(o=>zn(o)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(o=>zn(o)).join(",")),`Target(${r})`}(st(n))}; limitType=${n.limitType})`}function ys(n,e){return e.isFoundDocument()&&function(r,o){const s=o.key.path;return r.collectionGroup!==null?o.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):B.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,o){for(const s of xr(r))if(!s.field.isKeyField()&&o.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,o){for(const s of r.filters)if(!s.matches(o))return!1;return!0}(n,e)&&function(r,o){return!(r.startAt&&!function(i,l,c){const d=Dl(i,l,c);return i.inclusive?d<=0:d<0}(r.startAt,xr(r),o)||r.endAt&&!function(i,l,c){const d=Dl(i,l,c);return i.inclusive?d>=0:d>0}(r.endAt,xr(r),o))}(n,e)}function Rm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Iu(n){return(e,t)=>{let r=!1;for(const o of xr(n)){const s=Pm(o,e,t);if(s!==0)return s;r=r||o.field.isKeyField()}return 0}}function Pm(n,e,t){const r=n.field.isKeyField()?B.comparator(e.key,t.key):function(s,i,l){const c=i.data.field(s),d=l.data.field(s);return c!==null&&d!==null?Un(c,d):z(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}/**
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
 */class wn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[o,s]of r)if(this.equalsFn(o,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),o=this.inner[r];if(o===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<o.length;s++)if(this.equalsFn(o[s][0],e))return void(o[s]=[e,t]);o.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],e))return r.length===1?delete this.inner[t]:r.splice(o,1),this.innerSize--,!0;return!1}forEach(e){Jt(this.inner,(t,r)=>{for(const[o,s]of r)e(o,s)})}isEmpty(){return lu(this.inner)}size(){return this.innerSize}}/**
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
 */const Dm=new he(B.comparator);function St(){return Dm}const Au=new he(B.comparator);function yr(...n){let e=Au;for(const t of n)e=e.insert(t.key,t);return e}function ku(n){let e=Au;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function an(){return Er()}function Cu(){return Er()}function Er(){return new wn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Nm=new he(B.comparator),Mm=new be(B.comparator);function J(...n){let e=Mm;for(const t of n)e=e.add(t);return e}const Lm=new be(Y);function Vm(){return Lm}/**
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
 */function ai(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ho(e)?"-0":e}}function Ru(n){return{integerValue:""+n}}function Om(n,e){return dm(e)?Ru(e):ai(n,e)}/**
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
 */class vs{constructor(){this._=void 0}}function Fm(n,e,t){return n instanceof Or?function(o,s){const i={fields:{[hu]:{stringValue:uu},[gu]:{timestampValue:{seconds:o.seconds,nanos:o.nanoseconds}}}};return s&&ni(s)&&(s=fs(s)),s&&(i.fields[pu]=s),{mapValue:i}}(t,e):n instanceof qn?Du(n,e):n instanceof jn?Nu(n,e):function(o,s){const i=Pu(o,s),l=Vl(i)+Vl(o.Ae);return Da(i)&&Da(o.Ae)?Ru(l):ai(o.serializer,l)}(n,e)}function $m(n,e,t){return n instanceof qn?Du(n,e):n instanceof jn?Nu(n,e):t}function Pu(n,e){return n instanceof Qo?function(r){return Da(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Or extends vs{}class qn extends vs{constructor(e){super(),this.elements=e}}function Du(n,e){const t=Mu(e);for(const r of n.elements)t.some(o=>ct(o,r))||t.push(r);return{arrayValue:{values:t}}}class jn extends vs{constructor(e){super(),this.elements=e}}function Nu(n,e){let t=Mu(e);for(const r of n.elements)t=t.filter(o=>!ct(o,r));return{arrayValue:{values:t}}}class Qo extends vs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Vl(n){return ge(n.integerValue||n.doubleValue)}function Mu(n){return ri(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class ii{constructor(e,t){this.field=e,this.transform=t}}function Bm(n,e){return n.field.isEqual(e.field)&&function(r,o){return r instanceof qn&&o instanceof qn||r instanceof jn&&o instanceof jn?$n(r.elements,o.elements,ct):r instanceof Qo&&o instanceof Qo?ct(r.Ae,o.Ae):r instanceof Or&&o instanceof Or}(n.transform,e.transform)}class Um{constructor(e,t){this.version=e,this.transformResults=t}}class Xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Xe}static exists(e){return new Xe(void 0,e)}static updateTime(e){return new Xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Lo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class bs{}function Lu(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ci(n.key,Xe.none()):new Wr(n.key,n.data,Xe.none());{const t=n.data,r=ze.empty();let o=new be(Ee.comparator);for(let s of e.fields)if(!o.has(s)){let i=t.field(s);i===null&&s.length>1&&(s=s.popLast(),i=t.field(s)),i===null?r.delete(s):r.set(s,i),o=o.add(s)}return new Zt(n.key,r,new We(o.toArray()),Xe.none())}}function zm(n,e,t){n instanceof Wr?function(o,s,i){const l=o.value.clone(),c=Fl(o.fieldTransforms,s,i.transformResults);l.setAll(c),s.convertToFoundDocument(i.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Zt?function(o,s,i){if(!Lo(o.precondition,s))return void s.convertToUnknownDocument(i.version);const l=Fl(o.fieldTransforms,s,i.transformResults),c=s.data;c.setAll(Vu(o)),c.setAll(l),s.convertToFoundDocument(i.version,c).setHasCommittedMutations()}(n,e,t):function(o,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,t)}function Tr(n,e,t,r){return n instanceof Wr?function(s,i,l,c){if(!Lo(s.precondition,i))return l;const d=s.value.clone(),h=$l(s.fieldTransforms,c,i);return d.setAll(h),i.convertToFoundDocument(i.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Zt?function(s,i,l,c){if(!Lo(s.precondition,i))return l;const d=$l(s.fieldTransforms,c,i),h=i.data;return h.setAll(Vu(s)),h.setAll(d),i.convertToFoundDocument(i.version,h).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,i,l){return Lo(s.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):l}(n,e,t)}function qm(n,e){let t=null;for(const r of n.fieldTransforms){const o=e.data.field(r.field),s=Pu(r.transform,o||null);s!=null&&(t===null&&(t=ze.empty()),t.set(r.field,s))}return t||null}function Ol(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,o){return r===void 0&&o===void 0||!(!r||!o)&&$n(r,o,(s,i)=>Bm(s,i))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Wr extends bs{constructor(e,t,r,o=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=o,this.type=0}getFieldMask(){return null}}class Zt extends bs{constructor(e,t,r,o,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=o,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Vu(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Fl(n,e,t){const r=new Map;se(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let o=0;o<t.length;o++){const s=n[o],i=s.transform,l=e.data.field(s.field);r.set(s.field,$m(i,l,t[o]))}return r}function $l(n,e,t){const r=new Map;for(const o of n){const s=o.transform,i=t.data.field(o.field);r.set(o.field,Fm(s,i,e))}return r}class ci extends bs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class jm extends bs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Hm{constructor(e,t,r,o){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=o}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let o=0;o<this.mutations.length;o++){const s=this.mutations[o];s.key.isEqual(e.key)&&zm(s,e,r[o])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Tr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Tr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Cu();return this.mutations.forEach(o=>{const s=e.get(o.key),i=s.overlayedDocument;let l=this.applyToLocalView(i,s.mutatedFields);l=t.has(o.key)?null:l;const c=Lu(i,l);c!==null&&r.set(o.key,c),i.isValidDocument()||i.convertToNoDocument(H.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),J())}isEqual(e){return this.batchId===e.batchId&&$n(this.mutations,e.mutations,(t,r)=>Ol(t,r))&&$n(this.baseMutations,e.baseMutations,(t,r)=>Ol(t,r))}}class li{constructor(e,t,r,o){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=o}static from(e,t,r){se(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let o=function(){return Nm}();const s=e.mutations;for(let i=0;i<s.length;i++)o=o.insert(s[i].key,r[i].version);return new li(e,t,r,o)}}/**
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
 */class Gm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Wm{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var me,ee;function Km(n){switch(n){case R.OK:return z(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function Ou(n){if(n===void 0)return Tt("GRPC error has no .code"),R.UNKNOWN;switch(n){case me.OK:return R.OK;case me.CANCELLED:return R.CANCELLED;case me.UNKNOWN:return R.UNKNOWN;case me.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case me.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case me.INTERNAL:return R.INTERNAL;case me.UNAVAILABLE:return R.UNAVAILABLE;case me.UNAUTHENTICATED:return R.UNAUTHENTICATED;case me.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case me.NOT_FOUND:return R.NOT_FOUND;case me.ALREADY_EXISTS:return R.ALREADY_EXISTS;case me.PERMISSION_DENIED:return R.PERMISSION_DENIED;case me.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case me.ABORTED:return R.ABORTED;case me.OUT_OF_RANGE:return R.OUT_OF_RANGE;case me.UNIMPLEMENTED:return R.UNIMPLEMENTED;case me.DATA_LOSS:return R.DATA_LOSS;default:return z(39323,{code:n})}}(ee=me||(me={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Xm(){return new TextEncoder}/**
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
 */const Qm=new $t([4294967295,4294967295],0);function Bl(n){const e=Xm().encode(n),t=new Qd;return t.update(e),new Uint8Array(t.digest())}function Ul(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),o=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new $t([t,r],0),new $t([o,s],0)]}class di{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new vr(`Invalid padding: ${t}`);if(r<0)throw new vr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new vr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new vr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=$t.fromNumber(this.ge)}ye(e,t,r){let o=e.add(t.multiply($t.fromNumber(r)));return o.compare(Qm)===1&&(o=new $t([o.getBits(0),o.getBits(1)],0)),o.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Bl(e),[r,o]=Ul(t);for(let s=0;s<this.hashCount;s++){const i=this.ye(r,o,s);if(!this.we(i))return!1}return!0}static create(e,t,r){const o=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new di(s,o,t);return r.forEach(l=>i.insert(l)),i}insert(e){if(this.ge===0)return;const t=Bl(e),[r,o]=Ul(t);for(let s=0;s<this.hashCount;s++){const i=this.ye(r,o,s);this.Se(i)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class vr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class _s{constructor(e,t,r,o,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=o,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const o=new Map;return o.set(e,Kr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new _s(H.min(),o,new he(Y),St(),J())}}class Kr{constructor(e,t,r,o,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=o,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Kr(r,t,J(),J(),J())}}/**
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
 */class Vo{constructor(e,t,r,o){this.be=e,this.removedTargetIds=t,this.key=r,this.De=o}}class Fu{constructor(e,t){this.targetId=e,this.Ce=t}}class $u{constructor(e,t,r=Te.EMPTY_BYTE_STRING,o=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=o}}class zl{constructor(){this.ve=0,this.Fe=ql(),this.Me=Te.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=J(),t=J(),r=J();return this.Fe.forEach((o,s)=>{switch(s){case 0:e=e.add(o);break;case 2:t=t.add(o);break;case 1:r=r.add(o);break;default:z(38017,{changeType:s})}}),new Kr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=ql()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,se(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Ym{constructor(e){this.Ge=e,this.ze=new Map,this.je=St(),this.Je=Co(),this.He=Co(),this.Ye=new he(Y)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:z(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,o)=>{this.rt(o)&&t(o)})}st(e){const t=e.targetId,r=e.Ce.count,o=this.ot(t);if(o){const s=o.target;if(Ma(s))if(r===0){const i=new B(s.path);this.et(t,i,Me.newNoDocument(i,H.min()))}else se(r===1,20013,{expectedCount:r});else{const i=this._t(t);if(i!==r){const l=this.ut(e),c=l?this.ct(l,e,i):1;if(c!==0){this.it(t);const d=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:o=0},hashCount:s=0}=t;let i,l;try{i=Gt(r).toUint8Array()}catch(c){if(c instanceof du)return hn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new di(i,o,s)}catch(c){return hn(c instanceof vr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let o=0;return r.forEach(s=>{const i=this.Ge.ht(),l=`projects/${i.projectId}/databases/${i.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(t,s,null),o++)}),o}Tt(e){const t=new Map;this.ze.forEach((s,i)=>{const l=this.ot(i);if(l){if(s.current&&Ma(l.target)){const c=new B(l.target.path);this.It(c).has(i)||this.Et(i,c)||this.et(i,c,Me.newNoDocument(c,e))}s.Be&&(t.set(i,s.ke()),s.qe())}});let r=J();this.He.forEach((s,i)=>{let l=!0;i.forEachWhile(c=>{const d=this.ot(c);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.je.forEach((s,i)=>i.setReadTime(e));const o=new _s(e,t,this.Ye,this.je,r);return this.je=St(),this.Je=Co(),this.He=Co(),this.Ye=new he(Y),o}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const o=this.nt(e);this.Et(e,t)?o.Qe(t,1):o.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new zl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new be(Y),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new be(Y),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new zl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Co(){return new he(B.comparator)}function ql(){return new he(B.comparator)}const Jm={asc:"ASCENDING",desc:"DESCENDING"},Zm={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ew={and:"AND",or:"OR"};class tw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Va(n,e){return n.useProto3Json||gs(e)?e:{value:e}}function Yo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Bu(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function nw(n,e){return Yo(n,e.toTimestamp())}function at(n){return se(!!n,49232),H.fromTimestamp(function(t){const r=Ht(t);return new le(r.seconds,r.nanos)}(n))}function ui(n,e){return Oa(n,e).canonicalString()}function Oa(n,e){const t=function(o){return new ce(["projects",o.projectId,"databases",o.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Uu(n){const e=ce.fromString(n);return se(Gu(e),10190,{key:e.toString()}),e}function Fa(n,e){return ui(n.databaseId,e.path)}function wa(n,e){const t=Uu(e);if(t.get(1)!==n.databaseId.projectId)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new B(qu(t))}function zu(n,e){return ui(n.databaseId,e)}function rw(n){const e=Uu(n);return e.length===4?ce.emptyPath():qu(e)}function $a(n){return new ce(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function qu(n){return se(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function jl(n,e,t){return{name:Fa(n,e),fields:t.value.mapValue.fields}}function ow(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:z(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),o=e.targetChange.targetIds||[],s=function(d,h){return d.useProto3Json?(se(h===void 0||typeof h=="string",58123),Te.fromBase64String(h||"")):(se(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Te.fromUint8Array(h||new Uint8Array))}(n,e.targetChange.resumeToken),i=e.targetChange.cause,l=i&&function(d){const h=d.code===void 0?R.UNKNOWN:Ou(d.code);return new V(h,d.message||"")}(i);t=new $u(r,o,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const o=wa(n,r.document.name),s=at(r.document.updateTime),i=r.document.createTime?at(r.document.createTime):H.min(),l=new ze({mapValue:{fields:r.document.fields}}),c=Me.newFoundDocument(o,s,i,l),d=r.targetIds||[],h=r.removedTargetIds||[];t=new Vo(d,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const o=wa(n,r.document),s=r.readTime?at(r.readTime):H.min(),i=Me.newNoDocument(o,s),l=r.removedTargetIds||[];t=new Vo([],l,i.key,i)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const o=wa(n,r.document),s=r.removedTargetIds||[];t=new Vo([],s,o,null)}else{if(!("filter"in e))return z(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:o=0,unchangedNames:s}=r,i=new Wm(o,s),l=r.targetId;t=new Fu(l,i)}}return t}function sw(n,e){let t;if(e instanceof Wr)t={update:jl(n,e.key,e.value)};else if(e instanceof ci)t={delete:Fa(n,e.key)};else if(e instanceof Zt)t={update:jl(n,e.key,e.data),updateMask:gw(e.fieldMask)};else{if(!(e instanceof jm))return z(16599,{Vt:e.type});t={verify:Fa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const l=i.transform;if(l instanceof Or)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof qn)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof jn)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Qo)return{fieldPath:i.field.canonicalString(),increment:l.Ae};throw z(20930,{transform:i.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(o,s){return s.updateTime!==void 0?{updateTime:nw(o,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:z(27497)}(n,e.precondition)),t}function aw(n,e){return n&&n.length>0?(se(e!==void 0,14353),n.map(t=>function(o,s){let i=o.updateTime?at(o.updateTime):at(s);return i.isEqual(H.min())&&(i=at(s)),new Um(i,o.transformResults||[])}(t,e))):[]}function iw(n,e){return{documents:[zu(n,e.path)]}}function cw(n,e){const t={structuredQuery:{}},r=e.path;let o;e.collectionGroup!==null?(o=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(o=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=zu(n,o);const s=function(d){if(d.length!==0)return Hu(rt.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const i=function(d){if(d.length!==0)return d.map(h=>function(m){return{field:Pn(m.field),direction:uw(m.dir)}}(h))}(e.orderBy);i&&(t.structuredQuery.orderBy=i);const l=Va(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:o}}function lw(n){let e=rw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let o=null;if(r>0){se(r===1,65062);const h=t.from[0];h.allDescendants?o=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=function(g){const m=ju(g);return m instanceof rt&&bu(m)?m.getFilters():[m]}(t.where));let i=[];t.orderBy&&(i=function(g){return g.map(m=>function(b){return new Vr(Dn(b.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(g){let m;return m=typeof g=="object"?g.value:g,gs(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(g){const m=!!g.before,v=g.values||[];return new Ko(v,m)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const m=!g.before,v=g.values||[];return new Ko(v,m)}(t.endAt)),km(e,o,i,s,l,"F",c,d)}function dw(n,e){const t=function(o){switch(o){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:o})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ju(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Dn(t.unaryFilter.field);return we.create(r,"==",{doubleValue:NaN});case"IS_NULL":const o=Dn(t.unaryFilter.field);return we.create(o,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Dn(t.unaryFilter.field);return we.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Dn(t.unaryFilter.field);return we.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}}(n):n.fieldFilter!==void 0?function(t){return we.create(Dn(t.fieldFilter.field),function(o){switch(o){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(r=>ju(r)),function(o){switch(o){case"AND":return"and";case"OR":return"or";default:return z(1026)}}(t.compositeFilter.op))}(n):z(30097,{filter:n})}function uw(n){return Jm[n]}function hw(n){return Zm[n]}function pw(n){return ew[n]}function Pn(n){return{fieldPath:n.canonicalString()}}function Dn(n){return Ee.fromServerFormat(n.fieldPath)}function Hu(n){return n instanceof we?function(t){if(t.op==="=="){if(Pl(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NAN"}};if(Rl(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Pl(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NOT_NAN"}};if(Rl(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pn(t.field),op:hw(t.op),value:t.value}}}(n):n instanceof rt?function(t){const r=t.getFilters().map(o=>Hu(o));return r.length===1?r[0]:{compositeFilter:{op:pw(t.op),filters:r}}}(n):z(54877,{filter:n})}function gw(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Gu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Lt{constructor(e,t,r,o,s=H.min(),i=H.min(),l=Te.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=o,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Lt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class fw{constructor(e){this.yt=e}}function mw(n){const e=lw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Xo(e,e.limit,"L"):e}/**
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
 */class ww{constructor(){this.Cn=new yw}addToCollectionParentIndex(e,t){return this.Cn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(jt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(jt.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class yw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),o=this.index[t]||new be(ce.comparator),s=!o.has(r);return this.index[t]=o.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),o=this.index[t];return o&&o.has(r)}getEntries(e){return(this.index[e]||new be(ce.comparator)).toArray()}}/**
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
 */const Hl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Wu=41943040;class Ue{static withCacheSize(e){return new Ue(e,Ue.DEFAULT_COLLECTION_PERCENTILE,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ue.DEFAULT_COLLECTION_PERCENTILE=10,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ue.DEFAULT=new Ue(Wu,Ue.DEFAULT_COLLECTION_PERCENTILE,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ue.DISABLED=new Ue(-1,0,0);/**
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
 */class Hn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Hn(0)}static cr(){return new Hn(-1)}}/**
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
 */const Gl="LruGarbageCollector",vw=1048576;function Wl([n,e],[t,r]){const o=Y(n,t);return o===0?Y(e,r):o}class bw{constructor(e){this.Ir=e,this.buffer=new be(Wl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Wl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class _w{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){O(Gl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Jn(t)?O(Gl,"Ignoring IndexedDB error during garbage collection: ",t):await Yn(t)}await this.Vr(3e5)})}}class xw{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return P.resolve(ps.ce);const r=new bw(t);return this.mr.forEachTarget(e,o=>r.Ar(o.sequenceNumber)).next(()=>this.mr.pr(e,o=>r.Ar(o))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Hl)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Hl):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,o,s,i,l,c,d;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),o=this.params.maximumSequenceNumbersToCollect):o=g,i=Date.now(),this.nthSequenceNumber(e,o))).next(g=>(r=g,l=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),Cn()<=Q.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${i-h}ms
	Determined least recently used ${o} in `+(l-i)+`ms
	Removed ${s} targets in `+(c-l)+`ms
	Removed ${g} documents in `+(d-c)+`ms
Total Duration: ${d-h}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:o,targetsRemoved:s,documentsRemoved:g})))}}function Ew(n,e){return new xw(n,e)}/**
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
 */class Tw{constructor(){this.changes=new wn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Sw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Iw{constructor(e,t,r,o){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=o}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(o=>(r=o,this.remoteDocumentCache.getEntry(e,t))).next(o=>(r!==null&&Tr(r.mutation,o,We.empty(),le.now()),o))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,J()).next(()=>r))}getLocalViewOfDocuments(e,t,r=J()){const o=an();return this.populateOverlays(e,o,t).next(()=>this.computeViews(e,t,o,r).next(s=>{let i=yr();return s.forEach((l,c)=>{i=i.insert(l,c.overlayedDocument)}),i}))}getOverlayedDocuments(e,t){const r=an();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,J()))}populateOverlays(e,t,r){const o=[];return r.forEach(s=>{t.has(s)||o.push(s)}),this.documentOverlayCache.getOverlays(e,o).next(s=>{s.forEach((i,l)=>{t.set(i,l)})})}computeViews(e,t,r,o){let s=St();const i=Er(),l=function(){return Er()}();return t.forEach((c,d)=>{const h=r.get(d.key);o.has(d.key)&&(h===void 0||h.mutation instanceof Zt)?s=s.insert(d.key,d):h!==void 0?(i.set(d.key,h.mutation.getFieldMask()),Tr(h.mutation,d,h.mutation.getFieldMask(),le.now())):i.set(d.key,We.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((d,h)=>i.set(d,h)),t.forEach((d,h)=>l.set(d,new Sw(h,i.get(d)??null))),l))}recalculateAndSaveOverlays(e,t){const r=Er();let o=new he((i,l)=>i-l),s=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(i=>{for(const l of i)l.keys().forEach(c=>{const d=t.get(c);if(d===null)return;let h=r.get(c)||We.empty();h=l.applyToLocalView(d,h),r.set(c,h);const g=(o.get(l.batchId)||J()).add(c);o=o.insert(l.batchId,g)})}).next(()=>{const i=[],l=o.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),d=c.key,h=c.value,g=Cu();h.forEach(m=>{if(!s.has(m)){const v=Lu(t.get(m),r.get(m));v!==null&&g.set(m,v),s=s.add(m)}}),i.push(this.documentOverlayCache.saveOverlays(e,d,g))}return P.waitFor(i)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,o){return function(i){return B.isDocumentKey(i.path)&&i.collectionGroup===null&&i.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Tu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,o):this.getDocumentsMatchingCollectionQuery(e,t,r,o)}getNextDocuments(e,t,r,o){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,o).next(s=>{const i=o-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,o-s.size):P.resolve(an());let l=Nr,c=s;return i.next(d=>P.forEach(d,(h,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),s.get(h)?P.resolve():this.remoteDocumentCache.getEntry(e,h).next(m=>{c=c.insert(h,m)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,c,d,J())).next(h=>({batchId:l,changes:ku(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(r=>{let o=yr();return r.isFoundDocument()&&(o=o.insert(r.key,r)),o})}getDocumentsMatchingCollectionGroupQuery(e,t,r,o){const s=t.collectionGroup;let i=yr();return this.indexManager.getCollectionParents(e,s).next(l=>P.forEach(l,c=>{const d=function(g,m){return new Zn(m,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,o).next(h=>{h.forEach((g,m)=>{i=i.insert(g,m)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,r,o){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,o))).next(i=>{s.forEach((c,d)=>{const h=d.getKey();i.get(h)===null&&(i=i.insert(h,Me.newInvalidDocument(h)))});let l=yr();return i.forEach((c,d)=>{const h=s.get(c);h!==void 0&&Tr(h.mutation,d,We.empty(),le.now()),ys(t,d)&&(l=l.insert(c,d))}),l})}}/**
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
 */class Aw{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return P.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(o){return{id:o.id,version:o.version,createTime:at(o.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(o){return{name:o.name,query:mw(o.bundledQuery),readTime:at(o.readTime)}}(t)),P.resolve()}}/**
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
 */class kw{constructor(){this.overlays=new he(B.comparator),this.qr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=an();return P.forEach(t,o=>this.getOverlay(e,o).next(s=>{s!==null&&r.set(o,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((o,s)=>{this.St(e,t,s)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const o=this.qr.get(r);return o!==void 0&&(o.forEach(s=>this.overlays=this.overlays.remove(s)),this.qr.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const o=an(),s=t.length+1,i=new B(t.child("")),l=this.overlays.getIteratorFrom(i);for(;l.hasNext();){const c=l.getNext().value,d=c.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&c.largestBatchId>r&&o.set(c.getKey(),c)}return P.resolve(o)}getOverlaysForCollectionGroup(e,t,r,o){let s=new he((d,h)=>d-h);const i=this.overlays.getIterator();for(;i.hasNext();){const d=i.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let h=s.get(d.largestBatchId);h===null&&(h=an(),s=s.insert(d.largestBatchId,h)),h.set(d.getKey(),d)}}const l=an(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((d,h)=>l.set(d,h)),!(l.size()>=o)););return P.resolve(l)}St(e,t,r){const o=this.overlays.get(r.key);if(o!==null){const i=this.qr.get(o.largestBatchId).delete(r.key);this.qr.set(o.largestBatchId,i)}this.overlays=this.overlays.insert(r.key,new Gm(t,r));let s=this.qr.get(t);s===void 0&&(s=J(),this.qr.set(t,s)),this.qr.set(t,s.add(r.key))}}/**
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
 */class Cw{constructor(){this.sessionToken=Te.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class hi{constructor(){this.Qr=new be(xe.$r),this.Ur=new be(xe.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new xe(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new xe(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new B(new ce([])),r=new xe(t,e),o=new xe(t,e+1),s=[];return this.Ur.forEachInRange([r,o],i=>{this.Gr(i),s.push(i.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new B(new ce([])),r=new xe(t,e),o=new xe(t,e+1);let s=J();return this.Ur.forEachInRange([r,o],i=>{s=s.add(i.key)}),s}containsKey(e){const t=new xe(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class xe{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return B.comparator(e.key,t.key)||Y(e.Yr,t.Yr)}static Kr(e,t){return Y(e.Yr,t.Yr)||B.comparator(e.key,t.key)}}/**
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
 */class Rw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new be(xe.$r)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,o){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new Hm(s,t,r,o);this.mutationQueue.push(i);for(const l of o)this.Zr=this.Zr.add(new xe(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return P.resolve(i)}lookupMutationBatch(e,t){return P.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,o=this.ei(r),s=o<0?0:o;return P.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?ti:this.tr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new xe(t,0),o=new xe(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([r,o],i=>{const l=this.Xr(i.Yr);s.push(l)}),P.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new be(Y);return t.forEach(o=>{const s=new xe(o,0),i=new xe(o,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([s,i],l=>{r=r.add(l.Yr)})}),P.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,o=r.length+1;let s=r;B.isDocumentKey(s)||(s=s.child(""));const i=new xe(new B(s),0);let l=new be(Y);return this.Zr.forEachWhile(c=>{const d=c.key.path;return!!r.isPrefixOf(d)&&(d.length===o&&(l=l.add(c.Yr)),!0)},i),P.resolve(this.ti(l))}ti(e){const t=[];return e.forEach(r=>{const o=this.Xr(r);o!==null&&t.push(o)}),t}removeMutationBatch(e,t){se(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return P.forEach(t.mutations,o=>{const s=new xe(o.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new xe(t,0),o=this.Zr.firstAfterOrEqual(r);return P.resolve(t.isEqual(o&&o.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Pw{constructor(e){this.ri=e,this.docs=function(){return new he(B.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,o=this.docs.get(r),s=o?o.size:0,i=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=St();return t.forEach(o=>{const s=this.docs.get(o);r=r.insert(o,s?s.document.mutableCopy():Me.newInvalidDocument(o))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,o){let s=St();const i=t.path,l=new B(i.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:d,value:{document:h}}=c.getNext();if(!i.isPrefixOf(d.path))break;d.path.length>i.length+1||am(sm(h),r)<=0||(o.has(h.key)||ys(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return P.resolve(s)}getAllFromCollectionGroup(e,t,r,o){z(9500)}ii(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Dw(this)}getSize(e){return P.resolve(this.size)}}class Dw extends Tw{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,o)=>{o.isValidDocument()?t.push(this.Nr.addEntry(e,o)):this.Nr.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class Nw{constructor(e){this.persistence=e,this.si=new wn(t=>oi(t),si),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new hi,this.targetCount=0,this.ai=Hn.ur()}forEachTarget(e,t){return this.si.forEach((r,o)=>t(o)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),P.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Hn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Pr(t),P.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let o=0;const s=[];return this.si.forEach((i,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(i),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),o++)}),P.waitFor(s).next(()=>o)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const o=this.persistence.referenceDelegate,s=[];return o&&t.forEach(i=>{s.push(o.markPotentiallyOrphaned(e,i))}),P.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this._i.containsKey(t))}}/**
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
 */class Ku{constructor(e,t){this.ui={},this.overlays={},this.ci=new ps(0),this.li=!1,this.li=!0,this.hi=new Cw,this.referenceDelegate=e(this),this.Pi=new Nw(this),this.indexManager=new ww,this.remoteDocumentCache=function(o){return new Pw(o)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new fw(t),this.Ii=new Aw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new kw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new Rw(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const o=new Mw(this.ci.next());return this.referenceDelegate.Ei(),r(o).next(s=>this.referenceDelegate.di(o).next(()=>s)).toPromise().then(s=>(o.raiseOnCommittedEvent(),s))}Ai(e,t){return P.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class Mw extends cm{constructor(e){super(),this.currentSequenceNumber=e}}class pi{constructor(e){this.persistence=e,this.Ri=new hi,this.Vi=null}static mi(e){return new pi(e)}get fi(){if(this.Vi)return this.Vi;throw z(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(o=>this.fi.add(o.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(o=>{o.forEach(s=>this.fi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.fi,r=>{const o=B.fromPath(r);return this.gi(e,o).next(s=>{s||t.removeEntry(o,H.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return P.or([()=>P.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Jo{constructor(e,t){this.persistence=e,this.pi=new wn(r=>um(r.path),(r,o)=>r.isEqual(o)),this.garbageCollector=Ew(this,t)}static mi(e,t){return new Jo(e,t)}Ei(){}di(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(o=>r+o))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return P.forEach(this.pi,(r,o)=>this.br(e,r,o).next(s=>s?P.resolve():t(o)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const o=this.persistence.getRemoteDocumentCache(),s=o.newChangeBuffer();return o.ii(e,i=>this.br(e,i,t).next(l=>{l||(r++,s.removeEntry(i,H.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=No(e.data.value)),t}br(e,t,r){return P.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const o=this.pi.get(t);return P.resolve(o!==void 0&&o>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class gi{constructor(e,t,r,o){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=o}static As(e,t){let r=J(),o=J();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:o=o.add(s.doc.key)}return new gi(e,t.fromCache,r,o)}}/**
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
 */class Lw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Vw{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Cg()?8:lm(Le())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,o){const s={result:null};return this.ys(e,t).next(i=>{s.result=i}).next(()=>{if(!s.result)return this.ws(e,t,o,r).next(i=>{s.result=i})}).next(()=>{if(s.result)return;const i=new Lw;return this.Ss(e,t,i).next(l=>{if(s.result=l,this.Vs)return this.bs(e,t,i,l.size)})}).next(()=>s.result)}bs(e,t,r,o){return r.documentReadCount<this.fs?(Cn()<=Q.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Rn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),P.resolve()):(Cn()<=Q.DEBUG&&O("QueryEngine","Query:",Rn(t),"scans",r.documentReadCount,"local documents and returns",o,"documents as results."),r.documentReadCount>this.gs*o?(Cn()<=Q.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Rn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,st(t))):P.resolve())}ys(e,t){if(Ll(t))return P.resolve(null);let r=st(t);return this.indexManager.getIndexType(e,r).next(o=>o===0?null:(t.limit!==null&&o===1&&(t=Xo(t,null,"F"),r=st(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const i=J(...s);return this.ps.getDocuments(e,i).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const d=this.Ds(t,l);return this.Cs(t,d,i,c.readTime)?this.ys(e,Xo(t,null,"F")):this.vs(e,d,t,c)}))})))}ws(e,t,r,o){return Ll(t)||o.isEqual(H.min())?P.resolve(null):this.ps.getDocuments(e,r).next(s=>{const i=this.Ds(t,s);return this.Cs(t,i,r,o)?P.resolve(null):(Cn()<=Q.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",o.toString(),Rn(t)),this.vs(e,i,t,om(o,Nr)).next(l=>l))})}Ds(e,t){let r=new be(Iu(e));return t.forEach((o,s)=>{ys(e,s)&&(r=r.add(s))}),r}Cs(e,t,r,o){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(o)>0)}Ss(e,t,r){return Cn()<=Q.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Rn(t)),this.ps.getDocumentsMatchingQuery(e,t,jt.min(),r)}vs(e,t,r,o){return this.ps.getDocumentsMatchingQuery(e,r,o).next(s=>(t.forEach(i=>{s=s.insert(i.key,i)}),s))}}/**
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
 */const fi="LocalStore",Ow=3e8;class Fw{constructor(e,t,r,o){this.persistence=e,this.Fs=t,this.serializer=o,this.Ms=new he(Y),this.xs=new wn(s=>oi(s),si),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Iw(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function $w(n,e,t,r){return new Fw(n,e,t,r)}async function Xu(n,e){const t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let o;return t.mutationQueue.getAllMutationBatches(r).next(s=>(o=s,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const i=[],l=[];let c=J();for(const d of o){i.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}for(const d of s){l.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(r,c).next(d=>({Ls:d,removedBatchIds:i,addedBatchIds:l}))})})}function Bw(n,e){const t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const o=e.batch.keys(),s=t.Ns.newChangeBuffer({trackRemovals:!0});return function(l,c,d,h){const g=d.batch,m=g.keys();let v=P.resolve();return m.forEach(b=>{v=v.next(()=>h.getEntry(c,b)).next(_=>{const S=d.docVersions.get(b);se(S!==null,48541),_.version.compareTo(S)<0&&(g.applyToRemoteDocument(_,d),_.isValidDocument()&&(_.setReadTime(d.commitVersion),h.addEntry(_)))})}),v.next(()=>l.mutationQueue.removeMutationBatch(c,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,o,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=J();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(c=c.add(l.batch.mutations[d].key));return c}(e))).next(()=>t.localDocuments.getDocuments(r,o))})}function Qu(n){const e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Uw(n,e){const t=G(n),r=e.snapshotVersion;let o=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const i=t.Ns.newChangeBuffer({trackRemovals:!0});o=t.Ms;const l=[];e.targetChanges.forEach((h,g)=>{const m=o.get(g);if(!m)return;l.push(t.Pi.removeMatchingKeys(s,h.removedDocuments,g).next(()=>t.Pi.addMatchingKeys(s,h.addedDocuments,g)));let v=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?v=v.withResumeToken(Te.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):h.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(h.resumeToken,r)),o=o.insert(g,v),function(_,S,N){return _.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-_.snapshotVersion.toMicroseconds()>=Ow?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(m,v,h)&&l.push(t.Pi.updateTargetData(s,v))});let c=St(),d=J();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))}),l.push(zw(s,i,e.documentUpdates).next(h=>{c=h.ks,d=h.qs})),!r.isEqual(H.min())){const h=t.Pi.getLastRemoteSnapshotVersion(s).next(g=>t.Pi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(h)}return P.waitFor(l).next(()=>i.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,d)).next(()=>c)}).then(s=>(t.Ms=o,s))}function zw(n,e,t){let r=J(),o=J();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let i=St();return t.forEach((l,c)=>{const d=s.get(l);c.isFoundDocument()!==d.isFoundDocument()&&(o=o.add(l)),c.isNoDocument()&&c.version.isEqual(H.min())?(e.removeEntry(l,c.readTime),i=i.insert(l,c)):!d.isValidDocument()||c.version.compareTo(d.version)>0||c.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(c),i=i.insert(l,c)):O(fi,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",c.version)}),{ks:i,qs:o}})}function qw(n,e){const t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ti),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function jw(n,e){const t=G(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let o;return t.Pi.getTargetData(r,e).next(s=>s?(o=s,P.resolve(o)):t.Pi.allocateTargetId(r).next(i=>(o=new Lt(e,i,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,o).next(()=>o))))}).then(r=>{const o=t.Ms.get(r.targetId);return(o===null||r.snapshotVersion.compareTo(o.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function Ba(n,e,t){const r=G(n),o=r.Ms.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,i=>r.persistence.referenceDelegate.removeTarget(i,o))}catch(i){if(!Jn(i))throw i;O(fi,`Failed to update sequence numbers for target ${e}: ${i}`)}r.Ms=r.Ms.remove(e),r.xs.delete(o.target)}function Kl(n,e,t){const r=G(n);let o=H.min(),s=J();return r.persistence.runTransaction("Execute query","readwrite",i=>function(c,d,h){const g=G(c),m=g.xs.get(h);return m!==void 0?P.resolve(g.Ms.get(m)):g.Pi.getTargetData(d,h)}(r,i,st(e)).next(l=>{if(l)return o=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(i,l.targetId).next(c=>{s=c})}).next(()=>r.Fs.getDocumentsMatchingQuery(i,e,t?o:H.min(),t?s:J())).next(l=>(Hw(r,Rm(e),l),{documents:l,Qs:s})))}function Hw(n,e,t){let r=n.Os.get(e)||H.min();t.forEach((o,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Os.set(e,r)}class Xl{constructor(){this.activeTargetIds=Vm()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Gw{constructor(){this.Mo=new Xl,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Xl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Ww{Oo(e){}shutdown(){}}/**
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
 */const Ql="ConnectivityMonitor";class Yl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){O(Ql,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){O(Ql,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ro=null;function Ua(){return Ro===null?Ro=function(){return 268435456+Math.round(2147483648*Math.random())}():Ro++,"0x"+Ro.toString(16)}/**
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
 */const ya="RestConnection",Kw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Xw{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${o}`,this.Wo=this.databaseId.database===Go?`project_id=${r}`:`project_id=${r}&database_id=${o}`}Go(e,t,r,o,s){const i=Ua(),l=this.zo(e,t.toUriEncodedString());O(ya,`Sending RPC '${e}' ${i}:`,l,r);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,o,s);const{host:d}=new URL(l),h=Kn(d);return this.Jo(e,l,c,r,h).then(g=>(O(ya,`Received RPC '${e}' ${i}: `,g),g),g=>{throw hn(ya,`RPC '${e}' ${i} failed with error: `,g,"url: ",l,"request:",r),g})}Ho(e,t,r,o,s,i){return this.Go(e,t,r,o,s)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Qn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((o,s)=>e[s]=o),r&&r.headers.forEach((o,s)=>e[s]=o)}zo(e,t){const r=Kw[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class Qw{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const De="WebChannelConnection";class Yw extends Xw{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,o,s){const i=Ua();return new Promise((l,c)=>{const d=new Yd;d.setWithCredentials(!0),d.listenOnce(Jd.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Do.NO_ERROR:const g=d.getResponseJson();O(De,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(g)),l(g);break;case Do.TIMEOUT:O(De,`RPC '${e}' ${i} timed out`),c(new V(R.DEADLINE_EXCEEDED,"Request time out"));break;case Do.HTTP_ERROR:const m=d.getStatus();if(O(De,`RPC '${e}' ${i} failed with status:`,m,"response text:",d.getResponseText()),m>0){let v=d.getResponseJson();Array.isArray(v)&&(v=v[0]);const b=v?.error;if(b&&b.status&&b.message){const _=function(N){const M=N.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(M)>=0?M:R.UNKNOWN}(b.status);c(new V(_,b.message))}else c(new V(R.UNKNOWN,"Server responded with status "+d.getStatus()))}else c(new V(R.UNAVAILABLE,"Connection failed."));break;default:z(9055,{l_:e,streamId:i,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{O(De,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(o);O(De,`RPC '${e}' ${i} sending request:`,o),d.send(t,"POST",h,r,15)})}T_(e,t,r){const o=Ua(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=tu(),l=eu(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=s.join("");O(De,`Creating RPC '${e}' stream ${o}: ${h}`,c);const g=i.createWebChannel(h,c);this.I_(g);let m=!1,v=!1;const b=new Qw({Yo:S=>{v?O(De,`Not sending because RPC '${e}' stream ${o} is closed:`,S):(m||(O(De,`Opening RPC '${e}' stream ${o} transport.`),g.open(),m=!0),O(De,`RPC '${e}' stream ${o} sending:`,S),g.send(S))},Zo:()=>g.close()}),_=(S,N,M)=>{S.listen(N,F=>{try{M(F)}catch(Z){setTimeout(()=>{throw Z},0)}})};return _(g,wr.EventType.OPEN,()=>{v||(O(De,`RPC '${e}' stream ${o} transport opened.`),b.o_())}),_(g,wr.EventType.CLOSE,()=>{v||(v=!0,O(De,`RPC '${e}' stream ${o} transport closed`),b.a_(),this.E_(g))}),_(g,wr.EventType.ERROR,S=>{v||(v=!0,hn(De,`RPC '${e}' stream ${o} transport errored. Name:`,S.name,"Message:",S.message),b.a_(new V(R.UNAVAILABLE,"The operation could not be completed")))}),_(g,wr.EventType.MESSAGE,S=>{if(!v){const N=S.data[0];se(!!N,16349);const M=N,F=M?.error||M[0]?.error;if(F){O(De,`RPC '${e}' stream ${o} received error:`,F);const Z=F.status;let K=function(w){const y=me[w];if(y!==void 0)return Ou(y)}(Z),ne=F.message;K===void 0&&(K=R.INTERNAL,ne="Unknown error status: "+Z+" with message "+F.message),v=!0,b.a_(new V(K,ne)),g.close()}else O(De,`RPC '${e}' stream ${o} received:`,N),b.u_(N)}}),_(l,Zd.STAT_EVENT,S=>{S.stat===Ca.PROXY?O(De,`RPC '${e}' stream ${o} detected buffering proxy`):S.stat===Ca.NOPROXY&&O(De,`RPC '${e}' stream ${o} detected no buffering proxy`)}),setTimeout(()=>{b.__()},0),b}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function va(){return typeof document<"u"?document:null}/**
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
 */function xs(n){return new tw(n,!0)}/**
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
 */class Yu{constructor(e,t,r=1e3,o=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=o,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),o=Math.max(0,t-r);o>0&&O("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,o,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Jl="PersistentStream";class Ju{constructor(e,t,r,o,s,i,l,c){this.Mi=e,this.S_=r,this.b_=o,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Yu(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(Tt(t.toString()),Tt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,o])=>{this.D_===t&&this.G_(r,o)},r=>{e(()=>{const o=new V(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(o)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(o=>{r(()=>this.z_(o))}),this.stream.onMessage(o=>{r(()=>++this.F_==1?this.J_(o):this.onNext(o))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return O(Jl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(O(Jl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Jw extends Ju{constructor(e,t,r,o,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,o,i),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=ow(this.serializer,e),r=function(s){if(!("targetChange"in s))return H.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?H.min():i.readTime?at(i.readTime):H.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=$a(this.serializer),t.addTarget=function(s,i){let l;const c=i.target;if(l=Ma(c)?{documents:iw(s,c)}:{query:cw(s,c).ft},l.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){l.resumeToken=Bu(s,i.resumeToken);const d=Va(s,i.expectedCount);d!==null&&(l.expectedCount=d)}else if(i.snapshotVersion.compareTo(H.min())>0){l.readTime=Yo(s,i.snapshotVersion.toTimestamp());const d=Va(s,i.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=dw(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=$a(this.serializer),t.removeTarget=e,this.q_(t)}}class Zw extends Ju{constructor(e,t,r,o,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,o,i),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return se(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,se(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){se(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=aw(e.writeResults,e.commitTime),r=at(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=$a(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>sw(this.serializer,r))};this.q_(t)}}/**
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
 */class ey{}class ty extends ey{constructor(e,t,r,o){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=o,this.ia=!1}sa(){if(this.ia)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Go(e,Oa(t,r),o,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(R.UNKNOWN,s.toString())})}Ho(e,t,r,o,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,l])=>this.connection.Ho(e,Oa(t,r),o,i,l,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(R.UNKNOWN,i.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class ny{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Tt(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const pn="RemoteStore";class ry{constructor(e,t,r,o,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(i=>{r.enqueueAndForget(async()=>{yn(this)&&(O(pn,"Restarting streams for network reachability change."),await async function(c){const d=G(c);d.Ea.add(4),await Xr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await Es(d)}(this))})}),this.Ra=new ny(r,o)}}async function Es(n){if(yn(n))for(const e of n.da)await e(!0)}async function Xr(n){for(const e of n.da)await e(!1)}function Zu(n,e){const t=G(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),vi(t)?yi(t):er(t).O_()&&wi(t,e))}function mi(n,e){const t=G(n),r=er(t);t.Ia.delete(e),r.O_()&&eh(t,e),t.Ia.size===0&&(r.O_()?r.L_():yn(t)&&t.Ra.set("Unknown"))}function wi(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}er(n).Y_(e)}function eh(n,e){n.Va.Ue(e),er(n).Z_(e)}function yi(n){n.Va=new Ym({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),er(n).start(),n.Ra.ua()}function vi(n){return yn(n)&&!er(n).x_()&&n.Ia.size>0}function yn(n){return G(n).Ea.size===0}function th(n){n.Va=void 0}async function oy(n){n.Ra.set("Online")}async function sy(n){n.Ia.forEach((e,t)=>{wi(n,e)})}async function ay(n,e){th(n),vi(n)?(n.Ra.ha(e),yi(n)):n.Ra.set("Unknown")}async function iy(n,e,t){if(n.Ra.set("Online"),e instanceof $u&&e.state===2&&e.cause)try{await async function(o,s){const i=s.cause;for(const l of s.targetIds)o.Ia.has(l)&&(await o.remoteSyncer.rejectListen(l,i),o.Ia.delete(l),o.Va.removeTarget(l))}(n,e)}catch(r){O(pn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Zo(n,r)}else if(e instanceof Vo?n.Va.Ze(e):e instanceof Fu?n.Va.st(e):n.Va.tt(e),!t.isEqual(H.min()))try{const r=await Qu(n.localStore);t.compareTo(r)>=0&&await function(s,i){const l=s.Va.Tt(i);return l.targetChanges.forEach((c,d)=>{if(c.resumeToken.approximateByteSize()>0){const h=s.Ia.get(d);h&&s.Ia.set(d,h.withResumeToken(c.resumeToken,i))}}),l.targetMismatches.forEach((c,d)=>{const h=s.Ia.get(c);if(!h)return;s.Ia.set(c,h.withResumeToken(Te.EMPTY_BYTE_STRING,h.snapshotVersion)),eh(s,c);const g=new Lt(h.target,c,d,h.sequenceNumber);wi(s,g)}),s.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){O(pn,"Failed to raise snapshot:",r),await Zo(n,r)}}async function Zo(n,e,t){if(!Jn(e))throw e;n.Ea.add(1),await Xr(n),n.Ra.set("Offline"),t||(t=()=>Qu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(pn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Es(n)})}function nh(n,e){return e().catch(t=>Zo(n,t,e))}async function Ts(n){const e=G(n),t=Kt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ti;for(;cy(e);)try{const o=await qw(e.localStore,r);if(o===null){e.Ta.length===0&&t.L_();break}r=o.batchId,ly(e,o)}catch(o){await Zo(e,o)}rh(e)&&oh(e)}function cy(n){return yn(n)&&n.Ta.length<10}function ly(n,e){n.Ta.push(e);const t=Kt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function rh(n){return yn(n)&&!Kt(n).x_()&&n.Ta.length>0}function oh(n){Kt(n).start()}async function dy(n){Kt(n).ra()}async function uy(n){const e=Kt(n);for(const t of n.Ta)e.ea(t.mutations)}async function hy(n,e,t){const r=n.Ta.shift(),o=li.from(r,e,t);await nh(n,()=>n.remoteSyncer.applySuccessfulWrite(o)),await Ts(n)}async function py(n,e){e&&Kt(n).X_&&await async function(r,o){if(function(i){return Km(i)&&i!==R.ABORTED}(o.code)){const s=r.Ta.shift();Kt(r).B_(),await nh(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,o)),await Ts(r)}}(n,e),rh(n)&&oh(n)}async function Zl(n,e){const t=G(n);t.asyncQueue.verifyOperationInProgress(),O(pn,"RemoteStore received new credentials");const r=yn(t);t.Ea.add(3),await Xr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Es(t)}async function gy(n,e){const t=G(n);e?(t.Ea.delete(2),await Es(t)):e||(t.Ea.add(2),await Xr(t),t.Ra.set("Unknown"))}function er(n){return n.ma||(n.ma=function(t,r,o){const s=G(t);return s.sa(),new Jw(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,o)}(n.datastore,n.asyncQueue,{Xo:oy.bind(null,n),t_:sy.bind(null,n),r_:ay.bind(null,n),H_:iy.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),vi(n)?yi(n):n.Ra.set("Unknown")):(await n.ma.stop(),th(n))})),n.ma}function Kt(n){return n.fa||(n.fa=function(t,r,o){const s=G(t);return s.sa(),new Zw(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,o)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:dy.bind(null,n),r_:py.bind(null,n),ta:uy.bind(null,n),na:hy.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Ts(n)):(await n.fa.stop(),n.Ta.length>0&&(O(pn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class bi{constructor(e,t,r,o,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=o,this.removalCallback=s,this.deferred=new bt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(i=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,o,s){const i=Date.now()+r,l=new bi(e,t,i,o,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function _i(n,e){if(Tt("AsyncQueue",`${e}: ${n}`),Jn(n))return new V(R.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Mn{static emptySet(e){return new Mn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||B.comparator(t.key,r.key):(t,r)=>B.comparator(t.key,r.key),this.keyedMap=yr(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Mn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const o=t.getNext().key,s=r.getNext().key;if(!o.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Mn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class ed{constructor(){this.ga=new he(B.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):z(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Gn{constructor(e,t,r,o,s,i,l,c,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=o,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,o,s){const i=[];return t.forEach(l=>{i.push({type:0,doc:l})}),new Gn(e,t,Mn.emptySet(t),i,r,o,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ws(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let o=0;o<t.length;o++)if(t[o].type!==r[o].type||!t[o].doc.isEqual(r[o].doc))return!1;return!0}}/**
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
 */class fy{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class my{constructor(){this.queries=td(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const o=G(t),s=o.queries;o.queries=td(),s.forEach((i,l)=>{for(const c of l.Sa)c.onError(r)})})(this,new V(R.ABORTED,"Firestore shutting down"))}}function td(){return new wn(n=>Su(n),ws)}async function xi(n,e){const t=G(n);let r=3;const o=e.query;let s=t.queries.get(o);s?!s.ba()&&e.Da()&&(r=2):(s=new fy,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(o,!0);break;case 1:s.wa=await t.onListen(o,!1);break;case 2:await t.onFirstRemoteStoreListen(o)}}catch(i){const l=_i(i,`Initialization of query '${Rn(e.query)}' failed`);return void e.onError(l)}t.queries.set(o,s),s.Sa.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&Ti(t)}async function Ei(n,e){const t=G(n),r=e.query;let o=3;const s=t.queries.get(r);if(s){const i=s.Sa.indexOf(e);i>=0&&(s.Sa.splice(i,1),s.Sa.length===0?o=e.Da()?0:1:!s.ba()&&e.Da()&&(o=2))}switch(o){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function wy(n,e){const t=G(n);let r=!1;for(const o of e){const s=o.query,i=t.queries.get(s);if(i){for(const l of i.Sa)l.Fa(o)&&(r=!0);i.wa=o}}r&&Ti(t)}function yy(n,e,t){const r=G(n),o=r.queries.get(e);if(o)for(const s of o.Sa)s.onError(t);r.queries.delete(e)}function Ti(n){n.Ca.forEach(e=>{e.next()})}var za,nd;(nd=za||(za={})).Ma="default",nd.Cache="cache";class Si{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const o of e.docChanges)o.type!==3&&r.push(o);e=new Gn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Gn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==za.Cache}}/**
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
 */class sh{constructor(e){this.key=e}}class ah{constructor(e){this.key=e}}class vy{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=J(),this.mutatedKeys=J(),this.eu=Iu(e),this.tu=new Mn(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new ed,o=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,i=o,l=!1;const c=this.query.limitType==="F"&&o.size===this.query.limit?o.last():null,d=this.query.limitType==="L"&&o.size===this.query.limit?o.first():null;if(e.inorderTraversal((h,g)=>{const m=o.get(h),v=ys(this.query,g)?g:null,b=!!m&&this.mutatedKeys.has(m.key),_=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let S=!1;m&&v?m.data.isEqual(v.data)?b!==_&&(r.track({type:3,doc:v}),S=!0):this.su(m,v)||(r.track({type:2,doc:v}),S=!0,(c&&this.eu(v,c)>0||d&&this.eu(v,d)<0)&&(l=!0)):!m&&v?(r.track({type:0,doc:v}),S=!0):m&&!v&&(r.track({type:1,doc:m}),S=!0,(c||d)&&(l=!0)),S&&(v?(i=i.add(v),s=_?s.add(h):s.delete(h)):(i=i.delete(h),s=s.delete(h)))}),this.query.limit!==null)for(;i.size>this.query.limit;){const h=this.query.limitType==="F"?i.last():i.first();i=i.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{tu:i,iu:r,Cs:l,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,o){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const i=e.iu.ya();i.sort((h,g)=>function(v,b){const _=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{Rt:S})}};return _(v)-_(b)}(h.type,g.type)||this.eu(h.doc,g.doc)),this.ou(r),o=o??!1;const l=t&&!o?this._u():[],c=this.Xa.size===0&&this.current&&!o?1:0,d=c!==this.Za;return this.Za=c,i.length!==0||d?{snapshot:new Gn(this.query,e.tu,s,i,e.mutatedKeys,c===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new ed,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=J(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new ah(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new sh(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=J();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Gn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ii="SyncEngine";class by{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class _y{constructor(e){this.key=e,this.hu=!1}}class xy{constructor(e,t,r,o,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=o,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new wn(l=>Su(l),ws),this.Iu=new Map,this.Eu=new Set,this.du=new he(B.comparator),this.Au=new Map,this.Ru=new hi,this.Vu={},this.mu=new Map,this.fu=Hn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Ey(n,e,t=!0){const r=hh(n);let o;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),o=s.view.lu()):o=await ih(r,e,t,!0),o}async function Ty(n,e){const t=hh(n);await ih(t,e,!0,!1)}async function ih(n,e,t,r){const o=await jw(n.localStore,st(e)),s=o.targetId,i=n.sharedClientState.addLocalQueryTarget(s,t);let l;return r&&(l=await Sy(n,e,s,i==="current",o.resumeToken)),n.isPrimaryClient&&t&&Zu(n.remoteStore,o),l}async function Sy(n,e,t,r,o){n.pu=(g,m,v)=>async function(_,S,N,M){let F=S.view.ru(N);F.Cs&&(F=await Kl(_.localStore,S.query,!1).then(({documents:x})=>S.view.ru(x,F)));const Z=M&&M.targetChanges.get(S.targetId),K=M&&M.targetMismatches.get(S.targetId)!=null,ne=S.view.applyChanges(F,_.isPrimaryClient,Z,K);return od(_,S.targetId,ne.au),ne.snapshot}(n,g,m,v);const s=await Kl(n.localStore,e,!0),i=new vy(e,s.Qs),l=i.ru(s.documents),c=Kr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",o),d=i.applyChanges(l,n.isPrimaryClient,c);od(n,t,d.au);const h=new by(e,t,i);return n.Tu.set(e,h),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function Iy(n,e,t){const r=G(n),o=r.Tu.get(e),s=r.Iu.get(o.targetId);if(s.length>1)return r.Iu.set(o.targetId,s.filter(i=>!ws(i,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(o.targetId),r.sharedClientState.isActiveQueryTarget(o.targetId)||await Ba(r.localStore,o.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(o.targetId),t&&mi(r.remoteStore,o.targetId),qa(r,o.targetId)}).catch(Yn)):(qa(r,o.targetId),await Ba(r.localStore,o.targetId,!0))}async function Ay(n,e){const t=G(n),r=t.Tu.get(e),o=t.Iu.get(r.targetId);t.isPrimaryClient&&o.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),mi(t.remoteStore,r.targetId))}async function ky(n,e,t){const r=Ly(n);try{const o=await function(i,l){const c=G(i),d=le.now(),h=l.reduce((v,b)=>v.add(b.key),J());let g,m;return c.persistence.runTransaction("Locally write mutations","readwrite",v=>{let b=St(),_=J();return c.Ns.getEntries(v,h).next(S=>{b=S,b.forEach((N,M)=>{M.isValidDocument()||(_=_.add(N))})}).next(()=>c.localDocuments.getOverlayedDocuments(v,b)).next(S=>{g=S;const N=[];for(const M of l){const F=qm(M,g.get(M.key).overlayedDocument);F!=null&&N.push(new Zt(M.key,F,wu(F.value.mapValue),Xe.exists(!0)))}return c.mutationQueue.addMutationBatch(v,d,N,l)}).next(S=>{m=S;const N=S.applyToLocalDocumentSet(g,_);return c.documentOverlayCache.saveOverlays(v,S.batchId,N)})}).then(()=>({batchId:m.batchId,changes:ku(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(o.batchId),function(i,l,c){let d=i.Vu[i.currentUser.toKey()];d||(d=new he(Y)),d=d.insert(l,c),i.Vu[i.currentUser.toKey()]=d}(r,o.batchId,t),await Qr(r,o.changes),await Ts(r.remoteStore)}catch(o){const s=_i(o,"Failed to persist write");t.reject(s)}}async function ch(n,e){const t=G(n);try{const r=await Uw(t.localStore,e);e.targetChanges.forEach((o,s)=>{const i=t.Au.get(s);i&&(se(o.addedDocuments.size+o.modifiedDocuments.size+o.removedDocuments.size<=1,22616),o.addedDocuments.size>0?i.hu=!0:o.modifiedDocuments.size>0?se(i.hu,14607):o.removedDocuments.size>0&&(se(i.hu,42227),i.hu=!1))}),await Qr(t,r,e)}catch(r){await Yn(r)}}function rd(n,e,t){const r=G(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const o=[];r.Tu.forEach((s,i)=>{const l=i.view.va(e);l.snapshot&&o.push(l.snapshot)}),function(i,l){const c=G(i);c.onlineState=l;let d=!1;c.queries.forEach((h,g)=>{for(const m of g.Sa)m.va(l)&&(d=!0)}),d&&Ti(c)}(r.eventManager,e),o.length&&r.Pu.H_(o),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Cy(n,e,t){const r=G(n);r.sharedClientState.updateQueryState(e,"rejected",t);const o=r.Au.get(e),s=o&&o.key;if(s){let i=new he(B.comparator);i=i.insert(s,Me.newNoDocument(s,H.min()));const l=J().add(s),c=new _s(H.min(),new Map,new he(Y),i,l);await ch(r,c),r.du=r.du.remove(s),r.Au.delete(e),Ai(r)}else await Ba(r.localStore,e,!1).then(()=>qa(r,e,t)).catch(Yn)}async function Ry(n,e){const t=G(n),r=e.batch.batchId;try{const o=await Bw(t.localStore,e);dh(t,r,null),lh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Qr(t,o)}catch(o){await Yn(o)}}async function Py(n,e,t){const r=G(n);try{const o=await function(i,l){const c=G(i);return c.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let h;return c.mutationQueue.lookupMutationBatch(d,l).next(g=>(se(g!==null,37113),h=g.keys(),c.mutationQueue.removeMutationBatch(d,g))).next(()=>c.mutationQueue.performConsistencyCheck(d)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(d,h,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,h)).next(()=>c.localDocuments.getDocuments(d,h))})}(r.localStore,e);dh(r,e,t),lh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Qr(r,o)}catch(o){await Yn(o)}}function lh(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function dh(n,e,t){const r=G(n);let o=r.Vu[r.currentUser.toKey()];if(o){const s=o.get(e);s&&(t?s.reject(t):s.resolve(),o=o.remove(e)),r.Vu[r.currentUser.toKey()]=o}}function qa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||uh(n,r)})}function uh(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(mi(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Ai(n))}function od(n,e,t){for(const r of t)r instanceof sh?(n.Ru.addReference(r.key,e),Dy(n,r)):r instanceof ah?(O(Ii,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||uh(n,r.key)):z(19791,{wu:r})}function Dy(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(O(Ii,"New document in limbo: "+t),n.Eu.add(r),Ai(n))}function Ai(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new B(ce.fromString(e)),r=n.fu.next();n.Au.set(r,new _y(t)),n.du=n.du.insert(t,r),Zu(n.remoteStore,new Lt(st(ms(t.path)),r,"TargetPurposeLimboResolution",ps.ce))}}async function Qr(n,e,t){const r=G(n),o=[],s=[],i=[];r.Tu.isEmpty()||(r.Tu.forEach((l,c)=>{i.push(r.pu(c,e,t).then(d=>{if((d||t)&&r.isPrimaryClient){const h=d?!d.fromCache:t?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,h?"current":"not-current")}if(d){o.push(d);const h=gi.As(c.targetId,d);s.push(h)}}))}),await Promise.all(i),r.Pu.H_(o),await async function(c,d){const h=G(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>P.forEach(d,m=>P.forEach(m.Es,v=>h.persistence.referenceDelegate.addReference(g,m.targetId,v)).next(()=>P.forEach(m.ds,v=>h.persistence.referenceDelegate.removeReference(g,m.targetId,v)))))}catch(g){if(!Jn(g))throw g;O(fi,"Failed to update sequence numbers: "+g)}for(const g of d){const m=g.targetId;if(!g.fromCache){const v=h.Ms.get(m),b=v.snapshotVersion,_=v.withLastLimboFreeSnapshotVersion(b);h.Ms=h.Ms.insert(m,_)}}}(r.localStore,s))}async function Ny(n,e){const t=G(n);if(!t.currentUser.isEqual(e)){O(Ii,"User change. New user:",e.toKey());const r=await Xu(t.localStore,e);t.currentUser=e,function(s,i){s.mu.forEach(l=>{l.forEach(c=>{c.reject(new V(R.CANCELLED,i))})}),s.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Qr(t,r.Ls)}}function My(n,e){const t=G(n),r=t.Au.get(e);if(r&&r.hu)return J().add(r.key);{let o=J();const s=t.Iu.get(e);if(!s)return o;for(const i of s){const l=t.Tu.get(i);o=o.unionWith(l.view.nu)}return o}}function hh(n){const e=G(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ch.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=My.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Cy.bind(null,e),e.Pu.H_=wy.bind(null,e.eventManager),e.Pu.yu=yy.bind(null,e.eventManager),e}function Ly(n){const e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Ry.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Py.bind(null,e),e}class es{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=xs(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return $w(this.persistence,new Vw,e.initialUser,this.serializer)}Cu(e){return new Ku(pi.mi,this.serializer)}Du(e){return new Gw}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}es.provider={build:()=>new es};class Vy extends es{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){se(this.persistence.referenceDelegate instanceof Jo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new _w(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ue.withCacheSize(this.cacheSizeBytes):Ue.DEFAULT;return new Ku(r=>Jo.mi(r,t),this.serializer)}}class ja{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>rd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ny.bind(null,this.syncEngine),await gy(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new my}()}createDatastore(e){const t=xs(e.databaseInfo.databaseId),r=function(s){return new Yw(s)}(e.databaseInfo);return function(s,i,l,c){return new ty(s,i,l,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,o,s,i,l){return new ry(r,o,s,i,l)}(this.localStore,this.datastore,e.asyncQueue,t=>rd(this.syncEngine,t,0),function(){return Yl.v()?new Yl:new Ww}())}createSyncEngine(e,t){return function(o,s,i,l,c,d,h){const g=new xy(o,s,i,l,c,d);return h&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const r=G(t);O(pn,"RemoteStore shutting down."),r.Ea.add(5),await Xr(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ja.provider={build:()=>new ja};/**
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
 */class ki{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Tt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Xt="FirestoreClient";class Oy{constructor(e,t,r,o,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=o,this.user=Ne.UNAUTHENTICATED,this.clientId=us.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async i=>{O(Xt,"Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(O(Xt,"Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new bt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=_i(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ba(n,e){n.asyncQueue.verifyOperationInProgress(),O(Xt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async o=>{r.isEqual(o)||(await Xu(e.localStore,o),r=o)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function sd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Fy(n);O(Xt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Zl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,o)=>Zl(e.remoteStore,o)),n._onlineComponents=e}async function Fy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(Xt,"Using user provided OfflineComponentProvider");try{await ba(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(o){return o.name==="FirebaseError"?o.code===R.FAILED_PRECONDITION||o.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&o instanceof DOMException)||o.code===22||o.code===20||o.code===11}(t))throw t;hn("Error using user provided cache. Falling back to memory cache: "+t),await ba(n,new es)}}else O(Xt,"Using default OfflineComponentProvider"),await ba(n,new Vy(void 0));return n._offlineComponents}async function ph(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(Xt,"Using user provided OnlineComponentProvider"),await sd(n,n._uninitializedComponentsProvider._online)):(O(Xt,"Using default OnlineComponentProvider"),await sd(n,new ja))),n._onlineComponents}function $y(n){return ph(n).then(e=>e.syncEngine)}async function ts(n){const e=await ph(n),t=e.eventManager;return t.onListen=Ey.bind(null,e.syncEngine),t.onUnlisten=Iy.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Ty.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Ay.bind(null,e.syncEngine),t}function By(n,e,t={}){const r=new bt;return n.asyncQueue.enqueueAndForget(async()=>function(s,i,l,c,d){const h=new ki({next:m=>{h.Nu(),i.enqueueAndForget(()=>Ei(s,g));const v=m.docs.has(l);!v&&m.fromCache?d.reject(new V(R.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&m.fromCache&&c&&c.source==="server"?d.reject(new V(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(m)},error:m=>d.reject(m)}),g=new Si(ms(l.path),h,{includeMetadataChanges:!0,qa:!0});return xi(s,g)}(await ts(n),n.asyncQueue,e,t,r)),r.promise}function Uy(n,e,t={}){const r=new bt;return n.asyncQueue.enqueueAndForget(async()=>function(s,i,l,c,d){const h=new ki({next:m=>{h.Nu(),i.enqueueAndForget(()=>Ei(s,g)),m.fromCache&&c.source==="server"?d.reject(new V(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(m)},error:m=>d.reject(m)}),g=new Si(l,h,{includeMetadataChanges:!0,qa:!0});return xi(s,g)}(await ts(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function gh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const ad=new Map;/**
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
 */const fh="firestore.googleapis.com",id=!0;class cd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=fh,this.ssl=id}else this.host=e.host,this.ssl=e.ssl??id;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Wu;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<vw)throw new V(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}au("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=gh(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,o){return r.timeoutSeconds===o.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ss{constructor(e,t,r,o){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new cd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new cd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ou;switch(r.type){case"firstParty":return new Yf(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=ad.get(t);r&&(O("ComponentProvider","Removing Datastore"),ad.delete(t),r.terminate())}(this),Promise.resolve()}}function mh(n,e,t,r={}){n=$e(n,Ss);const o=Kn(e),s=n._getSettings(),i={...s,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;o&&(zd(`https://${l}`),qd("Firestore",!0)),s.host!==fh&&s.host!==l&&hn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:l,ssl:o,emulatorOptions:r};if(!xt(c,i)&&(n._setSettings(c),r.mockUserToken)){let d,h;if(typeof r.mockUserToken=="string")d=r.mockUserToken,h=Ne.MOCK_USER;else{d=bg(r.mockUserToken,n._app?.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new V(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new Ne(g)}n._authCredentials=new Kf(new ru(d,h))}}/**
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
 */class ht{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ht(this.firestore,e,this._query)}}class ue{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new _t(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ue(this.firestore,e,this._key)}toJSON(){return{type:ue._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Gr(t,ue._jsonSchema))return new ue(e,r||null,new B(ce.fromString(t.referencePath)))}}ue._jsonSchemaVersion="firestore/documentReference/1.0",ue._jsonSchema={type:ye("string",ue._jsonSchemaVersion),referencePath:ye("string")};class _t extends ht{constructor(e,t,r){super(e,t,ms(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ue(this.firestore,null,new B(e))}withConverter(e){return new _t(this.firestore,e,this._path)}}function oe(n,e,...t){if(n=ke(n),su("collection","path",e),n instanceof Ss){const r=ce.fromString(e,...t);return _l(r),new _t(n,null,r)}{if(!(n instanceof ue||n instanceof _t))throw new V(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ce.fromString(e,...t));return _l(r),new _t(n.firestore,null,r)}}function Ve(n,e,...t){if(n=ke(n),arguments.length===1&&(e=us.newId()),su("doc","path",e),n instanceof Ss){const r=ce.fromString(e,...t);return bl(r),new ue(n,null,new B(r))}{if(!(n instanceof ue||n instanceof _t))throw new V(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ce.fromString(e,...t));return bl(r),new ue(n.firestore,n instanceof _t?n.converter:null,new B(r))}}/**
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
 */const ld="AsyncQueue";class dd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Yu(this,"async_queue_retry"),this._c=()=>{const r=va();r&&O(ld,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=va();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=va();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new bt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Jn(e))throw e;O(ld,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Tt("INTERNAL UNHANDLED ERROR: ",ud(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const o=bi.createAndSchedule(this,e,t,r,s=>this.hc(s));return this.tc.push(o),o}uc(){this.nc&&z(47125,{Pc:ud(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ud(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function hd(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const o=t;for(const s of r)if(s in o&&typeof o[s]=="function")return!0;return!1}(n,["next","error","complete"])}class lt extends Ss{constructor(e,t,r,o){super(e,t,r,o),this.type="firestore",this._queue=new dd,this._persistenceKey=o?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new dd(e),this._firestoreClient=void 0,await e}}}function wh(n,e){const t=typeof n=="object"?n:Wd(),r=typeof n=="string"?n:Go,o=Za(t,"firestore").getImmediate({identifier:r});if(!o._initialized){const s=yg("firestore");s&&mh(o,...s)}return o}function Yr(n){if(n._terminated)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||zy(n),n._firestoreClient}function zy(n){const e=n._freezeSettings(),t=function(o,s,i,l){return new gm(o,s,i,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,gh(l.experimentalLongPollingOptions),l.useFetchStreams,l.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Oy(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(o){const s=o?._online.build();return{_offline:o?._offline.build(s),_online:s}}(n._componentsProvider))}/**
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
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(Te.fromBase64String(e))}catch(t){throw new V(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Gr(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:ye("string",Ge._jsonSchemaVersion),bytes:ye("string")};/**
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
 */class Jr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ee(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class vn{constructor(e){this._methodName=e}}/**
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
 */class et{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:et._jsonSchemaVersion}}static fromJSON(e){if(Gr(e,et._jsonSchema))return new et(e.latitude,e.longitude)}}et._jsonSchemaVersion="firestore/geoPoint/1.0",et._jsonSchema={type:ye("string",et._jsonSchemaVersion),latitude:ye("number"),longitude:ye("number")};/**
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
 */class tt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,o){if(r.length!==o.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==o[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:tt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Gr(e,tt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new tt(e.vectorValues);throw new V(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}tt._jsonSchemaVersion="firestore/vectorValue/1.0",tt._jsonSchema={type:ye("string",tt._jsonSchemaVersion),vectorValues:ye("object")};/**
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
 */const qy=/^__.*__$/;class jy{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Wr(e,this.data,t,this.fieldTransforms)}}class yh{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function vh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{Ac:n})}}class Is{constructor(e,t,r,o,s,i){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=o,s===void 0&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Is({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return ns(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(vh(this.Ac)&&qy.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class Hy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||xs(e)}Cc(e,t,r,o=!1){return new Is({Ac:e,methodName:t,Dc:r,path:Ee.emptyPath(),fc:!1,bc:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function As(n){const e=n._freezeSettings(),t=xs(n._databaseId);return new Hy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function bh(n,e,t,r,o,s={}){const i=n.Cc(s.merge||s.mergeFields?2:0,e,t,o);Di("Data must be an object, but it was:",i,r);const l=xh(r,i);let c,d;if(s.merge)c=new We(i.fieldMask),d=i.fieldTransforms;else if(s.mergeFields){const h=[];for(const g of s.mergeFields){const m=Ha(e,g,t);if(!i.contains(m))throw new V(R.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Th(h,m)||h.push(m)}c=new We(h),d=i.fieldTransforms.filter(g=>c.covers(g.field))}else c=null,d=i.fieldTransforms;return new jy(new ze(l),c,d)}class ks extends vn{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ks}}function _h(n,e,t){return new Is({Ac:3,Dc:e.settings.Dc,methodName:n._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Ci extends vn{_toFieldTransform(e){return new ii(e.path,new Or)}isEqual(e){return e instanceof Ci}}class Ri extends vn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=_h(this,e,!0),r=this.vc.map(s=>bn(s,t)),o=new qn(r);return new ii(e.path,o)}isEqual(e){return e instanceof Ri&&xt(this.vc,e.vc)}}class Pi extends vn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=_h(this,e,!0),r=this.vc.map(s=>bn(s,t)),o=new jn(r);return new ii(e.path,o)}isEqual(e){return e instanceof Pi&&xt(this.vc,e.vc)}}function Gy(n,e,t,r){const o=n.Cc(1,e,t);Di("Data must be an object, but it was:",o,r);const s=[],i=ze.empty();Jt(r,(c,d)=>{const h=Ni(e,c,t);d=ke(d);const g=o.yc(h);if(d instanceof ks)s.push(h);else{const m=bn(d,g);m!=null&&(s.push(h),i.set(h,m))}});const l=new We(s);return new yh(i,l,o.fieldTransforms)}function Wy(n,e,t,r,o,s){const i=n.Cc(1,e,t),l=[Ha(e,r,t)],c=[o];if(s.length%2!=0)throw new V(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)l.push(Ha(e,s[m])),c.push(s[m+1]);const d=[],h=ze.empty();for(let m=l.length-1;m>=0;--m)if(!Th(d,l[m])){const v=l[m];let b=c[m];b=ke(b);const _=i.yc(v);if(b instanceof ks)d.push(v);else{const S=bn(b,_);S!=null&&(d.push(v),h.set(v,S))}}const g=new We(d);return new yh(h,g,i.fieldTransforms)}function Ky(n,e,t,r=!1){return bn(t,n.Cc(r?4:3,e))}function bn(n,e){if(Eh(n=ke(n)))return Di("Unsupported field value:",e,n),xh(n,e);if(n instanceof vn)return function(r,o){if(!vh(o.Ac))throw o.Sc(`${r._methodName}() can only be used with update() and set()`);if(!o.path)throw o.Sc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(o);s&&o.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,o){const s=[];let i=0;for(const l of r){let c=bn(l,o.wc(i));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),i++}return{arrayValue:{values:s}}}(n,e)}return function(r,o){if((r=ke(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Om(o.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=le.fromDate(r);return{timestampValue:Yo(o.serializer,s)}}if(r instanceof le){const s=new le(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Yo(o.serializer,s)}}if(r instanceof et)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ge)return{bytesValue:Bu(o.serializer,r._byteString)};if(r instanceof ue){const s=o.databaseId,i=r.firestore._databaseId;if(!i.isEqual(s))throw o.Sc(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:ui(r.firestore._databaseId||o.databaseId,r._key.path)}}if(r instanceof tt)return function(i,l){return{mapValue:{fields:{[fu]:{stringValue:mu},[Wo]:{arrayValue:{values:i.toArray().map(d=>{if(typeof d!="number")throw l.Sc("VectorValues must only contain numeric values.");return ai(l.serializer,d)})}}}}}}(r,o);throw o.Sc(`Unsupported field value: ${hs(r)}`)}(n,e)}function xh(n,e){const t={};return lu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Jt(n,(r,o)=>{const s=bn(o,e.mc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Eh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof le||n instanceof et||n instanceof Ge||n instanceof ue||n instanceof vn||n instanceof tt)}function Di(n,e,t){if(!Eh(t)||!iu(t)){const r=hs(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function Ha(n,e,t){if((e=ke(e))instanceof Jr)return e._internalPath;if(typeof e=="string")return Ni(n,e);throw ns("Field path arguments must be of type string or ",n,!1,void 0,t)}const Xy=new RegExp("[~\\*/\\[\\]]");function Ni(n,e,t){if(e.search(Xy)>=0)throw ns(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Jr(...e.split("."))._internalPath}catch{throw ns(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ns(n,e,t,r,o){const s=r&&!r.isEmpty(),i=o!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(s||i)&&(c+=" (found",s&&(c+=` in field ${r}`),i&&(c+=` in document ${o}`),c+=")"),new V(R.INVALID_ARGUMENT,l+n+c)}function Th(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Sh{constructor(e,t,r,o,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=o,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Qy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Cs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Qy extends Sh{data(){return super.data()}}function Cs(n,e){return typeof e=="string"?Ni(n,e):e instanceof Jr?e._internalPath:e._delegate._internalPath}/**
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
 */function Ih(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Mi{}class Rs extends Mi{}function ve(n,e,...t){let r=[];e instanceof Mi&&r.push(e),r=r.concat(t),function(s){const i=s.filter(c=>c instanceof Ps).length,l=s.filter(c=>c instanceof Zr).length;if(i>1||i>0&&l>0)throw new V(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const o of r)n=o._apply(n);return n}class Zr extends Rs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Zr(e,t,r)}_apply(e){const t=this._parse(e);return Ah(e._query,t),new ht(e.firestore,e.converter,La(e._query,t))}_parse(e){const t=As(e.firestore);return function(s,i,l,c,d,h,g){let m;if(d.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new V(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){gd(g,h);const b=[];for(const _ of g)b.push(pd(c,s,_));m={arrayValue:{values:b}}}else m=pd(c,s,g)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||gd(g,h),m=Ky(l,i,g,h==="in"||h==="not-in");return we.create(d,h,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function re(n,e,t){const r=e,o=Cs("where",n);return Zr._create(o,r,t)}class Ps extends Mi{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ps(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:rt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(o,s){let i=o;const l=s.getFlattenedFilters();for(const c of l)Ah(i,c),i=La(i,c)}(e._query,t),new ht(e.firestore,e.converter,La(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ds extends Rs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ds(e,t)}_apply(e){const t=function(o,s,i){if(o.startAt!==null)throw new V(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(o.endAt!==null)throw new V(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Vr(s,i)}(e._query,this._field,this._direction);return new ht(e.firestore,e.converter,function(o,s){const i=o.explicitOrderBy.concat([s]);return new Zn(o.path,o.collectionGroup,i,o.filters.slice(),o.limit,o.limitType,o.startAt,o.endAt)}(e._query,t))}}function Yy(n,e="asc"){const t=e,r=Cs("orderBy",n);return Ds._create(r,t)}class Ns extends Rs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ns(e,t,r)}_apply(e){return new ht(e.firestore,e.converter,Xo(e._query,this._limit,this._limitType))}}function Jy(n){return rm("limit",n),Ns._create("limit",n,"F")}function pd(n,e,t){if(typeof(t=ke(t))=="string"){if(t==="")throw new V(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Tu(e)&&t.indexOf("/")!==-1)throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ce.fromString(t));if(!B.isDocumentKey(r))throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Cl(n,new B(r))}if(t instanceof ue)return Cl(n,t._key);throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${hs(t)}.`)}function gd(n,e){if(!Array.isArray(n)||n.length===0)throw new V(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ah(n,e){const t=function(o,s){for(const i of o)for(const l of i.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(o){switch(o){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class kh{convertValue(e,t="none"){switch(Wt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Gt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Jt(e,(o,s)=>{r[o]=this.convertValue(s,t)}),r}convertVectorValue(e){const t=e.fields?.[Wo].arrayValue?.values?.map(r=>ge(r.doubleValue));return new tt(t)}convertGeoPoint(e){return new et(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=fs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Mr(e));default:return null}}convertTimestamp(e){const t=Ht(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ce.fromString(e);se(Gu(r),9688,{name:e});const o=new Bn(r.get(1),r.get(3)),s=new B(r.popFirst(5));return o.isEqual(t)||Tt(`Document ${s} contains a document reference within a different database (${o.projectId}/${o.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function Ch(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Nn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Bt extends Sh{constructor(e,t,r,o,s,i){super(e,t,r,o,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Sr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Cs("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Bt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Bt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Bt._jsonSchema={type:ye("string",Bt._jsonSchemaVersion),bundleSource:ye("string","DocumentSnapshot"),bundleName:ye("string"),bundle:ye("string")};class Sr extends Bt{data(e={}){return super.data(e)}}class Ut{constructor(e,t,r,o){this._firestore=e,this._userDataWriter=t,this._snapshot=o,this.metadata=new Nn(o.hasPendingWrites,o.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Sr(this._firestore,this._userDataWriter,r.key,r,new Nn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(o,s){if(o._snapshot.oldDocs.isEmpty()){let i=0;return o._snapshot.docChanges.map(l=>{const c=new Sr(o._firestore,o._userDataWriter,l.doc.key,l.doc,new Nn(o._snapshot.mutatedKeys.has(l.doc.key),o._snapshot.fromCache),o.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:i++}})}{let i=o._snapshot.oldDocs;return o._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const c=new Sr(o._firestore,o._userDataWriter,l.doc.key,l.doc,new Nn(o._snapshot.mutatedKeys.has(l.doc.key),o._snapshot.fromCache),o.query.converter);let d=-1,h=-1;return l.type!==0&&(d=i.indexOf(l.doc.key),i=i.delete(l.doc.key)),l.type!==1&&(i=i.add(l.doc),h=i.indexOf(l.doc.key)),{type:Zy(l.type),doc:c,oldIndex:d,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ut._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=us.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],o=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),o.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Zy(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
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
 */function Fr(n){n=$e(n,ue);const e=$e(n.firestore,lt);return By(Yr(e),n._key).then(t=>Ph(e,n,t))}Ut._jsonSchemaVersion="firestore/querySnapshot/1.0",Ut._jsonSchema={type:ye("string",Ut._jsonSchemaVersion),bundleSource:ye("string","QuerySnapshot"),bundleName:ye("string"),bundle:ye("string")};class Li extends kh{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ue(this.firestore,null,t)}}function fe(n){n=$e(n,ht);const e=$e(n.firestore,lt),t=Yr(e),r=new Li(e);return Ih(n._query),Uy(t,n._query).then(o=>new Ut(e,r,n,o))}function Rh(n,e,t){n=$e(n,ue);const r=$e(n.firestore,lt),o=Ch(n.converter,e,t);return eo(r,[bh(As(r),"setDoc",n._key,o,n.converter!==null,t).toMutation(n._key,Xe.none())])}function dt(n,e,t,...r){n=$e(n,ue);const o=$e(n.firestore,lt),s=As(o);let i;return i=typeof(e=ke(e))=="string"||e instanceof Jr?Wy(s,"updateDoc",n._key,e,t,r):Gy(s,"updateDoc",n._key,e),eo(o,[i.toMutation(n._key,Xe.exists(!0))])}function mt(n){return eo($e(n.firestore,lt),[new ci(n._key,Xe.none())])}function Qt(n,e){const t=$e(n.firestore,lt),r=Ve(n),o=Ch(n.converter,e);return eo(t,[bh(As(n.firestore),"addDoc",r._key,o,n.converter!==null,{}).toMutation(r._key,Xe.exists(!1))]).then(()=>r)}function ev(n,...e){n=ke(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||hd(e[r])||(t=e[r++]);const o={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(hd(e[r])){const c=e[r];e[r]=c.next?.bind(c),e[r+1]=c.error?.bind(c),e[r+2]=c.complete?.bind(c)}let s,i,l;if(n instanceof ue)i=$e(n.firestore,lt),l=ms(n._key.path),s={next:c=>{e[r]&&e[r](Ph(i,n,c))},error:e[r+1],complete:e[r+2]};else{const c=$e(n,ht);i=$e(c.firestore,lt),l=c._query;const d=new Li(i);s={next:h=>{e[r]&&e[r](new Ut(i,d,c,h))},error:e[r+1],complete:e[r+2]},Ih(n._query)}return function(d,h,g,m){const v=new ki(m),b=new Si(h,v,g);return d.asyncQueue.enqueueAndForget(async()=>xi(await ts(d),b)),()=>{v.Nu(),d.asyncQueue.enqueueAndForget(async()=>Ei(await ts(d),b))}}(Yr(i),l,o,s)}function eo(n,e){return function(r,o){const s=new bt;return r.asyncQueue.enqueueAndForget(async()=>ky(await $y(r),o,s)),s.promise}(Yr(n),e)}function Ph(n,e,t){const r=t.docs.get(e._key),o=new Li(n);return new Bt(n,o,e._key,r,new Nn(t.hasPendingWrites,t.fromCache),e.converter)}function _e(){return new Ci("serverTimestamp")}function Vi(...n){return new Ri("arrayUnion",n)}function tv(...n){return new Pi("arrayRemove",n)}(function(e,t=!0){(function(o){Qn=o})(Xn),Fn(new dn("firestore",(r,{instanceIdentifier:o,options:s})=>{const i=r.getProvider("app").getImmediate(),l=new lt(new Xf(r.getProvider("auth-internal")),new Jf(i,r.getProvider("app-check-internal")),function(d,h){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Bn(d.options.projectId,h)}(i,o),i);return s={useFetchStreams:t,...s},l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Ft(ml,wl,e),Ft(ml,wl,"esm2020")})();const Ke=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:kh,Bytes:Ge,CollectionReference:_t,DocumentReference:ue,DocumentSnapshot:Bt,FieldPath:Jr,FieldValue:vn,Firestore:lt,FirestoreError:V,GeoPoint:et,Query:ht,QueryCompositeFilterConstraint:Ps,QueryConstraint:Rs,QueryDocumentSnapshot:Sr,QueryFieldFilterConstraint:Zr,QueryLimitConstraint:Ns,QueryOrderByConstraint:Ds,QuerySnapshot:Ut,SnapshotMetadata:Nn,Timestamp:le,VectorValue:tt,_AutoId:us,_ByteString:Te,_DatabaseId:Bn,_DocumentKey:B,_EmptyAuthCredentialsProvider:ou,_FieldPath:Ee,_cast:$e,_logWarn:hn,_validateIsNotUsedTogether:au,addDoc:Qt,arrayRemove:tv,arrayUnion:Vi,collection:oe,connectFirestoreEmulator:mh,deleteDoc:mt,doc:Ve,ensureFirestoreConfigured:Yr,executeWrite:eo,getDoc:Fr,getDocs:fe,getFirestore:wh,limit:Jy,onSnapshot:ev,orderBy:Yy,query:ve,serverTimestamp:_e,setDoc:Rh,updateDoc:dt,where:re},Symbol.toStringTag,{value:"Module"}));var nv="firebase",rv="12.0.0";/**
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
 */Ft(nv,rv,"app");function Dh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ov=Dh,Nh=new jr("auth","Firebase",Dh());/**
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
 */const rs=new Ya("@firebase/auth");function sv(n,...e){rs.logLevel<=Q.WARN&&rs.warn(`Auth (${Xn}): ${n}`,...e)}function Oo(n,...e){rs.logLevel<=Q.ERROR&&rs.error(`Auth (${Xn}): ${n}`,...e)}/**
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
 */function ut(n,...e){throw Fi(n,...e)}function nt(n,...e){return Fi(n,...e)}function Oi(n,e,t){const r={...ov(),[e]:t};return new jr("auth","Firebase",r).create(e,{appName:n.name})}function ln(n){return Oi(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function av(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&ut(n,"argument-error"),Oi(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Fi(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Nh.create(n,...e)}function q(n,e,...t){if(!n)throw Fi(e,...t)}function yt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Oo(e),new Error(e)}function It(n,e){n||yt(e)}/**
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
 */function Ga(){return typeof self<"u"&&self.location?.href||""}function iv(){return fd()==="http:"||fd()==="https:"}function fd(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function cv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(iv()||Ig()||"connection"in navigator)?navigator.onLine:!0}function lv(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class to{constructor(e,t){this.shortDelay=e,this.longDelay=t,It(t>e,"Short delay should be less than long delay!"),this.isMobile=Eg()||Ag()}get(){return cv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function $i(n,e){It(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Mh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;yt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;yt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;yt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const dv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const uv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],hv=new to(3e4,6e4);function Bi(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function tr(n,e,t,r,o={}){return Lh(n,o,async()=>{let s={},i={};r&&(e==="GET"?i=r:s={body:JSON.stringify(r)});const l=Hr({key:n.config.apiKey,...i}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:c,...s};return Sg()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Kn(n.emulatorConfig.host)&&(d.credentials="include"),Mh.fetch()(await Vh(n,n.config.apiHost,t,l),d)})}async function Lh(n,e,t){n._canInitEmulator=!1;const r={...dv,...e};try{const o=new gv(n),s=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const i=await s.json();if("needConfirmation"in i)throw Po(n,"account-exists-with-different-credential",i);if(s.ok&&!("errorMessage"in i))return i;{const l=s.ok?i.errorMessage:i.error.message,[c,d]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Po(n,"credential-already-in-use",i);if(c==="EMAIL_EXISTS")throw Po(n,"email-already-in-use",i);if(c==="USER_DISABLED")throw Po(n,"user-disabled",i);const h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Oi(n,h,d);ut(n,h)}}catch(o){if(o instanceof At)throw o;ut(n,"network-request-failed",{message:String(o)})}}async function pv(n,e,t,r,o={}){const s=await tr(n,e,t,r,o);return"mfaPendingCredential"in s&&ut(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Vh(n,e,t,r){const o=`${e}${t}?${r}`,s=n,i=s.config.emulator?$i(n.config,o):`${n.config.apiScheme}://${o}`;return uv.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(i).toString():i}class gv{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(nt(this.auth,"network-request-failed")),hv.get())})}}function Po(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const o=nt(n,e,r);return o.customData._tokenResponse=t,o}/**
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
 */async function fv(n,e){return tr(n,"POST","/v1/accounts:delete",e)}async function os(n,e){return tr(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ir(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function mv(n,e=!1){const t=ke(n),r=await t.getIdToken(e),o=Ui(r);q(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const s=typeof o.firebase=="object"?o.firebase:void 0,i=s?.sign_in_provider;return{claims:o,token:r,authTime:Ir(_a(o.auth_time)),issuedAtTime:Ir(_a(o.iat)),expirationTime:Ir(_a(o.exp)),signInProvider:i||null,signInSecondFactor:s?.sign_in_second_factor||null}}function _a(n){return Number(n)*1e3}function Ui(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Oo("JWT malformed, contained fewer than 3 sections"),null;try{const o=Fd(t);return o?JSON.parse(o):(Oo("Failed to decode base64 JWT payload"),null)}catch(o){return Oo("Caught error parsing JWT payload as JSON",o?.toString()),null}}function md(n){const e=Ui(n);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function $r(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof At&&wv(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function wv({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class yv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Wa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ir(this.lastLoginAt),this.creationTime=Ir(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ss(n){const e=n.auth,t=await n.getIdToken(),r=await $r(n,os(e,{idToken:t}));q(r?.users.length,e,"internal-error");const o=r.users[0];n._notifyReloadListener(o);const s=o.providerUserInfo?.length?Oh(o.providerUserInfo):[],i=bv(n.providerData,s),l=n.isAnonymous,c=!(n.email&&o.passwordHash)&&!i?.length,d=l?c:!1,h={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:i,metadata:new Wa(o.createdAt,o.lastLoginAt),isAnonymous:d};Object.assign(n,h)}async function vv(n){const e=ke(n);await ss(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bv(n,e){return[...n.filter(r=>!e.some(o=>o.providerId===r.providerId)),...e]}function Oh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function _v(n,e){const t=await Lh(n,{},async()=>{const r=Hr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:s}=n.config,i=await Vh(n,o,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&Kn(n.emulatorConfig.host)&&(c.credentials="include"),Mh.fetch()(i,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function xv(n,e){return tr(n,"POST","/v2/accounts:revokeToken",Bi(n,e))}/**
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
 */class Ln{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):md(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=md(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:o,expiresIn:s}=await _v(e,t);this.updateTokensAndExpiration(r,o,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:o,expirationTime:s}=t,i=new Ln;return r&&(q(typeof r=="string","internal-error",{appName:e}),i.refreshToken=r),o&&(q(typeof o=="string","internal-error",{appName:e}),i.accessToken=o),s&&(q(typeof s=="number","internal-error",{appName:e}),i.expirationTime=s),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ln,this.toJSON())}_performRefresh(){return yt("not implemented")}}/**
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
 */function Pt(n,e){q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ze{constructor({uid:e,auth:t,stsTokenManager:r,...o}){this.providerId="firebase",this.proactiveRefresh=new yv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Wa(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await $r(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return mv(this,e)}reload(){return vv(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ze({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ss(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Je(this.auth.app))return Promise.reject(ln(this.auth));const e=await this.getIdToken();return await $r(this,fv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,o=t.email??void 0,s=t.phoneNumber??void 0,i=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,d=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:g,emailVerified:m,isAnonymous:v,providerData:b,stsTokenManager:_}=t;q(g&&_,e,"internal-error");const S=Ln.fromJSON(this.name,_);q(typeof g=="string",e,"internal-error"),Pt(r,e.name),Pt(o,e.name),q(typeof m=="boolean",e,"internal-error"),q(typeof v=="boolean",e,"internal-error"),Pt(s,e.name),Pt(i,e.name),Pt(l,e.name),Pt(c,e.name),Pt(d,e.name),Pt(h,e.name);const N=new Ze({uid:g,auth:e,email:o,emailVerified:m,displayName:r,isAnonymous:v,photoURL:i,phoneNumber:s,tenantId:l,stsTokenManager:S,createdAt:d,lastLoginAt:h});return b&&Array.isArray(b)&&(N.providerData=b.map(M=>({...M}))),c&&(N._redirectEventId=c),N}static async _fromIdTokenResponse(e,t,r=!1){const o=new Ln;o.updateFromServerResponse(t);const s=new Ze({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:r});return await ss(s),s}static async _fromGetAccountInfoResponse(e,t,r){const o=t.users[0];q(o.localId!==void 0,"internal-error");const s=o.providerUserInfo!==void 0?Oh(o.providerUserInfo):[],i=!(o.email&&o.passwordHash)&&!s?.length,l=new Ln;l.updateFromIdToken(r);const c=new Ze({uid:o.localId,auth:e,stsTokenManager:l,isAnonymous:i}),d={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:s,metadata:new Wa(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!s?.length};return Object.assign(c,d),c}}/**
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
 */const wd=new Map;function vt(n){It(n instanceof Function,"Expected a class definition");let e=wd.get(n);return e?(It(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,wd.set(n,e),e)}/**
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
 */class Fh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Fh.type="NONE";const yd=Fh;/**
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
 */function Fo(n,e,t){return`firebase:${n}:${e}:${t}`}class Vn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:o,name:s}=this.auth;this.fullUserKey=Fo(this.userKey,o.apiKey,s),this.fullPersistenceKey=Fo("persistence",o.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await os(this.auth,{idToken:e}).catch(()=>{});return t?Ze._fromGetAccountInfoResponse(this.auth,t,e):null}return Ze._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Vn(vt(yd),e,r);const o=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=o[0]||vt(yd);const i=Fo(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const h=await d._get(i);if(h){let g;if(typeof h=="string"){const m=await os(e,{idToken:h}).catch(()=>{});if(!m)break;g=await Ze._fromGetAccountInfoResponse(e,m,h)}else g=Ze._fromJSON(e,h);d!==s&&(l=g),s=d;break}}catch{}const c=o.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Vn(s,e,r):(s=c[0],l&&await s._set(i,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(i)}catch{}})),new Vn(s,e,r))}}/**
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
 */function vd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(zh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if($h(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jh(e))return"Blackberry";if(Hh(e))return"Webos";if(Bh(e))return"Safari";if((e.includes("chrome/")||Uh(e))&&!e.includes("edge/"))return"Chrome";if(qh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function $h(n=Le()){return/firefox\//i.test(n)}function Bh(n=Le()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Uh(n=Le()){return/crios\//i.test(n)}function zh(n=Le()){return/iemobile/i.test(n)}function qh(n=Le()){return/android/i.test(n)}function jh(n=Le()){return/blackberry/i.test(n)}function Hh(n=Le()){return/webos/i.test(n)}function zi(n=Le()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Ev(n=Le()){return zi(n)&&!!window.navigator?.standalone}function Tv(){return kg()&&document.documentMode===10}function Gh(n=Le()){return zi(n)||qh(n)||Hh(n)||jh(n)||/windows phone/i.test(n)||zh(n)}/**
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
 */function Wh(n,e=[]){let t;switch(n){case"Browser":t=vd(Le());break;case"Worker":t=`${vd(Le())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Xn}/${r}`}/**
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
 */class Sv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((i,l)=>{try{const c=e(s);i(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function Iv(n,e={}){return tr(n,"GET","/v2/passwordPolicy",Bi(n,e))}/**
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
 */const Av=6;class kv{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Av,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let o=0;o<e.length;o++)r=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,o,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Cv{constructor(e,t,r,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new bd(this),this.idTokenSubscription=new bd(this),this.beforeStateQueue=new Sv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Nh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=vt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Vn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await os(this,{idToken:e}),r=await Ze._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Je(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(i=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(i,i))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,i=r?._redirectEventId,l=await this.tryRedirectSignIn(e);(!s||s===i)&&l?.user&&(r=l.user,o=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ss(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=lv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Je(this.app))return Promise.reject(ln(this));const t=e?ke(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Je(this.app)?Promise.reject(ln(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Je(this.app)?Promise.reject(ln(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(vt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Iv(this),t=new kv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new jr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await xv(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&vt(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await Vn.create(this,[vt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,o){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let i=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(l,this,"internal-error"),l.then(()=>{i||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,o);return()=>{i=!0,c()}}else{const c=e.addObserver(t);return()=>{i=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Wh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&sv(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Ms(n){return ke(n)}class bd{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vg(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let qi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Rv(n){qi=n}function Pv(n){return qi.loadJS(n)}function Dv(){return qi.gapiScript}function Nv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Mv(n,e){const t=Za(n,"auth");if(t.isInitialized()){const o=t.getImmediate(),s=t.getOptions();if(xt(s,e??{}))return o;ut(o,"already-initialized")}return t.initialize({options:e})}function Lv(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(vt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Vv(n,e,t){const r=Ms(n);q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const o=!1,s=Kh(e),{host:i,port:l}=Ov(e),c=l===null?"":`:${l}`,d={url:`${s}//${i}${c}/`},h=Object.freeze({host:i,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!r._canInitEmulator){q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),q(xt(d,r.config.emulator)&&xt(h,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,Kn(i)?(zd(`${s}//${i}${c}`),qd("Auth",!0)):Fv()}function Kh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Ov(n){const e=Kh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(r);if(o){const s=o[1];return{host:s,port:_d(r.substr(s.length+1))}}else{const[s,i]=r.split(":");return{host:s,port:_d(i)}}}function _d(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Fv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Xh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return yt("not implemented")}_getIdTokenResponse(e){return yt("not implemented")}_linkToIdToken(e,t){return yt("not implemented")}_getReauthenticationResolver(e){return yt("not implemented")}}/**
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
 */async function On(n,e){return pv(n,"POST","/v1/accounts:signInWithIdp",Bi(n,e))}/**
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
 */const $v="http://localhost";class gn extends Xh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new gn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ut("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:o,...s}=t;if(!r||!o)return null;const i=new gn(r,o);return i.idToken=s.idToken||void 0,i.accessToken=s.accessToken||void 0,i.secret=s.secret,i.nonce=s.nonce,i.pendingToken=s.pendingToken||null,i}_getIdTokenResponse(e){const t=this.buildRequest();return On(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,On(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,On(e,t)}buildRequest(){const e={requestUri:$v,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Hr(t)}return e}}/**
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
 */class ji{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class no extends ji{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Dt extends no{constructor(){super("facebook.com")}static credential(e){return gn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
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
 */class wt extends no{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return gn._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return wt.credential(t,r)}catch{return null}}}wt.GOOGLE_SIGN_IN_METHOD="google.com";wt.PROVIDER_ID="google.com";/**
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
 */class Nt extends no{constructor(){super("github.com")}static credential(e){return gn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.GITHUB_SIGN_IN_METHOD="github.com";Nt.PROVIDER_ID="github.com";/**
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
 */class Mt extends no{constructor(){super("twitter.com")}static credential(e,t){return gn._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Mt.credential(t,r)}catch{return null}}}Mt.TWITTER_SIGN_IN_METHOD="twitter.com";Mt.PROVIDER_ID="twitter.com";/**
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
 */class Wn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,o=!1){const s=await Ze._fromIdTokenResponse(e,r,o),i=xd(r);return new Wn({user:s,providerId:i,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const o=xd(r);return new Wn({user:e,providerId:o,_tokenResponse:r,operationType:t})}}function xd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class as extends At{constructor(e,t,r,o){super(t.code,t.message),this.operationType=r,this.user=o,Object.setPrototypeOf(this,as.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,o){return new as(e,t,r,o)}}function Qh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?as._fromErrorAndOperation(n,s,e,r):s})}async function Bv(n,e,t=!1){const r=await $r(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Wn._forOperation(n,"link",r)}/**
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
 */async function Uv(n,e,t=!1){const{auth:r}=n;if(Je(r.app))return Promise.reject(ln(r));const o="reauthenticate";try{const s=await $r(n,Qh(r,o,e,n),t);q(s.idToken,r,"internal-error");const i=Ui(s.idToken);q(i,r,"internal-error");const{sub:l}=i;return q(n.uid===l,r,"user-mismatch"),Wn._forOperation(n,o,s)}catch(s){throw s?.code==="auth/user-not-found"&&ut(r,"user-mismatch"),s}}/**
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
 */async function zv(n,e,t=!1){if(Je(n.app))return Promise.reject(ln(n));const r="signIn",o=await Qh(n,r,e),s=await Wn._fromIdTokenResponse(n,r,o);return t||await n._updateCurrentUser(s.user),s}/**
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
 */function qv(n,e){return ke(n).setPersistence(e)}function jv(n,e,t,r){return ke(n).onIdTokenChanged(e,t,r)}function Hv(n,e,t){return ke(n).beforeAuthStateChanged(e,t)}const is="__sak";/**
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
 */class Yh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(is,"1"),this.storage.removeItem(is),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Gv=1e3,Wv=10;class Jh extends Yh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Gh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),o=this.localCache[t];r!==o&&e(t,o,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((i,l,c)=>{this.notifyListeners(i,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const i=this.storage.getItem(r);!t&&this.localCache[r]===i||this.notifyListeners(r,i)},s=this.storage.getItem(r);Tv()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,Wv):o()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Gv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jh.type="LOCAL";const Zh=Jh;/**
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
 */class ep extends Yh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ep.type="SESSION";const tp=ep;/**
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
 */function Kv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ls{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const r=new Ls(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:o,data:s}=t.data,i=this.handlersMap[o];if(!i?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:o});const l=Array.from(i).map(async d=>d(t.origin,s)),c=await Kv(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:o,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ls.receivers=[];/**
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
 */function Hi(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Xv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let s,i;return new Promise((l,c)=>{const d=Hi("",20);o.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},r);i={messageChannel:o,onMessage(g){const m=g;if(m.data.eventId===d)switch(m.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(m.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(i),o.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[o.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
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
 */function it(){return window}function Qv(n){it().location.href=n}/**
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
 */function np(){return typeof it().WorkerGlobalScope<"u"&&typeof it().importScripts=="function"}async function Yv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Jv(){return navigator?.serviceWorker?.controller||null}function Zv(){return np()?self:null}/**
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
 */const rp="firebaseLocalStorageDb",e0=1,cs="firebaseLocalStorage",op="fbase_key";class ro{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Vs(n,e){return n.transaction([cs],e?"readwrite":"readonly").objectStore(cs)}function t0(){const n=indexedDB.deleteDatabase(rp);return new ro(n).toPromise()}function Ka(){const n=indexedDB.open(rp,e0);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(cs,{keyPath:op})}catch(o){t(o)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(cs)?e(r):(r.close(),await t0(),e(await Ka()))})})}async function Ed(n,e,t){const r=Vs(n,!0).put({[op]:e,value:t});return new ro(r).toPromise()}async function n0(n,e){const t=Vs(n,!1).get(e),r=await new ro(t).toPromise();return r===void 0?null:r.value}function Td(n,e){const t=Vs(n,!0).delete(e);return new ro(t).toPromise()}const r0=800,o0=3;class sp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ka(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>o0)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return np()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ls._getInstance(Zv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Yv(),!this.activeServiceWorker)return;this.sender=new Xv(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Jv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ka();return await Ed(e,is,"1"),await Td(e,is),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ed(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>n0(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Td(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const s=Vs(o,!1).getAll();return new ro(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:o,value:s}of e)r.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(s)&&(this.notifyListeners(o,s),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!r.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),r0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}sp.type="LOCAL";const s0=sp;new to(3e4,6e4);/**
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
 */function ap(n,e){return e?vt(e):(q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Gi extends Xh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return On(e,this._buildIdpRequest())}_linkToIdToken(e,t){return On(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return On(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function a0(n){return zv(n.auth,new Gi(n),n.bypassAuthState)}function i0(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Uv(t,new Gi(n),n.bypassAuthState)}async function c0(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Bv(t,new Gi(n),n.bypassAuthState)}/**
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
 */class ip{constructor(e,t,r,o,s=!1){this.auth=e,this.resolver=r,this.user=o,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:o,tenantId:s,error:i,type:l}=e;if(i){this.reject(i);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return a0;case"linkViaPopup":case"linkViaRedirect":return c0;case"reauthViaPopup":case"reauthViaRedirect":return i0;default:ut(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const l0=new to(2e3,1e4);async function d0(n,e,t){if(Je(n.app))return Promise.reject(nt(n,"operation-not-supported-in-this-environment"));const r=Ms(n);av(n,e,ji);const o=ap(r,t);return new cn(r,"signInViaPopup",e,o).executeNotNull()}class cn extends ip{constructor(e,t,r,o,s){super(e,t,o,s),this.provider=r,this.authWindow=null,this.pollId=null,cn.currentPopupAction&&cn.currentPopupAction.cancel(),cn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=Hi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(nt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(nt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,cn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(nt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,l0.get())};e()}}cn.currentPopupAction=null;/**
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
 */const u0="pendingRedirect",$o=new Map;class h0 extends ip{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=$o.get(this.auth._key());if(!e){try{const r=await p0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}$o.set(this.auth._key(),e)}return this.bypassAuthState||$o.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function p0(n,e){const t=m0(e),r=f0(n);if(!await r._isAvailable())return!1;const o=await r._get(t)==="true";return await r._remove(t),o}function g0(n,e){$o.set(n._key(),e)}function f0(n){return vt(n._redirectPersistence)}function m0(n){return Fo(u0,n.config.apiKey,n.name)}async function w0(n,e,t=!1){if(Je(n.app))return Promise.reject(ln(n));const r=Ms(n),o=ap(r,e),i=await new h0(r,o,t).execute();return i&&!t&&(delete i.user._redirectEventId,await r._persistUserIfCurrent(i.user),await r._setRedirectUser(null,e)),i}/**
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
 */const y0=600*1e3;class v0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!b0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!cp(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(nt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=y0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Sd(e))}saveEventToCache(e){this.cachedEventUids.add(Sd(e)),this.lastProcessedEventTime=Date.now()}}function Sd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function cp({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function b0(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cp(n);default:return!1}}/**
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
 */async function _0(n,e={}){return tr(n,"GET","/v1/projects",e)}/**
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
 */const x0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,E0=/^https?/;async function T0(n){if(n.config.emulator)return;const{authorizedDomains:e}=await _0(n);for(const t of e)try{if(S0(t))return}catch{}ut(n,"unauthorized-domain")}function S0(n){const e=Ga(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const i=new URL(n);return i.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&i.hostname===r}if(!E0.test(t))return!1;if(x0.test(n))return r===n;const o=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(r)}/**
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
 */const I0=new to(3e4,6e4);function Id(){const n=it().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function A0(n){return new Promise((e,t)=>{function r(){Id(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Id(),t(nt(n,"network-request-failed"))},timeout:I0.get()})}if(it().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(it().gapi?.load)r();else{const o=Nv("iframefcb");return it()[o]=()=>{gapi.load?r():t(nt(n,"network-request-failed"))},Pv(`${Dv()}?onload=${o}`).catch(s=>t(s))}}).catch(e=>{throw Bo=null,e})}let Bo=null;function k0(n){return Bo=Bo||A0(n),Bo}/**
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
 */const C0=new to(5e3,15e3),R0="__/auth/iframe",P0="emulator/auth/iframe",D0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},N0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function M0(n){const e=n.config;q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?$i(e,P0):`https://${n.config.authDomain}/${R0}`,r={apiKey:e.apiKey,appName:n.name,v:Xn},o=N0.get(n.config.apiHost);o&&(r.eid=o);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Hr(r).slice(1)}`}async function L0(n){const e=await k0(n),t=it().gapi;return q(t,n,"internal-error"),e.open({where:document.body,url:M0(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:D0,dontclear:!0},r=>new Promise(async(o,s)=>{await r.restyle({setHideOnLeave:!1});const i=nt(n,"network-request-failed"),l=it().setTimeout(()=>{s(i)},C0.get());function c(){it().clearTimeout(l),o(r)}r.ping(c).then(c,()=>{s(i)})}))}/**
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
 */const V0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},O0=500,F0=600,$0="_blank",B0="http://localhost";class Ad{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function U0(n,e,t,r=O0,o=F0){const s=Math.max((window.screen.availHeight-o)/2,0).toString(),i=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...V0,width:r.toString(),height:o.toString(),top:s,left:i},d=Le().toLowerCase();t&&(l=Uh(d)?$0:t),$h(d)&&(e=e||B0,c.scrollbars="yes");const h=Object.entries(c).reduce((m,[v,b])=>`${m}${v}=${b},`,"");if(Ev(d)&&l!=="_self")return z0(e||"",l),new Ad(null);const g=window.open(e||"",l,h);q(g,n,"popup-blocked");try{g.focus()}catch{}return new Ad(g)}function z0(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const q0="__/auth/handler",j0="emulator/auth/handler",H0=encodeURIComponent("fac");async function kd(n,e,t,r,o,s){q(n.config.authDomain,n,"auth-domain-config-required"),q(n.config.apiKey,n,"invalid-api-key");const i={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Xn,eventId:o};if(e instanceof ji){e.setDefaultLanguage(n.languageCode),i.providerId=e.providerId||"",Lg(e.getCustomParameters())||(i.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,g]of Object.entries({}))i[h]=g}if(e instanceof no){const h=e.getScopes().filter(g=>g!=="");h.length>0&&(i.scopes=h.join(","))}n.tenantId&&(i.tid=n.tenantId);const l=i;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const c=await n._getAppCheckToken(),d=c?`#${H0}=${encodeURIComponent(c)}`:"";return`${G0(n)}?${Hr(l).slice(1)}${d}`}function G0({config:n}){return n.emulator?$i(n,j0):`https://${n.authDomain}/${q0}`}/**
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
 */const xa="webStorageSupport";class W0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=tp,this._completeRedirectFn=w0,this._overrideRedirectResult=g0}async _openPopup(e,t,r,o){It(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await kd(e,t,r,Ga(),o);return U0(e,s,Hi())}async _openRedirect(e,t,r,o){await this._originValidation(e);const s=await kd(e,t,r,Ga(),o);return Qv(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:s}=this.eventManagers[t];return o?Promise.resolve(o):(It(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await L0(e),r=new v0(e);return t.register("authEvent",o=>(q(o?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(xa,{type:xa},o=>{const s=o?.[0]?.[xa];s!==void 0&&t(!!s),ut(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=T0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Gh()||Bh()||zi()}}const K0=W0;var Cd="@firebase/auth",Rd="1.11.0";/**
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
 */class X0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Q0(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Y0(n){Fn(new dn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:i,authDomain:l}=r.options;q(i&&!i.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:i,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Wh(n)},d=new Cv(r,o,s,c);return Lv(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Fn(new dn("auth-internal",e=>{const t=Ms(e.getProvider("auth").getImmediate());return(r=>new X0(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ft(Cd,Rd,Q0(n)),Ft(Cd,Rd,"esm2020")}/**
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
 */const J0=300,Z0=Ud("authIdTokenMaxAge")||J0;let Pd=null;const eb=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Z0)return;const o=t?.token;Pd!==o&&(Pd=o,await fetch(n,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function tb(n=Wd()){const e=Za(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Mv(n,{popupRedirectResolver:K0,persistence:[s0,Zh,tp]}),r=Ud("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const i=eb(s.toString());Hv(t,i,()=>i(t.currentUser)),jv(t,l=>i(l))}}const o=$d("auth");return o&&Vv(t,`http://${o}`),t}function nb(){return document.getElementsByTagName("head")?.[0]??document}Rv({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=o=>{const s=nt("internal-error");s.customData=o,t(s)},r.type="text/javascript",r.charset="UTF-8",nb().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Y0("Browser");const rb={apiKey:"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:"controle-financeiro-b98ec.firebaseapp.com",projectId:"controle-financeiro-b98ec",storageBucket:"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:"418109336597",appId:"1:418109336597:web:871b262a76e57455ebb21c",measurementId:"G-7RW2F269V6"},Wi=Gd(rb),en=tb(Wi),U=wh(Wi);qv(en,Zh).then(()=>{}).catch(n=>{console.error("Erro ao configurar persistência do Firebase Auth:",n)});const lp=Object.freeze(Object.defineProperty({__proto__:null,app:Wi,auth:en,db:U},Symbol.toStringTag,{value:"Module"}));function Uo(n,e=null,t=null){if(!n.parcelasTotal||n.parcelasTotal<=1)return null;try{const r=new Date(n.dataInicio);let o;e&&t?o=new Date(e,t-1,1):o=new Date;let i=(o.getFullYear()-r.getFullYear())*12+(o.getMonth()-r.getMonth())+1;return i>n.parcelasTotal&&(i=n.parcelasTotal),i<1&&(i=1),i}catch(r){return console.error("Erro ao calcular parcela da recorrente:",r),1}}function ob(n,e=[],t=null,r=null){if(!t||!r){const c=new Date;t=c.getFullYear(),r=c.getMonth()+1}const o=e.some(c=>{if(!c.recorrenteId||c.recorrenteId!==n.id)return!1;let d;if(c.createdAt&&typeof c.createdAt=="object"&&c.createdAt.seconds)d=new Date(c.createdAt.seconds*1e3);else if(c.createdAt)d=new Date(c.createdAt);else return!1;return d.getFullYear()===t&&d.getMonth()+1===r}),s=Uo(n,t,r),i=Uo(n,t,r+1),l=Uo(n,t,r-1);return{foiEfetivadaEsteMes:o,parcelaAtual:s,proximaParcela:i,ultimaParcela:l,totalParcelas:n.parcelasTotal,temParcelas:n.parcelasTotal&&n.parcelasTotal>1,ativa:n.ativa!==!1}}async function Ki(n,e,t){try{const r={...t,userId:n,budgetId:e,ativa:!0,createdAt:_e(),parcelasRestantes:t.parcelasRestantes||null,parcelasTotal:t.parcelasTotal||null,efetivarMesAtual:t.efetivarMesAtual||!1},o=await Qt(oe(U,"recorrentes"),r);return console.log("✅ Recorrente adicionada:",o.id),o.id}catch(r){throw console.error("Erro ao adicionar recorrente:",r),r}}async function dp(n,e,t){try{const r=Ve(U,"recorrentes",e);await dt(r,{...t,updatedAt:_e()}),console.log("✅ Recorrente atualizada:",e)}catch(r){throw console.error("Erro ao atualizar recorrente:",r),r}}async function Xi(n,e){try{const t=Ve(U,"recorrentes",e);await mt(t),console.log("✅ Recorrente deletada:",e)}catch(t){throw console.error("Erro ao deletar recorrente:",t),t}}class sb{constructor(){this.queue=[],this.isShowing=!1,this.defaultDuration=3e3}show(e,t="info",r=null){const o={message:e,type:t,duration:r||this.defaultDuration};this.queue.push(o),this.processQueue()}call(e){typeof e=="string"?this.show(e,"info"):typeof e=="object"&&this.show(e.message||"Notificação",e.type||"info",e.duration)}processQueue(){if(this.isShowing||this.queue.length===0)return;this.isShowing=!0;const e=this.queue.shift();this.createSnackbar(e)}createSnackbar(e){const{message:t,type:r,duration:o}=e;this.removeExistingSnackbars();const s=document.createElement("div");s.className=this.getSnackbarClasses(r),s.innerHTML=this.getSnackbarContent(t,r),s.classList.add(`snackbar-${r}`),this.applyThemeStyles(s,r),s.style.zIndex="99999",s.style.bottom="80px",this.setupEventListeners(s),document.body.appendChild(s),requestAnimationFrame(()=>{s.classList.add("snackbar-show")}),setTimeout(()=>{this.removeSnackbar(s)},o)}getCurrentTheme(){return document.documentElement.classList.contains("dark")?"dark":"light"}getCurrentThemeColor(){return localStorage.getItem("themeColor")||document.documentElement.getAttribute("data-theme-color")||"blue"}applyThemeStyles(e,t){const r=this.getCurrentTheme(),o=this.getCurrentThemeColor(),s={blue:{primary:"#3B82F6",secondary:"#1E40AF",light:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",light:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",light:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",light:"#FEF3C7"}},i=s[o]||s.blue,c=(h=>{switch(h){case"success":return r==="dark"?{bg:i.primary,color:"#ffffff",border:i.secondary}:{bg:i.secondary,color:"#ffffff",border:i.primary};case"error":return r==="dark"?{bg:"#ef4444",color:"#ffffff",border:"#dc2626"}:{bg:"#dc2626",color:"#ffffff",border:"#b91c1c"};case"warning":return r==="dark"?{bg:"#f59e0b",color:"#1f2937",border:"#d97706"}:{bg:"#d97706",color:"#ffffff",border:"#b45309"};case"info":return r==="dark"?{bg:i.primary,color:"#ffffff",border:i.secondary}:{bg:i.secondary,color:"#ffffff",border:i.primary};default:return r==="dark"?{bg:i.primary,color:"#ffffff",border:i.secondary}:{bg:i.secondary,color:"#ffffff",border:i.primary}}})(t),d=r==="dark"?"0.4":"0.3";e.style.backgroundColor=c.bg,e.style.color=c.color,e.style.border=`1px solid ${c.border}`,e.style.boxShadow=`0 4px 12px rgba(${c.bg.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(", ")}, ${d})`,setTimeout(()=>{const h=e.querySelector(".snackbar-close");h&&(h.style.color=c.color)},10)}getSnackbarClasses(e){return["fixed","left-1/2","transform","-translate-x-1/2","px-6","py-3","rounded-lg","shadow-lg","max-w-sm","w-full","mx-4","opacity-0","translate-y-4","transition-all","duration-300","ease-out"].join(" ")}getSnackbarContent(e,t){const r={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️",default:"💬"};return`
      <div class="flex items-center gap-3">
        <span class="text-lg">${r[t]||r.default}</span>
        <span class="flex-1 text-sm font-medium">${e}</span>
        <button class="snackbar-close text-white opacity-70 hover:opacity-100 transition-opacity">
          <span class="text-lg">×</span>
        </button>
      </div>
    `}removeExistingSnackbars(){document.querySelectorAll('.snackbar-show, [class*="snackbar"]').forEach(t=>{this.removeSnackbar(t)})}removeSnackbar(e){!e||!e.parentNode||(e.classList.remove("snackbar-show"),e.classList.add("snackbar-hide"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e),this.isShowing=!1,this.processQueue()},300))}setupEventListeners(e){const t=e.querySelector(".snackbar-close");t&&t.addEventListener("click",()=>{this.removeSnackbar(e)}),e.addEventListener("click",r=>{r.target===e&&this.removeSnackbar(e)})}}const fn=new sb;function $(n){typeof n=="string"?fn.show(n,"info"):typeof n=="object"&&fn.show(n.message,n.type||"info",n.duration)}$.show=(n,e="info",t)=>{fn.show(n,e,t)};$.success=(n,e)=>{fn.show(n,"success",e)};$.error=(n,e)=>{fn.show(n,"error",e)};$.warning=(n,e)=>{fn.show(n,"warning",e)};$.info=(n,e)=>{fn.show(n,"info",e)};typeof window<"u"&&(window.Snackbar=$);window.showAddRecorrenteModal=function(n={}){const e=!!n&&Object.keys(n).length>0,t=Yt({title:e?"Editar Despesa Recorrente":"Nova Despesa Recorrente",content:"",onClose:()=>t.remove()}),r=window.appState.currentUser,o=window.appState.currentBudget;if(!r){$({message:"Você precisa estar logado para adicionar recorrentes.",type:"error"});return}if(!o){$({message:"Selecione um orçamento antes de adicionar recorrentes.",type:"error"});return}const s=lg({initialData:n,onSubmit:async l=>{try{if(document.querySelector(".fab")?.classList.add("hidden"),e&&n.id)await dp(r.uid,n.id,l);else{const c=await Ki(r.uid,o.id,l);if(l.efetivarMesAtual){console.log("🚀 Efetivando recorrente no mês atual...");const d=new Date,h=d.getMonth()+1,g=d.getFullYear(),{db:m}=await Be(async()=>{const{db:S}=await Promise.resolve().then(()=>lp);return{db:S}},void 0),v=oe(m,"transactions"),_=(await fe(ve(v,re("userId","==",r.uid),re("recorrenteId","==",c)))).docs.some(S=>{const N=S.data(),M=N.createdAt&&N.createdAt.toDate?N.createdAt.toDate():N.createdAt?new Date(N.createdAt):null;return M&&M.getMonth()+1===h&&M.getFullYear()===g});if(console.log("🔍 Já existe transação neste mês?",_),_)console.log("⏭️ Transação já existe para este mês, pulando...");else{const S={userId:r.uid,budgetId:o.id,descricao:l.descricao,valor:l.valor,categoriaId:l.categoriaId,tipo:"despesa",createdAt:d,recorrenteId:c,recorrenteNome:l.descricao},N=await Qt(oe(m,"transactions"),S);console.log("✅ Transação criada para mês atual:",N.id);try{await Qt(oe(m,"logAplicacoes"),{userId:r.uid,mesAno:`${g}-${String(h).padStart(2,"0")}`,recorrenteId:c,descricao:l.descricao,valor:l.valor,dataAplicacao:d,transacaoId:N.id,aplicacaoImediata:!0}),console.log("📝 Aplicação imediata registrada no log")}catch(M){console.error("Erro ao registrar aplicação imediata no log:",M)}}}}await new Promise(c=>setTimeout(c,200)),await window.loadRecorrentes(),t.remove(),$({message:e?"Despesa recorrente editada!":"Despesa recorrente salva!",type:"success"}),setTimeout(async()=>{document.querySelector(".fab")?.classList.remove("hidden"),e&&n.id&&(console.log("🔄 Recalculando transações da recorrente editada:",n.id),await window.recalcularTransacoesRecorrente(n.id,l)),await window.loadRecorrentes(),await window.loadTransactions(),await window.loadCategories(),window.location.hash.includes("recorrentes")?window._renderRecorrentes():window.location.hash.includes("dashboard")?window.renderDashboard():window.location.hash.includes("transacoes")&&window.renderTransactions(),document.dispatchEvent(new CustomEvent("recorrente-adicionada")),document.dispatchEvent(new CustomEvent("dados-atualizados"))},100)}catch(c){document.querySelector(".fab")?.classList.remove("hidden"),console.error("Erro ao adicionar/editar recorrente:",c),$({message:"Erro ao salvar recorrente",type:"error"})}}}),i=t.querySelector(".modal-body");i?i.appendChild(s):t.appendChild(s),document.body.appendChild(t)};window.showAddTransactionModal=function(n={}){console.log("🔧 showAddTransactionModal chamada com:",n),console.log("🔧 window.Modal disponível:",!!window.Modal),console.log("🔧 window.appState.categories:",window.appState?.categories);const e=!!n&&Object.keys(n).length>0;try{const t=Yt({title:e?"Editar Transação":"Nova Transação",content:`
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
            ${(window.appState?.categories||[]).map(i=>{const l=i.limite?parseFloat(i.limite):0,c=window.appState?.transactions?.filter(m=>m.categoriaId===i.id&&m.tipo==="despesa")?.reduce((m,v)=>m+parseFloat(v.valor),0)||0,d=l-c,h=l>0?` (R$ ${d.toFixed(2)} disponível)`:"",g=d<0?"text-red-600":d<l*.2?"text-yellow-600":"text-green-600";return`<option value="${i.id}" ${n.categoriaId===i.id?"selected":""}>
                ${i.nome}${h}
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de transação adicionado ao DOM");const r=t.querySelector("#transaction-form");r.addEventListener("submit",async i=>{i.preventDefault();const l=new FormData(r),c={descricao:l.get("descricao"),valor:parseFloat(l.get("valor")),tipo:l.get("tipo"),categoriaId:l.get("categoriaId")||null,data:l.get("data")};try{e?(await window.updateTransaction(n.id,c),t.remove(),window.refreshCurrentView()):(t.remove(),await window.addTransactionWithConfirmation(c),window.refreshCurrentView())}catch(d){console.error("Erro ao salvar transação:",d),d.message!=="Operação cancelada pelo usuário"&&$.show("Erro ao salvar transação","error")}});const o=t.querySelector("#categoriaId"),s=t.querySelector("#categoria-info");o.addEventListener("change",()=>{const i=o.value;if(i){const l=window.appState?.categories?.find(c=>c.id===i);if(l){const c=l.limite?parseFloat(l.limite):0,d=window.appState?.transactions?.filter(b=>b.categoriaId===i&&b.tipo==="despesa")?.reduce((b,_)=>b+parseFloat(_.valor),0)||0,h=c-d,g=c>0?d/c*100:0;let m="",v="";c===0?(m="Sem limite definido",v="text-gray-500"):h<0?(m=`⚠️ Limite excedido em R$ ${Math.abs(h).toFixed(2)}`,v="text-red-600"):h<c*.2?(m=`⚠️ Quase no limite (${g.toFixed(1)}% usado)`,v="text-yellow-600"):(m=`✓ Dentro do limite (${g.toFixed(1)}% usado)`,v="text-green-600"),s.innerHTML=`
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="font-medium">${l.nome}</div>
            <div class="text-xs mt-1">
              <div>Limite: R$ ${c.toFixed(2)}</div>
              <div>Gasto: R$ ${d.toFixed(2)}</div>
              <div>Disponível: R$ ${h.toFixed(2)}</div>
              <div class="${v} mt-1">${m}</div>
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de categoria adicionado ao DOM");const r=t.querySelector("#category-form");r.addEventListener("submit",async o=>{o.preventDefault();const s=new FormData(r),i={nome:s.get("nome"),tipo:s.get("tipo"),limite:s.get("limite")?parseFloat(s.get("limite")):null};try{e?(await window.updateCategory(n.id,i),t.remove(),window.refreshCurrentView()):(await window.addCategoryWithConfirmation(i),t.remove(),window.refreshCurrentView())}catch(l){console.error("Erro ao salvar categoria:",l),l.message!=="Operação cancelada pelo usuário"&&$.show("Erro ao salvar categoria","error")}})}catch(t){console.error("❌ Erro ao criar modal de categoria:",t),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de categoria","error"):alert("Erro ao abrir modal de categoria: "+t.message)}};window.editCategory=function(n){const e=window.appState.categories?.find(t=>t.id===n);e&&window.showAddCategoryModal(e)};function Xa(n="theme-toggle-btn"){const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=document.documentElement,r=localStorage.getItem("theme"),o=r?r==="dark":e;t.classList.toggle("dark",o),i();const s=document.getElementById(n);if(s){const d=s.cloneNode(!0);s.parentNode.replaceChild(d,s),d.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),console.log("🔧 Clique no botão de tema detectado"),console.log("🔧 Classes antes:",t.classList.toString());const g=t.classList.toggle("dark");localStorage.setItem("theme",g?"dark":"light"),console.log("🔧 Classes depois:",t.classList.toString()),console.log("🔧 isDarkNow:",g),console.log("🔧 localStorage theme:",localStorage.getItem("theme")),i(),l(),window.mobileEnhancements&&window.mobileEnhancements.adjustForTheme&&(window.mobileEnhancements.adjustForTheme(g),console.log("📱 Melhorias mobile atualizadas para tema:",g?"dark":"light")),console.log("🎨 Tema alterado para:",g?"dark":"light")}),console.log("✅ Botão de tema configurado:",n)}else console.warn("⚠️ Botão de tema não encontrado:",n);function i(){const d=document.getElementById("theme-icon");if(console.log("🔧 updateIcon chamada, ícone encontrado:",!!d),console.log('🔧 root.classList.contains("dark"):',t.classList.contains("dark")),d){const h=t.classList.contains("dark")?"🌙":"☀️";console.log("🔧 Novo ícone:",h),d.textContent=h}else console.log("🔧 Elemento theme-icon não encontrado")}function l(){const d=window.location.hash.replace("#","")||"/dashboard";c(),setTimeout(()=>{requestAnimationFrame(()=>{switch(d){case"/dashboard":window.renderDashboard&&window.renderDashboard();break;case"/transactions":window.renderTransactions&&window.renderTransactions();break;case"/categories":window.renderCategories&&window.renderCategories();break;case"/recorrentes":window.renderRecorrentes&&window.renderRecorrentes();break;case"/notifications":window.renderNotifications&&window.renderNotifications();break;case"/settings":window.renderSettings&&window.renderSettings();break;default:window.renderDashboard&&window.renderDashboard()}c(),console.log("✅ Tema aplicado na aba atual")})},200)}function c(){document.querySelectorAll('[class*="dark:"]').forEach(b=>{b.offsetHeight}),document.body.offsetHeight,document.documentElement.offsetHeight,document.querySelectorAll(".card-resumo, .bottom-nav, .modal-content, .btn-secondary, .form-group input, .form-group select, .form-group textarea, .tab-container, .tab-header, .tab-content, .list-item, .card-standard").forEach(b=>{b.offsetHeight});const m=document.documentElement.classList.contains("dark");document.querySelectorAll("*").forEach(b=>{const _=getComputedStyle(b);_.backgroundColor&&_.backgroundColor!=="rgba(0, 0, 0, 0)"&&b.offsetHeight}),console.log("🎨 Elementos de tema atualizados (isDark:",m,")")}}class Dd{constructor(){this.touchStartX=0,this.touchEndX=0,this.touchStartY=0,this.touchEndY=0,this.isSwiping=!1,this.swipeThreshold=80,this.tabs=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"],this.currentTabIndex=0,this.container=null,this.swipeIndicator=null,this.isEnabled=!0,this.hasShownInitialHint=!1,this.init()}init(){if(console.log("🔧 SwipeNavigation.init() chamado"),this.container=document.querySelector("#app-content"),!this.container){console.warn("SwipeNavigation: Container #app-content não encontrado");return}if(console.log("✅ Container encontrado:",this.container),!window.appState?.currentUser){console.log("SwipeNavigation: Usuário não logado, aguardando...");return}console.log("✅ Usuário logado:",window.appState.currentUser.uid),this.createSwipeIndicator(),this.bindEvents(),this.updateCurrentTabIndex(),console.log("SwipeNavigation: Inicializado com sucesso"),console.log("🔍 Estado final:",{isEnabled:this.isEnabled,container:this.container,tabs:this.tabs,currentTabIndex:this.currentTabIndex})}createSwipeIndicator(){this.swipeIndicator=document.createElement("div"),this.swipeIndicator.id="swipe-indicator",this.swipeIndicator.innerHTML=`
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
    `,document.head.appendChild(e),document.body.appendChild(this.swipeIndicator)}bindEvents(){const e=document.getElementById("login-page");if(e&&e.style.display!=="none"){console.log("SwipeNavigation: Tela de login ativa, não inicializando eventos");return}console.log("SwipeNavigation: Configurando eventos de navegação..."),this.container.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!1}),this.container.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),this.container.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!1}),this.container.addEventListener("mousedown",this.handleMouseStart.bind(this)),this.container.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.container.addEventListener("mouseup",this.handleMouseEnd.bind(this)),document.addEventListener("keydown",this.handleKeydown.bind(this),{capture:!0}),console.log("SwipeNavigation: Evento de teclado configurado no document"),document.addEventListener("keydown",t=>{console.log("🎹 SwipeNavigation - Evento de teclado capturado:",t.key,"Target:",t.target.tagName)},{capture:!0}),this.observeRouteChanges(),console.log("SwipeNavigation: Todos os eventos configurados com sucesso")}handleTouchStart(e){if(!this.isEnabled){console.log("👆 SwipeNavigation: Desabilitado, ignorando touch start");return}this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.isSwiping=!1,console.log("👆 SwipeNavigation: Touch start em",this.touchStartX,this.touchStartY)}handleTouchMove(e){if(!this.isEnabled||!this.touchStartX){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch move");return}const t=e.touches[0].clientX,r=e.touches[0].clientY,o=Math.abs(t-this.touchStartX),s=Math.abs(r-this.touchStartY);o>s&&o>20&&(this.isSwiping=!0,e.preventDefault(),console.log("👆 SwipeNavigation: Swipe horizontal detectado, deltaX:",o),this.showSwipeFeedback(o))}handleTouchEnd(e){if(!this.isEnabled||!this.isSwiping){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch end"),this.isSwiping||console.log("👆 SwipeNavigation: Não estava fazendo swipe, ignorando touch end");return}this.touchEndX=e.changedTouches[0].clientX,this.touchEndY=e.changedTouches[0].clientY;const t=this.touchEndX-this.touchStartX,r=this.touchEndY-this.touchStartY;console.log("👆 SwipeNavigation: Touch end, deltaX:",t,"deltaY:",r),Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(r)?(console.log("👆 SwipeNavigation: Swipe válido detectado, direção:",t>0?"right":"left"),this.handleSwipe(t>0?"right":"left")):console.log("👆 SwipeNavigation: Swipe inválido ou insuficiente"),this.resetSwipe()}handleMouseStart(e){!this.isEnabled||e.button!==0||(this.touchStartX=e.clientX,this.touchStartY=e.clientY,this.isSwiping=!1)}handleMouseMove(e){if(!this.isEnabled||!this.touchStartX)return;const t=Math.abs(e.clientX-this.touchStartX),r=Math.abs(e.clientY-this.touchStartY);t>r&&t>10&&(this.isSwiping=!0)}handleMouseEnd(e){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=e.clientX,this.touchEndY=e.clientY;const t=this.touchEndX-this.touchStartX,r=this.touchEndY-this.touchStartY;Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(r)&&this.handleSwipe(t>0?"right":"left"),this.resetSwipe()}handleKeydown(e){if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.contentEditable==="true")){if(!this.isEnabled){console.log("SwipeNavigation: Desabilitado, ignorando tecla:",e.key);return}switch(console.log("🎹 SwipeNavigation: Tecla pressionada:",e.key,"Target:",e.target.tagName),e.key){case"ArrowLeft":console.log("⬅️ SwipeNavigation: Seta esquerda - navegando para aba anterior"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex-1);break;case"ArrowRight":console.log("➡️ SwipeNavigation: Seta direita - navegando para próxima aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex+1);break;case"ArrowUp":console.log("⬆️ SwipeNavigation: Seta cima - primeira aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(0);break;case"ArrowDown":console.log("⬇️ SwipeNavigation: Seta baixo - última aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.tabs.length-1);break}}}handleSwipe(e){this.updateCurrentTabIndex();let t=this.currentTabIndex;e==="left"&&this.currentTabIndex<this.tabs.length-1?t=this.currentTabIndex+1:e==="right"&&this.currentTabIndex>0&&(t=this.currentTabIndex-1),t!==this.currentTabIndex?(this.navigateToTab(t),this.provideHapticFeedback()):this.showSwipeFeedback("edge")}navigateToTab(e){if(e<0||e>=this.tabs.length)return;const t=this.tabs[e];console.log(`SwipeNavigation: Navegando para ${t}`),this.animateTransition(e),window.router?window.router(t):window.location.hash=t,this.currentTabIndex=e,this.updateSwipeIndicator()}animateTransition(e){const t=this.container,r=e>this.currentTabIndex?1:-1;t.classList.add("swipe-transition"),t.style.transform=`translateX(${r*20}px)`,t.style.opacity="0.8",setTimeout(()=>{t.style.transform="translateX(0)",t.style.opacity="1"},50),setTimeout(()=>{t.classList.remove("swipe-transition"),t.style.transform="",t.style.opacity=""},300)}showSwipeFeedback(e){let t="";switch(e){case"edge":t=this.currentTabIndex===0?"Primeira aba":"Última aba";break;default:return}const r=document.createElement("div");r.className="swipe-feedback",r.textContent=t,document.body.appendChild(r),setTimeout(()=>r.classList.add("show"),10),setTimeout(()=>{r.classList.remove("show"),setTimeout(()=>r.remove(),200)},1e3)}provideHapticFeedback(){"vibrate"in navigator&&navigator.vibrate(50)}updateCurrentTabIndex(){const e=document.querySelector(".nav-btn.active");if(e){const t=e.getAttribute("data-route"),r=this.tabs.indexOf(t);r!==this.currentTabIndex&&(console.log("📍 Atualizando índice da aba atual:",{activeTabRoute:t,oldIndex:this.currentTabIndex,newIndex:r,availableTabs:this.tabs}),this.currentTabIndex=r,console.log("✅ Índice atualizado:",this.currentTabIndex))}}updateSwipeIndicator(){if(!this.swipeIndicator)return;this.swipeIndicator.querySelectorAll(".swipe-dot").forEach((t,r)=>{t.classList.toggle("active",r===this.currentTabIndex)}),this.hasShownInitialHint||(this.hasShownInitialHint=!0,this.swipeIndicator.classList.add("show"),setTimeout(()=>{this.swipeIndicator.classList.remove("show")},4e3))}observeRouteChanges(){let e=null,t=null;new MutationObserver(()=>{e&&clearTimeout(e),e=setTimeout(()=>{const s=document.querySelector(".nav-btn.active")?.getAttribute("data-route");s!==t&&(t=s,this.updateCurrentTabIndex(),this.updateSwipeIndicator())},200)}).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}resetSwipe(){this.touchStartX=0,this.touchStartY=0,this.touchEndX=0,this.touchEndY=0,this.isSwiping=!1}enable(){this.isEnabled=!0,console.log("SwipeNavigation: Habilitado")}disable(){this.isEnabled=!1,console.log("SwipeNavigation: Desabilitado")}destroy(){this.swipeIndicator&&this.swipeIndicator.remove(),console.log("SwipeNavigation: Destruído")}}window.swipeNavigation=null;class ab{constructor(){this.isInitialized=!1,this.orientation="portrait",this.deviceType=this.detectDeviceType(),this.touchSupport=this.detectTouchSupport(),this.init()}init(){this.isInitialized||(console.log("📱 Inicializando melhorias mobile..."),this.detectOrientation(),this.setupOrientationListener(),this.setupViewportListener(),this.setupTouchOptimizations(),this.setupPerformanceOptimizations(),this.applyMobileOptimizations(),this.isInitialized=!0,console.log("✅ Melhorias mobile inicializadas"))}detectDeviceType(){const e=navigator.userAgent.toLowerCase(),t=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(e);return/ipad|android(?!.*mobile)/i.test(e)?"tablet":t?"mobile":"desktop"}detectTouchSupport(){return"ontouchstart"in window||navigator.maxTouchPoints>0}detectOrientation(){window.innerHeight>window.innerWidth?this.orientation="portrait":this.orientation="landscape",document.body.classList.remove("orientation-portrait","orientation-landscape"),document.body.classList.add(`orientation-${this.orientation}`),console.log(`📱 Orientação detectada: ${this.orientation}`)}setupOrientationListener(){window.addEventListener("orientationchange",()=>{setTimeout(()=>{this.detectOrientation(),this.adjustForOrientation()},100)}),window.addEventListener("resize",()=>{const e=window.innerHeight>window.innerWidth?"portrait":"landscape";e!==this.orientation&&(this.orientation=e,this.detectOrientation(),this.adjustForOrientation())})}setupViewportListener(){if(this.deviceType==="mobile"){let e=document.querySelector('meta[name="viewport"]');e||(e=document.createElement("meta"),e.name="viewport",document.head.appendChild(e)),e.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"}}setupTouchOptimizations(){this.touchSupport&&(document.addEventListener("touchstart",e=>{const t=e.target.closest("button, .btn, .nav-btn, .mobile-btn, .fab");t&&t.classList.add("touch-active")},{passive:!0}),document.addEventListener("touchend",e=>{const t=e.target.closest("button, .btn, .nav-btn, .mobile-btn, .fab");t&&setTimeout(()=>{t.classList.remove("touch-active")},150)},{passive:!0}),document.addEventListener("touchend",e=>{const t=e.target.closest("button, .btn, .nav-btn, .mobile-btn, .fab, input, select");t&&(e.preventDefault(),t.click())}))}setupPerformanceOptimizations(){this.deviceType==="mobile"&&document.querySelectorAll(".overflow-y-auto, #app-content").forEach(t=>{t.style.webkitOverflowScrolling="touch",t.style.overscrollBehavior="contain"}),this.deviceType==="mobile"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches&&document.body.classList.add("reduce-motion")}adjustForOrientation(){const e=document.getElementById("app-content"),t=document.querySelector(".bottom-nav"),r=document.querySelector(".fab");this.orientation==="landscape"&&this.deviceType==="mobile"?(e&&(e.style.paddingBottom="70px"),t&&(t.style.height="60px"),r&&(r.style.bottom="70px",r.style.width="50px",r.style.height="50px")):(e&&(e.style.paddingBottom="100px"),t&&(t.style.height="80px"),r&&(r.style.bottom="100px",r.style.width="60px",r.style.height="60px")),console.log(`📱 Ajustes aplicados para orientação: ${this.orientation}`)}applyMobileOptimizations(){document.body.classList.add(`device-${this.deviceType}`),this.touchSupport&&document.body.classList.add("touch-device"),document.querySelectorAll(".icon-standard, .nav-icon, .btn-icon").forEach(t=>{(t.offsetWidth<44||t.offsetHeight<44)&&(t.style.minWidth="44px",t.style.minHeight="44px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center")}),this.deviceType==="mobile"&&document.querySelectorAll(".text-gray-400, .text-gray-500").forEach(r=>{r.classList.add("mobile-contrast-enhanced")})}detectDarkMode(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}adjustForTheme(e){this.deviceType==="mobile"&&document.querySelectorAll(".mobile-contrast-enhanced").forEach(r=>{e?r.style.color="#e5e7eb":r.style.color="#374151"})}optimizeForLowEndDevice(){if(navigator.hardwareConcurrency<=2||navigator.deviceMemory<=2){document.body.classList.add("low-end-device");const t=document.createElement("style");t.textContent=`
        .low-end-device * {
          animation-duration: 0.1s !important;
          transition-duration: 0.1s !important;
        }
        .low-end-device .transition-all {
          transition: none !important;
        }
      `,document.head.appendChild(t),console.log("📱 Otimizações para dispositivo de baixa performance aplicadas")}}reconfigure(){this.detectOrientation(),this.adjustForOrientation(),this.applyMobileOptimizations()}destroy(){document.body.classList.remove(`device-${this.deviceType}`,"touch-device","orientation-portrait","orientation-landscape","low-end-device"),this.isInitialized=!1,console.log("📱 Melhorias mobile removidas")}}const ib=`
  .touch-active {
    transform: scale(0.95) !important;
    opacity: 0.8 !important;
    transition: all 0.1s ease !important;
  }

  .mobile-contrast-enhanced {
    color: #374151 !important;
  }

  .dark .mobile-contrast-enhanced {
    color: #e5e7eb !important;
  }

  .device-mobile .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }

  .device-mobile .flex-row {
    flex-direction: column !important;
  }

  .orientation-landscape.device-mobile #app-content {
    padding-bottom: 70px !important;
  }

  .orientation-portrait.device-mobile #app-content {
    padding-bottom: 100px !important;
  }

  .reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  @supports (padding: max(0px)) {
    .device-mobile .app-container {
      padding-top: max(env(safe-area-inset-top), 0px) !important;
      padding-bottom: max(env(safe-area-inset-bottom), 80px) !important;
      padding-left: max(env(safe-area-inset-left), 0px) !important;
      padding-right: max(env(safe-area-inset-right), 0px) !important;
    }
  }
`;if(!document.getElementById("mobile-enhancement-styles")){const n=document.createElement("style");n.id="mobile-enhancement-styles",n.textContent=ib,document.head.appendChild(n)}const An=new ab;class cb{constructor(){this.isSupported=this.checkSupport(),this.isAvailable=!1,this.credentials=null}checkSupport(){return window.PublicKeyCredential&&window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&window.PublicKeyCredential.isConditionalMediationAvailable}async checkAvailability(){if(!this.isSupported)return console.log("🔒 BiometricAuth: Web Authentication API não suportada"),!1;try{const[e,t]=await Promise.all([window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),window.PublicKeyCredential.isConditionalMediationAvailable()]);return this.isAvailable=e&&t,console.log("🔒 BiometricAuth: Disponibilidade verificada:",{userVerifying:e,conditionalMediation:t,isAvailable:this.isAvailable}),this.isAvailable}catch(e){return console.error("🔒 BiometricAuth: Erro ao verificar disponibilidade:",e),!1}}async register(e,t){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando registro biométrico...");const r=new Uint8Array(32);window.crypto.getRandomValues(r);const o={challenge:r,rp:{name:"Servo Tech Finanças",id:window.location.hostname},user:{id:new Uint8Array(16),name:t,displayName:t},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4,attestation:"direct"},s=await navigator.credentials.create({publicKey:o});return this.credentials=s,this.saveCredentials(e,s),console.log("🔒 BiometricAuth: Registro biométrico concluído"),!0}catch(r){throw console.error("🔒 BiometricAuth: Erro no registro:",r),r}}async authenticate(){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando autenticação biométrica...");const e=this.loadCredentials();if(!e)throw new Error("Nenhuma credencial biométrica registrada");const t=new Uint8Array(32);window.crypto.getRandomValues(t);const r={challenge:t,rpId:window.location.hostname,allowCredentials:[{type:"public-key",id:e.rawId,transports:["internal"]}],userVerification:"required",timeout:6e4},o=await navigator.credentials.get({publicKey:r});return console.log("🔒 BiometricAuth: Autenticação biométrica bem-sucedida"),{success:!0,userId:e.userId,credential:o}}catch(e){throw console.error("🔒 BiometricAuth: Erro na autenticação:",e),e}}saveCredentials(e,t){try{const r={userId:e,rawId:Array.from(t.rawId),type:t.type,response:{clientDataJSON:Array.from(t.response.clientDataJSON),attestationObject:Array.from(t.response.attestationObject)}};localStorage.setItem("biometric_credentials",JSON.stringify(r)),this.saveUserInfo(e),console.log("🔒 BiometricAuth: Credenciais salvas no localStorage")}catch(r){console.error("🔒 BiometricAuth: Erro ao salvar credenciais:",r)}}saveUserInfo(){try{const e=window.FirebaseAuth?.currentUser;if(e){const t={uid:e.uid,email:e.email,displayName:e.displayName,photoURL:e.photoURL,lastLogin:new Date().toISOString()};localStorage.setItem("biometric_user_info",JSON.stringify(t)),console.log("🔒 BiometricAuth: Informações do usuário salvas")}}catch(e){console.error("🔒 BiometricAuth: Erro ao salvar informações do usuário:",e)}}loadUserInfo(){try{const e=localStorage.getItem("biometric_user_info");return e?JSON.parse(e):null}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar informações do usuário:",e),null}}loadCredentials(){try{const e=localStorage.getItem("biometric_credentials");if(!e)return null;const t=JSON.parse(e);return t.rawId=new Uint8Array(t.rawId),t.response.clientDataJSON=new Uint8Array(t.response.clientDataJSON),t.response.attestationObject=new Uint8Array(t.response.attestationObject),t}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar credenciais:",e),null}}hasSavedCredentials(){return localStorage.getItem("biometric_credentials")!==null}removeCredentials(){try{return localStorage.removeItem("biometric_credentials"),console.log("🔒 BiometricAuth: Credenciais removidas"),!0}catch(e){return console.error("🔒 BiometricAuth: Erro ao remover credenciais:",e),!1}}getDeviceInfo(){return{isSupported:this.isSupported,isAvailable:this.isAvailable,hasCredentials:this.hasSavedCredentials(),userAgent:navigator.userAgent,platform:navigator.platform}}}window.biometricAuth=new cb;window.showBiometricSetup=async function(){try{if(!await window.biometricAuth.checkAvailability()){$({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"});return}const e=window.FirebaseAuth?.currentUser;if(!e){$({message:"Você precisa estar logado para configurar autenticação biométrica.",type:"error"});return}const t=Yt({title:"🔒 Configurar Autenticação Biométrica",content:`
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
      `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const r=document.getElementById("btn-setup-biometric");r&&r.addEventListener("click",async()=>{try{r.disabled=!0,r.innerHTML="<span>⏳</span> Configurando...",await window.biometricAuth.register(e.uid,e.email),window.biometricAuth.saveUserInfo(e.uid),$({message:"Autenticação biométrica configurada com sucesso!",type:"success"}),t.remove()}catch(o){console.error("Erro na configuração biométrica:",o),$({message:"Erro ao configurar autenticação biométrica: "+o.message,type:"error"}),r.disabled=!1,r.innerHTML="<span>🔐</span> Configurar Agora"}})},100)}catch(n){console.error("Erro ao mostrar configuração biométrica:",n),$({message:"Erro ao abrir configuração biométrica: "+n.message,type:"error"})}};window.authenticateWithBiometric=async function(){try{if(console.log("🔐 Iniciando autenticação biométrica..."),!await window.biometricAuth.checkAvailability())return $({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"}),!1;if(!window.biometricAuth.hasSavedCredentials())return $({message:"Configure a autenticação biométrica primeiro nas configurações.",type:"info"}),!1;if(window.showLoading(!0),(await window.biometricAuth.authenticate()).success){console.log("🔐 Autenticação biométrica bem-sucedida, fazendo login...");const t=window.biometricAuth.loadCredentials(),r=window.biometricAuth.loadUserInfo();if(t&&t.userId&&r)try{const o=window.FirebaseAuth?.currentUser;if(o&&o.uid===t.userId)return console.log("🔐 Usuário já está logado"),$({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0;console.log("🔐 Fazendo login automático para usuário:",r.email);const s={uid:r.uid,email:r.email,displayName:r.displayName,photoURL:r.photoURL,isAnonymous:!1,providerData:[{providerId:"google.com",uid:r.uid,displayName:r.displayName,email:r.email,photoURL:r.photoURL}]},i=new CustomEvent("biometricLoginSuccess",{detail:{user:s,userId:t.userId}});return document.dispatchEvent(i),$({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0}catch(o){return console.error("Erro ao fazer login:",o),$({message:"Erro ao fazer login. Tente novamente.",type:"error"}),window.showLoading(!1),!1}else return $({message:"Credenciais biométricas inválidas ou incompletas.",type:"error"}),window.showLoading(!1),!1}return window.showLoading(!1),!1}catch(n){console.error("Erro na autenticação biométrica:",n);let e="Erro na autenticação biométrica.";return n.name==="NotAllowedError"?e="Autenticação biométrica cancelada pelo usuário.":n.name==="SecurityError"?e="Erro de segurança na autenticação biométrica.":n.name==="NotSupportedError"?e="Autenticação biométrica não suportada.":n.message&&(e=n.message),$({message:e,type:"error"}),window.showLoading(!1),!1}};document.addEventListener("DOMContentLoaded",async()=>{try{const n=await window.biometricAuth.checkAvailability();if(console.log("🔒 BiometricAuth: Inicialização concluída, disponível:",n),n&&window.biometricAuth.hasSavedCredentials()){const e=document.getElementById("biometric-login-btn");e&&(e.style.display="block",e.innerHTML="<span>🔐</span> Entrar com Biometria")}else{const e=document.getElementById("biometric-login-btn");e&&(e.style.display="none")}}catch(n){console.error("🔒 BiometricAuth: Erro na inicialização:",n)}});async function lb(){try{const n=new wt;return(await d0(en,n)).user}catch(n){throw n.code==="auth/cancelled-popup-request"?$({message:"Login cancelado. Tente novamente.",type:"info"}):$({message:"Erro ao fazer login: "+n.message,type:"error"}),n}}class zo{static async getGastosPorCategoria(e,t,r){try{if(console.log("📊 Gerando relatório de gastos por categoria..."),!e)throw new Error("ID do orçamento não fornecido");if(!t||!r){const c=new Date;t=new Date(c.getFullYear(),c.getMonth(),1),r=new Date(c.getFullYear(),c.getMonth()+1,0)}let o=[],s=[];if(window.appState?.transactions&&window.appState?.categories)console.log("📊 Usando dados já carregados na aplicação"),o=window.appState.transactions.filter(c=>{if(c.budgetId!==e)return!1;const d=c.createdAt?.toDate?c.createdAt.toDate():new Date(c.createdAt);return d>=t&&d<=r}),s=window.appState.categories.filter(c=>c.budgetId===e);else{console.log("📊 Buscando dados do Firestore...");const c=oe(U,"transactions"),d=ve(c,re("budgetId","==",e),re("createdAt",">=",t),re("createdAt","<=",r));o=(await fe(d)).docs.map(b=>({id:b.id,...b.data()}));const g=oe(U,"categories"),m=ve(g,re("budgetId","==",e));s=(await fe(m)).docs.map(b=>({id:b.id,...b.data()}))}const i=s.map(c=>{const d=o.filter(g=>g.categoriaId===c.id),h=d.reduce((g,m)=>g+parseFloat(m.valor),0);return{categoria:c,totalGasto:h,transacoes:d,percentual:0}}),l=i.reduce((c,d)=>c+d.totalGasto,0);return i.forEach(c=>{c.percentual=l>0?c.totalGasto/l*100:0}),i.sort((c,d)=>d.totalGasto-c.totalGasto),console.log("✅ Relatório gerado com sucesso:",i),i}catch(o){throw console.error("❌ Erro ao gerar relatório de gastos por categoria:",o),o}}static async getEvolucaoSaldo(e,t=6){try{if(console.log("📊 Gerando relatório de evolução de saldo..."),!e)throw new Error("ID do orçamento não fornecido");const r=new Date,o=[];for(let s=0;s<t;s++){const i=r.getMonth()-s,l=r.getFullYear()+Math.floor(i/12),c=(i%12+12)%12,d=new Date(l,c,1),h=new Date(l,c+1,0);o.push({ano:l,mes:c+1,nome:d.toLocaleString("pt-BR",{month:"long"}),startDate:d,endDate:h,receitas:0,despesas:0,saldo:0})}for(const s of o){let i=[];if(window.appState?.transactions)i=window.appState.transactions.filter(l=>{if(l.budgetId!==e)return!1;const c=l.createdAt?.toDate?l.createdAt.toDate():new Date(l.createdAt);return c>=s.startDate&&c<=s.endDate});else{const l=oe(U,"transactions"),c=ve(l,re("budgetId","==",e),re("createdAt",">=",s.startDate),re("createdAt","<=",s.endDate));i=(await fe(c)).docs.map(h=>({id:h.id,...h.data()}))}for(const l of i){const c=parseFloat(l.valor);l.tipo==="receita"?s.receitas+=c:s.despesas+=c}s.saldo=s.receitas-s.despesas}return o.sort((s,i)=>s.ano!==i.ano?i.ano-s.ano:i.mes-s.mes),console.log("✅ Relatório de evolução de saldo gerado com sucesso:",o),o}catch(r){throw console.error("❌ Erro ao gerar relatório de evolução de saldo:",r),r}}static async getPrevisaoGastos(e,t=3,r=3){try{if(console.log("📊 Gerando previsão de gastos..."),!e)throw new Error("ID do orçamento não fornecido");const o=await this.getEvolucaoSaldo(e,t),s=o.reduce((d,h)=>d+h.receitas,0)/o.length,i=o.reduce((d,h)=>d+h.despesas,0)/o.length,l=new Date,c=[];for(let d=1;d<=r;d++){const h=l.getMonth()+d,g=l.getFullYear()+Math.floor(h/12),m=h%12,v=new Date(g,m,1),b=1+d*.01;c.push({ano:g,mes:m+1,nome:v.toLocaleString("pt-BR",{month:"long"}),receitas:s*b,despesas:i*b,saldo:(s-i)*b,isPrevisto:!0})}return console.log("✅ Previsão de gastos gerada com sucesso:",c),c}catch(o){throw console.error("❌ Erro ao gerar previsão de gastos:",o),o}}static renderizarGraficoCategorias(e,t){try{console.log("📊 Renderizando gráfico de categorias...");const r=document.getElementById(e);if(!r)throw new Error(`Elemento com ID ${e} não encontrado`);if(r.innerHTML="",!t||t.length===0){r.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const o=`
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
      `;r.innerHTML=o,console.log("✅ Gráfico renderizado com sucesso")}catch(r){throw console.error("❌ Erro ao renderizar gráfico de categorias:",r),r}}static renderizarGraficoEvolucao(e,t){try{console.log("📊 Renderizando gráfico de evolução...");const r=document.getElementById(e);if(!r)throw new Error(`Elemento com ID ${e} não encontrado`);if(r.innerHTML="",!t||t.length===0){r.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const o=Math.max(...t.map(c=>c.receitas)),s=Math.max(...t.map(c=>c.despesas)),i=Math.max(o,s)*1.1,l=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Evolução Financeira</h3>
          
          <div class="relative h-64 mt-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0,1,2,3].map(c=>`
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-12 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${(i/4*(4-c)).toFixed(0)}
                  </span>
                </div>
              `).join("")}
            </div>
            
            <!-- Gráfico de linhas -->
            <div class="absolute inset-0 flex items-end justify-between">
              ${t.map((c,d)=>{const h=c.receitas/i*100,g=c.despesas/i*100,m=c.saldo>=0?"bg-green-500":"bg-red-500",v=c.isPrevisto;return`
                  <div class="flex flex-col items-center justify-end w-full max-w-[${100/t.length}%] px-1">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${v?"bg-green-300/50":"bg-green-500"} rounded-t" 
                           style="height: ${h}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${v?"bg-red-300/50":"bg-red-500"} rounded-t" 
                           style="height: ${g}%"></div>
                    </div>
                    
                    <!-- Rótulo do mês -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${v?"italic":""}">
                      ${c.nome.substring(0,3)}
                      ${v?"*":""}
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
            ${t.some(c=>c.isPrevisto)?`
              <div class="flex items-center">
                <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
              </div>
            `:""}
          </div>
        </div>
      `;r.innerHTML=l,console.log("✅ Gráfico de evolução renderizado com sucesso")}catch(r){throw console.error("❌ Erro ao renderizar gráfico de evolução:",r),r}}static async gerarRelatorioCompleto(e){try{if(console.log("📊 Gerando relatório completo..."),!e)throw new Error("ID do orçamento não fornecido");if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");console.log("🔍 Gerando relatório para orçamento:",e);const[t,r,o]=await Promise.all([this.getGastosPorCategoria(e),this.getEvolucaoSaldo(e,6),this.getPrevisaoGastos(e,3,3)]);console.log("📊 Dados obtidos:",{gastosPorCategoria:t.length,evolucaoSaldo:r.length,previsaoGastos:o.length});const s={gastosPorCategoria:t,evolucaoSaldo:r,previsaoGastos:o,resumo:{saldoAtual:r[0]?.saldo||0,receitasMes:r[0]?.receitas||0,despesasMes:r[0]?.despesas||0,tendencia:o[0]?.saldo>=0?"positiva":"negativa",categoriasMaioresGastos:t.slice(0,3)}};return console.log("✅ Relatório completo gerado com sucesso"),s}catch(t){throw console.error("❌ Erro ao gerar relatório completo:",t),console.error("Stack trace:",t.stack),t}}}window.Analytics=zo;class up{static async render(e){console.log("📊 Renderizando página de análises...");const t=document.createElement("div");t.className="analytics-page p-4";const r=document.createElement("div");r.className="mb-6",r.innerHTML=`
      <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Análises Financeiras</h2>
      <p class="text-gray-600 dark:text-gray-400">Visualize seus dados financeiros de forma clara e objetiva</p>
    `,t.appendChild(r);const o=document.createElement("div");o.className="flex justify-center items-center py-12",o.innerHTML=`
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    `,t.appendChild(o);try{const s=await zo.gerarRelatorioCompleto(e);t.removeChild(o);const i=document.createElement("div");i.className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",i.innerHTML=`
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
      `,t.appendChild(i);const l=document.createElement("div");l.className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8";const c=document.createElement("div");c.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",c.id="evolucao-chart",l.appendChild(c);const d=document.createElement("div");d.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",d.id="categorias-chart",l.appendChild(d),t.appendChild(l);const h=document.createElement("div");h.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8",h.innerHTML=`
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
              ${s.previsaoGastos.map((v,b)=>`
                <tr class="${b%2===0?"bg-gray-50 dark:bg-gray-900/50":""}">
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">${v.nome} ${v.ano}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${v.receitas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${v.despesas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm font-medium ${v.saldo>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">R$ ${v.saldo.toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">* Previsão baseada na média dos últimos 3 meses com tendência de crescimento de 1% ao mês</p>
      `,t.appendChild(h);const g=document.createElement("div");g.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",g.innerHTML=`
        <h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Maiores Gastos por Categoria</h3>
        <div class="space-y-4">
          ${s.gastosPorCategoria.slice(0,5).map(v=>`
            <div>
              <div class="flex justify-between mb-1">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${v.categoria.cor||"#4F46E5"}"></div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${v.categoria.nome}</span>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">R$ ${v.totalGasto.toFixed(2)}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: ${v.percentual}%; background-color: ${v.categoria.cor||"#4F46E5"}"></div>
              </div>
            </div>
          `).join("")}
        </div>
      `,t.appendChild(g);const m=(v=1,b=5)=>{const _=document.getElementById("evolucao-chart"),S=document.getElementById("categorias-chart");if(console.log(`🔍 Tentativa ${v}: Verificando elementos dos gráficos...`),console.log("- evolucao-chart:",!!_),console.log("- categorias-chart:",!!S),_&&S)try{console.log("📊 Renderizando gráficos..."),zo.renderizarGraficoEvolucao("evolucao-chart",[...s.evolucaoSaldo,...s.previsaoGastos]),zo.renderizarGraficoCategorias("categorias-chart",s.gastosPorCategoria),console.log("✅ Gráficos renderizados com sucesso!")}catch(N){console.error("❌ Erro ao renderizar gráficos:",N)}else v<b?(console.log(`⏳ Elementos não encontrados, tentando novamente em ${v*100}ms...`),setTimeout(()=>m(v+1,b),v*100)):console.error("❌ Não foi possível encontrar os elementos dos gráficos após",b,"tentativas")};setTimeout(()=>m(),50)}catch(s){console.error("❌ Erro ao renderizar página de análises:",s),t.contains(o)&&t.removeChild(o);const i=document.createElement("div");i.className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6",i.innerHTML=`
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${s.message}</p>
      `,t.appendChild(i)}return t}}window.AnalyticsPage=up;let Ea=!1,mr=null;async function Qi(){const n=new Date().toISOString();return console.log(`🎯 [${n}] Iniciando renderização de análises - Versão Anti-Corrida`),Ea&&(console.log(`⏳ [${n}] Renderização já em andamento, aguardando...`),mr)?await mr:(Ea=!0,mr=(async()=>{try{console.log(`🧹 [${n}] Limpando DOM...`);const e=document.getElementById("app-content");if(!e)throw new Error("Container app-content não encontrado");if(e.innerHTML="",await new Promise(o=>setTimeout(o,50)),console.log(`✅ [${n}] app-content limpo e encontrado`),!window.appState?.currentUser){console.log(`⚠️ [${n}] Usuário não autenticado`),Nd("Usuário não autenticado","Faça login para acessar as análises");return}window.appState?.currentBudget||(console.log(`🔄 [${n}] Carregando orçamentos...`),window.loadBudgets&&await window.loadBudgets()),console.log(`🏗️ [${n}] Criando HTML da página...`);const t=db();console.log(`📝 [${n}] Inserindo HTML...`),e.innerHTML=t;let r=document.getElementById("analytics-content");if(!r&&(console.log(`⚠️ [${n}] analytics-content não encontrado imediatamente, aguardando...`),await new Promise(o=>setTimeout(o,100)),r=document.getElementById("analytics-content"),!r)){console.log(`❌ [${n}] analytics-content ainda não encontrado, forçando criação...`);const o=document.createElement("div");o.id="analytics-content",o.className="analytics-content",e.appendChild(o),r=o,console.log(`🔧 [${n}] analytics-content criado forçadamente`)}console.log(`✅ [${n}] analytics-content encontrado:`,r),await ub(r),console.log(`🎉 [${n}] Análises renderizadas com sucesso!`)}catch(e){const t=new Date().toISOString();console.error(`💥 [${t}] Erro ao renderizar análises:`,e),Nd("Erro ao carregar análises",e.message)}finally{Ea=!1,mr=null}})(),await mr)}function db(){return`
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
  `}async function ub(n,e){try{console.log(`🎨 [${e}] Renderizando conteúdo da página...`);const t=await up.render(window.appState.currentBudget.id);n.innerHTML="",n.appendChild(t),console.log(`✅ [${e}] Conteúdo renderizado com sucesso`)}catch(t){console.error(`❌ [${e}] Erro ao renderizar conteúdo:`,t),n.innerHTML=`
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
    `}}async function Nd(n,e){console.log(`🚨 [${e}] Renderizando página de erro...`);const t=document.getElementById("app-content");if(!t){console.error(`💥 [${e}] Não foi possível renderizar página de erro: app-content não encontrado`);return}t.innerHTML=`
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
  `;const r=document.getElementById("retry-analytics-btn");r&&r.addEventListener("click",()=>{console.log(`🔄 [${e}] Tentando novamente...`),Qi()});const o=document.getElementById("back-dashboard-btn");o&&o.addEventListener("click",()=>{console.log(`🏠 [${e}] Voltando ao dashboard...`),window.location.hash="#/dashboard"}),console.log(`✅ [${e}] Página de erro renderizada`)}window.renderAnalytics=Qi;console.log("📦 AnalyticsRoute.js carregado (versão definitiva)");function hb(){console.log("🔧 Criando FAB corrigido...");let n=!1,e=!1;const t=c(),r=d(),o=h(),s=g({id:"fab-transaction",text:"Nova Transação",icon:"💰",color:"var(--primary-color)",action:gb}),i=g({id:"fab-recorrente",text:"Nova Recorrente",icon:"🔄",color:"var(--secondary-color)",action:fb}),l=g({id:"fab-voice",text:"Voz",icon:"🎤",color:"var(--success-color)",action:mb});return o.appendChild(s),o.appendChild(i),o.appendChild(l),t.appendChild(o),t.appendChild(r),m(),console.log("✅ FAB corrigido criado com sucesso"),t;function c(){const S=document.createElement("div");return S.id="fab-container-main",S.className="fab-container-refactored",S.style.cssText=`
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
    `;const N=()=>{!n&&!e&&(S.style.transform="scale(1.1) rotate(0deg)",S.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.3)")},M=()=>{!n&&!e&&(S.style.transform="scale(1) rotate(0deg)",S.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)")};return S.addEventListener("mouseenter",N),S.addEventListener("mouseleave",M),S.addEventListener("touchstart",N),S.addEventListener("touchend",M),S}function h(){const S=document.createElement("div");return S.id="fab-actions",S.style.cssText=`
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
    `,S}function g({id:S,text:N,icon:M,color:F,action:Z}){const K=document.createElement("button");K.id=S,K.innerHTML=`${M} ${N}`,K.type="button",K.setAttribute("aria-label",N),K.style.cssText=`
      background: linear-gradient(135deg, ${F}, ${pb(F,-20)}) !important;
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
    `;const ne=()=>{e||(K.style.transform="scale(1.05)",K.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.3)")},x=()=>{e||(K.style.transform="scale(1)",K.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)")};K.addEventListener("mouseenter",ne),K.addEventListener("mouseleave",x),K.addEventListener("touchstart",ne),K.addEventListener("touchend",x);const w=y=>{y.preventDefault(),y.stopPropagation(),console.log(`🔧 Botão ${S} clicado!`);let T=!1;try{Z&&(Z(),T=!0)}catch(I){console.error(`❌ Erro ao executar ação do botão ${S}:`,I),mn(`Erro ao executar ${N}`)}T&&_()};return K.addEventListener("click",w),K}function m(){const S=F=>{F.preventDefault(),F.stopPropagation(),v()};r.addEventListener("click",S);const N=F=>{!t.contains(F.target)&&n&&_()};document.addEventListener("click",N);const M=F=>{F.key==="Escape"&&n&&_()};document.addEventListener("keydown",M),t.addEventListener("click",F=>{F.stopPropagation()})}function v(){if(e){console.log("⚠️ FAB está animando, ignorando clique");return}e=!0,console.log("🔧 Alternando FAB:",n?"Fechando":"Abrindo"),n?_():b()}function b(){console.log("🔧 Abrindo FAB..."),o.style.display="flex",o.style.visibility="visible",o.style.pointerEvents="auto",o.style.opacity="0",o.style.transform="translateY(20px)",requestAnimationFrame(()=>{o.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",o.style.opacity="1",o.style.transform="translateY(0)"}),r.style.transform="rotate(45deg)",n=!0,setTimeout(()=>{e=!1},300)}function _(){console.log("🔧 Fechando FAB..."),o.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",o.style.opacity="0",o.style.transform="translateY(20px)",o.style.pointerEvents="none",r.style.transform="rotate(0deg)",n=!1,setTimeout(()=>{o.style.display="none",o.style.visibility="hidden",e=!1},300)}}function pb(n,e){if(n.startsWith("var(--primary-color)"))return"var(--secondary-color)";if(n.startsWith("var(--secondary-color)"))return"var(--primary-color)";if(n.startsWith("var(--success-color)"))return"var(--success-color)";if(n.startsWith("var("))return n;const t=n.replace("#",""),r=Math.max(0,Math.min(255,parseInt(t.substr(0,2),16)+e)),o=Math.max(0,Math.min(255,parseInt(t.substr(2,2),16)+e)),s=Math.max(0,Math.min(255,parseInt(t.substr(4,2),16)+e));return`#${r.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}`}function gb(){if(console.log("🔧 Executando ação: Nova Transação"),typeof window.showAddTransactionModal=="function"){console.log("✅ Função showAddTransactionModal encontrada");try{return window.showAddTransactionModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddTransactionModal:",n),mn("Erro ao abrir modal de transação"),!1}}else return console.warn("⚠️ Função showAddTransactionModal não disponível"),mn("Modal de transação não disponível. Tente recarregar a página."),!1}function fb(){if(console.log("🔧 Executando ação: Nova Recorrente"),typeof window.showAddRecorrenteModal=="function"){console.log("✅ Função showAddRecorrenteModal encontrada");try{return window.showAddRecorrenteModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddRecorrenteModal:",n),mn("Erro ao abrir modal de recorrente"),!1}}else return console.warn("⚠️ Função showAddRecorrenteModal não disponível"),mn("Modal de recorrente não disponível. Tente recarregar a página."),!1}function mb(){if(console.log("🔧 Executando ação: Voz"),typeof window.openVoiceModal=="function"){console.log("✅ Função openVoiceModal encontrada");try{return window.openVoiceModal(),!0}catch(n){return console.error("❌ Erro ao executar openVoiceModal:",n),mn("Erro ao abrir modal de voz"),!1}}else return console.warn("⚠️ Função openVoiceModal não disponível"),mn("Funcionalidade de voz não disponível. Tente recarregar a página."),!1}function mn(n){if(console.error("❌ Erro no FAB:",n),window.Snackbar&&typeof window.Snackbar.show=="function")try{window.Snackbar.show(n,"error");return}catch(e){console.warn("⚠️ Erro ao usar Snackbar:",e)}window.alert?alert(n):console.error("Nenhum sistema de notificação disponível")}window.toggleFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-main");e&&e.click()}};window.closeFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="none",e.style.opacity="0",e.style.visibility="hidden",e.style.pointerEvents="none",t.style.transform="rotate(0deg)")}};window.openFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="flex",e.style.visibility="visible",e.style.opacity="1",e.style.transform="translateY(0)",e.style.pointerEvents="auto",t.style.transform="rotate(45deg)")}};window.cleanupFAB=function(){};window.checkFABState=function(){const n=document.getElementById("fab-container-main"),e=document.getElementById("fab-actions"),t=document.getElementById("fab-main");if(console.log("🔍 Estado do FAB:"),console.log("  - Container:",!!n),console.log("  - Actions:",!!e),console.log("  - Main button:",!!t),n&&e&&t){const r=e.style.display,o=t.style.transform;console.log("  - Actions display:",r),console.log("  - Main transform:",o)}return{fabContainer:n,fabActions:e,fabMain:t}};async function wb(n){if(!confirm("Tem certeza que deseja excluir esta despesa recorrente?"))return;const e=window.appState?.currentUser;if(!e){$({message:"Usuário não autenticado.",type:"error"});return}await Xi(e.uid,n),$({message:"Recorrente excluída com sucesso.",type:"success"}),await window.loadRecorrentes(),Yi()}function yb(n){const e=window.appState?.currentUser;if(!e){$({message:"Usuário não autenticado.",type:"error"});return}dp(e.uid,n.id,{ativa:!n.ativa}),$({message:"Status atualizado com sucesso.",type:"info"}),window.loadRecorrentes().then(Yi)}window.handleDeleteRecorrente=wb;window.handleToggleRecorrente=yb;async function hp(n){const e=window.appState?.currentUser;if(!e){$({message:"Usuário não autenticado.",type:"error"});return}const t=(window.appState.recorrentes||[]).find(i=>i.id===n),r=t?t.descricao:"",o=window.appState.currentBudget?.id;console.log("🔍 Iniciando busca de histórico para:",{recorrenteId:n,descricao:r,budgetId:o,userId:e.uid});const s=Yt({title:`Histórico de ${r}`,content:`<div class='flex flex-col items-center py-8'>
      <div class='loader mb-4'></div>
      <div>Carregando histórico...</div>
      <button onclick='closeModal()' class='mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
    </div>`});document.body.appendChild(s);try{const{collection:i,getDocs:l,query:c,where:d}=await Be(async()=>{const{collection:x,getDocs:w,query:y,where:T}=await Promise.resolve().then(()=>Ke);return{collection:x,getDocs:w,query:y,where:T}},void 0),{db:h}=await Be(async()=>{const{db:x}=await Promise.resolve().then(()=>lp);return{db:x}},void 0);let g=[];console.log("🔍 Buscando transações na coleção principal...");const m=i(h,"transactions"),b=(await l(c(m,d("userId","==",e.uid),d("recorrenteId","==",n)))).docs.map(x=>({...x.data(),id:x.id,origem:"principal"}));console.log("📊 Transações encontradas na coleção principal:",b.length),b.forEach(x=>{console.log("  -",x.descricao,"R$",x.valor,"BudgetId:",x.budgetId,"ID:",x.id)});const S=(window.appState.transactions||[]).filter(x=>x.recorrenteId===n);if(console.log("🔍 Transações no appState com este recorrenteId:",S.length),S.forEach(x=>{console.log("  - AppState:",x.descricao,"R$",x.valor,"BudgetId:",x.budgetId,"ID:",x.id)}),g=g.concat(b),r){console.log("🔍 Buscando transações por descrição:",r);const w=(await l(c(m,d("userId","==",e.uid),d("descricao","==",r)))).docs.map(y=>({...y.data(),id:y.id,origem:"descricao"})).filter(y=>!y.recorrenteId||y.recorrenteId!==n);console.log("📊 Transações encontradas por descrição:",w.length),w.forEach(y=>{console.log("  -",y.descricao,"R$",y.valor,"RecorrenteId:",y.recorrenteId)}),g=g.concat(w)}console.log("🔍 Buscando no histórico mensal...");const N=new Date,M=N.getFullYear(),F=N.getMonth()+1;for(let x=2023;x<=M;x++){const w=x===M?F:12;for(let y=1;y<=w;y++){const T=String(y).padStart(2,"0"),I=i(h,"users",e.uid,"historico",`${x}-${T}`,"transacoes");try{const A=await l(c(I,d("recorrenteId","==",n)));if(!A.empty){console.log(`📊 Histórico ${x}-${T}:`,A.docs.length,"transações");const E=A.docs.map(D=>({...D.data(),id:D.id,origem:`historico-${x}-${T}`}));g=g.concat(E)}}catch(A){console.log(`⚠️ Erro ao buscar histórico ${x}-${T}:`,A.message)}}}if(g.length===0){console.log("🔍 Nenhuma transação encontrada no Firestore, buscando no appState...");const w=(window.appState.transactions||[]).filter(y=>y.recorrenteId===n||r&&y.descricao?.toLowerCase().includes(r.toLowerCase()));console.log("📊 Transações encontradas no appState:",w.length),w.forEach(y=>{console.log("  - AppState:",y.descricao,"R$",y.valor,"BudgetId:",y.budgetId,"ID:",y.id)}),g=w.map(y=>({...y,origem:"appState"}))}const Z=[],K=new Set;g.forEach(x=>{K.has(x.id)||(K.add(x.id),Z.push(x))}),g=Z,console.log("📊 Total de transações únicas encontradas:",g.length),g.sort((x,w)=>{const y=x.createdAt?.seconds?x.createdAt.seconds:0;return(w.createdAt?.seconds?w.createdAt.seconds:0)-y});const ne=s.querySelector(".modal-body");ne.innerHTML=`
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
              </div>`:g.map(x=>`
                  <div class='flex justify-between items-center border-b pb-2 mb-2'>
                    <div class='flex-1'>
                      <div class='font-medium'>${x.descricao||"Sem descrição"}</div>
                      <div class='text-xs text-gray-500'>
                        ${x.createdAt?.seconds?new Date(x.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}
                        ${x.origem?` • ${x.origem}`:""}
                      </div>
                    </div>
                    <div class='text-right'>
                      <div class='font-bold ${x.tipo==="receita"?"text-green-600":"text-red-600"}'>
                        ${x.tipo==="receita"?"+":"-"}R$ ${parseFloat(x.valor||0).toFixed(2)}
                      </div>
                      <div class='text-xs text-gray-400'>ID: ${x.id||"-"}</div>
                    </div>
                  </div>
                `).join("")}
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>
    `}catch(i){console.error("❌ Erro ao carregar histórico:",i),s.querySelector(".modal-body").innerHTML=`<div class='text-red-600 text-center mt-4'>
        <p><b>Erro ao carregar histórico.</b></p>
        <p class='text-sm mt-2'>${i.message||i}</p>
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>`,$({message:"Erro ao carregar histórico: "+(i.message||i),type:"error"})}}window.showHistoricoRecorrente=hp;function vb(n,e){try{const t=new Date,r=new Date(n),o=t.getMonth()>r.getMonth()?t.getFullYear():r.getFullYear(),s=t.getMonth()+(e<=t.getDate()?1:0);return new Date(o,s,e)}catch{return new Date}}function Yi(){const n=window.appState?.currentUser,e=window.appState?.currentBudget,t=document.getElementById("app-content");if(t.innerHTML=`
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
  `,!n||!e){document.getElementById("recorrentes-list").innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhum usuário ou orçamento ativo.</p>';return}const r=window.appState.recorrentes||[],o=window.appState.transactions||[],s=new Date,i=s.getFullYear(),l=s.getMonth()+1,c=o.filter(h=>{if(!h.recorrenteId)return!1;let g;if(h.createdAt&&typeof h.createdAt=="object"&&h.createdAt.seconds)g=new Date(h.createdAt.seconds*1e3);else if(h.createdAt)g=new Date(h.createdAt);else return!1;return g.getFullYear()===i&&g.getMonth()+1===l}).map(h=>h.recorrenteId),d=document.getElementById("recorrentes-list");if(!r.length){d.innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhuma despesa recorrente cadastrada.</p>';return}d.innerHTML="",r.forEach(h=>{const g=c.includes(h.id),v=vb(h.dataInicio,h.diaLancamento||1).toLocaleDateString("pt-BR"),b=window.calcularStatusRecorrente?window.calcularStatusRecorrente(h,o,i,l):{parcelaAtual:null,totalParcelas:h.parcelasTotal,foiEfetivadaEsteMes:g},_=document.createElement("div");_.className="card-standard";const S=parseFloat(h.valor),N=h.valorTotal?parseFloat(h.valorTotal):b.totalParcelas&&b.totalParcelas>1?S*b.totalParcelas:S;let M="";b.temParcelas?b.foiEfetivadaEsteMes?M=`✅ Efetivada: ${b.parcelaAtual} de ${b.totalParcelas}`:b.proximaParcela&&b.proximaParcela<=b.totalParcelas?M=`📅 Agendada: ${b.proximaParcela} de ${b.totalParcelas}`:M=`📊 Parcela ${b.parcelaAtual} de ${b.totalParcelas}`:M="♾️ Infinito",_.innerHTML=`
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${h.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${h.descricao}</span>
      </div>
      <p class="list-item-subtitle">Valor da parcela: R$ ${S.toFixed(2)}${b.totalParcelas&&b.totalParcelas>1?` | Total: R$ ${N.toFixed(2)}`:""}</p>
      <p class="list-item-subtitle">Categoria: ${h.categoriaId||"Sem categoria"}</p>
      <p class="list-item-subtitle font-semibold ${b.foiEfetivadaEsteMes?"text-green-600 dark:text-green-400":"text-blue-600 dark:text-blue-400"}">${M}</p>
      ${h.ativa!==!1&&!b.foiEfetivadaEsteMes?`<p class="text-sm text-green-500 mb-3">Próxima aplicação: ${v}</p>`:b.foiEfetivadaEsteMes?'<p class="text-sm text-blue-500 mb-3">✅ Efetivada este mês</p>':""}
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
    `,d.appendChild(_)})}async function bb(){const n=window.FirebaseAuth?.currentUser,e=document.getElementById("app-content");if(e.innerHTML='<h2 class="text-xl font-bold mb-4">Log de Aplicações Automáticas</h2>',!n){e.innerHTML+='<p class="text-gray-500">Usuário não autenticado.</p>';return}const t=new Date,r=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),s=`${r}-${o}`,i=oe(U,"users",n.uid,"logs",s,"itens"),l=await fe(i);if(l.empty){e.innerHTML+='<p class="text-gray-500">Nenhum log encontrado para este mês.</p>';return}const c=document.createElement("div");c.className="space-y-3",l.forEach(d=>{const h=d.data(),g=document.createElement("div");g.className="p-3 rounded-lg shadow bg-white dark:bg-gray-800 flex justify-between items-start",g.innerHTML=`
      <div>
        <p class="font-semibold">${h.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(h.valor).toFixed(2)} • ${h.categoriaId||"Sem categoria"}</p>
        <p class="text-xs text-gray-400">Aplicado em: ${h.createdAt?.seconds?new Date(h.createdAt.seconds*1e3).toLocaleDateString():"-"}</p>
      </div>
    `,c.appendChild(g)}),e.appendChild(c)}async function _b(){const n=document.getElementById("app-content"),e=window.appState?.currentBudget,t=window.appState?.currentUser,r=window.appState?.budgets||[],o=r.find(c=>c.id===e?.id);let s=[];o?.usuariosPermitidos&&o.usuariosPermitidos.length>0&&(s=await Promise.all(o.usuariosPermitidos.map(async c=>{try{const d=await window.getUserInfo(c);return{uid:c,email:d.email||"Email não disponível",role:"Usuário Compartilhado"}}catch(d){return console.error("Erro ao buscar informações do usuário:",c,d),{uid:c,email:"Usuário não encontrado",role:"Usuário Compartilhado"}}})));let i=[];if(window.loadBudgetInvitations)try{console.log("🔍 SettingsPage: Carregando convites pendentes..."),i=await window.loadBudgetInvitations(),console.log("📊 SettingsPage: Convites carregados:",i.length)}catch(c){console.error("❌ SettingsPage: Erro ao carregar convites pendentes:",c)}else console.log("❌ SettingsPage: Função loadBudgetInvitations não encontrada");n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">⚙️ Configurações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.showExportOptions && window.showExportOptions()" class="btn-secondary">
            <span class="icon-standard">📤</span>
            <span class="hidden sm:inline">Exportar</span>
          </button>
          <button id="theme-toggle-btn" class="btn-secondary">
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
          ${r.length>0?r.map(c=>{const d=c.userId===t?.uid,h=c.usuariosPermitidos&&c.usuariosPermitidos.length>0,g=c.id===e?.id;return`
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 ${g?"ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20":""}">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <div class="font-medium text-gray-800 dark:text-white">${c.nome||"Orçamento sem nome"}</div>
                    ${g?'<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Atual</span>':""}
                    ${d?'<span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Dono</span>':""}
                    ${!d&&h?'<span class="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">Compartilhado</span>':""}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${h?`${d?"Compartilhado com":"Compartilhado por"} ${c.usuariosPermitidos.length} usuário(s)`:"Orçamento pessoal"}
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500 mt-1 break-all">ID: ${c.id}</div>
                </div>
                <div class="flex items-center gap-2">
                  ${g?"":`
                    <button onclick="switchToBudget('${c.id}')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                      Entrar
                    </button>
                  `}
                  ${!d&&h?`
                    <button onclick="confirmLeaveBudget('${c.id}', '${c.nome||"Orçamento"}')" 
                            class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
                      🚪 Sair
                    </button>
                  `:""}
                  ${d?`
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
          ${i.length>0?i.map(c=>`
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
  `,window.confirmLogout=()=>{if(confirm("Tem certeza que deseja sair da conta?"))try{typeof window.stopAllListeners=="function"&&window.stopAllListeners(),window.appState&&(window.appState.currentUser=null,window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[]),window.FirebaseAuth.signOut().then(()=>{console.log("✅ Logout realizado com sucesso"),window.toggleLoginPage&&window.toggleLoginPage(!0),setTimeout(()=>{window.location.hash=""},100),console.log("✅ Redirecionado para página de login")}).catch(c=>{console.error("❌ Erro ao fazer logout:",c),window.Snackbar?window.Snackbar({message:"Erro ao fazer logout. Tente novamente.",type:"error"}):alert("Erro ao fazer logout. Tente novamente.")})}catch(c){console.error("❌ Erro ao preparar logout:",c),window.Snackbar?window.Snackbar({message:"Erro ao preparar logout. Tente novamente.",type:"error"}):alert("Erro ao preparar logout. Tente novamente.")}},window.copyBudgetId=c=>{navigator.clipboard.writeText(c).then(()=>{window.Snackbar?window.Snackbar({message:"ID do orçamento copiado para a área de transferência!",type:"success"}):alert("ID do orçamento copiado para a área de transferência!")}).catch(d=>{console.error("Erro ao copiar ID:",d);const h=document.createElement("textarea");h.value=c,document.body.appendChild(h),h.select(),document.execCommand("copy"),document.body.removeChild(h),window.Snackbar?window.Snackbar({message:"ID do orçamento copiado para a área de transferência!",type:"success"}):alert("ID do orçamento copiado para a área de transferência!")})},window.switchToBudget=async c=>{try{const d=r.find(v=>v.id===c);if(!d){window.Snackbar?window.Snackbar({message:"Orçamento não encontrado.",type:"error"}):alert("Orçamento não encontrado.");return}const h=window.appState?.currentUser;if(!h){window.Snackbar?window.Snackbar({message:"Você precisa estar logado para trocar de orçamento.",type:"error"}):alert("Você precisa estar logado para trocar de orçamento.");return}const g=d.userId===h.uid,m=d.usuariosPermitidos&&d.usuariosPermitidos.includes(h.uid);if(console.log("🔍 Debug switchToBudget:",{budgetId:c,budgetName:d.nome,currentUserUid:h.uid,budgetUserId:d.userId,isOwner:g,usuariosPermitidos:d.usuariosPermitidos,hasSharedAccess:m}),!g&&!m){window.Snackbar?window.Snackbar({message:"Você não tem acesso a este orçamento.",type:"error"}):alert("Você não tem acesso a este orçamento.");return}window.setCurrentBudget?(await window.setCurrentBudget(d),window.Snackbar?window.Snackbar({message:`Orçamento "${d.nome}" selecionado com sucesso!`,type:"success"}):alert(`Orçamento "${d.nome}" selecionado com sucesso!`),setTimeout(async()=>{console.log("🔄 Navegando para dashboard após troca de orçamento..."),window.router&&window.router("/dashboard"),window.refreshCurrentView&&window.refreshCurrentView(),window.SwipeNavigation&&window.SwipeNavigation.updateCurrentTabIndex&&window.SwipeNavigation.updateCurrentTabIndex("/dashboard"),console.log("✅ Navegação para dashboard concluída!")},1500)):window.Snackbar?window.Snackbar({message:"Erro ao trocar de orçamento.",type:"error"}):alert("Erro ao trocar de orçamento.")}catch(d){console.error("Erro ao trocar de orçamento:",d),window.Snackbar?window.Snackbar({message:"Erro ao trocar de orçamento.",type:"error"}):alert("Erro ao trocar de orçamento.")}},setTimeout(()=>{typeof window.updateInstallButton=="function"&&window.updateInstallButton()},100),setTimeout(()=>{typeof window.setupNotifications=="function"&&window.setupNotifications()},200);const l=document.createElement("div");l.innerHTML=`
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
  `,n.appendChild(l),window.setThemeColor=function(c,d=!0){localStorage.setItem("themeColor",c),document.documentElement.setAttribute("data-theme-color",c);const h=document.documentElement,g={blue:{primary:"#3B82F6",secondary:"#1E40AF",accent:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",accent:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",accent:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",accent:"#FEF3C7"}};g[c]&&(h.style.setProperty("--primary-color",g[c].primary),h.style.setProperty("--secondary-color",g[c].secondary),h.style.setProperty("--accent-color",g[c].accent)),d&&window.Snackbar&&window.Snackbar({message:`Tema ${c} aplicado com sucesso!`,type:"success"})},window.loadUserSettings=function(){if(window.loadUserSettings.isLoading)return;window.loadUserSettings.isLoading=!0;const c={alertThreshold:localStorage.getItem("alertThreshold")||"70",themeColor:localStorage.getItem("themeColor")||"blue",dashboardWidgets:JSON.parse(localStorage.getItem("dashboardWidgets")||'{"summary": true, "chart": true, "progress": true, "tips": false}'),smartNotifications:JSON.parse(localStorage.getItem("smartNotifications")||'{"limitAlerts": true, "recurringReminders": false, "weeklySummary": false, "financialTips": false}')},d=document.querySelector(`input[name="alerta-limite"][value="${c.alertThreshold}"]`);return d&&(d.checked=!0),window.setThemeColor(c.themeColor,!1),Object.keys(c.dashboardWidgets).forEach(h=>{const g=document.querySelector(`input[data-widget="${h}"]`);g&&(g.checked=c.dashboardWidgets[h])}),Object.keys(c.smartNotifications).forEach(h=>{const g=document.querySelector(`input[data-notification="${h}"]`);g&&(g.checked=c.smartNotifications[h])}),setTimeout(()=>{window.loadUserSettings.isLoading=!1},100),c},window.saveUserSettings=function(){const c=document.querySelector('input[name="alerta-limite"]:checked'),d=c?c.value:"70",h=localStorage.getItem("themeColor")||"blue",g=document.querySelector('input[data-widget="summary"]'),m=document.querySelector('input[data-widget="chart"]'),v=document.querySelector('input[data-widget="progress"]'),b=document.querySelector('input[data-widget="tips"]'),_={summary:g?g.checked:!1,chart:m?m.checked:!1,progress:v?v.checked:!1,tips:b?b.checked:!1},S=document.querySelector('input[data-notification="limitAlerts"]'),N=document.querySelector('input[data-notification="recurringReminders"]'),M=document.querySelector('input[data-notification="weeklySummary"]'),F=document.querySelector('input[data-notification="financialTips"]'),Z={limitAlerts:S?S.checked:!1,recurringReminders:N?N.checked:!1,weeklySummary:M?M.checked:!1,financialTips:F?F.checked:!1};if(localStorage.setItem("alertThreshold",d),localStorage.setItem("themeColor",h),localStorage.setItem("dashboardWidgets",JSON.stringify(_)),localStorage.setItem("smartNotifications",JSON.stringify(Z)),window.appState?.currentUser){const K={userId:window.appState.currentUser.uid,alertThreshold:parseInt(d),themeColor:h,dashboardWidgets:_,smartNotifications:Z,updatedAt:new Date},ne=Ve(U,"userSettings",window.appState.currentUser.uid);Rh(ne,K,{merge:!0}).then(()=>{console.log("✅ Configurações salvas no Firestore"),window.Snackbar&&window.Snackbar({message:"Configurações salvas com sucesso!",type:"success"})}).catch(x=>{console.error("❌ Erro ao salvar configurações:",x)})}},window.setupNotificationButton=function(){const c=document.getElementById("notification-toggle-btn"),d=document.getElementById("notification-icon"),h=document.getElementById("notification-status");if(!c||!d||!h)return;const g=()=>{const m=Notification.permission,v=localStorage.getItem("notifications-enabled")==="true";m==="granted"&&v?(d.textContent="🔔",h.classList.remove("hidden")):(d.textContent="🔕",h.classList.add("hidden"))};c.onclick=async()=>{try{const m=Notification.permission;if(m==="denied"){window.Snackbar&&window.Snackbar({message:"Notificações foram negadas. Vá em Configurações do navegador para permitir.",type:"warning"});return}m==="default"?await Notification.requestPermission()==="granted"?(localStorage.setItem("notifications-enabled","true"),g(),window.Snackbar&&window.Snackbar({message:"✅ Notificações ativadas com sucesso!",type:"success"})):window.Snackbar&&window.Snackbar({message:"Permissão de notificação negada.",type:"error"}):m==="granted"&&(localStorage.getItem("notifications-enabled")==="true"?(localStorage.setItem("notifications-enabled","false"),window.Snackbar&&window.Snackbar({message:"Notificações desativadas",type:"info"})):(localStorage.setItem("notifications-enabled","true"),window.Snackbar&&window.Snackbar({message:"✅ Notificações ativadas!",type:"success"})),g())}catch(m){console.error("Erro ao configurar notificações:",m),window.Snackbar&&window.Snackbar({message:"Erro ao configurar notificações",type:"error"})}},g()},setTimeout(()=>{document.querySelectorAll('input[name="alerta-limite"]').forEach(c=>{c.addEventListener("change",window.saveUserSettings)}),document.querySelectorAll("input[data-widget]").forEach(c=>{c.addEventListener("change",window.saveUserSettings)}),document.querySelectorAll("input[data-notification]").forEach(c=>{c.addEventListener("change",window.saveUserSettings)}),window.setupNotificationButton(),window.loadUserSettings()},500),window.confirmLeaveBudget=function(c,d){confirm(`Tem certeza que deseja sair do orçamento "${d}"?

⚠️ Esta ação não pode ser desfeita e você perderá acesso a todos os dados deste orçamento.`)&&window.leaveSharedBudget(c).then(async()=>{await window.renderSettings()}).catch(h=>{console.error("Erro ao sair do orçamento:",h)})},window.confirmRemoveUser=function(c,d,h){confirm(`Tem certeza que deseja remover o usuário "${h}" do orçamento?

⚠️ Esta ação não pode ser desfeita e o usuário perderá acesso a todos os dados deste orçamento.`)&&window.removeUserFromBudget(c,d).then(async()=>{await window.renderSettings()}).catch(g=>{console.error("Erro ao remover usuário:",g)})},window.confirmDeleteBudget=function(c,d){confirm(`Tem certeza que deseja excluir o orçamento "${d}"?

⚠️ Esta ação não pode ser desfeita e você perderá todos os dados deste orçamento.`)&&window.deleteBudget(c).then(async()=>{await window.renderSettings()}).catch(h=>{console.error("Erro ao excluir orçamento:",h)})},setTimeout(()=>{console.log("SettingsPage: Configurando botão de tema..."),window.setupThemeToggle&&window.setupThemeToggle()},100)}class Ji{constructor(){this.isListening=!1,this.isStarting=!1,this.hasError=!1,this.isProcessingCommand=!1,this.recognition=null,this.currentType=null,this.isModalOpen=!1,this.retryCount=0,this.maxRetries=3,this.microphonePermissionChecked=!1,this.hasReceivedSpeech=!1,console.log("🎤 VoiceSystem inicializado")}init(){if(console.log("🎤 Inicializando VoiceSystem..."),!this.checkBrowserSupport())return console.error("❌ Navegador não suporta reconhecimento de voz"),this.showError("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge."),!1;if(!this.checkHTTPS())return console.error("❌ HTTPS necessário para reconhecimento de voz"),this.showError("O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS."),!1;try{this.setupRecognition(),console.log("✅ Reconhecimento configurado")}catch(e){return console.error("❌ Erro ao configurar reconhecimento:",e),!1}try{this.setupGlobalEvents(),console.log("✅ Eventos globais configurados")}catch(e){console.error("❌ Erro ao configurar eventos:",e)}return console.log("✅ VoiceSystem inicializado com sucesso"),!0}checkBrowserSupport(){const e="webkitSpeechRecognition"in window||"SpeechRecognition"in window;return console.log("🔍 Suporte ao reconhecimento de voz:",e),e}checkHTTPS(){const e=location.protocol==="https:"||location.hostname==="localhost";return console.log("🔍 Protocolo seguro:",e),e}setupRecognition(){try{const e=window.SpeechRecognition||window.webkitSpeechRecognition;this.recognition=new e,this.recognition.lang="pt-BR",this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.maxAlternatives=1,this.recognition.serviceURI!==void 0&&(this.recognition.serviceURI="wss://www.google.com/speech-api/v2/recognize"),this.recognition.onstart=()=>this.handleRecognitionStart(),this.recognition.onresult=t=>this.handleRecognitionResult(t),this.recognition.onerror=t=>this.handleRecognitionError(t),this.recognition.onend=()=>this.handleRecognitionEnd(),this.recognition.onspeechstart=()=>this.handleSpeechStart(),this.recognition.onspeechend=()=>this.handleSpeechEnd(),this.recognition.onsoundstart=()=>this.handleSoundStart(),this.recognition.onsoundend=()=>this.handleSoundEnd(),console.log("✅ Reconhecimento configurado com eventos adicionais")}catch(e){console.error("❌ Erro ao configurar reconhecimento:",e),this.showError("Erro ao configurar reconhecimento de voz")}}handleRecognitionStart(){console.log("🎤 Reconhecimento iniciado"),this.isListening=!0,this.hasReceivedSpeech=!1,this.updateModalStatus("","Aguardando sua voz...","listening")}handleSpeechStart(){console.log("🗣️ Fala detectada - início"),this.hasReceivedSpeech=!0,this.updateModalStatus("","Ouvindo...","listening")}handleSpeechEnd(){console.log("🗣️ Fala detectada - fim")}handleSoundStart(){console.log("🔊 Som detectado - início")}handleSoundEnd(){console.log("🔊 Som detectado - fim")}handleRecognitionResult(e){console.log("🎤 Resultado recebido:",e);const t=e.results[e.results.length-1],r=t[0].transcript,o=t[0].confidence,s=t.isFinal;console.log("🎤 Transcrição:",r),console.log("🎤 Confiança:",o),console.log("🎤 Final:",s),s?(console.log("✅ Resultado final recebido, aguardando antes de processar..."),this.updateModalStatus("",`Você disse: "${r}"`,"processing"),setTimeout(()=>{this.isProcessingCommand||this.processCommand(r,o)},200)):this.updateModalStatus("",`Ouvindo: "${r}..."`,"listening")}handleRecognitionError(e){console.error("🎤 Erro no reconhecimento:",e),this.isListening=!1,this.isStarting=!1;const t=this.getErrorMessage(e.error);if(this.hasError=!0,setTimeout(()=>{this.hasError=!1},5e3),e.error==="no-speech"){console.log("⚠️ Nenhuma fala detectada"),this.hasReceivedSpeech?(console.log("ℹ️ Já havia recebido fala, aguardando mais tempo..."),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand&&(this.hasError=!1,this.startListening(this.currentType))},2e3)):(console.log("ℹ️ Nenhuma fala detectada ainda, reiniciando rapidamente..."),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand&&(this.hasError=!1,this.startListening(this.currentType))},500));return}this.updateModalStatus("",t,"error"),this.shouldRetry(e.error)&&this.retryCount<this.maxRetries?(this.retryCount++,console.log(`🔄 Tentativa ${this.retryCount} de ${this.maxRetries}`),setTimeout(()=>{this.isModalOpen&&(this.hasError=!1,this.startListening(this.currentType))},2e3)):setTimeout(()=>{this.closeModal()},3e3)}handleRecognitionEnd(){console.log("🎤 Reconhecimento finalizado"),this.isListening=!1,this.isStarting=!1;const e=this.hasReceivedSpeech&&!this.isProcessingCommand?1e3:500;this.isModalOpen&&!this.isListening&&!this.hasError&&!this.isProcessingCommand?(console.log(`🔄 Reiniciando reconhecimento em ${e}ms...`),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand?(console.log("🔄 Executando reinicialização..."),this.startListening(this.currentType)):console.log("🚫 Cancelando reinicialização - condições não atendidas")},e)):console.log("🚫 Não reiniciando - condições não atendidas:",{isModalOpen:this.isModalOpen,isListening:this.isListening,hasError:this.hasError,isProcessingCommand:this.isProcessingCommand})}async processCommand(e,t){try{this.isProcessingCommand=!0,console.log("🎤 Processando comando:",e);const r=this.normalizeText(e);console.log("🎤 Texto normalizado:",r);const o=this.determineCommandType(r);console.log("🎤 Tipo de comando:",o),this.recognition&&this.isListening&&setTimeout(()=>{this.recognition&&this.isListening&&this.recognition.stop()},100);const s=await this.executeCommand(r,o);this.showSuccess(s),setTimeout(()=>{this.closeModal()},2e3)}catch(r){console.error("❌ Erro ao processar comando:",r),this.showError(`Erro ao processar comando: ${r.message}`),setTimeout(()=>{this.closeModal()},3e3)}finally{this.isProcessingCommand=!1}}normalizeText(e){return e.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").trim()}determineCommandType(e){if(console.log("🔍 Determinando tipo de comando para:",e),/\b(saldo|qual.*saldo|saldo atual|quanto.*tenho|meu saldo)\b/.test(e))return console.log("✅ Comando de consulta detectado"),"query";if(/\b(ir para|va para|mostrar|abrir|navegar).*(dashboard|transacoes|categorias|recorrentes)\b/.test(e))return console.log("✅ Comando de navegação detectado"),"navigation";if(/\b(adicionar|nova|criar|inserir).*(categoria)\b/.test(e)||/\b(categoria).*(nova|adicionar|criar)\b/.test(e))return console.log("✅ Comando de categoria detectado (explícito)"),"category";const t=this.extractCommandItems(e);return console.log("🔍 Itens extraídos do comando:",t),t.length===3?(console.log("✅ 3 itens detectados → Comando de CATEGORIA"),"category"):t.length===4?(console.log("✅ 4 itens detectados → Comando de TRANSAÇÃO"),"transaction"):/\b(adicionar|nova|criar|inserir|registrar|lancamento|lancar).*(despesa|receita|transacao|gasto|entrada|compra|pagamento)\b/.test(e)||/\b(despesa|receita|gasto|entrada|compra|pagamento).*(de|por|valor|no valor)\b/.test(e)||/\b(gastei|paguei|comprei|recebi|ganhei)\b/.test(e)||/\b(pagar|gastar|comprar|receber|ganhar)\b/.test(e)||/\b\d+.*(?:reais?|real|r\$)\b/.test(e)||/\b(?:cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos).*(?:reais?|real|r\$)?\b/.test(e)?(console.log("✅ Comando de transação detectado (padrão tradicional)"),"transaction"):/\b\d+\b/.test(e)&&/\b(reais?|real|r\$|dinheiro|valor)\b/.test(e)?(console.log("✅ Comando de transação detectado (padrão numérico)"),"transaction"):/\b(cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\b/.test(e)?(console.log("✅ Comando de transação detectado (número por extenso)"),"transaction"):(console.log("⚠️ Usando tipo padrão:",this.currentType||"transaction"),this.currentType||"transaction")}extractCommandItems(e){console.log("🔍 Extraindo itens do comando:",e);const t=e.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").trim(),r=["adicionar","nova","novo","criar","inserir","registrar","lancamento","lancar","de","da","do","na","no","em","para","por","com","valor","reais","real","r$","dinheiro","categoria","transacao","e","a","o","as","os"],o=t.split(/\s+/).filter(i=>i.length>1).filter(i=>!r.includes(i));console.log("🔍 Palavras filtradas:",o);const s=[];for(const i of o){if(/^\d+([.,]\d+)?$/.test(i)){s.push({type:"valor",value:i});continue}if(/^(despesa|receita|gasto|entrada)s?$/.test(i)){s.push({type:"tipo",value:i});continue}let l=!1;if(window.appState?.categories){for(const c of window.appState.categories)if(c.nome.toLowerCase().includes(i)||i.includes(c.nome.toLowerCase())){s.push({type:"categoria",value:i}),l=!0;break}}!l&&i.length>2&&s.push({type:"descricao",value:i})}return console.log("🔍 Itens identificados:",s),s}async executeCommand(e,t){switch(console.log("🎤 Executando comando:",t,e),t){case"query":return await this.handleQueryCommand(e);case"transaction":return await this.handleTransactionCommand(e);case"category":return await this.handleCategoryCommand(e);case"navigation":return await this.handleNavigationCommand(e);default:throw new Error("Tipo de comando não reconhecido")}}async handleQueryCommand(e){return console.log("🔍 Processando comando de consulta:",e),/\b(saldo|qual.*saldo|saldo atual)\b/.test(e)?`Saldo atual: R$ ${this.calculateBalance().toFixed(2)}`:/\b(despesas|gastos)\b/.test(e)?`Total de despesas: R$ ${this.calculateExpenses().toFixed(2)}`:/\b(receitas|entradas)\b/.test(e)?`Total de receitas: R$ ${this.calculateIncome().toFixed(2)}`:"Comando de consulta não reconhecido"}async handleTransactionCommand(e){console.log("💰 Processando comando de transação:",e);const t=this.parseTransactionCommand(e);if(!t)throw new Error("Não foi possível entender os dados da transação");const r=t.categoriaExistente?`categoria existente "${t.categoria}"`:`nova categoria "${t.categoria}"`;if(window.showAddTransactionModal){const o={descricao:t.descricao,valor:t.valor,tipo:t.tipo,categoriaId:t.categoriaId,data:new Date().toISOString().split("T")[0]};console.log("🎤 Abrindo modal de transação com dados:",o),window.showAddTransactionModal(o);const s=t.valor!==null?`de R$ ${t.valor.toFixed(2)}`:"(valor a definir)";return`✅ Modal aberto com: ${t.tipo} ${s} na ${r}. Você pode editar e salvar.`}else{if(window.addTransactionWithConfirmation)return await window.addTransactionWithConfirmation(t),`✅ Transação confirmada: ${t.tipo} de R$ ${t.valor.toFixed(2)} na ${r}`;if(window.addTransaction)return await window.addTransaction(t),`✅ Transação adicionada: ${t.tipo} de R$ ${t.valor.toFixed(2)} na ${r}`;throw new Error("Função de adicionar transação não disponível")}}async handleCategoryCommand(e){console.log("📂 Processando comando de categoria:",e);const t=this.parseCategoryCommand(e);if(!t||!t.nome)throw new Error("Nome da categoria não foi entendido");if(window.showAddCategoryModal){const r={nome:t.nome,tipo:t.tipo,limite:t.limite||0};console.log("🎤 Abrindo modal de categoria com dados:",r),window.showAddCategoryModal(r);const o=t.limite>0?` com limite de R$ ${t.limite.toFixed(2)}`:"";return`✅ Modal aberto com: categoria "${t.nome}" (${t.tipo})${o}. Você pode editar e salvar.`}else if(window.addCategory){await window.addCategory(t);const r=t.limite>0?` com limite de R$ ${t.limite.toFixed(2)}`:"";return`✅ Categoria "${t.nome}" (${t.tipo})${r} adicionada com sucesso`}else throw new Error("Função de adicionar categoria não disponível")}async handleNavigationCommand(e){return console.log("🧭 Processando comando de navegação:",e),/\b(dashboard|início|principal)\b/.test(e)?(window.location.hash="#/dashboard","Navegando para o Dashboard"):/\b(transações|transação)\b/.test(e)?(window.location.hash="#/transactions","Navegando para Transações"):/\b(categorias|categoria)\b/.test(e)?(window.location.hash="#/categories","Navegando para Categorias"):/\b(recorrentes|recorrente)\b/.test(e)?(window.location.hash="#/recorrentes","Navegando para Recorrentes"):"Comando de navegação não reconhecido"}parseTransactionCommand(e){console.log("🔍 Analisando comando de transação:",e);const t={tipo:{receita:/\b(receita|receitas|entrada|entradas|ganhei|recebi|salario|ganhar|receber|renda|rendas|ganho|ganhos)\b/i},valor:[/(?:de|por|valor|custou|custa|custando|no valor de|foi de)\s*(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)?/i,/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,/\b(zero|uma?|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\s*(?:reais?|r\$|real|dinheiro)?\b/i,/\b(\d+(?:[.,]\d{1,2})?)\b/],categoria:[/\b(?:categoria|para|em|de|na categoria|tipo)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa)\s*\d)/i,/\b(?:com|para|em|de)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa))/i,/([a-záàâãéèêíìîóòôõúùûç]+)\s*$/]};let r="despesa";t.tipo.receita.test(e)&&(r="receita");let o=null,s=null;console.log("🔍 Tentando extrair valor do texto:",e);const i={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3};for(let b=0;b<t.valor.length;b++){const _=t.valor[b];if(console.log(`🔍 Testando padrão ${b+1}:`,_),s=e.match(_),s){console.log("✅ Match encontrado:",s);const S=s[1];if(console.log("📝 Valor capturado:",S),i[S.toLowerCase()]?(o=i[S.toLowerCase()],console.log("🔢 Número por extenso convertido:",o)):(o=parseFloat(S.replace(",",".")),console.log("🔢 Número convertido:",o)),o&&o>0){console.log("✅ Valor válido encontrado:",o);break}else console.log("❌ Valor inválido, continuando busca..."),o=null,s=null}else console.log("❌ Nenhum match para este padrão")}if(!o){const b={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3},_=/\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i,S=e.match(_);if(S){const N=S[1].toLowerCase();b[N]&&(o=b[N])}if(!o){const N=e.split(" ");for(const M of N)if(b[M.toLowerCase()]){o=b[M.toLowerCase()];break}}}o||(console.log("⚠️ Valor não encontrado, será preenchido manualmente no modal"),o=null);let l="Outros",c=null,d=null;if(window.appState?.categories){console.log("🔍 Procurando categorias existentes no texto:",e);for(const b of window.appState.categories){const _=b.nome.toLowerCase(),S=e.toLowerCase();if(S.includes(_)){d=b,l=b.nome,console.log("✅ Categoria encontrada (exata):",l);break}const N=_.split(" "),M=S.split(" ");let F=0;for(const Z of N)Z.length>2&&M.some(K=>K.includes(Z)||Z.includes(K))&&F++;if(F>0&&F>=N.length*.5){d=b,l=b.nome,console.log("✅ Categoria encontrada (parcial):",l,`(${F}/${N.length} palavras)`);break}}}if(!d){for(const b of t.categoria)if(c=e.match(b),c&&c[1]){let _=c[1].trim();if(_=_.replace(/\b(de|por|valor|reais?|r\$|real|dinheiro|custou|custa)\b/gi,"").trim(),_.length>2){l=_,console.log("📝 Categoria extraída do texto:",l);break}}}console.log("🔍 Texto original para descrição:",e);const h=e.toLowerCase().split(" "),g=["adicionar","nova","criar","inserir","despesa","receita","transação","gasto","entrada","gastei","comprei","paguei","com","para","em","de","categoria","na","da","tipo","reais","real","dinheiro","valor","custou","custa","custando"];let m=null;for(const b of h)if(!/^\d+([.,]\d+)?$/.test(b)&&!g.includes(b)&&!(d&&b===d.nome.toLowerCase())&&b.length>=2){m=b;break}console.log("🔍 Primeira palavra significativa encontrada:",m);let v;if(m)v=m.charAt(0).toUpperCase()+m.slice(1),console.log("🔍 Descrição definida como primeira palavra significativa:",v);else{if(v=e,s&&(console.log("🔍 Removendo valor encontrado:",s[0]),v=v.replace(s[0],"")),c&&(console.log("🔍 Removendo categoria extraída:",c[0]),v=v.replace(c[0],"")),d){const b=d.nome.toLowerCase(),_=new RegExp(`\\b${b.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"gi");console.log("🔍 Removendo categoria do sistema:",b),v=v.replace(_,"")}v=v.replace(/\b(adicionar|nova?|criar|inserir|transação|gasto|entrada|gastei|comprei|paguei)\b/gi,"").replace(/\b(com|para|em|de|categoria|na categoria|da categoria|tipo)\b/gi,"").replace(/\b(reais?|r\$|real|dinheiro|valor|custou|custa|custando)\b/gi,"").replace(/\b(despesa|receita)\b(?=.*\w)/gi,"").replace(/\s+/g," ").trim(),console.log("🔍 Descrição após limpeza (fallback):",v),(!v||v.length<3)&&(o!==null?v=`${r.charAt(0).toUpperCase()+r.slice(1)} de R$ ${o.toFixed(2)}`:v=`${r.charAt(0).toUpperCase()+r.slice(1)}`,console.log("🔍 Usando descrição padrão (fallback final):",v))}return{tipo:r,valor:o,categoria:l,categoriaId:d?.id||null,categoriaExistente:!!d,descricao:v,data:new Date().toISOString()}}parseCategoryCommand(e){console.log("🔍 Analisando comando de categoria:",e);const t=this.extractCommandItems(e);return t.length===3?(console.log("🔍 Processando comando de categoria com 3 itens"),this.parseCategoryCommandFromItems(t,e)):this.parseCategoryCommandTraditional(e)}parseCategoryCommandFromItems(e,t){console.log("🔍 Analisando comando de categoria com 3 itens:",e);let r=null,o="despesa",s=0;for(const i of e)switch(i.type){case"valor":s=parseFloat(i.value.replace(",",".")),console.log("💰 Limite extraído:",s);break;case"tipo":/^(receita|entrada)s?$/.test(i.value)?o="receita":o="despesa",console.log("📊 Tipo extraído:",o);break;case"descricao":r||(r=i.value.charAt(0).toUpperCase()+i.value.slice(1),console.log("📝 Nome da categoria extraído:",r));break}if(!r){const i=t.toLowerCase().split(" "),l=["adicionar","nova","novo","criar","inserir","categoria","despesa","receita","de","da","do","na","no","em","para","por","com","valor","reais","real","r$","dinheiro"];for(const c of i)if(c.length>2&&!l.includes(c)&&!/^\d+([.,]\d+)?$/.test(c)){r=c.charAt(0).toUpperCase()+c.slice(1),console.log("📝 Nome da categoria extraído (fallback):",r);break}}if(!r)throw new Error("Nome da categoria não foi entendido no comando de 3 itens");return console.log("✅ Categoria processada:",{nome:r,tipo:o,limite:s}),{nome:r,tipo:o,limite:s||0,cor:this.getRandomColor()}}parseCategoryCommandTraditional(e){console.log("🔍 Analisando comando de categoria (método tradicional):",e);const t={nome:[/\b(?:categoria|categoria)\s+(?:chamada|de|para|com nome)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+(?:chamada|de|para|com nome)?\s*([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b([a-záàâãéèêíìîóòôõúùûç\s]+?)\s+(?:categoria|despesa|receita)\b/i],tipo:{receita:/\b(receita|receitas|entrada|entradas|renda|rendas)\b/i},limite:[/\blimite\s+(?:de\s+)?(\d+(?:[.,]\d{1,2})?)/i,/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,/(\d+(?:[.,]\d{1,2})?)/]};let r=null;for(const i of t.nome){const l=e.match(i);if(l&&l[1]&&(r=l[1].trim(),r=r.replace(/\b(nova?|criar|adicionar|categoria|tipo|despesa|receita|limite|de|por|valor|reais?|r\$|real|dinheiro)\b/gi,"").trim(),r.length>2))break}if(!r)throw new Error('Nome da categoria não foi entendido. Diga algo como "nova categoria chamada transporte"');let o="despesa";t.tipo.receita.test(e)&&(o="receita");let s=0;for(const i of t.limite){const l=e.match(i);if(l){s=parseFloat(l[1].replace(",","."));break}}if(!s){const i={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3},l=/\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i,c=e.match(l);if(c){const d=c[1].toLowerCase();i[d]&&(s=i[d])}if(!s){const d=e.split(" ");for(const h of d)if(i[h.toLowerCase()]){s=i[h.toLowerCase()];break}}}return{nome:r,tipo:o,limite:s||0,cor:this.getRandomColor()}}getRandomColor(){const e=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8","#F7DC6F","#BB8FCE","#85C1E9","#F8C471","#82E0AA","#F1948A","#85C1E9","#D7BDE2"];return e[Math.floor(Math.random()*e.length)]}calculateBalance(){if(!window.appState?.transactions)return 0;const e=window.appState.transactions.filter(r=>r.tipo==="receita").reduce((r,o)=>r+parseFloat(o.valor),0),t=window.appState.transactions.filter(r=>r.tipo==="despesa").reduce((r,o)=>r+parseFloat(o.valor),0);return e-t}calculateExpenses(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="despesa").reduce((e,t)=>e+parseFloat(t.valor),0):0}calculateIncome(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="receita").reduce((e,t)=>e+parseFloat(t.valor),0):0}getErrorMessage(e){return{"not-allowed":"Permissão do microfone negada. Clique no ícone do microfone na barra de endereços e permita o acesso.","no-speech":"Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.","audio-capture":"Erro ao capturar áudio. Verifique se o microfone está funcionando.",network:"Erro de rede. Verifique sua conexão com a internet.","service-not-allowed":"Serviço de reconhecimento de voz não permitido.","not-supported":"Reconhecimento de voz não suportado neste navegador.",aborted:"Reconhecimento de voz interrompido.","audio-capture-device-not-found":"Microfone não encontrado.","audio-capture-device-in-use":"Microfone em uso por outro aplicativo."}[e]||`Erro desconhecido: ${e}`}shouldRetry(e){return["network","service-not-allowed","audio-capture-device-in-use"].includes(e)}getRandomColor(){const e=["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#06B6D4"];return e[Math.floor(Math.random()*e.length)]}openModal(e="transaction"){console.log("🎤 Abrindo modal de voz:",e),this.currentType=e,this.isModalOpen=!0,this.retryCount=0;const t=document.getElementById("voice-modal"),r=t?.querySelector(".voice-content");t&&r?(t.style.display="flex",t.style.pointerEvents="auto",t.style.background="rgba(0, 0, 0, 0.95)",t.style.backdropFilter="blur(30px)",r.style.transform="scale(1)",r.style.opacity="1",document.body.classList.add("voice-modal-open"),setTimeout(()=>{this.startListening(e)},500),console.log("✅ Modal de voz aberto")):console.error("❌ Modal de voz não encontrado")}closeModal(){if(!this.isModalOpen)return;console.log("🎤 Fechando modal de voz"),this.isModalOpen=!1,this.isListening=!1,this.isStarting=!1,this.hasError=!1,this.isProcessingCommand=!1,this.retryCount=0;const e=document.getElementById("voice-modal"),t=e?.querySelector(".voice-content");if(e&&t){if(this.recognition)try{this.recognition.stop(),console.log("🛑 Reconhecimento parado")}catch{console.log("ℹ️ Reconhecimento já estava parado")}t.style.transform="scale(0.95)",t.style.opacity="0",e.style.background="rgba(0, 0, 0, 0)",e.style.backdropFilter="blur(0px)",document.body.classList.remove("voice-modal-open"),setTimeout(()=>{e.style.pointerEvents="none",e.style.display="none",console.log("✅ Modal de voz fechado")},300)}}updateModalStatus(e,t,r){const o=document.getElementById("voice-modal");if(!o)return;const s=o.querySelector("h3"),i=o.querySelector("p"),l=o.querySelector(".voice-icon div"),c=o.querySelector(".voice-status"),d=c?.querySelector("p");if(s)switch(r){case"listening":s.textContent="🎤 Estou te ouvindo!";break;case"processing":s.textContent="🧠 Processando...";break;case"error":s.textContent="❌ Ops! Algo deu errado";break;case"success":s.textContent="✅ Perfeito!";break;default:s.textContent=e||"🎤 Estou te ouvindo!"}if(i)switch(r){case"listening":i.textContent="Fale naturalmente como você gastou ou recebeu dinheiro";break;case"processing":i.textContent="Entendendo o que você disse...";break;case"error":i.textContent=t||"Tente falar novamente de forma mais clara";break;case"success":i.textContent=t||"Transação adicionada com sucesso!";break;default:i.textContent=t||"Fale naturalmente como você gastou ou recebeu dinheiro"}if(l)switch(l.className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg",r){case"listening":l.classList.add("bg-gradient-to-r","from-green-400","to-blue-500","animate-pulse");break;case"processing":l.classList.add("bg-gradient-to-r","from-yellow-400","to-orange-500","animate-spin");break;case"error":l.classList.add("bg-gradient-to-r","from-red-400","to-pink-500");break;case"success":l.classList.add("bg-gradient-to-r","from-green-400","to-emerald-500");break;default:l.classList.add("bg-gradient-to-r","from-green-400","to-blue-500","animate-pulse")}if(c&&(c.querySelectorAll("div").forEach((g,m)=>{switch(g.classList.remove("animate-bounce","animate-pulse","bg-green-500","bg-blue-500","bg-yellow-500","bg-red-500"),r){case"listening":g.classList.add("animate-bounce","bg-green-500"),g.style.animationDelay=`${m*.1}s`;break;case"processing":g.classList.add("animate-pulse","bg-yellow-500"),g.style.animationDelay=`${m*.2}s`;break;case"error":g.classList.add("bg-red-500"),g.style.animationDelay="";break;case"success":g.classList.add("bg-green-500"),g.style.animationDelay="";break;default:g.classList.add("animate-bounce","bg-green-500"),g.style.animationDelay=`${m*.1}s`}}),d))switch(r){case"listening":d.textContent="Microfone ativo",d.className="text-xs text-green-600 dark:text-green-400 font-medium";break;case"processing":d.textContent="Processando comando...",d.className="text-xs text-yellow-600 dark:text-yellow-400 font-medium";break;case"error":d.textContent="Erro no reconhecimento",d.className="text-xs text-red-600 dark:text-red-400 font-medium";break;case"success":d.textContent="Comando executado!",d.className="text-xs text-green-600 dark:text-green-400 font-medium";break;default:d.textContent="Microfone ativo",d.className="text-xs text-green-600 dark:text-green-400 font-medium"}}async startListening(e="transaction"){console.log("🎤 Iniciando reconhecimento de voz...",{type:e,isListening:this.isListening});try{if(!this.recognition)throw console.error("❌ Reconhecimento não configurado"),new Error("Reconhecimento não configurado");if(this.isListening)return console.log("⚠️ Reconhecimento já está ativo, ignorando nova tentativa"),!0;if(this.currentType=e,console.log("✅ Tipo de comando definido:",this.currentType),this.updateModalStatus("","Iniciando...","processing"),!this.microphonePermissionChecked){if(console.log("🔍 Verificação rápida de permissão..."),!await this.quickPermissionCheck())return console.log("❌ Permissão do microfone negada"),!1;this.microphonePermissionChecked=!0}try{this.recognition.stop(),console.log("🛑 Parando reconhecimento anterior (sem delay)...")}catch{console.log("ℹ️ Nenhum reconhecimento anterior para parar")}return this.isStarting=!0,console.log("🚀 Iniciando reconhecimento IMEDIATAMENTE..."),this.recognition.start(),console.log("✅ Reconhecimento iniciado com sucesso"),setTimeout(()=>{this.isStarting=!1},500),!0}catch(t){console.error("❌ Erro ao iniciar reconhecimento:",t),this.isStarting=!1;let r="Erro ao iniciar reconhecimento de voz";if(t.name==="InvalidStateError"){if(console.log("🔄 Reconhecimento já ativo, aguardando..."),await new Promise(o=>setTimeout(o,1e3)),!this.isListening&&!this.isStarting)return console.log("🔄 Tentando novamente após aguardar..."),this.startListening(e);r="Sistema de voz ocupado. Tente novamente em alguns segundos."}else t.name==="NotSupportedError"?r="Reconhecimento de voz não suportado neste navegador. Use Chrome ou Edge.":t.name==="NetworkError"&&(r="Erro de conexão. Verifique sua internet e tente novamente.");return this.showError(r),!1}}async quickPermissionCheck(){console.log("⚡ Verificação rápida de permissão...");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("⚠️ API getUserMedia não disponível"),this.showError("Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox."),!1;if(navigator.permissions)try{const r=await navigator.permissions.query({name:"microphone"});if(console.log("🔍 Status da permissão:",r.state),r.state==="granted")return console.log("✅ Permissão já concedida"),!0;if(r.state==="denied")return console.log("❌ Permissão negada"),this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1}catch{console.log("ℹ️ API de permissões não disponível, usando método alternativo")}const e=new Promise((r,o)=>setTimeout(()=>o(new Error("Timeout")),1e3)),t=navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});try{return(await Promise.race([t,e])).getTracks().forEach(o=>o.stop()),console.log("✅ Permissão do microfone concedida (verificação rápida)"),!0}catch(r){if(r.message==="Timeout")return console.log("⚠️ Timeout na verificação, assumindo permissão OK"),!0;throw r}}catch(e){return console.warn("⚠️ Erro na verificação rápida:",e.name),e.name==="NotAllowedError"?(this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1):e.name==="NotFoundError"?(this.showError("Nenhum microfone encontrado. Verifique se há um microfone conectado."),!1):(console.log("ℹ️ Assumindo permissão OK para não bloquear o sistema"),!0)}}async requestMicrophonePermission(){console.log("🎤 Solicitando permissão do microfone...");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("⚠️ API getUserMedia não disponível"),!1;try{return(await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}})).getTracks().forEach(t=>t.stop()),console.log("✅ Permissão do microfone concedida"),!0}catch(e){console.warn("⚠️ Erro de permissão:",e.name);try{const t=await navigator.mediaDevices.enumerateDevices(),r=t.filter(o=>o.kind==="audioinput");return console.log("🔍 Dispositivos encontrados:",t.length),console.log("🎤 Dispositivos de áudio:",r.length),r.length===0?(console.warn("⚠️ Nenhum dispositivo de áudio encontrado"),this.showError("Nenhum microfone encontrado. Verifique se há um microfone conectado."),!1):(console.log("✅ Dispositivos de áudio disponíveis:",r.map(o=>o.label||"Microfone")),this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1)}catch(t){return console.error("❌ Erro ao enumerar dispositivos:",t),this.showError("Erro ao verificar dispositivos de áudio. Tente recarregar a página."),!1}}}catch(e){console.error("❌ Erro ao solicitar permissão:",e);let t="Erro ao acessar microfone";return e.name==="NotFoundError"?t="Nenhum microfone encontrado. Verifique se há um microfone conectado.":e.name==="NotAllowedError"?t="Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.":e.name==="NotReadableError"?t="Microfone em uso por outro aplicativo. Feche outros aplicativos que possam estar usando o microfone.":e.name==="OverconstrainedError"?t="Configuração de microfone não suportada. Tente usar outro navegador.":e.name==="TypeError"&&(t="Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox."),this.showError(t),!1}}showSuccess(e){console.log("✅ Sucesso:",e),this.updateModalStatus("",e,"success"),window.Snackbar&&typeof window.Snackbar.success=="function"?window.Snackbar.success(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"success"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"success"}):window.alert&&alert(`✅ ${e}`)}showError(e){console.error("❌ Erro:",e),this.updateModalStatus("",e,"error"),window.Snackbar&&typeof window.Snackbar.error=="function"?window.Snackbar.error(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"error"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"error"}):window.alert?alert(`❌ ${e}`):console.error("Nenhum sistema de notificação disponível")}setupGlobalEvents(){this.removeGlobalEvents(),this.escapeHandler=t=>{t.key==="Escape"&&this.isModalOpen&&this.closeModal()},document.addEventListener("keydown",this.escapeHandler),this.outsideClickHandler=t=>{const r=document.getElementById("voice-modal");t.target===r&&this.isModalOpen&&this.closeModal()},document.addEventListener("click",this.outsideClickHandler);const e=document.getElementById("close-voice-modal");if(e){const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),this.closeBtnHandler=r=>{r.preventDefault(),r.stopPropagation(),console.log("❌ Close voice modal button clicked"),this.closeModal()},t.addEventListener("click",this.closeBtnHandler)}}removeGlobalEvents(){if(this.escapeHandler&&(document.removeEventListener("keydown",this.escapeHandler),this.escapeHandler=null),this.outsideClickHandler&&(document.removeEventListener("click",this.outsideClickHandler),this.outsideClickHandler=null),this.closeBtnHandler){const e=document.getElementById("close-voice-modal");e&&e.removeEventListener("click",this.closeBtnHandler),this.closeBtnHandler=null}}start(e="transaction"){console.log("🎤 VoiceSystem.start chamado:",e);try{return!this.recognition&&(console.log("🔄 Inicializando VoiceSystem..."),!this.init())?(console.error("❌ Falha na inicialização do VoiceSystem"),!1):document.getElementById("voice-modal")?(this.currentType=e,console.log("✅ Tipo de comando definido:",this.currentType),this.openModal(e),!0):(console.error("❌ Modal de voz não encontrado no DOM"),this.showError("Interface de voz não disponível"),!1)}catch(t){return console.error("❌ Erro ao iniciar VoiceSystem:",t),this.showError(`Erro ao iniciar reconhecimento de voz: ${t.message}`),!1}}stop(){console.log("🎤 VoiceSystem.stop chamado"),this.closeModal()}destroy(){console.log("🎤 Destruindo VoiceSystem..."),this.recognition&&(this.recognition.stop(),this.recognition=null),this.removeGlobalEvents(),this.isModalOpen&&this.closeModal(),this.isListening=!1,this.isModalOpen=!1,this.retryCount=0,console.log("✅ VoiceSystem destruído")}}let zt=null;window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),zt||(zt=new Ji),zt.start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),zt&&zt.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),zt||(zt=new Ji),zt.start(n)};window.Modal=Yt;window.Snackbar=$;window.setupThemeToggle=Xa;window.FirebaseAuth=en;window.renderSettings=_b;window._renderRecorrentes=Yi;window.showHistoricoRecorrente=hp;window.renderLogAplicacoes=bb;window.deleteDespesaRecorrente=Xi;window.addDespesaRecorrente=Ki;window.updateInstallButton=function(){const n=document.getElementById("install-app-btn");if(!n)return;const e=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,t=!!window.deferredPrompt;console.log("📱 PWA: Atualizando botão - Instalado:",e,"Prompt:",t),e?(console.log('📱 PWA: Mostrando "App Instalado"'),n.innerHTML=`
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
          </div>`}),$({message:"Backup lido, mas não importado. Apenas leitura.",type:"info"})):($({message:"Arquivo de backup inválido.",type:"error"}),alert("Arquivo de backup inválido."))}catch(o){$({message:"Erro ao importar backup: "+o.message,type:"error"}),alert("Erro ao importar backup: "+o.message)}},n.click()};window.restoreBackup=function(){if(console.log("🔍 restoreBackup chamada"),!window.appState?.currentUser){console.log("❌ Usuário não logado"),window.Snackbar?window.Snackbar({message:"❌ Você precisa estar logado para restaurar backup.",type:"error"}):alert("❌ Você precisa estar logado para restaurar backup.");return}if(!window.appState?.currentBudget){console.log("❌ Nenhum orçamento selecionado"),window.Snackbar?window.Snackbar({message:"❌ Nenhum orçamento selecionado.",type:"error"}):alert("❌ Nenhum orçamento selecionado.");return}if(console.log("✅ Usuário e orçamento OK, abrindo modal..."),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível. Tente recarregar a página.");return}try{const n=window.Modal({title:"📥 Restaurar Backup",content:`
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
          `});console.log("🔍 Modal de preview criado, adicionando ao DOM..."),document.body.appendChild(s),console.log("✅ Modal de preview exibido com sucesso")}catch(r){console.error("❌ Erro ao ler backup:",r),window.Snackbar?window.Snackbar({message:"❌ Erro ao ler arquivo: "+r.message,type:"error"}):alert("❌ Erro ao ler arquivo: "+r.message)}finally{console.log("🔍 Removendo input do DOM"),document.body.removeChild(n)}},console.log("🔍 Triggerando clique no input..."),n.click(),console.log("🔍 Clique no input executado")},300)};window.confirmRestoreBackup=async function(n){console.log("🔍 confirmRestoreBackup chamada com dados:",n);try{console.log("🔍 Fechando modal..."),closeModal(),console.log("🔍 Mostrando loading..."),window.Snackbar?window.Snackbar({message:"🔄 Restaurando backup...",type:"info"}):alert("🔄 Restaurando backup...");const e=window.appState.currentUser.uid,t=window.appState.currentBudget.id;if(console.log("🔄 Iniciando restauração de backup..."),console.log("👤 User ID:",e),console.log("📁 Budget ID:",t),console.log("📊 Dados do backup:",n),!n||!n.categories||!n.transactions||!n.budgets)throw new Error("Dados de backup inválidos ou incompletos");console.log("🗑️ Limpando dados atuais..."),console.log("🗑️ Limpando transações...");for(const c of window.appState.transactions)try{await fp(c.id),console.log(`🗑️ Transação "${c.descricao}" removida`)}catch(d){console.error(`❌ Erro ao remover transação "${c.descricao}":`,d)}console.log("🗑️ Limpando categorias...");for(const c of window.appState.categories)try{await mp(c.id),console.log(`🗑️ Categoria "${c.nome}" removida`)}catch(d){console.error(`❌ Erro ao remover categoria "${c.nome}":`,d)}console.log("🗑️ Limpando recorrentes...");for(const c of window.appState.recorrentes)try{await Xi(e,c.id),console.log(`🗑️ Recorrente "${c.descricao}" removida`)}catch(d){console.error(`❌ Erro ao remover recorrente "${c.descricao}":`,d)}await new Promise(c=>setTimeout(c,2e3));let r=0,o=0,s=0,i=0;console.log("📂 Importando categorias...");for(const c of n.categories)try{const{id:d,...h}=c;h.budgetId=t,await Zi(h),r++,console.log(`✅ Categoria "${c.nome}" importada (${r}/${n.categories.length})`)}catch(d){console.error(`❌ Erro ao importar categoria "${c.nome}":`,d)}console.log("💸 Importando transações...");for(const c of n.transactions)try{const{id:d,...h}=c;h.budgetId=t,await gp(h),o++,console.log(`✅ Transação "${c.descricao}" importada (${o}/${n.transactions.length})`)}catch(d){console.error(`❌ Erro ao importar transação "${c.descricao}":`,d)}console.log("📁 Importando orçamentos...");for(const c of n.budgets)try{if(window.appState.budgets.find(h=>h.nome===c.nome))console.log(`ℹ️ Orçamento "${c.nome}" já existe, pulando...`);else{const{id:h,...g}=c;g.userId=e,await Os(g),s++,console.log(`✅ Orçamento "${c.nome}" importado (${s}/${n.budgets.length})`)}}catch(d){console.error(`❌ Erro ao importar orçamento "${c.nome}":`,d)}if(console.log("🔄 Importando recorrentes..."),n.recorrentes&&n.recorrentes.length>0)for(const c of n.recorrentes)try{const{id:d,...h}=c;h.budgetId=t,await Ki(e,t,h),i++,console.log(`✅ Recorrente "${c.descricao}" importada (${i}/${n.recorrentes.length})`)}catch(d){console.error(`❌ Erro ao importar recorrente "${c.descricao}":`,d)}else console.log("ℹ️ Nenhuma recorrente encontrada no backup");console.log("🔄 Recarregando dados..."),await pp(),console.log("✅ Restauração concluída com sucesso!"),console.log(`📊 Resumo: ${r} categorias, ${o} transações, ${s} orçamentos, ${i} recorrentes`);const l=`✅ Backup restaurado com sucesso!

📊 Dados importados:
• ${r} categorias
• ${o} transações
• ${s} orçamentos
• ${i} recorrentes

A página será recarregada em 3 segundos...`;window.Snackbar?window.Snackbar({message:l,type:"success",duration:5e3}):alert(l),console.log("🔄 Agendando recarregamento da página..."),setTimeout(()=>{console.log("🔄 Recarregando página..."),window.location.reload()},3e3)}catch(e){console.error("❌ Erro durante restauração:",e);const t=`❌ Erro durante restauração:
${e.message}`;window.Snackbar?window.Snackbar({message:t,type:"error",duration:5e3}):alert(t)}};function Br(n){const e=document.getElementById("login-page"),t=document.querySelector(".app-container"),r=document.getElementById("loading-page");n?(e.style.display="flex",t&&(t.style.display="none"),r&&(r.style.display="none")):(e.style.display="none",t&&(t.style.display="flex"),r&&(r.style.display="none"))}function xb(){en.signOut().then(()=>{console.log("✅ Logout realizado com sucesso"),window.appState.currentUser=null,window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[],Br(!0),window.location.hash=""}).catch(n=>{console.error("❌ Erro no logout:",n)})}async function pp(){const n=window.location.hash.slice(1)||"/dashboard";await Ur(n)}async function gp(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const r={...n,userId:e.uid,budgetId:t.id,createdAt:_e(),updatedAt:_e()},o=await Qt(oe(U,"transactions"),r);return console.log("✅ Transação adicionada com ID:",o.id),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),$({message:"Transação adicionada com sucesso!",type:"success"}),o.id}catch(e){throw console.error("❌ Erro ao adicionar transação:",e),$({message:"Erro ao adicionar transação",type:"error"}),e}}async function Eb(n,e){try{const t=Ve(U,"transactions",n);await dt(t,{...e,updatedAt:_e()}),console.log("✅ Transação atualizada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),$({message:"Transação atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar transação:",t),$({message:"Erro ao atualizar transação",type:"error"}),t}}async function fp(n){try{const e=Ve(U,"transactions",n);await mt(e),console.log("✅ Transação deletada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),$({message:"Transação deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar transação:",e),$({message:"Erro ao deletar transação",type:"error"}),e}}async function oo(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=ve(oe(U,"transactions"),re("budgetId","==",e.id)),o=(await fe(t)).docs.map(s=>({id:s.id,...s.data()}));return o.sort((s,i)=>{let l,c;return s.createdAt&&typeof s.createdAt=="object"&&s.createdAt.seconds?l=new Date(s.createdAt.seconds*1e3):l=new Date(s.createdAt),i.createdAt&&typeof i.createdAt=="object"&&i.createdAt.seconds?c=new Date(i.createdAt.seconds*1e3):c=new Date(i.createdAt),c-l}),window.appState.transactions=o,o}catch(n){return console.error("❌ Erro ao carregar transações:",n),[]}}async function Zi(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const r={...n,userId:e.uid,budgetId:t.id,createdAt:_e(),updatedAt:_e()},o=await Qt(oe(U,"categories"),r);return console.log("✅ Categoria adicionada com ID:",o.id),$({message:"Categoria adicionada com sucesso!",type:"success"}),o.id}catch(e){throw console.error("❌ Erro ao adicionar categoria:",e),$({message:"Erro ao adicionar categoria",type:"error"}),e}}async function Tb(n,e){try{const t=Ve(U,"categories",n);await dt(t,{...e,updatedAt:_e()}),console.log("✅ Categoria atualizada:",n),$({message:"Categoria atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar categoria:",t),$({message:"Erro ao atualizar categoria",type:"error"}),t}}async function mp(n){try{const e=Ve(U,"categories",n);await mt(e),console.log("✅ Categoria deletada:",n),$({message:"Categoria deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar categoria:",e),$({message:"Erro ao deletar categoria",type:"error"}),e}}async function so(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=ve(oe(U,"categories"),re("budgetId","==",e.id)),o=(await fe(t)).docs.map(s=>({id:s.id,...s.data()}));return window.appState.categories=o,o}catch(n){return console.error("❌ Erro ao carregar categorias:",n),[]}}async function Os(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t={...n,userId:e.uid,createdAt:_e(),updatedAt:_e()},r=await Qt(oe(U,"budgets"),t);return console.log("✅ Orçamento adicionado com ID:",r.id),$({message:"Orçamento adicionado com sucesso!",type:"success"}),r.id}catch(e){throw console.error("❌ Erro ao adicionar orçamento:",e),$({message:"Erro ao adicionar orçamento",type:"error"}),e}}window.deleteBudget=async function(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");console.log("🗑️ Iniciando exclusão do orçamento:",n);const t=window.appState.budgets.find(N=>N.id===n);if(!t)throw new Error("Orçamento não encontrado");if(t.userId!==e.uid)throw new Error("Você não tem permissão para excluir este orçamento");const r=window.appState.currentBudget?.id===n;r&&(window.appState.currentBudget=null,localStorage.removeItem("currentBudgetId")),console.log("🗑️ Excluindo transações do orçamento...");const o=ve(oe(U,"transactions"),re("budgetId","==",n)),s=await fe(o),i=s.docs.map(N=>mt(N.ref));await Promise.all(i),console.log(`✅ ${s.docs.length} transações excluídas`),console.log("🗑️ Excluindo categorias do orçamento...");const l=ve(oe(U,"categories"),re("budgetId","==",n)),c=await fe(l),d=c.docs.map(N=>mt(N.ref));await Promise.all(d),console.log(`✅ ${c.docs.length} categorias excluídas`),console.log("🗑️ Excluindo recorrentes do orçamento...");const h=ve(oe(U,"recorrentes"),re("budgetId","==",n)),g=await fe(h),m=g.docs.map(N=>mt(N.ref));await Promise.all(m),console.log(`✅ ${g.docs.length} recorrentes excluídas`),console.log("🗑️ Excluindo convites do orçamento...");const v=ve(oe(U,"budgetInvitations"),re("budgetId","==",n)),b=await fe(v),_=b.docs.map(N=>mt(N.ref));await Promise.all(_),console.log(`✅ ${b.docs.length} convites excluídos`),console.log("🗑️ Excluindo o orçamento...");const S=Ve(U,"budgets",n);if(await mt(S),console.log("✅ Orçamento excluído"),window.appState.budgets=window.appState.budgets.filter(N=>N.id!==n),r){const N=window.appState.budgets.filter(M=>M.userId===e.uid);N.length>0?(await ec(N[0]),console.log("✅ Novo orçamento selecionado:",N[0].nome)):(window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.recorrentes=[],console.log("ℹ️ Nenhum orçamento restante"))}return $({message:`Orçamento "${t.nome}" excluído com sucesso!`,type:"success"}),console.log("✅ Exclusão do orçamento concluída com sucesso"),!0}catch(e){throw console.error("❌ Erro ao excluir orçamento:",e),$({message:`Erro ao excluir orçamento: ${e.message}`,type:"error"}),e}};async function _n(){try{const n=window.appState.currentUser;if(!n)return[];console.log("🔍 Carregando orçamentos para usuário:",n.uid);const e=ve(oe(U,"budgets"),re("userId","==",n.uid)),t=ve(oe(U,"budgets"),re("usuariosPermitidos","array-contains",n.uid));console.log("🔍 Executando queries de orçamentos...");const[r,o]=await Promise.all([fe(e),fe(t)]),s=r.docs.map(c=>({id:c.id,...c.data(),isOwner:!0})),i=o.docs.map(c=>({id:c.id,...c.data(),isOwner:!1})),l=[...s];return i.forEach(c=>{l.find(d=>d.id===c.id)||l.push(c)}),console.log("📊 Orçamentos carregados:",{total:l.length,own:s.length,shared:i.length,budgets:l.map(c=>({id:c.id,nome:c.nome,isOwner:c.isOwner}))}),window.appState.budgets=l,l}catch(n){return console.error("❌ Erro ao carregar orçamentos:",n),[]}}function ec(n){window.appState.currentBudget=n,localStorage.setItem("currentBudgetId",n.id),console.log("✅ Orçamento atual definido:",n.nome)}window.setCurrentBudget=async function(n){if(!n){console.log("❌ Budget não fornecido para setCurrentBudget");return}console.log("🔄 Selecionando orçamento:",n.nome,n.id),ec(n),window.stopAllListeners&&window.stopAllListeners(),window.startAllListeners&&await window.startAllListeners(n.id),await Promise.all([window.loadTransactions?window.loadTransactions():Promise.resolve(),window.loadCategories?window.loadCategories():Promise.resolve(),window.loadRecorrentes?window.loadRecorrentes():Promise.resolve(),window.loadNotifications?window.loadNotifications():Promise.resolve()]);const e=window.location.hash.replace("#","")||"/dashboard";switch(console.log("🔄 Atualizando rota atual:",e),e){case"/dashboard":window.renderDashboard&&await window.renderDashboard();break;case"/transactions":window.renderTransactions&&await window.renderTransactions();break;case"/categories":window.renderCategories&&await window.renderCategories();break;case"/notifications":window.renderNotifications&&await window.renderNotifications();break;case"/settings":window.renderSettings&&await window.renderSettings();break;default:window.renderDashboard&&await window.renderDashboard()}console.log("✅ Orçamento selecionado e todas as abas atualizadas")};async function tc(){try{if(!window.appState.currentUser)return;const e=localStorage.getItem("currentBudgetId");if(e){const o=window.appState.budgets.find(s=>s.id===e);if(o){await window.setCurrentBudget(o);return}}if(window.appState.budgets.length>0){await window.setCurrentBudget(window.appState.budgets[0]);return}console.log("📝 Criando orçamento padrão...");const r=await Os({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente",valor:0,tipo:"mensal"});if(r){await _n();const o=window.appState.budgets.find(s=>s.id===r);o&&await window.setCurrentBudget(o)}}catch(n){console.error("❌ Erro ao selecionar orçamento padrão:",n)}}async function Fs(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=ve(oe(U,"recorrentes"),re("budgetId","==",e.id)),o=(await fe(t)).docs.map(s=>({id:s.id,...s.data()}));return window.appState.recorrentes=o,o}catch(n){return console.error("❌ Erro ao carregar recorrentes:",n),[]}}async function Sb(n,e,t){try{console.log(`🔍 Buscando transações para: ${e}/${t}`);const r=window.appState.currentBudget;if(!r)return console.log("⚠️ Nenhum orçamento ativo"),[];const o=ve(oe(U,"transactions"),re("budgetId","==",r.id)),i=(await fe(o)).docs.map(c=>({id:c.id,...c.data()}));console.log(`📊 Total de transações encontradas: ${i.length}`);const l=i.filter(c=>{if(!c.createdAt)return!1;let d;c.createdAt&&typeof c.createdAt=="object"&&c.createdAt.seconds?d=new Date(c.createdAt.seconds*1e3):d=new Date(c.createdAt);const h=d.getFullYear(),g=d.getMonth()+1;return h===e&&g===t});return console.log(`✅ Transações filtradas para ${e}/${t}: ${l.length}`),l}catch(r){return console.error("❌ Erro ao buscar transações do mês:",r),[]}}async function ls(n,e){if(window.isRenderingDashboard){console.log("🔄 Dashboard já está sendo renderizado, pulando...");return}if(window.isRenderingDashboard=!0,!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, renderizando dashboard vazio"),window.isRenderingDashboard=!1;return}try{const t=document.getElementById("app-content");if(!t){console.warn("⚠️ Elemento #app-content não encontrado");return}const r=new Date,o=n||r.getFullYear(),s=e||r.getMonth()+1,i=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],l=window.appState.currentUser;let c=l?await Sb(l.uid,o,s):[];console.log(`📊 Dashboard ${o}/${s}: ${c.length} transações carregadas`),console.log("📊 Estado atual:",{user:!!l,budget:!!window.appState.currentBudget,transactions:window.appState.transactions?.length||0,categories:window.appState.categories?.length||0,recorrentes:window.appState.recorrentes?.length||0}),o===r.getFullYear()&&s===r.getMonth()+1&&window.appState.transactions&&window.appState.transactions.length>0&&(c=window.appState.transactions,console.log(`🔄 Usando transações do appState para mês atual: ${c.length}`));const d=c.filter(D=>D.tipo==="receita").reduce((D,W)=>D+parseFloat(W.valor),0),h=c.filter(D=>D.tipo==="despesa").reduce((D,W)=>D+parseFloat(W.valor),0),g=window.appState.recorrentes||[],v=c.filter(D=>D.recorrenteId).map(D=>{const W=g.find(ae=>ae.id===D.recorrenteId);let X=D.parcelaAtual,j=D.parcelasTotal;return(!X||!j)&&(W?(j=W.parcelasTotal,window.calcularParcelaRecorrente?X=window.calcularParcelaRecorrente(W,o,s):X=1):(X=1,j=1)),{...W,efetivada:!0,parcelaAtual:X,parcelasTotal:j,transacaoId:D.id,valor:D.valor}}),b=g.filter(D=>{if(v.some(je=>je.id===D.id))return!1;const[X,j,ae]=D.dataInicio.split("-").map(Number),qe=new Date(X,j-1,ae),Qe=qe.getFullYear(),xn=qe.getMonth()+1;if(o<Qe||o===Qe&&s<xn||!D.efetivarMesAtual&&o===Qe&&s===xn)return!1;if(D.parcelasRestantes!==null&&D.parcelasRestantes!==void 0){let je=(o-Qe)*12+(s-xn);return!D.efetivarMesAtual&&(o>Qe||o===Qe&&s>xn)&&(je-=1),D.parcelasRestantes-je>0}return!0}),_=[...v,...b],S=v.reduce((D,W)=>D+parseFloat(W.valor),0),N=b.reduce((D,W)=>D+parseFloat(W.valor),0),M=S+N,F=h+M,Z=d-F,ne=(window.appState.categories?.filter(D=>D.tipo==="despesa")||[]).reduce((D,W)=>D+parseFloat(W.limite||0),0),x=ne-F,w=ne>0?F/ne:0,y=window.appState.categories?.filter(D=>{if(D.tipo!=="despesa")return!1;const X=c.filter(qe=>qe.categoriaId===D.id&&qe.tipo===D.tipo).reduce((qe,Qe)=>qe+parseFloat(Qe.valor),0),j=parseFloat(D.limite||0),ae=j>0?X/j:0;return j>0&&ae>.7})||[],T=w>.7?"Orçado geral em alerta":null,I=y.length+(T?1:0),A=window.appState.categories.filter(D=>D.tipo==="despesa").map(D=>{const X=(window.appState.transactions||[]).filter(j=>j.categoriaId===D.id&&j.tipo===D.tipo).reduce((j,ae)=>j+parseFloat(ae.valor),0);return{...D,gasto:X}}).filter(D=>D.gasto>0).sort((D,W)=>W.gasto-D.gasto).slice(0,5),E=`
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
          <span class="font-bold text-lg">${i[s-1]} ${o}</span>
          <button id="mes-proximo" class="text-blue-600 bg-blue-100 rounded-full w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation" style="min-width: 44px; min-height: 44px;">&#8594;</button>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="dashboard-content">
            <!-- RESUMO DO MÊS COM RELÓGIO INTEGRADO -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 md:p-6 mb-4 text-white">
              <!-- Header com Relógio -->
              <div class="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
                <div class="flex flex-col md:flex-row items-center gap-3">
                  <h2 class="text-lg md:text-xl font-bold">RESUMO DO MÊS</h2>
                  <span class="text-lg md:text-xl opacity-90">${i[s-1]} ${o}</span>
                </div>
                <!-- Relógio Digital Integrado -->
                <div class="flex flex-col items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <div id="digital-clock" class="text-lg md:text-xl font-mono font-bold tracking-wider">
                    --:--:--
                  </div>
                  <div id="digital-date" class="text-xs md:text-sm opacity-90">
                    --/--/----
                  </div>
                </div>
              </div>
              
              <!-- Grid de Informações Financeiras -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div class="text-center p-3 bg-white bg-opacity-10 rounded-lg">
                  <div class="text-2xl mb-2">💰</div>
                  <div class="text-xl md:text-2xl font-bold mb-1">R$ ${d.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90 font-medium">Receitas</div>
                  <div class="text-xs opacity-75 mt-1">Dinheiro recebido</div>
                </div>
                <div class="text-center p-3 bg-white bg-opacity-10 rounded-lg">
                  <div class="text-2xl mb-2">🛒</div>
                  <div class="text-xl md:text-2xl font-bold mb-1">R$ ${F.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90 font-medium">Despesas</div>
                  <div class="text-xs opacity-75 mt-1">Dinheiro gasto</div>
                </div>
                <div class="text-center p-3 bg-white bg-opacity-10 rounded-lg">
                  <div class="text-2xl mb-2">💳</div>
                  <div class="text-xl md:text-2xl font-bold mb-1 ${Z>=0?"text-green-300":"text-red-300"}">R$ ${Z.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90 font-medium">Saldo</div>
                  <div class="text-xs opacity-75 mt-1">${Z>=0?"✓ Saldo positivo":"✗ Saldo negativo"}</div>
                </div>
                <div class="text-center p-3 bg-white bg-opacity-10 rounded-lg">
                   <div class="text-2xl mb-2">📊</div>
                   <div class="text-lg md:text-xl font-bold mb-1">R$ ${ne.toFixed(0)}</div>
                   <div class="text-sm md:text-base opacity-90 font-medium">Orçado total</div>
                   <div class="text-xs opacity-75 mt-1">${(w*100).toFixed(0)}% usado</div>
                   ${I>0?`
                   <button onclick="window.showBudgetAlerts && window.showBudgetAlerts()" class="text-xs bg-yellow-500 bg-opacity-80 text-white px-2 py-1 rounded mt-1 hover:bg-opacity-100 transition-all">
                     ⚠️ ${I} alertas
                   </button>
                   `:'<div class="text-xs text-green-300 mt-1">✓ Dentro do orçado</div>'}
                 </div>
              </div>
            </div>

            <!-- TOP 5 CATEGORIAS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">TOP 5 CATEGORIAS</h3>
              </div>
              <div class="space-y-3">
                ${A.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma categoria com gastos encontrada neste mês</p>':A.slice(0,5).map(D=>{const W=window.appState.categories?.find(qe=>qe.id===D.id),X=W?.limite?parseFloat(W.limite):0,j=X>0?Math.min(D.gasto/X*100,100):0;let ae="bg-green-500";return j>=90?ae="bg-red-500":j>=75?ae="bg-yellow-500":j>=50&&(ae="bg-orange-500"),`
                      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${W?.cor||"#4F46E5"}"></div>
                            <span class="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">${D.nome}</span>
                          </div>
                          <span class="font-bold text-sm md:text-base ${D.gasto>X?"text-red-600":"text-gray-900 dark:text-gray-100"}">
                            R$ ${D.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${X>0?`
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>${j.toFixed(0)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${ae} h-2 rounded-full transition-all duration-300" style="width: ${j}%"></div>
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
                ${(window.appState.categories||[]).length===0?'<p class="text-gray-500 text-center py-4">Nenhuma categoria encontrada</p>':(window.appState.categories||[]).filter(D=>D.limite>0).map(D=>{const X=(window.appState.transactions||[]).filter(j=>j.categoriaId===D.id&&j.tipo===D.tipo).reduce((j,ae)=>j+parseFloat(ae.valor),0);return{...D,gasto:X}}).sort((D,W)=>W.gasto-D.gasto).map(D=>{const W=parseFloat(D.limite||0),X=W>0?Math.min(D.gasto/W*100,100):0;let j="bg-green-500";return X>=90?j="bg-red-500":X>=75?j="bg-yellow-500":X>=50&&(j="bg-orange-500"),`
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
                            <span>${X.toFixed(1)}% usado</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${j} h-2 rounded-full transition-all duration-300" style="width: ${X}%"></div>
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
                ${_.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma despesa recorrente aplicada ou agendada neste mês</p>':_.slice(0,5).map(D=>{const W=window.appState.categories?.find(X=>X.id===D.categoriaId);return`
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${D.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${W?.nome||"Sem categoria"} • Recorrente
                            ${(()=>{if(D.efetivada)return` • ✅ Efetivada: ${D.parcelaAtual} de ${D.parcelasTotal}`;if(!D.parcelasTotal||D.parcelasTotal<=1)return" • 📅 Agendada: Infinito";{const X=window.calcularStatusRecorrente?window.calcularStatusRecorrente(D,window.appState.transactions||[],o,s):{parcelaAtual:1,totalParcelas:D.parcelasTotal,foiEfetivadaEsteMes:!1};return` • 📅 Agendada: ${X.parcelaAtual} de ${X.totalParcelas}`}})()}
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
                ${c.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma transação encontrada neste mês</p>':c.slice(0,10).map(D=>{const W=window.appState.categories?.find(j=>j.id===D.categoriaId);let X="";if(D.recorrenteId){const j=window.appState.recorrentes?.find(ae=>ae.id===D.recorrenteId);if(j)if(j.parcelasTotal&&j.parcelasTotal>1){const ae=window.calcularStatusRecorrente?window.calcularStatusRecorrente(j,window.appState.transactions||[],o,s):{parcelaAtual:1,totalParcelas:j.parcelasTotal,foiEfetivadaEsteMes:!1};ae.foiEfetivadaEsteMes?X=` • ✅ Efetivada: ${ae.parcelaAtual} de ${ae.totalParcelas}`:X=` • 📅 Agendada: ${ae.parcelaAtual} de ${ae.totalParcelas}`}else X=" • Infinito";else X=" • Recorrente"}return`
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${D.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${W?.nome||"Sem categoria"} • ${D.createdAt&&D.createdAt.toDate?D.createdAt.toDate().toLocaleDateString():D.createdAt?new Date(D.createdAt).toLocaleDateString():""}
                            ${D.recorrenteId?" • Recorrente"+X:""}
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
    `;t.innerHTML=E,setTimeout(()=>{$b()},100),qt()}catch(t){console.error("Erro ao renderizar dashboard:",t);const r=document.getElementById("app-content");r&&(r.innerHTML='<div class="text-red-600 text-center mt-4">Erro ao carregar dashboard. Tente novamente.</div>')}finally{window.isRenderingDashboard=!1,setTimeout(()=>{typeof Qa=="function"&&Qa()},100)}}function Ib(){const n=document.getElementById("modal-alertas");n&&n.classList.add("hidden")}function wp(){const n=document.getElementById("app-content");n.innerHTML=`
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
          <!-- Filtros de pesquisa e categoria -->
          <div class="mb-4 space-y-3">
            <!-- Campo de pesquisa -->
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
            
            <!-- Filtro de categoria -->
            <div class="flex flex-col sm:flex-row gap-2">
              <div class="relative flex-1">
                <select 
                  id="category-filter" 
                  class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                  onchange="window.handleCategoryFilter()"
                >
                  <option value="">🏷️ Todas as categorias</option>
                  ${window.appState.categories?.map(e=>`<option value="${e.id}">${e.nome} (${e.tipo})</option>`).join("")||""}
                </select>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">🏷️</span>
                </div>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">▼</span>
                </div>
              </div>
              
              <!-- Filtro de tipo -->
              <div class="relative">
                <select 
                  id="type-filter" 
                  class="w-full sm:w-auto px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="">💰 Todos os tipos</option>
                  <option value="receita">💚 Receitas</option>
                  <option value="despesa">❤️ Despesas</option>
                </select>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">💰</span>
                </div>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">▼</span>
                </div>
              </div>
              
              <!-- Botão limpar filtros -->
              <button 
                id="clear-filters-btn" 
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
                title="Limpar filtros"
              >
                <span>🗑️</span>
                <span class="hidden sm:inline">Limpar</span>
              </button>
            </div>
            
            <!-- Resultados da pesquisa -->
            <div id="transaction-search-results" class="text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="transaction-search-count">0</span> transação(ões) encontrada(s)
              <span id="active-filters" class="ml-2"></span>
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
                  ${(()=>{if(!e.recorrenteId)return"";let s=e.parcelaAtual,i=e.parcelasTotal;if(!s||!i){const l=window.appState.recorrentes?.find(c=>c.id===e.recorrenteId);if(l)if(i=l.parcelasTotal,window.calcularParcelaRecorrente){const c=new Date;s=window.calcularParcelaRecorrente(l,c.getFullYear(),c.getMonth()+1)}else s=1;else s=1,i=1}return i&&i>1?` • ${s} de ${i}`:" • Infinito"})()}
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
  `,setTimeout(()=>{Fb()},100),Ab(),qt()}function Ab(){const n=document.getElementById("transaction-search"),e=document.getElementById("category-filter"),t=document.getElementById("type-filter"),r=document.getElementById("clear-filters-btn"),o=document.getElementById("transaction-search-results"),s=document.getElementById("transaction-search-count"),i=document.getElementById("active-filters"),l=document.getElementById("transactions-list");if(!n||!e||!t)return;function c(){const d=n.value.toLowerCase().trim(),h=e.value,g=t.value;if(!(d!==""||h!==""||g!=="")){o.classList.add("hidden"),l.innerHTML=kb();return}const v=window.appState.transactions?.filter(_=>{let S=!0;if(d!==""){const F=_.descricao.toLowerCase(),K=window.appState.categories?.find(x=>x.id===_.categoriaId)?.nome?.toLowerCase()||"",ne=_.valor.toString();S=F.includes(d)||K.includes(d)||ne.includes(d)}let N=!0;h!==""&&(N=_.categoriaId===h);let M=!0;return g!==""&&(M=_.tipo===g),S&&N&&M})||[];s.textContent=v.length;const b=[];if(d!==""&&b.push(`Busca: "${d}"`),h!==""){const _=window.appState.categories?.find(S=>S.id===h);b.push(`Categoria: ${_?.nome||"Desconhecida"}`)}g!==""&&b.push(`Tipo: ${g==="receita"?"Receitas":"Despesas"}`),i.textContent=b.length>0?`• ${b.join(" • ")}`:"",o.classList.remove("hidden"),l.innerHTML=Cb(v)}n.addEventListener("input",c),window.handleCategoryFilter=function(){if(console.log("🔧 Category filter changed via onchange"),console.log("🔧 Current location:",window.location.hash),window.location.hash!=="#/transactions"){console.log("🔧 Não está na aba de transações, ignorando");return}console.log("🔧 Aplicando filtros..."),c()},t.addEventListener("change",c),r.addEventListener("click",function(){n.value="",e.value="",t.value="",c()}),n.addEventListener("keydown",function(d){d.key==="Escape"&&(n.value="",e.value="",t.value="",c())})}function kb(){return window.appState.transactions?.length?window.appState.transactions.map(n=>{const e=window.appState.categories?.find(o=>o.id===n.categoriaId),t=n.createdAt&&n.createdAt.toDate?n.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(n.createdAt).toLocaleDateString("pt-BR"),r=n.tipo==="receita";return`
      <div class="list-item ${r?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${n.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${e?.nome||"Sem categoria"} • ${t}
            ${n.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!n.recorrenteId)return"";let o=n.parcelaAtual,s=n.parcelasTotal;if(!o||!s){const i=window.appState.recorrentes?.find(l=>l.id===n.recorrenteId);if(i)if(s=i.parcelasTotal,window.calcularParcelaRecorrente){const l=new Date;o=window.calcularParcelaRecorrente(i,l.getFullYear(),l.getMonth()+1)}else o=1;else o=1,s=1}return s&&s>1?` • ${o} de ${s}`:" • Infinito"})()}
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
    `}function Cb(n){return n.length?n.map(e=>{const t=window.appState.categories?.find(s=>s.id===e.categoriaId),r=e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(e.createdAt).toLocaleDateString("pt-BR"),o=e.tipo==="receita";return`
      <div class="list-item ${o?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${e.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${t?.nome||"Sem categoria"} • ${r}
            ${e.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!e.recorrenteId)return"";let s=e.parcelaAtual,i=e.parcelasTotal;if(!s||!i){const l=window.appState.recorrentes?.find(c=>c.id===e.recorrenteId);if(l)if(i=l.parcelasTotal,window.calcularParcelaRecorrente){const c=new Date;s=window.calcularParcelaRecorrente(l,c.getFullYear(),c.getMonth()+1)}else s=1;else s=1,i=1}return i&&i>1?` • ${s} de ${i}`:" • Infinito"})()}
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
    `}function Rb(n){return n.recorrenteId?1:null}async function yp(){await oo(),await Fs();const n=document.getElementById("app-content"),e=new Date,t=e.getFullYear(),r=e.getMonth()+1,o=window.appState.categories.map(s=>{const l=window.appState.transactions.filter(_=>{let S;_.createdAt&&typeof _.createdAt=="object"&&_.createdAt.seconds?S=new Date(_.createdAt.seconds*1e3):S=new Date(_.createdAt);const N=S.getFullYear(),M=S.getMonth()+1;return _.categoriaId===s.id&&_.tipo===s.tipo&&N===t&&M===r}).reduce((_,S)=>_+parseFloat(S.valor),0),c=window.appState.recorrentes.filter(_=>_.categoriaId===s.id&&_.ativa===!0);let d=0;c.forEach(_=>{window.appState.transactions.filter(N=>N.recorrenteId===_.id&&new Date(N.createdAt).getFullYear()===t&&new Date(N.createdAt).getMonth()+1===r).length>0&&(d+=parseFloat(_.valor))});const h=l+d,g=s.limite?parseFloat(s.limite):0,m=(s.tipo==="receita",g-h),v=g>0?Math.min(h/g*100,100):0;let b="bg-green-500";return v>=90?b="bg-red-500":v>=75?b="bg-yellow-500":v>=50&&(b="bg-orange-500"),{...s,totalGasto:h,totalGastoTransacoes:l,totalGastoRecorrentes:d,limite:g,saldo:m,porcentagem:v,corBarra:b}}).sort((s,i)=>i.totalGasto-s.totalGasto);n.innerHTML=`
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
  `,setTimeout(()=>{Ob()},100),Pb(),qt()}function Pb(){const n=document.getElementById("category-search"),e=document.getElementById("category-search-results"),t=document.getElementById("category-search-count"),r=document.getElementById("categories-grid");n&&(n.addEventListener("input",function(){const o=this.value.toLowerCase().trim();if(o===""){e.classList.add("hidden"),r.innerHTML=Db();return}const s=window.appState.categories?.filter(i=>{const l=i.nome.toLowerCase(),c=i.tipo.toLowerCase(),d=i.limite?.toString()||"";return l.includes(o)||c.includes(o)||d.includes(o)})||[];t.textContent=s.length,e.classList.remove("hidden"),r.innerHTML=Nb(s)}),n.addEventListener("keydown",function(o){o.key==="Escape"&&(this.value="",this.dispatchEvent(new Event("input")))}))}function Db(){const n=new Date,e=n.getFullYear(),t=n.getMonth()+1;return window.appState.categories.map(o=>{const i=window.appState.transactions.filter(b=>{let _;b.createdAt&&typeof b.createdAt=="object"&&b.createdAt.seconds?_=new Date(b.createdAt.seconds*1e3):_=new Date(b.createdAt);const S=_.getFullYear(),N=_.getMonth()+1;return b.categoriaId===o.id&&b.tipo===o.tipo&&S===e&&N===t}).reduce((b,_)=>b+parseFloat(_.valor),0),l=window.appState.recorrentes.filter(b=>b.categoriaId===o.id&&b.ativa===!0);let c=0;l.forEach(b=>{window.appState.transactions.filter(S=>S.recorrenteId===b.id&&new Date(S.createdAt).getFullYear()===e&&new Date(S.createdAt).getMonth()+1===t).length>0&&(c+=parseFloat(b.valor))});const d=i+c,h=o.limite?parseFloat(o.limite):0,g=(o.tipo==="receita",h-d),m=h>0?Math.min(d/h*100,100):0;let v="bg-green-500";return m>=90?v="bg-red-500":m>=75?v="bg-yellow-500":m>=50&&(v="bg-orange-500"),{...o,totalGasto:d,totalGastoTransacoes:i,totalGastoRecorrentes:c,limite:h,saldo:g,porcentagem:m,corBarra:v}}).sort((o,s)=>s.totalGasto-o.totalGasto).map(o=>`
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
  `).join("")}function Nb(n){return n.length?n.map(e=>`
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
    `}async function Ur(n){switch(console.log("🔄 Router chamado com path:",n),console.log("🔄 Estado atual:",{currentUser:!!window.appState?.currentUser,currentBudget:!!window.appState?.currentBudget,hash:window.location.hash}),n){case"/dashboard":console.log("🔄 Renderizando dashboard..."),await ls(),ft("/dashboard"),console.log("✅ Dashboard renderizado");break;case"/transactions":console.log("🔄 Renderizando transações..."),wp(),ft("/transactions"),console.log("✅ Transações renderizadas");break;case"/categories":console.log("🔄 Renderizando categorias..."),await yp(),ft("/categories"),console.log("✅ Categorias renderizadas");break;case"/analytics":console.log("🔄 Renderizando análises..."),await Qi(),ft("/analytics"),console.log("✅ Análises renderizadas");break;case"/recorrentes":if(console.log("🔄 Renderizando recorrentes..."),window._renderRecorrentes)window._renderRecorrentes();else{console.log("⚠️ Função _renderRecorrentes não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
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
          `)}qt(),ft("/recorrentes"),console.log("✅ Recorrentes renderizadas");break;case"/notifications":if(console.log("🔄 Renderizando notificações..."),window.renderNotifications)await window.loadNotifications(),window.renderNotifications();else{console.log("⚠️ Função renderNotifications não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
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
          `)}qt(),ft("/notifications"),console.log("✅ Notificações renderizadas");break;case"/settings":if(console.log("🔄 Renderizando configurações..."),window.renderSettings)window.renderSettings();else{console.log("⚠️ Função renderSettings não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
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
          `)}qt(),ft("/settings"),console.log("✅ Configurações renderizadas");break;default:console.log("🔄 Rota não reconhecida, usando dashboard como fallback"),await ls(),ft("/dashboard"),console.log("✅ Dashboard renderizado (fallback)")}setTimeout(()=>{window.swipeNavigation&&window.swipeNavigation.updateCurrentTabIndex&&(window.swipeNavigation.updateCurrentTabIndex(),window.swipeNavigation.updateSwipeIndicator())},200),setTimeout(()=>{_p()},300)}function qt(){console.log("🔧 Renderizando FAB corrigido...");const n=document.getElementById("fab-container");if(!n){console.error("❌ Container FAB não encontrado");return}console.log("✅ Container FAB encontrado, criando FAB corrigido...");try{window.currentFAB&&window.currentFAB.cleanup&&(console.log("🧹 Limpando FAB anterior..."),window.currentFAB.cleanup()),n.innerHTML="",console.log("🔧 Criando FAB corrigido...");const e=hb();console.log("🔧 FAB corrigido criado:",e),n.appendChild(e),console.log("🔧 FAB corrigido adicionado ao container"),window.currentFAB=e,console.log("✅ FAB corrigido criado e adicionado ao DOM"),setTimeout(()=>{const t=document.getElementById("fab-main"),r=document.getElementById("fab-container-main"),o=document.getElementById("fab-actions");t?console.log("✅ FAB principal encontrado e visível"):console.error("❌ FAB principal não encontrado"),r?console.log("✅ Container FAB principal encontrado"):console.error("❌ Container FAB principal não encontrado"),o?console.log("✅ Container de ações FAB encontrado"):console.error("❌ Container de ações FAB não encontrado");const s=document.getElementById("fab-transaction"),i=document.getElementById("fab-recorrente"),l=document.getElementById("fab-voice");console.log("🔧 Verificando botões de ação:"),console.log("  - Nova Transação:",!!s),console.log("  - Nova Recorrente:",!!i),console.log("  - Voz:",!!l),console.log("🔧 Verificando funções globais:"),console.log("  - showAddTransactionModal:",typeof window.showAddTransactionModal=="function"),console.log("  - showAddRecorrenteModal:",typeof window.showAddRecorrenteModal=="function"),console.log("  - openVoiceModal:",typeof window.openVoiceModal=="function"),console.log("  - Snackbar:",typeof window.Snackbar=="function")},300)}catch(e){console.error("❌ Erro ao criar FAB corrigido:",e)}}function ft(n){const e=document.getElementById("bottom-nav");e&&(e.innerHTML=`
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
  `)}function zr(n){const e=document.getElementById("loading-page");e&&(e.style.display=n?"flex":"none")}function vp(){let n=window.location.hash.slice(1)||"/dashboard";const e=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"];function t(c){const d=e.indexOf(n);if(d===-1)return;let h,g="";c==="next"?(h=(d+1)%e.length,g="Próxima aba"):(h=d===0?e.length-1:d-1,g="Aba anterior");const m=e[h];l(`${g}: ${{"/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/analytics":"Análises","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[m]}`),window.location.hash=m}document.addEventListener("keydown",c=>{if(!(c.target.tagName==="INPUT"||c.target.tagName==="TEXTAREA"))switch(c.key){case"ArrowLeft":c.preventDefault(),t("prev");break;case"ArrowRight":c.preventDefault(),t("next");break}});let r=0,o=0,s=!1;const i=document.createElement("div");i.className="swipe-indicator",i.textContent="Deslize para mudar de aba",document.body.appendChild(i);function l(c){i.textContent=c,i.classList.add("show"),setTimeout(()=>{i.classList.remove("show")},1e3)}document.addEventListener("touchstart",c=>{r=c.touches[0].clientX,o=c.touches[0].clientY,s=!1}),document.addEventListener("touchmove",c=>{if(!r||!o)return;const d=c.touches[0].clientX-r,h=c.touches[0].clientY-o;Math.abs(d)>Math.abs(h)&&Math.abs(d)>50&&(s=!0,c.preventDefault())}),document.addEventListener("touchend",c=>{if(!s||!r)return;const d=c.changedTouches[0].clientX-r;Math.abs(d)>100&&(d>0?t("prev"):t("next")),r=0,o=0,s=!1}),window.addEventListener("hashchange",()=>{const c=window.location.hash.slice(1)||"/dashboard";console.log("🔄 Hash change detectado:",{oldPath:n,newPath:c}),c!==n&&(n=c,console.log("🔄 Navegando para nova rota:",c),Ur(c))}),console.log("🔄 Navegação inicial para:",n),Ur(n)}function Mb(){const n=document.getElementById("btn-entrar");n&&n.addEventListener("click",async()=>{try{zr(!0);const e=await lb();if(e){window.appState.currentUser=e,Br(!1),vp();try{console.log("📊 Carregando dados do usuário após login..."),await _n(),await tc(),await oo(),await so(),await Fs(),await $s(),await Us(),await rc(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso após login")}catch(t){console.error("❌ Erro ao carregar dados após login:",t)}await Ur("/dashboard")}}catch(e){console.error("Erro no login:",e),zr(!1)}})}function Lb(){return new Promise(n=>{let e=!0;en.onAuthStateChanged(t=>{t?(console.log("✅ Usuário autenticado:",t.email),window.appState.currentUser=t,Br(!1),e&&(e=!1,n(!0))):(console.log("❌ Usuário não autenticado"),window.appState.currentUser=null,typeof window.stopAllListeners=="function"&&window.stopAllListeners(),window.appState&&(window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[]),Br(!0),e&&(e=!1,n(!1)))})})}document.addEventListener("DOMContentLoaded",async()=>{console.log("🚀 Iniciando aplicação...");try{An&&(window.mobileEnhancements=An,An.init(),console.log("📱 Melhorias mobile inicializadas"))}catch(e){console.error("❌ Erro ao inicializar melhorias mobile:",e)}if(window.appState={currentUser:null,currentBudget:null,transactions:[],categories:[],budgets:[],recorrentes:[],isInitialized:!1},_p(),await Lb()){vp(),zr(!0);try{console.log("📊 Carregando dados do usuário..."),await _n(),await tc(),await oo(),await so(),await Fs(),await $s(),await Us(),await rc(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso"),await new Promise(e=>setTimeout(e,500)),console.log("🔄 Renderizando dashboard inicial..."),await ls(),ft("/dashboard"),qt(),console.log("✅ Dashboard inicial renderizado")}catch(e){console.error("❌ Erro ao carregar dados:",e),window.Snackbar&&window.Snackbar({message:"Erro ao carregar dados. Tente recarregar a página.",type:"error"})}finally{zr(!1)}setTimeout(()=>{try{if(!document.querySelector("#app-content")){console.warn("⚠️ Container #app-content não encontrado, tentando novamente em 500ms..."),setTimeout(()=>{document.querySelector("#app-content")&&(window.swipeNavigation=new Dd,console.log("✅ SwipeNavigation inicializado (tentativa 2)"))},500);return}if(!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, aguardando...");return}window.swipeNavigation=new Dd,console.log("✅ SwipeNavigation inicializado com sucesso"),An&&!An.isInitialized&&(An.reconfigure(),console.log("✅ Melhorias mobile reconfiguradas"))}catch(e){console.error("❌ Erro ao inicializar SwipeNavigation:",e)}},1e3),window.appState.isInitialized=!0}Mb(),console.log("✅ Aplicação iniciada com sucesso!")});window.addCategoryWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Categoria",message:`Deseja adicionar a categoria "${n.nome}"?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const r=await window.addCategory(n);window.Snackbar&&window.Snackbar({message:"✅ Categoria adicionada com sucesso!",type:"success"}),e(r)}catch(r){console.error("❌ Erro ao adicionar categoria:",r),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar categoria: "+r.message,type:"error"}),t(r)}},onCancel:()=>{console.log("❌ Adição de categoria cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.renderDashboard=ls;window.renderTransactions=wp;window.renderCategories=yp;window.router=Ur;window.addTransaction=gp;window.updateTransaction=Eb;window.deleteTransaction=fp;window.addCategory=Zi;window.updateCategory=Tb;window.deleteCategory=mp;window.addBudget=Os;window.loadTransactions=oo;window.loadCategories=so;window.loadBudgets=_n;window.selectDefaultBudget=tc;window.loadRecorrentes=Fs;window.closeModalAlertas=Ib;window.calcularNumeroParcela=Rb;window.showLoading=zr;window.toggleLoginPage=Br;window.refreshCurrentView=pp;window.logout=xb;let Ar=null;function bp(){return Ar||(Ar=new Ji),Ar}window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),bp().start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),Ar&&Ar.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),bp().start(n)};window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="financeiro-backup.json",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(o=>({Descrição:o.descricao,Valor:o.valor,Tipo:o.tipo,Categoria:window.appState.categories.find(s=>s.id===o.categoriaId)?.nome||"",Data:o.createdAt&&o.createdAt.toDate?o.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(o=>({Nome:o.nome,Tipo:o.tipo,Limite:o.limite,Cor:o.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const r=window.appState.budgets.map(o=>({Nome:o.nome,Descrição:o.descricao,ID:o.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(r),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(20),e.setFont("helvetica","bold"),e.text("📊 Relatório Financeiro",10,t),t+=15;const r=window.appState.currentBudget;r&&(e.setFontSize(14),e.setFont("helvetica","bold"),e.text(`Orçamento: ${r.nome}`,10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`ID: ${r.id}`,10,t),t+=10);const o=window.appState.transactions.filter(l=>l.tipo==="receita").reduce((l,c)=>l+parseFloat(c.valor),0),s=window.appState.transactions.filter(l=>l.tipo==="despesa").reduce((l,c)=>l+parseFloat(c.valor),0),i=o-s;e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Resumo Geral:",10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`Total Receitas: R$ ${o.toFixed(2)}`,12,t),t+=6,e.text(`Total Despesas: R$ ${s.toFixed(2)}`,12,t),t+=6,e.setFont("helvetica","bold"),e.text(`Saldo: R$ ${i.toFixed(2)}`,12,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Transações Recentes:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.transactions.sort((l,c)=>new Date(c.createdAt?.toDate?.()||c.createdAt)-new Date(l.createdAt?.toDate?.()||l.createdAt)).slice(0,15).forEach(l=>{const c=window.appState.categories.find(g=>g.id===l.categoriaId)?.nome||"Sem categoria",h=`${l.createdAt?.toDate?.()?l.createdAt.toDate().toLocaleDateString():"Data não disponível"} - ${l.descricao} | R$ ${l.valor} | ${l.tipo} | ${c}`;t>270&&(e.addPage(),t=10),e.text(h,12,t),t+=6}),t+=5,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Gastos por Categoria:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.categories.forEach(l=>{const c=window.appState.transactions.filter(d=>d.categoriaId===l.id&&d.tipo==="despesa").reduce((d,h)=>d+parseFloat(h.valor),0);if(c>0){const d=l.limite?` / R$ ${l.limite}`:"",h=l.limite?` (${(c/l.limite*100).toFixed(1)}%)`:"";t>270&&(e.addPage(),t=10),e.text(`${l.nome}: R$ ${c.toFixed(2)}${d}${h}`,12,t),t+=6}}),e.save("relatorio-financeiro.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar PDF:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+n.message,type:"error"}):alert("Erro ao exportar PDF: "+n.message)}};window.exportReadmePDF=function(){try{let o=function(s,i,l,c=170){return t.splitTextToSize(s,c).forEach(h=>{l>270&&(t.addPage(),l=10),t.text(h,i,l),l+=6}),l};var n=o;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let r=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Guia Completo de Uso",20,35),r=50,t.setFontSize(12),t.setFont("helvetica","bold"),t.setTextColor(0,0,0),r=o("🎯 Como Usar o Aplicativo",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("1. Faça login com sua conta Google",25,r),r=o("2. Crie categorias para organizar suas despesas e receitas",25,r),r=o("3. Adicione transações usando o botão + ou comandos de voz",25,r),r=o("4. Configure despesas recorrentes para pagamentos fixos",25,r),r=o("5. Monitore seu saldo e gastos no dashboard",25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("🎤 Comandos de Voz Disponíveis",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o('• "gastei 50 reais no supermercado em alimentação"',25,r),r=o('• "recebi 2000 de salário em rendimentos"',25,r),r=o('• "criar categoria alimentação despesa 500"',25,r),r=o('• "qual meu saldo"',25,r),r=o('• "mostrar transações"',25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("📊 Funcionalidades Principais",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("• Dashboard com resumo financeiro",25,r),r=o("• Gestão de transações e categorias",25,r),r=o("• Sistema de despesas recorrentes",25,r),r=o("• Alertas de limite de categoria",25,r),r=o("• Backup e exportação de dados",25,r),r=o("• Interface responsiva para mobile",25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("💾 Backup e Exportação",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("• Exportação em JSON para backup completo",25,r),r=o("• Exportação em Excel para relatórios",25,r),r=o("• Exportação em PDF para documentação",25,r),r=o("• Restauração de dados de backup",25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("🔧 Suporte e Contato",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("Para dúvidas ou problemas:",25,r),r=o("• Verifique os logs do console (F12)",30,r),r=o("• Teste em diferentes navegadores",30,r),r=o("• Consulte a documentação técnica",30,r),t.save("guia-servo-tech-financas.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar guia PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+e.message,type:"error"}):alert("Erro ao exportar guia PDF: "+e.message)}};window.showExportOptions=function(){console.log("🔍 showExportOptions chamada"),Yt({title:"📤 Opções de Exportação",content:`
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
    `})};function _p(){console.log("🔧 Configurando botões do header...");const n=document.getElementById("voice-modal");console.log("🔧 Elementos encontrados:",{voiceModal:!!n});const e=document.getElementById("close-voice-modal");e&&(e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("❌ Close voice modal button clicked"),Md()}),console.log("✅ Close voice modal button configurado")),n&&n.addEventListener("click",t=>{t.target===n&&Md()})}function Vb(){const n=document.getElementById("voice-modal"),e=n?.querySelector(".voice-content");n&&e&&(n.style.display="flex",n.style.pointerEvents="auto",n.style.background="rgba(0, 0, 0, 0.95)",n.style.backdropFilter="blur(30px)",e.style.transform="scale(1)",e.style.opacity="1",document.body.classList.add("voice-modal-open"),window.startVoiceRecognition&&setTimeout(()=>{window.startVoiceRecognition("transaction")},500),console.log("🎤 Modal de voz aberto"))}window.openVoiceModal=Vb;function Md(){const n=document.getElementById("voice-modal"),e=n?.querySelector(".voice-content");n&&e&&(e.style.transform="scale(0.95)",e.style.opacity="0",n.style.background="rgba(0, 0, 0, 0)",n.style.backdropFilter="blur(0px)",document.body.classList.remove("voice-modal-open"),setTimeout(()=>{n.style.pointerEvents="none",n.style.display="none"},300),console.log("🎤 Modal de voz fechado"))}function Ob(){console.log("🔧 Configurando botões da tela de categorias...");const n=document.getElementById("add-category-btn");n&&(n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("📂 Add category button clicked"),window.showAddCategoryModal?window.showAddCategoryModal():(console.warn("⚠️ Função de adicionar categoria não disponível"),window.Snackbar&&window.Snackbar.show("Funcionalidade de adicionar categoria não disponível","warning"))}),console.log("✅ Add category button configurado"));const e=document.querySelector('button[onclick="window.migrarTransacoesAntigas()"]');e&&(e.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("🔄 Migrar button clicked"),window.migrarTransacoesAntigas?window.migrarTransacoesAntigas():console.warn("⚠️ Função de migrar não disponível")}),console.log("✅ Migrar button configurado"));const t=document.querySelector('button[onclick="window.corrigirTipoCategoria()"]');t&&(t.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("🔧 Corrigir button clicked"),window.corrigirTipoCategoria?window.corrigirTipoCategoria():console.warn("⚠️ Função de corrigir não disponível")}),console.log("✅ Corrigir button configurado"))}function Fb(){console.log("🔧 Configurando botões da tela de transações...");const n=document.getElementById("add-transaction-btn");n&&(n.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("📋 Add transaction button clicked"),window.showAddTransactionModal?window.showAddTransactionModal():(console.warn("⚠️ Função de adicionar transação não disponível"),window.Snackbar&&window.Snackbar.show("Funcionalidade de adicionar transação não disponível","warning"))}),console.log("✅ Add transaction button configurado"));const e=document.getElementById("voice-btn");e?(e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("🎤 Voice button clicked"),window.startVoiceRecognition?window.startVoiceRecognition("transaction"):console.warn("⚠️ Função de voz não disponível")}),console.log("✅ Voice button configurado")):console.warn("⚠️ Botão de voz não encontrado")}function $b(){console.log("🔧 Configurando botões do dashboard...");const n=document.getElementById("export-btn");n&&(n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("📤 Export button clicked"),window.showExportOptions?window.showExportOptions():(console.warn("⚠️ Função de exportação não disponível"),window.Snackbar&&window.Snackbar({message:"Funcionalidade de exportação não disponível",type:"warning"}))}),console.log("✅ Export button configurado")),document.getElementById("theme-toggle-btn")&&(console.log("Dashboard: Configurando botão de tema..."),window.setupThemeToggle?window.setupThemeToggle("theme-toggle-btn"):console.warn("⚠️ setupThemeToggle não disponível"));const t=document.getElementById("mes-anterior"),r=document.getElementById("mes-proximo");t&&(t.addEventListener("click",async o=>{o.preventDefault(),o.stopPropagation(),console.log("⬅️ Mês anterior clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),i=document.querySelector("#mes-selector span").textContent.split(" ")[0],c=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(i);let d=s,h=c;c===0?(d=s-1,h=11):h=c-1,window.renderDashboard&&await window.renderDashboard(d,h+1)}),console.log("✅ Mês anterior button configurado")),r&&(r.addEventListener("click",async o=>{o.preventDefault(),o.stopPropagation(),console.log("➡️ Mês próximo clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),i=document.querySelector("#mes-selector span").textContent.split(" ")[0],c=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(i);let d=s,h=c;c===11?(d=s+1,h=0):h=c+1,window.renderDashboard&&await window.renderDashboard(d,h+1)}),console.log("✅ Mês próximo button configurado"))}window.migrarTransacoesAntigas=async function(){try{if(console.log("🔄 Iniciando migração de transações antigas..."),!window.appState.currentUser){$({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){$.show("Orçamento não selecionado","error");return}const t=ve(oe(U,"transactions"),re("budgetId","==",e.id),re("categoriaId","==",null)),o=(await fe(t)).docs;if(o.length===0){$({message:"Nenhuma transação para migrar",type:"info"});return}let s=window.appState.categories.find(l=>l.nome==="Geral");if(!s){const c=await Zi({nome:"Geral",descricao:"Categoria padrão para transações antigas",tipo:"despesa",cor:"#6B7280",limite:0});await so(),s=window.appState.categories.find(d=>d.id===c)}let i=0;for(const l of o)await dt(l.ref,{categoriaId:s.id,updatedAt:_e()}),i++;await oo(),$({message:`${i} transações migradas para categoria "Geral"`,type:"success"})}catch(n){console.error("❌ Erro na migração:",n),$({message:"Erro ao migrar transações",type:"error"})}};window.corrigirTipoCategoria=async function(){try{if(console.log("🔧 Iniciando correção de tipos de categoria..."),!window.appState.currentUser){$({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){$.show("Orçamento não selecionado","error");return}const t=ve(oe(U,"categories"),re("budgetId","==",e.id),re("tipo","==",null)),o=(await fe(t)).docs;if(o.length===0){$({message:"Nenhuma categoria para corrigir",type:"info"});return}let s=0;for(const i of o)await dt(i.ref,{tipo:"despesa",updatedAt:_e()}),s++;await so(),$({message:`${s} categorias corrigidas`,type:"success"})}catch(n){console.error("❌ Erro na correção:",n),$({message:"Erro ao corrigir categorias",type:"error"})}};async function $s(){try{const n=en.currentUser;if(!n)return[];const{getDocs:e,query:t,where:r,orderBy:o,limit:s}=await Be(async()=>{const{getDocs:d,query:h,where:g,orderBy:m,limit:v}=await Promise.resolve().then(()=>Ke);return{getDocs:d,query:h,where:g,orderBy:m,limit:v}},void 0),i=t(oe(U,"notifications"),r("recipientUid","==",n.uid),o("createdAt","desc"),s(50)),l=await e(i),c=[];return l.forEach(d=>{c.push({id:d.id,...d.data()})}),window.appState.notifications=c,console.log("📧 Notificações carregadas:",c.length),Bs(),c}catch(n){return console.error("Erro ao carregar notificações:",n),[]}}async function Bb(n){try{const{updateDoc:e}=await Be(async()=>{const{updateDoc:r}=await Promise.resolve().then(()=>Ke);return{updateDoc:r}},void 0);await e(Ve(U,"notifications",n),{read:!0});const t=window.appState.notifications.findIndex(r=>r.id===n);t!==-1&&(window.appState.notifications[t].read=!0),Bs()}catch(e){console.error("Erro ao marcar notificação como lida:",e)}}async function Ub(){try{const n=window.appState.notifications?.filter(r=>!r.read)||[];if(n.length===0){$({message:"Nenhuma notificação não lida",type:"info"});return}const{updateDoc:e}=await Be(async()=>{const{updateDoc:r}=await Promise.resolve().then(()=>Ke);return{updateDoc:r}},void 0),t=n.map(r=>e(Ve(U,"notifications",r.id),{read:!0}));await Promise.all(t),window.appState.notifications.forEach(r=>r.read=!0),Bs(),$({message:`${n.length} notificações marcadas como lidas`,type:"success"}),window.location.hash==="#/notifications"&&nc()}catch(n){console.error("Erro ao marcar notificações como lidas:",n),$({message:"Erro ao marcar notificações como lidas",type:"error"})}}function Bs(){const n=window.appState.notifications?.filter(t=>!t.read).length||0,e=document.querySelector('[data-route="/notifications"]');if(e){let t=e.querySelector(".notification-badge");t||(t=document.createElement("span"),t.className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",e.style.position="relative",e.appendChild(t)),n>0?(t.textContent=n>99?"99+":n,t.style.display="flex"):t.style.display="none"}}let kn=null;async function Us(){kn&&kn();const n=en.currentUser;if(!n){console.log("⚠️ Usuário não autenticado, não iniciando listener de notificações");return}if(!window.appState.currentBudget){console.log("⚠️ Nenhum orçamento selecionado, não iniciando listener de notificações");return}try{const{onSnapshot:e,query:t,where:r,orderBy:o,limit:s}=await Be(async()=>{const{onSnapshot:l,query:c,where:d,orderBy:h,limit:g}=await Promise.resolve().then(()=>Ke);return{onSnapshot:l,query:c,where:d,orderBy:h,limit:g}},void 0),i=t(oe(U,"notifications"),r("recipientUid","==",n.uid),o("createdAt","desc"),s(50));kn=e(i,l=>{console.log("📧 Listener de notificações executado!");const c=[];l.forEach(d=>{c.push({id:d.id,...d.data()})}),window.appState.notifications=c,console.log("📧 Notificações atualizadas:",c.length),Bs(),window.location.hash==="#/notifications"&&nc()},l=>{console.error("❌ Erro no listener de notificações:",l),l.code==="permission-denied"&&(console.log("⚠️ Permissão negada para notificações, desabilitando listener"),kn&&(kn(),kn=null))})}catch(e){console.error("❌ Erro ao configurar listener de notificações:",e)}}async function nc(){const n=document.getElementById("app-content");if(!n)return;await $s();const e=window.appState.notifications||[];n.innerHTML=`
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
  `,qt()}window.loadNotifications=$s;window.markNotificationAsRead=Bb;window.markAllNotificationsAsRead=Ub;window.renderNotifications=nc;window.listenNotifications=Us;window.addTransactionWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Transação",message:`Tem certeza que deseja adicionar a transação "${n.descricao}" no valor de R$ ${n.valor.toFixed(2)}?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const r=await window.addTransaction(n);window.Snackbar&&window.Snackbar({message:"✅ Transação adicionada com sucesso!",type:"success"}),e(r)}catch(r){console.error("❌ Erro ao adicionar transação:",r),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar transação: "+r.message,type:"error"}),t(r)}},onCancel:()=>{console.log("❌ Adição de transação cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.deleteTransactionWithConfirmation=function(n,e="transação"){window.showConfirmationModal({title:"Excluir Transação",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteTransaction&&window.deleteTransaction(n)}})};window.deleteCategoryWithConfirmation=function(n,e="categoria"){window.showConfirmationModal({title:"Excluir Categoria",message:`Tem certeza que deseja excluir a categoria "${e}"? Todas as transações desta categoria ficarão sem categoria.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteCategory&&window.deleteCategory(n)}})};window.deleteRecorrenteWithConfirmation=function(n,e="despesa recorrente"){window.showConfirmationModal({title:"Excluir Despesa Recorrente",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteDespesaRecorrente&&window.deleteDespesaRecorrente(n)}})};window.leaveBudgetWithConfirmation=function(n,e="orçamento"){window.showConfirmationModal({title:"Sair do Orçamento",message:`Tem certeza que deseja sair do orçamento "${e}"? Você perderá acesso a todas as transações.`,confirmText:"Sim, Sair",confirmColor:"bg-orange-500 hover:bg-orange-600",onConfirm:()=>{window.leaveSharedBudget&&window.leaveSharedBudget(n)}})};window.showExportOptions=function(){if(console.log("🔍 showExportOptions chamada"),console.log("🔍 window.Modal disponível:",!!window.Modal),console.log("🔍 window.Modal tipo:",typeof window.Modal),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível");return}console.log("🔍 Tentando abrir modal de exportação...");try{const n=window.Modal({title:"Exportar Dados",content:`
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
      `,onClose:()=>{console.log("🔍 Modal fechado"),document.querySelector(".modal")?.remove()}});console.log("🔍 Modal criado com sucesso:",n),document.body.appendChild(n),console.log("🔍 Modal adicionado ao DOM")}catch(n){console.error("❌ Erro ao criar modal:",n),alert("Erro ao abrir modal de exportação: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(o=>({Descrição:o.descricao,Valor:o.valor,Tipo:o.tipo,Categoria:window.appState.categories.find(s=>s.id===o.categoriaId)?.nome||"",Data:o.createdAt&&o.createdAt.toDate?o.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(o=>({Nome:o.nome,Tipo:o.tipo,Limite:o.limite,Cor:o.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const r=window.appState.budgets.map(o=>({Nome:o.nome,Descrição:o.descricao,ID:o.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(r),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{let o=function(d,h,g,m=170){return t.splitTextToSize(d,m).forEach(b=>{g>270&&(t.addPage(),g=10),t.text(b,h,g),g+=6}),g};var n=o;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let r=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Relatório Financeiro",20,35),t.setTextColor(0,0,0),t.setFontSize(12),t.setFont("helvetica","normal"),r=50,r=o("📊 RESUMO FINANCEIRO",20,r),r+=10;const s=window.appState.transactions.filter(d=>d.tipo==="receita").reduce((d,h)=>d+parseFloat(h.valor),0),i=window.appState.transactions.filter(d=>d.tipo==="despesa").reduce((d,h)=>d+parseFloat(h.valor),0),l=s-i;r=o(`💰 Total de Receitas: R$ ${s.toFixed(2)}`,20,r),r=o(`💸 Total de Despesas: R$ ${i.toFixed(2)}`,20,r),r=o(`💳 Saldo: R$ ${l.toFixed(2)}`,20,r),r+=15,r=o("📋 ÚLTIMAS TRANSAÇÕES",20,r),r+=10,window.appState.transactions.sort((d,h)=>new Date(h.createdAt)-new Date(d.createdAt)).slice(0,10).forEach(d=>{const h=window.appState.categories.find(m=>m.id===d.categoriaId),g=d.createdAt&&d.createdAt.toDate?d.createdAt.toDate().toLocaleDateString():new Date(d.createdAt).toLocaleDateString();r=o(`${g} - ${d.descricao} (${h?.nome||"Sem categoria"}) - R$ ${d.valor}`,25,r)}),t.save("financeiro-relatorio.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+e.message,type:"error"}):alert("Erro ao exportar PDF: "+e.message)}};window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="financeiro-backup.json",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportReadmePDF=function(){try{let o=function(s,i,l,c=170){return t.splitTextToSize(s,c).forEach(h=>{l>270&&(t.addPage(),l=10),t.text(h,i,l),l+=6}),l};var n=o;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let r=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Guia Completo de Uso",20,35),t.setTextColor(0,0,0),t.setFontSize(12),t.setFont("helvetica","normal"),r=50,r=o("📱 COMO USAR O APLICATIVO",20,r),r+=10,r=o("1. DASHBOARD - Visualize seu resumo financeiro, saldo atual, gastos por categoria e alertas de limite.",20,r),r=o("2. TRANSAÇÕES - Adicione, edite ou remova suas receitas e despesas.",20,r),r=o("3. CATEGORIAS - Organize suas transações em categorias com limites personalizados.",20,r),r=o("4. RECORRENTES - Configure despesas que se repetem mensalmente.",20,r),r=o("5. NOTIFICAÇÕES - Receba alertas sobre limites de categoria e transações.",20,r),r=o("6. CONFIGURAÇÕES - Personalize o aplicativo e exporte seus dados.",20,r),r+=15,r=o("🎯 FUNCIONALIDADES PRINCIPAIS",20,r),r+=10,r=o("• Navegação por deslizamento entre abas",20,r),r=o("• Reconhecimento de voz para adicionar transações",20,r),r=o("• Exportação para Excel e PDF",20,r),r=o("• Backup e restauração de dados",20,r),r=o("• Notificações push para alertas",20,r),r=o("• Tema claro/escuro",20,r),r=o("• Instalação como PWA",20,r),r+=15,r=o("🔧 DICAS DE USO",20,r),r+=10,r=o("• Use as setas do teclado para navegar entre abas",20,r),r=o("• Deslize horizontalmente para trocar de tela no mobile",20,r),r=o("• Configure limites nas categorias para receber alertas",20,r),r=o("• Use o botão de voz para adicionar transações rapidamente",20,r),r=o("• Faça backup regular dos seus dados",20,r),t.save("servo-tech-financas-guia.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar guia PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+e.message,type:"error"}):alert("Erro ao exportar guia PDF: "+e.message)}};function qr(n,e,t={}){if(console.log("🔔 Tentando enviar notificação:",n,e),console.log("🔔 Permissão:",Notification.permission),console.log("🔔 Habilitada:",localStorage.getItem("notifications-enabled")),Notification.permission==="granted"&&localStorage.getItem("notifications-enabled")==="true")try{const r=new Notification(n,{body:e,icon:"/icon-192.png",badge:"/icon-192.png",tag:"servo-tech-financas",requireInteraction:!1,...t});console.log("✅ Notificação criada com sucesso:",r),r.onclick=()=>{console.log("🔔 Notificação clicada"),window.focus(),r.close()},setTimeout(()=>{r.close(),console.log("🔔 Notificação fechada automaticamente")},5e3),console.log("✅ Notificação enviada com sucesso!")}catch(r){console.error("❌ Erro ao criar notificação:",r)}else console.log("❌ Notificação não enviada - permissão ou configuração inválida"),console.log("   Permissão:",Notification.permission),console.log("   Habilitada:",localStorage.getItem("notifications-enabled"))}function zb(){if(localStorage.getItem("notifications-enabled")!=="true")return;const e=(window.appState.recorrentes||[]).filter(t=>t.parcelasRestantes>0);e.length>0&&qr("Recorrentes Pendentes",`Você tem ${e.length} despesa(s) recorrente(s) para efetivar este mês.`)}function qb(){if(console.log("🔍 Iniciando verificação de limites de categoria..."),console.log("🔍 Notificações habilitadas:",localStorage.getItem("notifications-enabled")==="true"),localStorage.getItem("notifications-enabled")!=="true"){console.log("❌ Notificações desabilitadas, pulando verificação");return}const n=window.appState.categories||[],e=window.appState.transactions||[];console.log("🔍 Categorias encontradas:",n.length),console.log("🔍 Transações encontradas:",e.length),n.forEach(t=>{if(t.limite){const r=e.filter(i=>i.categoriaId===t.id&&i.tipo===t.tipo).reduce((i,l)=>i+parseFloat(l.valor),0),o=parseFloat(t.limite),s=r/o*100;console.log(`🔍 ${t.nome}: R$ ${r.toFixed(2)} / R$ ${o.toFixed(2)} (${s.toFixed(1)}%)`),s>=80&&(console.log(`⚠️ ${t.nome} atingiu ${s.toFixed(1)}% do limite!`),qr("⚠️ Limite de Categoria",`${t.nome} está com ${s.toFixed(1)}% do limite usado (R$ ${r.toFixed(2)} / R$ ${o.toFixed(2)}).`)),s>100&&(console.log(`🚨 ${t.nome} ULTRAPASSOU o limite em ${(s-100).toFixed(1)}%!`),qr("🚨 LIMITE ULTRAPASSADO!",`${t.nome} ultrapassou o limite em ${(s-100).toFixed(1)}%! (R$ ${r.toFixed(2)} / R$ ${o.toFixed(2)})`))}})}window.forceUIUpdate=function(){console.log("🔄 Forçando atualização da UI...");const n=document.querySelector(".nav-btn.active")?.getAttribute("data-route");console.log("📍 Aba atual:",n),requestAnimationFrame(()=>{n&&window.router&&(console.log("🔄 Recarregando aba:",n),window.router(n))})};window.syncThemeAcrossTabs=function(){const e=document.documentElement.classList.contains("dark");document.querySelectorAll('[class*="dark:"]').forEach(r=>{r.offsetHeight}),document.querySelectorAll("#theme-icon").forEach(r=>{r.textContent=e?"🌙":"☀️"}),console.log("🎨 Tema sincronizado em todas as abas")};window.testNotification=function(){console.log("🔔 Testando notificações..."),console.log("📱 Permissão do navegador:",Notification.permission),console.log("💾 localStorage:",localStorage.getItem("notifications-enabled"));const n=Notification.permission,e=localStorage.getItem("notifications-enabled")==="true";if(n==="granted"&&e)console.log("✅ Notificações ativadas - enviando teste..."),qr("🔔 Teste de Notificação","As notificações estão funcionando perfeitamente!"),window.Snackbar&&window.Snackbar({message:"✅ Notificação de teste enviada!",type:"success"});else{let t="";n==="denied"?t="❌ Permissão negada pelo navegador. Vá em Configurações > Notificações e permita.":n==="default"?t='❌ Permissão não solicitada. Clique em "Ativar Notificações" primeiro.':e?t="❌ Erro desconhecido com notificações.":t='❌ Notificações desativadas. Clique em "Ativar Notificações" primeiro.',console.log("❌ Erro:",t),window.Snackbar?window.Snackbar({message:t,type:"error"}):alert(t)}};window.showNotification=qr;window.checkRecorrentesPendentes=zb;window.checkLimitesCategoria=qb;let kr=null,Cr=null,Rr=null,Pr=null;async function xp(n){if(kr&&kr(),!n)return;const{doc:e,onSnapshot:t}=await Be(async()=>{const{doc:o,onSnapshot:s}=await Promise.resolve().then(()=>Ke);return{doc:o,onSnapshot:s}},void 0),r=e(U,"budgets",n);kr=t(r,o=>{o.exists()&&(window.appState.currentBudget={id:o.id,...o.data()},console.log("🔄 Orçamento atualizado:",o.data().nome),setTimeout(async()=>{window.renderSettings&&(await window.renderSettings(),console.log("✅ renderSettings executado")),window.renderDashboard&&(window.renderDashboard(),console.log("✅ renderDashboard executado"))},100))})}async function Ep(n){if(Cr&&Cr(),!n)return;console.log("🎧 Iniciando listener de transações para budgetId:",n);const{query:e,collection:t,where:r,onSnapshot:o}=await Be(async()=>{const{query:i,collection:l,where:c,onSnapshot:d}=await Promise.resolve().then(()=>Ke);return{query:i,collection:l,where:c,onSnapshot:d}},void 0),s=e(t(U,"transactions"),r("budgetId","==",n));Cr=o(s,i=>{console.log("🎧 Listener de transações executado!");const l=[];i.forEach(_=>{l.push({id:_.id,..._.data()})});const c=window.appState.transactions.map(_=>_.id).sort(),d=l.map(_=>_.id).sort(),h=JSON.stringify(c)!==JSON.stringify(d),g=window.appState.transactions.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,categoriaId:_.categoriaId})).sort((_,S)=>_.id.localeCompare(S.id)),m=l.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,categoriaId:_.categoriaId})).sort((_,S)=>_.id.localeCompare(S.id)),v=JSON.stringify(g)!==JSON.stringify(m),b=h||v;l.sort((_,S)=>{let N,M;return _.createdAt&&typeof _.createdAt=="object"&&_.createdAt.seconds?N=new Date(_.createdAt.seconds*1e3):N=new Date(_.createdAt),S.createdAt&&typeof S.createdAt=="object"&&S.createdAt.seconds?M=new Date(S.createdAt.seconds*1e3):M=new Date(S.createdAt),M-N}),window.appState.transactions=l,console.log("🔄 Transações atualizadas:",l.length,"itens"),console.log("🔄 Houve mudança?",b),b?(console.log("🎯 Atualizando UI após mudança nas transações..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderTransactions&&(console.log("📋 Executando renderTransactions..."),window.renderTransactions()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},i=>{console.error("❌ Erro no listener de transações:",i)})}async function Tp(n){if(Rr&&Rr(),!n)return;console.log("🎧 Iniciando listener de categorias para budgetId:",n);const{query:e,collection:t,where:r,onSnapshot:o}=await Be(async()=>{const{query:i,collection:l,where:c,onSnapshot:d}=await Promise.resolve().then(()=>Ke);return{query:i,collection:l,where:c,onSnapshot:d}},void 0),s=e(t(U,"categories"),r("budgetId","==",n));Rr=o(s,i=>{console.log("🎧 Listener de categorias executado!");const l=[];i.forEach(_=>{l.push({id:_.id,..._.data()})});const c=window.appState.categories.map(_=>_.id).sort(),d=l.map(_=>_.id).sort(),h=JSON.stringify(c)!==JSON.stringify(d),g=window.appState.categories.map(_=>({id:_.id,nome:_.nome,limite:_.limite,cor:_.cor})).sort((_,S)=>_.id.localeCompare(S.id)),m=l.map(_=>({id:_.id,nome:_.nome,limite:_.limite,cor:_.cor})).sort((_,S)=>_.id.localeCompare(S.id)),v=JSON.stringify(g)!==JSON.stringify(m),b=h||v;window.appState.categories=l,console.log("🔄 Categorias atualizadas:",l.length,"itens"),console.log("🔄 Houve mudança?",b),b?(console.log("🎯 Atualizando UI após mudança nas categorias..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderCategories&&(console.log("📂 Executando renderCategories..."),window.renderCategories()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},i=>{console.error("❌ Erro no listener de categorias:",i)})}async function Sp(n){if(Pr&&Pr(),!n)return;console.log("🎧 Iniciando listener de recorrentes para budgetId:",n);const{query:e,collection:t,where:r,onSnapshot:o}=await Be(async()=>{const{query:i,collection:l,where:c,onSnapshot:d}=await Promise.resolve().then(()=>Ke);return{query:i,collection:l,where:c,onSnapshot:d}},void 0),s=e(t(U,"recorrentes"),r("budgetId","==",n));Pr=o(s,i=>{console.log("🎧 Listener de recorrentes executado!");const l=[];i.forEach(_=>{l.push({id:_.id,..._.data()})});const c=window.appState.recorrentes.map(_=>_.id).sort(),d=l.map(_=>_.id).sort(),h=JSON.stringify(c)!==JSON.stringify(d),g=window.appState.recorrentes.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,parcelasRestantes:_.parcelasRestantes,ativa:_.ativa})).sort((_,S)=>_.id.localeCompare(S.id)),m=l.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,parcelasRestantes:_.parcelasRestantes,ativa:_.ativa})).sort((_,S)=>_.id.localeCompare(S.id)),v=JSON.stringify(g)!==JSON.stringify(m),b=h||v;window.appState.recorrentes=l,console.log("🔄 Recorrentes atualizados:",l.length,"itens"),console.log("🔄 Houve mudança?",b),b?(console.log("🎯 Atualizando UI após mudança nos recorrentes..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window._renderRecorrentes&&(console.log("🔄 Executando _renderRecorrentes..."),window._renderRecorrentes()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},i=>{console.error("❌ Erro no listener de recorrentes:",i)})}async function rc(n){console.log("🚀 Iniciando listeners para orçamento:",n),console.log("📍 Estado atual:",{currentUser:window.appState.currentUser?.uid,currentBudget:window.appState.currentBudget?.id,budgetId:n}),Ip(),await xp(n),await Ep(n),await Tp(n),await Sp(n),await Us(),console.log("✅ Todos os listeners iniciados"),console.log("🔍 Verificando se listeners estão ativos:",{unsubscribeBudget:!!kr,unsubscribeTransactions:!!Cr,unsubscribeCategories:!!Rr,unsubscribeRecorrentes:!!Pr}),setTimeout(()=>{console.log("🧪 Teste de listeners após 2 segundos:",{unsubscribeBudget:!!kr,unsubscribeTransactions:!!Cr,unsubscribeCategories:!!Rr,unsubscribeRecorrentes:!!Pr})},2e3)}function Ip(){console.log("🛑 Parando todos os listeners..."),["unsubscribeBudget","unsubscribeTransactions","unsubscribeCategories","unsubscribeRecorrentes","unsubscribeNotifications"].forEach(e=>{if(window[e])try{window[e](),window[e]=null,console.log(`✅ Listener ${e} parado`)}catch(t){console.error(`❌ Erro ao parar listener ${e}:`,t)}}),console.log("✅ Todos os listeners parados")}window.startAllListeners=rc;window.stopAllListeners=Ip;window.listenCurrentBudget=xp;window.listenTransactions=Ep;window.listenCategories=Tp;window.listenRecorrentes=Sp;window.migrarTransacoesAntigas=function(){console.log("🔄 Iniciando migração de transações antigas..."),window.Snackbar&&window.Snackbar({message:"🔄 Migração iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Migração concluída com sucesso!",type:"success"})},2e3)};window.corrigirTipoCategoria=function(){console.log("🔧 Iniciando correção de tipos de categoria..."),window.Snackbar&&window.Snackbar({message:"🔧 Correção iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Correção concluída com sucesso!",type:"success"})},2e3)};window.showCategoryHistory=function(n){console.log("📊 Mostrando histórico da categoria:",n);const e=window.appState.categories.find(r=>r.id===n);if(!e){window.Snackbar&&window.Snackbar({message:"❌ Categoria não encontrada",type:"error"});return}const t=window.appState.transactions.filter(r=>r.categoriaId===n).sort((r,o)=>{const s=r.createdAt&&r.createdAt.toDate?r.createdAt.toDate():new Date(r.createdAt);return(o.createdAt&&o.createdAt.toDate?o.createdAt.toDate():new Date(o.createdAt))-s});if(window.Modal){const r=window.Modal({title:`Histórico - ${e.nome}`,content:`
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3">📊 Resumo</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600 dark:text-gray-400"><strong>Total de transações:</strong></p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${t.length}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400"><strong>Valor total:</strong></p>
                <p class="text-lg font-bold ${t.reduce((o,s)=>o+(s.tipo==="receita"?parseFloat(s.valor):-parseFloat(s.valor)),0)>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">${t.reduce((o,s)=>o+(s.tipo==="receita"?parseFloat(s.valor):-parseFloat(s.valor)),0)>=0?"+":""}R$ ${t.reduce((o,s)=>o+(s.tipo==="receita"?parseFloat(s.valor):-parseFloat(s.valor)),0).toFixed(2)}</p>
              </div>
              ${(()=>{const o=t.filter(i=>i.tipo==="receita"),s=t.filter(i=>i.tipo==="despesa");return o.length>0||s.length>0?`
                  <div>
                    <p class="text-gray-600 dark:text-gray-400"><strong>💚 Receitas:</strong></p>
                    <p class="text-sm font-medium text-green-600 dark:text-green-400">${o.length} • +R$ ${o.reduce((i,l)=>i+parseFloat(l.valor),0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 dark:text-gray-400"><strong>❤️ Despesas:</strong></p>
                    <p class="text-sm font-medium text-red-600 dark:text-red-400">${s.length} • -R$ ${s.reduce((i,l)=>i+parseFloat(l.valor),0).toFixed(2)}</p>
                  </div>
                `:""})()}
            </div>
          </div>
          ${t.length>0?`
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">📋 Histórico de Transações</h3>
              <div class="max-h-60 overflow-y-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
              ${t.map(o=>`
                <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 dark:text-white truncate">${o.descricao}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📅 ${o.createdAt&&o.createdAt.toDate?o.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(o.createdAt).toLocaleDateString("pt-BR")}
                      • ${o.tipo==="receita"?"💚 Receita":"❤️ Despesa"}
                      ${o.recorrenteId?" • 🔄 Recorrente":""}
                    </div>
                  </div>
                  <div class="text-right ml-4">
                    <div class="font-bold text-lg ${o.tipo==="receita"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                      ${o.tipo==="receita"?"+":"-"}R$ ${parseFloat(o.valor).toFixed(2)}
                    </div>
                  </div>
                </div>
              `).join("")}
              </div>
            </div>
          `:`
            <div class="text-center py-4 text-gray-500">
              Nenhuma transação encontrada para esta categoria
            </div>
          `}
        </div>
      `,onClose:()=>{document.querySelector(".modal")?.remove()}});document.body.appendChild(r)}};async function Ap(n){try{const{getDoc:e,doc:t}=await Be(async()=>{const{getDoc:s,doc:i}=await Promise.resolve().then(()=>Ke);return{getDoc:s,doc:i}},void 0),r=t(U,"users",n),o=await e(r);return o.exists()?o.data():{email:"Usuário não encontrado",displayName:"Usuário não encontrado"}}catch(e){return console.error("Erro ao buscar informações do usuário:",e),{email:"Erro ao carregar",displayName:"Erro ao carregar"}}}async function jb(n,e,t){try{const{getDoc:r,addDoc:o,collection:s,doc:i,serverTimestamp:l}=await Be(async()=>{const{getDoc:_,addDoc:S,collection:N,doc:M,serverTimestamp:F}=await Promise.resolve().then(()=>Ke);return{getDoc:_,addDoc:S,collection:N,doc:M,serverTimestamp:F}},void 0),c=await r(i(U,"budgets",n));if(!c.exists()){console.log("Orçamento não encontrado para notificação");return}const d=c.data();if(!d.usuariosPermitidos||d.usuariosPermitidos.length===0){console.log("Orçamento não compartilhado, não enviando notificação");return}const h=await Ap(e),g=h?.displayName||h?.email||"Usuário";let m="Sem categoria";if(t.categoriaId){const _=await r(i(U,"categories",t.categoriaId));_.exists()&&(m=_.data().nome)}const v={budgetId:n,budgetName:d.nome||"Orçamento",senderUid:e,senderName:g,transactionId:t.id,transactionDescricao:t.descricao,transactionValor:t.valor,transactionCategoria:m,transactionTipo:t.tipo||"despesa",createdAt:l(),read:!1,type:"new_transaction"},b=d.usuariosPermitidos.filter(_=>_!==e).map(async _=>{try{await o(s(U,"notifications"),{...v,recipientUid:_}),console.log(`📧 Notificação enviada para usuário: ${_}`)}catch(S){console.error(`Erro ao enviar notificação para ${_}:`,S)}});await Promise.all(b),console.log("✅ Notificações enviadas com sucesso")}catch(r){console.error("Erro ao enviar notificações:",r)}}async function Hb(n){try{const{updateDoc:e,doc:t,arrayRemove:r}=await Be(async()=>{const{updateDoc:i,doc:l,arrayRemove:c}=await Promise.resolve().then(()=>Ke);return{updateDoc:i,doc:l,arrayRemove:c}},void 0),o=window.appState.currentUser;if(!o){console.error("Usuário não autenticado");return}const s=t(U,"budgets",n);await e(s,{usuariosPermitidos:r(o.uid)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Saída do orçamento realizada com sucesso",type:"success"})}catch(e){console.error("Erro ao sair do orçamento:",e),window.Snackbar&&window.Snackbar({message:"❌ Erro ao sair do orçamento",type:"error"})}}async function Gb(n,e){try{const{updateDoc:t,doc:r,arrayRemove:o}=await Be(async()=>{const{updateDoc:l,doc:c,arrayRemove:d}=await Promise.resolve().then(()=>Ke);return{updateDoc:l,doc:c,arrayRemove:d}},void 0);if(!window.appState.currentUser){console.error("Usuário não autenticado");return}const i=r(U,"budgets",n);await t(i,{usuariosPermitidos:o(e)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Usuário removido com sucesso",type:"success"})}catch(t){console.error("Erro ao remover usuário:",t),window.Snackbar&&window.Snackbar({message:"❌ Erro ao remover usuário",type:"error"})}}window.getUserInfo=Ap;window.sendTransactionNotification=jb;window.leaveSharedBudget=Hb;window.removeUserFromBudget=Gb;window.calcularParcelaRecorrente=Uo;window.calcularStatusRecorrente=ob;window.showModal=function(n,e=""){if(console.log("🔧 showModal chamada com:",{title:e,content:n.substring(0,100)+"..."}),!window.Modal){console.error("❌ window.Modal não está disponível");return}const t=window.Modal({title:e,content:n,onClose:()=>{closeModal()}});return document.body.appendChild(t),t};window.closeModal=function(){console.log("🔧 closeModal chamada");const n=document.getElementById("app-modal");n&&(n.remove(),window.toggleFABOnModal&&window.toggleFABOnModal())};window.showConfirmationModal=function(n){const{title:e="Confirmar Ação",message:t="Tem certeza que deseja realizar esta ação?",confirmText:r="Confirmar",cancelText:o="Cancelar",confirmColor:s="bg-red-500 hover:bg-red-600",onConfirm:i,onCancel:l}=n,c=`
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
  `,d=window.showModal(c);return setTimeout(()=>{const h=document.getElementById("cancel-btn"),g=document.getElementById("confirm-btn");h&&(h.onclick=()=>{window.closeModal(),l&&l()}),g&&(g.onclick=()=>{window.closeModal(),i&&i()})},100),d};window.showAddBudgetModal=function(){console.log("🔧 Abrindo modal de criar orçamento..."),window.showModal(`
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
  `),document.getElementById("add-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-name").value,r=document.getElementById("budget-description").value,o=document.getElementById("budget-type").value;try{const s={nome:t,descricao:r,tipo:o,criadoPor:window.appState.currentUser.uid,membros:[window.appState.currentUser.uid],criadoEm:new Date},i=await Os(s);if(await _n(),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Orçamento criado com sucesso!",type:"success"}),window.appState.budgets.length===1){const l=window.appState.budgets.find(c=>c.id===i);l&&await ec(l)}}catch(s){console.error("❌ Erro ao criar orçamento:",s),window.Snackbar&&window.Snackbar({message:"Erro ao criar orçamento: "+s.message,type:"error"})}})};window.compartilharOrcamento=async function(){console.log("🔧 Abrindo modal de compartilhar orçamento...");const n=window.appState.currentBudget;if(!n){window.Snackbar&&window.Snackbar({message:"Nenhum orçamento selecionado",type:"warning"});return}const e=`
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
  `;window.showModal(e)};window.inviteUserToBudget=async function(){const n=document.getElementById("user-email").value,e=window.appState.currentBudget;if(console.log("🔍 Tentando convidar usuário:",{email:n,budgetId:e?.id,budgetName:e?.nome,budgetData:e,currentUser:window.appState.currentUser?.uid}),!n||!e){console.log("❌ Email ou orçamento inválido:",{email:n,budgetId:e?.id}),window.Snackbar&&window.Snackbar({message:"Email inválido ou orçamento não selecionado",type:"error"});return}try{console.log("🔍 Buscando usuário por email:",n);const t=ve(oe(U,"users"),re("email","==",n)),r=await fe(t);if(console.log("🔍 Resultado da busca:",{empty:r.empty,size:r.size,docs:r.docs.map(h=>({id:h.id,data:h.data()}))}),r.empty){console.log("❌ Usuário não encontrado com email:",n),window.Snackbar&&window.Snackbar({message:"Usuário não encontrado com este email",type:"warning"});return}const s=r.docs[0].id;if(e.usuariosPermitidos&&e.usuariosPermitidos.includes(s)){window.Snackbar&&window.Snackbar({message:"Usuário já é membro deste orçamento",type:"info"});return}console.log("🔍 Verificando convites existentes para:",{budgetId:e.id,invitedUserId:s});const i=ve(oe(U,"budgetInvitations"),re("budgetId","==",e.id),re("invitedUserId","==",s),re("status","==","pending")),l=await fe(i);if(console.log("🔍 Convites existentes:",{empty:l.empty,size:l.size,docs:l.docs.map(h=>({id:h.id,data:h.data()}))}),!l.empty){console.log("❌ Convite já existe para este usuário"),window.Snackbar&&window.Snackbar({message:"Convite já enviado para este usuário",type:"info"});return}const c={budgetId:e.id,budgetName:e.nome||"Orçamento sem nome",invitedUserId:s,invitedUserEmail:n,invitedByUserId:window.appState.currentUser.uid,invitedByUserEmail:window.appState.currentUser.email,status:"pending",createdAt:_e(),updatedAt:_e()};console.log("📨 Criando convite com dados:",c);const d=await Qt(oe(U,"budgetInvitations"),c);console.log("✅ Convite criado com ID:",d.id),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Convite enviado com sucesso! Aguardando aceitação.",type:"success"})}catch(t){console.error("❌ Erro ao enviar convite:",t),window.Snackbar&&window.Snackbar({message:"Erro ao enviar convite: "+t.message,type:"error"})}};window.acceptBudgetInvitation=async function(n){try{console.log("🔍 Aceitando convite:",n);const e=Ve(U,"budgetInvitations",n),t=await Fr(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const r=t.data();if(r.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(r.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}const o=Ve(U,"budgets",r.budgetId);if(!(await Fr(o)).exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}console.log("🔍 Adicionando usuário ao orçamento:",{budgetId:r.budgetId,userId:window.appState.currentUser.uid}),await dt(o,{usuariosPermitidos:Vi(window.appState.currentUser.uid),updatedAt:_e()}),console.log("✅ Usuário adicionado ao orçamento"),await dt(e,{status:"accepted",updatedAt:_e()}),console.log("✅ Status do convite atualizado para aceito"),window.Snackbar&&window.Snackbar({message:"✅ Convite aceito! Você agora tem acesso ao orçamento.",type:"success"}),await _n(),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao aceitar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao aceitar convite: "+e.message,type:"error"})}};window.declineBudgetInvitation=async function(n){try{const e=Ve(U,"budgetInvitations",n),t=await Fr(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const r=t.data();if(r.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(r.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}await dt(e,{status:"declined",updatedAt:_e()}),window.Snackbar&&window.Snackbar({message:"Convite recusado",type:"info"}),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao recusar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao recusar convite: "+e.message,type:"error"})}};window.loadBudgetInvitations=async function(){try{const n=window.appState.currentUser;if(console.log("🔍 Carregando convites para usuário:",n?.uid,n?.email),!n)return console.log("❌ Usuário não autenticado"),[];const e=ve(oe(U,"budgetInvitations"),re("invitedUserId","==",n.uid),re("status","==","pending"));console.log("🔍 Executando query de convites...");const t=await fe(e);console.log("📊 Total de convites encontrados:",t.size);const r=[];return t.forEach(o=>{const s=o.data();console.log("📨 Convite encontrado:",{id:o.id,...s}),r.push({id:o.id,...s})}),r.sort((o,s)=>{const i=o.createdAt?o.createdAt.toDate():new Date(0);return(s.createdAt?s.createdAt.toDate():new Date(0))-i}),console.log("✅ Convites carregados com sucesso:",r.length),r}catch(n){return console.error("❌ Erro ao carregar convites:",n),[]}};window.selectSharedBudget=function(){console.log("🔧 Abrindo modal de entrar em orçamento compartilhado..."),window.showModal(`
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
  `),document.getElementById("join-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-id").value.trim();if(!t){window.Snackbar&&window.Snackbar({message:"ID do orçamento é obrigatório",type:"warning"});return}try{const r=Ve(U,"budgets",t),o=await Fr(r);if(!o.exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}const s=o.data();if(s.usuariosPermitidos&&s.usuariosPermitidos.includes(window.appState.currentUser.uid)){window.Snackbar&&window.Snackbar({message:"Você já é membro deste orçamento",type:"info"});return}await dt(r,{usuariosPermitidos:Vi(window.appState.currentUser.uid),updatedAt:_e()}),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Você entrou no orçamento com sucesso!",type:"success"}),await _n();const i=window.appState.budgets.find(l=>l.id===t);i&&window.setCurrentBudget&&await window.setCurrentBudget(i)}catch(r){console.error("❌ Erro ao entrar no orçamento:",r),window.Snackbar&&window.Snackbar({message:"Erro ao entrar no orçamento: "+r.message,type:"error"})}})};function Ld(){const n=new Date,e=n.getHours().toString().padStart(2,"0"),t=n.getMinutes().toString().padStart(2,"0"),r=n.getSeconds().toString().padStart(2,"0"),o=`${e}:${t}:${r}`,s=n.getDate(),i=n.getMonth()+1,l=n.getFullYear(),c=`${s}/${i}/${l}`,d=document.getElementById("digital-clock"),h=document.getElementById("digital-date");d&&(d.textContent=o),h&&(h.textContent=c)}function Qa(){Ld(),setInterval(Ld,1e3)}document.addEventListener("DOMContentLoaded",()=>{console.log("DOM carregado, verificando botão de tema...");const n=document.getElementById("theme-toggle-btn");console.log("Botão encontrado:",n),n?(console.log("Botão existe, chamando setupThemeToggle..."),Xa()):(console.log("Botão não encontrado no DOM, tentando novamente em 1 segundo..."),setTimeout(()=>{const e=document.getElementById("theme-toggle-btn");console.log("Tentativa 2 - Botão encontrado:",e),e&&Xa()},1e3)),Qa()});window.showBudgetAlerts=function(){if(console.log("🚨 Mostrando alertas de orçamento..."),!window.appState?.categories||!window.appState?.transactions){console.warn("⚠️ Dados não carregados para mostrar alertas");return}const n=window.appState.categories.filter(l=>{if(l.tipo!=="despesa")return!1;const d=window.appState.transactions.filter(m=>m.categoriaId===l.id&&m.tipo===l.tipo).reduce((m,v)=>m+parseFloat(v.valor),0),h=parseFloat(l.limite||0),g=h>0?d/h:0;return h>0&&g>.7}),e=window.appState.categories.filter(l=>l.tipo==="despesa").reduce((l,c)=>l+parseFloat(c.limite||0),0),t=window.appState.transactions.filter(l=>l.tipo==="despesa").reduce((l,c)=>l+parseFloat(c.valor),0),r=e>0?t/e:0,o=r>.7;if(n.length===0&&!o){window.Snackbar&&window.Snackbar({message:"✅ Nenhum alerta encontrado! Tudo dentro do orçado.",type:"success"});return}let s="";o&&(s+=`
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
        <div class="flex items-center mb-2">
          <span class="text-red-600 text-xl mr-2">🚨</span>
          <h4 class="font-bold text-red-800">Orçamento Geral em Alerta</h4>
        </div>
        <p class="text-red-700 text-sm">
          Você gastou <strong>R$ ${t.toFixed(2)}</strong> de <strong>R$ ${e.toFixed(2)}</strong> 
          (<strong>${(r*100).toFixed(0)}%</strong> do orçamento total)
        </p>
      </div>
    `),n.forEach(l=>{const c=window.appState.transactions.filter(b=>b.categoriaId===l.id&&b.tipo===l.tipo),d=c.reduce((b,_)=>b+parseFloat(_.valor),0),h=parseFloat(l.limite||0),g=d/h*100;let m="yellow",v="Atenção";g>=100?(m="red",v="Limite Ultrapassado"):g>=90&&(m="red",v="Crítico"),s+=`
      <div class="bg-${m}-50 border border-${m}-200 rounded-lg p-4 mb-3">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-2" style="background-color: ${l.cor||"#4F46E5"}"></div>
            <h4 class="font-bold text-${m}-800">${l.nome}</h4>
          </div>
          <span class="text-${m}-600 font-bold">${v}</span>
        </div>
        <div class="text-${m}-700 text-sm space-y-1">
          <p>Gasto: <strong>R$ ${d.toFixed(2)}</strong> de <strong>R$ ${h.toFixed(2)}</strong></p>
          <p>Percentual: <strong>${g.toFixed(0)}%</strong> do limite</p>
          <p>Transações: <strong>${c.length}</strong> nesta categoria</p>
        </div>
        <div class="mt-2">
          <div class="w-full bg-${m}-200 rounded-full h-2">
            <div class="bg-${m}-600 h-2 rounded-full" style="width: ${Math.min(g,100)}%"></div>
          </div>
        </div>
      </div>
    `});const i=`
    <div class="modal-content max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <span class="text-2xl mr-2">⚠️</span>
          Alertas de Orçamento
        </h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        ${s}
      </div>
      
      <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeModal()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Entendi
        </button>
      </div>
    </div>
  `;window.showModal(i)};
