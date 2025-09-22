const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-ByRJO4Zv.js","assets/PeriodIndicator-D5G0Ogox.js","assets/TransactionsPage-CxBwcT7V.js","assets/UIService-DhwnTKWF.js","assets/perf-tobPnqr4.js","assets/CategoriesPage-CF-cN8xU.js","assets/NotificationsPage-CIoSC0Nt.js","assets/NotificationModal-CXlK3t7N.js","assets/NotificationService-DrPvGObm.js","assets/VoiceService-F1rMbtYP.js","assets/VoiceSystem-CEBe8orV.js","assets/AuthService-DinJOQir.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const ww="modulepreload",yw=function(n){return"/"+n},Eu={},N=function(e,t,o){let r=Promise.resolve();if(t&&t.length>0){let l=function(d){return Promise.all(d.map(g=>Promise.resolve(g).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),c=s?.nonce||s?.getAttribute("nonce");r=l(t.map(d=>{if(d=yw(d),d in Eu)return;Eu[d]=!0;const g=d.endsWith(".css"),f=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const p=document.createElement("link");if(p.rel=g?"stylesheet":ww,g||(p.as="script"),p.crossOrigin="",p.href=d,c&&p.setAttribute("nonce",c),document.head.appendChild(p),g)return new Promise((v,A)=>{p.addEventListener("load",v),p.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return r.then(s=>{for(const c of s||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},_w=()=>{};var bu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=function(n){const e=[];let t=0;for(let o=0;o<n.length;o++){let r=n.charCodeAt(o);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&o+1<n.length&&(n.charCodeAt(o+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++o)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},vw=function(n){const e=[];let t=0,o=0;for(;t<n.length;){const r=n[t++];if(r<128)e[o++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[o++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],s=n[t++],c=n[t++],l=((r&7)<<18|(i&63)<<12|(s&63)<<6|c&63)-65536;e[o++]=String.fromCharCode(55296+(l>>10)),e[o++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],s=n[t++];e[o++]=String.fromCharCode((r&15)<<12|(i&63)<<6|s&63)}}return e.join("")},ph={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let r=0;r<n.length;r+=3){const i=n[r],s=r+1<n.length,c=s?n[r+1]:0,l=r+2<n.length,d=l?n[r+2]:0,g=i>>2,f=(i&3)<<4|c>>4;let p=(c&15)<<2|d>>6,v=d&63;l||(v=64,s||(p=64)),o.push(t[g],t[f],t[p],t[v])}return o.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(mh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vw(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const f=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||c==null||d==null||f==null)throw new Ew;const p=i<<2|c>>4;if(o.push(p),d!==64){const v=c<<4&240|d>>2;if(o.push(v),f!==64){const A=d<<6&192|f;o.push(A)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ew extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bw=function(n){const e=mh(n);return ph.encodeByteArray(e,!0)},mi=function(n){return bw(n).replace(/\./g,"")},wh=function(n){try{return ph.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Tw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Iw=()=>Tw().__FIREBASE_DEFAULTS__,Sw=()=>{if(typeof process>"u"||typeof bu>"u")return;const n=bu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Aw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&wh(n[1]);return e&&JSON.parse(e)},Li=()=>{try{return _w()||Iw()||Sw()||Aw()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},yh=n=>Li()?.emulatorHosts?.[n],Dw=n=>{const e=yh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const o=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),o]:[e.substring(0,t),o]},_h=()=>Li()?.config,vh=n=>Li()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,o)=>{t?this.reject(t):this.resolve(o),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,o))}}}/**
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
 */function fo(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Eh(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Rw(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},o=e||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${o}`,aud:o,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[mi(JSON.stringify(t)),mi(JSON.stringify(s)),""].join(".")}const Ko={};function kw(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ko))Ko[e]?n.emulator.push(e):n.prod.push(e);return n}function Nw(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Tu=!1;function bh(n,e){if(typeof window>"u"||typeof document>"u"||!fo(window.location.host)||Ko[n]===e||Ko[n]||Tu)return;Ko[n]=e;function t(p){return`__firebase__banner__${p}`}const o="__firebase__banner",i=kw().prod.length>0;function s(){const p=document.getElementById(o);p&&p.remove()}function c(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function l(p,v){p.setAttribute("width","24"),p.setAttribute("id",v),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function d(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{Tu=!0,s()},p}function g(p,v){p.setAttribute("id",v),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function f(){const p=Nw(o),v=t("text"),A=document.getElementById(v)||document.createElement("span"),R=t("learnmore"),k=document.getElementById(R)||document.createElement("a"),V=t("preprendIcon"),F=document.getElementById(V)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const q=p.element;c(q),g(k,R);const re=d();l(F,V),q.append(F,A,k,re),document.body.appendChild(q)}i?(A.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,A.innerText="Preview backend running in this workspace."),A.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Pw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Le())}function xw(){const n=Li()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Mw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Th(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Bw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ow(){const n=Le();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Uw(){return!xw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ih(){try{return typeof indexedDB=="object"}catch{return!1}}function Sh(){return new Promise((n,e)=>{try{let t=!0;const o="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(o);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(o),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(t){e(t)}})}function Vw(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lw="FirebaseError";class at extends Error{constructor(e,t,o){super(t),this.code=e,this.customData=o,this.name=Lw,Object.setPrototypeOf(this,at.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,In.prototype.create)}}class In{constructor(e,t,o){this.service=e,this.serviceName=t,this.errors=o}create(e,...t){const o=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?Fw(i,o):"Error",c=`${this.serviceName}: ${s} (${r}).`;return new at(r,c,o)}}function Fw(n,e){return n.replace($w,(t,o)=>{const r=e[o];return r!=null?String(r):`<${o}?>`})}const $w=/\{\$([^}]+)}/g;function Gw(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ft(n,e){if(n===e)return!0;const t=Object.keys(n),o=Object.keys(e);for(const r of t){if(!o.includes(r))return!1;const i=n[r],s=e[r];if(Iu(i)&&Iu(s)){if(!ft(i,s))return!1}else if(i!==s)return!1}for(const r of o)if(!t.includes(r))return!1;return!0}function Iu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(n){const e=[];for(const[t,o]of Object.entries(n))Array.isArray(o)?o.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(o));return e.length?"&"+e.join("&"):""}function zw(n,e){const t=new jw(n,e);return t.subscribe.bind(t)}class jw{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(o=>{this.error(o)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,o){let r;if(e===void 0&&t===void 0&&o===void 0)throw new Error("Missing Observer.");qw(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:o},r.next===void 0&&(r.next=Hs),r.error===void 0&&(r.error=Hs),r.complete===void 0&&(r.complete=Hs);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(o){typeof console<"u"&&console.error&&console.error(o)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function qw(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Hs(){}/**
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
 */const Hw=1e3,Ww=2,Kw=14400*1e3,Qw=.5;function Su(n,e=Hw,t=Ww){const o=e*Math.pow(t,n),r=Math.round(Qw*o*(Math.random()-.5)*2);return Math.min(Kw,o+r)}/**
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
 */function he(n){return n&&n._delegate?n._delegate:n}class rt{constructor(e,t,o){this.name=e,this.instanceFactory=t,this.type=o,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ln="[DEFAULT]";/**
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
 */class Yw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const o=new Cw;if(this.instancesDeferred.set(t,o),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&o.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),o=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(o)return null;throw r}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xw(e))try{this.getOrInitializeService({instanceIdentifier:ln})}catch{}for(const[t,o]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});o.resolve(i)}catch{}}}}clearInstance(e=ln){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ln){return this.instances.has(e)}getOptions(e=ln){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(`${this.name}(${o}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:o,options:t});for(const[i,s]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);o===c&&s.resolve(r)}return r}onInit(e,t){const o=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(o)??new Set;r.add(e),this.onInitCallbacks.set(o,r);const i=this.instances.get(o);return i&&e(i,o),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const o=this.onInitCallbacks.get(t);if(o)for(const r of o)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let o=this.instances.get(e);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:Jw(e),options:t}),this.instances.set(e,o),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(o,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,o)}catch{}return o||null}normalizeInstanceIdentifier(e=ln){return this.component?this.component.multipleInstances?e:ln:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jw(n){return n===ln?void 0:n}function Xw(n){return n.instantiationMode==="EAGER"}/**
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
 */class Zw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Yw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));const ey={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},ty=K.INFO,ny={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},oy=(n,e,...t)=>{if(e<n.logLevel)return;const o=new Date().toISOString(),r=ny[e];if(r)console[r](`[${o}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fi{constructor(e){this.name=e,this._logLevel=ty,this._logHandler=oy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ey[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}}const ry=(n,e)=>e.some(t=>n instanceof t);let Au,Du;function iy(){return Au||(Au=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function sy(){return Du||(Du=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ah=new WeakMap,ha=new WeakMap,Dh=new WeakMap,Ws=new WeakMap,Wa=new WeakMap;function ay(n){const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",s)},i=()=>{t($t(n.result)),r()},s=()=>{o(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",s)});return e.then(t=>{t instanceof IDBCursor&&Ah.set(t,n)}).catch(()=>{}),Wa.set(e,n),e}function cy(n){if(ha.has(n))return;const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",s),n.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{o(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",s),n.addEventListener("abort",s)});ha.set(n,e)}let fa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ha.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Dh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return $t(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ly(n){fa=n(fa)}function uy(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const o=n.call(Ks(this),e,...t);return Dh.set(o,e.sort?e.sort():[e]),$t(o)}:sy().includes(n)?function(...e){return n.apply(Ks(this),e),$t(Ah.get(this))}:function(...e){return $t(n.apply(Ks(this),e))}}function dy(n){return typeof n=="function"?uy(n):(n instanceof IDBTransaction&&cy(n),ry(n,iy())?new Proxy(n,fa):n)}function $t(n){if(n instanceof IDBRequest)return ay(n);if(Ws.has(n))return Ws.get(n);const e=dy(n);return e!==n&&(Ws.set(n,e),Wa.set(e,n)),e}const Ks=n=>Wa.get(n);function Ch(n,e,{blocked:t,upgrade:o,blocking:r,terminated:i}={}){const s=indexedDB.open(n,e),c=$t(s);return o&&s.addEventListener("upgradeneeded",l=>{o($t(s.result),l.oldVersion,l.newVersion,$t(s.transaction),l)}),t&&s.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),r&&l.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const hy=["get","getKey","getAll","getAllKeys","count"],fy=["put","add","delete","clear"],Qs=new Map;function Cu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qs.get(e))return Qs.get(e);const t=e.replace(/FromIndex$/,""),o=e!==t,r=fy.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(r||hy.includes(t)))return;const i=async function(s,...c){const l=this.transaction(s,r?"readwrite":"readonly");let d=l.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&l.done]))[0]};return Qs.set(e,i),i}ly(n=>({...n,get:(e,t,o)=>Cu(e,t)||n.get(e,t,o),has:(e,t)=>!!Cu(e,t)||n.has(e,t)}));/**
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
 */class gy{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(my(t)){const o=t.getImmediate();return`${o.library}/${o.version}`}else return null}).filter(t=>t).join(" ")}}function my(n){return n.getComponent()?.type==="VERSION"}const ga="@firebase/app",Ru="0.14.0";/**
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
 */const At=new Fi("@firebase/app"),py="@firebase/app-compat",wy="@firebase/analytics-compat",yy="@firebase/analytics",_y="@firebase/app-check-compat",vy="@firebase/app-check",Ey="@firebase/auth",by="@firebase/auth-compat",Ty="@firebase/database",Iy="@firebase/data-connect",Sy="@firebase/database-compat",Ay="@firebase/functions",Dy="@firebase/functions-compat",Cy="@firebase/installations",Ry="@firebase/installations-compat",ky="@firebase/messaging",Ny="@firebase/messaging-compat",Py="@firebase/performance",xy="@firebase/performance-compat",My="@firebase/remote-config",By="@firebase/remote-config-compat",Oy="@firebase/storage",Uy="@firebase/storage-compat",Vy="@firebase/firestore",Ly="@firebase/ai",Fy="@firebase/firestore-compat",$y="firebase",Gy="12.0.0";/**
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
 */const ma="[DEFAULT]",zy={[ga]:"fire-core",[py]:"fire-core-compat",[yy]:"fire-analytics",[wy]:"fire-analytics-compat",[vy]:"fire-app-check",[_y]:"fire-app-check-compat",[Ey]:"fire-auth",[by]:"fire-auth-compat",[Ty]:"fire-rtdb",[Iy]:"fire-data-connect",[Sy]:"fire-rtdb-compat",[Ay]:"fire-fn",[Dy]:"fire-fn-compat",[Cy]:"fire-iid",[Ry]:"fire-iid-compat",[ky]:"fire-fcm",[Ny]:"fire-fcm-compat",[Py]:"fire-perf",[xy]:"fire-perf-compat",[My]:"fire-rc",[By]:"fire-rc-compat",[Oy]:"fire-gcs",[Uy]:"fire-gcs-compat",[Vy]:"fire-fst",[Fy]:"fire-fst-compat",[Ly]:"fire-vertex","fire-js":"fire-js",[$y]:"fire-js-all"};/**
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
 */const pi=new Map,jy=new Map,pa=new Map;function ku(n,e){try{n.container.addComponent(e)}catch(t){At.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function gt(n){const e=n.name;if(pa.has(e))return At.debug(`There were multiple attempts to register component ${e}.`),!1;pa.set(e,n);for(const t of pi.values())ku(t,n);for(const t of jy.values())ku(t,n);return!0}function Sn(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ze(n){return n==null?!1:n.settings!==void 0}/**
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
 */const qy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Gt=new In("app","Firebase",qy);/**
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
 */class Hy{constructor(e,t,o){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=o,this.container.addComponent(new rt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Gt.create("app-deleted",{appName:this._name})}}/**
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
 */const go=Gy;function Rh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const o={name:ma,automaticDataCollectionEnabled:!0,...e},r=o.name;if(typeof r!="string"||!r)throw Gt.create("bad-app-name",{appName:String(r)});if(t||(t=_h()),!t)throw Gt.create("no-options");const i=pi.get(r);if(i){if(ft(t,i.options)&&ft(o,i.config))return i;throw Gt.create("duplicate-app",{appName:r})}const s=new Zw(r);for(const l of pa.values())s.addComponent(l);const c=new Hy(t,o,s);return pi.set(r,c),c}function Ka(n=ma){const e=pi.get(n);if(!e&&n===ma&&_h())return Rh();if(!e)throw Gt.create("no-app",{appName:n});return e}function Je(n,e,t){let o=zy[n]??n;t&&(o+=`-${t}`);const r=o.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const s=[`Unable to register library "${o}" with version "${e}":`];r&&s.push(`library name "${o}" contains illegal characters (whitespace or "/")`),r&&i&&s.push("and"),i&&s.push(`version name "${e}" contains illegal characters (whitespace or "/")`),At.warn(s.join(" "));return}gt(new rt(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
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
 */const Wy="firebase-heartbeat-database",Ky=1,rr="firebase-heartbeat-store";let Ys=null;function kh(){return Ys||(Ys=Ch(Wy,Ky,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(rr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Gt.create("idb-open",{originalErrorMessage:n.message})})),Ys}async function Qy(n){try{const t=(await kh()).transaction(rr),o=await t.objectStore(rr).get(Nh(n));return await t.done,o}catch(e){if(e instanceof at)At.warn(e.message);else{const t=Gt.create("idb-get",{originalErrorMessage:e?.message});At.warn(t.message)}}}async function Nu(n,e){try{const o=(await kh()).transaction(rr,"readwrite");await o.objectStore(rr).put(e,Nh(n)),await o.done}catch(t){if(t instanceof at)At.warn(t.message);else{const o=Gt.create("idb-set",{originalErrorMessage:t?.message});At.warn(o.message)}}}function Nh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Yy=1024,Jy=30;class Xy{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new e_(t),this._heartbeatsCachePromise=this._storage.read().then(o=>(this._heartbeatsCache=o,o))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Pu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(r=>r.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:t}),this._heartbeatsCache.heartbeats.length>Jy){const r=t_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){At.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Pu(),{heartbeatsToSend:t,unsentEntries:o}=Zy(this._heartbeatsCache.heartbeats),r=mi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return At.warn(e),""}}}function Pu(){return new Date().toISOString().substring(0,10)}function Zy(n,e=Yy){const t=[];let o=n.slice();for(const r of n){const i=t.find(s=>s.agent===r.agent);if(i){if(i.dates.push(r.date),xu(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),xu(t)>e){t.pop();break}o=o.slice(1)}return{heartbeatsToSend:t,unsentEntries:o}}class e_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ih()?Sh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Qy(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return Nu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return Nu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function xu(n){return mi(JSON.stringify({version:2,heartbeats:n})).length}function t_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let o=1;o<n.length;o++)n[o].date<t&&(t=n[o].date,e=o);return e}/**
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
 */function n_(n){gt(new rt("platform-logger",e=>new gy(e),"PRIVATE")),gt(new rt("heartbeat",e=>new Xy(e),"PRIVATE")),Je(ga,Ru,n),Je(ga,Ru,"esm2020"),Je("fire-js","")}n_("");var o_="firebase",r_="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Je(o_,r_,"app");function Ph(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const i_=Ph,xh=new In("auth","Firebase",Ph());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi=new Fi("@firebase/auth");function s_(n,...e){wi.logLevel<=K.WARN&&wi.warn(`Auth (${go}): ${n}`,...e)}function ii(n,...e){wi.logLevel<=K.ERROR&&wi.error(`Auth (${go}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(n,...e){throw Ya(n,...e)}function tt(n,...e){return Ya(n,...e)}function Qa(n,e,t){const o={...i_(),[e]:t};return new In("auth","Firebase",o).create(e,{appName:n.name})}function pn(n){return Qa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function a_(n,e,t){const o=t;if(!(e instanceof o))throw o.name!==e.constructor.name&&mt(n,"argument-error"),Qa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ya(n,...e){if(typeof n!="string"){const t=e[0],o=[...e.slice(1)];return o[0]&&(o[0].appName=n.name),n._errorFactory.create(t,...o)}return xh.create(n,...e)}function z(n,e,...t){if(!n)throw Ya(e,...t)}function bt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ii(e),new Error(e)}function Dt(n,e){n||bt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(){return typeof self<"u"&&self.location?.href||""}function c_(){return Mu()==="http:"||Mu()==="https:"}function Mu(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(c_()||Th()||"connection"in navigator)?navigator.onLine:!0}function u_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Dt(t>e,"Short delay should be less than long delay!"),this.isMobile=Pw()||Bw()}get(){return l_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(n,e){Dt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mh{static initialize(e,t,o){this.fetchImpl=e,t&&(this.headersImpl=t),o&&(this.responseImpl=o)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;bt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;bt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;bt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],f_=new fr(3e4,6e4);function Xa(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function mo(n,e,t,o,r={}){return Bh(n,r,async()=>{let i={},s={};o&&(e==="GET"?s=o:i={body:JSON.stringify(o)});const c=hr({key:n.config.apiKey,...s}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:l,...i};return Mw()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&fo(n.emulatorConfig.host)&&(d.credentials="include"),Mh.fetch()(await Oh(n,n.config.apiHost,t,c),d)})}async function Bh(n,e,t){n._canInitEmulator=!1;const o={...d_,...e};try{const r=new m_(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw Qr(n,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const c=i.ok?s.errorMessage:s.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Qr(n,"credential-already-in-use",s);if(l==="EMAIL_EXISTS")throw Qr(n,"email-already-in-use",s);if(l==="USER_DISABLED")throw Qr(n,"user-disabled",s);const g=o[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Qa(n,g,d);mt(n,g)}}catch(r){if(r instanceof at)throw r;mt(n,"network-request-failed",{message:String(r)})}}async function g_(n,e,t,o,r={}){const i=await mo(n,e,t,o,r);return"mfaPendingCredential"in i&&mt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Oh(n,e,t,o){const r=`${e}${t}?${o}`,i=n,s=i.config.emulator?Ja(n.config,r):`${n.config.apiScheme}://${r}`;return h_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(s).toString():s}class m_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,o)=>{this.timer=setTimeout(()=>o(tt(this.auth,"network-request-failed")),f_.get())})}}function Qr(n,e,t){const o={appName:n.name};t.email&&(o.email=t.email),t.phoneNumber&&(o.phoneNumber=t.phoneNumber);const r=tt(n,e,o);return r.customData._tokenResponse=t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function p_(n,e){return mo(n,"POST","/v1/accounts:delete",e)}async function yi(n,e){return mo(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function w_(n,e=!1){const t=he(n),o=await t.getIdToken(e),r=Za(o);z(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,s=i?.sign_in_provider;return{claims:r,token:o,authTime:Qo(Js(r.auth_time)),issuedAtTime:Qo(Js(r.iat)),expirationTime:Qo(Js(r.exp)),signInProvider:s||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Js(n){return Number(n)*1e3}function Za(n){const[e,t,o]=n.split(".");if(e===void 0||t===void 0||o===void 0)return ii("JWT malformed, contained fewer than 3 sections"),null;try{const r=wh(t);return r?JSON.parse(r):(ii("Failed to decode base64 JWT payload"),null)}catch(r){return ii("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Bu(n){const e=Za(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ir(n,e,t=!1){if(t)return e;try{return await e}catch(o){throw o instanceof at&&y_(o)&&n.auth.currentUser===n&&await n.auth.signOut(),o}}function y_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const o=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qo(this.lastLoginAt),this.creationTime=Qo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function _i(n){const e=n.auth,t=await n.getIdToken(),o=await ir(n,yi(e,{idToken:t}));z(o?.users.length,e,"internal-error");const r=o.users[0];n._notifyReloadListener(r);const i=r.providerUserInfo?.length?Uh(r.providerUserInfo):[],s=E_(n.providerData,i),c=n.isAnonymous,l=!(n.email&&r.passwordHash)&&!s?.length,d=c?l:!1,g={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new ya(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,g)}async function v_(n){const e=he(n);await _i(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function E_(n,e){return[...n.filter(o=>!e.some(r=>r.providerId===o.providerId)),...e]}function Uh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function b_(n,e){const t=await Bh(n,{},async()=>{const o=hr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,s=await Oh(n,r,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:o};return n.emulatorConfig&&fo(n.emulatorConfig.host)&&(l.credentials="include"),Mh.fetch()(s,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function T_(n,e){return mo(n,"POST","/v2/accounts:revokeToken",Xa(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Bu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=Bu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:o,refreshToken:r,expiresIn:i}=await b_(e,t);this.updateTokensAndExpiration(o,r,Number(i))}updateTokensAndExpiration(e,t,o){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+o*1e3}static fromJSON(e,t){const{refreshToken:o,accessToken:r,expirationTime:i}=t,s=new Gn;return o&&(z(typeof o=="string","internal-error",{appName:e}),s.refreshToken=o),r&&(z(typeof r=="string","internal-error",{appName:e}),s.accessToken=r),i&&(z(typeof i=="number","internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gn,this.toJSON())}_performRefresh(){return bt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class et{constructor({uid:e,auth:t,stsTokenManager:o,...r}){this.providerId="firebase",this.proactiveRefresh=new __(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ya(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await ir(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return w_(this,e)}reload(){return v_(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new et({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let o=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),o=!0),t&&await _i(this),await this.auth._persistUserIfCurrent(this),o&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ze(this.auth.app))return Promise.reject(pn(this.auth));const e=await this.getIdToken();return await ir(this,p_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const o=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,g=t.lastLoginAt??void 0,{uid:f,emailVerified:p,isAnonymous:v,providerData:A,stsTokenManager:R}=t;z(f&&R,e,"internal-error");const k=Gn.fromJSON(this.name,R);z(typeof f=="string",e,"internal-error"),Bt(o,e.name),Bt(r,e.name),z(typeof p=="boolean",e,"internal-error"),z(typeof v=="boolean",e,"internal-error"),Bt(i,e.name),Bt(s,e.name),Bt(c,e.name),Bt(l,e.name),Bt(d,e.name),Bt(g,e.name);const V=new et({uid:f,auth:e,email:r,emailVerified:p,displayName:o,isAnonymous:v,photoURL:s,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:d,lastLoginAt:g});return A&&Array.isArray(A)&&(V.providerData=A.map(F=>({...F}))),l&&(V._redirectEventId=l),V}static async _fromIdTokenResponse(e,t,o=!1){const r=new Gn;r.updateFromServerResponse(t);const i=new et({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:o});return await _i(i),i}static async _fromGetAccountInfoResponse(e,t,o){const r=t.users[0];z(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Uh(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!i?.length,c=new Gn;c.updateFromIdToken(o);const l=new et({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:s}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new ya(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou=new Map;function Tt(n){Dt(n instanceof Function,"Expected a class definition");let e=Ou.get(n);return e?(Dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ou.set(n,e),e)}/**
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
 */class Vh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Vh.type="NONE";const Uu=Vh;/**
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
 */function si(n,e,t){return`firebase:${n}:${e}:${t}`}class zn{constructor(e,t,o){this.persistence=e,this.auth=t,this.userKey=o;const{config:r,name:i}=this.auth;this.fullUserKey=si(this.userKey,r.apiKey,i),this.fullPersistenceKey=si("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await yi(this.auth,{idToken:e}).catch(()=>{});return t?et._fromGetAccountInfoResponse(this.auth,t,e):null}return et._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,o="authUser"){if(!t.length)return new zn(Tt(Uu),e,o);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=r[0]||Tt(Uu);const s=si(o,e.config.apiKey,e.name);let c=null;for(const d of t)try{const g=await d._get(s);if(g){let f;if(typeof g=="string"){const p=await yi(e,{idToken:g}).catch(()=>{});if(!p)break;f=await et._fromGetAccountInfoResponse(e,p,g)}else f=et._fromJSON(e,g);d!==i&&(c=f),i=d;break}}catch{}const l=r.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new zn(i,e,o):(i=l[0],c&&await i._set(s,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(s)}catch{}})),new zn(i,e,o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Lh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jh(e))return"Blackberry";if(qh(e))return"Webos";if(Fh(e))return"Safari";if((e.includes("chrome/")||$h(e))&&!e.includes("edge/"))return"Chrome";if(zh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,o=n.match(t);if(o?.length===2)return o[1]}return"Other"}function Lh(n=Le()){return/firefox\//i.test(n)}function Fh(n=Le()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $h(n=Le()){return/crios\//i.test(n)}function Gh(n=Le()){return/iemobile/i.test(n)}function zh(n=Le()){return/android/i.test(n)}function jh(n=Le()){return/blackberry/i.test(n)}function qh(n=Le()){return/webos/i.test(n)}function ec(n=Le()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function I_(n=Le()){return ec(n)&&!!window.navigator?.standalone}function S_(){return Ow()&&document.documentMode===10}function Hh(n=Le()){return ec(n)||zh(n)||qh(n)||jh(n)||/windows phone/i.test(n)||Gh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wh(n,e=[]){let t;switch(n){case"Browser":t=Vu(Le());break;case"Worker":t=`${Vu(Le())}-${n}`;break;default:t=n}const o=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${go}/${o}`}/**
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
 */class A_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const o=i=>new Promise((s,c)=>{try{const l=e(i);s(l)}catch(l){c(l)}});o.onAbort=t,this.queue.push(o);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const o of this.queue)await o(e),o.onAbort&&t.push(o.onAbort)}catch(o){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:o?.message})}}}/**
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
 */async function D_(n,e={}){return mo(n,"GET","/v2/passwordPolicy",Xa(n,e))}/**
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
 */const C_=6;class R_{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??C_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const o=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;o&&(t.meetsMinPasswordLength=e.length>=o),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let o;for(let r=0;r<e.length;r++)o=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,o>="a"&&o<="z",o>="A"&&o<="Z",o>="0"&&o<="9",this.allowedNonAlphanumericCharacters.includes(o))}updatePasswordCharacterOptionsStatuses(e,t,o,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=o)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e,t,o,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=o,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Lu(this),this.idTokenSubscription=new Lu(this),this.beforeStateQueue=new A_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Tt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await zn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await yi(this,{idToken:e}),o=await et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(o)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ze(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(s=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(s,s))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let o=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,s=o?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===s)&&c?.user&&(o=c.user,r=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(o)}catch(i){o=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await _i(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=u_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ze(this.app))return Promise.reject(pn(this));const t=e?he(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ze(this.app)?Promise.reject(pn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ze(this.app)?Promise.reject(pn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Tt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await D_(this),t=new R_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new In("auth","Firebase",e())}onAuthStateChanged(e,t,o){return this.registerStateListener(this.authStateSubscription,e,t,o)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,o){return this.registerStateListener(this.idTokenSubscription,e,t,o)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const o=this.onAuthStateChanged(()=>{o(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),o={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(o.tenantId=this.tenantId),await T_(this,o)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const o=await this.getOrInitRedirectPersistenceManager(t);return e===null?o.removeCurrentUser():o.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Tt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await zn.create(this,[Tt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,o,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let s=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{s||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,o,r);return()=>{s=!0,l()}}else{const l=e.addObserver(t);return()=>{s=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Wh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const o=await this._getAppCheckToken();return o&&(e["X-Firebase-AppCheck"]=o),e}async _getAppCheckToken(){if(Ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&s_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function $i(n){return he(n)}class Lu{constructor(e){this.auth=e,this.observer=null,this.addObserver=zw(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function N_(n){tc=n}function P_(n){return tc.loadJS(n)}function x_(){return tc.gapiScript}function M_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B_(n,e){const t=Sn(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(ft(i,e??{}))return r;mt(r,"already-initialized")}return t.initialize({options:e})}function O_(n,e){const t=e?.persistence||[],o=(Array.isArray(t)?t:[t]).map(Tt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(o,e?.popupRedirectResolver)}function U_(n,e,t){const o=$i(n);z(/^https?:\/\//.test(e),o,"invalid-emulator-scheme");const r=!1,i=Kh(e),{host:s,port:c}=V_(e),l=c===null?"":`:${c}`,d={url:`${i}//${s}${l}/`},g=Object.freeze({host:s,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!o._canInitEmulator){z(o.config.emulator&&o.emulatorConfig,o,"emulator-config-failed"),z(ft(d,o.config.emulator)&&ft(g,o.emulatorConfig),o,"emulator-config-failed");return}o.config.emulator=d,o.emulatorConfig=g,o.settings.appVerificationDisabledForTesting=!0,fo(s)?(Eh(`${i}//${s}${l}`),bh("Auth",!0)):L_()}function Kh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function V_(n){const e=Kh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const o=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(o);if(r){const i=r[1];return{host:i,port:Fu(o.substr(i.length+1))}}else{const[i,s]=o.split(":");return{host:i,port:Fu(s)}}}function Fu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function L_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return bt("not implemented")}_getIdTokenResponse(e){return bt("not implemented")}_linkToIdToken(e,t){return bt("not implemented")}_getReauthenticationResolver(e){return bt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jn(n,e){return g_(n,"POST","/v1/accounts:signInWithIdp",Xa(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_="http://localhost";class yn extends Qh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new yn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):mt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:o,signInMethod:r,...i}=t;if(!o||!r)return null;const s=new yn(o,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const t=this.buildRequest();return jn(e,t)}_linkToIdToken(e,t){const o=this.buildRequest();return o.idToken=t,jn(e,o)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,jn(e,t)}buildRequest(){const e={requestUri:F_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=hr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class gr extends nc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends gr{constructor(){super("facebook.com")}static credential(e){return yn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ot.credential(e.oauthAccessToken)}catch{return null}}}Ot.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ot.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends gr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return yn._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:o}=e;if(!t&&!o)return null;try{return Ut.credential(t,o)}catch{return null}}}Ut.GOOGLE_SIGN_IN_METHOD="google.com";Ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends gr{constructor(){super("github.com")}static credential(e){return yn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.GITHUB_SIGN_IN_METHOD="github.com";Vt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends gr{constructor(){super("twitter.com")}static credential(e,t){return yn._fromParams({providerId:Lt.PROVIDER_ID,signInMethod:Lt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Lt.credentialFromTaggedObject(e)}static credentialFromError(e){return Lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:o}=e;if(!t||!o)return null;try{return Lt.credential(t,o)}catch{return null}}}Lt.TWITTER_SIGN_IN_METHOD="twitter.com";Lt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,o,r=!1){const i=await et._fromIdTokenResponse(e,o,r),s=$u(o);return new Qn({user:i,providerId:s,_tokenResponse:o,operationType:t})}static async _forOperation(e,t,o){await e._updateTokensIfNecessary(o,!0);const r=$u(o);return new Qn({user:e,providerId:r,_tokenResponse:o,operationType:t})}}function $u(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends at{constructor(e,t,o,r){super(t.code,t.message),this.operationType=o,this.user=r,Object.setPrototypeOf(this,vi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:o}}static _fromErrorAndOperation(e,t,o,r){return new vi(e,t,o,r)}}function Yh(n,e,t,o){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?vi._fromErrorAndOperation(n,i,e,o):i})}async function $_(n,e,t=!1){const o=await ir(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Qn._forOperation(n,"link",o)}/**
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
 */async function G_(n,e,t=!1){const{auth:o}=n;if(Ze(o.app))return Promise.reject(pn(o));const r="reauthenticate";try{const i=await ir(n,Yh(o,r,e,n),t);z(i.idToken,o,"internal-error");const s=Za(i.idToken);z(s,o,"internal-error");const{sub:c}=s;return z(n.uid===c,o,"user-mismatch"),Qn._forOperation(n,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&mt(o,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z_(n,e,t=!1){if(Ze(n.app))return Promise.reject(pn(n));const o="signIn",r=await Yh(n,o,e),i=await Qn._fromIdTokenResponse(n,o,r);return t||await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(n,e){return he(n).setPersistence(e)}function q_(n,e,t,o){return he(n).onIdTokenChanged(e,t,o)}function H_(n,e,t){return he(n).beforeAuthStateChanged(e,t)}function W_(n,e,t,o){return he(n).onAuthStateChanged(e,t,o)}const Ei="__sak";/**
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
 */class Jh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ei,"1"),this.storage.removeItem(Ei),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K_=1e3,Q_=10;class Xh extends Jh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Hh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const o=this.storage.getItem(t),r=this.localCache[t];o!==r&&e(t,r,o)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((s,c,l)=>{this.notifyListeners(s,l)});return}const o=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const s=this.storage.getItem(o);!t&&this.localCache[o]===s||this.notifyListeners(o,s)},i=this.storage.getItem(o);S_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Q_):r()}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,o)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:o}),!0)})},K_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Xh.type="LOCAL";const Zh=Xh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef extends Jh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ef.type="SESSION";const tf=ef;/**
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
 */function Y_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Gi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const o=new Gi(e);return this.receivers.push(o),o}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:o,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:o,eventType:r});const c=Array.from(s).map(async d=>d(t.origin,i)),l=await Y_(c);t.ports[0].postMessage({status:"done",eventId:o,eventType:r,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Gi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oc(n="",e=10){let t="";for(let o=0;o<e;o++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class J_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,o=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((c,l)=>{const d=oc("",20);r.port1.start();const g=setTimeout(()=>{l(new Error("unsupported_event"))},o);s={messageChannel:r,onMessage(f){const p=f;if(p.data.eventId===d)switch(p.data.status){case"ack":clearTimeout(g),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(p.data.response);break;default:clearTimeout(g),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(){return window}function X_(n){ut().location.href=n}/**
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
 */function nf(){return typeof ut().WorkerGlobalScope<"u"&&typeof ut().importScripts=="function"}async function Z_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ev(){return navigator?.serviceWorker?.controller||null}function tv(){return nf()?self:null}/**
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
 */const of="firebaseLocalStorageDb",nv=1,bi="firebaseLocalStorage",rf="fbase_key";class mr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function zi(n,e){return n.transaction([bi],e?"readwrite":"readonly").objectStore(bi)}function ov(){const n=indexedDB.deleteDatabase(of);return new mr(n).toPromise()}function _a(){const n=indexedDB.open(of,nv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const o=n.result;try{o.createObjectStore(bi,{keyPath:rf})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const o=n.result;o.objectStoreNames.contains(bi)?e(o):(o.close(),await ov(),e(await _a()))})})}async function Gu(n,e,t){const o=zi(n,!0).put({[rf]:e,value:t});return new mr(o).toPromise()}async function rv(n,e){const t=zi(n,!1).get(e),o=await new mr(t).toPromise();return o===void 0?null:o.value}function zu(n,e){const t=zi(n,!0).delete(e);return new mr(t).toPromise()}const iv=800,sv=3;class sf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _a(),this.db)}async _withRetries(e){let t=0;for(;;)try{const o=await this._openDb();return await e(o)}catch(o){if(t++>sv)throw o;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return nf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Gi._getInstance(tv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Z_(),!this.activeServiceWorker)return;this.sender=new J_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ev()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _a();return await Gu(e,Ei,"1"),await zu(e,Ei),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(o=>Gu(o,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(o=>rv(o,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=zi(r,!1).getAll();return new mr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],o=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)o.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!o.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),iv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}sf.type="LOCAL";const av=sf;new fr(3e4,6e4);/**
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
 */function af(n,e){return e?Tt(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class rc extends Qh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return jn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return jn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return jn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function cv(n){return z_(n.auth,new rc(n),n.bypassAuthState)}function lv(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),G_(t,new rc(n),n.bypassAuthState)}async function uv(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),$_(t,new rc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(e,t,o,r,i=!1){this.auth=e,this.resolver=o,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(o){this.reject(o)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:o,postBody:r,tenantId:i,error:s,type:c}=e;if(s){this.reject(s);return}const l={auth:this.auth,requestUri:t,sessionId:o,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cv;case"linkViaPopup":case"linkViaRedirect":return uv;case"reauthViaPopup":case"reauthViaRedirect":return lv;default:mt(this.auth,"internal-error")}}resolve(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dv=new fr(2e3,1e4);async function FA(n,e,t){if(Ze(n.app))return Promise.reject(tt(n,"operation-not-supported-in-this-environment"));const o=$i(n);a_(n,e,nc);const r=af(o,t);return new hn(o,"signInViaPopup",e,r).executeNotNull()}class hn extends cf{constructor(e,t,o,r,i){super(e,t,r,i),this.provider=o,this.authWindow=null,this.pollId=null,hn.currentPopupAction&&hn.currentPopupAction.cancel(),hn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){Dt(this.filter.length===1,"Popup operations only handle one event");const e=oc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,hn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,dv.get())};e()}}hn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv="pendingRedirect",ai=new Map;class fv extends cf{constructor(e,t,o=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,o),this.eventId=null}async execute(){let e=ai.get(this.auth._key());if(!e){try{const o=await gv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(o)}catch(t){e=()=>Promise.reject(t)}ai.set(this.auth._key(),e)}return this.bypassAuthState||ai.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gv(n,e){const t=wv(e),o=pv(n);if(!await o._isAvailable())return!1;const r=await o._get(t)==="true";return await o._remove(t),r}function mv(n,e){ai.set(n._key(),e)}function pv(n){return Tt(n._redirectPersistence)}function wv(n){return si(hv,n.config.apiKey,n.name)}async function yv(n,e,t=!1){if(Ze(n.app))return Promise.reject(pn(n));const o=$i(n),r=af(o,e),s=await new fv(o,r,t).execute();return s&&!t&&(delete s.user._redirectEventId,await o._persistUserIfCurrent(s.user),await o._setRedirectUser(null,e)),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _v=600*1e3;class vv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(o=>{this.isEventForConsumer(e,o)&&(t=!0,this.sendToConsumer(e,o),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ev(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!lf(e)){const o=e.error.code?.split("auth/")[1]||"internal-error";t.onError(tt(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const o=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&o}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_v&&this.cachedEventUids.clear(),this.cachedEventUids.has(ju(e))}saveEventToCache(e){this.cachedEventUids.add(ju(e)),this.lastProcessedEventTime=Date.now()}}function ju(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function lf({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Ev(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return lf(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bv(n,e={}){return mo(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Iv=/^https?/;async function Sv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bv(n);for(const t of e)try{if(Av(t))return}catch{}mt(n,"unauthorized-domain")}function Av(n){const e=wa(),{protocol:t,hostname:o}=new URL(e);if(n.startsWith("chrome-extension://")){const s=new URL(n);return s.hostname===""&&o===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&s.hostname===o}if(!Iv.test(t))return!1;if(Tv.test(n))return o===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(o)}/**
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
 */const Dv=new fr(3e4,6e4);function qu(){const n=ut().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Cv(n){return new Promise((e,t)=>{function o(){qu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qu(),t(tt(n,"network-request-failed"))},timeout:Dv.get()})}if(ut().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ut().gapi?.load)o();else{const r=M_("iframefcb");return ut()[r]=()=>{gapi.load?o():t(tt(n,"network-request-failed"))},P_(`${x_()}?onload=${r}`).catch(i=>t(i))}}).catch(e=>{throw ci=null,e})}let ci=null;function Rv(n){return ci=ci||Cv(n),ci}/**
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
 */const kv=new fr(5e3,15e3),Nv="__/auth/iframe",Pv="emulator/auth/iframe",xv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Mv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bv(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ja(e,Pv):`https://${n.config.authDomain}/${Nv}`,o={apiKey:e.apiKey,appName:n.name,v:go},r=Mv.get(n.config.apiHost);r&&(o.eid=r);const i=n._getFrameworks();return i.length&&(o.fw=i.join(",")),`${t}?${hr(o).slice(1)}`}async function Ov(n){const e=await Rv(n),t=ut().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:Bv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:xv,dontclear:!0},o=>new Promise(async(r,i)=>{await o.restyle({setHideOnLeave:!1});const s=tt(n,"network-request-failed"),c=ut().setTimeout(()=>{i(s)},kv.get());function l(){ut().clearTimeout(c),r(o)}o.ping(l).then(l,()=>{i(s)})}))}/**
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
 */const Uv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Vv=500,Lv=600,Fv="_blank",$v="http://localhost";class Hu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Gv(n,e,t,o=Vv,r=Lv){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),s=Math.max((window.screen.availWidth-o)/2,0).toString();let c="";const l={...Uv,width:o.toString(),height:r.toString(),top:i,left:s},d=Le().toLowerCase();t&&(c=$h(d)?Fv:t),Lh(d)&&(e=e||$v,l.scrollbars="yes");const g=Object.entries(l).reduce((p,[v,A])=>`${p}${v}=${A},`,"");if(I_(d)&&c!=="_self")return zv(e||"",c),new Hu(null);const f=window.open(e||"",c,g);z(f,n,"popup-blocked");try{f.focus()}catch{}return new Hu(f)}function zv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const o=document.createEvent("MouseEvent");o.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(o)}/**
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
 */const jv="__/auth/handler",qv="emulator/auth/handler",Hv=encodeURIComponent("fac");async function Wu(n,e,t,o,r,i){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const s={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:o,v:go,eventId:r};if(e instanceof nc){e.setDefaultLanguage(n.languageCode),s.providerId=e.providerId||"",Gw(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[g,f]of Object.entries({}))s[g]=f}if(e instanceof gr){const g=e.getScopes().filter(f=>f!=="");g.length>0&&(s.scopes=g.join(","))}n.tenantId&&(s.tid=n.tenantId);const c=s;for(const g of Object.keys(c))c[g]===void 0&&delete c[g];const l=await n._getAppCheckToken(),d=l?`#${Hv}=${encodeURIComponent(l)}`:"";return`${Wv(n)}?${hr(c).slice(1)}${d}`}function Wv({config:n}){return n.emulator?Ja(n,qv):`https://${n.authDomain}/${jv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs="webStorageSupport";class Kv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=tf,this._completeRedirectFn=yv,this._overrideRedirectResult=mv}async _openPopup(e,t,o,r){Dt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Wu(e,t,o,wa(),r);return Gv(e,i,oc())}async _openRedirect(e,t,o,r){await this._originValidation(e);const i=await Wu(e,t,o,wa(),r);return X_(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(Dt(i,"If manager is not set, promise should be"),i)}const o=this.initAndGetManager(e);return this.eventManagers[t]={promise:o},o.catch(()=>{delete this.eventManagers[t]}),o}async initAndGetManager(e){const t=await Ov(e),o=new vv(e);return t.register("authEvent",r=>(z(r?.authEvent,e,"invalid-auth-event"),{status:o.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:o},this.iframes[e._key()]=t,o}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Xs,{type:Xs},r=>{const i=r?.[0]?.[Xs];i!==void 0&&t(!!i),mt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Sv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Hh()||Fh()||ec()}}const Qv=Kv;var Ku="@firebase/auth",Qu="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(o=>{e(o?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Xv(n){gt(new rt("auth",(e,{options:t})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:s,authDomain:c}=o.options;z(s&&!s.includes(":"),"invalid-api-key",{appName:o.name});const l={apiKey:s,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Wh(n)},d=new k_(o,r,i,l);return O_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,o)=>{e.getProvider("auth-internal").initialize()})),gt(new rt("auth-internal",e=>{const t=$i(e.getProvider("auth").getImmediate());return(o=>new Yv(o))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Je(Ku,Qu,Jv(n)),Je(Ku,Qu,"esm2020")}/**
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
 */const Zv=300,eE=vh("authIdTokenMaxAge")||Zv;let Yu=null;const tE=n=>async e=>{const t=e&&await e.getIdTokenResult(),o=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(o&&o>eE)return;const r=t?.token;Yu!==r&&(Yu=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function nE(n=Ka()){const e=Sn(n,"auth");if(e.isInitialized())return e.getImmediate();const t=B_(n,{popupRedirectResolver:Qv,persistence:[av,Zh,tf]}),o=vh("authTokenSyncURL");if(o&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(o,location.origin);if(location.origin===i.origin){const s=tE(i.toString());H_(t,s,()=>s(t.currentUser)),q_(t,c=>s(c))}}const r=yh("auth");return r&&U_(t,`http://${r}`),t}function oE(){return document.getElementsByTagName("head")?.[0]??document}N_({loadJS(n){return new Promise((e,t)=>{const o=document.createElement("script");o.setAttribute("src",n),o.onload=e,o.onerror=r=>{const i=tt("internal-error");i.customData=r,t(i)},o.type="text/javascript",o.charset="UTF-8",oE().appendChild(o)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Xv("Browser");var Ju=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zt,uf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,w){function _(){}_.prototype=w.prototype,T.D=w.prototype,T.prototype=new _,T.prototype.constructor=T,T.C=function(E,b,S){for(var y=Array(arguments.length-2),yt=2;yt<arguments.length;yt++)y[yt-2]=arguments[yt];return w.prototype[b].apply(E,y)}}function t(){this.blockSize=-1}function o(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(o,t),o.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(T,w,_){_||(_=0);var E=Array(16);if(typeof w=="string")for(var b=0;16>b;++b)E[b]=w.charCodeAt(_++)|w.charCodeAt(_++)<<8|w.charCodeAt(_++)<<16|w.charCodeAt(_++)<<24;else for(b=0;16>b;++b)E[b]=w[_++]|w[_++]<<8|w[_++]<<16|w[_++]<<24;w=T.g[0],_=T.g[1],b=T.g[2];var S=T.g[3],y=w+(S^_&(b^S))+E[0]+3614090360&4294967295;w=_+(y<<7&4294967295|y>>>25),y=S+(b^w&(_^b))+E[1]+3905402710&4294967295,S=w+(y<<12&4294967295|y>>>20),y=b+(_^S&(w^_))+E[2]+606105819&4294967295,b=S+(y<<17&4294967295|y>>>15),y=_+(w^b&(S^w))+E[3]+3250441966&4294967295,_=b+(y<<22&4294967295|y>>>10),y=w+(S^_&(b^S))+E[4]+4118548399&4294967295,w=_+(y<<7&4294967295|y>>>25),y=S+(b^w&(_^b))+E[5]+1200080426&4294967295,S=w+(y<<12&4294967295|y>>>20),y=b+(_^S&(w^_))+E[6]+2821735955&4294967295,b=S+(y<<17&4294967295|y>>>15),y=_+(w^b&(S^w))+E[7]+4249261313&4294967295,_=b+(y<<22&4294967295|y>>>10),y=w+(S^_&(b^S))+E[8]+1770035416&4294967295,w=_+(y<<7&4294967295|y>>>25),y=S+(b^w&(_^b))+E[9]+2336552879&4294967295,S=w+(y<<12&4294967295|y>>>20),y=b+(_^S&(w^_))+E[10]+4294925233&4294967295,b=S+(y<<17&4294967295|y>>>15),y=_+(w^b&(S^w))+E[11]+2304563134&4294967295,_=b+(y<<22&4294967295|y>>>10),y=w+(S^_&(b^S))+E[12]+1804603682&4294967295,w=_+(y<<7&4294967295|y>>>25),y=S+(b^w&(_^b))+E[13]+4254626195&4294967295,S=w+(y<<12&4294967295|y>>>20),y=b+(_^S&(w^_))+E[14]+2792965006&4294967295,b=S+(y<<17&4294967295|y>>>15),y=_+(w^b&(S^w))+E[15]+1236535329&4294967295,_=b+(y<<22&4294967295|y>>>10),y=w+(b^S&(_^b))+E[1]+4129170786&4294967295,w=_+(y<<5&4294967295|y>>>27),y=S+(_^b&(w^_))+E[6]+3225465664&4294967295,S=w+(y<<9&4294967295|y>>>23),y=b+(w^_&(S^w))+E[11]+643717713&4294967295,b=S+(y<<14&4294967295|y>>>18),y=_+(S^w&(b^S))+E[0]+3921069994&4294967295,_=b+(y<<20&4294967295|y>>>12),y=w+(b^S&(_^b))+E[5]+3593408605&4294967295,w=_+(y<<5&4294967295|y>>>27),y=S+(_^b&(w^_))+E[10]+38016083&4294967295,S=w+(y<<9&4294967295|y>>>23),y=b+(w^_&(S^w))+E[15]+3634488961&4294967295,b=S+(y<<14&4294967295|y>>>18),y=_+(S^w&(b^S))+E[4]+3889429448&4294967295,_=b+(y<<20&4294967295|y>>>12),y=w+(b^S&(_^b))+E[9]+568446438&4294967295,w=_+(y<<5&4294967295|y>>>27),y=S+(_^b&(w^_))+E[14]+3275163606&4294967295,S=w+(y<<9&4294967295|y>>>23),y=b+(w^_&(S^w))+E[3]+4107603335&4294967295,b=S+(y<<14&4294967295|y>>>18),y=_+(S^w&(b^S))+E[8]+1163531501&4294967295,_=b+(y<<20&4294967295|y>>>12),y=w+(b^S&(_^b))+E[13]+2850285829&4294967295,w=_+(y<<5&4294967295|y>>>27),y=S+(_^b&(w^_))+E[2]+4243563512&4294967295,S=w+(y<<9&4294967295|y>>>23),y=b+(w^_&(S^w))+E[7]+1735328473&4294967295,b=S+(y<<14&4294967295|y>>>18),y=_+(S^w&(b^S))+E[12]+2368359562&4294967295,_=b+(y<<20&4294967295|y>>>12),y=w+(_^b^S)+E[5]+4294588738&4294967295,w=_+(y<<4&4294967295|y>>>28),y=S+(w^_^b)+E[8]+2272392833&4294967295,S=w+(y<<11&4294967295|y>>>21),y=b+(S^w^_)+E[11]+1839030562&4294967295,b=S+(y<<16&4294967295|y>>>16),y=_+(b^S^w)+E[14]+4259657740&4294967295,_=b+(y<<23&4294967295|y>>>9),y=w+(_^b^S)+E[1]+2763975236&4294967295,w=_+(y<<4&4294967295|y>>>28),y=S+(w^_^b)+E[4]+1272893353&4294967295,S=w+(y<<11&4294967295|y>>>21),y=b+(S^w^_)+E[7]+4139469664&4294967295,b=S+(y<<16&4294967295|y>>>16),y=_+(b^S^w)+E[10]+3200236656&4294967295,_=b+(y<<23&4294967295|y>>>9),y=w+(_^b^S)+E[13]+681279174&4294967295,w=_+(y<<4&4294967295|y>>>28),y=S+(w^_^b)+E[0]+3936430074&4294967295,S=w+(y<<11&4294967295|y>>>21),y=b+(S^w^_)+E[3]+3572445317&4294967295,b=S+(y<<16&4294967295|y>>>16),y=_+(b^S^w)+E[6]+76029189&4294967295,_=b+(y<<23&4294967295|y>>>9),y=w+(_^b^S)+E[9]+3654602809&4294967295,w=_+(y<<4&4294967295|y>>>28),y=S+(w^_^b)+E[12]+3873151461&4294967295,S=w+(y<<11&4294967295|y>>>21),y=b+(S^w^_)+E[15]+530742520&4294967295,b=S+(y<<16&4294967295|y>>>16),y=_+(b^S^w)+E[2]+3299628645&4294967295,_=b+(y<<23&4294967295|y>>>9),y=w+(b^(_|~S))+E[0]+4096336452&4294967295,w=_+(y<<6&4294967295|y>>>26),y=S+(_^(w|~b))+E[7]+1126891415&4294967295,S=w+(y<<10&4294967295|y>>>22),y=b+(w^(S|~_))+E[14]+2878612391&4294967295,b=S+(y<<15&4294967295|y>>>17),y=_+(S^(b|~w))+E[5]+4237533241&4294967295,_=b+(y<<21&4294967295|y>>>11),y=w+(b^(_|~S))+E[12]+1700485571&4294967295,w=_+(y<<6&4294967295|y>>>26),y=S+(_^(w|~b))+E[3]+2399980690&4294967295,S=w+(y<<10&4294967295|y>>>22),y=b+(w^(S|~_))+E[10]+4293915773&4294967295,b=S+(y<<15&4294967295|y>>>17),y=_+(S^(b|~w))+E[1]+2240044497&4294967295,_=b+(y<<21&4294967295|y>>>11),y=w+(b^(_|~S))+E[8]+1873313359&4294967295,w=_+(y<<6&4294967295|y>>>26),y=S+(_^(w|~b))+E[15]+4264355552&4294967295,S=w+(y<<10&4294967295|y>>>22),y=b+(w^(S|~_))+E[6]+2734768916&4294967295,b=S+(y<<15&4294967295|y>>>17),y=_+(S^(b|~w))+E[13]+1309151649&4294967295,_=b+(y<<21&4294967295|y>>>11),y=w+(b^(_|~S))+E[4]+4149444226&4294967295,w=_+(y<<6&4294967295|y>>>26),y=S+(_^(w|~b))+E[11]+3174756917&4294967295,S=w+(y<<10&4294967295|y>>>22),y=b+(w^(S|~_))+E[2]+718787259&4294967295,b=S+(y<<15&4294967295|y>>>17),y=_+(S^(b|~w))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+w&4294967295,T.g[1]=T.g[1]+(b+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+b&4294967295,T.g[3]=T.g[3]+S&4294967295}o.prototype.u=function(T,w){w===void 0&&(w=T.length);for(var _=w-this.blockSize,E=this.B,b=this.h,S=0;S<w;){if(b==0)for(;S<=_;)r(this,T,S),S+=this.blockSize;if(typeof T=="string"){for(;S<w;)if(E[b++]=T.charCodeAt(S++),b==this.blockSize){r(this,E),b=0;break}}else for(;S<w;)if(E[b++]=T[S++],b==this.blockSize){r(this,E),b=0;break}}this.h=b,this.o+=w},o.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var w=1;w<T.length-8;++w)T[w]=0;var _=8*this.o;for(w=T.length-8;w<T.length;++w)T[w]=_&255,_/=256;for(this.u(T),T=Array(16),w=_=0;4>w;++w)for(var E=0;32>E;E+=8)T[_++]=this.g[w]>>>E&255;return T};function i(T,w){var _=c;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=w(T)}function s(T,w){this.h=w;for(var _=[],E=!0,b=T.length-1;0<=b;b--){var S=T[b]|0;E&&S==w||(_[b]=S,E=!1)}this.g=_}var c={};function l(T){return-128<=T&&128>T?i(T,function(w){return new s([w|0],0>w?-1:0)}):new s([T|0],0>T?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return f;if(0>T)return k(d(-T));for(var w=[],_=1,E=0;T>=_;E++)w[E]=T/_|0,_*=4294967296;return new s(w,0)}function g(T,w){if(T.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(T.charAt(0)=="-")return k(g(T.substring(1),w));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(w,8)),E=f,b=0;b<T.length;b+=8){var S=Math.min(8,T.length-b),y=parseInt(T.substring(b,b+S),w);8>S?(S=d(Math.pow(w,S)),E=E.j(S).add(d(y))):(E=E.j(_),E=E.add(d(y)))}return E}var f=l(0),p=l(1),v=l(16777216);n=s.prototype,n.m=function(){if(R(this))return-k(this).m();for(var T=0,w=1,_=0;_<this.g.length;_++){var E=this.i(_);T+=(0<=E?E:4294967296+E)*w,w*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(A(this))return"0";if(R(this))return"-"+k(this).toString(T);for(var w=d(Math.pow(T,6)),_=this,E="";;){var b=re(_,w).g;_=V(_,b.j(w));var S=((0<_.g.length?_.g[0]:_.h)>>>0).toString(T);if(_=b,A(_))return S+E;for(;6>S.length;)S="0"+S;E=S+E}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function A(T){if(T.h!=0)return!1;for(var w=0;w<T.g.length;w++)if(T.g[w]!=0)return!1;return!0}function R(T){return T.h==-1}n.l=function(T){return T=V(this,T),R(T)?-1:A(T)?0:1};function k(T){for(var w=T.g.length,_=[],E=0;E<w;E++)_[E]=~T.g[E];return new s(_,~T.h).add(p)}n.abs=function(){return R(this)?k(this):this},n.add=function(T){for(var w=Math.max(this.g.length,T.g.length),_=[],E=0,b=0;b<=w;b++){var S=E+(this.i(b)&65535)+(T.i(b)&65535),y=(S>>>16)+(this.i(b)>>>16)+(T.i(b)>>>16);E=y>>>16,S&=65535,y&=65535,_[b]=y<<16|S}return new s(_,_[_.length-1]&-2147483648?-1:0)};function V(T,w){return T.add(k(w))}n.j=function(T){if(A(this)||A(T))return f;if(R(this))return R(T)?k(this).j(k(T)):k(k(this).j(T));if(R(T))return k(this.j(k(T)));if(0>this.l(v)&&0>T.l(v))return d(this.m()*T.m());for(var w=this.g.length+T.g.length,_=[],E=0;E<2*w;E++)_[E]=0;for(E=0;E<this.g.length;E++)for(var b=0;b<T.g.length;b++){var S=this.i(E)>>>16,y=this.i(E)&65535,yt=T.i(b)>>>16,Do=T.i(b)&65535;_[2*E+2*b]+=y*Do,F(_,2*E+2*b),_[2*E+2*b+1]+=S*Do,F(_,2*E+2*b+1),_[2*E+2*b+1]+=y*yt,F(_,2*E+2*b+1),_[2*E+2*b+2]+=S*yt,F(_,2*E+2*b+2)}for(E=0;E<w;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=w;E<2*w;E++)_[E]=0;return new s(_,0)};function F(T,w){for(;(T[w]&65535)!=T[w];)T[w+1]+=T[w]>>>16,T[w]&=65535,w++}function q(T,w){this.g=T,this.h=w}function re(T,w){if(A(w))throw Error("division by zero");if(A(T))return new q(f,f);if(R(T))return w=re(k(T),w),new q(k(w.g),k(w.h));if(R(w))return w=re(T,k(w)),new q(k(w.g),w.h);if(30<T.g.length){if(R(T)||R(w))throw Error("slowDivide_ only works with positive integers.");for(var _=p,E=w;0>=E.l(T);)_=be(_),E=be(E);var b=se(_,1),S=se(E,1);for(E=se(E,2),_=se(_,2);!A(E);){var y=S.add(E);0>=y.l(T)&&(b=b.add(_),S=y),E=se(E,1),_=se(_,1)}return w=V(T,b.j(w)),new q(b,w)}for(b=f;0<=T.l(w);){for(_=Math.max(1,Math.floor(T.m()/w.m())),E=Math.ceil(Math.log(_)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),S=d(_),y=S.j(w);R(y)||0<y.l(T);)_-=E,S=d(_),y=S.j(w);A(S)&&(S=p),b=b.add(S),T=V(T,y)}return new q(b,T)}n.A=function(T){return re(this,T).h},n.and=function(T){for(var w=Math.max(this.g.length,T.g.length),_=[],E=0;E<w;E++)_[E]=this.i(E)&T.i(E);return new s(_,this.h&T.h)},n.or=function(T){for(var w=Math.max(this.g.length,T.g.length),_=[],E=0;E<w;E++)_[E]=this.i(E)|T.i(E);return new s(_,this.h|T.h)},n.xor=function(T){for(var w=Math.max(this.g.length,T.g.length),_=[],E=0;E<w;E++)_[E]=this.i(E)^T.i(E);return new s(_,this.h^T.h)};function be(T){for(var w=T.g.length+1,_=[],E=0;E<w;E++)_[E]=T.i(E)<<1|T.i(E-1)>>>31;return new s(_,T.h)}function se(T,w){var _=w>>5;w%=32;for(var E=T.g.length-_,b=[],S=0;S<E;S++)b[S]=0<w?T.i(S+_)>>>w|T.i(S+_+1)<<32-w:T.i(S+_);return new s(b,T.h)}o.prototype.digest=o.prototype.v,o.prototype.reset=o.prototype.s,o.prototype.update=o.prototype.u,uf=o,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=d,s.fromString=g,zt=s}).apply(typeof Ju<"u"?Ju:typeof self<"u"?self:typeof window<"u"?window:{});var Yr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var df,jo,hf,li,va,ff,gf,mf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,h){return a==Array.prototype||a==Object.prototype||(a[u]=h.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Yr=="object"&&Yr];for(var u=0;u<a.length;++u){var h=a[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var o=t(this);function r(a,u){if(u)e:{var h=o;a=a.split(".");for(var m=0;m<a.length-1;m++){var I=a[m];if(!(I in h))break e;h=h[I]}a=a[a.length-1],m=h[a],u=u(m),u!=m&&u!=null&&e(h,a,{configurable:!0,writable:!0,value:u})}}function i(a,u){a instanceof String&&(a+="");var h=0,m=!1,I={next:function(){if(!m&&h<a.length){var C=h++;return{value:u(C,a[C]),done:!1}}return m=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}r("Array.prototype.values",function(a){return a||function(){return i(this,function(u,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function d(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function g(a,u,h){return a.call.apply(a.bind,arguments)}function f(a,u,h){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,m),a.apply(u,I)}}return function(){return a.apply(u,arguments)}}function p(a,u,h){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:f,p.apply(null,arguments)}function v(a,u){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function A(a,u){function h(){}h.prototype=u.prototype,a.aa=u.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(m,I,C){for(var B=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)B[ne-2]=arguments[ne];return u.prototype[I].apply(m,B)}}function R(a){const u=a.length;if(0<u){const h=Array(u);for(let m=0;m<u;m++)h[m]=a[m];return h}return[]}function k(a,u){for(let h=1;h<arguments.length;h++){const m=arguments[h];if(l(m)){const I=a.length||0,C=m.length||0;a.length=I+C;for(let B=0;B<C;B++)a[I+B]=m[B]}else a.push(m)}}class V{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function F(a){return/^[\s\xa0]*$/.test(a)}function q(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function re(a){return re[" "](a),a}re[" "]=function(){};var be=q().indexOf("Gecko")!=-1&&!(q().toLowerCase().indexOf("webkit")!=-1&&q().indexOf("Edge")==-1)&&!(q().indexOf("Trident")!=-1||q().indexOf("MSIE")!=-1)&&q().indexOf("Edge")==-1;function se(a,u,h){for(const m in a)u.call(h,a[m],m,a)}function T(a,u){for(const h in a)u.call(void 0,a[h],h,a)}function w(a){const u={};for(const h in a)u[h]=a[h];return u}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,u){let h,m;for(let I=1;I<arguments.length;I++){m=arguments[I];for(h in m)a[h]=m[h];for(let C=0;C<_.length;C++)h=_[C],Object.prototype.hasOwnProperty.call(m,h)&&(a[h]=m[h])}}function b(a){var u=1;a=a.split(":");const h=[];for(;0<u&&a.length;)h.push(a.shift()),u--;return a.length&&h.push(a.join(":")),h}function S(a){c.setTimeout(()=>{throw a},0)}function y(){var a=bs;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class yt{constructor(){this.h=this.g=null}add(u,h){const m=Do.get();m.set(u,h),this.h?this.h.next=m:this.g=m,this.h=m}}var Do=new V(()=>new Op,a=>a.reset());class Op{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Co,Ro=!1,bs=new yt,El=()=>{const a=c.Promise.resolve(void 0);Co=()=>{a.then(Up)}};var Up=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(h){S(h)}var u=Do;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}Ro=!1};function Nt(){this.s=this.s,this.C=this.C}Nt.prototype.s=!1,Nt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Nt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ne(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Ne.prototype.h=function(){this.defaultPrevented=!0};var Vp=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return a}();function ko(a,u){if(Ne.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(be){e:{try{re(u.nodeName);var I=!0;break e}catch{}I=!1}I||(u=null)}}else h=="mouseover"?u=a.fromElement:h=="mouseout"&&(u=a.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Lp[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ko.aa.h.call(this)}}A(ko,Ne);var Lp={2:"touch",3:"pen",4:"mouse"};ko.prototype.h=function(){ko.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var kr="closure_listenable_"+(1e6*Math.random()|0),Fp=0;function $p(a,u,h,m,I){this.listener=a,this.proxy=null,this.src=u,this.type=h,this.capture=!!m,this.ha=I,this.key=++Fp,this.da=this.fa=!1}function Nr(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Pr(a){this.src=a,this.g={},this.h=0}Pr.prototype.add=function(a,u,h,m,I){var C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);var B=Is(a,u,m,I);return-1<B?(u=a[B],h||(u.fa=!1)):(u=new $p(u,this.src,C,!!m,I),u.fa=h,a.push(u)),u};function Ts(a,u){var h=u.type;if(h in a.g){var m=a.g[h],I=Array.prototype.indexOf.call(m,u,void 0),C;(C=0<=I)&&Array.prototype.splice.call(m,I,1),C&&(Nr(u),a.g[h].length==0&&(delete a.g[h],a.h--))}}function Is(a,u,h,m){for(var I=0;I<a.length;++I){var C=a[I];if(!C.da&&C.listener==u&&C.capture==!!h&&C.ha==m)return I}return-1}var Ss="closure_lm_"+(1e6*Math.random()|0),As={};function bl(a,u,h,m,I){if(Array.isArray(u)){for(var C=0;C<u.length;C++)bl(a,u[C],h,m,I);return null}return h=Sl(h),a&&a[kr]?a.K(u,h,d(m)?!!m.capture:!1,I):Gp(a,u,h,!1,m,I)}function Gp(a,u,h,m,I,C){if(!u)throw Error("Invalid event type");var B=d(I)?!!I.capture:!!I,ne=Cs(a);if(ne||(a[Ss]=ne=new Pr(a)),h=ne.add(u,h,m,B,C),h.proxy)return h;if(m=zp(),h.proxy=m,m.src=a,m.listener=h,a.addEventListener)Vp||(I=B),I===void 0&&(I=!1),a.addEventListener(u.toString(),m,I);else if(a.attachEvent)a.attachEvent(Il(u.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function zp(){function a(h){return u.call(a.src,a.listener,h)}const u=jp;return a}function Tl(a,u,h,m,I){if(Array.isArray(u))for(var C=0;C<u.length;C++)Tl(a,u[C],h,m,I);else m=d(m)?!!m.capture:!!m,h=Sl(h),a&&a[kr]?(a=a.i,u=String(u).toString(),u in a.g&&(C=a.g[u],h=Is(C,h,m,I),-1<h&&(Nr(C[h]),Array.prototype.splice.call(C,h,1),C.length==0&&(delete a.g[u],a.h--)))):a&&(a=Cs(a))&&(u=a.g[u.toString()],a=-1,u&&(a=Is(u,h,m,I)),(h=-1<a?u[a]:null)&&Ds(h))}function Ds(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[kr])Ts(u.i,a);else{var h=a.type,m=a.proxy;u.removeEventListener?u.removeEventListener(h,m,a.capture):u.detachEvent?u.detachEvent(Il(h),m):u.addListener&&u.removeListener&&u.removeListener(m),(h=Cs(u))?(Ts(h,a),h.h==0&&(h.src=null,u[Ss]=null)):Nr(a)}}}function Il(a){return a in As?As[a]:As[a]="on"+a}function jp(a,u){if(a.da)a=!0;else{u=new ko(u,this);var h=a.listener,m=a.ha||a.src;a.fa&&Ds(a),a=h.call(m,u)}return a}function Cs(a){return a=a[Ss],a instanceof Pr?a:null}var Rs="__closure_events_fn_"+(1e9*Math.random()>>>0);function Sl(a){return typeof a=="function"?a:(a[Rs]||(a[Rs]=function(u){return a.handleEvent(u)}),a[Rs])}function Pe(){Nt.call(this),this.i=new Pr(this),this.M=this,this.F=null}A(Pe,Nt),Pe.prototype[kr]=!0,Pe.prototype.removeEventListener=function(a,u,h,m){Tl(this,a,u,h,m)};function Fe(a,u){var h,m=a.F;if(m)for(h=[];m;m=m.F)h.push(m);if(a=a.M,m=u.type||u,typeof u=="string")u=new Ne(u,a);else if(u instanceof Ne)u.target=u.target||a;else{var I=u;u=new Ne(m,a),E(u,I)}if(I=!0,h)for(var C=h.length-1;0<=C;C--){var B=u.g=h[C];I=xr(B,m,!0,u)&&I}if(B=u.g=a,I=xr(B,m,!0,u)&&I,I=xr(B,m,!1,u)&&I,h)for(C=0;C<h.length;C++)B=u.g=h[C],I=xr(B,m,!1,u)&&I}Pe.prototype.N=function(){if(Pe.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var h=a.g[u],m=0;m<h.length;m++)Nr(h[m]);delete a.g[u],a.h--}}this.F=null},Pe.prototype.K=function(a,u,h,m){return this.i.add(String(a),u,!1,h,m)},Pe.prototype.L=function(a,u,h,m){return this.i.add(String(a),u,!0,h,m)};function xr(a,u,h,m){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var I=!0,C=0;C<u.length;++C){var B=u[C];if(B&&!B.da&&B.capture==h){var ne=B.listener,Ce=B.ha||B.src;B.fa&&Ts(a.i,B),I=ne.call(Ce,m)!==!1&&I}}return I&&!m.defaultPrevented}function Al(a,u,h){if(typeof a=="function")h&&(a=p(a,h));else if(a&&typeof a.handleEvent=="function")a=p(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function Dl(a){a.g=Al(()=>{a.g=null,a.i&&(a.i=!1,Dl(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class qp extends Nt{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Dl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function No(a){Nt.call(this),this.h=a,this.g={}}A(No,Nt);var Cl=[];function Rl(a){se(a.g,function(u,h){this.g.hasOwnProperty(h)&&Ds(u)},a),a.g={}}No.prototype.N=function(){No.aa.N.call(this),Rl(this)},No.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ks=c.JSON.stringify,Hp=c.JSON.parse,Wp=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Ns(){}Ns.prototype.h=null;function kl(a){return a.h||(a.h=a.i())}function Nl(){}var Po={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ps(){Ne.call(this,"d")}A(Ps,Ne);function xs(){Ne.call(this,"c")}A(xs,Ne);var on={},Pl=null;function Mr(){return Pl=Pl||new Pe}on.La="serverreachability";function xl(a){Ne.call(this,on.La,a)}A(xl,Ne);function xo(a){const u=Mr();Fe(u,new xl(u))}on.STAT_EVENT="statevent";function Ml(a,u){Ne.call(this,on.STAT_EVENT,a),this.stat=u}A(Ml,Ne);function $e(a){const u=Mr();Fe(u,new Ml(u,a))}on.Ma="timingevent";function Bl(a,u){Ne.call(this,on.Ma,a),this.size=u}A(Bl,Ne);function Mo(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function Bo(){this.g=!0}Bo.prototype.xa=function(){this.g=!1};function Kp(a,u,h,m,I,C){a.info(function(){if(a.g)if(C)for(var B="",ne=C.split("&"),Ce=0;Ce<ne.length;Ce++){var Z=ne[Ce].split("=");if(1<Z.length){var xe=Z[0];Z=Z[1];var Me=xe.split("_");B=2<=Me.length&&Me[1]=="type"?B+(xe+"="+Z+"&"):B+(xe+"=redacted&")}}else B=null;else B=C;return"XMLHTTP REQ ("+m+") [attempt "+I+"]: "+u+`
`+h+`
`+B})}function Qp(a,u,h,m,I,C,B){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+I+"]: "+u+`
`+h+`
`+C+" "+B})}function xn(a,u,h,m){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+Jp(a,h)+(m?" "+m:"")})}function Yp(a,u){a.info(function(){return"TIMEOUT: "+u})}Bo.prototype.info=function(){};function Jp(a,u){if(!a.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var m=h[a];if(!(2>m.length)){var I=m[1];if(Array.isArray(I)&&!(1>I.length)){var C=I[0];if(C!="noop"&&C!="stop"&&C!="close")for(var B=1;B<I.length;B++)I[B]=""}}}}return ks(h)}catch{return u}}var Br={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ol={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ms;function Or(){}A(Or,Ns),Or.prototype.g=function(){return new XMLHttpRequest},Or.prototype.i=function(){return{}},Ms=new Or;function Pt(a,u,h,m){this.j=a,this.i=u,this.l=h,this.R=m||1,this.U=new No(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ul}function Ul(){this.i=null,this.g="",this.h=!1}var Vl={},Bs={};function Os(a,u,h){a.L=1,a.v=Fr(_t(u)),a.m=h,a.P=!0,Ll(a,null)}function Ll(a,u){a.F=Date.now(),Ur(a),a.A=_t(a.v);var h=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),Zl(h.i,"t",m),a.C=0,h=a.j.J,a.h=new Ul,a.g=wu(a.j,h?u:null,!a.m),0<a.O&&(a.M=new qp(p(a.Y,a,a.g),a.O)),u=a.U,h=a.g,m=a.ca;var I="readystatechange";Array.isArray(I)||(I&&(Cl[0]=I.toString()),I=Cl);for(var C=0;C<I.length;C++){var B=bl(h,I[C],m||u.handleEvent,!1,u.h||u);if(!B)break;u.g[B.key]=B}u=a.H?w(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),xo(),Kp(a.i,a.u,a.A,a.l,a.R,a.m)}Pt.prototype.ca=function(a){a=a.target;const u=this.M;u&&vt(a)==3?u.j():this.Y(a)},Pt.prototype.Y=function(a){try{if(a==this.g)e:{const Me=vt(this.g);var u=this.g.Ba();const On=this.g.Z();if(!(3>Me)&&(Me!=3||this.g&&(this.h.h||this.g.oa()||su(this.g)))){this.J||Me!=4||u==7||(u==8||0>=On?xo(3):xo(2)),Us(this);var h=this.g.Z();this.X=h;t:if(Fl(this)){var m=su(this.g);a="";var I=m.length,C=vt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){rn(this),Oo(this);var B="";break t}this.h.i=new c.TextDecoder}for(u=0;u<I;u++)this.h.h=!0,a+=this.h.i.decode(m[u],{stream:!(C&&u==I-1)});m.length=0,this.h.g+=a,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=h==200,Qp(this.i,this.u,this.A,this.l,this.R,Me,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,Ce=this.g;if((ne=Ce.g?Ce.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(ne)){var Z=ne;break t}}Z=null}if(h=Z)xn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Vs(this,h);else{this.o=!1,this.s=3,$e(12),rn(this),Oo(this);break e}}if(this.P){h=!0;let Xe;for(;!this.J&&this.C<B.length;)if(Xe=Xp(this,B),Xe==Bs){Me==4&&(this.s=4,$e(14),h=!1),xn(this.i,this.l,null,"[Incomplete Response]");break}else if(Xe==Vl){this.s=4,$e(15),xn(this.i,this.l,B,"[Invalid Chunk]"),h=!1;break}else xn(this.i,this.l,Xe,null),Vs(this,Xe);if(Fl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Me!=4||B.length!=0||this.h.h||(this.s=1,$e(16),h=!1),this.o=this.o&&h,!h)xn(this.i,this.l,B,"[Invalid Chunked Response]"),rn(this),Oo(this);else if(0<B.length&&!this.W){this.W=!0;var xe=this.j;xe.g==this&&xe.ba&&!xe.M&&(xe.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),js(xe),xe.M=!0,$e(11))}}else xn(this.i,this.l,B,null),Vs(this,B);Me==4&&rn(this),this.o&&!this.J&&(Me==4?fu(this.j,this):(this.o=!1,Ur(this)))}else mw(this.g),h==400&&0<B.indexOf("Unknown SID")?(this.s=3,$e(12)):(this.s=0,$e(13)),rn(this),Oo(this)}}}catch{}finally{}};function Fl(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Xp(a,u){var h=a.C,m=u.indexOf(`
`,h);return m==-1?Bs:(h=Number(u.substring(h,m)),isNaN(h)?Vl:(m+=1,m+h>u.length?Bs:(u=u.slice(m,m+h),a.C=m+h,u)))}Pt.prototype.cancel=function(){this.J=!0,rn(this)};function Ur(a){a.S=Date.now()+a.I,$l(a,a.I)}function $l(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Mo(p(a.ba,a),u)}function Us(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Pt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Yp(this.i,this.A),this.L!=2&&(xo(),$e(17)),rn(this),this.s=2,Oo(this)):$l(this,this.S-a)};function Oo(a){a.j.G==0||a.J||fu(a.j,a)}function rn(a){Us(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Rl(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function Vs(a,u){try{var h=a.j;if(h.G!=0&&(h.g==a||Ls(h.h,a))){if(!a.K&&Ls(h.h,a)&&h.G==3){try{var m=h.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var I=m;if(I[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)Hr(h),jr(h);else break e;zs(h),$e(18)}}else h.za=I[1],0<h.za-h.T&&37500>I[2]&&h.F&&h.v==0&&!h.C&&(h.C=Mo(p(h.Za,h),6e3));if(1>=jl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else an(h,11)}else if((a.K||h.g==a)&&Hr(h),!F(u))for(I=h.Da.g.parse(u),u=0;u<I.length;u++){let Z=I[u];if(h.T=Z[0],Z=Z[1],h.G==2)if(Z[0]=="c"){h.K=Z[1],h.ia=Z[2];const xe=Z[3];xe!=null&&(h.la=xe,h.j.info("VER="+h.la));const Me=Z[4];Me!=null&&(h.Aa=Me,h.j.info("SVER="+h.Aa));const On=Z[5];On!=null&&typeof On=="number"&&0<On&&(m=1.5*On,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const Xe=a.g;if(Xe){const Kr=Xe.g?Xe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Kr){var C=m.h;C.g||Kr.indexOf("spdy")==-1&&Kr.indexOf("quic")==-1&&Kr.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(Fs(C,C.h),C.h=null))}if(m.D){const qs=Xe.g?Xe.g.getResponseHeader("X-HTTP-Session-Id"):null;qs&&(m.ya=qs,ae(m.I,m.D,qs))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var B=a;if(m.qa=pu(m,m.J?m.ia:null,m.W),B.K){ql(m.h,B);var ne=B,Ce=m.L;Ce&&(ne.I=Ce),ne.B&&(Us(ne),Ur(ne)),m.g=B}else du(m);0<h.i.length&&qr(h)}else Z[0]!="stop"&&Z[0]!="close"||an(h,7);else h.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?an(h,7):Gs(h):Z[0]!="noop"&&h.l&&h.l.ta(Z),h.v=0)}}xo(4)}catch{}}var Zp=class{constructor(a,u){this.g=a,this.map=u}};function Gl(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function zl(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function jl(a){return a.h?1:a.g?a.g.size:0}function Ls(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function Fs(a,u){a.g?a.g.add(u):a.h=u}function ql(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}Gl.prototype.cancel=function(){if(this.i=Hl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Hl(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const h of a.g.values())u=u.concat(h.D);return u}return R(a.i)}function ew(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],h=a.length,m=0;m<h;m++)u.push(a[m]);return u}u=[],h=0;for(m in a)u[h++]=a[m];return u}function tw(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var h=0;h<a;h++)u.push(h);return u}u=[],h=0;for(const m in a)u[h++]=m;return u}}}function Wl(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var h=tw(a),m=ew(a),I=m.length,C=0;C<I;C++)u.call(void 0,m[C],h&&h[C],a)}var Kl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function nw(a,u){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var m=a[h].indexOf("="),I=null;if(0<=m){var C=a[h].substring(0,m);I=a[h].substring(m+1)}else C=a[h];u(C,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function sn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof sn){this.h=a.h,Vr(this,a.j),this.o=a.o,this.g=a.g,Lr(this,a.s),this.l=a.l;var u=a.i,h=new Lo;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),Ql(this,h),this.m=a.m}else a&&(u=String(a).match(Kl))?(this.h=!1,Vr(this,u[1]||"",!0),this.o=Uo(u[2]||""),this.g=Uo(u[3]||"",!0),Lr(this,u[4]),this.l=Uo(u[5]||"",!0),Ql(this,u[6]||"",!0),this.m=Uo(u[7]||"")):(this.h=!1,this.i=new Lo(null,this.h))}sn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Vo(u,Yl,!0),":");var h=this.g;return(h||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Vo(u,Yl,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(Vo(h,h.charAt(0)=="/"?iw:rw,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",Vo(h,aw)),a.join("")};function _t(a){return new sn(a)}function Vr(a,u,h){a.j=h?Uo(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Lr(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function Ql(a,u,h){u instanceof Lo?(a.i=u,cw(a.i,a.h)):(h||(u=Vo(u,sw)),a.i=new Lo(u,a.h))}function ae(a,u,h){a.i.set(u,h)}function Fr(a){return ae(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Uo(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Vo(a,u,h){return typeof a=="string"?(a=encodeURI(a).replace(u,ow),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function ow(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Yl=/[#\/\?@]/g,rw=/[#\?:]/g,iw=/[#\?]/g,sw=/[#\?@]/g,aw=/#/g;function Lo(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function xt(a){a.g||(a.g=new Map,a.h=0,a.i&&nw(a.i,function(u,h){a.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=Lo.prototype,n.add=function(a,u){xt(this),this.i=null,a=Mn(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(u),this.h+=1,this};function Jl(a,u){xt(a),u=Mn(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function Xl(a,u){return xt(a),u=Mn(a,u),a.g.has(u)}n.forEach=function(a,u){xt(this),this.g.forEach(function(h,m){h.forEach(function(I){a.call(u,I,m,this)},this)},this)},n.na=function(){xt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let m=0;m<u.length;m++){const I=a[m];for(let C=0;C<I.length;C++)h.push(u[m])}return h},n.V=function(a){xt(this);let u=[];if(typeof a=="string")Xl(this,a)&&(u=u.concat(this.g.get(Mn(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)u=u.concat(a[h])}return u},n.set=function(a,u){return xt(this),this.i=null,a=Mn(this,a),Xl(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function Zl(a,u,h){Jl(a,u),0<h.length&&(a.i=null,a.g.set(Mn(a,u),R(h)),a.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var m=u[h];const C=encodeURIComponent(String(m)),B=this.V(m);for(m=0;m<B.length;m++){var I=C;B[m]!==""&&(I+="="+encodeURIComponent(String(B[m]))),a.push(I)}}return this.i=a.join("&")};function Mn(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function cw(a,u){u&&!a.j&&(xt(a),a.i=null,a.g.forEach(function(h,m){var I=m.toLowerCase();m!=I&&(Jl(this,m),Zl(this,I,h))},a)),a.j=u}function lw(a,u){const h=new Bo;if(c.Image){const m=new Image;m.onload=v(Mt,h,"TestLoadImage: loaded",!0,u,m),m.onerror=v(Mt,h,"TestLoadImage: error",!1,u,m),m.onabort=v(Mt,h,"TestLoadImage: abort",!1,u,m),m.ontimeout=v(Mt,h,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else u(!1)}function uw(a,u){const h=new Bo,m=new AbortController,I=setTimeout(()=>{m.abort(),Mt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:m.signal}).then(C=>{clearTimeout(I),C.ok?Mt(h,"TestPingServer: ok",!0,u):Mt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(I),Mt(h,"TestPingServer: error",!1,u)})}function Mt(a,u,h,m,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),m(h)}catch{}}function dw(){this.g=new Wp}function hw(a,u,h){const m=h||"";try{Wl(a,function(I,C){let B=I;d(I)&&(B=ks(I)),u.push(m+C+"="+encodeURIComponent(B))})}catch(I){throw u.push(m+"type="+encodeURIComponent("_badmap")),I}}function $r(a){this.l=a.Ub||null,this.j=a.eb||!1}A($r,Ns),$r.prototype.g=function(){return new Gr(this.l,this.j)},$r.prototype.i=function(a){return function(){return a}}({});function Gr(a,u){Pe.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}A(Gr,Pe),n=Gr.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,$o(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Fo(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,$o(this)),this.g&&(this.readyState=3,$o(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;eu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function eu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Fo(this):$o(this),this.readyState==3&&eu(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Fo(this))},n.Qa=function(a){this.g&&(this.response=a,Fo(this))},n.ga=function(){this.g&&Fo(this)};function Fo(a){a.readyState=4,a.l=null,a.j=null,a.v=null,$o(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=u.next();return a.join(`\r
`)};function $o(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Gr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function tu(a){let u="";return se(a,function(h,m){u+=m,u+=":",u+=h,u+=`\r
`}),u}function $s(a,u,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=tu(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):ae(a,u,h))}function de(a){Pe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}A(de,Pe);var fw=/^https?$/i,gw=["POST","PUT"];n=de.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ms.g(),this.v=this.o?kl(this.o):kl(Ms),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(C){nu(this,C);return}if(a=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var I in m)h.set(I,m[I]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const C of m.keys())h.set(C,m.get(C));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(C=>C.toLowerCase()=="content-type"),I=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(gw,u,void 0))||m||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,B]of h)this.g.setRequestHeader(C,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{iu(this),this.u=!0,this.g.send(a),this.u=!1}catch(C){nu(this,C)}};function nu(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,ou(a),zr(a)}function ou(a){a.A||(a.A=!0,Fe(a,"complete"),Fe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Fe(this,"complete"),Fe(this,"abort"),zr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),zr(this,!0)),de.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ru(this):this.bb())},n.bb=function(){ru(this)};function ru(a){if(a.h&&typeof s<"u"&&(!a.v[1]||vt(a)!=4||a.Z()!=2)){if(a.u&&vt(a)==4)Al(a.Ea,0,a);else if(Fe(a,"readystatechange"),vt(a)==4){a.h=!1;try{const B=a.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var m;if(m=B===0){var I=String(a.D).match(Kl)[1]||null;!I&&c.self&&c.self.location&&(I=c.self.location.protocol.slice(0,-1)),m=!fw.test(I?I.toLowerCase():"")}h=m}if(h)Fe(a,"complete"),Fe(a,"success");else{a.m=6;try{var C=2<vt(a)?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.Z()+"]",ou(a)}}finally{zr(a)}}}}function zr(a,u){if(a.g){iu(a);const h=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Fe(a,"ready");try{h.onreadystatechange=m}catch{}}}function iu(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function vt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<vt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Hp(u)}};function su(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function mw(a){const u={};a=(a.g&&2<=vt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(F(a[m]))continue;var h=b(a[m]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const C=u[I]||[];u[I]=C,C.push(h)}T(u,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Go(a,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||u}function au(a){this.Aa=0,this.i=[],this.j=new Bo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Go("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Go("baseRetryDelayMs",5e3,a),this.cb=Go("retryDelaySeedMs",1e4,a),this.Wa=Go("forwardChannelMaxRetries",2,a),this.wa=Go("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Gl(a&&a.concurrentRequestLimit),this.Da=new dw,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=au.prototype,n.la=8,n.G=1,n.connect=function(a,u,h,m){$e(0),this.W=a,this.H=u||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=pu(this,null,this.W),qr(this)};function Gs(a){if(cu(a),a.G==3){var u=a.U++,h=_t(a.I);if(ae(h,"SID",a.K),ae(h,"RID",u),ae(h,"TYPE","terminate"),zo(a,h),u=new Pt(a,a.j,u),u.L=2,u.v=Fr(_t(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=wu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ur(u)}mu(a)}function jr(a){a.g&&(js(a),a.g.cancel(),a.g=null)}function cu(a){jr(a),a.u&&(c.clearTimeout(a.u),a.u=null),Hr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function qr(a){if(!zl(a.h)&&!a.s){a.s=!0;var u=a.Ga;Co||El(),Ro||(Co(),Ro=!0),bs.add(u,a),a.B=0}}function pw(a,u){return jl(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Mo(p(a.Ga,a,u),gu(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const I=new Pt(this,this.j,a);let C=this.o;if(this.S&&(C?(C=w(C),E(C,this.S)):C=this.S),this.m!==null||this.O||(I.H=C,C=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=uu(this,I,u),h=_t(this.I),ae(h,"RID",a),ae(h,"CVER",22),this.D&&ae(h,"X-HTTP-Session-Id",this.D),zo(this,h),C&&(this.O?u="headers="+encodeURIComponent(String(tu(C)))+"&"+u:this.m&&$s(h,this.m,C)),Fs(this.h,I),this.Ua&&ae(h,"TYPE","init"),this.P?(ae(h,"$req",u),ae(h,"SID","null"),I.T=!0,Os(I,h,null)):Os(I,h,u),this.G=2}}else this.G==3&&(a?lu(this,a):this.i.length==0||zl(this.h)||lu(this))};function lu(a,u){var h;u?h=u.l:h=a.U++;const m=_t(a.I);ae(m,"SID",a.K),ae(m,"RID",h),ae(m,"AID",a.T),zo(a,m),a.m&&a.o&&$s(m,a.m,a.o),h=new Pt(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),u&&(a.i=u.D.concat(a.i)),u=uu(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Fs(a.h,h),Os(h,m,u)}function zo(a,u){a.H&&se(a.H,function(h,m){ae(u,m,h)}),a.l&&Wl({},function(h,m){ae(u,m,h)})}function uu(a,u,h){h=Math.min(a.i.length,h);var m=a.l?p(a.l.Na,a.l,a):null;e:{var I=a.i;let C=-1;for(;;){const B=["count="+h];C==-1?0<h?(C=I[0].g,B.push("ofs="+C)):C=0:B.push("ofs="+C);let ne=!0;for(let Ce=0;Ce<h;Ce++){let Z=I[Ce].g;const xe=I[Ce].map;if(Z-=C,0>Z)C=Math.max(0,I[Ce].g-100),ne=!1;else try{hw(xe,B,"req"+Z+"_")}catch{m&&m(xe)}}if(ne){m=B.join("&");break e}}}return a=a.i.splice(0,h),u.D=a,m}function du(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;Co||El(),Ro||(Co(),Ro=!0),bs.add(u,a),a.v=0}}function zs(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Mo(p(a.Fa,a),gu(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,hu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Mo(p(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,$e(10),jr(this),hu(this))};function js(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function hu(a){a.g=new Pt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=_t(a.qa);ae(u,"RID","rpc"),ae(u,"SID",a.K),ae(u,"AID",a.T),ae(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&ae(u,"TO",a.ja),ae(u,"TYPE","xmlhttp"),zo(a,u),a.m&&a.o&&$s(u,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=Fr(_t(u)),h.m=null,h.P=!0,Ll(h,a)}n.Za=function(){this.C!=null&&(this.C=null,jr(this),zs(this),$e(19))};function Hr(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function fu(a,u){var h=null;if(a.g==u){Hr(a),js(a),a.g=null;var m=2}else if(Ls(a.h,u))h=u.D,ql(a.h,u),m=1;else return;if(a.G!=0){if(u.o)if(m==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var I=a.B;m=Mr(),Fe(m,new Bl(m,h)),qr(a)}else du(a);else if(I=u.s,I==3||I==0&&0<u.X||!(m==1&&pw(a,u)||m==2&&zs(a)))switch(h&&0<h.length&&(u=a.h,u.i=u.i.concat(h)),I){case 1:an(a,5);break;case 4:an(a,10);break;case 3:an(a,6);break;default:an(a,2)}}}function gu(a,u){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*u}function an(a,u){if(a.j.info("Error code "+u),u==2){var h=p(a.fb,a),m=a.Xa;const I=!m;m=new sn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Vr(m,"https"),Fr(m),I?lw(m.toString(),h):uw(m.toString(),h)}else $e(2);a.G=0,a.l&&a.l.sa(u),mu(a),cu(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),$e(2)):(this.j.info("Failed to ping google.com"),$e(1))};function mu(a){if(a.G=0,a.ka=[],a.l){const u=Hl(a.h);(u.length!=0||a.i.length!=0)&&(k(a.ka,u),k(a.ka,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.ra()}}function pu(a,u,h){var m=h instanceof sn?_t(h):new sn(h);if(m.g!="")u&&(m.g=u+"."+m.g),Lr(m,m.s);else{var I=c.location;m=I.protocol,u=u?u+"."+I.hostname:I.hostname,I=+I.port;var C=new sn(null);m&&Vr(C,m),u&&(C.g=u),I&&Lr(C,I),h&&(C.l=h),m=C}return h=a.D,u=a.ya,h&&u&&ae(m,h,u),ae(m,"VER",a.la),zo(a,m),m}function wu(a,u,h){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new de(new $r({eb:h})):new de(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function yu(){}n=yu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Wr(){}Wr.prototype.g=function(a,u){return new He(a,u)};function He(a,u){Pe.call(this),this.g=new au(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!F(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!F(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new Bn(this)}A(He,Pe),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){Gs(this.g)},He.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=ks(a),a=h);u.i.push(new Zp(u.Ya++,a)),u.G==3&&qr(u)},He.prototype.N=function(){this.g.l=null,delete this.j,Gs(this.g),delete this.g,He.aa.N.call(this)};function _u(a){Ps.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const h in u){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}A(_u,Ps);function vu(){xs.call(this),this.status=1}A(vu,xs);function Bn(a){this.g=a}A(Bn,yu),Bn.prototype.ua=function(){Fe(this.g,"a")},Bn.prototype.ta=function(a){Fe(this.g,new _u(a))},Bn.prototype.sa=function(a){Fe(this.g,new vu)},Bn.prototype.ra=function(){Fe(this.g,"b")},Wr.prototype.createWebChannel=Wr.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,mf=function(){return new Wr},gf=function(){return Mr()},ff=on,va={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Br.NO_ERROR=0,Br.TIMEOUT=8,Br.HTTP_ERROR=6,li=Br,Ol.COMPLETE="complete",hf=Ol,Nl.EventType=Po,Po.OPEN="a",Po.CLOSE="b",Po.ERROR="c",Po.MESSAGE="d",Pe.prototype.listen=Pe.prototype.K,jo=Nl,de.prototype.listenOnce=de.prototype.L,de.prototype.getLastError=de.prototype.Ka,de.prototype.getLastErrorCode=de.prototype.Ba,de.prototype.getStatus=de.prototype.Z,de.prototype.getResponseJson=de.prototype.Oa,de.prototype.getResponseText=de.prototype.oa,de.prototype.send=de.prototype.ea,de.prototype.setWithCredentials=de.prototype.Ha,df=de}).apply(typeof Yr<"u"?Yr:typeof self<"u"?self:typeof window<"u"?window:{});const Xu="@firebase/firestore",Zu="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Oe.UNAUTHENTICATED=new Oe(null),Oe.GOOGLE_CREDENTIALS=new Oe("google-credentials-uid"),Oe.FIRST_PARTY=new Oe("first-party-uid"),Oe.MOCK_USER=new Oe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let po="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=new Fi("@firebase/firestore");function Un(){return _n.logLevel}function L(n,...e){if(_n.logLevel<=K.DEBUG){const t=e.map(ic);_n.debug(`Firestore (${po}): ${n}`,...t)}}function Ct(n,...e){if(_n.logLevel<=K.ERROR){const t=e.map(ic);_n.error(`Firestore (${po}): ${n}`,...t)}}function vn(n,...e){if(_n.logLevel<=K.WARN){const t=e.map(ic);_n.warn(`Firestore (${po}): ${n}`,...t)}}function ic(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function G(n,e,t){let o="Unexpected state";typeof e=="string"?o=e:t=e,pf(n,o,t)}function pf(n,e,t){let o=`FIRESTORE (${po}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{o+=" CONTEXT: "+JSON.stringify(t)}catch{o+=" CONTEXT: "+t}throw Ct(o),new Error(o)}function te(n,e,t,o){let r="Unexpected state";typeof t=="string"?r=t:o=t,n||pf(e,r,o)}function W(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends at{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class yf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Oe.UNAUTHENTICATED))}shutdown(){}}class rE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class iE{constructor(e){this.t=e,this.currentUser=Oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0,42304);let o=this.i;const r=l=>this.i!==o?(o=this.i,t(l)):Promise.resolve();let i=new It;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new It,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await r(this.currentUser)})},c=l=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new It)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(o=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):o?(te(typeof o.accessToken=="string",31837,{l:o}),new wf(o.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string",2055,{h:e}),new Oe(e)}}class sE{constructor(e,t,o){this.P=e,this.T=t,this.I=o,this.type="FirstParty",this.user=Oe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class aE{constructor(e,t,o){this.P=e,this.T=t,this.I=o}getToken(){return Promise.resolve(new sE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Oe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ed{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class cE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ze(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){te(this.o===void 0,3512);const o=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const s=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${s?"new":"existing"} token.`),s?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>o(i))};const r=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ed(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ed(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let o=0;o<n;o++)t[o]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let o="";for(;o.length<20;){const r=lE(40);for(let i=0;i<r.length;++i)o.length<20&&r[i]<t&&(o+=e.charAt(r[i]%62))}return o}}function Q(n,e){return n<e?-1:n>e?1:0}function Ea(n,e){const t=Math.min(n.length,e.length);for(let o=0;o<t;o++){const r=n.charAt(o),i=e.charAt(o);if(r!==i)return Zs(r)===Zs(i)?Q(r,i):Zs(r)?1:-1}return Q(n.length,e.length)}const uE=55296,dE=57343;function Zs(n){const e=n.charCodeAt(0);return e>=uE&&e<=dE}function Yn(n,e,t){return n.length===e.length&&n.every((o,r)=>t(o,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="__name__";class lt{constructor(e,t,o){t===void 0?t=0:t>e.length&&G(637,{offset:t,range:e.length}),o===void 0?o=e.length-t:o>e.length-t&&G(1746,{length:o,range:e.length-t}),this.segments=e,this.offset=t,this.len=o}get length(){return this.len}isEqual(e){return lt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof lt?e.forEach(o=>{t.push(o)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,o=this.limit();t<o;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const o=Math.min(e.length,t.length);for(let r=0;r<o;r++){const i=lt.compareSegments(e.get(r),t.get(r));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const o=lt.isNumericId(e),r=lt.isNumericId(t);return o&&!r?-1:!o&&r?1:o&&r?lt.extractNumericId(e).compare(lt.extractNumericId(t)):Ea(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return zt.fromString(e.substring(4,e.length-2))}}class ie extends lt{construct(e,t,o){return new ie(e,t,o)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const o of e){if(o.indexOf("//")>=0)throw new U(x.INVALID_ARGUMENT,`Invalid segment (${o}). Paths must not contain // in them.`);t.push(...o.split("/").filter(r=>r.length>0))}return new ie(t)}static emptyPath(){return new ie([])}}const hE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Se extends lt{construct(e,t,o){return new Se(e,t,o)}static isValidIdentifier(e){return hE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Se.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===td}static keyField(){return new Se([td])}static fromServerFormat(e){const t=[];let o="",r=0;const i=()=>{if(o.length===0)throw new U(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(o),o=""};let s=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new U(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[r+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new U(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);o+=l,r+=2}else c==="`"?(s=!s,r++):c!=="."||s?(o+=c,r++):(i(),r++)}if(i(),s)throw new U(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Se(t)}static emptyPath(){return new Se([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(ie.fromString(e))}static fromName(e){return new $(ie.fromString(e).popFirst(5))}static empty(){return new $(ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new ie(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(n,e,t){if(!t)throw new U(x.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function vf(n,e,t,o){if(e===!0&&o===!0)throw new U(x.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function nd(n){if(!$.isDocumentKey(n))throw new U(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function od(n){if($.isDocumentKey(n))throw new U(x.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ef(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function qi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(o){return o.constructor?o.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function Ve(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=qi(n);throw new U(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function _e(n,e){const t={typeString:n};return e&&(t.value=e),t}function pr(n,e){if(!Ef(n))throw new U(x.INVALID_ARGUMENT,"JSON must be an object");let t;for(const o in e)if(e[o]){const r=e[o].typeString,i="value"in e[o]?{value:e[o].value}:void 0;if(!(o in n)){t=`JSON missing required field: '${o}'`;break}const s=n[o];if(r&&typeof s!==r){t=`JSON field '${o}' must be a ${r}.`;break}if(i!==void 0&&s!==i.value){t=`Expected '${o}' field to equal '${i.value}'`;break}}if(t)throw new U(x.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd=-62135596800,id=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),o=Math.floor((e-1e3*t)*id);return new oe(t,o)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<rd)throw new U(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/id}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(pr(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-rd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:_e("string",oe._jsonSchemaVersion),seconds:_e("number"),nanoseconds:_e("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{static fromTimestamp(e){return new j(e)}static min(){return new j(new oe(0,0))}static max(){return new j(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const sr=-1;function fE(n,e){const t=n.toTimestamp().seconds,o=n.toTimestamp().nanoseconds+1,r=j.fromTimestamp(o===1e9?new oe(t+1,0):new oe(t,o));return new Ht(r,$.empty(),e)}function gE(n){return new Ht(n.readTime,n.key,sr)}class Ht{constructor(e,t,o){this.readTime=e,this.documentKey=t,this.largestBatchId=o}static min(){return new Ht(j.min(),$.empty(),sr)}static max(){return new Ht(j.max(),$.empty(),sr)}}function mE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class wE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wo(n){if(n.code!==x.FAILED_PRECONDITION||n.message!==pE)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new M((o,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(o,r)},this.catchCallback=i=>{this.wrapFailure(t,i).next(o,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof M?t:M.resolve(t)}catch(t){return M.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):M.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):M.reject(t)}static resolve(e){return new M((t,o)=>{t(e)})}static reject(e){return new M((t,o)=>{o(e)})}static waitFor(e){return new M((t,o)=>{let r=0,i=0,s=!1;e.forEach(c=>{++r,c.next(()=>{++i,s&&i===r&&t()},l=>o(l))}),s=!0,i===r&&t()})}static or(e){let t=M.resolve(!1);for(const o of e)t=t.next(r=>r?M.resolve(r):o());return t}static forEach(e,t){const o=[];return e.forEach((r,i)=>{o.push(t.call(this,r,i))}),this.waitFor(o)}static mapArray(e,t){return new M((o,r)=>{const i=e.length,s=new Array(i);let c=0;for(let l=0;l<i;l++){const d=l;t(e[d]).next(g=>{s[d]=g,++c,c===i&&o(s)},g=>r(g))}})}static doWhile(e,t){return new M((o,r)=>{const i=()=>{e()===!0?t().next(()=>{i()},r):o()};i()})}}function yE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function yo(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Hi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=o=>this.ae(o),this.ue=o=>t.writeSequenceNumber(o))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Hi.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sc=-1;function Wi(n){return n==null}function Ti(n){return n===0&&1/n==-1/0}function _E(n){return typeof n=="number"&&Number.isInteger(n)&&!Ti(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf="";function vE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=sd(e)),e=EE(n.get(t),e);return sd(e)}function EE(n,e){let t=e;const o=n.length;for(let r=0;r<o;r++){const i=n.charAt(r);switch(i){case"\0":t+="";break;case bf:t+="";break;default:t+=i}}return t}function sd(n){return n+bf+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ad(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Xt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Tf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t){this.comparator=e,this.root=t||Re.EMPTY}insert(e,t){return new ue(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Re.BLACK,null,null))}remove(e){return new ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Re.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const o=this.comparator(e,t.key);if(o===0)return t.value;o<0?t=t.left:o>0&&(t=t.right)}return null}indexOf(e){let t=0,o=this.root;for(;!o.isEmpty();){const r=this.comparator(e,o.key);if(r===0)return t+o.left.size;r<0?o=o.left:(t+=o.left.size+1,o=o.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,o)=>(e(t,o),!1))}toString(){const e=[];return this.inorderTraversal((t,o)=>(e.push(`${t}:${o}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Jr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Jr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Jr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Jr(this.root,e,this.comparator,!0)}}class Jr{constructor(e,t,o,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?o(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Re{constructor(e,t,o,r,i){this.key=e,this.value=t,this.color=o??Re.RED,this.left=r??Re.EMPTY,this.right=i??Re.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,o,r,i){return new Re(e??this.key,t??this.value,o??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,o){let r=this;const i=o(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,o),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,o)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Re.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let o,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Re.EMPTY;o=r.right.min(),r=r.copy(o.key,o.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Re.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}Re.EMPTY=null,Re.RED=!0,Re.BLACK=!1;Re.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,t,o,r,i){return this}insert(e,t,o){return new Re(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.comparator=e,this.data=new ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,o)=>(e(t),!1))}forEachInRange(e,t){const o=this.data.getIteratorFrom(e[0]);for(;o.hasNext();){const r=o.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let o;for(o=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();o.hasNext();)if(!e(o.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new cd(this.data.getIterator())}getIteratorFrom(e){return new cd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(o=>{t=t.add(o)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),o=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=o.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class cd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.fields=e,e.sort(Se.comparator)}static empty(){return new Ke([])}unionWith(e){let t=new Ee(Se.comparator);for(const o of this.fields)t=t.add(o);for(const o of e)t=t.add(o);return new Ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Yn(this.fields,e.fields,(t,o)=>t.isEqual(o))}}/**
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
 */class If extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new If("Invalid base64 string: "+i):i}}(e);return new Ae(t)}static fromUint8Array(e){const t=function(r){let i="";for(let s=0;s<r.length;++s)i+=String.fromCharCode(r[s]);return i}(e);return new Ae(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const o=new Uint8Array(t.length);for(let r=0;r<t.length;r++)o[r]=t.charCodeAt(r);return o}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ae.EMPTY_BYTE_STRING=new Ae("");const bE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(n){if(te(!!n,39018),typeof n=="string"){let e=0;const t=bE.exec(n);if(te(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const o=new Date(n);return{seconds:Math.floor(o.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Kt(n){return typeof n=="string"?Ae.fromBase64String(n):Ae.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="server_timestamp",Af="__type__",Df="__previous_value__",Cf="__local_write_time__";function ac(n){return(n?.mapValue?.fields||{})[Af]?.stringValue===Sf}function Ki(n){const e=n.mapValue.fields[Df];return ac(e)?Ki(e):e}function ar(n){const e=Wt(n.mapValue.fields[Cf].timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e,t,o,r,i,s,c,l,d,g){this.databaseId=e,this.appId=t,this.persistenceKey=o,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=g}}const Ii="(default)";class Jn{constructor(e,t){this.projectId=e,this.database=t||Ii}static empty(){return new Jn("","")}get isDefaultDatabase(){return this.database===Ii}isEqual(e){return e instanceof Jn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="__type__",IE="__max__",Xr={mapValue:{}},kf="__vector__",Si="value";function Qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ac(n)?4:AE(n)?9007199254740991:SE(n)?10:11:G(28295,{value:n})}function pt(n,e){if(n===e)return!0;const t=Qt(n);if(t!==Qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ar(n).isEqual(ar(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const s=Wt(r.timestampValue),c=Wt(i.timestampValue);return s.seconds===c.seconds&&s.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,i){return Kt(r.bytesValue).isEqual(Kt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,i){return me(r.geoPointValue.latitude)===me(i.geoPointValue.latitude)&&me(r.geoPointValue.longitude)===me(i.geoPointValue.longitude)}(n,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return me(r.integerValue)===me(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const s=me(r.doubleValue),c=me(i.doubleValue);return s===c?Ti(s)===Ti(c):isNaN(s)&&isNaN(c)}return!1}(n,e);case 9:return Yn(n.arrayValue.values||[],e.arrayValue.values||[],pt);case 10:case 11:return function(r,i){const s=r.mapValue.fields||{},c=i.mapValue.fields||{};if(ad(s)!==ad(c))return!1;for(const l in s)if(s.hasOwnProperty(l)&&(c[l]===void 0||!pt(s[l],c[l])))return!1;return!0}(n,e);default:return G(52216,{left:n})}}function cr(n,e){return(n.values||[]).find(t=>pt(t,e))!==void 0}function Xn(n,e){if(n===e)return 0;const t=Qt(n),o=Qt(e);if(t!==o)return Q(t,o);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(i,s){const c=me(i.integerValue||i.doubleValue),l=me(s.integerValue||s.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return ld(n.timestampValue,e.timestampValue);case 4:return ld(ar(n),ar(e));case 5:return Ea(n.stringValue,e.stringValue);case 6:return function(i,s){const c=Kt(i),l=Kt(s);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,s){const c=i.split("/"),l=s.split("/");for(let d=0;d<c.length&&d<l.length;d++){const g=Q(c[d],l[d]);if(g!==0)return g}return Q(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,s){const c=Q(me(i.latitude),me(s.latitude));return c!==0?c:Q(me(i.longitude),me(s.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return ud(n.arrayValue,e.arrayValue);case 10:return function(i,s){const c=i.fields||{},l=s.fields||{},d=c[Si]?.arrayValue,g=l[Si]?.arrayValue,f=Q(d?.values?.length||0,g?.values?.length||0);return f!==0?f:ud(d,g)}(n.mapValue,e.mapValue);case 11:return function(i,s){if(i===Xr.mapValue&&s===Xr.mapValue)return 0;if(i===Xr.mapValue)return 1;if(s===Xr.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),d=s.fields||{},g=Object.keys(d);l.sort(),g.sort();for(let f=0;f<l.length&&f<g.length;++f){const p=Ea(l[f],g[f]);if(p!==0)return p;const v=Xn(c[l[f]],d[g[f]]);if(v!==0)return v}return Q(l.length,g.length)}(n.mapValue,e.mapValue);default:throw G(23264,{he:t})}}function ld(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=Wt(n),o=Wt(e),r=Q(t.seconds,o.seconds);return r!==0?r:Q(t.nanos,o.nanos)}function ud(n,e){const t=n.values||[],o=e.values||[];for(let r=0;r<t.length&&r<o.length;++r){const i=Xn(t[r],o[r]);if(i)return i}return Q(t.length,o.length)}function Zn(n){return ba(n)}function ba(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const o=Wt(t);return`time(${o.seconds},${o.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Kt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let o="[",r=!0;for(const i of t.values||[])r?r=!1:o+=",",o+=ba(i);return o+"]"}(n.arrayValue):"mapValue"in n?function(t){const o=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const s of o)i?i=!1:r+=",",r+=`${s}:${ba(t.fields[s])}`;return r+"}"}(n.mapValue):G(61005,{value:n})}function ui(n){switch(Qt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ki(n);return e?16+ui(e):16;case 5:return 2*n.stringValue.length;case 6:return Kt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(o){return(o.values||[]).reduce((r,i)=>r+ui(i),0)}(n.arrayValue);case 10:case 11:return function(o){let r=0;return Xt(o.fields,(i,s)=>{r+=i.length+ui(s)}),r}(n.mapValue);default:throw G(13486,{value:n})}}function dd(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ta(n){return!!n&&"integerValue"in n}function cc(n){return!!n&&"arrayValue"in n}function hd(n){return!!n&&"nullValue"in n}function fd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function di(n){return!!n&&"mapValue"in n}function SE(n){return(n?.mapValue?.fields||{})[Rf]?.stringValue===kf}function Yo(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Xt(n.mapValue.fields,(t,o)=>e.mapValue.fields[t]=Yo(o)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Yo(n.arrayValue.values[t]);return e}return{...n}}function AE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===IE}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.value=e}static empty(){return new je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let o=0;o<e.length-1;++o)if(t=(t.mapValue.fields||{})[e.get(o)],!di(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Yo(t)}setAll(e){let t=Se.emptyPath(),o={},r=[];e.forEach((s,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,o,r),o={},r=[],t=c.popLast()}s?o[c.lastSegment()]=Yo(s):r.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,o,r)}delete(e){const t=this.field(e.popLast());di(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return pt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let o=0;o<e.length;++o){let r=t.mapValue.fields[e.get(o)];di(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(o)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,o){Xt(t,(r,i)=>e[r]=i);for(const r of o)delete e[r]}clone(){return new je(Yo(this.value))}}function Nf(n){const e=[];return Xt(n.fields,(t,o)=>{const r=new Se([t]);if(di(o)){const i=Nf(o.mapValue).fields;if(i.length===0)e.push(r);else for(const s of i)e.push(r.child(s))}else e.push(r)}),new Ke(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,t,o,r,i,s,c){this.key=e,this.documentType=t,this.version=o,this.readTime=r,this.createTime=i,this.data=s,this.documentState=c}static newInvalidDocument(e){return new Ue(e,0,j.min(),j.min(),j.min(),je.empty(),0)}static newFoundDocument(e,t,o,r){return new Ue(e,1,t,j.min(),o,r,0)}static newNoDocument(e,t){return new Ue(e,2,t,j.min(),j.min(),je.empty(),0)}static newUnknownDocument(e,t){return new Ue(e,3,t,j.min(),j.min(),je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ue&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ue(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ai{constructor(e,t){this.position=e,this.inclusive=t}}function gd(n,e,t){let o=0;for(let r=0;r<n.position.length;r++){const i=e[r],s=n.position[r];if(i.field.isKeyField()?o=$.comparator($.fromName(s.referenceValue),t.key):o=Xn(s,t.data.field(i.field)),i.dir==="desc"&&(o*=-1),o!==0)break}return o}function md(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!pt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class lr{constructor(e,t="asc"){this.field=e,this.dir=t}}function DE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Pf{}class ye extends Pf{constructor(e,t,o){super(),this.field=e,this.op=t,this.value=o}static create(e,t,o){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,o):new RE(e,t,o):t==="array-contains"?new PE(e,o):t==="in"?new xE(e,o):t==="not-in"?new ME(e,o):t==="array-contains-any"?new BE(e,o):new ye(e,t,o)}static createKeyFieldInFilter(e,t,o){return t==="in"?new kE(e,o):new NE(e,o)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Xn(t,this.value)):t!==null&&Qt(this.value)===Qt(t)&&this.matchesComparison(Xn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class it extends Pf{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new it(e,t)}matches(e){return xf(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function xf(n){return n.op==="and"}function Mf(n){return CE(n)&&xf(n)}function CE(n){for(const e of n.filters)if(e instanceof it)return!1;return!0}function Ia(n){if(n instanceof ye)return n.field.canonicalString()+n.op.toString()+Zn(n.value);if(Mf(n))return n.filters.map(e=>Ia(e)).join(",");{const e=n.filters.map(t=>Ia(t)).join(",");return`${n.op}(${e})`}}function Bf(n,e){return n instanceof ye?function(o,r){return r instanceof ye&&o.op===r.op&&o.field.isEqual(r.field)&&pt(o.value,r.value)}(n,e):n instanceof it?function(o,r){return r instanceof it&&o.op===r.op&&o.filters.length===r.filters.length?o.filters.reduce((i,s,c)=>i&&Bf(s,r.filters[c]),!0):!1}(n,e):void G(19439)}function Of(n){return n instanceof ye?function(t){return`${t.field.canonicalString()} ${t.op} ${Zn(t.value)}`}(n):n instanceof it?function(t){return t.op.toString()+" {"+t.getFilters().map(Of).join(" ,")+"}"}(n):"Filter"}class RE extends ye{constructor(e,t,o){super(e,t,o),this.key=$.fromName(o.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class kE extends ye{constructor(e,t){super(e,"in",t),this.keys=Uf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class NE extends ye{constructor(e,t){super(e,"not-in",t),this.keys=Uf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Uf(n,e){return(e.arrayValue?.values||[]).map(t=>$.fromName(t.referenceValue))}class PE extends ye{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return cc(t)&&cr(t.arrayValue,this.value)}}class xE extends ye{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&cr(this.value.arrayValue,t)}}class ME extends ye{constructor(e,t){super(e,"not-in",t)}matches(e){if(cr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!cr(this.value.arrayValue,t)}}class BE extends ye{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!cc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(o=>cr(this.value.arrayValue,o))}}/**
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
 */class OE{constructor(e,t=null,o=[],r=[],i=null,s=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=o,this.filters=r,this.limit=i,this.startAt=s,this.endAt=c,this.Te=null}}function pd(n,e=null,t=[],o=[],r=null,i=null,s=null){return new OE(n,e,t,o,r,i,s)}function lc(n){const e=W(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(o=>Ia(o)).join(","),t+="|ob:",t+=e.orderBy.map(o=>function(i){return i.field.canonicalString()+i.dir}(o)).join(","),Wi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(o=>Zn(o)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(o=>Zn(o)).join(",")),e.Te=t}return e.Te}function uc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!DE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Bf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!md(n.startAt,e.startAt)&&md(n.endAt,e.endAt)}function Sa(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e,t=null,o=[],r=[],i=null,s="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=o,this.filters=r,this.limit=i,this.limitType=s,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function UE(n,e,t,o,r,i,s,c){return new _o(n,e,t,o,r,i,s,c)}function Qi(n){return new _o(n)}function wd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Vf(n){return n.collectionGroup!==null}function Jo(n){const e=W(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const o=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(s){let c=new Ee(Se.comparator);return s.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new lr(i,o))}),t.has(Se.keyField().canonicalString())||e.Ie.push(new lr(Se.keyField(),o))}return e.Ie}function dt(n){const e=W(n);return e.Ee||(e.Ee=VE(e,Jo(n))),e.Ee}function VE(n,e){if(n.limitType==="F")return pd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new lr(r.field,i)});const t=n.endAt?new Ai(n.endAt.position,n.endAt.inclusive):null,o=n.startAt?new Ai(n.startAt.position,n.startAt.inclusive):null;return pd(n.path,n.collectionGroup,e,n.filters,n.limit,t,o)}}function Aa(n,e){const t=n.filters.concat([e]);return new _o(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Da(n,e,t){return new _o(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Yi(n,e){return uc(dt(n),dt(e))&&n.limitType===e.limitType}function Lf(n){return`${lc(dt(n))}|lt:${n.limitType}`}function Vn(n){return`Query(target=${function(t){let o=t.path.canonicalString();return t.collectionGroup!==null&&(o+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(o+=`, filters: [${t.filters.map(r=>Of(r)).join(", ")}]`),Wi(t.limit)||(o+=", limit: "+t.limit),t.orderBy.length>0&&(o+=`, orderBy: [${t.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),t.startAt&&(o+=", startAt: ",o+=t.startAt.inclusive?"b:":"a:",o+=t.startAt.position.map(r=>Zn(r)).join(",")),t.endAt&&(o+=", endAt: ",o+=t.endAt.inclusive?"a:":"b:",o+=t.endAt.position.map(r=>Zn(r)).join(",")),`Target(${o})`}(dt(n))}; limitType=${n.limitType})`}function Ji(n,e){return e.isFoundDocument()&&function(o,r){const i=r.key.path;return o.collectionGroup!==null?r.key.hasCollectionId(o.collectionGroup)&&o.path.isPrefixOf(i):$.isDocumentKey(o.path)?o.path.isEqual(i):o.path.isImmediateParentOf(i)}(n,e)&&function(o,r){for(const i of Jo(o))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(n,e)&&function(o,r){for(const i of o.filters)if(!i.matches(r))return!1;return!0}(n,e)&&function(o,r){return!(o.startAt&&!function(s,c,l){const d=gd(s,c,l);return s.inclusive?d<=0:d<0}(o.startAt,Jo(o),r)||o.endAt&&!function(s,c,l){const d=gd(s,c,l);return s.inclusive?d>=0:d>0}(o.endAt,Jo(o),r))}(n,e)}function LE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ff(n){return(e,t)=>{let o=!1;for(const r of Jo(n)){const i=FE(r,e,t);if(i!==0)return i;o=o||r.field.isKeyField()}return 0}}function FE(n,e,t){const o=n.field.isKeyField()?$.comparator(e.key,t.key):function(i,s,c){const l=s.data.field(i),d=c.data.field(i);return l!==null&&d!==null?Xn(l,d):G(42886)}(n.field,e,t);switch(n.dir){case"asc":return o;case"desc":return-1*o;default:return G(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o!==void 0){for(const[r,i]of o)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const o=this.mapKeyFn(e),r=this.inner[o];if(r===void 0)return this.inner[o]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o===void 0)return!1;for(let r=0;r<o.length;r++)if(this.equalsFn(o[r][0],e))return o.length===1?delete this.inner[t]:o.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Xt(this.inner,(t,o)=>{for(const[r,i]of o)e(r,i)})}isEmpty(){return Tf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $E=new ue($.comparator);function Rt(){return $E}const $f=new ue($.comparator);function qo(...n){let e=$f;for(const t of n)e=e.insert(t.key,t);return e}function Gf(n){let e=$f;return n.forEach((t,o)=>e=e.insert(t,o.overlayedDocument)),e}function fn(){return Xo()}function zf(){return Xo()}function Xo(){return new An(n=>n.toString(),(n,e)=>n.isEqual(e))}const GE=new ue($.comparator),zE=new Ee($.comparator);function Y(...n){let e=zE;for(const t of n)e=e.add(t);return e}const jE=new Ee(Q);function qE(){return jE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ti(e)?"-0":e}}function jf(n){return{integerValue:""+n}}function HE(n,e){return _E(e)?jf(e):dc(n,e)}/**
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
 */class Xi{constructor(){this._=void 0}}function WE(n,e,t){return n instanceof ur?function(r,i){const s={fields:{[Af]:{stringValue:Sf},[Cf]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&ac(i)&&(i=Ki(i)),i&&(s.fields[Df]=i),{mapValue:s}}(t,e):n instanceof eo?Hf(n,e):n instanceof to?Wf(n,e):function(r,i){const s=qf(r,i),c=yd(s)+yd(r.Ae);return Ta(s)&&Ta(r.Ae)?jf(c):dc(r.serializer,c)}(n,e)}function KE(n,e,t){return n instanceof eo?Hf(n,e):n instanceof to?Wf(n,e):t}function qf(n,e){return n instanceof Di?function(o){return Ta(o)||function(i){return!!i&&"doubleValue"in i}(o)}(e)?e:{integerValue:0}:null}class ur extends Xi{}class eo extends Xi{constructor(e){super(),this.elements=e}}function Hf(n,e){const t=Kf(e);for(const o of n.elements)t.some(r=>pt(r,o))||t.push(o);return{arrayValue:{values:t}}}class to extends Xi{constructor(e){super(),this.elements=e}}function Wf(n,e){let t=Kf(e);for(const o of n.elements)t=t.filter(r=>!pt(r,o));return{arrayValue:{values:t}}}class Di extends Xi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function yd(n){return me(n.integerValue||n.doubleValue)}function Kf(n){return cc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,t){this.field=e,this.transform=t}}function QE(n,e){return n.field.isEqual(e.field)&&function(o,r){return o instanceof eo&&r instanceof eo||o instanceof to&&r instanceof to?Yn(o.elements,r.elements,pt):o instanceof Di&&r instanceof Di?pt(o.Ae,r.Ae):o instanceof ur&&r instanceof ur}(n.transform,e.transform)}class YE{constructor(e,t){this.version=e,this.transformResults=t}}class Ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ge}static exists(e){return new Ge(void 0,e)}static updateTime(e){return new Ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Zi{}function Qf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new es(n.key,Ge.none()):new wr(n.key,n.data,Ge.none());{const t=n.data,o=je.empty();let r=new Ee(Se.comparator);for(let i of e.fields)if(!r.has(i)){let s=t.field(i);s===null&&i.length>1&&(i=i.popLast(),s=t.field(i)),s===null?o.delete(i):o.set(i,s),r=r.add(i)}return new Zt(n.key,o,new Ke(r.toArray()),Ge.none())}}function JE(n,e,t){n instanceof wr?function(r,i,s){const c=r.value.clone(),l=vd(r.fieldTransforms,i,s.transformResults);c.setAll(l),i.convertToFoundDocument(s.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Zt?function(r,i,s){if(!hi(r.precondition,i))return void i.convertToUnknownDocument(s.version);const c=vd(r.fieldTransforms,i,s.transformResults),l=i.data;l.setAll(Yf(r)),l.setAll(c),i.convertToFoundDocument(s.version,l).setHasCommittedMutations()}(n,e,t):function(r,i,s){i.convertToNoDocument(s.version).setHasCommittedMutations()}(0,e,t)}function Zo(n,e,t,o){return n instanceof wr?function(i,s,c,l){if(!hi(i.precondition,s))return c;const d=i.value.clone(),g=Ed(i.fieldTransforms,l,s);return d.setAll(g),s.convertToFoundDocument(s.version,d).setHasLocalMutations(),null}(n,e,t,o):n instanceof Zt?function(i,s,c,l){if(!hi(i.precondition,s))return c;const d=Ed(i.fieldTransforms,l,s),g=s.data;return g.setAll(Yf(i)),g.setAll(d),s.convertToFoundDocument(s.version,g).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(n,e,t,o):function(i,s,c){return hi(i.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):c}(n,e,t)}function XE(n,e){let t=null;for(const o of n.fieldTransforms){const r=e.data.field(o.field),i=qf(o.transform,r||null);i!=null&&(t===null&&(t=je.empty()),t.set(o.field,i))}return t||null}function _d(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(o,r){return o===void 0&&r===void 0||!(!o||!r)&&Yn(o,r,(i,s)=>QE(i,s))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class wr extends Zi{constructor(e,t,o,r=[]){super(),this.key=e,this.value=t,this.precondition=o,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Zt extends Zi{constructor(e,t,o,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=o,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Yf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const o=n.data.field(t);e.set(t,o)}}),e}function vd(n,e,t){const o=new Map;te(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let r=0;r<t.length;r++){const i=n[r],s=i.transform,c=e.data.field(i.field);o.set(i.field,KE(s,c,t[r]))}return o}function Ed(n,e,t){const o=new Map;for(const r of n){const i=r.transform,s=t.data.field(r.field);o.set(r.field,WE(i,s,e))}return o}class es extends Zi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ZE extends Zi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e,t,o,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=o,this.mutations=r}applyToRemoteDocument(e,t){const o=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&JE(i,e,o[r])}}applyToLocalView(e,t){for(const o of this.baseMutations)o.key.isEqual(e.key)&&(t=Zo(o,e,t,this.localWriteTime));for(const o of this.mutations)o.key.isEqual(e.key)&&(t=Zo(o,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const o=zf();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let c=this.applyToLocalView(s,i.mutatedFields);c=t.has(r.key)?null:c;const l=Qf(s,c);l!==null&&o.set(r.key,l),s.isValidDocument()||s.convertToNoDocument(j.min())}),o}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&Yn(this.mutations,e.mutations,(t,o)=>_d(t,o))&&Yn(this.baseMutations,e.baseMutations,(t,o)=>_d(t,o))}}class fc{constructor(e,t,o,r){this.batch=e,this.commitVersion=t,this.mutationResults=o,this.docVersions=r}static from(e,t,o){te(e.mutations.length===o.length,58842,{me:e.mutations.length,fe:o.length});let r=function(){return GE}();const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,o[s].version);return new fc(e,t,o,r)}}/**
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
 */class tb{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class nb{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we,X;function ob(n){switch(n){case x.OK:return G(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return G(15467,{code:n})}}function Jf(n){if(n===void 0)return Ct("GRPC error has no .code"),x.UNKNOWN;switch(n){case we.OK:return x.OK;case we.CANCELLED:return x.CANCELLED;case we.UNKNOWN:return x.UNKNOWN;case we.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case we.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case we.INTERNAL:return x.INTERNAL;case we.UNAVAILABLE:return x.UNAVAILABLE;case we.UNAUTHENTICATED:return x.UNAUTHENTICATED;case we.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case we.NOT_FOUND:return x.NOT_FOUND;case we.ALREADY_EXISTS:return x.ALREADY_EXISTS;case we.PERMISSION_DENIED:return x.PERMISSION_DENIED;case we.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case we.ABORTED:return x.ABORTED;case we.OUT_OF_RANGE:return x.OUT_OF_RANGE;case we.UNIMPLEMENTED:return x.UNIMPLEMENTED;case we.DATA_LOSS:return x.DATA_LOSS;default:return G(39323,{code:n})}}(X=we||(we={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function rb(){return new TextEncoder}/**
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
 */const ib=new zt([4294967295,4294967295],0);function bd(n){const e=rb().encode(n),t=new uf;return t.update(e),new Uint8Array(t.digest())}function Td(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),o=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new zt([t,o],0),new zt([r,i],0)]}class gc{constructor(e,t,o){if(this.bitmap=e,this.padding=t,this.hashCount=o,t<0||t>=8)throw new Ho(`Invalid padding: ${t}`);if(o<0)throw new Ho(`Invalid hash count: ${o}`);if(e.length>0&&this.hashCount===0)throw new Ho(`Invalid hash count: ${o}`);if(e.length===0&&t!==0)throw new Ho(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=zt.fromNumber(this.ge)}ye(e,t,o){let r=e.add(t.multiply(zt.fromNumber(o)));return r.compare(ib)===1&&(r=new zt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=bd(e),[o,r]=Td(t);for(let i=0;i<this.hashCount;i++){const s=this.ye(o,r,i);if(!this.we(s))return!1}return!0}static create(e,t,o){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new gc(i,r,t);return o.forEach(c=>s.insert(c)),s}insert(e){if(this.ge===0)return;const t=bd(e),[o,r]=Td(t);for(let i=0;i<this.hashCount;i++){const s=this.ye(o,r,i);this.Se(s)}}Se(e){const t=Math.floor(e/8),o=e%8;this.bitmap[t]|=1<<o}}class Ho extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e,t,o,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=o,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,o){const r=new Map;return r.set(e,yr.createSynthesizedTargetChangeForCurrentChange(e,t,o)),new ts(j.min(),r,new ue(Q),Rt(),Y())}}class yr{constructor(e,t,o,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=o,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,o){return new yr(o,t,Y(),Y(),Y())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t,o,r){this.be=e,this.removedTargetIds=t,this.key=o,this.De=r}}class Xf{constructor(e,t){this.targetId=e,this.Ce=t}}class Zf{constructor(e,t,o=Ae.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=o,this.cause=r}}class Id{constructor(){this.ve=0,this.Fe=Sd(),this.Me=Ae.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Y(),t=Y(),o=Y();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:o=o.add(r);break;default:G(38017,{changeType:i})}}),new yr(this.Me,this.xe,e,t,o)}qe(){this.Oe=!1,this.Fe=Sd()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,te(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class sb{constructor(e){this.Ge=e,this.ze=new Map,this.je=Rt(),this.Je=Zr(),this.He=Zr(),this.Ye=new ue(Q)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const o=this.nt(t);switch(e.state){case 0:this.rt(t)&&o.Le(e.resumeToken);break;case 1:o.Ke(),o.Ne||o.qe(),o.Le(e.resumeToken);break;case 2:o.Ke(),o.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(o.We(),o.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),o.Le(e.resumeToken));break;default:G(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((o,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,o=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Sa(i))if(o===0){const s=new $(i.path);this.et(t,s,Ue.newNoDocument(s,j.min()))}else te(o===1,20013,{expectedCount:o});else{const s=this._t(t);if(s!==o){const c=this.ut(e),l=c?this.ct(c,e,s):1;if(l!==0){this.it(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:o="",padding:r=0},hashCount:i=0}=t;let s,c;try{s=Kt(o).toUint8Array()}catch(l){if(l instanceof If)return vn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new gc(s,r,i)}catch(l){return vn(l instanceof Ho?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,o){return t.Ce.count===o-this.Pt(e,t.targetId)?0:2}Pt(e,t){const o=this.Ge.getRemoteKeysForTarget(t);let r=0;return o.forEach(i=>{const s=this.Ge.ht(),c=`projects/${s.projectId}/databases/${s.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((i,s)=>{const c=this.ot(s);if(c){if(i.current&&Sa(c.target)){const l=new $(c.target.path);this.It(l).has(s)||this.Et(s,l)||this.et(s,l,Ue.newNoDocument(l,e))}i.Be&&(t.set(s,i.ke()),i.qe())}});let o=Y();this.He.forEach((i,s)=>{let c=!0;s.forEachWhile(l=>{const d=this.ot(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(o=o.add(i))}),this.je.forEach((i,s)=>s.setReadTime(e));const r=new ts(e,t,this.Ye,this.je,o);return this.je=Rt(),this.Je=Zr(),this.He=Zr(),this.Ye=new ue(Q),r}Xe(e,t){if(!this.rt(e))return;const o=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,o),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,o){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),o&&(this.je=this.je.insert(t,o))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Id,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Ee(Q),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Ee(Q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||L("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Id),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Zr(){return new ue($.comparator)}function Sd(){return new ue($.comparator)}const ab={asc:"ASCENDING",desc:"DESCENDING"},cb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},lb={and:"AND",or:"OR"};class ub{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ca(n,e){return n.useProto3Json||Wi(e)?e:{value:e}}function Ci(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function eg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function hb(n,e){return Ci(n,e.toTimestamp())}function ht(n){return te(!!n,49232),j.fromTimestamp(function(t){const o=Wt(t);return new oe(o.seconds,o.nanos)}(n))}function mc(n,e){return Ra(n,e).canonicalString()}function Ra(n,e){const t=function(r){return new ie(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function tg(n){const e=ie.fromString(n);return te(sg(e),10190,{key:e.toString()}),e}function ka(n,e){return mc(n.databaseId,e.path)}function ea(n,e){const t=tg(e);if(t.get(1)!==n.databaseId.projectId)throw new U(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(og(t))}function ng(n,e){return mc(n.databaseId,e)}function fb(n){const e=tg(n);return e.length===4?ie.emptyPath():og(e)}function Na(n){return new ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function og(n){return te(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ad(n,e,t){return{name:ka(n,e),fields:t.value.mapValue.fields}}function gb(n,e){let t;if("targetChange"in e){e.targetChange;const o=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:G(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(d,g){return d.useProto3Json?(te(g===void 0||typeof g=="string",58123),Ae.fromBase64String(g||"")):(te(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),Ae.fromUint8Array(g||new Uint8Array))}(n,e.targetChange.resumeToken),s=e.targetChange.cause,c=s&&function(d){const g=d.code===void 0?x.UNKNOWN:Jf(d.code);return new U(g,d.message||"")}(s);t=new Zf(o,r,i,c||null)}else if("documentChange"in e){e.documentChange;const o=e.documentChange;o.document,o.document.name,o.document.updateTime;const r=ea(n,o.document.name),i=ht(o.document.updateTime),s=o.document.createTime?ht(o.document.createTime):j.min(),c=new je({mapValue:{fields:o.document.fields}}),l=Ue.newFoundDocument(r,i,s,c),d=o.targetIds||[],g=o.removedTargetIds||[];t=new fi(d,g,l.key,l)}else if("documentDelete"in e){e.documentDelete;const o=e.documentDelete;o.document;const r=ea(n,o.document),i=o.readTime?ht(o.readTime):j.min(),s=Ue.newNoDocument(r,i),c=o.removedTargetIds||[];t=new fi([],c,s.key,s)}else if("documentRemove"in e){e.documentRemove;const o=e.documentRemove;o.document;const r=ea(n,o.document),i=o.removedTargetIds||[];t=new fi([],i,r,null)}else{if(!("filter"in e))return G(11601,{Rt:e});{e.filter;const o=e.filter;o.targetId;const{count:r=0,unchangedNames:i}=o,s=new nb(r,i),c=o.targetId;t=new Xf(c,s)}}return t}function mb(n,e){let t;if(e instanceof wr)t={update:Ad(n,e.key,e.value)};else if(e instanceof es)t={delete:ka(n,e.key)};else if(e instanceof Zt)t={update:Ad(n,e.key,e.data),updateMask:Ib(e.fieldMask)};else{if(!(e instanceof ZE))return G(16599,{Vt:e.type});t={verify:ka(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(o=>function(i,s){const c=s.transform;if(c instanceof ur)return{fieldPath:s.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof eo)return{fieldPath:s.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof to)return{fieldPath:s.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Di)return{fieldPath:s.field.canonicalString(),increment:c.Ae};throw G(20930,{transform:s.transform})}(0,o))),e.precondition.isNone||(t.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:hb(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:G(27497)}(n,e.precondition)),t}function pb(n,e){return n&&n.length>0?(te(e!==void 0,14353),n.map(t=>function(r,i){let s=r.updateTime?ht(r.updateTime):ht(i);return s.isEqual(j.min())&&(s=ht(i)),new YE(s,r.transformResults||[])}(t,e))):[]}function wb(n,e){return{documents:[ng(n,e.path)]}}function yb(n,e){const t={structuredQuery:{}},o=e.path;let r;e.collectionGroup!==null?(r=o,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=o.popLast(),t.structuredQuery.from=[{collectionId:o.lastSegment()}]),t.parent=ng(n,r);const i=function(d){if(d.length!==0)return ig(it.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const s=function(d){if(d.length!==0)return d.map(g=>function(p){return{field:Ln(p.field),direction:Eb(p.dir)}}(g))}(e.orderBy);s&&(t.structuredQuery.orderBy=s);const c=Ca(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:r}}function _b(n){let e=fb(n.parent);const t=n.structuredQuery,o=t.from?t.from.length:0;let r=null;if(o>0){te(o===1,65062);const g=t.from[0];g.allDescendants?r=g.collectionId:e=e.child(g.collectionId)}let i=[];t.where&&(i=function(f){const p=rg(f);return p instanceof it&&Mf(p)?p.getFilters():[p]}(t.where));let s=[];t.orderBy&&(s=function(f){return f.map(p=>function(A){return new lr(Fn(A.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(A.direction))}(p))}(t.orderBy));let c=null;t.limit&&(c=function(f){let p;return p=typeof f=="object"?f.value:f,Wi(p)?null:p}(t.limit));let l=null;t.startAt&&(l=function(f){const p=!!f.before,v=f.values||[];return new Ai(v,p)}(t.startAt));let d=null;return t.endAt&&(d=function(f){const p=!f.before,v=f.values||[];return new Ai(v,p)}(t.endAt)),UE(e,r,s,i,c,"F",l,d)}function vb(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:r})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function rg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const o=Fn(t.unaryFilter.field);return ye.create(o,"==",{doubleValue:NaN});case"IS_NULL":const r=Fn(t.unaryFilter.field);return ye.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Fn(t.unaryFilter.field);return ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Fn(t.unaryFilter.field);return ye.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}}(n):n.fieldFilter!==void 0?function(t){return ye.create(Fn(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return it.create(t.compositeFilter.filters.map(o=>rg(o)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return G(1026)}}(t.compositeFilter.op))}(n):G(30097,{filter:n})}function Eb(n){return ab[n]}function bb(n){return cb[n]}function Tb(n){return lb[n]}function Ln(n){return{fieldPath:n.canonicalString()}}function Fn(n){return Se.fromServerFormat(n.fieldPath)}function ig(n){return n instanceof ye?function(t){if(t.op==="=="){if(fd(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NAN"}};if(hd(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(fd(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NOT_NAN"}};if(hd(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ln(t.field),op:bb(t.op),value:t.value}}}(n):n instanceof it?function(t){const o=t.getFilters().map(r=>ig(r));return o.length===1?o[0]:{compositeFilter:{op:Tb(t.op),filters:o}}}(n):G(54877,{filter:n})}function Ib(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function sg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e,t,o,r,i=j.min(),s=j.min(),c=Ae.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=o,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sb{constructor(e){this.yt=e}}function Ab(n){const e=_b({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Da(e,e.limit,"L"):e}/**
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
 */class Db{constructor(){this.Cn=new Cb}addToCollectionParentIndex(e,t){return this.Cn.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(Ht.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(Ht.min())}updateCollectionGroup(e,t,o){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}}class Cb{constructor(){this.index={}}add(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t]||new Ee(ie.comparator),i=!r.has(o);return this.index[t]=r.add(o),i}has(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t];return r&&r.has(o)}getEntries(e){return(this.index[e]||new Ee(ie.comparator)).toArray()}}/**
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
 */const Dd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ag=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,o){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(ag,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new no(0)}static cr(){return new no(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cd="LruGarbageCollector",Rb=1048576;function Rd([n,e],[t,o]){const r=Q(n,t);return r===0?Q(e,o):r}class kb{constructor(e){this.Ir=e,this.buffer=new Ee(Rd),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const o=this.buffer.last();Rd(t,o)<0&&(this.buffer=this.buffer.delete(o).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Nb{constructor(e,t,o){this.garbageCollector=e,this.asyncQueue=t,this.localStore=o,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){L(Cd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){yo(t)?L(Cd,"Ignoring IndexedDB error during garbage collection: ",t):await wo(t)}await this.Vr(3e5)})}}class Pb{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(o=>Math.floor(t/100*o))}nthSequenceNumber(e,t){if(t===0)return M.resolve(Hi.ce);const o=new kb(t);return this.mr.forEachTarget(e,r=>o.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>o.Ar(r))).next(()=>o.maxValue)}removeTargets(e,t,o){return this.mr.removeTargets(e,t,o)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(Dd)):this.getCacheSize(e).next(o=>o<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${o} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Dd):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let o,r,i,s,c,l,d;const g=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),r=this.params.maximumSequenceNumbersToCollect):r=f,s=Date.now(),this.nthSequenceNumber(e,r))).next(f=>(o=f,c=Date.now(),this.removeTargets(e,o,t))).next(f=>(i=f,l=Date.now(),this.removeOrphanedDocuments(e,o))).next(f=>(d=Date.now(),Un()<=K.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-g}ms
	Determined least recently used ${r} in `+(c-s)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${f} documents in `+(d-l)+`ms
Total Duration: ${d-g}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:f})))}}function xb(n,e){return new Pb(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mb{constructor(){this.changes=new An(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ue.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const o=this.changes.get(t);return o!==void 0?M.resolve(o):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Bb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ob{constructor(e,t,o,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=o,this.indexManager=r}getDocument(e,t){let o=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(o=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(o!==null&&Zo(o.mutation,r,Ke.empty(),oe.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.getLocalViewOfDocuments(e,o,Y()).next(()=>o))}getLocalViewOfDocuments(e,t,o=Y()){const r=fn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,o).next(i=>{let s=qo();return i.forEach((c,l)=>{s=s.insert(c,l.overlayedDocument)}),s}))}getOverlayedDocuments(e,t){const o=fn();return this.populateOverlays(e,o,t).next(()=>this.computeViews(e,t,o,Y()))}populateOverlays(e,t,o){const r=[];return o.forEach(i=>{t.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((s,c)=>{t.set(s,c)})})}computeViews(e,t,o,r){let i=Rt();const s=Xo(),c=function(){return Xo()}();return t.forEach((l,d)=>{const g=o.get(d.key);r.has(d.key)&&(g===void 0||g.mutation instanceof Zt)?i=i.insert(d.key,d):g!==void 0?(s.set(d.key,g.mutation.getFieldMask()),Zo(g.mutation,d,g.mutation.getFieldMask(),oe.now())):s.set(d.key,Ke.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((d,g)=>s.set(d,g)),t.forEach((d,g)=>c.set(d,new Bb(g,s.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const o=Xo();let r=new ue((s,c)=>s-c),i=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(s=>{for(const c of s)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let g=o.get(l)||Ke.empty();g=c.applyToLocalView(d,g),o.set(l,g);const f=(r.get(c.batchId)||Y()).add(l);r=r.insert(c.batchId,f)})}).next(()=>{const s=[],c=r.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,g=l.value,f=zf();g.forEach(p=>{if(!i.has(p)){const v=Qf(t.get(p),o.get(p));v!==null&&f.set(p,v),i=i.add(p)}}),s.push(this.documentOverlayCache.saveOverlays(e,d,f))}return M.waitFor(s)}).next(()=>o)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.recalculateAndSaveOverlays(e,o))}getDocumentsMatchingQuery(e,t,o,r){return function(s){return $.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Vf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,o,r):this.getDocumentsMatchingCollectionQuery(e,t,o,r)}getNextDocuments(e,t,o,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,o,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,o.largestBatchId,r-i.size):M.resolve(fn());let c=sr,l=i;return s.next(d=>M.forEach(d,(g,f)=>(c<f.largestBatchId&&(c=f.largestBatchId),i.get(g)?M.resolve():this.remoteDocumentCache.getEntry(e,g).next(p=>{l=l.insert(g,p)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,l,d,Y())).next(g=>({batchId:c,changes:Gf(g)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(o=>{let r=qo();return o.isFoundDocument()&&(r=r.insert(o.key,o)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,o,r){const i=t.collectionGroup;let s=qo();return this.indexManager.getCollectionParents(e,i).next(c=>M.forEach(c,l=>{const d=function(f,p){return new _o(p,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,o,r).next(g=>{g.forEach((f,p)=>{s=s.insert(f,p)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,o,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,o.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,o,i,r))).next(s=>{i.forEach((l,d)=>{const g=d.getKey();s.get(g)===null&&(s=s.insert(g,Ue.newInvalidDocument(g)))});let c=qo();return s.forEach((l,d)=>{const g=i.get(l);g!==void 0&&Zo(g.mutation,d,Ke.empty(),oe.now()),Ji(t,d)&&(c=c.insert(l,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ub{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return M.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:ht(r.createTime)}}(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(r){return{name:r.name,query:Ab(r.bundledQuery),readTime:ht(r.readTime)}}(t)),M.resolve()}}/**
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
 */class Vb{constructor(){this.overlays=new ue($.comparator),this.qr=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){const o=fn();return M.forEach(t,r=>this.getOverlay(e,r).next(i=>{i!==null&&o.set(r,i)})).next(()=>o)}saveOverlays(e,t,o){return o.forEach((r,i)=>{this.St(e,t,i)}),M.resolve()}removeOverlaysForBatchId(e,t,o){const r=this.qr.get(o);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(o)),M.resolve()}getOverlaysForCollection(e,t,o){const r=fn(),i=t.length+1,s=new $(t.child("")),c=this.overlays.getIteratorFrom(s);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>o&&r.set(l.getKey(),l)}return M.resolve(r)}getOverlaysForCollectionGroup(e,t,o,r){let i=new ue((d,g)=>d-g);const s=this.overlays.getIterator();for(;s.hasNext();){const d=s.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>o){let g=i.get(d.largestBatchId);g===null&&(g=fn(),i=i.insert(d.largestBatchId,g)),g.set(d.getKey(),d)}}const c=fn(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,g)=>c.set(d,g)),!(c.size()>=r)););return M.resolve(c)}St(e,t,o){const r=this.overlays.get(o.key);if(r!==null){const s=this.qr.get(r.largestBatchId).delete(o.key);this.qr.set(r.largestBatchId,s)}this.overlays=this.overlays.insert(o.key,new tb(t,o));let i=this.qr.get(t);i===void 0&&(i=Y(),this.qr.set(t,i)),this.qr.set(t,i.add(o.key))}}/**
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
 */class Lb{constructor(){this.sessionToken=Ae.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(){this.Qr=new Ee(Te.$r),this.Ur=new Ee(Te.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const o=new Te(e,t);this.Qr=this.Qr.add(o),this.Ur=this.Ur.add(o)}Wr(e,t){e.forEach(o=>this.addReference(o,t))}removeReference(e,t){this.Gr(new Te(e,t))}zr(e,t){e.forEach(o=>this.removeReference(o,t))}jr(e){const t=new $(new ie([])),o=new Te(t,e),r=new Te(t,e+1),i=[];return this.Ur.forEachInRange([o,r],s=>{this.Gr(s),i.push(s.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new $(new ie([])),o=new Te(t,e),r=new Te(t,e+1);let i=Y();return this.Ur.forEachInRange([o,r],s=>{i=i.add(s.key)}),i}containsKey(e){const t=new Te(e,0),o=this.Qr.firstAfterOrEqual(t);return o!==null&&e.isEqual(o.key)}}class Te{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return $.comparator(e.key,t.key)||Q(e.Yr,t.Yr)}static Kr(e,t){return Q(e.Yr,t.Yr)||$.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Ee(Te.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,o,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new eb(i,t,o,r);this.mutationQueue.push(s);for(const c of r)this.Zr=this.Zr.add(new Te(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return M.resolve(s)}lookupMutationBatch(e,t){return M.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const o=t+1,r=this.ei(o),i=r<0?0:r;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?sc:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const o=new Te(t,0),r=new Te(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([o,r],s=>{const c=this.Xr(s.Yr);i.push(c)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let o=new Ee(Q);return t.forEach(r=>{const i=new Te(r,0),s=new Te(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,s],c=>{o=o.add(c.Yr)})}),M.resolve(this.ti(o))}getAllMutationBatchesAffectingQuery(e,t){const o=t.path,r=o.length+1;let i=o;$.isDocumentKey(i)||(i=i.child(""));const s=new Te(new $(i),0);let c=new Ee(Q);return this.Zr.forEachWhile(l=>{const d=l.key.path;return!!o.isPrefixOf(d)&&(d.length===r&&(c=c.add(l.Yr)),!0)},s),M.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(o=>{const r=this.Xr(o);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){te(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let o=this.Zr;return M.forEach(t.mutations,r=>{const i=new Te(r.key,t.batchId);return o=o.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=o})}ir(e){}containsKey(e,t){const o=new Te(t,0),r=this.Zr.firstAfterOrEqual(o);return M.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $b{constructor(e){this.ri=e,this.docs=function(){return new ue($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const o=t.key,r=this.docs.get(o),i=r?r.size:0,s=this.ri(t);return this.docs=this.docs.insert(o,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,o.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const o=this.docs.get(t);return M.resolve(o?o.document.mutableCopy():Ue.newInvalidDocument(t))}getEntries(e,t){let o=Rt();return t.forEach(r=>{const i=this.docs.get(r);o=o.insert(r,i?i.document.mutableCopy():Ue.newInvalidDocument(r))}),M.resolve(o)}getDocumentsMatchingQuery(e,t,o,r){let i=Rt();const s=t.path,c=new $(s.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:g}}=l.getNext();if(!s.isPrefixOf(d.path))break;d.path.length>s.length+1||mE(gE(g),o)<=0||(r.has(g.key)||Ji(t,g))&&(i=i.insert(g.key,g.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,t,o,r){G(9500)}ii(e,t){return M.forEach(this.docs,o=>t(o))}newChangeBuffer(e){return new Gb(this)}getSize(e){return M.resolve(this.size)}}class Gb extends Mb{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((o,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(o)}),M.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(e){this.persistence=e,this.si=new An(t=>lc(t),uc),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.oi=0,this._i=new pc,this.targetCount=0,this.ai=no.ur()}forEachTarget(e,t){return this.si.forEach((o,r)=>t(r)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,o){return o&&(this.lastRemoteSnapshotVersion=o),t>this.oi&&(this.oi=t),M.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new no(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.Pr(t),M.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,o){let r=0;const i=[];return this.si.forEach((s,c)=>{c.sequenceNumber<=t&&o.get(c.targetId)===null&&(this.si.delete(s),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),M.waitFor(i).next(()=>r)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){const o=this.si.get(t)||null;return M.resolve(o)}addMatchingKeys(e,t,o){return this._i.Wr(t,o),M.resolve()}removeMatchingKeys(e,t,o){this._i.zr(t,o);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(s=>{i.push(r.markPotentiallyOrphaned(e,s))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),M.resolve()}getMatchingKeysForTargetId(e,t){const o=this._i.Hr(t);return M.resolve(o)}containsKey(e,t){return M.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e,t){this.ui={},this.overlays={},this.ci=new Hi(0),this.li=!1,this.li=!0,this.hi=new Lb,this.referenceDelegate=e(this),this.Pi=new zb(this),this.indexManager=new Db,this.remoteDocumentCache=function(r){return new $b(r)}(o=>this.referenceDelegate.Ti(o)),this.serializer=new Sb(t),this.Ii=new Ub(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Vb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let o=this.ui[e.toKey()];return o||(o=new Fb(t,this.referenceDelegate),this.ui[e.toKey()]=o),o}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,o){L("MemoryPersistence","Starting transaction:",e);const r=new jb(this.ci.next());return this.referenceDelegate.Ei(),o(r).next(i=>this.referenceDelegate.di(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ai(e,t){return M.or(Object.values(this.ui).map(o=>()=>o.containsKey(e,t)))}}class jb extends wE{constructor(e){super(),this.currentSequenceNumber=e}}class wc{constructor(e){this.persistence=e,this.Ri=new pc,this.Vi=null}static mi(e){return new wc(e)}get fi(){if(this.Vi)return this.Vi;throw G(60996)}addReference(e,t,o){return this.Ri.addReference(o,t),this.fi.delete(o.toString()),M.resolve()}removeReference(e,t,o){return this.Ri.removeReference(o,t),this.fi.add(o.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),M.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(r=>this.fi.add(r.toString()));const o=this.persistence.getTargetCache();return o.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(i=>this.fi.add(i.toString()))}).next(()=>o.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,o=>{const r=$.fromPath(o);return this.gi(e,r).next(i=>{i||t.removeEntry(r,j.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(o=>{o?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return M.or([()=>M.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Ri{constructor(e,t){this.persistence=e,this.pi=new An(o=>vE(o.path),(o,r)=>o.isEqual(r)),this.garbageCollector=xb(this,t)}static mi(e,t){return new Ri(e,t)}Ei(){}di(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(o=>t.next(r=>o+r))}wr(e){let t=0;return this.pr(e,o=>{t++}).next(()=>t)}pr(e,t){return M.forEach(this.pi,(o,r)=>this.br(e,o,r).next(i=>i?M.resolve():t(r)))}removeTargets(e,t,o){return this.persistence.getTargetCache().removeTargets(e,t,o)}removeOrphanedDocuments(e,t){let o=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,s=>this.br(e,s,t).next(c=>{c||(o++,i.removeEntry(s,j.min()))})).next(()=>i.apply(e)).next(()=>o)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){const o=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,o)}addReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),M.resolve()}removeReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ui(e.data.value)),t}br(e,t,o){return M.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.pi.get(t);return M.resolve(r!==void 0&&r>o)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e,t,o,r){this.targetId=e,this.fromCache=t,this.Es=o,this.ds=r}static As(e,t){let o=Y(),r=Y();for(const i of t.docChanges)switch(i.type){case 0:o=o.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new yc(e,t.fromCache,o,r)}}/**
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
 */class qb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Hb{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Uw()?8:yE(Le())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,o,r){const i={result:null};return this.ys(e,t).next(s=>{i.result=s}).next(()=>{if(!i.result)return this.ws(e,t,r,o).next(s=>{i.result=s})}).next(()=>{if(i.result)return;const s=new qb;return this.Ss(e,t,s).next(c=>{if(i.result=c,this.Vs)return this.bs(e,t,s,c.size)})}).next(()=>i.result)}bs(e,t,o,r){return o.documentReadCount<this.fs?(Un()<=K.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Vn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Un()<=K.DEBUG&&L("QueryEngine","Query:",Vn(t),"scans",o.documentReadCount,"local documents and returns",r,"documents as results."),o.documentReadCount>this.gs*r?(Un()<=K.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Vn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,dt(t))):M.resolve())}ys(e,t){if(wd(t))return M.resolve(null);let o=dt(t);return this.indexManager.getIndexType(e,o).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=Da(t,null,"F"),o=dt(t)),this.indexManager.getDocumentsMatchingTarget(e,o).next(i=>{const s=Y(...i);return this.ps.getDocuments(e,s).next(c=>this.indexManager.getMinOffset(e,o).next(l=>{const d=this.Ds(t,c);return this.Cs(t,d,s,l.readTime)?this.ys(e,Da(t,null,"F")):this.vs(e,d,t,l)}))})))}ws(e,t,o,r){return wd(t)||r.isEqual(j.min())?M.resolve(null):this.ps.getDocuments(e,o).next(i=>{const s=this.Ds(t,i);return this.Cs(t,s,o,r)?M.resolve(null):(Un()<=K.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Vn(t)),this.vs(e,s,t,fE(r,sr)).next(c=>c))})}Ds(e,t){let o=new Ee(Ff(e));return t.forEach((r,i)=>{Ji(e,i)&&(o=o.add(i))}),o}Cs(e,t,o,r){if(e.limit===null)return!1;if(o.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,t,o){return Un()<=K.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Vn(t)),this.ps.getDocumentsMatchingQuery(e,t,Ht.min(),o)}vs(e,t,o,r){return this.ps.getDocumentsMatchingQuery(e,o,r).next(i=>(t.forEach(s=>{i=i.insert(s.key,s)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c="LocalStore",Wb=3e8;class Kb{constructor(e,t,o,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new ue(Q),this.xs=new An(i=>lc(i),uc),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(o)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ob(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Qb(n,e,t,o){return new Kb(n,e,t,o)}async function lg(n,e){const t=W(n);return await t.persistence.runTransaction("Handle user change","readonly",o=>{let r;return t.mutationQueue.getAllMutationBatches(o).next(i=>(r=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(o))).next(i=>{const s=[],c=[];let l=Y();for(const d of r){s.push(d.batchId);for(const g of d.mutations)l=l.add(g.key)}for(const d of i){c.push(d.batchId);for(const g of d.mutations)l=l.add(g.key)}return t.localDocuments.getDocuments(o,l).next(d=>({Ls:d,removedBatchIds:s,addedBatchIds:c}))})})}function Yb(n,e){const t=W(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",o=>{const r=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,d,g){const f=d.batch,p=f.keys();let v=M.resolve();return p.forEach(A=>{v=v.next(()=>g.getEntry(l,A)).next(R=>{const k=d.docVersions.get(A);te(k!==null,48541),R.version.compareTo(k)<0&&(f.applyToRemoteDocument(R,d),R.isValidDocument()&&(R.setReadTime(d.commitVersion),g.addEntry(R)))})}),v.next(()=>c.mutationQueue.removeMutationBatch(l,f))}(t,o,e,i).next(()=>i.apply(o)).next(()=>t.mutationQueue.performConsistencyCheck(o)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(o,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(o,function(c){let l=Y();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(o,r))})}function ug(n){const e=W(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Jb(n,e){const t=W(n),o=e.snapshotVersion;let r=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const s=t.Ns.newChangeBuffer({trackRemovals:!0});r=t.Ms;const c=[];e.targetChanges.forEach((g,f)=>{const p=r.get(f);if(!p)return;c.push(t.Pi.removeMatchingKeys(i,g.removedDocuments,f).next(()=>t.Pi.addMatchingKeys(i,g.addedDocuments,f)));let v=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?v=v.withResumeToken(Ae.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):g.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(g.resumeToken,o)),r=r.insert(f,v),function(R,k,V){return R.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=Wb?!0:V.addedDocuments.size+V.modifiedDocuments.size+V.removedDocuments.size>0}(p,v,g)&&c.push(t.Pi.updateTargetData(i,v))});let l=Rt(),d=Y();if(e.documentUpdates.forEach(g=>{e.resolvedLimboDocuments.has(g)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,g))}),c.push(Xb(i,s,e.documentUpdates).next(g=>{l=g.ks,d=g.qs})),!o.isEqual(j.min())){const g=t.Pi.getLastRemoteSnapshotVersion(i).next(f=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,o));c.push(g)}return M.waitFor(c).next(()=>s.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,d)).next(()=>l)}).then(i=>(t.Ms=r,i))}function Xb(n,e,t){let o=Y(),r=Y();return t.forEach(i=>o=o.add(i)),e.getEntries(n,o).next(i=>{let s=Rt();return t.forEach((c,l)=>{const d=i.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),l.isNoDocument()&&l.version.isEqual(j.min())?(e.removeEntry(c,l.readTime),s=s.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),s=s.insert(c,l)):L(_c,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{ks:s,qs:r}})}function Zb(n,e){const t=W(n);return t.persistence.runTransaction("Get next mutation batch","readonly",o=>(e===void 0&&(e=sc),t.mutationQueue.getNextMutationBatchAfterBatchId(o,e)))}function eT(n,e){const t=W(n);return t.persistence.runTransaction("Allocate target","readwrite",o=>{let r;return t.Pi.getTargetData(o,e).next(i=>i?(r=i,M.resolve(r)):t.Pi.allocateTargetId(o).next(s=>(r=new Ft(e,s,"TargetPurposeListen",o.currentSequenceNumber),t.Pi.addTargetData(o,r).next(()=>r))))}).then(o=>{const r=t.Ms.get(o.targetId);return(r===null||o.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(o.targetId,o),t.xs.set(e,o.targetId)),o})}async function Pa(n,e,t){const o=W(n),r=o.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await o.persistence.runTransaction("Release target",i,s=>o.persistence.referenceDelegate.removeTarget(s,r))}catch(s){if(!yo(s))throw s;L(_c,`Failed to update sequence numbers for target ${e}: ${s}`)}o.Ms=o.Ms.remove(e),o.xs.delete(r.target)}function kd(n,e,t){const o=W(n);let r=j.min(),i=Y();return o.persistence.runTransaction("Execute query","readwrite",s=>function(l,d,g){const f=W(l),p=f.xs.get(g);return p!==void 0?M.resolve(f.Ms.get(p)):f.Pi.getTargetData(d,g)}(o,s,dt(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,o.Pi.getMatchingKeysForTargetId(s,c.targetId).next(l=>{i=l})}).next(()=>o.Fs.getDocumentsMatchingQuery(s,e,t?r:j.min(),t?i:Y())).next(c=>(tT(o,LE(e),c),{documents:c,Qs:i})))}function tT(n,e,t){let o=n.Os.get(e)||j.min();t.forEach((r,i)=>{i.readTime.compareTo(o)>0&&(o=i.readTime)}),n.Os.set(e,o)}class Nd{constructor(){this.activeTargetIds=qE()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class nT{constructor(){this.Mo=new Nd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,o){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,o){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Nd,Promise.resolve()}handleUserChange(e,t,o){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class oT{Oo(e){}shutdown(){}}/**
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
 */const Pd="ConnectivityMonitor";class xd{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){L(Pd,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){L(Pd,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ei=null;function xa(){return ei===null?ei=function(){return 268435456+Math.round(2147483648*Math.random())}():ei++,"0x"+ei.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta="RestConnection",rT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class iT{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",o=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${o}/databases/${r}`,this.Wo=this.databaseId.database===Ii?`project_id=${o}`:`project_id=${o}&database_id=${r}`}Go(e,t,o,r,i){const s=xa(),c=this.zo(e,t.toUriEncodedString());L(ta,`Sending RPC '${e}' ${s}:`,c,o);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,r,i);const{host:d}=new URL(c),g=fo(d);return this.Jo(e,c,l,o,g).then(f=>(L(ta,`Received RPC '${e}' ${s}: `,f),f),f=>{throw vn(ta,`RPC '${e}' ${s} failed with error: `,f,"url: ",c,"request:",o),f})}Ho(e,t,o,r,i,s){return this.Go(e,t,o,r,i)}jo(e,t,o){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+po}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((r,i)=>e[i]=r),o&&o.headers.forEach((r,i)=>e[i]=r)}zo(e,t){const o=rT[e];return`${this.Uo}/v1/${t}:${o}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="WebChannelConnection";class aT extends iT{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,o,r,i){const s=xa();return new Promise((c,l)=>{const d=new df;d.setWithCredentials(!0),d.listenOnce(hf.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case li.NO_ERROR:const f=d.getResponseJson();L(Be,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),c(f);break;case li.TIMEOUT:L(Be,`RPC '${e}' ${s} timed out`),l(new U(x.DEADLINE_EXCEEDED,"Request time out"));break;case li.HTTP_ERROR:const p=d.getStatus();if(L(Be,`RPC '${e}' ${s} failed with status:`,p,"response text:",d.getResponseText()),p>0){let v=d.getResponseJson();Array.isArray(v)&&(v=v[0]);const A=v?.error;if(A&&A.status&&A.message){const R=function(V){const F=V.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(F)>=0?F:x.UNKNOWN}(A.status);l(new U(R,A.message))}else l(new U(x.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new U(x.UNAVAILABLE,"Connection failed."));break;default:G(9055,{l_:e,streamId:s,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{L(Be,`RPC '${e}' ${s} completed.`)}});const g=JSON.stringify(r);L(Be,`RPC '${e}' ${s} sending request:`,r),d.send(t,"POST",g,o,15)})}T_(e,t,o){const r=xa(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=mf(),c=gf(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,o),l.encodeInitMessageHeaders=!0;const g=i.join("");L(Be,`Creating RPC '${e}' stream ${r}: ${g}`,l);const f=s.createWebChannel(g,l);this.I_(f);let p=!1,v=!1;const A=new sT({Yo:k=>{v?L(Be,`Not sending because RPC '${e}' stream ${r} is closed:`,k):(p||(L(Be,`Opening RPC '${e}' stream ${r} transport.`),f.open(),p=!0),L(Be,`RPC '${e}' stream ${r} sending:`,k),f.send(k))},Zo:()=>f.close()}),R=(k,V,F)=>{k.listen(V,q=>{try{F(q)}catch(re){setTimeout(()=>{throw re},0)}})};return R(f,jo.EventType.OPEN,()=>{v||(L(Be,`RPC '${e}' stream ${r} transport opened.`),A.o_())}),R(f,jo.EventType.CLOSE,()=>{v||(v=!0,L(Be,`RPC '${e}' stream ${r} transport closed`),A.a_(),this.E_(f))}),R(f,jo.EventType.ERROR,k=>{v||(v=!0,vn(Be,`RPC '${e}' stream ${r} transport errored. Name:`,k.name,"Message:",k.message),A.a_(new U(x.UNAVAILABLE,"The operation could not be completed")))}),R(f,jo.EventType.MESSAGE,k=>{if(!v){const V=k.data[0];te(!!V,16349);const F=V,q=F?.error||F[0]?.error;if(q){L(Be,`RPC '${e}' stream ${r} received error:`,q);const re=q.status;let be=function(w){const _=we[w];if(_!==void 0)return Jf(_)}(re),se=q.message;be===void 0&&(be=x.INTERNAL,se="Unknown error status: "+re+" with message "+q.message),v=!0,A.a_(new U(be,se)),f.close()}else L(Be,`RPC '${e}' stream ${r} received:`,V),A.u_(V)}}),R(c,ff.STAT_EVENT,k=>{k.stat===va.PROXY?L(Be,`RPC '${e}' stream ${r} detected buffering proxy`):k.stat===va.NOPROXY&&L(Be,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{A.__()},0),A}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function na(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(n){return new ub(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dg{constructor(e,t,o=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=o,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),o=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-o);r>0&&L("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${o} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="PersistentStream";class hg{constructor(e,t,o,r,i,s,c,l){this.Mi=e,this.S_=o,this.b_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new dg(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(Ct(t.toString()),Ct("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([o,r])=>{this.D_===t&&this.G_(o,r)},o=>{e(()=>{const r=new U(x.UNKNOWN,"Fetching auth token failed: "+o.message);return this.z_(r)})})}G_(e,t){const o=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{o(()=>this.listener.Xo())}),this.stream.t_(()=>{o(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{o(()=>this.z_(r))}),this.stream.onMessage(r=>{o(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return L(Md,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(L(Md,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class cT extends hg{constructor(e,t,o,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,o,r,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=gb(this.serializer,e),o=function(i){if(!("targetChange"in i))return j.min();const s=i.targetChange;return s.targetIds&&s.targetIds.length?j.min():s.readTime?ht(s.readTime):j.min()}(e);return this.listener.H_(t,o)}Y_(e){const t={};t.database=Na(this.serializer),t.addTarget=function(i,s){let c;const l=s.target;if(c=Sa(l)?{documents:wb(i,l)}:{query:yb(i,l).ft},c.targetId=s.targetId,s.resumeToken.approximateByteSize()>0){c.resumeToken=eg(i,s.resumeToken);const d=Ca(i,s.expectedCount);d!==null&&(c.expectedCount=d)}else if(s.snapshotVersion.compareTo(j.min())>0){c.readTime=Ci(i,s.snapshotVersion.toTimestamp());const d=Ca(i,s.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const o=vb(this.serializer,e);o&&(t.labels=o),this.q_(t)}Z_(e){const t={};t.database=Na(this.serializer),t.removeTarget=e,this.q_(t)}}class lT extends hg{constructor(e,t,o,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,o,r,s),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=pb(e.writeResults,e.commitTime),o=ht(e.commitTime);return this.listener.na(o,t)}ra(){const e={};e.database=Na(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(o=>mb(this.serializer,o))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{}class dT extends uT{constructor(e,t,o,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=o,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new U(x.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,o,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Go(e,Ra(t,o),r,i,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(x.UNKNOWN,i.toString())})}Ho(e,t,o,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,c])=>this.connection.Ho(e,Ra(t,o),r,s,c,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(x.UNKNOWN,s.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class hT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ct(t),this.aa=!1):L("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En="RemoteStore";class fT{constructor(e,t,o,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=o,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(s=>{o.enqueueAndForget(async()=>{Dn(this)&&(L(En,"Restarting streams for network reachability change."),await async function(l){const d=W(l);d.Ea.add(4),await _r(d),d.Ra.set("Unknown"),d.Ea.delete(4),await os(d)}(this))})}),this.Ra=new hT(o,r)}}async function os(n){if(Dn(n))for(const e of n.da)await e(!0)}async function _r(n){for(const e of n.da)await e(!1)}function fg(n,e){const t=W(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Tc(t)?bc(t):vo(t).O_()&&Ec(t,e))}function vc(n,e){const t=W(n),o=vo(t);t.Ia.delete(e),o.O_()&&gg(t,e),t.Ia.size===0&&(o.O_()?o.L_():Dn(t)&&t.Ra.set("Unknown"))}function Ec(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}vo(n).Y_(e)}function gg(n,e){n.Va.Ue(e),vo(n).Z_(e)}function bc(n){n.Va=new sb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),vo(n).start(),n.Ra.ua()}function Tc(n){return Dn(n)&&!vo(n).x_()&&n.Ia.size>0}function Dn(n){return W(n).Ea.size===0}function mg(n){n.Va=void 0}async function gT(n){n.Ra.set("Online")}async function mT(n){n.Ia.forEach((e,t)=>{Ec(n,e)})}async function pT(n,e){mg(n),Tc(n)?(n.Ra.ha(e),bc(n)):n.Ra.set("Unknown")}async function wT(n,e,t){if(n.Ra.set("Online"),e instanceof Zf&&e.state===2&&e.cause)try{await async function(r,i){const s=i.cause;for(const c of i.targetIds)r.Ia.has(c)&&(await r.remoteSyncer.rejectListen(c,s),r.Ia.delete(c),r.Va.removeTarget(c))}(n,e)}catch(o){L(En,"Failed to remove targets %s: %s ",e.targetIds.join(","),o),await ki(n,o)}else if(e instanceof fi?n.Va.Ze(e):e instanceof Xf?n.Va.st(e):n.Va.tt(e),!t.isEqual(j.min()))try{const o=await ug(n.localStore);t.compareTo(o)>=0&&await function(i,s){const c=i.Va.Tt(s);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const g=i.Ia.get(d);g&&i.Ia.set(d,g.withResumeToken(l.resumeToken,s))}}),c.targetMismatches.forEach((l,d)=>{const g=i.Ia.get(l);if(!g)return;i.Ia.set(l,g.withResumeToken(Ae.EMPTY_BYTE_STRING,g.snapshotVersion)),gg(i,l);const f=new Ft(g.target,l,d,g.sequenceNumber);Ec(i,f)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(o){L(En,"Failed to raise snapshot:",o),await ki(n,o)}}async function ki(n,e,t){if(!yo(e))throw e;n.Ea.add(1),await _r(n),n.Ra.set("Offline"),t||(t=()=>ug(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L(En,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await os(n)})}function pg(n,e){return e().catch(t=>ki(n,t,e))}async function rs(n){const e=W(n),t=Yt(e);let o=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:sc;for(;yT(e);)try{const r=await Zb(e.localStore,o);if(r===null){e.Ta.length===0&&t.L_();break}o=r.batchId,_T(e,r)}catch(r){await ki(e,r)}wg(e)&&yg(e)}function yT(n){return Dn(n)&&n.Ta.length<10}function _T(n,e){n.Ta.push(e);const t=Yt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function wg(n){return Dn(n)&&!Yt(n).x_()&&n.Ta.length>0}function yg(n){Yt(n).start()}async function vT(n){Yt(n).ra()}async function ET(n){const e=Yt(n);for(const t of n.Ta)e.ea(t.mutations)}async function bT(n,e,t){const o=n.Ta.shift(),r=fc.from(o,e,t);await pg(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await rs(n)}async function TT(n,e){e&&Yt(n).X_&&await async function(o,r){if(function(s){return ob(s)&&s!==x.ABORTED}(r.code)){const i=o.Ta.shift();Yt(o).B_(),await pg(o,()=>o.remoteSyncer.rejectFailedWrite(i.batchId,r)),await rs(o)}}(n,e),wg(n)&&yg(n)}async function Bd(n,e){const t=W(n);t.asyncQueue.verifyOperationInProgress(),L(En,"RemoteStore received new credentials");const o=Dn(t);t.Ea.add(3),await _r(t),o&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await os(t)}async function IT(n,e){const t=W(n);e?(t.Ea.delete(2),await os(t)):e||(t.Ea.add(2),await _r(t),t.Ra.set("Unknown"))}function vo(n){return n.ma||(n.ma=function(t,o,r){const i=W(t);return i.sa(),new cT(o,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:gT.bind(null,n),t_:mT.bind(null,n),r_:pT.bind(null,n),H_:wT.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Tc(n)?bc(n):n.Ra.set("Unknown")):(await n.ma.stop(),mg(n))})),n.ma}function Yt(n){return n.fa||(n.fa=function(t,o,r){const i=W(t);return i.sa(),new lT(o,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:vT.bind(null,n),r_:TT.bind(null,n),ta:ET.bind(null,n),na:bT.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await rs(n)):(await n.fa.stop(),n.Ta.length>0&&(L(En,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(e,t,o,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=o,this.op=r,this.removalCallback=i,this.deferred=new It,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(s=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,o,r,i){const s=Date.now()+o,c=new Ic(e,t,s,r,i);return c.start(o),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Sc(n,e){if(Ct("AsyncQueue",`${e}: ${n}`),yo(n))return new U(x.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{static emptySet(e){return new qn(e.comparator)}constructor(e){this.comparator=e?(t,o)=>e(t,o)||$.comparator(t.key,o.key):(t,o)=>$.comparator(t.key,o.key),this.keyedMap=qo(),this.sortedSet=new ue(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,o)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof qn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),o=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=o.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const o=new qn;return o.comparator=this.comparator,o.keyedMap=e,o.sortedSet=t,o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(){this.ga=new ue($.comparator)}track(e){const t=e.doc.key,o=this.ga.get(t);o?e.type!==0&&o.type===3?this.ga=this.ga.insert(t,e):e.type===3&&o.type!==1?this.ga=this.ga.insert(t,{type:o.type,doc:e.doc}):e.type===2&&o.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&o.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&o.type===0?this.ga=this.ga.remove(t):e.type===1&&o.type===2?this.ga=this.ga.insert(t,{type:1,doc:o.doc}):e.type===0&&o.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):G(63341,{Rt:e,pa:o}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,o)=>{e.push(o)}),e}}class oo{constructor(e,t,o,r,i,s,c,l,d){this.query=e,this.docs=t,this.oldDocs=o,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,o,r,i){const s=[];return t.forEach(c=>{s.push({type:0,doc:c})}),new oo(e,t,qn.emptySet(t),s,o,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Yi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,o=e.docChanges;if(t.length!==o.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==o[r].type||!t[r].doc.isEqual(o[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class AT{constructor(){this.queries=Ud(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,o){const r=W(t),i=r.queries;r.queries=Ud(),i.forEach((s,c)=>{for(const l of c.Sa)l.onError(o)})})(this,new U(x.ABORTED,"Firestore shutting down"))}}function Ud(){return new An(n=>Lf(n),Yi)}async function Ac(n,e){const t=W(n);let o=3;const r=e.query;let i=t.queries.get(r);i?!i.ba()&&e.Da()&&(o=2):(i=new ST,o=e.Da()?0:1);try{switch(o){case 0:i.wa=await t.onListen(r,!0);break;case 1:i.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(s){const c=Sc(s,`Initialization of query '${Vn(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Cc(t)}async function Dc(n,e){const t=W(n),o=e.query;let r=3;const i=t.queries.get(o);if(i){const s=i.Sa.indexOf(e);s>=0&&(i.Sa.splice(s,1),i.Sa.length===0?r=e.Da()?0:1:!i.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(o),t.onUnlisten(o,!0);case 1:return t.queries.delete(o),t.onUnlisten(o,!1);case 2:return t.onLastRemoteStoreUnlisten(o);default:return}}function DT(n,e){const t=W(n);let o=!1;for(const r of e){const i=r.query,s=t.queries.get(i);if(s){for(const c of s.Sa)c.Fa(r)&&(o=!0);s.wa=r}}o&&Cc(t)}function CT(n,e,t){const o=W(n),r=o.queries.get(e);if(r)for(const i of r.Sa)i.onError(t);o.queries.delete(e)}function Cc(n){n.Ca.forEach(e=>{e.next()})}var Ma,Vd;(Vd=Ma||(Ma={})).Ma="default",Vd.Cache="cache";class Rc{constructor(e,t,o){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=o||{}}Fa(e){if(!this.options.includeMetadataChanges){const o=[];for(const r of e.docChanges)r.type!==3&&o.push(r);e=new oo(e.query,e.docs,e.oldDocs,o,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const o=t!=="Offline";return(!this.options.qa||!o)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=oo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ma.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e){this.key=e}}class vg{constructor(e){this.key=e}}class RT{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Y(),this.mutatedKeys=Y(),this.eu=Ff(e),this.tu=new qn(this.eu)}get nu(){return this.Ya}ru(e,t){const o=t?t.iu:new Od,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,c=!1;const l=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((g,f)=>{const p=r.get(g),v=Ji(this.query,f)?f:null,A=!!p&&this.mutatedKeys.has(p.key),R=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let k=!1;p&&v?p.data.isEqual(v.data)?A!==R&&(o.track({type:3,doc:v}),k=!0):this.su(p,v)||(o.track({type:2,doc:v}),k=!0,(l&&this.eu(v,l)>0||d&&this.eu(v,d)<0)&&(c=!0)):!p&&v?(o.track({type:0,doc:v}),k=!0):p&&!v&&(o.track({type:1,doc:p}),k=!0,(l||d)&&(c=!0)),k&&(v?(s=s.add(v),i=R?i.add(g):i.delete(g)):(s=s.delete(g),i=i.delete(g)))}),this.query.limit!==null)for(;s.size>this.query.limit;){const g=this.query.limitType==="F"?s.last():s.first();s=s.delete(g.key),i=i.delete(g.key),o.track({type:1,doc:g})}return{tu:s,iu:o,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,o,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const s=e.iu.ya();s.sort((g,f)=>function(v,A){const R=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{Rt:k})}};return R(v)-R(A)}(g.type,f.type)||this.eu(g.doc,f.doc)),this.ou(o),r=r??!1;const c=t&&!r?this._u():[],l=this.Xa.size===0&&this.current&&!r?1:0,d=l!==this.Za;return this.Za=l,s.length!==0||d?{snapshot:new oo(this.query,e.tu,i,s,e.mutatedKeys,l===0,d,!1,!!o&&o.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Od,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Y(),this.tu.forEach(o=>{this.uu(o.key)&&(this.Xa=this.Xa.add(o.key))});const t=[];return e.forEach(o=>{this.Xa.has(o)||t.push(new vg(o))}),this.Xa.forEach(o=>{e.has(o)||t.push(new _g(o))}),t}cu(e){this.Ya=e.Qs,this.Xa=Y();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return oo.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const kc="SyncEngine";class kT{constructor(e,t,o){this.query=e,this.targetId=t,this.view=o}}class NT{constructor(e){this.key=e,this.hu=!1}}class PT{constructor(e,t,o,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=o,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new An(c=>Lf(c),Yi),this.Iu=new Map,this.Eu=new Set,this.du=new ue($.comparator),this.Au=new Map,this.Ru=new pc,this.Vu={},this.mu=new Map,this.fu=no.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function xT(n,e,t=!0){const o=Ag(n);let r;const i=o.Tu.get(e);return i?(o.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await Eg(o,e,t,!0),r}async function MT(n,e){const t=Ag(n);await Eg(t,e,!0,!1)}async function Eg(n,e,t,o){const r=await eT(n.localStore,dt(e)),i=r.targetId,s=n.sharedClientState.addLocalQueryTarget(i,t);let c;return o&&(c=await BT(n,e,i,s==="current",r.resumeToken)),n.isPrimaryClient&&t&&fg(n.remoteStore,r),c}async function BT(n,e,t,o,r){n.pu=(f,p,v)=>async function(R,k,V,F){let q=k.view.ru(V);q.Cs&&(q=await kd(R.localStore,k.query,!1).then(({documents:T})=>k.view.ru(T,q)));const re=F&&F.targetChanges.get(k.targetId),be=F&&F.targetMismatches.get(k.targetId)!=null,se=k.view.applyChanges(q,R.isPrimaryClient,re,be);return Fd(R,k.targetId,se.au),se.snapshot}(n,f,p,v);const i=await kd(n.localStore,e,!0),s=new RT(e,i.Qs),c=s.ru(i.documents),l=yr.createSynthesizedTargetChangeForCurrentChange(t,o&&n.onlineState!=="Offline",r),d=s.applyChanges(c,n.isPrimaryClient,l);Fd(n,t,d.au);const g=new kT(e,t,s);return n.Tu.set(e,g),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function OT(n,e,t){const o=W(n),r=o.Tu.get(e),i=o.Iu.get(r.targetId);if(i.length>1)return o.Iu.set(r.targetId,i.filter(s=>!Yi(s,e))),void o.Tu.delete(e);o.isPrimaryClient?(o.sharedClientState.removeLocalQueryTarget(r.targetId),o.sharedClientState.isActiveQueryTarget(r.targetId)||await Pa(o.localStore,r.targetId,!1).then(()=>{o.sharedClientState.clearQueryState(r.targetId),t&&vc(o.remoteStore,r.targetId),Ba(o,r.targetId)}).catch(wo)):(Ba(o,r.targetId),await Pa(o.localStore,r.targetId,!0))}async function UT(n,e){const t=W(n),o=t.Tu.get(e),r=t.Iu.get(o.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(o.targetId),vc(t.remoteStore,o.targetId))}async function VT(n,e,t){const o=qT(n);try{const r=await function(s,c){const l=W(s),d=oe.now(),g=c.reduce((v,A)=>v.add(A.key),Y());let f,p;return l.persistence.runTransaction("Locally write mutations","readwrite",v=>{let A=Rt(),R=Y();return l.Ns.getEntries(v,g).next(k=>{A=k,A.forEach((V,F)=>{F.isValidDocument()||(R=R.add(V))})}).next(()=>l.localDocuments.getOverlayedDocuments(v,A)).next(k=>{f=k;const V=[];for(const F of c){const q=XE(F,f.get(F.key).overlayedDocument);q!=null&&V.push(new Zt(F.key,q,Nf(q.value.mapValue),Ge.exists(!0)))}return l.mutationQueue.addMutationBatch(v,d,V,c)}).next(k=>{p=k;const V=k.applyToLocalDocumentSet(f,R);return l.documentOverlayCache.saveOverlays(v,k.batchId,V)})}).then(()=>({batchId:p.batchId,changes:Gf(f)}))}(o.localStore,e);o.sharedClientState.addPendingMutation(r.batchId),function(s,c,l){let d=s.Vu[s.currentUser.toKey()];d||(d=new ue(Q)),d=d.insert(c,l),s.Vu[s.currentUser.toKey()]=d}(o,r.batchId,t),await vr(o,r.changes),await rs(o.remoteStore)}catch(r){const i=Sc(r,"Failed to persist write");t.reject(i)}}async function bg(n,e){const t=W(n);try{const o=await Jb(t.localStore,e);e.targetChanges.forEach((r,i)=>{const s=t.Au.get(i);s&&(te(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?s.hu=!0:r.modifiedDocuments.size>0?te(s.hu,14607):r.removedDocuments.size>0&&(te(s.hu,42227),s.hu=!1))}),await vr(t,o,e)}catch(o){await wo(o)}}function Ld(n,e,t){const o=W(n);if(o.isPrimaryClient&&t===0||!o.isPrimaryClient&&t===1){const r=[];o.Tu.forEach((i,s)=>{const c=s.view.va(e);c.snapshot&&r.push(c.snapshot)}),function(s,c){const l=W(s);l.onlineState=c;let d=!1;l.queries.forEach((g,f)=>{for(const p of f.Sa)p.va(c)&&(d=!0)}),d&&Cc(l)}(o.eventManager,e),r.length&&o.Pu.H_(r),o.onlineState=e,o.isPrimaryClient&&o.sharedClientState.setOnlineState(e)}}async function LT(n,e,t){const o=W(n);o.sharedClientState.updateQueryState(e,"rejected",t);const r=o.Au.get(e),i=r&&r.key;if(i){let s=new ue($.comparator);s=s.insert(i,Ue.newNoDocument(i,j.min()));const c=Y().add(i),l=new ts(j.min(),new Map,new ue(Q),s,c);await bg(o,l),o.du=o.du.remove(i),o.Au.delete(e),Nc(o)}else await Pa(o.localStore,e,!1).then(()=>Ba(o,e,t)).catch(wo)}async function FT(n,e){const t=W(n),o=e.batch.batchId;try{const r=await Yb(t.localStore,e);Ig(t,o,null),Tg(t,o),t.sharedClientState.updateMutationState(o,"acknowledged"),await vr(t,r)}catch(r){await wo(r)}}async function $T(n,e,t){const o=W(n);try{const r=await function(s,c){const l=W(s);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let g;return l.mutationQueue.lookupMutationBatch(d,c).next(f=>(te(f!==null,37113),g=f.keys(),l.mutationQueue.removeMutationBatch(d,f))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,g,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,g)).next(()=>l.localDocuments.getDocuments(d,g))})}(o.localStore,e);Ig(o,e,t),Tg(o,e),o.sharedClientState.updateMutationState(e,"rejected",t),await vr(o,r)}catch(r){await wo(r)}}function Tg(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Ig(n,e,t){const o=W(n);let r=o.Vu[o.currentUser.toKey()];if(r){const i=r.get(e);i&&(t?i.reject(t):i.resolve(),r=r.remove(e)),o.Vu[o.currentUser.toKey()]=r}}function Ba(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const o of n.Iu.get(e))n.Tu.delete(o),t&&n.Pu.yu(o,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(o=>{n.Ru.containsKey(o)||Sg(n,o)})}function Sg(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(vc(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Nc(n))}function Fd(n,e,t){for(const o of t)o instanceof _g?(n.Ru.addReference(o.key,e),GT(n,o)):o instanceof vg?(L(kc,"Document no longer in limbo: "+o.key),n.Ru.removeReference(o.key,e),n.Ru.containsKey(o.key)||Sg(n,o.key)):G(19791,{wu:o})}function GT(n,e){const t=e.key,o=t.path.canonicalString();n.du.get(t)||n.Eu.has(o)||(L(kc,"New document in limbo: "+t),n.Eu.add(o),Nc(n))}function Nc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new $(ie.fromString(e)),o=n.fu.next();n.Au.set(o,new NT(t)),n.du=n.du.insert(t,o),fg(n.remoteStore,new Ft(dt(Qi(t.path)),o,"TargetPurposeLimboResolution",Hi.ce))}}async function vr(n,e,t){const o=W(n),r=[],i=[],s=[];o.Tu.isEmpty()||(o.Tu.forEach((c,l)=>{s.push(o.pu(l,e,t).then(d=>{if((d||t)&&o.isPrimaryClient){const g=d?!d.fromCache:t?.targetChanges.get(l.targetId)?.current;o.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){r.push(d);const g=yc.As(l.targetId,d);i.push(g)}}))}),await Promise.all(s),o.Pu.H_(r),await async function(l,d){const g=W(l);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>M.forEach(d,p=>M.forEach(p.Es,v=>g.persistence.referenceDelegate.addReference(f,p.targetId,v)).next(()=>M.forEach(p.ds,v=>g.persistence.referenceDelegate.removeReference(f,p.targetId,v)))))}catch(f){if(!yo(f))throw f;L(_c,"Failed to update sequence numbers: "+f)}for(const f of d){const p=f.targetId;if(!f.fromCache){const v=g.Ms.get(p),A=v.snapshotVersion,R=v.withLastLimboFreeSnapshotVersion(A);g.Ms=g.Ms.insert(p,R)}}}(o.localStore,i))}async function zT(n,e){const t=W(n);if(!t.currentUser.isEqual(e)){L(kc,"User change. New user:",e.toKey());const o=await lg(t.localStore,e);t.currentUser=e,function(i,s){i.mu.forEach(c=>{c.forEach(l=>{l.reject(new U(x.CANCELLED,s))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,o.removedBatchIds,o.addedBatchIds),await vr(t,o.Ls)}}function jT(n,e){const t=W(n),o=t.Au.get(e);if(o&&o.hu)return Y().add(o.key);{let r=Y();const i=t.Iu.get(e);if(!i)return r;for(const s of i){const c=t.Tu.get(s);r=r.unionWith(c.view.nu)}return r}}function Ag(n){const e=W(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=bg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=jT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=LT.bind(null,e),e.Pu.H_=DT.bind(null,e.eventManager),e.Pu.yu=CT.bind(null,e.eventManager),e}function qT(n){const e=W(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=FT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$T.bind(null,e),e}class Ni{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ns(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Qb(this.persistence,new Hb,e.initialUser,this.serializer)}Cu(e){return new cg(wc.mi,this.serializer)}Du(e){return new nT}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ni.provider={build:()=>new Ni};class HT extends Ni{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){te(this.persistence.referenceDelegate instanceof Ri,46915);const o=this.persistence.referenceDelegate.garbageCollector;return new Nb(o,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new cg(o=>Ri.mi(o,t),this.serializer)}}class Oa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=o=>Ld(this.syncEngine,o,1),this.remoteStore.remoteSyncer.handleCredentialChange=zT.bind(null,this.syncEngine),await IT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new AT}()}createDatastore(e){const t=ns(e.databaseInfo.databaseId),o=function(i){return new aT(i)}(e.databaseInfo);return function(i,s,c,l){return new dT(i,s,c,l)}(e.authCredentials,e.appCheckCredentials,o,t)}createRemoteStore(e){return function(o,r,i,s,c){return new fT(o,r,i,s,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Ld(this.syncEngine,t,0),function(){return xd.v()?new xd:new oT}())}createSyncEngine(e,t){return function(r,i,s,c,l,d,g){const f=new PT(r,i,s,c,l,d);return g&&(f.gu=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const o=W(t);L(En,"RemoteStore shutting down."),o.Ea.add(5),await _r(o),o.Aa.shutdown(),o.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Oa.provider={build:()=>new Oa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Pc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ct("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="FirestoreClient";class WT{constructor(e,t,o,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=o,this.databaseInfo=r,this.user=Oe.UNAUTHENTICATED,this.clientId=ji.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(o,async s=>{L(Jt,"Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(o,s=>(L(Jt,"Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new It;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const o=Sc(t,"Failed to shutdown persistence");e.reject(o)}}),e.promise}}async function oa(n,e){n.asyncQueue.verifyOperationInProgress(),L(Jt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let o=t.initialUser;n.setCredentialChangeListener(async r=>{o.isEqual(r)||(await lg(e.localStore,r),o=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function $d(n,e){n.asyncQueue.verifyOperationInProgress();const t=await KT(n);L(Jt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(o=>Bd(e.remoteStore,o)),n.setAppCheckTokenChangeListener((o,r)=>Bd(e.remoteStore,r)),n._onlineComponents=e}async function KT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(Jt,"Using user provided OfflineComponentProvider");try{await oa(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===x.FAILED_PRECONDITION||r.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;vn("Error using user provided cache. Falling back to memory cache: "+t),await oa(n,new Ni)}}else L(Jt,"Using default OfflineComponentProvider"),await oa(n,new HT(void 0));return n._offlineComponents}async function Dg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(Jt,"Using user provided OnlineComponentProvider"),await $d(n,n._uninitializedComponentsProvider._online)):(L(Jt,"Using default OnlineComponentProvider"),await $d(n,new Oa))),n._onlineComponents}function QT(n){return Dg(n).then(e=>e.syncEngine)}async function Pi(n){const e=await Dg(n),t=e.eventManager;return t.onListen=xT.bind(null,e.syncEngine),t.onUnlisten=OT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=MT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=UT.bind(null,e.syncEngine),t}function YT(n,e,t={}){const o=new It;return n.asyncQueue.enqueueAndForget(async()=>function(i,s,c,l,d){const g=new Pc({next:p=>{g.Nu(),s.enqueueAndForget(()=>Dc(i,f));const v=p.docs.has(c);!v&&p.fromCache?d.reject(new U(x.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&p.fromCache&&l&&l.source==="server"?d.reject(new U(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(p)},error:p=>d.reject(p)}),f=new Rc(Qi(c.path),g,{includeMetadataChanges:!0,qa:!0});return Ac(i,f)}(await Pi(n),n.asyncQueue,e,t,o)),o.promise}function JT(n,e,t={}){const o=new It;return n.asyncQueue.enqueueAndForget(async()=>function(i,s,c,l,d){const g=new Pc({next:p=>{g.Nu(),s.enqueueAndForget(()=>Dc(i,f)),p.fromCache&&l.source==="server"?d.reject(new U(x.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(p)},error:p=>d.reject(p)}),f=new Rc(c,g,{includeMetadataChanges:!0,qa:!0});return Ac(i,f)}(await Pi(n),n.asyncQueue,e,t,o)),o.promise}/**
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
 */function Cg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg="firestore.googleapis.com",zd=!0;class jd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new U(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Rg,this.ssl=zd}else this.host=e.host,this.ssl=e.ssl??zd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ag;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Rb)throw new U(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}vf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Cg(e.experimentalLongPollingOptions??{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new U(x.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new U(x.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new U(x.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(o,r){return o.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class is{constructor(e,t,o,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=o,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(o){if(!o)return new yf;switch(o.type){case"firstParty":return new aE(o.sessionIndex||"0",o.iamToken||null,o.authTokenFactory||null);case"provider":return o.client;default:throw new U(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const o=Gd.get(t);o&&(L("ComponentProvider","Removing Datastore"),Gd.delete(t),o.terminate())}(this),Promise.resolve()}}function kg(n,e,t,o={}){n=Ve(n,is);const r=fo(e),i=n._getSettings(),s={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&(Eh(`https://${c}`),bh("Firestore",!0)),i.host!==Rg&&i.host!==c&&vn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:r,emulatorOptions:o};if(!ft(l,s)&&(n._setSettings(l),o.mockUserToken)){let d,g;if(typeof o.mockUserToken=="string")d=o.mockUserToken,g=Oe.MOCK_USER;else{d=Rw(o.mockUserToken,n._app?.options.projectId);const f=o.mockUserToken.sub||o.mockUserToken.user_id;if(!f)throw new U(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new Oe(f)}n._authCredentials=new rE(new wf(d,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e,t,o){this.converter=t,this._query=o,this.type="query",this.firestore=e}withConverter(e){return new kt(this.firestore,e,this._query)}}class ce{constructor(e,t,o){this.converter=t,this._key=o,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new St(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ce(this.firestore,e,this._key)}toJSON(){return{type:ce._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,o){if(pr(t,ce._jsonSchema))return new ce(e,o||null,new $(ie.fromString(t.referencePath)))}}ce._jsonSchemaVersion="firestore/documentReference/1.0",ce._jsonSchema={type:_e("string",ce._jsonSchemaVersion),referencePath:_e("string")};class St extends kt{constructor(e,t,o){super(e,t,Qi(o)),this._path=o,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ce(this.firestore,null,new $(e))}withConverter(e){return new St(this.firestore,e,this._path)}}function pe(n,e,...t){if(n=he(n),_f("collection","path",e),n instanceof is){const o=ie.fromString(e,...t);return od(o),new St(n,null,o)}{if(!(n instanceof ce||n instanceof St))throw new U(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(ie.fromString(e,...t));return od(o),new St(n.firestore,null,o)}}function fe(n,e,...t){if(n=he(n),arguments.length===1&&(e=ji.newId()),_f("doc","path",e),n instanceof is){const o=ie.fromString(e,...t);return nd(o),new ce(n,null,new $(o))}{if(!(n instanceof ce||n instanceof St))throw new U(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(ie.fromString(e,...t));return nd(o),new ce(n.firestore,n instanceof St?n.converter:null,new $(o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd="AsyncQueue";class Hd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new dg(this,"async_queue_retry"),this._c=()=>{const o=na();o&&L(qd,"Visibility state changed to "+o.visibilityState),this.M_.w_()},this.ac=e;const t=na();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=na();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new It;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!yo(e))throw e;L(qd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(o=>{throw this.nc=o,this.rc=!1,Ct("INTERNAL UNHANDLED ERROR: ",Wd(o)),o}).then(o=>(this.rc=!1,o))));return this.ac=t,t}enqueueAfterDelay(e,t,o){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=Ic.createAndSchedule(this,e,t,o,i=>this.hc(i));return this.tc.push(r),r}uc(){this.nc&&G(47125,{Pc:Wd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,o)=>t.targetTimeMs-o.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Wd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Kd(n){return function(t,o){if(typeof t!="object"||t===null)return!1;const r=t;for(const i of o)if(i in r&&typeof r[i]=="function")return!0;return!1}(n,["next","error","complete"])}class st extends is{constructor(e,t,o,r){super(e,t,o,r),this.type="firestore",this._queue=new Hd,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Hd(e),this._firestoreClient=void 0,await e}}}function Ng(n,e){const t=typeof n=="object"?n:Ka(),o=typeof n=="string"?n:Ii,r=Sn(t,"firestore").getImmediate({identifier:o});if(!r._initialized){const i=Dw("firestore");i&&kg(r,...i)}return r}function Eo(n){if(n._terminated)throw new U(x.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||XT(n),n._firestoreClient}function XT(n){const e=n._freezeSettings(),t=function(r,i,s,c){return new TE(r,i,s,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Cg(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new WT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(r){const i=r?._online.build();return{_offline:r?._offline.build(i),_online:i}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this._byteString=e}static fromBase64String(e){try{return new We(Ae.fromBase64String(e))}catch(t){throw new U(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new We(Ae.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:We._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(pr(e,We._jsonSchema))return We.fromBase64String(e.bytes)}}We._jsonSchemaVersion="firestore/bytes/1.0",We._jsonSchema={type:_e("string",We._jsonSchemaVersion),bytes:_e("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Se(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:nt._jsonSchemaVersion}}static fromJSON(e){if(pr(e,nt._jsonSchema))return new nt(e.latitude,e.longitude)}}nt._jsonSchemaVersion="firestore/geoPoint/1.0",nt._jsonSchema={type:_e("string",nt._jsonSchemaVersion),latitude:_e("number"),longitude:_e("number")};/**
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
 */class ot{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(o,r){if(o.length!==r.length)return!1;for(let i=0;i<o.length;++i)if(o[i]!==r[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ot._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(pr(e,ot._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ot(e.vectorValues);throw new U(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ot._jsonSchemaVersion="firestore/vectorValue/1.0",ot._jsonSchema={type:_e("string",ot._jsonSchemaVersion),vectorValues:_e("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZT=/^__.*__$/;class eI{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return this.fieldMask!==null?new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new wr(e,this.data,t,this.fieldTransforms)}}class Pg{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function xg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{Ac:n})}}class ss{constructor(e,t,o,r,i,s){this.settings=e,this.databaseId=t,this.serializer=o,this.ignoreUndefinedProperties=r,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new ss({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.gc(e),o}yc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.Rc(),o}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return xi(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(xg(this.Ac)&&ZT.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class tI{constructor(e,t,o){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=o||ns(e)}Cc(e,t,o,r=!1){return new ss({Ac:e,methodName:t,Dc:o,path:Se.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Er(n){const e=n._freezeSettings(),t=ns(n._databaseId);return new tI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function xc(n,e,t,o,r,i={}){const s=n.Cc(i.merge||i.mergeFields?2:0,e,t,r);Uc("Data must be an object, but it was:",s,o);const c=Ug(o,s);let l,d;if(i.merge)l=new Ke(s.fieldMask),d=s.fieldTransforms;else if(i.mergeFields){const g=[];for(const f of i.mergeFields){const p=Ua(e,f,t);if(!s.contains(p))throw new U(x.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);Lg(g,p)||g.push(p)}l=new Ke(g),d=s.fieldTransforms.filter(f=>l.covers(f.field))}else l=null,d=s.fieldTransforms;return new eI(new je(c),l,d)}class as extends Cn{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof as}}function Mg(n,e,t){return new ss({Ac:3,Dc:e.settings.Dc,methodName:n._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Mc extends Cn{_toFieldTransform(e){return new hc(e.path,new ur)}isEqual(e){return e instanceof Mc}}class Bc extends Cn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Mg(this,e,!0),o=this.vc.map(i=>Rn(i,t)),r=new eo(o);return new hc(e.path,r)}isEqual(e){return e instanceof Bc&&ft(this.vc,e.vc)}}class Oc extends Cn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Mg(this,e,!0),o=this.vc.map(i=>Rn(i,t)),r=new to(o);return new hc(e.path,r)}isEqual(e){return e instanceof Oc&&ft(this.vc,e.vc)}}function Bg(n,e,t,o){const r=n.Cc(1,e,t);Uc("Data must be an object, but it was:",r,o);const i=[],s=je.empty();Xt(o,(l,d)=>{const g=Vc(e,l,t);d=he(d);const f=r.yc(g);if(d instanceof as)i.push(g);else{const p=Rn(d,f);p!=null&&(i.push(g),s.set(g,p))}});const c=new Ke(i);return new Pg(s,c,r.fieldTransforms)}function Og(n,e,t,o,r,i){const s=n.Cc(1,e,t),c=[Ua(e,o,t)],l=[r];if(i.length%2!=0)throw new U(x.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)c.push(Ua(e,i[p])),l.push(i[p+1]);const d=[],g=je.empty();for(let p=c.length-1;p>=0;--p)if(!Lg(d,c[p])){const v=c[p];let A=l[p];A=he(A);const R=s.yc(v);if(A instanceof as)d.push(v);else{const k=Rn(A,R);k!=null&&(d.push(v),g.set(v,k))}}const f=new Ke(d);return new Pg(g,f,s.fieldTransforms)}function nI(n,e,t,o=!1){return Rn(t,n.Cc(o?4:3,e))}function Rn(n,e){if(Vg(n=he(n)))return Uc("Unsupported field value:",e,n),Ug(n,e);if(n instanceof Cn)return function(o,r){if(!xg(r.Ac))throw r.Sc(`${o._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${o._methodName}() is not currently supported inside arrays`);const i=o._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(o,r){const i=[];let s=0;for(const c of o){let l=Rn(c,r.wc(s));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),s++}return{arrayValue:{values:i}}}(n,e)}return function(o,r){if((o=he(o))===null)return{nullValue:"NULL_VALUE"};if(typeof o=="number")return HE(r.serializer,o);if(typeof o=="boolean")return{booleanValue:o};if(typeof o=="string")return{stringValue:o};if(o instanceof Date){const i=oe.fromDate(o);return{timestampValue:Ci(r.serializer,i)}}if(o instanceof oe){const i=new oe(o.seconds,1e3*Math.floor(o.nanoseconds/1e3));return{timestampValue:Ci(r.serializer,i)}}if(o instanceof nt)return{geoPointValue:{latitude:o.latitude,longitude:o.longitude}};if(o instanceof We)return{bytesValue:eg(r.serializer,o._byteString)};if(o instanceof ce){const i=r.databaseId,s=o.firestore._databaseId;if(!s.isEqual(i))throw r.Sc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:mc(o.firestore._databaseId||r.databaseId,o._key.path)}}if(o instanceof ot)return function(s,c){return{mapValue:{fields:{[Rf]:{stringValue:kf},[Si]:{arrayValue:{values:s.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return dc(c.serializer,d)})}}}}}}(o,r);throw r.Sc(`Unsupported field value: ${qi(o)}`)}(n,e)}function Ug(n,e){const t={};return Tf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xt(n,(o,r)=>{const i=Rn(r,e.mc(o));i!=null&&(t[o]=i)}),{mapValue:{fields:t}}}function Vg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof nt||n instanceof We||n instanceof ce||n instanceof Cn||n instanceof ot)}function Uc(n,e,t){if(!Vg(t)||!Ef(t)){const o=qi(t);throw o==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+o)}}function Ua(n,e,t){if((e=he(e))instanceof bo)return e._internalPath;if(typeof e=="string")return Vc(n,e);throw xi("Field path arguments must be of type string or ",n,!1,void 0,t)}const oI=new RegExp("[~\\*/\\[\\]]");function Vc(n,e,t){if(e.search(oI)>=0)throw xi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new bo(...e.split("."))._internalPath}catch{throw xi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function xi(n,e,t,o,r){const i=o&&!o.isEmpty(),s=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||s)&&(l+=" (found",i&&(l+=` in field ${o}`),s&&(l+=` in document ${r}`),l+=")"),new U(x.INVALID_ARGUMENT,c+n+l)}function Lg(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(e,t,o,r,i){this._firestore=e,this._userDataWriter=t,this._key=o,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ce(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new rI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(cs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class rI extends Fg{data(){return super.data()}}function cs(n,e){return typeof e=="string"?Vc(n,e):e instanceof bo?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(x.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Lc{}class Fc extends Lc{}function ke(n,e,...t){let o=[];e instanceof Lc&&o.push(e),o=o.concat(t),function(i){const s=i.filter(l=>l instanceof ls).length,c=i.filter(l=>l instanceof br).length;if(s>1||s>0&&c>0)throw new U(x.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(o);for(const r of o)n=r._apply(n);return n}class br extends Fc{constructor(e,t,o){super(),this._field=e,this._op=t,this._value=o,this.type="where"}static _create(e,t,o){return new br(e,t,o)}_apply(e){const t=this._parse(e);return zg(e._query,t),new kt(e.firestore,e.converter,Aa(e._query,t))}_parse(e){const t=Er(e.firestore);return function(i,s,c,l,d,g,f){let p;if(d.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new U(x.INVALID_ARGUMENT,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){Yd(f,g);const A=[];for(const R of f)A.push(Qd(l,i,R));p={arrayValue:{values:A}}}else p=Qd(l,i,f)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||Yd(f,g),p=nI(c,s,f,g==="in"||g==="not-in");return ye.create(d,g,p)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function De(n,e,t){const o=e,r=cs("where",n);return br._create(r,o,t)}class ls extends Lc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ls(e,t)}_parse(e){const t=this._queryConstraints.map(o=>o._parse(e)).filter(o=>o.getFilters().length>0);return t.length===1?t[0]:it.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,i){let s=r;const c=i.getFlattenedFilters();for(const l of c)zg(s,l),s=Aa(s,l)}(e._query,t),new kt(e.firestore,e.converter,Aa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class us extends Fc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new us(e,t)}_apply(e){const t=function(r,i,s){if(r.startAt!==null)throw new U(x.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new U(x.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new lr(i,s)}(e._query,this._field,this._direction);return new kt(e.firestore,e.converter,function(r,i){const s=r.explicitOrderBy.concat([i]);return new _o(r.path,r.collectionGroup,s,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,t))}}function Gg(n,e="asc"){const t=e,o=cs("orderBy",n);return us._create(o,t)}function Qd(n,e,t){if(typeof(t=he(t))=="string"){if(t==="")throw new U(x.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Vf(e)&&t.indexOf("/")!==-1)throw new U(x.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const o=e.path.child(ie.fromString(t));if(!$.isDocumentKey(o))throw new U(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${o}' is not because it has an odd number of segments (${o.length}).`);return dd(n,new $(o))}if(t instanceof ce)return dd(n,t._key);throw new U(x.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${qi(t)}.`)}function Yd(n,e){if(!Array.isArray(n)||n.length===0)throw new U(x.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function zg(n,e){const t=function(r,i){for(const s of r)for(const c of s.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(x.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(x.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class jg{convertValue(e,t="none"){switch(Qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Kt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const o={};return Xt(e,(r,i)=>{o[r]=this.convertValue(i,t)}),o}convertVectorValue(e){const t=e.fields?.[Si].arrayValue?.values?.map(o=>me(o.doubleValue));return new ot(t)}convertGeoPoint(e){return new nt(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map(o=>this.convertValue(o,t))}convertServerTimestamp(e,t){switch(t){case"previous":const o=Ki(e);return o==null?null:this.convertValue(o,t);case"estimate":return this.convertTimestamp(ar(e));default:return null}}convertTimestamp(e){const t=Wt(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const o=ie.fromString(e);te(sg(o),9688,{name:e});const r=new Jn(o.get(1),o.get(3)),i=new $(o.popFirst(5));return r.isEqual(t)||Ct(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $c(n,e,t){let o;return o=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,o}class $n{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class jt extends Fg{constructor(e,t,o,r,i,s){super(e,t,o,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new er(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const o=this._document.data.field(cs("DocumentSnapshot.get",e));if(o!==null)return this._userDataWriter.convertValue(o,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=jt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}jt._jsonSchemaVersion="firestore/documentSnapshot/1.0",jt._jsonSchema={type:_e("string",jt._jsonSchemaVersion),bundleSource:_e("string","DocumentSnapshot"),bundleName:_e("string"),bundle:_e("string")};class er extends jt{data(e={}){return super.data(e)}}class qt{constructor(e,t,o,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new $n(r.hasPendingWrites,r.fromCache),this.query=o}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(o=>{e.call(t,new er(this._firestore,this._userDataWriter,o.key,o,new $n(this._snapshot.mutatedKeys.has(o.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let s=0;return r._snapshot.docChanges.map(c=>{const l=new er(r._firestore,r._userDataWriter,c.doc.key,c.doc,new $n(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:s++}})}{let s=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new er(r._firestore,r._userDataWriter,c.doc.key,c.doc,new $n(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,g=-1;return c.type!==0&&(d=s.indexOf(c.doc.key),s=s.delete(c.doc.key)),c.type!==1&&(s=s.add(c.doc),g=s.indexOf(c.doc.key)),{type:iI(c.type),doc:l,oldIndex:d,newIndex:g}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=qt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ji.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],o=[],r=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),o.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function iI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(n){n=Ve(n,ce);const e=Ve(n.firestore,st);return YT(Eo(e),n._key).then(t=>qg(e,n,t))}qt._jsonSchemaVersion="firestore/querySnapshot/1.0",qt._jsonSchema={type:_e("string",qt._jsonSchemaVersion),bundleSource:_e("string","QuerySnapshot"),bundleName:_e("string"),bundle:_e("string")};class Gc extends jg{constructor(e){super(),this.firestore=e}convertBytes(e){return new We(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ce(this.firestore,null,t)}}function wt(n){n=Ve(n,kt);const e=Ve(n.firestore,st),t=Eo(e),o=new Gc(e);return $g(n._query),JT(t,n._query).then(r=>new qt(e,o,n,r))}function sI(n,e,t){n=Ve(n,ce);const o=Ve(n.firestore,st),r=$c(n.converter,e,t);return Io(o,[xc(Er(o),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Ge.none())])}function en(n,e,t,...o){n=Ve(n,ce);const r=Ve(n.firestore,st),i=Er(r);let s;return s=typeof(e=he(e))=="string"||e instanceof bo?Og(i,"updateDoc",n._key,e,t,o):Bg(i,"updateDoc",n._key,e),Io(r,[s.toMutation(n._key,Ge.exists(!0))])}function To(n){return Io(Ve(n.firestore,st),[new es(n._key,Ge.none())])}function tn(n,e){const t=Ve(n.firestore,st),o=fe(n),r=$c(n.converter,e);return Io(t,[xc(Er(n.firestore),"addDoc",o._key,r,n.converter!==null,{}).toMutation(o._key,Ge.exists(!1))]).then(()=>o)}function Ir(n,...e){n=he(n);let t={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Kd(e[o])||(t=e[o++]);const r={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Kd(e[o])){const l=e[o];e[o]=l.next?.bind(l),e[o+1]=l.error?.bind(l),e[o+2]=l.complete?.bind(l)}let i,s,c;if(n instanceof ce)s=Ve(n.firestore,st),c=Qi(n._key.path),i={next:l=>{e[o]&&e[o](qg(s,n,l))},error:e[o+1],complete:e[o+2]};else{const l=Ve(n,kt);s=Ve(l.firestore,st),c=l._query;const d=new Gc(s);i={next:g=>{e[o]&&e[o](new qt(s,d,l,g))},error:e[o+1],complete:e[o+2]},$g(n._query)}return function(d,g,f,p){const v=new Pc(p),A=new Rc(g,v,f);return d.asyncQueue.enqueueAndForget(async()=>Ac(await Pi(d),A)),()=>{v.Nu(),d.asyncQueue.enqueueAndForget(async()=>Dc(await Pi(d),A))}}(Eo(s),c,r,i)}function Io(n,e){return function(o,r){const i=new It;return o.asyncQueue.enqueueAndForget(async()=>VT(await QT(o),r,i)),i.promise}(Eo(n),e)}function qg(n,e,t){const o=t.docs.get(e._key),r=new Gc(n);return new jt(n,r,e._key,o,new $n(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hg{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Er(e)}set(e,t,o){this._verifyNotCommitted();const r=ra(e,this._firestore),i=$c(r.converter,t,o),s=xc(this._dataReader,"WriteBatch.set",r._key,i,r.converter!==null,o);return this._mutations.push(s.toMutation(r._key,Ge.none())),this}update(e,t,o,...r){this._verifyNotCommitted();const i=ra(e,this._firestore);let s;return s=typeof(t=he(t))=="string"||t instanceof bo?Og(this._dataReader,"WriteBatch.update",i._key,t,o,r):Bg(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,Ge.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ra(e,this._firestore);return this._mutations=this._mutations.concat(new es(t._key,Ge.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new U(x.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ra(n,e){if((n=he(n)).firestore!==e)throw new U(x.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function ds(){return new Mc("serverTimestamp")}function aI(...n){return new Bc("arrayUnion",n)}function cI(...n){return new Oc("arrayRemove",n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sr(n){return Eo(n=Ve(n,st)),new Hg(n,e=>Io(n,e))}(function(e,t=!0){(function(r){po=r})(go),gt(new rt("firestore",(o,{instanceIdentifier:r,options:i})=>{const s=o.getProvider("app").getImmediate(),c=new st(new iE(o.getProvider("auth-internal")),new cE(s,o.getProvider("app-check-internal")),function(d,g){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jn(d.options.projectId,g)}(s,r),s);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Je(Xu,Zu,e),Je(Xu,Zu,"esm2020")})();const Ye=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:jg,Bytes:We,CollectionReference:St,DocumentReference:ce,DocumentSnapshot:jt,FieldPath:bo,FieldValue:Cn,Firestore:st,FirestoreError:U,GeoPoint:nt,Query:kt,QueryCompositeFilterConstraint:ls,QueryConstraint:Fc,QueryDocumentSnapshot:er,QueryFieldFilterConstraint:br,QueryOrderByConstraint:us,QuerySnapshot:qt,SnapshotMetadata:$n,Timestamp:oe,VectorValue:ot,WriteBatch:Hg,_AutoId:ji,_ByteString:Ae,_DatabaseId:Jn,_DocumentKey:$,_EmptyAuthCredentialsProvider:yf,_FieldPath:Se,_cast:Ve,_logWarn:vn,_validateIsNotUsedTogether:vf,addDoc:tn,arrayRemove:cI,arrayUnion:aI,collection:pe,connectFirestoreEmulator:kg,deleteDoc:To,doc:fe,ensureFirestoreConfigured:Eo,executeWrite:Io,getDoc:Tr,getDocs:wt,getFirestore:Ng,onSnapshot:Ir,orderBy:Gg,query:ke,serverTimestamp:ds,setDoc:sI,updateDoc:en,where:De,writeBatch:Sr},Symbol.toStringTag,{value:"Module"})),Wg="@firebase/installations",zc="0.6.19";/**
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
 */const Kg=1e4,Qg=`w:${zc}`,Yg="FIS_v2",lI="https://firebaseinstallations.googleapis.com/v1",uI=3600*1e3,dI="installations",hI="Installations";/**
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
 */const fI={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},bn=new In(dI,hI,fI);function Jg(n){return n instanceof at&&n.code.includes("request-failed")}/**
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
 */function Xg({projectId:n}){return`${lI}/projects/${n}/installations`}function Zg(n){return{token:n.token,requestStatus:2,expiresIn:mI(n.expiresIn),creationTime:Date.now()}}async function em(n,e){const o=(await e.json()).error;return bn.create("request-failed",{requestName:n,serverCode:o.code,serverMessage:o.message,serverStatus:o.status})}function tm({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function gI(n,{refreshToken:e}){const t=tm(n);return t.append("Authorization",pI(e)),t}async function nm(n){const e=await n();return e.status>=500&&e.status<600?n():e}function mI(n){return Number(n.replace("s","000"))}function pI(n){return`${Yg} ${n}`}/**
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
 */async function wI({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const o=Xg(n),r=tm(n),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const s={fid:t,authVersion:Yg,appId:n.appId,sdkVersion:Qg},c={method:"POST",headers:r,body:JSON.stringify(s)},l=await nm(()=>fetch(o,c));if(l.ok){const d=await l.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Zg(d.authToken)}}else throw await em("Create Installation",l)}/**
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
 */function om(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function yI(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const _I=/^[cdef][\w-]{21}$/,Va="";function vI(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=EI(n);return _I.test(t)?t:Va}catch{return Va}}function EI(n){return yI(n).substr(0,22)}/**
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
 */function hs(n){return`${n.appName}!${n.appId}`}/**
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
 */const rm=new Map;function im(n,e){const t=hs(n);sm(t,e),bI(t,e)}function sm(n,e){const t=rm.get(n);if(t)for(const o of t)o(e)}function bI(n,e){const t=TI();t&&t.postMessage({key:n,fid:e}),II()}let gn=null;function TI(){return!gn&&"BroadcastChannel"in self&&(gn=new BroadcastChannel("[Firebase] FID Change"),gn.onmessage=n=>{sm(n.data.key,n.data.fid)}),gn}function II(){rm.size===0&&gn&&(gn.close(),gn=null)}/**
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
 */const SI="firebase-installations-database",AI=1,Tn="firebase-installations-store";let ia=null;function jc(){return ia||(ia=Ch(SI,AI,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Tn)}}})),ia}async function Mi(n,e){const t=hs(n),r=(await jc()).transaction(Tn,"readwrite"),i=r.objectStore(Tn),s=await i.get(t);return await i.put(e,t),await r.done,(!s||s.fid!==e.fid)&&im(n,e.fid),e}async function am(n){const e=hs(n),o=(await jc()).transaction(Tn,"readwrite");await o.objectStore(Tn).delete(e),await o.done}async function fs(n,e){const t=hs(n),r=(await jc()).transaction(Tn,"readwrite"),i=r.objectStore(Tn),s=await i.get(t),c=e(s);return c===void 0?await i.delete(t):await i.put(c,t),await r.done,c&&(!s||s.fid!==c.fid)&&im(n,c.fid),c}/**
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
 */async function qc(n){let e;const t=await fs(n.appConfig,o=>{const r=DI(o),i=CI(n,r);return e=i.registrationPromise,i.installationEntry});return t.fid===Va?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function DI(n){const e=n||{fid:vI(),registrationStatus:0};return cm(e)}function CI(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(bn.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},o=RI(n,t);return{installationEntry:t,registrationPromise:o}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:kI(n)}:{installationEntry:e}}async function RI(n,e){try{const t=await wI(n,e);return Mi(n.appConfig,t)}catch(t){throw Jg(t)&&t.customData.serverCode===409?await am(n.appConfig):await Mi(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function kI(n){let e=await Jd(n.appConfig);for(;e.registrationStatus===1;)await om(100),e=await Jd(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:o}=await qc(n);return o||t}return e}function Jd(n){return fs(n,e=>{if(!e)throw bn.create("installation-not-found");return cm(e)})}function cm(n){return NI(n)?{fid:n.fid,registrationStatus:0}:n}function NI(n){return n.registrationStatus===1&&n.registrationTime+Kg<Date.now()}/**
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
 */async function PI({appConfig:n,heartbeatServiceProvider:e},t){const o=xI(n,t),r=gI(n,t),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const s={installation:{sdkVersion:Qg,appId:n.appId}},c={method:"POST",headers:r,body:JSON.stringify(s)},l=await nm(()=>fetch(o,c));if(l.ok){const d=await l.json();return Zg(d)}else throw await em("Generate Auth Token",l)}function xI(n,{fid:e}){return`${Xg(n)}/${e}/authTokens:generate`}/**
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
 */async function Hc(n,e=!1){let t;const o=await fs(n.appConfig,i=>{if(!lm(i))throw bn.create("not-registered");const s=i.authToken;if(!e&&OI(s))return i;if(s.requestStatus===1)return t=MI(n,e),i;{if(!navigator.onLine)throw bn.create("app-offline");const c=VI(i);return t=BI(n,c),c}});return t?await t:o.authToken}async function MI(n,e){let t=await Xd(n.appConfig);for(;t.authToken.requestStatus===1;)await om(100),t=await Xd(n.appConfig);const o=t.authToken;return o.requestStatus===0?Hc(n,e):o}function Xd(n){return fs(n,e=>{if(!lm(e))throw bn.create("not-registered");const t=e.authToken;return LI(t)?{...e,authToken:{requestStatus:0}}:e})}async function BI(n,e){try{const t=await PI(n,e),o={...e,authToken:t};return await Mi(n.appConfig,o),t}catch(t){if(Jg(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await am(n.appConfig);else{const o={...e,authToken:{requestStatus:0}};await Mi(n.appConfig,o)}throw t}}function lm(n){return n!==void 0&&n.registrationStatus===2}function OI(n){return n.requestStatus===2&&!UI(n)}function UI(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+uI}function VI(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function LI(n){return n.requestStatus===1&&n.requestTime+Kg<Date.now()}/**
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
 */async function FI(n){const e=n,{installationEntry:t,registrationPromise:o}=await qc(e);return o?o.catch(console.error):Hc(e).catch(console.error),t.fid}/**
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
 */async function $I(n,e=!1){const t=n;return await GI(t),(await Hc(t,e)).token}async function GI(n){const{registrationPromise:e}=await qc(n);e&&await e}/**
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
 */function zI(n){if(!n||!n.options)throw sa("App Configuration");if(!n.name)throw sa("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw sa(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function sa(n){return bn.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const um="installations",jI="installations-internal",qI=n=>{const e=n.getProvider("app").getImmediate(),t=zI(e),o=Sn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:o,_delete:()=>Promise.resolve()}},HI=n=>{const e=n.getProvider("app").getImmediate(),t=Sn(e,um).getImmediate();return{getId:()=>FI(t),getToken:r=>$I(t,r)}};function WI(){gt(new rt(um,qI,"PUBLIC")),gt(new rt(jI,HI,"PRIVATE"))}WI();Je(Wg,zc);Je(Wg,zc,"esm2020");/**
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
 */const Bi="analytics",KI="firebase_id",QI="origin",YI=60*1e3,JI="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Wc="https://www.googletagmanager.com/gtag/js";/**
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
 */const qe=new Fi("@firebase/analytics");/**
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
 */const XI={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Qe=new In("analytics","Analytics",XI);/**
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
 */function ZI(n){if(!n.startsWith(Wc)){const e=Qe.create("invalid-gtag-resource",{gtagURL:n});return qe.warn(e.message),""}return n}function dm(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function eS(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function tS(n,e){const t=eS("firebase-js-sdk-policy",{createScriptURL:ZI}),o=document.createElement("script"),r=`${Wc}?l=${n}&id=${e}`;o.src=t?t?.createScriptURL(r):r,o.async=!0,document.head.appendChild(o)}function nS(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function oS(n,e,t,o,r,i){const s=o[r];try{if(s)await e[s];else{const l=(await dm(t)).find(d=>d.measurementId===r);l&&await e[l.appId]}}catch(c){qe.error(c)}n("config",r,i)}async function rS(n,e,t,o,r){try{let i=[];if(r&&r.send_to){let s=r.send_to;Array.isArray(s)||(s=[s]);const c=await dm(t);for(const l of s){const d=c.find(f=>f.measurementId===l),g=d&&e[d.appId];if(g)i.push(g);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),n("event",o,r||{})}catch(i){qe.error(i)}}function iS(n,e,t,o){async function r(i,...s){try{if(i==="event"){const[c,l]=s;await rS(n,e,t,c,l)}else if(i==="config"){const[c,l]=s;await oS(n,e,t,o,c,l)}else if(i==="consent"){const[c,l]=s;n("consent",c,l)}else if(i==="get"){const[c,l,d]=s;n("get",c,l,d)}else if(i==="set"){const[c]=s;n("set",c)}else n(i,...s)}catch(c){qe.error(c)}}return r}function sS(n,e,t,o,r){let i=function(...s){window[o].push(arguments)};return window[r]&&typeof window[r]=="function"&&(i=window[r]),window[r]=iS(i,n,e,t),{gtagCore:i,wrappedGtag:window[r]}}function aS(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Wc)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cS=30,lS=1e3;class uS{constructor(e={},t=lS){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const hm=new uS;function dS(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function hS(n){const{appId:e,apiKey:t}=n,o={method:"GET",headers:dS(t)},r=JI.replace("{app-id}",e),i=await fetch(r,o);if(i.status!==200&&i.status!==304){let s="";try{const c=await i.json();c.error?.message&&(s=c.error.message)}catch{}throw Qe.create("config-fetch-failed",{httpStatus:i.status,responseMessage:s})}return i.json()}async function fS(n,e=hm,t){const{appId:o,apiKey:r,measurementId:i}=n.options;if(!o)throw Qe.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:o};throw Qe.create("no-api-key")}const s=e.getThrottleMetadata(o)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new pS;return setTimeout(async()=>{c.abort()},YI),fm({appId:o,apiKey:r,measurementId:i},s,c,e)}async function fm(n,{throttleEndTimeMillis:e,backoffCount:t},o,r=hm){const{appId:i,measurementId:s}=n;try{await gS(o,e)}catch(c){if(s)return qe.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:i,measurementId:s};throw c}try{const c=await hS(n);return r.deleteThrottleMetadata(i),c}catch(c){const l=c;if(!mS(l)){if(r.deleteThrottleMetadata(i),s)return qe.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${l?.message}]`),{appId:i,measurementId:s};throw c}const d=Number(l?.customData?.httpStatus)===503?Su(t,r.intervalMillis,cS):Su(t,r.intervalMillis),g={throttleEndTimeMillis:Date.now()+d,backoffCount:t+1};return r.setThrottleMetadata(i,g),qe.debug(`Calling attemptFetch again in ${d} millis`),fm(n,g,o,r)}}function gS(n,e){return new Promise((t,o)=>{const r=Math.max(e-Date.now(),0),i=setTimeout(t,r);n.addEventListener(()=>{clearTimeout(i),o(Qe.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function mS(n){if(!(n instanceof at)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class pS{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function wS(n,e,t,o,r){if(r&&r.global){n("event",t,o);return}else{const i=await e,s={...o,send_to:i};n("event",t,s)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yS(){if(Ih())try{await Sh()}catch(n){return qe.warn(Qe.create("indexeddb-unavailable",{errorInfo:n?.toString()}).message),!1}else return qe.warn(Qe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function _S(n,e,t,o,r,i,s){const c=fS(n);c.then(p=>{t[p.measurementId]=p.appId,n.options.measurementId&&p.measurementId!==n.options.measurementId&&qe.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>qe.error(p)),e.push(c);const l=yS().then(p=>{if(p)return o.getId()}),[d,g]=await Promise.all([c,l]);aS(i)||tS(i,d.measurementId),r("js",new Date);const f=s?.config??{};return f[QI]="firebase",f.update=!0,g!=null&&(f[KI]=g),r("config",d.measurementId,f),d.measurementId}/**
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
 */class vS{constructor(e){this.app=e}_delete(){return delete tr[this.app.options.appId],Promise.resolve()}}let tr={},Zd=[];const eh={};let aa="dataLayer",ES="gtag",th,gm,nh=!1;function bS(){const n=[];if(Th()&&n.push("This is a browser extension environment."),Vw()||n.push("Cookies are not available."),n.length>0){const e=n.map((o,r)=>`(${r+1}) ${o}`).join(" "),t=Qe.create("invalid-analytics-context",{errorInfo:e});qe.warn(t.message)}}function TS(n,e,t){bS();const o=n.options.appId;if(!o)throw Qe.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)qe.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Qe.create("no-api-key");if(tr[o]!=null)throw Qe.create("already-exists",{id:o});if(!nh){nS(aa);const{wrappedGtag:i,gtagCore:s}=sS(tr,Zd,eh,aa,ES);gm=i,th=s,nh=!0}return tr[o]=_S(n,Zd,eh,e,th,aa,t),new vS(n)}function IS(n=Ka()){n=he(n);const e=Sn(n,Bi);return e.isInitialized()?e.getImmediate():SS(n)}function SS(n,e={}){const t=Sn(n,Bi);if(t.isInitialized()){const r=t.getImmediate();if(ft(e,t.getOptions()))return r;throw Qe.create("already-initialized")}return t.initialize({options:e})}function AS(n,e,t,o){n=he(n),wS(gm,tr[n.app.options.appId],e,t,o).catch(r=>qe.error(r))}const oh="@firebase/analytics",rh="0.10.18";function DS(){gt(new rt(Bi,(e,{options:t})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return TS(o,r,t)},"PUBLIC")),gt(new rt("analytics-internal",n,"PRIVATE")),Je(oh,rh),Je(oh,rh,"esm2020");function n(e){try{const t=e.getProvider(Bi).getImmediate();return{logEvent:(o,r,i)=>AS(t,o,r,i)}}catch(t){throw Qe.create("interop-component-reg-failed",{reason:t})}}}DS();const cn={},mm={apiKey:cn?.VITE_FIREBASE_API_KEY||"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:cn?.VITE_FIREBASE_AUTH_DOMAIN||"controle-financeiro-b98ec.firebaseapp.com",projectId:cn?.VITE_FIREBASE_PROJECT_ID||"controle-financeiro-b98ec",storageBucket:cn?.VITE_FIREBASE_STORAGE_BUCKET||"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:cn?.VITE_FIREBASE_MESSAGING_SENDER_ID||"418109336597",appId:cn?.VITE_FIREBASE_APP_ID||"1:418109336597:web:871b262a76e57455ebb21c",measurementId:cn?.VITE_FIREBASE_MEASUREMENT_ID||"G-7RW2F269V6"},Ar=Rh(mm);try{console.info("[Firebase] Connected project:",mm.projectId)}catch{}const gs=nE(Ar),ee=Ng(Ar);let Kc=null;try{Kc=IS(Ar)}catch{}const Qc=j_(gs,Zh).then(()=>{try{console.info("[Firebase] Auth persistence set to local")}catch{}}).catch(n=>{console.error("Firebase Auth persistence error:",n)}),kn=Object.freeze(Object.defineProperty({__proto__:null,get analytics(){return Kc},app:Ar,auth:gs,authReady:Qc,db:ee},Symbol.toStringTag,{value:"Module"})),Nn="transactions";function Yc(n){return{id:n.id,...n.data()}}function Oi(n){try{if(n&&typeof n.toDate=="function")return n.toDate();if(n&&typeof n=="object"&&"seconds"in n)return new Date(n.seconds*1e3);if(n instanceof Date)return n;if(typeof n=="string"||typeof n=="number")return new Date(n)}catch{}return new Date(0)}async function Ui({budgetId:n,userId:e}={}){const t=pe(ee,Nn),o=[];n&&o.push(De("budgetId","==",n)),e&&o.push(De("userId","==",e));const r=o.length?ke(t,...o):ke(t),s=(await wt(r)).docs.map(Yc);return s.sort((c,l)=>Oi(l.createdAt)-Oi(c.createdAt)),s}async function Jc(n){const e=fe(ee,Nn,n),t=await Tr(e);return t.exists()?Yc(t):null}async function ms(n){const e=ds(),t={...n};return t.valor!==void 0&&t.valor!==null&&(t.valor=Number(t.valor)),t.createdAt||(t.createdAt=e),t.updatedAt||(t.updatedAt=e),{id:(await tn(pe(ee,Nn),t)).id}}async function Xc(n,e){const t=fe(ee,Nn,n),o={...e,updatedAt:ds()};o.valor!==void 0&&o.valor!==null&&(o.valor=Number(o.valor)),await en(t,o)}async function Zc(n){const e=fe(ee,Nn,n);await To(e)}async function el({userId:n,budgetId:e,rec:t,createdDate:o,parcelaAtual:r}){console.log("🔧 [CreateFromRecurring] Dados recebidos:",{recId:t.id,recDescricao:t.descricao,recParcelasTotal:t.parcelasTotal,recParcelasRestantes:t.parcelasRestantes,parcelaAtualRecebida:r,createdDate:o.toISOString()});const i={userId:n,budgetId:e,descricao:t.descricao,valor:Number(t.valor??0),categoriaId:t.categoriaId,tipo:"despesa",createdAt:oe.fromDate(o),recorrenteId:t.id,recorrenteNome:t.descricao,parcelaAtual:r??null,parcelasTotal:t.parcelasTotal??null};console.log("🔧 [CreateFromRecurring] Dados que serão salvos:",{parcelaAtual:i.parcelaAtual,parcelasTotal:i.parcelasTotal,descricao:i.descricao,valor:i.valor});const s=await tn(pe(ee,Nn),i);return console.log("✅ [CreateFromRecurring] Transação criada com ID:",s.id),{id:s.id}}function pm({budgetId:n,userId:e},t){const o=pe(ee,Nn),r=[];n&&r.push(De("budgetId","==",n));const i=r.length?ke(o,...r):ke(o);return Ir(i,s=>{const c=s.docs.map(Yc).sort((l,d)=>Oi(d.createdAt)-Oi(l.createdAt));t(c)})}const GA=Object.freeze(Object.defineProperty({__proto__:null,create:ms,createFromRecurring:el,getById:Jc,list:Ui,listenToChanges:pm,remove:Zc,update:Xc},Symbol.toStringTag,{value:"Module"}));class CS{constructor(){this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){const o=this.listeners.get(e);o&&(o.delete(t),o.size===0&&this.listeners.delete(e))}emit(e,t){const o=this.listeners.get(e);if(o)for(const r of o)try{r(t)}catch(i){console.error(`[eventBus] handler error for ${e}`,i)}}clear(){this.listeners.clear()}getListenerCount(e){const t=this.listeners.get(e);return t?t.size:0}hasListeners(e){return this.listeners.has(e)&&this.listeners.get(e).size>0}once(e,t){const o=r=>{t(r),this.off(e,o)};this.on(e,o)}}const D=new CS;function ps(n={}){let e={...n};const t=new Set;function o(){return e}function r(s){const c=e;e={...e,...s};for(const{selector:l,cb:d,last:g}of t){const f=l?l(e):e;if(f!==g.value){g.value=f;try{d(f,c)}catch{}}}}function i(s,c){const l={selector:s,cb:c,last:{value:s?s(e):e}};return t.add(l),()=>t.delete(l)}return{getState:o,setState:r,subscribe:i}}const nr=ps({transactions:[],loading:!1,error:null});let ro=new Map;async function Dr(n,e){try{nr.setState({loading:!0,error:null});let o=await Ui({budgetId:n});try{if((!o||o.length===0)&&typeof window<"u"){const r=e||window.appState?.currentUser?.uid,i=window.appState?.budgets||[],s=Array.isArray(i)&&i.length>1;if(r){const c=await Ui({userId:r});o=s?(c||[]).filter(l=>l.budgetId===n):(c||[]).filter(l=>!l.budgetId||l.budgetId===n)}}}catch{}nr.setState({transactions:o,loading:!1});try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.transactions=o)}catch{}return console.log("[DEBUG] Transações carregadas para o orçamento",n,o),o}catch(t){throw nr.setState({error:t.message,loading:!1}),t}}function tl(n,e){const t=`${n}-${e}`;if(ro.has(t))return;const o=pm({budgetId:n,userId:e},r=>{nr.setState({transactions:r}),console.log("🚦 Emitindo transactions:updated",{budgetId:n,transactions:r}),D.emit("transactions:updated",{budgetId:n,transactions:r})});ro.set(t,o)}function RS(n,e){const t=`${n}-${e}`,o=ro.get(t);o&&(o(),ro.delete(t))}function nl(){ro.forEach(n=>n()),ro.clear()}async function kS(n){try{const e=await ms(n);D.emit("transaction:added",e);try{const t=n.budgetId||window.appState?.currentBudget?.id,o=n.userId||window.appState?.currentUser?.uid;t&&o&&typeof window.loadTransactions=="function"&&(await window.loadTransactions(),D.emit("transactions:updated",{budgetId:t,transactions:window.appState.transactions||[]}))}catch(t){console.warn("Falha ao emitir transactions:updated após addTransaction",t)}return e}catch(e){throw D.emit("error:transaction",e),e}}async function NS(n,e){try{await Xc(n,e),D.emit("transaction:updated",{id:n,data:e})}catch(t){throw D.emit("error:transaction",t),t}}async function PS(n){try{await Zc(n),D.emit("transaction:deleted",{id:n})}catch(e){throw D.emit("error:transaction",e),e}}async function xS(n){try{const e=await el(n);return D.emit("transaction:recurring:applied",e),e}catch(e){throw D.emit("error:transaction",e),e}}async function MS(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const o={...n,userId:e.uid,budgetId:t.id},{id:r}=await ms(o);console.log("✅ Transação adicionada com ID:",r);try{if(typeof window<"u"&&typeof window.sendTransactionNotification=="function")await window.sendTransactionNotification(t.id,e.uid,{...o,id:r});else{const{sendTransactionNotification:s}=await N(async()=>{const{sendTransactionNotification:c}=await import("./NotificationService-DrPvGObm.js");return{sendTransactionNotification:c}},[]);await s(t.id,e.uid,{...o,id:r})}}catch(s){console.warn("Não foi possível enviar notificações de nova transação:",s)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const s=typeof window<"u"?window:null;s&&s.forceUIUpdate&&setTimeout(()=>{try{s.forceUIUpdate&&s.forceUIUpdate()}catch{}},100)}const{Snackbar:i}=await N(async()=>{const{Snackbar:s}=await Promise.resolve().then(()=>so);return{Snackbar:s}},void 0);return typeof i?.show=="function"?i.show("Transação adicionada com sucesso!","success"):typeof i=="function"?i({message:"Transação adicionada com sucesso!",type:"success"}):window?.Snackbar?.show&&window.Snackbar.show("Transação adicionada com sucesso!","success"),r}catch(e){console.error("❌ Erro ao adicionar transação:",e);try{const{Snackbar:t}=await N(async()=>{const{Snackbar:o}=await Promise.resolve().then(()=>so);return{Snackbar:o}},void 0);typeof t?.show=="function"?t.show("Erro ao adicionar transação","error"):typeof t=="function"?t({message:"Erro ao adicionar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao adicionar transação","error")}catch{}throw e}}async function BS(n,e){try{let t=null;try{t=await Jc(n)}catch{}await Xc(n,{...e}),console.log("✅ Transação atualizada:",n);try{const r=window.appState.currentUser,i=window.appState.currentBudget?.id;if(i&&r?.uid){const s={};if(t){const l=d=>Object.prototype.hasOwnProperty.call(e,d);l("valor")&&t.valor!==e.valor&&(s.valor={from:t.valor,to:e.valor}),l("descricao")&&t.descricao!==e.descricao&&(s.descricao={from:t.descricao,to:e.descricao}),l("categoriaId")&&t.categoriaId!==e.categoriaId&&(s.categoriaId={from:t.categoriaId,to:e.categoriaId}),l("tipo")&&t.tipo!==e.tipo&&(s.tipo={from:t.tipo,to:e.tipo})}const c={id:n,...e,prev:t?{descricao:t.descricao,valor:t.valor,categoriaId:t.categoriaId,tipo:t.tipo}:null,changeSet:s};if(typeof window<"u"&&typeof window.sendTransactionUpdatedNotification=="function")await window.sendTransactionUpdatedNotification(i,r.uid,c);else{const{sendTransactionUpdatedNotification:l}=await N(async()=>{const{sendTransactionUpdatedNotification:d}=await import("./NotificationService-DrPvGObm.js");return{sendTransactionUpdatedNotification:d}},[]);await l(i,r.uid,c)}}}catch(r){console.warn("Não foi possível enviar notificações de atualização de transação:",r)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const r=typeof window<"u"?window:null;r&&r.forceUIUpdate&&setTimeout(()=>{try{r.forceUIUpdate&&r.forceUIUpdate()}catch{}},100)}const{Snackbar:o}=await N(async()=>{const{Snackbar:r}=await Promise.resolve().then(()=>so);return{Snackbar:r}},void 0);typeof o?.show=="function"?o.show("Transação atualizada com sucesso!","success"):typeof o=="function"?o({message:"Transação atualizada com sucesso!",type:"success"}):window?.Snackbar?.show&&window.Snackbar.show("Transação atualizada com sucesso!","success")}catch(t){console.error("❌ Erro ao atualizar transação:",t);try{const{Snackbar:o}=await N(async()=>{const{Snackbar:r}=await Promise.resolve().then(()=>so);return{Snackbar:r}},void 0);typeof o?.show=="function"?o.show("Erro ao atualizar transação","error"):typeof o=="function"?o({message:"Erro ao atualizar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao atualizar transação","error")}catch{}throw t}}async function OS(n){try{console.log("[DEBUG] deleteTransactionWithNotifications chamada para transactionId:",n);let e=null;try{const i=await Jc(n);i&&(e=i)}catch(i){console.warn("Não foi possível ler a transação antes de excluir:",i)}await Zc(n);try{if(typeof window<"u"){const i=Array.isArray(window.appState?.transactions)?window.appState.transactions.slice():[],s=i.findIndex(c=>c.id===n);s!==-1&&(i.splice(s,1),window.appState.transactions=i,D.emit("transactions:updated",{transactions:i}))}}catch{}console.log("✅ Transação deletada:",n);try{console.log("[DEBUG] Iniciando envio de notificação de exclusão...");const i=window.appState.currentUser,s=e?.budgetId||window.appState.currentBudget?.id;if(console.log("[DEBUG] Dados para notificação:",{user:i?.uid,budgetId:s,txDataForNotification:e}),s&&i?.uid){const c=e||{id:n};if(console.log("[DEBUG] Payload da notificação:",c),typeof window<"u"&&typeof window.sendTransactionDeletedNotification=="function")console.log("[DEBUG] Usando window.sendTransactionDeletedNotification"),await window.sendTransactionDeletedNotification(s,i.uid,c);else{console.log("[DEBUG] Importando sendTransactionDeletedNotification");const{sendTransactionDeletedNotification:l}=await N(async()=>{const{sendTransactionDeletedNotification:d}=await import("./NotificationService-DrPvGObm.js");return{sendTransactionDeletedNotification:d}},[]);await l(s,i.uid,c)}console.log("[DEBUG] Notificação de exclusão enviada com sucesso")}else console.log("[DEBUG] Não foi possível enviar notificação - dados faltando:",{budgetId:!!s,userUid:!!i?.uid})}catch(i){console.warn("Não foi possível enviar notificações de exclusão de transação:",i)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const i=typeof window<"u"?window:null;i&&i.forceUIUpdate&&setTimeout(()=>{try{i.forceUIUpdate&&i.forceUIUpdate()}catch{}},100)}const{Snackbar:t}=await N(async()=>{const{Snackbar:i}=await Promise.resolve().then(()=>so);return{Snackbar:i}},void 0),r={label:"Desfazer",onClick:async()=>{try{if(!e)return;const{id:i}=await ms(e);try{if(typeof window<"u"){const s=Array.isArray(window.appState?.transactions)?window.appState.transactions.slice():[];s.unshift({...e,id:i}),window.appState.transactions=s,D.emit("transactions:updated",{transactions:s})}}catch{}t.show("Exclusão desfeita","success")}catch(i){console.warn("Falha ao desfazer exclusão:",i),t.show("Não foi possível desfazer","error")}}};typeof t?.show=="function"?t.show("Transação excluída","success",5e3,r):typeof t=="function"?t({message:"Transação excluída",type:"success",duration:5e3,action:r}):window?.Snackbar?.show&&window.Snackbar.show("Transação excluída","success")}catch(e){console.error("❌ Erro ao deletar transação:",e);try{const{Snackbar:t}=await N(async()=>{const{Snackbar:o}=await Promise.resolve().then(()=>so);return{Snackbar:o}},void 0);typeof t?.show=="function"?t.show("Erro ao deletar transação","error"):typeof t=="function"?t({message:"Erro ao deletar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao deletar transação","error")}catch{}throw e}}const zA=Object.freeze(Object.defineProperty({__proto__:null,addTransaction:kS,addTransactionWithNotifications:MS,createFromRecurring:xS,deleteTransaction:PS,deleteTransactionWithNotifications:OS,loadTransactions:Dr,startTransactionsListener:tl,stopAllListeners:nl,stopTransactionsListener:RS,transactionsStore:nr,updateTransaction:NS,updateTransactionWithNotifications:BS},Symbol.toStringTag,{value:"Module"})),So="categories";async function ol(n){if(!n)return null;const e=fe(ee,So,n),t=await Tr(e);return t.exists()?{id:t.id,...t.data()}:null}async function La(n={}){const e=pe(ee,So),t=[];n.budgetId&&t.push(De("budgetId","==",n.budgetId)),n.userId&&t.push(De("userId","==",n.userId));const o=t.length?ke(e,...t):ke(e),i=(await wt(o)).docs.map(s=>({id:s.id,...s.data()}));return i.sort((s,c)=>(s.nome||"").localeCompare(c.nome||"")),i}async function wm(n){const e=pe(ee,So);return(await tn(e,n)).id}async function ym(n,e){const t=fe(ee,So,n);return await en(t,e),!0}async function _m(n){const e=fe(ee,So,n);return await To(e),!0}function vm(n,e){const t=pe(ee,So),o=ke(t,De("budgetId","==",n),Gg("nome"));return Ir(o,r=>{const i=r.docs.map(s=>({id:s.id,...s.data()}));e(i)})}const jA=Object.freeze(Object.defineProperty({__proto__:null,create:wm,getById:ol,list:La,listenToChanges:vm,remove:_m,update:ym},Symbol.toStringTag,{value:"Module"})),wn=ps({categories:[],loading:!1,error:null});let io=new Map;async function Cr(n){try{wn.setState({loading:!0,error:null});let e=await La({budgetId:n});try{if((!e||e.length===0)&&typeof window<"u"){const t=window.appState?.currentUser?.uid,o=window.appState?.budgets||[],r=Array.isArray(o)&&o.length>1;if(t){const i=await La({userId:t});e=r?(i||[]).filter(s=>s.budgetId===n):(i||[]).filter(s=>!s.budgetId||s.budgetId===n)}}}catch{}wn.setState({categories:e,loading:!1});try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.categories=e)}catch{}return console.log("[DEBUG] Categorias carregadas para o orçamento",n,e),e}catch(e){throw wn.setState({error:e.message,loading:!1}),e}}function rl(n){if(io.has(n))return;const e=vm(n,t=>{wn.setState({categories:t}),D.emit("categories:updated",{budgetId:n,categories:t})});io.set(n,e)}function US(n){const e=io.get(n);e&&(e(),io.delete(n))}async function VS(n){try{const e={...n};try{const r=e.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),i=e.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);r&&(e.budgetId=r),i&&(e.userId=i)}catch{}const t=await wm(e),o={id:t,...e};D.emit("category:created",o);try{const r=wn.getState().categories||[];if(!r.some(s=>s.id===t)){const s=[...r,o];s.sort((c,l)=>(c.nome||"").localeCompare(l.nome||"")),wn.setState({categories:s})}if(typeof window<"u"){window.appState=window.appState||{};const s=Array.isArray(window.appState.categories)?window.appState.categories:[];if(!s.some(c=>c.id===t)){const c=[...s,o];c.sort((l,d)=>(l.nome||"").localeCompare(d.nome||"")),window.appState.categories=c}}}catch{}try{const r=o.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),i=o.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(r&&i){const{sendCategoryChangeNotification:s}=await N(async()=>{const{sendCategoryChangeNotification:c}=await import("./NotificationService-DrPvGObm.js");return{sendCategoryChangeNotification:c}},[]);await s(r,i,o,"category_added")}}catch(r){console.warn("Falha ao notificar criação de categoria:",r)}return o}catch(e){throw D.emit("error:category",e),e}}async function LS(n,e){try{let t=null;try{t=await ol?.(n)}catch{}await ym(n,e),D.emit("category:updated",{id:n,data:e});try{const o=e?.budgetId||t?.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),r=e?.userId||t?.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(o&&r){const i={id:n,...t,...e},{sendCategoryChangeNotification:s}=await N(async()=>{const{sendCategoryChangeNotification:c}=await import("./NotificationService-DrPvGObm.js");return{sendCategoryChangeNotification:c}},[]);await s(o,r,i,"category_updated",t||null)}}catch(o){console.warn("Falha ao notificar atualização de categoria:",o)}}catch(t){throw D.emit("error:category",t),t}}async function FS(n){try{let e=null;try{e=await ol?.(n)}catch{}await _m(n),D.emit("category:deleted",{id:n});try{const t=e?.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),o=e?.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(t&&o){const{sendCategoryChangeNotification:r}=await N(async()=>{const{sendCategoryChangeNotification:s}=await import("./NotificationService-DrPvGObm.js");return{sendCategoryChangeNotification:s}},[]),i=e?{id:n,...e}:{id:n};await r(t,o,i,"category_deleted",e||null)}}catch(t){console.warn("Falha ao notificar exclusão de categoria:",t)}}catch(e){throw D.emit("error:category",e),e}}function il(){io.forEach(n=>n()),io.clear()}const qA=Object.freeze(Object.defineProperty({__proto__:null,categoriesStore:wn,createCategory:VS,deleteCategory:FS,loadCategories:Cr,startCategoriesListener:rl,stopAllListeners:il,stopCategoriesListener:US,updateCategory:LS},Symbol.toStringTag,{value:"Module"})),Ao="recorrentes";async function Em(n){const e=ke(pe(ee,Ao),De("budgetId","==",n));return(await wt(e)).docs.map(o=>({id:o.id,...o.data()}))}async function Fa(n){const e=ke(pe(ee,Ao),De("userId","==",n));return(await wt(e)).docs.map(o=>({id:o.id,...o.data()}))}function $S(n){return tn(pe(ee,Ao),n)}function GS(n,e){return en(fe(ee,Ao,n),e)}function zS(n){return To(fe(ee,Ao,n))}async function bm(n){const e=await Tr(fe(ee,Ao,n));return e.exists()?{id:e.id,...e.data()}:null}const $a="logAplicacoes";async function jS({userId:n,mesAno:e,transacaoId:t,transacaoData:o}){const r={userId:n,mesAno:e,recorrenteId:o.recorrenteId,descricao:o.descricao,valor:o.valor,dataAplicacao:ds(),aplicacaoImediata:!1};t&&(r.transacaoId=t),await tn(pe(ee,$a),r)}async function qS(n,e){const t=ke(pe(ee,$a),De("userId","==",n),De("dataAplicacao","<",e)),o=await wt(t);let r=0;for(const i of o.docs)await To(fe(ee,$a,i.id)),r++;return r}function dn(n,e){let t=Number(n),o=Number(e);if(!Number.isFinite(t)||!Number.isFinite(o))return null;for(;o<1;)o+=12,t-=1;for(;o>12;)o-=12,t+=1;return{year:t,month:o}}function Hn(n,e=null,t=null){if(!n?.parcelasTotal||n.parcelasTotal<=1)return null;try{const o=new Date(n.dataInicio);let r;if(typeof e=="number"&&typeof t=="number"){const c=dn(e,t);c&&(r=new Date(c.year,c.month-1,1))}r||(r=new Date);let i=(r.getFullYear()-o.getFullYear())*12+(r.getMonth()-o.getMonth());try{const c=o.getFullYear(),l=o.getMonth()+1,d=dn(r.getFullYear(),r.getMonth()+1),g=d&&(d.year>c||d.year===c&&d.month>l);n?.efetivarMesAtual===!1&&g&&(i-=1)}catch{}let s=i+1;return s>n.parcelasTotal&&(s=n.parcelasTotal),s<1&&(s=1),s}catch(o){return console.error("Erro ao calcular parcela da recorrente:",o),1}}function HS(n,e=[],t=null,o=null){if(!t||!o){const R=new Date;t=R.getFullYear(),o=R.getMonth()+1}const r=dn(t,o)||{year:t,month:o},{year:i,month:s}=r,c=e.some(R=>{if(!R.recorrenteId||R.recorrenteId!==n.id)return!1;let k;if(R.createdAt&&typeof R.createdAt=="object"&&R.createdAt.seconds)k=new Date(R.createdAt.seconds*1e3);else if(R.createdAt)k=new Date(R.createdAt);else return!1;return k.getFullYear()===i&&k.getMonth()+1===s});let l=Hn(n,i,s);const d=dn(i,s+1)||{year:i,month:s},g=dn(i,s-1)||{year:i,month:s};let f=Hn(n,d.year,d.month),p=Hn(n,g.year,g.month);try{const R=e.filter(k=>k.recorrenteId===n.id&&k.createdAt).map(k=>k.createdAt?.toDate?k.createdAt.toDate():new Date(k.createdAt)).sort((k,V)=>k-V);if(R.length>0&&n.dataInicio){const k=R[0],V=new Date(n.dataInicio),F=dn(V.getFullYear(),V.getMonth()+1),q=dn(k.getFullYear(),k.getMonth()+1);if(F&&q){const re=(q.year-F.year)*12+(q.month-F.month);if(re>0){const be=se=>{if(se==null)return se;const T=n.parcelasTotal||se;return Math.max(1,Math.min(T,se-re))};l=be(l),f=be(f),p=be(p)}}}}catch{}let v=!1,A=!1;try{if(n?.parcelasTotal&&n.dataInicio){const R=new Date(n.dataInicio),k=new Date(i,s-1,1);let V=(k.getFullYear()-R.getFullYear())*12+(k.getMonth()-R.getMonth());const F=R.getFullYear(),q=R.getMonth()+1,re=i>F||i===F&&s>q,be=i===F&&s===q;n?.efetivarMesAtual===!1&&(re||be)&&(V-=1);const se=V+1;v=se>n.parcelasTotal,A=se<1}}catch{}return{foiEfetivadaEsteMes:c,parcelaAtual:l,proximaParcela:f,ultimaParcela:p,totalParcelas:n.parcelasTotal,temParcelas:n.parcelasTotal&&n.parcelasTotal>1,ativa:n.ativa!==!1,aposUltimaParcela:v,antesDaPrimeiraParcela:A}}async function Tm(n){return Em(n)}async function WS(n){return n?Fa(n):[]}async function KS(n,e,t){const o={...t,userId:n,budgetId:e,ativa:!0,createdAt:new Date,parcelasRestantes:t.parcelasRestantes??null,parcelasTotal:t.parcelasTotal??null,efetivarMesAtual:t.efetivarMesAtual??!1},r=await $S(o);try{const{sendRecorrenteChangeNotification:i}=await N(async()=>{const{sendRecorrenteChangeNotification:s}=await import("./NotificationService-DrPvGObm.js");return{sendRecorrenteChangeNotification:s}},[]);await i(e,n,o,"new_recorrente"),console.log("[RecorrentesService] Notificação de nova despesa recorrente enviada")}catch(i){console.warn("[RecorrentesService] Erro ao enviar notificação de nova despesa recorrente:",i)}return r.id||r}async function gi(n,e,t){let o=null;try{const r=await bm(e);r&&(o={nome:r.nome,valor:r.valor,frequencia:r.frequencia,categoria:r.categoria,descricao:r.descricao,parcelasRestantes:r.parcelasRestantes,parcelasTotal:r.parcelasTotal})}catch(r){console.warn("[RecorrentesService] Erro ao buscar dados anteriores da despesa recorrente:",r)}await GS(e,{...t,updatedAt:new Date});try{const{sendRecorrenteChangeNotification:r}=await N(async()=>{const{sendRecorrenteChangeNotification:s}=await import("./NotificationService-DrPvGObm.js");return{sendRecorrenteChangeNotification:s}},[]),i=t.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0);if(i){const s={...t,id:e};await r(i,n,s,"updated_recorrente",o),console.log("[RecorrentesService] Notificação de atualização de despesa recorrente enviada")}}catch(r){console.warn("[RecorrentesService] Erro ao enviar notificação de atualização de despesa recorrente:",r)}}async function QS(n,e){let t=null;try{t=await bm(e)}catch(o){console.warn("[RecorrentesService] Erro ao buscar dados da despesa recorrente para exclusão:",o)}if(await zS(e),t)try{const{sendRecorrenteChangeNotification:o}=await N(async()=>{const{sendRecorrenteChangeNotification:i}=await import("./NotificationService-DrPvGObm.js");return{sendRecorrenteChangeNotification:i}},[]),r=t.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0);r&&(await o(r,n,t,"deleted_recorrente"),console.log("[RecorrentesService] Notificação de exclusão de despesa recorrente enviada"))}catch(o){console.warn("[RecorrentesService] Erro ao enviar notificação de exclusão de despesa recorrente:",o)}}async function YS(n,e,t=!1,o=null,r=null){const i=new Date,s=Number.isFinite(r)?r:i.getMonth()+1,c=Number.isFinite(o)?o:i.getFullYear(),d=(await Tm(e)).filter(R=>R.ativa===!0),g=await JS(e,c,s);let f=0,p=0;const A=c===i.getFullYear()&&s===i.getMonth()+1?i.getDate():31;for(const R of d)if(!(!XS(R,c,s,A)||ih(g,R,c,s))&&!(R.parcelasRestantes!==null&&R.parcelasRestantes<=0)){if(!t){p++;continue}await ZS(R,n,e,c,s),f++}try{if((typeof localStorage<"u"?localStorage.getItem("noti_recurring_reminders")==="true":!1)&&Array.isArray(d)){const{sendRecorrenteReminderNotification:k}=await N(async()=>{const{sendRecorrenteReminderNotification:V}=await import("./NotificationService-DrPvGObm.js");return{sendRecorrenteReminderNotification:V}},[]);for(const V of d)ih(g,V,c,s)||await k(e,n,V)}}catch(R){console.warn("Falha ao enviar lembretes de recorrentes:",R)}try{if(typeof localStorage<"u"?localStorage.getItem("noti_weekly_summary")==="true":!1){const{sendWeeklySummaryNotification:k}=await N(async()=>{const{sendWeeklySummaryNotification:F}=await import("./NotificationService-DrPvGObm.js");return{sendWeeklySummaryNotification:F}},[]),V={resumo:`Resumo semanal: ${f} recorrentes aplicadas, ${p} pendentes.`,periodo:`${String(s).padStart(2,"0")}/${c}`};await k(e,n,V)}}catch(R){console.warn("Falha ao enviar notificação de resumo semanal:",R)}return{aplicadas:f,pendentes:p,total:d.length}}async function JS(n,e,t){try{let o=window?.appState?.transactions;return(!Array.isArray(o)||o.length===0)&&(o=await Ui({budgetId:n})),o.filter(r=>{const i=r.createdAt;if(!i)return!1;const s=i?.toDate?i.toDate():new Date(i);return s.getFullYear()===e&&s.getMonth()+1===t})}catch(o){return console.error("Erro ao obter transações do mês:",o),[]}}function XS(n,e,t,o=null){if(!n.dataInicio)return!0;try{const[r,i,s]=String(n.dataInicio).split("-").map(Number),c=new Date(r,i-1,s),l=c.getFullYear(),d=c.getMonth()+1,g=c.getDate();if(e<l||e===l&&t<d||e===l&&t===d&&(Number.isFinite(o)?o:new Date().getDate())<g)return!1;let f=(e-l)*12+(t-d);return!n.efetivarMesAtual&&(e>l||e===l&&t>d)&&(f-=1),!(n.parcelasTotal!==null&&n.parcelasTotal!==void 0&&f+1>n.parcelasTotal||n.parcelasRestantes!==null&&n.parcelasRestantes!==void 0&&n.parcelasRestantes<=0)}catch(r){return console.error("Erro ao verificar se deve aplicar neste mês:",r),!0}}function ih(n,e,t,o){try{return n.some(r=>{if(r.recorrenteId&&e.id&&r.recorrenteId===e.id)return!0;if(e.descricao&&r.descricao===e.descricao){const i=Hn(e,t,o),s=e.parcelasTotal!==null&&e.parcelasTotal!==void 0,c=r.parcelasTotal!==void 0&&r.parcelasTotal!==null||r.parcelaAtual!==void 0&&r.parcelaAtual!==null;if(s){if(r.parcelasTotal===e.parcelasTotal&&r.parcelaAtual===i)return!0}else if(!c||r.parcelasTotal===1)return!0}return!1})}catch(r){return console.error("Erro ao verificar se já aplicada:",r),!1}}async function ZS(n,e,t,o,r){const i=n.diaLancamento||1,s=new Date(o,r,0).getDate(),c=Math.max(1,Math.min(s,Number(i))),l=new Date(o,r-1,c),d=Hn(n,o,r);console.log("🔧 [AplicarRecorrente] Dados para criar transação:",{recId:n.id,recDescricao:n.descricao,recParcelasTotal:n.parcelasTotal,recParcelasRestantes:n.parcelasRestantes,parcelaAtualCalculada:d,ano:o,mes:r,dataLancamento:l.toISOString()});const{id:g}=await el({userId:e,budgetId:t,rec:n,createdDate:l,parcelaAtual:d});try{const f=e,p=t||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0);if(p&&f){const{sendTransactionNotification:v}=await N(async()=>{const{sendTransactionNotification:R}=await import("./NotificationService-DrPvGObm.js");return{sendTransactionNotification:R}},[]),A={id:g,descricao:n.descricao,valor:n.valor,categoriaId:n.categoriaId||null,tipo:n.tipo||"despesa",recorrenteId:n.id,recorrenteParcelaAtual:d??null,recorrenteParcelasTotal:n.parcelasTotal??null};await v(p,f,A)}}catch(f){console.warn("Falha ao enviar notificação de aplicação de recorrente:",f)}if(n.parcelasRestantes!==null&&n.parcelasRestantes!==void 0){const f=Math.max(0,n.parcelasRestantes-1);f<=0?await gi(e,n.id,{parcelasRestantes:0,ativa:!1}):await gi(e,n.id,{parcelasRestantes:f})}try{(n.parcelasRestantes===null||n.parcelasRestantes===void 0)&&n.parcelasTotal!==null&&n.parcelasTotal!==void 0&&(n.parcelasTotal<=1||(d??Number.POSITIVE_INFINITY)>=n.parcelasTotal)&&await gi(e,n.id,{ativa:!1})}catch(f){console.warn("Falha ao auto-inativar recorrente após última parcela:",f)}await jS({userId:e,mesAno:`${o}-${String(r).padStart(2,"0")}`,transacaoId:g,transacaoData:{recorrenteId:n.id,descricao:n.descricao,valor:n.valor}})}async function e0(n){const e=new Date,t=new Date(e.getFullYear()-1,e.getMonth(),e.getDate());return qS(n,t)}async function Im(){try{const n=window.appState?.currentUser?.uid,e=window.appState?.currentBudget?.id;if(!n||!e)return console.warn("Usuário ou orçamento não encontrado para carregar recorrentes"),[];let t=[];try{e&&(t=await Em(e)),(!t||t.length===0)&&(t=await Fa(n))}catch(o){console.warn("Falha ao listar recorrentes por orçamento, tentando por usuário...",o),t=await Fa(n)}return window.appState||(window.appState={}),window.appState.recorrentes=t,console.log(`✅ ${t.length} recorrentes carregadas`),t}catch(n){return console.error("❌ Erro ao carregar recorrentes:",n),[]}}const Sm=Object.freeze(Object.defineProperty({__proto__:null,addRecorrente:KS,aplicarRecorrentesDoMes:YS,calcularParcelaRecorrente:Hn,calcularStatusRecorrente:HS,deleteRecorrente:QS,getRecorrentesDoOrcamento:Tm,getRecorrentesDoUsuario:WS,limparLogsAntigos:e0,loadRecorrentes:Im,updateRecorrente:gi},Symbol.toStringTag,{value:"Module"}));window.loadTransactions=async function(){const n=window.appState?.currentBudget?.id,e=window.appState?.currentUser?.uid;return Dr(n,e)};window.loadCategories=async function(){const n=window.appState?.currentBudget?.id;return window.appState?.currentUser?.uid,Cr(n)};window.loadRecorrentes=async function(){return Im()};const sl="snackbar_prefs_v1",Et={defaultDuration:3e3,bottom:80,position:"bottom",align:"center",hoverPause:!0,maxQueue:5,cooldownMs:500};function ti(n,e){const t=Number(n);return Number.isFinite(t)?t:e}function t0(n,e){return typeof n=="boolean"?n:n==="true"?!0:n==="false"?!1:e}function dr(n){const e=n||{},t={...Et};return"defaultDuration"in e&&(t.defaultDuration=Math.max(500,ti(e.defaultDuration,Et.defaultDuration))),"bottom"in e&&(t.bottom=Math.max(0,ti(e.bottom,Et.bottom))),typeof e.position=="string"&&(e.position==="top"||e.position==="bottom")&&(t.position=e.position),typeof e.align=="string"&&(e.align==="left"||e.align==="center"||e.align==="right")&&(t.align=e.align),"hoverPause"in e&&(t.hoverPause=t0(e.hoverPause,Et.hoverPause)),"maxQueue"in e&&(t.maxQueue=Math.max(1,ti(e.maxQueue,Et.maxQueue))),"cooldownMs"in e&&(t.cooldownMs=Math.max(0,ti(e.cooldownMs,Et.cooldownMs))),t}function Am(){try{const n=localStorage.getItem(sl);if(!n)return{...Et};const e=JSON.parse(n);return dr(e)}catch{return{...Et}}}function n0(n){try{const e=dr(n);return localStorage.setItem(sl,JSON.stringify(e)),e}catch{return dr(n)}}function Dm(n){try{const e=dr(n);D.emit("snackbar:configure",e);try{typeof window<"u"&&window.Snackbar&&typeof window.Snackbar.configure=="function"&&window.Snackbar.configure(e)}catch{}return e}catch{return dr(n)}}function Cm(){const n=Am();return Dm(n),n}typeof window<"u"&&(window.__snackbarPrefs={STORAGE_KEY:sl,defaults:Et,loadPrefs:Am,savePrefs:n0,applyPrefs:Dm,initFromStorage:Cm});var ca={};class o0{constructor(){this.queue=[],this.isShowing=!1,this.defaultDuration=3e3,this.bottomOffset=80,this.position="bottom",this.align="center",this.hoverPause=!0,this._currentTimeout=null,this._currentEl=null,this._restoreFocusEl=null;try{this.reducedMotion=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)")?.matches}catch{this.reducedMotion=!1}try{const e=typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:"";/jsdom/i.test(e)&&(this.reducedMotion=!0)}catch{}try{typeof process<"u"&&ca&&(ca.VITEST||ca.JEST_WORKER_ID)&&(this.reducedMotion=!0)}catch{}this.reducedMotion&&(this.hoverPause=!1),this.maxQueue=5,this._lastShownSig=null,this._lastShownAt=0,this._lastShownMap=new Map,this.cooldownMs=500,this._stats={totalShown:0,byType:Object.create(null),last:null}}show(e,t="info",o=null,r){const i={message:e,type:t,duration:o||this.defaultDuration,action:r&&typeof r=="object"?r:null},s=`${i.type}|${i.message}`,c=this.queue[this.queue.length-1];if(!(c&&`${c.type}|${c.message}`===s)){if(this._currentEl&&this._currentEl.getAttribute("data-snackbar-sig")===s){try{this.incrementCurrentCount()}catch{}return}try{const l=Date.now(),d=this._lastShownMap.get(s)||0;if(l-d<(this.cooldownMs|0))return;this._lastShownMap.set(s,l)}catch{}this.queue.length>=this.maxQueue&&this.queue.shift(),this.queue.push(i);try{this._stats.totalShown+=1,this._stats.byType[t]=(this._stats.byType[t]||0)+1,this._stats.last={type:t,message:e}}catch{}this.processQueue()}}call(e){typeof e=="string"?this.show(e,"info"):typeof e=="object"&&this.show(e.message||"Notificação",e.type||"info",e.duration)}processQueue(){if(this.isShowing||this.queue.length===0)return;this.isShowing=!0;const e=this.queue.shift();this.createSnackbar(e)}createSnackbar(e){const{message:t,type:o,duration:r,action:i}=e;this.removeExistingSnackbars();const s=document.createElement("div");s.className=this.getSnackbarClasses(o),s.classList.add("snackbar"),s.setAttribute("data-snackbar","1"),s.setAttribute("data-pos",this.position),s.setAttribute("data-align",this.align);const c=o==="error"||o==="warning";s.setAttribute("role",c?"alert":"status"),s.setAttribute("aria-live",c?"assertive":"polite"),s.setAttribute("aria-atomic","true"),s.innerHTML=this.getSnackbarContent(t,o,i),s.classList.add(`snackbar-${o}`),this.applyThemeStyles(s,o),s.style.zIndex="99999";try{const g=`${this.bottomOffset}px`;this.position==="top"?(s.style.top=`calc(${g} + env(safe-area-inset-top, 0px))`,s.style.bottom=""):(s.style.bottom=`calc(${g} + env(safe-area-inset-bottom, 0px))`,s.style.top=""),this.align==="left"?(s.style.left="16px",s.style.right="",s.style.transform="none"):this.align==="right"?(s.style.right="16px",s.style.left="",s.style.transform="none"):(s.style.left="50%",s.style.right="",s.style.transform="translateX(-50%)")}catch{}try{this._restoreFocusEl=document.activeElement instanceof HTMLElement?document.activeElement:null}catch{this._restoreFocusEl=null}document.body.appendChild(s),this.setupEventListeners(s,i);const l=()=>s.classList.add("snackbar-show");this.reducedMotion?s.classList.add("snackbar-show"):requestAnimationFrame(l);const d=()=>{this.clearDismissTimer();const g=Math.max(10,r|0);this._currentTimeout=setTimeout(()=>{this.removeSnackbar(s)},this.reducedMotion?Math.min(200,g):g)};this._currentEl=s;try{const g=`${o}|${t}`;s.setAttribute("data-snackbar-sig",g)}catch{}d(),this.hoverPause&&(s.addEventListener("mouseenter",()=>this.clearDismissTimer()),s.addEventListener("mouseleave",()=>d()),s.addEventListener("focusin",()=>this.clearDismissTimer()),s.addEventListener("focusout",()=>d())),this.reducedMotion||setTimeout(()=>{const g=s.querySelector(".snackbar-action"),f=s.querySelector(".snackbar-close");g?g.focus?.():f&&f.focus?.()},10)}getCurrentTheme(){return document.documentElement.classList.contains("dark")?"dark":"light"}getCurrentThemeColor(){return localStorage.getItem("themeColor")||document.documentElement.getAttribute("data-theme-color")||"blue"}applyThemeStyles(e,t){const o=this.getCurrentTheme(),r=this.getCurrentThemeColor(),i={blue:{primary:"#3B82F6",secondary:"#1E40AF",light:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",light:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",light:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",light:"#FEF3C7"}},s=i[r]||i.blue,l=(g=>{switch(g){case"success":return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary};case"error":return o==="dark"?{bg:"#ef4444",color:"#ffffff",border:"#dc2626"}:{bg:"#dc2626",color:"#ffffff",border:"#b91c1c"};case"warning":return o==="dark"?{bg:"#f59e0b",color:"#1f2937",border:"#d97706"}:{bg:"#d97706",color:"#ffffff",border:"#b45309"};case"info":return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary};default:return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary}}})(t),d=o==="dark"?"0.4":"0.3";e.style.backgroundColor=l.bg,e.style.color=l.color,e.style.border=`1px solid ${l.border}`,e.style.boxShadow=`0 4px 12px rgba(${l.bg.replace("#","").match(/.{2}/g).map(g=>parseInt(g,16)).join(", ")}, ${d})`,setTimeout(()=>{const g=e.querySelector(".snackbar-close");g&&(g.style.color=l.color)},10)}getSnackbarClasses(e){return["fixed","left-1/2","transform","-translate-x-1/2","px-4","py-3","rounded-xl","shadow-xl","max-w-sm","w-full","mx-4","opacity-0","translate-y-4","transition-all","duration-300","ease-out","backdrop-blur-md"].join(" ")}getSnackbarContent(e,t,o){const r={success:"✓",error:"✕",warning:"!",info:"i",default:"•"},i=d=>{try{return String(d).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}catch{return String(d||"")}},s=i(e),c=o&&o.label?i(o.label):"",l=o&&o.label?`<button class="snackbar-action ml-2 text-xs underline opacity-80 hover:opacity-100 transition-opacity" aria-label="${c}">${c}</button>`:"";return`
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium opacity-80">${r[t]||r.default}</span>
        <span class="flex-1 text-sm">${s}</span>
        <span class="snackbar-count hidden text-xs font-medium px-1.5 py-0.5 rounded bg-white/20">×1</span>
        ${l}
        <button class="snackbar-close" aria-label="Fechar notificação" title="Fechar (ou pressione Esc)">
          <span class="text-base font-medium">×</span>
        </button>
      </div>
    `}removeExistingSnackbars(){document.querySelectorAll('[data-snackbar="1"]').forEach(t=>{this.removeSnackbar(t)})}incrementCurrentCount(){if(!this._currentEl)return;const e=this._currentEl.querySelector(".snackbar-count");if(!e)return;const o=(parseInt((e.textContent||"1").replace(/[^0-9]/g,""),10)||1)+1;if(e.textContent=`×${o}`,e.classList.remove("hidden"),this._currentEl.querySelector(".flex-1")){const i=this._currentEl.getAttribute("role")||"status";this._currentEl.setAttribute("aria-live",i==="alert"?"assertive":"polite"),this._currentEl.setAttribute("aria-atomic","true")}}removeSnackbar(e){if(!e||!e.parentNode)return;e.classList.remove("snackbar-show"),e.classList.add("snackbar-hide");const t=this.reducedMotion?50:300;setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e),this.clearDismissTimer(),this._currentEl=null,this.isShowing=!1,this._lastShownAt=Date.now(),this._lastShownSig=null;try{this._restoreFocusEl&&document.contains(this._restoreFocusEl)&&this._restoreFocusEl.focus?.()}catch{}this.processQueue()},t)}setupEventListeners(e,t){const o=e.querySelector(".snackbar-close");o&&(o.addEventListener("click",()=>{this.removeSnackbar(e)}),e.addEventListener("keydown",i=>{i.key==="Escape"&&this.removeSnackbar(e)}));const r=e.querySelector(".snackbar-action");r&&(r.addEventListener("click",()=>{this.removeSnackbar(e);try{t&&typeof t.onClick=="function"&&t.onClick()}catch{}}),r.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),r.click())})),e.addEventListener("click",i=>{i.target===e&&this.removeSnackbar(e)})}clearDismissTimer(){this._currentTimeout&&(clearTimeout(this._currentTimeout),this._currentTimeout=null)}closeCurrent(){this._currentEl&&this.removeSnackbar(this._currentEl)}clearQueue(){this.queue=[]}getStats(){try{return JSON.parse(JSON.stringify(this._stats))}catch{return{totalShown:0,byType:{},last:null}}}resetStats(){this._stats={totalShown:0,byType:Object.create(null),last:null}}}const H=new o0;function ve(n){typeof n=="string"?H.show(n,"info"):typeof n=="object"&&H.show(n.message,n.type||"info",n.duration,n.action)}ve.show=(n,e="info",t,o)=>{H.show(n,e,t,o)};ve.success=(n,e)=>{H.show(n,"success",e)};ve.error=(n,e)=>{H.show(n,"error",e)};ve.warning=(n,e)=>{H.show(n,"warning",e)};ve.info=(n,e)=>{H.show(n,"info",e)};ve.configure=(n={})=>{typeof n.defaultDuration=="number"&&(H.defaultDuration=n.defaultDuration),typeof n.bottom=="number"&&(H.bottomOffset=n.bottom),typeof n.position=="string"&&(H.position=n.position),typeof n.align=="string"&&(H.align=n.align),typeof n.hoverPause=="boolean"&&(H.hoverPause=n.hoverPause),typeof n.maxQueue=="number"&&(H.maxQueue=Math.max(1,n.maxQueue|0)),typeof n.cooldownMs=="number"&&(H.cooldownMs=Math.max(0,n.cooldownMs|0));try{H.clearDismissTimer(),H.isShowing=!1,H._currentEl=null,H._restoreFocusEl=null,H.queue=[];const e=document?.querySelectorAll?.('[data-snackbar="1"]');e&&e.forEach(t=>t.parentNode&&t.parentNode.removeChild(t))}catch{}try{Rm()}catch{}};ve.updateSettings=(n={})=>{typeof n.duration=="number"&&(H.defaultDuration=n.duration),typeof n.distance=="number"&&(H.bottomOffset=n.distance),typeof n.position=="string"&&(H.position=n.position==="inferior"?"bottom":n.position==="superior"?"top":n.position),typeof n.align=="string"&&(H.align=n.align==="centro"?"center":n.align==="esquerda"?"left":n.align==="direita"?"right":n.align),typeof n.maxQueue=="number"&&(H.maxQueue=Math.max(1,n.maxQueue|0)),typeof n.antispam=="number"&&(H.cooldownMs=Math.max(0,n.antispam|0)),typeof n.pauseOnHover=="boolean"&&(H.hoverPause=n.pauseOnHover)};ve.clearQueue=()=>{H.clearQueue()};ve.closeCurrent=()=>{H.closeCurrent()};ve.__getStatsForTest=()=>H.getStats();ve.__resetStatsForTest=()=>H.resetStats();function Rm(){try{if(!D||typeof D.on!="function")return;try{if(D.hasListeners&&D.hasListeners("snackbar:show"))return}catch{}D.on("snackbar:show",n=>{try{if(!n)return;if(typeof n=="string"){H.show(n,"info");return}const{message:e,type:t="info",duration:o,action:r}=n;H.show(e,t,o,r)}catch{}}),D.on("snackbar:configure",n=>{try{ve.configure(n||{})}catch{}}),D.on("snackbar:clear",()=>{try{H.clearQueue(),H.closeCurrent()}catch{}}),D.on("snackbar:dismiss",()=>{try{H.closeCurrent()}catch{}}),D.on("snackbar:closeCurrent",()=>{try{H.closeCurrent()}catch{}}),D.on("snackbar:position",n=>{try{if(!n||typeof n!="object")return;typeof n.position=="string"&&(H.position=n.position),typeof n.align=="string"&&(H.align=n.align),typeof n.bottom=="number"&&(H.bottomOffset=n.bottom)}catch{}}),["success","error","warning","info"].forEach(n=>{try{D.on(`snackbar:${n}`,e=>{try{if(!e)return;if(typeof e=="string"){H.show(e,n);return}const{message:t,duration:o,action:r}=e;H.show(t,n,o,r)}catch{}})}catch{}})}catch{}}try{Rm()}catch{}try{typeof window<"u"&&!window.Snackbar&&(window.Snackbar=ve)}catch{}ve.close=()=>H.closeCurrent();ve.clearQueue=()=>H.clearQueue();typeof window<"u"&&(window.Snackbar=ve,window.SnackbarInstance=H);ve.emit=n=>{try{if(!n)return;typeof n=="string"?ve.show(n,"info"):typeof n=="object"&&ve.show(n.message||"Notificação",n.type||"info",n.duration,n.action)}catch{}try{D.emit("snackbar:show",n)}catch{}};try{Cm()}catch{}const so=Object.freeze(Object.defineProperty({__proto__:null,Snackbar:ve},Symbol.toStringTag,{value:"Module"}));console.log("[SimpleSnackbarConfig] Iniciando sistema simplificado...");function ws(){if(console.log("[SimpleSnackbarConfig] Aplicando configurações..."),!window.Snackbar){console.warn("[SimpleSnackbarConfig] window.Snackbar não disponível");return}if(!window.SnackbarInstance){console.warn("[SimpleSnackbarConfig] window.SnackbarInstance não disponível");return}const n=parseInt(localStorage.getItem("toastDuration"))||3e3,e=parseInt(localStorage.getItem("toastDistance"))||80,t=localStorage.getItem("toastPosition")||"bottom",o=localStorage.getItem("toastAlignment")||localStorage.getItem("toastAlign")||"center",r=t==="inferior"?"bottom":t==="superior"?"top":t,i=o==="centro"?"center":o==="esquerda"?"left":o==="direita"?"right":o;console.log("[SimpleSnackbarConfig] Configurações lidas:",{duration:n,distance:e,position:r,align:i}),window.Snackbar.clearQueue&&window.Snackbar.clearQueue(),window.Snackbar.closeCurrent&&window.Snackbar.closeCurrent();const s=document.querySelectorAll('[data-snackbar="1"]');s.forEach(l=>{l.parentNode&&l.parentNode.removeChild(l)}),console.log("[SimpleSnackbarConfig] Snackbars existentes removidos:",s.length);const c=window.SnackbarInstance;c.defaultDuration=n,c.bottomOffset=e,c.position=r,c.align=i,console.log("[SimpleSnackbarConfig] Configurações aplicadas na instância:",{defaultDuration:c.defaultDuration,bottomOffset:c.bottomOffset,position:c.position,align:c.align}),window.Snackbar.configure&&(window.Snackbar.configure({defaultDuration:n,bottom:e,position:r,align:i}),console.log("[SimpleSnackbarConfig] Configurações aplicadas via configure")),console.log("[SimpleSnackbarConfig] Testando configurações..."),window.Snackbar.info("Teste: Configurações aplicadas!")}function r0(){console.log("[SimpleSnackbarConfig] Testando..."),ws(),setTimeout(()=>{window.Snackbar.success("Teste SUCCESS!")},100),setTimeout(()=>{window.Snackbar.warning("Teste WARNING!")},200)}function i0(){console.log("[SimpleSnackbarConfig] Resetando..."),localStorage.setItem("toastDuration","3000"),localStorage.setItem("toastDistance","80"),localStorage.setItem("toastPosition","bottom"),localStorage.setItem("toastAlignment","center"),ws(),window.Snackbar.info("Configurações resetadas!")}window.applySimpleSnackbarConfig=ws;window.testSimpleSnackbarConfig=r0;window.resetSimpleSnackbarConfig=i0;function Ga(){window.Snackbar&&window.SnackbarInstance?(console.log("[SimpleSnackbarConfig] Snackbar disponível, aplicando configurações..."),ws()):(console.log("[SimpleSnackbarConfig] Aguardando Snackbar..."),setTimeout(Ga,100))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ga):Ga();console.log("[SimpleSnackbarConfig] Sistema simplificado carregado");async function s0(){console.log("🔍 [DebugNotifications] Iniciando debug do sistema de notificações...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget,t=window.appState?.notifications;if(console.log("👤 [DebugNotifications] Usuário atual:",n?.uid),console.log("💰 [DebugNotifications] Orçamento atual:",e?.id,e?.nome),console.log("📧 [DebugNotifications] Notificações atuais:",t?.length||0),!n?.uid){console.error("❌ [DebugNotifications] Usuário não logado!");return}if(!e?.id){console.error("❌ [DebugNotifications] Nenhum orçamento selecionado!");return}const{getById:o}=await N(async()=>{const{getById:g}=await Promise.resolve().then(()=>_s);return{getById:g}},void 0),r=await o(e.id);console.log("📊 [DebugNotifications] Dados do orçamento:",{id:r?.id,nome:r?.nome,criadoPor:r?.criadoPor,usuariosPermitidos:r?.usuariosPermitidos}),console.log("🧪 [DebugNotifications] Testando criação de notificação...");const{create:i}=await N(async()=>{const{create:g}=await Promise.resolve().then(()=>le);return{create:g}},void 0),{serverTimestamp:s}=await N(async()=>{const{serverTimestamp:g}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:g}},void 0),c=r?.criadoPor||r?.userId,l={type:"test_notification",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",message:`Notificação de teste para debug - Enviada para dono: ${c}`,createdAt:s(),read:!1,recipientUid:c};console.log("🎯 [DebugNotifications] Enviando notificação para dono:",c);const d=await i(l);console.log("✅ [DebugNotifications] Notificação de teste criada com ID:",d),setTimeout(async()=>{console.log("⏳ [DebugNotifications] Verificando se a notificação chegou...");const{listByRecipient:g}=await N(async()=>{const{listByRecipient:A}=await Promise.resolve().then(()=>le);return{listByRecipient:A}},void 0),f=await g(n.uid);console.log("📧 [DebugNotifications] Notificações do usuário:",f.length),console.log("📧 [DebugNotifications] Detalhes:",f.map(A=>({id:A.id,type:A.type,message:A.message,read:A.read,createdAt:A.createdAt}))),console.log("👂 [DebugNotifications] Verificando listener...");const{listenByRecipient:p}=await N(async()=>{const{listenByRecipient:A}=await Promise.resolve().then(()=>le);return{listenByRecipient:A}},void 0),v=p(n.uid,A=>{console.log("📡 [DebugNotifications] Listener recebeu dados:",A.length,"itens"),console.log("📡 [DebugNotifications] Detalhes do listener:",A.map(R=>({id:R.id,type:R.type,read:R.read}))),v()})},2e3)}catch(n){console.error("❌ [DebugNotifications] Erro durante debug:",n)}}async function a0(){console.log("🔍 [DebugSharedNotifications] Testando envio para usuários compartilhados...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugSharedNotifications] Dados insuficientes para teste");return}const{getById:t}=await N(async()=>{const{getById:i}=await Promise.resolve().then(()=>_s);return{getById:i}},void 0),o=await t(e.id);console.log("📊 [DebugSharedNotifications] Dados do orçamento:",{id:o?.id,nome:o?.nome,criadoPor:o?.criadoPor,usuariosPermitidos:o?.usuariosPermitidos});const{sendTestNotificationToShared:r}=await N(async()=>{const{sendTestNotificationToShared:i}=await import("./NotificationService-DrPvGObm.js");return{sendTestNotificationToShared:i}},[]);console.log("📤 [DebugSharedNotifications] Enviando notificação de teste..."),await r(e.id,n.uid),console.log("✅ [DebugSharedNotifications] Teste de envio concluído"),console.log("ℹ️ [DebugSharedNotifications] Nota: As notificações só aparecerão para os usuários que estão logados!")}catch(n){console.error("❌ [DebugSharedNotifications] Erro durante teste:",n)}}async function c0(){console.log("🔍 [DebugOtherUser] Verificando notificações de outros usuários...");try{const n=window.appState?.currentBudget;if(!n?.id){console.error("❌ [DebugOtherUser] Nenhum orçamento selecionado");return}const{getById:e}=await N(async()=>{const{getById:s}=await Promise.resolve().then(()=>_s);return{getById:s}},void 0),t=await e(n.id),{listByRecipient:o}=await N(async()=>{const{listByRecipient:s}=await Promise.resolve().then(()=>le);return{listByRecipient:s}},void 0),r=t?.criadoPor||t?.userId;if(r){console.log("👑 [DebugOtherUser] Verificando notificações do dono:",r);const s=await o(r);console.log("📧 [DebugOtherUser] Notificações do dono:",s.length),console.log("📧 [DebugOtherUser] Detalhes do dono:",s.map(c=>({id:c.id,type:c.type,message:c.message,read:c.read,senderUid:c.senderUid})))}const i=t?.usuariosPermitidos||[];for(const s of i)if(s&&s!==r){console.log("👥 [DebugOtherUser] Verificando notificações do usuário:",s);const c=await o(s);console.log("📧 [DebugOtherUser] Notificações do usuário",s,":",c.length),console.log("📧 [DebugOtherUser] Detalhes do usuário",s,":",c.map(l=>({id:l.id,type:l.type,message:l.message,read:l.read,senderUid:l.senderUid})))}}catch(n){console.error("❌ [DebugOtherUser] Erro durante verificação:",n)}}async function l0(){console.log("🧪 [DebugTestModal] Testando modal manualmente...");try{let n=document.getElementById("notification-modal");console.log("🔍 [DebugTestModal] Modal no DOM:",!!n),console.log("🏗️ [DebugTestModal] Importando e criando modal...");const{getNotificationModal:e}=await N(async()=>{const{getNotificationModal:o}=await import("./NotificationModal-CXlK3t7N.js");return{getNotificationModal:o}},[]),t=e();if(console.log("📱 [DebugTestModal] Instância do modal obtida:",!!t),n=document.getElementById("notification-modal"),console.log("🔍 [DebugTestModal] Modal no DOM após criação:",!!n),n){const o={id:"test-modal-"+Date.now(),type:"test_notification",message:"Teste manual do modal de notificação!",details:"Este é um teste para verificar se o modal está funcionando.",read:!1,createdAt:{toDate:()=>new Date}};console.log("📱 [DebugTestModal] Exibindo modal com notificação de teste..."),t.show(o),console.log("✅ [DebugTestModal] Modal de teste exibido com sucesso"),setTimeout(()=>{const r=document.getElementById("notification-modal");if(r){const i=window.getComputedStyle(r);console.log("🔍 [DebugTestModal] Modal após show():",{display:i.display,opacity:i.opacity,visibility:i.visibility,zIndex:i.zIndex,position:i.position});const s=r.getBoundingClientRect();console.log("📐 [DebugTestModal] Modal dimensions:",{width:s.width,height:s.height,top:s.top,left:s.left,visible:s.width>0&&s.height>0})}},100)}else if(console.error("❌ [DebugTestModal] Modal ainda não foi criado no DOM!"),console.log("🔧 [DebugTestModal] Tentando forçar criação do HTML..."),t.createModalHTML(),n=document.getElementById("notification-modal"),console.log("🔍 [DebugTestModal] Modal após forçar criação:",!!n),n){const o={id:"test-modal-"+Date.now(),type:"test_notification",message:"Teste manual do modal de notificação (forçado)!",details:"Modal foi criado manualmente para teste.",read:!1,createdAt:{toDate:()=>new Date}};t.show(o),console.log("✅ [DebugTestModal] Modal exibido após criação forçada")}}catch(n){console.error("❌ [DebugTestModal] Erro durante teste:",n),console.error("❌ [DebugTestModal] Stack trace:",n.stack)}}function u0(){console.log("🔍 [DebugNotificationState] Estado atual do sistema:");const n={currentUser:window.appState?.currentUser?.uid,currentBudget:window.appState?.currentBudget?.id,notifications:window.appState?.notifications?.length||0,notificationModal:!!document.getElementById("notification-modal"),eventBus:!!window.eventBus,snackbar:!!window.Snackbar};console.log("📊 [DebugNotificationState] Estado:",n);const e={notificationsUpdated:window.__notifUpdatesListenerBound,notificationModal:window.__notificationModalListenerBound};console.log("👂 [DebugNotificationState] Listeners ativos:",e);const t=window.appState?.notifications||[],o=t.filter(r=>!r.read&&!r.archivedAt).length;if(console.log("📧 [DebugNotificationState] Notificações não lidas:",o),t.length>0){const r=t[0];console.log("📧 [DebugNotificationState] Última notificação:",{id:r.id,type:r.type,read:r.read,createdAt:r.createdAt})}return n}async function d0(){console.log("🧪 [DebugCreateTest] Criando notificação de teste...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugCreateTest] Usuário ou orçamento não encontrado");return}const{create:t}=await N(async()=>{const{create:s}=await Promise.resolve().then(()=>le);return{create:s}},void 0),{serverTimestamp:o}=await N(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"test_notification",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",message:`Teste manual criado em ${new Date().toLocaleString("pt-BR")}`,details:"Esta é uma notificação de teste criada manualmente para verificar se o sistema está funcionando.",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugCreateTest] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugCreateTest] Notificação de teste criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(l=>l.id===i);c?console.log("✅ [DebugCreateTest] Notificação encontrada no estado local:",c):console.warn("⚠️ [DebugCreateTest] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugCreateTest] Erro ao criar notificação de teste:",n)}}async function h0(){console.log("🔄 [DebugRecorrente] Criando notificação de recorrente de teste...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugRecorrente] Usuário ou orçamento não encontrado");return}const{create:t}=await N(async()=>{const{create:s}=await Promise.resolve().then(()=>le);return{create:s}},void 0),{serverTimestamp:o}=await N(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"new_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-recorrente-id",recorrenteNome:"Teste de Despesa Recorrente",recorrenteValor:150,recorrenteFrequencia:"Mensal",recorrenteCategoria:"Teste",recorrenteDescricao:"Esta é uma despesa recorrente de teste",recorrenteParcelasRestantes:5,recorrenteParcelasTotal:12,createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecorrente] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugRecorrente] Notificação de recorrente criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(l=>l.id===i);c?console.log("✅ [DebugRecorrente] Notificação encontrada no estado local:",c):console.warn("⚠️ [DebugRecorrente] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugRecorrente] Erro ao criar notificação de recorrente:",n)}}async function f0(){console.log("🔍 [DebugModal] Verificando status do modal...");const n=document.getElementById("notification-modal");if(console.log("📱 [DebugModal] Modal no DOM:",!!n),n){const e=window.getComputedStyle(n);console.log("📱 [DebugModal] Estilos do modal:",{display:e.display,opacity:e.opacity,visibility:e.visibility,zIndex:e.zIndex,position:e.position});const t=n.getBoundingClientRect();console.log("📐 [DebugModal] Dimensões do modal:",{width:t.width,height:t.height,top:t.top,left:t.left,visible:t.width>0&&t.height>0})}return console.log("👂 [DebugModal] Listener notification:show-modal ativo:",window.__notificationModalListenerBound),console.log("📡 [DebugModal] EventBus disponível:",!!window.eventBus),{modalExists:!!n,listenerActive:window.__notificationModalListenerBound,eventBusAvailable:!!window.eventBus}}async function g0(){console.log("🧪 [DebugModalDirect] Testando modal diretamente...");try{const{getNotificationModal:n}=await N(async()=>{const{getNotificationModal:t}=await import("./NotificationModal-CXlK3t7N.js");return{getNotificationModal:t}},[]),e=n();if(console.log("📱 [DebugModalDirect] Modal obtido:",!!e),e){const t={id:"test-modal-direct",type:"test_notification",message:"Teste direto do modal",details:"Este é um teste direto do modal de notificações",createdAt:new Date,read:!1,senderName:"Sistema de Debug",budgetName:"Orçamento de Teste"};console.log("📱 [DebugModalDirect] Exibindo modal com notificação de teste..."),e.show(t),console.log("✅ [DebugModalDirect] Modal exibido com sucesso"),setTimeout(()=>{const o=document.getElementById("notification-modal");if(o){const r=window.getComputedStyle(o);console.log("📱 [DebugModalDirect] Modal após 1s:",{display:r.display,opacity:r.opacity,visibility:r.visibility,zIndex:r.zIndex});const i=o.getBoundingClientRect();console.log("📐 [DebugModalDirect] Dimensões do modal:",{width:i.width,height:i.height,visible:i.width>0&&i.height>0})}else console.error("❌ [DebugModalDirect] Modal não encontrado no DOM após 1s")},1e3)}else console.error("❌ [DebugModalDirect] Modal não foi obtido")}catch(n){console.error("❌ [DebugModalDirect] Erro durante teste direto:",n),console.error("❌ [DebugModalDirect] Stack trace:",n.stack)}}async function m0(){console.log("📡 [DebugEventBus] Testando eventBus diretamente...");try{if(!window.eventBus){console.error("❌ [DebugEventBus] EventBus não está disponível");return}console.log("📡 [DebugEventBus] EventBus disponível:",!!window.eventBus),console.log("📡 [DebugEventBus] Métodos do EventBus:",Object.getOwnPropertyNames(window.eventBus)),console.log("👂 [DebugEventBus] Listener ativo:",window.__notificationModalListenerBound);const n={id:"test-eventbus",type:"test_notification",message:"Teste via EventBus",details:"Este é um teste via EventBus",createdAt:new Date,read:!1,senderName:"Sistema de Debug",budgetName:"Orçamento de Teste"};console.log("📡 [DebugEventBus] Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugEventBus] Evento emitido com sucesso")}catch(n){console.error("❌ [DebugEventBus] Erro durante teste do EventBus:",n),console.error("❌ [DebugEventBus] Stack trace:",n.stack)}}async function p0(){console.log("🔍 [DebugSystem] Verificando sistema de notificações...");try{console.log("📊 [DebugSystem] Estado do app:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,hasNotifications:!!window.appState?.notifications,notificationsCount:window.appState?.notifications?.length||0}),console.log("📡 [DebugSystem] EventBus:",{hasEventBus:!!window.eventBus,hasOnMethod:!!window.eventBus?.on,hasEmitMethod:!!window.eventBus?.emit});const n=window.__notifCtl;console.log("👂 [DebugSystem] Controller de notificações:",{hasController:!!n,hasUnsub:!!n?.unsub,currentUid:n?.uid,lastIdsCount:n?.lastIds?.size||0});const e=window.appState?.currentUser?.uid;if(e)try{const{getUserPrefs:c}=await N(async()=>{const{getUserPrefs:d}=await Promise.resolve().then(()=>dl);return{getUserPrefs:d}},void 0),l=await c(e);console.log("⚙️ [DebugSystem] Preferências do usuário:",l)}catch(c){console.warn("⚠️ [DebugSystem] Erro ao obter preferências:",c)}const t=document.getElementById("notification-modal");console.log("📱 [DebugSystem] Modal:",{exists:!!t,visible:t?t.style.display!=="none":!1,hasContent:t?t.innerHTML.length>0:!1}),console.log("🧪 [DebugSystem] Testando criação de notificação...");const{create:o}=await N(async()=>{const{create:c}=await Promise.resolve().then(()=>le);return{create:c}},void 0),{serverTimestamp:r}=await N(async()=>{const{serverTimestamp:c}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:c}},void 0),i={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste de sistema de notificações",createdAt:r(),read:!1,recipientUid:window.appState?.currentUser?.uid},s=await o(i);console.log("✅ [DebugSystem] Notificação de teste criada com ID:",s),setTimeout(()=>{const l=(window.appState?.notifications||[]).find(d=>d.id===s);l?(console.log("✅ [DebugSystem] Notificação de teste encontrada no estado local"),console.log("📝 [DebugSystem] Dados da notificação:",l)):console.warn("⚠️ [DebugSystem] Notificação de teste não encontrada no estado local")},3e3)}catch(n){console.error("❌ [DebugSystem] Erro durante verificação:",n),console.error("❌ [DebugSystem] Stack trace:",n.stack)}}async function km(){console.log("💳 [DebugTransaction] Testando notificação de transação...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugTransaction] Usuário ou orçamento não encontrado");return}const{create:t}=await N(async()=>{const{create:s}=await Promise.resolve().then(()=>le);return{create:s}},void 0),{serverTimestamp:o}=await N(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"new_transaction",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",transactionId:"test-transaction-id",transactionDescricao:"Teste de transação",transactionValor:100,transactionTipo:"despesa",transactionCategoria:"Teste",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugTransaction] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugTransaction] Notificação de transação criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(l=>l.id===i);c?console.log("✅ [DebugTransaction] Notificação encontrada no estado local:",c):console.warn("⚠️ [DebugTransaction] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugTransaction] Erro ao criar notificação de transação:",n)}}async function Nm(){console.log("🔄 [DebugRecurringEditDelete] Testando notificações de edição e exclusão...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugRecurringEditDelete] Usuário ou orçamento não encontrado");return}console.log("📊 [DebugRecurringEditDelete] Dados do orçamento:",{id:e.id,nome:e.nome,usuariosPermitidos:e.usuariosPermitidos,usuariosPermitidosCount:e.usuariosPermitidos?.length||0}),console.log("✏️ [DebugRecurringEditDelete] Testando notificação de edição...");const{create:t}=await N(async()=>{const{create:l}=await Promise.resolve().then(()=>le);return{create:l}},void 0),{serverTimestamp:o}=await N(async()=>{const{serverTimestamp:l}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:l}},void 0),r={type:"updated_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-edit-recorrente-id",recorrenteNome:"Despesa Recorrente Editada",recorrenteValor:200,recorrenteFrequencia:"mensal",recorrenteCategoria:"Teste",recorrenteDescricao:"Esta despesa foi editada",recorrenteParcelasRestantes:3,recorrenteParcelasTotal:6,changes:{valor:{from:150,to:200},parcelasRestantes:{from:5,to:3}},prev:{nome:"Despesa Recorrente Editada",valor:150,frequencia:"mensal",categoria:"Teste",descricao:"Esta despesa foi editada",parcelasRestantes:5,parcelasTotal:6},createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecurringEditDelete] Dados da notificação de edição:",r);const i=await t(r);console.log("✅ [DebugRecurringEditDelete] Notificação de edição criada com ID:",i),console.log("🗑️ [DebugRecurringEditDelete] Testando notificação de exclusão...");const s={type:"deleted_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-delete-recorrente-id",recorrenteNome:"Despesa Recorrente Excluída",recorrenteValor:100,recorrenteFrequencia:"mensal",recorrenteCategoria:"Teste",recorrenteDescricao:"Esta despesa foi excluída",recorrenteParcelasRestantes:2,recorrenteParcelasTotal:4,createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecurringEditDelete] Dados da notificação de exclusão:",s);const c=await t(s);console.log("✅ [DebugRecurringEditDelete] Notificação de exclusão criada com ID:",c),setTimeout(()=>{const l=window.appState?.notifications||[],d=l.find(f=>f.id===i),g=l.find(f=>f.id===c);d?console.log("✅ [DebugRecurringEditDelete] Notificação de edição encontrada:",d):console.warn("⚠️ [DebugRecurringEditDelete] Notificação de edição não encontrada"),g?console.log("✅ [DebugRecurringEditDelete] Notificação de exclusão encontrada:",g):console.warn("⚠️ [DebugRecurringEditDelete] Notificação de exclusão não encontrada")},3e3)}catch(n){console.error("❌ [DebugRecurringEditDelete] Erro durante teste:",n)}}async function Pm(){console.log("🔍 [DebugFullDiagnosis] Iniciando diagnóstico completo do sistema de notificações...");try{console.log("📊 [DebugFullDiagnosis] === ESTADO BÁSICO ==="),console.log("App State:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,currentUserId:window.appState?.currentUser?.uid,currentBudgetId:window.appState?.currentBudget?.id,currentBudgetName:window.appState?.currentBudget?.nome,usuariosPermitidos:window.appState?.currentBudget?.usuariosPermitidos,usuariosCount:window.appState?.currentBudget?.usuariosPermitidos?.length||0}),console.log("📡 [DebugFullDiagnosis] === EVENTBUS ==="),console.log("EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit,hasOff:!!window.eventBus?.off}),console.log("👂 [DebugFullDiagnosis] === CONTROLLER DE NOTIFICAÇÕES ===");const n=window.__notifCtl;console.log("Controller:",{exists:!!n,hasUnsub:!!n?.unsub,currentUid:n?.uid,lastIdsCount:n?.lastIds?.size||0,lastSeenAt:n?.lastSeenAt}),console.log("📧 [DebugFullDiagnosis] === ESTADO DAS NOTIFICAÇÕES ===");const e=window.appState?.notifications||[];console.log("Notificações:",{count:e.length,unreadCount:e.filter(r=>!r.read).length,types:[...new Set(e.map(r=>r.type))],recent:e.slice(-3).map(r=>({id:r.id,type:r.type,read:r.read,createdAt:r.createdAt}))}),console.log("📱 [DebugFullDiagnosis] === MODAL ===");const t=document.getElementById("notification-modal");console.log("Modal:",{exists:!!t,visible:t?t.style.display!=="none":!1,hasContent:t?t.innerHTML.length>0:!1,classes:t?t.className:null}),console.log("🧪 [DebugFullDiagnosis] === TESTE DE CRIAÇÃO ===");try{const{create:r}=await N(async()=>{const{create:l}=await Promise.resolve().then(()=>le);return{create:l}},void 0),{serverTimestamp:i}=await N(async()=>{const{serverTimestamp:l}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:l}},void 0),s={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste de diagnóstico completo",createdAt:i(),read:!1,recipientUid:window.appState?.currentUser?.uid};console.log("📝 [DebugFullDiagnosis] Criando notificação de teste...");const c=await r(s);console.log("✅ [DebugFullDiagnosis] Notificação criada com ID:",c),setTimeout(()=>{console.log("⏰ [DebugFullDiagnosis] Verificando se a notificação chegou...");const l=window.appState?.notifications||[],d=l.find(g=>g.id===c);d?console.log("✅ [DebugFullDiagnosis] Notificação encontrada no estado local:",d):(console.warn("⚠️ [DebugFullDiagnosis] Notificação não encontrada no estado local"),console.log("📊 [DebugFullDiagnosis] Estado atual das notificações:",l.length,"itens"))},3e3)}catch(r){console.error("❌ [DebugFullDiagnosis] Erro ao criar notificação de teste:",r)}console.log("⚙️ [DebugFullDiagnosis] === PREFERÊNCIAS ===");try{const{getUserPrefs:r}=await N(async()=>{const{getUserPrefs:s}=await Promise.resolve().then(()=>dl);return{getUserPrefs:s}},void 0),i=await r(window.appState?.currentUser?.uid);console.log("Preferências:",i)}catch(r){console.warn("⚠️ [DebugFullDiagnosis] Erro ao obter preferências:",r)}console.log("💾 [DebugFullDiagnosis] === LOCALSTORAGE ==="),["notification_use_modal","notification_toasts_enabled","notification_types_enabled","notification_period_filter"].forEach(r=>{const i=localStorage.getItem(r);console.log(`${r}:`,i)}),console.log("✅ [DebugFullDiagnosis] Diagnóstico completo finalizado!")}catch(n){console.error("❌ [DebugFullDiagnosis] Erro durante diagnóstico:",n),console.error("❌ [DebugFullDiagnosis] Stack trace:",n.stack)}}async function xm(){console.log("📡 [DebugEventBusSystem] Testando sistema de EventBus...");try{if(!window.eventBus){console.error("❌ [DebugEventBusSystem] EventBus não está disponível");return}console.log("✅ [DebugEventBusSystem] EventBus encontrado"),console.log("🧪 [DebugEventBusSystem] Testando emissão de evento simples...");let n=!1;const e=r=>{console.log("✅ [DebugEventBusSystem] Evento de teste recebido:",r),n=!0};window.eventBus.on("test-event",e),window.eventBus.emit("test-event",{message:"Teste do EventBus",timestamp:Date.now()}),setTimeout(()=>{n?console.log("✅ [DebugEventBusSystem] EventBus está funcionando corretamente"):console.warn("⚠️ [DebugEventBusSystem] Evento não foi recebido"),window.eventBus.off("test-event",e)},1e3),console.log("📱 [DebugEventBusSystem] Testando evento de notificação...");const t={id:"test-eventbus-notification",type:"test_notification",message:"Teste do EventBus para notificações",createdAt:new Date,read:!1};window.eventBus.emit("notification:show-modal",t),console.log("📤 [DebugEventBusSystem] Evento notification:show-modal emitido"),console.log("🔍 [DebugEventBusSystem] Verificando listener global..."),console.log("Listener global ativo:",!!window.__notificationModalListenerBound),console.log("🔄 [DebugEventBusSystem] Testando outros eventos..."),["notifications:updated","snackbar:show","transactions:updated","categories:updated"].forEach(r=>{try{window.eventBus.emit(r,{test:!0,timestamp:Date.now()}),console.log(`✅ [DebugEventBusSystem] Evento ${r} emitido com sucesso`)}catch(i){console.error(`❌ [DebugEventBusSystem] Erro ao emitir evento ${r}:`,i)}})}catch(n){console.error("❌ [DebugEventBusSystem] Erro durante teste do EventBus:",n)}}async function Mm(){console.log("🔄 [DebugRecurringComplete] Testando notificação de recorrente completa...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugRecurringComplete] Usuário ou orçamento não encontrado");return}const{create:t}=await N(async()=>{const{create:s}=await Promise.resolve().then(()=>le);return{create:s}},void 0),{serverTimestamp:o}=await N(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"new_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-recorrente-complete-id",recorrenteNome:"Despesa Recorrente Completa",recorrenteValor:250,recorrenteFrequencia:"mensal",recorrenteCategoria:"Teste Completo",recorrenteDescricao:"Esta é uma despesa recorrente de teste completa",recorrenteParcelasRestantes:8,recorrenteParcelasTotal:12,createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecurringComplete] Dados da notificação:",r),console.log("🔍 [DebugRecurringComplete] Campos de parcelas:",{parcelasRestantes:r.recorrenteParcelasRestantes,parcelasTotal:r.recorrenteParcelasTotal,temParcelas:r.recorrenteParcelasTotal>1});const i=await t(r);console.log("✅ [DebugRecurringComplete] Notificação de recorrente criada com ID:",i),setTimeout(()=>{const s=window.appState?.notifications||[],c=s.find(l=>l.id===i);c?(console.log("✅ [DebugRecurringComplete] Notificação encontrada no estado local:",c),console.log("🔍 [DebugRecurringComplete] Campos de parcelas na notificação recebida:",{parcelasRestantes:c.recorrenteParcelasRestantes,parcelasTotal:c.recorrenteParcelasTotal,temParcelas:c.recorrenteParcelasTotal>1}),console.log("📅 [DebugRecurringComplete] Data da notificação:",c.createdAt),console.log("📊 [DebugRecurringComplete] Posição na lista:",s.findIndex(l=>l.id===i))):console.warn("⚠️ [DebugRecurringComplete] Notificação não encontrada no estado local")},3e3)}catch(n){console.error("❌ [DebugRecurringComplete] Erro ao criar notificação de recorrente:",n)}}async function w0(){if(console.log("🔍 [DebugEventBus] Verificando EventBus e Modal..."),console.log("🔍 [DebugEventBus] window.eventBus:",!!window.eventBus),console.log("🔍 [DebugEventBus] window.eventBus.emit:",typeof window.eventBus?.emit),console.log("🔍 [DebugEventBus] window.eventBus.on:",typeof window.eventBus?.on),console.log("🔍 [DebugEventBus] window.__notificationModalListenerBound:",window.__notificationModalListenerBound),window.eventBus&&typeof window.eventBus.emit=="function"){const n={id:"test-"+Date.now(),type:"new_transaction",message:"Teste de EventBus",transactionDescricao:"Teste de transação",transactionValor:100.5,createdAt:new Date,read:!1};console.log("📤 [DebugEventBus] Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugEventBus] Evento emitido")}else console.error("❌ [DebugEventBus] EventBus não disponível")}async function y0(){console.log("🏭 [DebugProduction] === DIAGNÓSTICO DE PRODUÇÃO ==="),console.log("🌍 [DebugProduction] Ambiente:",{isProduction:!0,isDevelopment:!1,userAgent:navigator.userAgent,location:window.location.href}),console.log("📡 [DebugProduction] EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit,listenerBound:!!window.__notificationModalListenerBound});const n=document.getElementById("notification-modal");console.log("📱 [DebugProduction] Modal DOM:",{exists:!!n,inDocument:document.contains(n),display:n?window.getComputedStyle(n).display:"N/A",visibility:n?window.getComputedStyle(n).visibility:"N/A",opacity:n?window.getComputedStyle(n).opacity:"N/A",zIndex:n?window.getComputedStyle(n).zIndex:"N/A"});const e=document.querySelector('link[href*="notification-modal"]')||document.querySelector("style[data-notification-modal]");console.log("🎨 [DebugProduction] CSS Modal:",{cssLoaded:!!e,cssHref:e?.href||"N/A"});try{console.log("📦 [DebugProduction] Testando importação do modal...");const{getNotificationModal:t}=await N(async()=>{const{getNotificationModal:r}=await import("./NotificationModal-CXlK3t7N.js");return{getNotificationModal:r}},[]),o=t();console.log("✅ [DebugProduction] Modal importado:",!!o),console.log("✅ [DebugProduction] Modal show method:",typeof o?.show)}catch(t){console.error("❌ [DebugProduction] Erro ao importar modal:",t)}if(window.eventBus){console.log("📤 [DebugProduction] Testando evento...");const t={id:"test-production-"+Date.now(),type:"test_notification",message:"Teste de Produção",createdAt:new Date,read:!1};window.eventBus.emit("notification:show-modal",t),console.log("✅ [DebugProduction] Evento emitido"),setTimeout(()=>{const o=document.getElementById("notification-modal");console.log("📱 [DebugProduction] Modal após evento:",{exists:!!o,display:o?window.getComputedStyle(o).display:"N/A",visibility:o?window.getComputedStyle(o).visibility:"N/A",opacity:o?window.getComputedStyle(o).opacity:"N/A"})},1e3)}console.log("🏭 [DebugProduction] === FIM DO DIAGNÓSTICO ===")}async function Bm(){console.log("📱 [DebugModalDirect] Testando modal diretamente...");try{let n=document.getElementById("notification-modal");if(console.log("🔍 [DebugModalDirect] Modal no DOM:",!!n),!n){console.log("🔧 [DebugModalDirect] Modal não existe, criando...");const{getNotificationModal:t}=await N(async()=>{const{getNotificationModal:o}=await import("./NotificationModal-CXlK3t7N.js");return{getNotificationModal:o}},[]);n=t(),console.log("✅ [DebugModalDirect] Modal criado:",!!n)}n&&console.log("📊 [DebugModalDirect] Estado do modal:",{exists:!!n,visible:n.style.display!=="none",hasContent:n.innerHTML.length>0,classes:n.className});const e={id:"test-modal-direct",type:"test_notification",message:"Teste direto do modal",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:"Orçamento de Teste"};if(console.log("📝 [DebugModalDirect] Notificação de teste:",e),n){console.log("🚀 [DebugModalDirect] Tentando mostrar modal...");const{getNotificationModal:t}=await N(async()=>{const{getNotificationModal:r}=await import("./NotificationModal-CXlK3t7N.js");return{getNotificationModal:r}},[]),o=t();o&&typeof o.show=="function"?(console.log("✅ [DebugModalDirect] Função show encontrada, executando..."),o.show(e),console.log("✅ [DebugModalDirect] Modal.show() executado"),setTimeout(()=>{const r=document.getElementById("notification-modal");r&&console.log("📊 [DebugModalDirect] Estado após show():",{visible:r.style.display!=="none",hasContent:r.innerHTML.length>0,opacity:r.style.opacity,zIndex:r.style.zIndex})},1e3)):console.error("❌ [DebugModalDirect] Função show não encontrada no modal")}console.log("📡 [DebugModalDirect] Testando via EventBus..."),window.eventBus?(console.log("✅ [DebugModalDirect] EventBus encontrado, emitindo evento..."),window.eventBus.emit("notification:show-modal",e),console.log("✅ [DebugModalDirect] Evento notification:show-modal emitido"),setTimeout(()=>{const t=document.getElementById("notification-modal");t&&console.log("📊 [DebugModalDirect] Estado após EventBus:",{visible:t.style.display!=="none",hasContent:t.innerHTML.length>0,opacity:t.style.opacity,zIndex:t.style.zIndex})},1e3)):console.error("❌ [DebugModalDirect] EventBus não encontrado")}catch(n){console.error("❌ [DebugModalDirect] Erro durante teste:",n),console.error("❌ [DebugModalDirect] Stack trace:",n.stack)}}async function Om(){console.log("🔍 [DebugCompleteSystem] Iniciando diagnóstico completo do sistema...");try{console.log("📊 [DebugCompleteSystem] === ESTADO BÁSICO ==="),console.log("App State:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,currentUserId:window.appState?.currentUser?.uid,currentBudgetId:window.appState?.currentBudget?.id,currentBudgetName:window.appState?.currentBudget?.nome,usuariosPermitidos:window.appState?.currentBudget?.usuariosPermitidos,usuariosCount:window.appState?.currentBudget?.usuariosPermitidos?.length||0}),console.log("📡 [DebugCompleteSystem] === EVENTBUS ==="),console.log("EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit,hasOff:!!window.eventBus?.off}),console.log("👂 [DebugCompleteSystem] === CONTROLLER DE NOTIFICAÇÕES ===");const n=window.__notifCtl;console.log("Controller:",{exists:!!n,hasUnsub:!!n?.unsub,currentUid:n?.uid,lastIdsCount:n?.lastIds?.size||0,lastSeenAt:n?.lastSeenAt}),console.log("📧 [DebugCompleteSystem] === ESTADO DAS NOTIFICAÇÕES ===");const e=window.appState?.notifications||[];console.log("Notificações:",{count:e.length,unreadCount:e.filter(r=>!r.read).length,types:[...new Set(e.map(r=>r.type))],recent:e.slice(-3).map(r=>({id:r.id,type:r.type,read:r.read,createdAt:r.createdAt}))}),console.log("📱 [DebugCompleteSystem] === MODAL ===");const t=document.getElementById("notification-modal");console.log("Modal:",{exists:!!t,visible:t?t.style.display!=="none":!1,hasContent:t?t.innerHTML.length>0:!1,classes:t?t.className:null}),console.log("🎧 [DebugCompleteSystem] === LISTENER GLOBAL ==="),console.log("Listener Global:",{bound:!!window.__notificationModalListenerBound,eventBusExists:!!window.eventBus}),console.log("🧪 [DebugCompleteSystem] === TESTE DE CRIAÇÃO ===");try{const{create:r}=await N(async()=>{const{create:l}=await Promise.resolve().then(()=>le);return{create:l}},void 0),{serverTimestamp:i}=await N(async()=>{const{serverTimestamp:l}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:l}},void 0),s={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste de diagnóstico completo do sistema",createdAt:i(),read:!1,recipientUid:window.appState?.currentUser?.uid};console.log("📝 [DebugCompleteSystem] Criando notificação de teste...");const c=await r(s);console.log("✅ [DebugCompleteSystem] Notificação criada com ID:",c),setTimeout(()=>{console.log("⏰ [DebugCompleteSystem] Verificando se a notificação chegou...");const l=window.appState?.notifications||[],d=l.find(g=>g.id===c);d?console.log("✅ [DebugCompleteSystem] Notificação encontrada no estado local:",d):(console.warn("⚠️ [DebugCompleteSystem] Notificação não encontrada no estado local"),console.log("📊 [DebugCompleteSystem] Estado atual das notificações:",l.length,"itens"))},3e3)}catch(r){console.error("❌ [DebugCompleteSystem] Erro ao criar notificação de teste:",r)}if(console.log("📡 [DebugCompleteSystem] === TESTE DO EVENTBUS ==="),window.eventBus){console.log("✅ [DebugCompleteSystem] EventBus encontrado, testando...");let r=!1;const i=c=>{console.log("✅ [DebugCompleteSystem] Evento de teste recebido:",c),r=!0};window.eventBus.on("test-complete-system",i),window.eventBus.emit("test-complete-system",{message:"Teste do sistema completo",timestamp:Date.now()}),setTimeout(()=>{r?console.log("✅ [DebugCompleteSystem] EventBus está funcionando"):console.warn("⚠️ [DebugCompleteSystem] EventBus pode não estar funcionando"),window.eventBus.off("test-complete-system",i)},1e3),console.log("📱 [DebugCompleteSystem] Testando evento de notificação...");const s={id:"test-complete-system-notification",type:"test_notification",message:"Teste do sistema completo",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:"Orçamento de Teste"};window.eventBus.emit("notification:show-modal",s),console.log("📤 [DebugCompleteSystem] Evento notification:show-modal emitido")}else console.error("❌ [DebugCompleteSystem] EventBus não encontrado");console.log("⚙️ [DebugCompleteSystem] === PREFERÊNCIAS ===");try{const{getUserPrefs:r}=await N(async()=>{const{getUserPrefs:s}=await Promise.resolve().then(()=>dl);return{getUserPrefs:s}},void 0),i=await r(window.appState?.currentUser?.uid);console.log("Preferências:",i)}catch(r){console.warn("⚠️ [DebugCompleteSystem] Erro ao obter preferências:",r)}console.log("💾 [DebugCompleteSystem] === LOCALSTORAGE ==="),["notification_use_modal","notification_toasts_enabled","notification_types_enabled","notification_period_filter"].forEach(r=>{const i=localStorage.getItem(r);console.log(`${r}:`,i)}),console.log("✅ [DebugCompleteSystem] Diagnóstico completo finalizado!")}catch(n){console.error("❌ [DebugCompleteSystem] Erro durante diagnóstico:",n),console.error("❌ [DebugCompleteSystem] Stack trace:",n.stack)}}async function Um(){console.log("🧪 [DebugRecurringCategory] Testando notificações de recorrentes e categorias...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n||!e){console.error("❌ [DebugRecurringCategory] Usuário ou orçamento não encontrado");return}console.log("📊 [DebugRecurringCategory] Estado atual:",{userId:n.uid,budgetId:e.id,budgetName:e.nome,usuariosPermitidos:e.usuariosPermitidos}),console.log("📁 [DebugRecurringCategory] === TESTE DE CATEGORIA ===");try{const{sendCategoryChangeNotification:t}=await N(async()=>{const{sendCategoryChangeNotification:r}=await import("./NotificationService-DrPvGObm.js");return{sendCategoryChangeNotification:r}},[]),o={id:"test-category-"+Date.now(),nome:"Categoria de Teste",descricao:"Descrição da categoria de teste",cor:"#ff0000",tipo:"expense",limite:1e3,budgetId:e.id,userId:n.uid};console.log("📝 [DebugRecurringCategory] Enviando notificação de categoria..."),await t(e.id,n.uid,o,"category_added"),console.log("✅ [DebugRecurringCategory] Notificação de categoria enviada")}catch(t){console.error("❌ [DebugRecurringCategory] Erro ao enviar notificação de categoria:",t)}console.log("🔄 [DebugRecurringCategory] === TESTE DE RECORRENTE ===");try{const{sendRecorrenteChangeNotification:t}=await N(async()=>{const{sendRecorrenteChangeNotification:r}=await import("./NotificationService-DrPvGObm.js");return{sendRecorrenteChangeNotification:r}},[]),o={id:"test-recorrente-"+Date.now(),nome:"Recorrente de Teste",valor:500,frequencia:"mensal",categoria:"Alimentação",descricao:"Descrição do recorrente de teste",parcelasRestantes:10,parcelasTotal:12,budgetId:e.id,userId:n.uid};console.log("📝 [DebugRecurringCategory] Enviando notificação de recorrente..."),await t(e.id,n.uid,o,"new_recorrente"),console.log("✅ [DebugRecurringCategory] Notificação de recorrente enviada")}catch(t){console.error("❌ [DebugRecurringCategory] Erro ao enviar notificação de recorrente:",t)}if(console.log("⏰ [DebugRecurringCategory] Aguardando notificações chegarem..."),setTimeout(()=>{const t=window.appState?.notifications||[],o=t.filter(r=>r.type==="category_added"||r.type==="new_recorrente").slice(-2);console.log("📧 [DebugRecurringCategory] Notificações recentes encontradas:",o.length),o.forEach(r=>{console.log("📋 [DebugRecurringCategory] Notificação:",{id:r.id,type:r.type,read:r.read,createdAt:r.createdAt})}),o.length===0&&(console.warn("⚠️ [DebugRecurringCategory] Nenhuma notificação recente encontrada"),console.log("📊 [DebugRecurringCategory] Total de notificações:",t.length))},3e3),console.log("📱 [DebugRecurringCategory] === TESTE DO MODAL ==="),window.eventBus){const t={id:"test-modal-recurring-category",type:"category_added",message:"Teste de modal para categoria",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:e.nome,categoryNome:"Categoria de Teste",categoryDescricao:"Descrição da categoria",categoryCor:"#ff0000",categoryTipo:"expense",categoryLimite:1e3};console.log("📤 [DebugRecurringCategory] Emitindo evento para modal..."),window.eventBus.emit("notification:show-modal",t),console.log("✅ [DebugRecurringCategory] Evento emitido"),setTimeout(()=>{const o=document.getElementById("notification-modal");o&&o.style.display!=="none"?console.log("✅ [DebugRecurringCategory] Modal apareceu corretamente"):console.warn("⚠️ [DebugRecurringCategory] Modal não apareceu")},1e3)}console.log("✅ [DebugRecurringCategory] Teste de recorrentes e categorias finalizado!")}catch(n){console.error("❌ [DebugRecurringCategory] Erro durante teste:",n),console.error("❌ [DebugRecurringCategory] Stack trace:",n.stack)}}async function Vm(){console.log("🔬 [DebugDetailed] Iniciando teste detalhado de notificações...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n||!e){console.error("❌ [DebugDetailed] Usuário ou orçamento não encontrado"),console.log("📊 [DebugDetailed] Estado atual:",{hasUser:!!n,hasBudget:!!e,userId:n?.uid,budgetId:e?.id});return}console.log("📊 [DebugDetailed] Estado inicial:",{userId:n.uid,budgetId:e.id,budgetName:e.nome,usuariosPermitidos:e.usuariosPermitidos}),console.log("📦 [DebugDetailed] === TESTE DE IMPORTAÇÃO ===");try{const{sendCategoryChangeNotification:t,sendRecorrenteChangeNotification:o}=await N(async()=>{const{sendCategoryChangeNotification:r,sendRecorrenteChangeNotification:i}=await import("./NotificationService-DrPvGObm.js");return{sendCategoryChangeNotification:r,sendRecorrenteChangeNotification:i}},[]);console.log("✅ [DebugDetailed] Funções importadas:",{hasCategoryFunction:!!t,hasRecorrenteFunction:!!o})}catch(t){console.error("❌ [DebugDetailed] Erro ao importar funções:",t);return}console.log("🔥 [DebugDetailed] === TESTE DIRETO NO FIREBASE ===");try{const{create:t}=await N(async()=>{const{create:s}=await Promise.resolve().then(()=>le);return{create:s}},void 0),{serverTimestamp:o}=await N(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"test_direct_firebase",budgetId:e.id,budgetName:e.nome,senderUid:n.uid,senderName:n.displayName||"Usuário",message:"Teste direto no Firebase",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugDetailed] Criando notificação direta...");const i=await t(r);console.log("✅ [DebugDetailed] Notificação direta criada com ID:",i),setTimeout(()=>{(window.appState?.notifications||[]).find(l=>l.id===i)?console.log("✅ [DebugDetailed] Notificação direta chegou ao estado local"):console.warn("⚠️ [DebugDetailed] Notificação direta não chegou ao estado local")},2e3)}catch(t){console.error("❌ [DebugDetailed] Erro ao criar notificação direta:",t)}console.log("📁 [DebugDetailed] === TESTE DE CATEGORIA DETALHADO ===");try{const{sendCategoryChangeNotification:t}=await N(async()=>{const{sendCategoryChangeNotification:r}=await import("./NotificationService-DrPvGObm.js");return{sendCategoryChangeNotification:r}},[]),o={id:"test-category-detailed-"+Date.now(),nome:"Categoria Detalhada",descricao:"Descrição da categoria detalhada",cor:"#00ff00",tipo:"expense",limite:2e3,budgetId:e.id,userId:n.uid};console.log("📝 [DebugDetailed] Dados da categoria de teste:",o),console.log("📤 [DebugDetailed] Chamando sendCategoryChangeNotification..."),await t(e.id,n.uid,o,"category_added"),console.log("✅ [DebugDetailed] sendCategoryChangeNotification executada sem erro")}catch(t){console.error("❌ [DebugDetailed] Erro em sendCategoryChangeNotification:",t),console.error("❌ [DebugDetailed] Stack trace:",t.stack)}console.log("🔄 [DebugDetailed] === TESTE DE RECORRENTE DETALHADO ===");try{const{sendRecorrenteChangeNotification:t}=await N(async()=>{const{sendRecorrenteChangeNotification:r}=await import("./NotificationService-DrPvGObm.js");return{sendRecorrenteChangeNotification:r}},[]),o={id:"test-recorrente-detailed-"+Date.now(),nome:"Recorrente Detalhado",valor:750,frequencia:"mensal",categoria:"Alimentação",descricao:"Descrição do recorrente detalhado",parcelasRestantes:8,parcelasTotal:10,budgetId:e.id,userId:n.uid};console.log("📝 [DebugDetailed] Dados do recorrente de teste:",o),console.log("📤 [DebugDetailed] Chamando sendRecorrenteChangeNotification..."),await t(e.id,n.uid,o,"new_recorrente"),console.log("✅ [DebugDetailed] sendRecorrenteChangeNotification executada sem erro")}catch(t){console.error("❌ [DebugDetailed] Erro em sendRecorrenteChangeNotification:",t),console.error("❌ [DebugDetailed] Stack trace:",t.stack)}if(console.log("⏰ [DebugDetailed] Aguardando 5 segundos para verificar notificações..."),setTimeout(()=>{const t=window.appState?.notifications||[];console.log("📧 [DebugDetailed] Estado final das notificações:",{total:t.length,recent:t.slice(-5).map(r=>({id:r.id,type:r.type,read:r.read,createdAt:r.createdAt}))});const o=t.filter(r=>r.type==="test_direct_firebase"||r.type==="category_added"||r.type==="new_recorrente");console.log("🧪 [DebugDetailed] Notificações de teste encontradas:",o.length),o.forEach(r=>{console.log("📋 [DebugDetailed] Notificação de teste:",{id:r.id,type:r.type,read:r.read,createdAt:r.createdAt})}),o.length===0&&(console.warn("⚠️ [DebugDetailed] NENHUMA notificação de teste chegou ao estado local!"),console.log("🔍 [DebugDetailed] Possíveis causas:"),console.log("  - Listener de notificações não está funcionando"),console.log("  - Firebase não está salvando as notificações"),console.log("  - Problema de sincronização"),console.log("  - Erro nas funções de notificação"))},5e3),console.log("📡 [DebugDetailed] === TESTE DO EVENTBUS ==="),window.eventBus){console.log("✅ [DebugDetailed] EventBus encontrado");let t=!1;const o=r=>{console.log("✅ [DebugDetailed] Evento de teste recebido:",r),t=!0};window.eventBus.on("test-detailed-notification",o),window.eventBus.emit("test-detailed-notification",{message:"Teste detalhado",timestamp:Date.now()}),setTimeout(()=>{t?console.log("✅ [DebugDetailed] EventBus está funcionando"):console.warn("⚠️ [DebugDetailed] EventBus pode não estar funcionando"),window.eventBus.off("test-detailed-notification",o)},1e3)}else console.error("❌ [DebugDetailed] EventBus não encontrado");console.log("✅ [DebugDetailed] Teste detalhado finalizado!")}catch(n){console.error("❌ [DebugDetailed] Erro durante teste detalhado:",n),console.error("❌ [DebugDetailed] Stack trace:",n.stack)}}async function Lm(){console.log("🔍 [DebugCategoryDesc] Investigando problema da descrição da categoria...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n||!e){console.error("❌ [DebugCategoryDesc] Usuário ou orçamento não encontrado");return}console.log("📁 [DebugCategoryDesc] === TESTE DE CATEGORIA COM DESCRIÇÃO ===");try{const{sendCategoryChangeNotification:o}=await N(async()=>{const{sendCategoryChangeNotification:i}=await import("./NotificationService-DrPvGObm.js");return{sendCategoryChangeNotification:i}},[]),r={id:"test-category-desc-"+Date.now(),nome:"Categoria com Descrição",descricao:"Esta é uma descrição de teste para verificar se aparece no modal",cor:"#ff6b6b",tipo:"expense",limite:1500,budgetId:e.id,userId:n.uid};console.log("📝 [DebugCategoryDesc] Dados da categoria de teste:",r),console.log("📤 [DebugCategoryDesc] Enviando notificação..."),await o(e.id,n.uid,r,"category_added"),console.log("✅ [DebugCategoryDesc] Notificação enviada")}catch(o){console.error("❌ [DebugCategoryDesc] Erro ao enviar notificação:",o)}console.log("⏰ [DebugCategoryDesc] Aguardando notificação chegar..."),setTimeout(()=>{const o=window.appState?.notifications||[],r=o.find(i=>i.type==="category_added"&&i.categoryNome==="Categoria com Descrição");r?(console.log("✅ [DebugCategoryDesc] Notificação encontrada:",r),console.log("📋 [DebugCategoryDesc] Dados da notificação:",{id:r.id,type:r.type,categoryNome:r.categoryNome,categoryDescription:r.categoryDescription,categoryDescricao:r.categoryDescricao,categoryTipo:r.categoryTipo,categoryLimite:r.categoryLimite,categoryColor:r.categoryColor}),console.log("📱 [DebugCategoryDesc] Testando modal diretamente..."),window.eventBus&&(window.eventBus.emit("notification:show-modal",r),console.log("📤 [DebugCategoryDesc] Evento de modal emitido"))):(console.warn("⚠️ [DebugCategoryDesc] Notificação não encontrada"),console.log("📊 [DebugCategoryDesc] Notificações disponíveis:",o.length),o.forEach(i=>{i.type==="category_added"&&console.log("📋 [DebugCategoryDesc] Notificação de categoria encontrada:",{id:i.id,categoryNome:i.categoryNome,categoryDescription:i.categoryDescription})}))},3e3),console.log("🔍 [DebugCategoryDesc] === VERIFICAÇÃO DE CAMPOS ==="),console.log("📊 [DebugCategoryDesc] Verificando se há inconsistência nos nomes dos campos...");const t={descricao:"Teste descricao",description:"Teste description"};console.log("📝 [DebugCategoryDesc] Campos de teste:",t),console.log("🔍 [DebugCategoryDesc] Verificando mapeamento..."),console.log("  - categoryData?.descricao:",t.descricao),console.log("  - categoryData?.description:",t.description),console.log("✅ [DebugCategoryDesc] Debug da descrição da categoria finalizado!")}catch(n){console.error("❌ [DebugCategoryDesc] Erro durante debug:",n),console.error("❌ [DebugCategoryDesc] Stack trace:",n.stack)}}async function Fm(){console.log("🔍 [DebugModalNotAppearing] Investigando por que o modal parou de aparecer...");try{console.log("📊 [DebugModalNotAppearing] === ESTADO BÁSICO ==="),console.log("App State:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,currentUserId:window.appState?.currentUser?.uid,currentBudgetId:window.appState?.currentBudget?.id}),console.log("📡 [DebugModalNotAppearing] === EVENTBUS ==="),console.log("EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit}),console.log("🎧 [DebugModalNotAppearing] === LISTENER GLOBAL ==="),console.log("Listener Global:",{bound:!!window.__notificationModalListenerBound,eventBusExists:!!window.eventBus}),console.log("💾 [DebugModalNotAppearing] === LOCALSTORAGE ===");const n=localStorage.getItem("notification_use_modal");console.log("notification_use_modal:",n),console.log("useModal !== false:",n!=="false"),console.log("👂 [DebugModalNotAppearing] === CONTROLLER DE NOTIFICAÇÕES ===");const e=window.__notifCtl;console.log("Controller:",{exists:!!e,hasUnsub:!!e?.unsub,currentUid:e?.uid,lastIdsCount:e?.lastIds?.size||0}),console.log("📧 [DebugModalNotAppearing] === ESTADO DAS NOTIFICAÇÕES ===");const t=window.appState?.notifications||[];if(console.log("Notificações:",{count:t.length,unreadCount:t.filter(o=>!o.read).length,recent:t.slice(-3).map(o=>({id:o.id,type:o.type,read:o.read}))}),console.log("📡 [DebugModalNotAppearing] === TESTE DO EVENTBUS ==="),window.eventBus){console.log("✅ [DebugModalNotAppearing] EventBus encontrado, testando...");let o=!1;const r=s=>{console.log("✅ [DebugModalNotAppearing] Evento de teste recebido:",s),o=!0};window.eventBus.on("test-modal-not-appearing",r),window.eventBus.emit("test-modal-not-appearing",{message:"Teste do modal não aparecendo",timestamp:Date.now()}),setTimeout(()=>{o?console.log("✅ [DebugModalNotAppearing] EventBus está funcionando"):console.warn("⚠️ [DebugModalNotAppearing] EventBus pode não estar funcionando"),window.eventBus.off("test-modal-not-appearing",r)},1e3),console.log("📱 [DebugModalNotAppearing] Testando evento de notificação...");const i={id:"test-modal-not-appearing",type:"test_notification",message:"Teste do modal não aparecendo",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:"Orçamento de Teste"};window.eventBus.emit("notification:show-modal",i),console.log("📤 [DebugModalNotAppearing] Evento notification:show-modal emitido"),setTimeout(()=>{const s=document.getElementById("notification-modal");s&&s.style.display!=="none"?console.log("✅ [DebugModalNotAppearing] Modal apareceu corretamente"):(console.warn("⚠️ [DebugModalNotAppearing] Modal não apareceu"),console.log("📊 [DebugModalNotAppearing] Estado do modal:",{exists:!!s,visible:s?s.style.display!=="none":!1,hasContent:s?s.innerHTML.length>0:!1}))},2e3)}else console.error("❌ [DebugModalNotAppearing] EventBus não encontrado");console.log("🧪 [DebugModalNotAppearing] === TESTE DE CRIAÇÃO DE NOTIFICAÇÃO ===");try{const{create:o}=await N(async()=>{const{create:c}=await Promise.resolve().then(()=>le);return{create:c}},void 0),{serverTimestamp:r}=await N(async()=>{const{serverTimestamp:c}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:c}},void 0),i={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste do modal não aparecendo",createdAt:r(),read:!1,recipientUid:window.appState?.currentUser?.uid};console.log("📝 [DebugModalNotAppearing] Criando notificação de teste...");const s=await o(i);console.log("✅ [DebugModalNotAppearing] Notificação criada com ID:",s),setTimeout(()=>{const l=(window.appState?.notifications||[]).find(d=>d.id===s);l?console.log("✅ [DebugModalNotAppearing] Notificação encontrada no estado local:",l):console.warn("⚠️ [DebugModalNotAppearing] Notificação não encontrada no estado local")},3e3)}catch(o){console.error("❌ [DebugModalNotAppearing] Erro ao criar notificação de teste:",o)}console.log("✅ [DebugModalNotAppearing] Investigação finalizada!")}catch(n){console.error("❌ [DebugModalNotAppearing] Erro durante investigação:",n),console.error("❌ [DebugModalNotAppearing] Stack trace:",n.stack)}}async function _0(){console.log("📁 [DebugCategory] Criando notificação de categoria de teste...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugCategory] Usuário ou orçamento não encontrado");return}const{create:t}=await N(async()=>{const{create:s}=await Promise.resolve().then(()=>le);return{create:s}},void 0),{serverTimestamp:o}=await N(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"category_added",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",categoryId:"test-category-id",categoryNome:"Categoria de Teste",categoryTipo:"despesa",categoryLimite:500,categoryDescription:"Esta é uma categoria de teste com descrição",categoryColor:"#3b82f6",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugCategory] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugCategory] Notificação de categoria criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(l=>l.id===i);c?(console.log("✅ [DebugCategory] Notificação encontrada no estado local:",c),console.log("📝 [DebugCategory] Descrição da categoria:",c.categoryDescription)):console.warn("⚠️ [DebugCategory] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugCategory] Erro ao criar notificação de categoria:",n)}}async function v0(){console.log("🔄 [DebugIntegration] Testando integração completa de recorrentes...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugIntegration] Usuário ou orçamento não encontrado");return}const{addRecorrente:t,updateRecorrente:o,deleteRecorrente:r}=await N(async()=>{const{addRecorrente:l,updateRecorrente:d,deleteRecorrente:g}=await Promise.resolve().then(()=>Sm);return{addRecorrente:l,updateRecorrente:d,deleteRecorrente:g}},void 0);console.log("📝 [DebugIntegration] Criando despesa recorrente de teste...");const i={nome:"Teste de Integração",valor:200,frequencia:"Mensal",categoria:"Teste",descricao:"Despesa recorrente para testar integração de notificações",parcelasTotal:12,parcelasRestantes:12,efetivarMesAtual:!1},s=await t(n.uid,e.id,i);console.log("✅ [DebugIntegration] Despesa recorrente criada com ID:",s),await new Promise(l=>setTimeout(l,2e3)),console.log("📝 [DebugIntegration] Atualizando despesa recorrente...");const c={...i,valor:250,nome:"Teste de Integração Atualizado",budgetId:e.id};await o(n.uid,s,c),console.log("✅ [DebugIntegration] Despesa recorrente atualizada"),await new Promise(l=>setTimeout(l,2e3)),console.log("📝 [DebugIntegration] Excluindo despesa recorrente..."),await r(n.uid,s),console.log("✅ [DebugIntegration] Despesa recorrente excluída"),console.log("🎉 [DebugIntegration] Teste de integração completo! Verifique se as notificações apareceram no modal.")}catch(n){console.error("❌ [DebugIntegration] Erro durante teste de integração:",n)}}window.debugNotificationSystem=s0;window.debugSharedNotificationTest=a0;window.debugCheckOtherUserNotifications=c0;window.debugTestModal=l0;window.debugNotificationState=u0;window.debugCreateTestNotification=d0;window.debugCreateRecorrenteNotification=h0;window.debugModalStatus=f0;window.debugTestRecorrenteIntegration=v0;window.debugTestModalDirect=g0;window.debugTestEventBus=m0;window.debugCreateCategoryNotification=_0;window.debugCheckNotificationSystem=p0;window.debugTestTransactionNotification=km;window.debugTestRecurringEditDelete=Nm;window.debugFullNotificationDiagnosis=Pm;window.debugTestEventBusSystem=xm;window.debugTestRecurringNotificationComplete=Mm;window.debugTestModalDirectly=Bm;window.debugCompleteSystemDiagnosis=Om;window.debugTestRecurringAndCategoryNotifications=Um;window.debugDetailedNotificationTest=Vm;window.debugCategoryDescriptionIssue=Lm;window.debugModalNotAppearing=Fm;console.log("🔧 [DebugNotifications] Funções de debug carregadas:");console.log("  - debugNotificationSystem() - Debug completo do sistema");console.log("  - debugSharedNotificationTest() - Teste de envio para compartilhados");console.log("  - debugCheckOtherUserNotifications() - Verificar notificações de outros usuários");console.log("  - debugTestModal() - Testar modal manualmente");console.log("  - debugNotificationState() - Verificar estado atual");console.log("  - debugCreateTestNotification() - Criar notificação de teste manualmente");console.log("  - debugCreateRecorrenteNotification() - Criar notificação de recorrente de teste");console.log("  - debugModalStatus() - Verificar status do modal");console.log("  - debugTestRecorrenteIntegration() - Testar integração completa de recorrentes");console.log("  - debugTestModalDirect() - Testar modal diretamente");console.log("  - debugTestEventBus() - Testar EventBus diretamente");console.log("  - debugCreateCategoryNotification() - Criar notificação de categoria de teste");console.log("  - debugCheckNotificationSystem() - Verificar se o sistema está funcionando");console.log("  - debugTestTransactionNotification() - Testar notificação de transação");console.log("  - debugTestRecurringEditDelete() - Testar notificações de edição e exclusão de recorrentes");console.log("  - debugFullNotificationDiagnosis() - Diagnóstico completo do sistema de notificações");console.log("  - debugTestEventBusSystem() - Testar sistema de EventBus e eventos");console.log("  - debugTestRecurringNotificationComplete() - Testar notificação de recorrente completa");console.log("  - debugTestModalDirectly() - Testar modal diretamente");console.log("  - debugCompleteSystemDiagnosis() - Diagnóstico completo do sistema de notificações e modal");console.log("  - debugTestRecurringAndCategoryNotifications() - Testar notificações de recorrentes e categorias");console.log("  - debugDetailedNotificationTest() - Teste detalhado de cada etapa das notificações");console.log("  - debugCategoryDescriptionIssue() - Debug específico da descrição da categoria no modal");console.log("  - debugModalNotAppearing() - Investigar por que o modal de notificação parou de aparecer");console.log("  - debugProductionModal() - Diagnóstico específico para produção");console.log("  - debugModalWhenNotificationsArrive() - Testar modal quando notificações chegam mas não aparecem");console.log("  - debugCatchUpSystem() - Testar sistema de catch-up de notificações");async function E0(){console.log("🔍 [Debug] Testando modal quando notificações chegam mas não aparecem...");try{if(console.log("1️⃣ Verificando EventBus..."),typeof window.eventBus>"u"){console.error("❌ EventBus não está disponível globalmente");return}console.log("✅ EventBus disponível:",typeof window.eventBus),console.log("2️⃣ Verificando listener notification:show-modal...");const n=window.__notificationModalListenerBound;console.log("Listener configurado:",n),console.log("3️⃣ Testando criação do modal...");const{getNotificationModal:e}=await N(async()=>{const{getNotificationModal:s}=await import("./NotificationModal-CXlK3t7N.js");return{getNotificationModal:s}},[]),t=e();console.log("Modal obtido:",!!t),console.log("4️⃣ Verificando modal no DOM...");const o=document.getElementById("notification-modal");console.log("Modal no DOM:",!!o),console.log("5️⃣ Verificando CSS...");const r=document.querySelector('link[href*="notification-modal.css"]');console.log("CSS carregado:",!!r),console.log("6️⃣ Testando evento diretamente...");const i={id:"test-"+Date.now(),type:"test_notification",message:"Teste de modal quando notificações chegam",createdAt:new Date,read:!1};console.log("Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",i),setTimeout(()=>{console.log("7️⃣ Verificando se modal apareceu...");const s=document.getElementById("notification-modal");if(s){const c=window.getComputedStyle(s);console.log("Modal após evento:",{display:c.display,opacity:c.opacity,visibility:c.visibility,zIndex:c.zIndex})}else console.error("❌ Modal não foi criado após evento")},1e3)}catch(n){console.error("❌ Erro no debug:",n)}}async function b0(){console.log("🔍 [Debug] Testando sistema de catch-up de notificações...");try{console.log("1️⃣ Verificando sistema de catch-up...");const{getCatchUpNotifications:n}=await N(async()=>{const{getCatchUpNotifications:c}=await Promise.resolve().then(()=>B0);return{getCatchUpNotifications:c}},void 0),e=n();console.log("Sistema de catch-up obtido:",!!e),console.log("2️⃣ Verificando usuário atual...");const t=e.getCurrentUserId();if(console.log("ID do usuário:",t),!t){console.error("❌ Usuário não autenticado");return}console.log("3️⃣ Verificando notificações não lidas...");const{getNotificationsRepo:o}=await N(async()=>{const{getNotificationsRepo:c}=await Promise.resolve().then(()=>le);return{getNotificationsRepo:c}},void 0),i=await o().getUnreadNotifications(t);console.log("Notificações não lidas encontradas:",i.length),console.log("Detalhes:",i.map(c=>({id:c.id,type:c.type,message:c.message}))),console.log("4️⃣ Testando verificação de notificações pendentes..."),await e.checkPendingNotifications(),console.log("5️⃣ Verificando se modal de catch-up foi criado...");const s=document.querySelector(".catch-up-modal-overlay");if(console.log("Modal de catch-up no DOM:",!!s),s){const c=window.getComputedStyle(s);console.log("Modal de catch-up estilos:",{display:c.display,opacity:c.opacity,visibility:c.visibility,zIndex:c.zIndex})}console.log("✅ Teste do sistema de catch-up concluído")}catch(n){console.error("❌ Erro no teste do sistema de catch-up:",n)}}function T0(){console.log("🔧 [DebugNotifications] Testando EventBus de notificações...");try{if(typeof window<"u"&&window.eventBus){console.log("✅ [DebugNotifications] EventBus disponível:",window.eventBus);const n={id:"test-eventbus-"+Date.now(),type:"transaction",title:"Teste EventBus",message:"Esta é uma notificação de teste via EventBus.",timestamp:new Date,read:!1,data:{transactionId:"test-eventbus-transaction"}};console.log("🔧 [DebugNotifications] Emitindo evento notification:show-modal:",n),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugNotifications] Evento emitido com sucesso")}else console.error("❌ [DebugNotifications] EventBus não disponível")}catch(n){console.error("❌ [DebugNotifications] Erro ao testar EventBus:",n)}}function I0(){console.log("🔧 [DebugNotifications] Simulando notificação real de transação...");try{if(typeof window<"u"&&window.eventBus){console.log("✅ [DebugNotifications] EventBus disponível:",window.eventBus);const n={id:"real-transaction-"+Date.now(),type:"new_transaction",budgetId:window.appState?.currentBudget?.id||"test-budget",budgetName:window.appState?.currentBudget?.nome||"Teste",recipientUid:window.appState?.currentUser?.uid||"test-user",senderUid:window.appState?.currentUser?.uid||"test-user",title:"Nova Transação",message:"Uma nova transação foi adicionada ao orçamento.",createdAt:new Date,read:!1,data:{transactionId:"real-transaction-"+Date.now(),amount:100,description:"Teste de transação real"}};console.log("🔧 [DebugNotifications] Simulando notificação real:",n),console.log("🔧 [DebugNotifications] Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugNotifications] Evento de notificação real emitido com sucesso")}else console.error("❌ [DebugNotifications] EventBus não disponível")}catch(n){console.error("❌ [DebugNotifications] Erro ao simular notificação real:",n)}}function S0(){console.log("🔍 [DebugNotifications] Verificando status do sistema de notificações...");try{console.log("1️⃣ EventBus:",{exists:!!window.eventBus,hasOn:!!(window.eventBus&&window.eventBus.on),hasEmit:!!(window.eventBus&&window.eventBus.emit)}),console.log("2️⃣ AppState:",{exists:!!window.appState,hasCurrentUser:!!(window.appState&&window.appState.currentUser),hasCurrentBudget:!!(window.appState&&window.appState.currentBudget),hasNotifications:!!(window.appState&&window.appState.notifications),notificationsCount:window.appState?.notifications?.length||0});const n=window.__notifCtl;console.log("3️⃣ NotificationsController:",{exists:!!n,hasUnsub:!!(n&&n.unsub),uid:n?.uid,lastSeenAt:n?.lastSeenAt,lastIdsCount:n?.lastIds?.size||0}),console.log("4️⃣ LocalStorage:",{notification_use_modal:localStorage.getItem("notification_use_modal"),notification_toasts_enabled:localStorage.getItem("notification_toasts_enabled")}),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistration().then(e=>{console.log("5️⃣ Service Worker:",{exists:!!e,scope:e?.scope,state:e?.active?.state})}),console.log("✅ [DebugNotifications] Verificação de status concluída")}catch(n){console.error("❌ [DebugNotifications] Erro na verificação de status:",n)}}typeof window<"u"&&(window.debugEventBusAndModal=w0,window.debugProductionModal=y0,window.debugTestModalDirectly=Bm,window.debugFullNotificationDiagnosis=Pm,window.debugCompleteSystemDiagnosis=Om,window.debugDetailedNotificationTest=Vm,window.debugTestRecurringAndCategoryNotifications=Um,window.debugTestEventBusSystem=xm,window.debugTestRecurringNotificationComplete=Mm,window.debugTestTransactionNotification=km,window.debugTestRecurringEditDelete=Nm,window.debugCategoryDescriptionIssue=Lm,window.debugModalNotAppearing=Fm,window.debugModalWhenNotificationsArrive=E0,window.debugCatchUpSystem=b0,window.debugTestEventBusNotifications=T0,window.debugTestRealTransactionNotification=I0,window.debugCheckNotificationSystemStatus=S0,console.log("🔧 [DebugNotifications] Funções de debug expostas globalmente"));const ct="notifications";function al(n){return{id:n.id,...n.data()}}function cl(n){const e=t=>t?.toDate?t.toDate():t?.seconds?new Date(t.seconds*1e3):t?new Date(t):new Date(0);return n.sort((t,o)=>e(o.createdAt)-e(t.createdAt))}async function $m(n,e=50){if(!n)return[];const t=ke(pe(db,ct),De("recipientUid","==",n));let r=(await wt(t)).docs.map(al);return r=cl(r).slice(0,e),r}async function Gm(n,e,t=50){if(!n||typeof e!="function")return console.log("[NotificationsRepo] ❌ listenByRecipient - Parâmetros inválidos:",{recipientUid:n,onData:typeof e}),()=>{};console.log("[NotificationsRepo] 👂 listenByRecipient - Iniciando listener para:",n);const{db:o}=await N(async()=>{const{db:i}=await Promise.resolve().then(()=>kn);return{db:i}},void 0),r=ke(pe(o,ct),De("recipientUid","==",n));return Ir(r,i=>{let s=[];i.forEach(c=>s.push(al(c))),s=cl(s).slice(0,t),console.log("[NotificationsRepo] 👂 listenByRecipient - Itens recebidos:",s.length),console.log("[NotificationsRepo] 👂 listenByRecipient - Detalhes:",s.map(c=>({id:c.id,type:c.type,read:c.read}))),e(s)})}async function zm(n){console.log("[NotificationsRepo] 📝 Criando notificação:",{type:n.type,recipientUid:n.recipientUid,senderUid:n.senderUid,budgetId:n.budgetId});const{db:e}=await N(async()=>{const{db:o}=await Promise.resolve().then(()=>kn);return{db:o}},void 0),t=await tn(pe(e,ct),n);return console.log("[NotificationsRepo] ✅ Notificação criada com ID:",t.id),t.id}async function jm(n){if(!n)return;const{db:e}=await N(async()=>{const{db:t}=await Promise.resolve().then(()=>kn);return{db:t}},void 0);await en(fe(e,ct,n),{read:!0})}async function qm(n=[]){if(!Array.isArray(n)||n.length===0)return;const{db:e}=await N(async()=>{const{db:o}=await Promise.resolve().then(()=>kn);return{db:o}},void 0),t=Sr(e);n.forEach(o=>{t.update(fe(e,ct,o),{read:!0})}),await t.commit()}async function ll(n=[]){if(!Array.isArray(n)||n.length===0)return;const{db:e}=await N(async()=>{const{db:o}=await Promise.resolve().then(()=>kn);return{db:o}},void 0),t=Sr(e);n.forEach(o=>{t.delete(fe(e,ct,o))}),await t.commit()}async function Hm(n){n&&await ll([n])}async function Wm(n,e=!0){n&&await en(fe(db,ct,n),{pinned:!!e})}async function Km(n=[],e=!0){if(!Array.isArray(n)||n.length===0)return;const t=Sr(db);n.forEach(o=>{t.update(fe(db,ct,o),{pinned:!!e})}),await t.commit()}async function Qm(n,e=!0){if(!n)return;const t=e?{archivedAt:new Date().toISOString()}:{archivedAt:null};await en(fe(db,ct,n),t)}async function Ym(n=[]){if(!Array.isArray(n)||n.length===0)return;const e=Sr(db),t=new Date().toISOString();n.forEach(o=>{e.update(fe(db,ct,o),{archivedAt:t})}),await e.commit()}async function Jm(n,e=50){if(!n)return[];const{db:t}=await N(async()=>{const{db:s}=await Promise.resolve().then(()=>kn);return{db:s}},void 0),o=ke(pe(t,ct),De("recipientUid","==",n),De("read","==",!1));let i=(await wt(o)).docs.map(al);return i=cl(i).slice(0,e),i}class A0{async listByRecipient(e,t=50){return $m(e,t)}async listenByRecipient(e,t,o=50){return Gm(e,t,o)}async create(e){return zm(e)}async markAsRead(e){return jm(e)}async markManyAsRead(e){return qm(e)}async deleteMany(e){return ll(e)}async deleteOne(e){return Hm(e)}async pin(e,t=!0){return Wm(e,t)}async pinMany(e,t=!0){return Km(e,t)}async archive(e,t=!0){return Qm(e,t)}async archiveMany(e){return Ym(e)}async getUnreadNotifications(e,t=50){return Jm(e,t)}}let la=null;function za(){return la||(la=new A0),la}const le=Object.freeze(Object.defineProperty({__proto__:null,archive:Qm,archiveMany:Ym,create:zm,deleteMany:ll,deleteOne:Hm,getNotificationsRepo:za,getUnreadNotifications:Jm,listByRecipient:$m,listenByRecipient:Gm,markAsRead:jm,markManyAsRead:qm,pin:Wm,pinMany:Km},Symbol.toStringTag,{value:"Module"}));function ua(n){try{if(!n)return 0;if(typeof n.toDate=="function")return n.toDate().getTime();if(n.seconds)return n.seconds*1e3;const e=new Date(n);return Number.isFinite(e.getTime())?e.getTime():0}catch{return 0}}function Xm(){try{const n=localStorage.getItem("notif_toasts_enabled");return n===null?!0:n==="true"}catch{return!0}}async function D0(n){try{const{getByUser:e}=await N(async()=>{const{getByUser:o}=await import("./userSettingsRepo-BCP5BRd4.js");return{getByUser:o}},[]);return(await e(n))?.notificationPrefs||{}}catch{return{}}}function Zm(n,e){try{if(!Xm())return!1;const o=e?.type,r=e?.budgetId;if(!o||!r)return!0;const i=n?.byBudget?.[r];return i?(i.allow||{})[o]!==!1:!0}catch{return!0}}function sh(n){try{const e=n?.type||"",t=n?.budgetName?` (${n.budgetName})`:"";return e==="new_transaction"?`Nova transação${t}: ${n.transactionDescricao||""}`:e==="updated_transaction"?`Transação atualizada${t}: ${n.transactionDescricao||""}`:e==="deleted_transaction"?`Transação excluída${t}: ${n.transactionDescricao||""}`:e==="category_added"?`Categoria criada${t}: ${n.categoryNome||""}`:e==="category_updated"?`Categoria atualizada${t}: ${n.categoryNome||""}`:e==="category_deleted"?`Categoria excluída${t}: ${n.categoryNome||""}`:e==="test_notification"?`Teste de notificação${t}: ${n.message||""}`:`Nova atividade${t}`}catch{return"Nova atividade"}}function ah(){const n=window;return n.__notifCtl||(n.__notifCtl={unsub:null,uid:null,lastSeenAt:0,lastIds:new Set}),n.__notifCtl}async function ul(n){console.log("[NotificationsController] 🚀 startNotificationsFor chamado para userId:",n),console.log("[NotificationsController] 🔧 DEBUG: Estado atual:",ah());const e=ah();if(!n)return console.log("[NotificationsController] ❌ userId inválido, retornando"),()=>{};if(e.unsub&&e.uid===n)return console.log("[NotificationsController] ✅ Listener já ativo para este usuário"),e.unsub;if(e.unsub){console.log("[NotificationsController] 🔄 Parando listener anterior");try{e.unsub()}catch{}}console.log("[NotificationsController] 📡 Importando listenByRecipient...");const{listenByRecipient:t}=await N(async()=>{const{listenByRecipient:r}=await Promise.resolve().then(()=>le);return{listenByRecipient:r}},void 0);e.uid=n,e.lastIds=new Set(Array.isArray(window.appState?.notifications)?window.appState.notifications.map(r=>r.id):[]),e.lastSeenAt=Math.max(0,...Array.isArray(window.appState?.notifications)?window.appState.notifications.map(r=>ua(r.createdAt)):[0]),console.log("[NotificationsController] ⚙️ Obtendo preferências do usuário...");const o=await D0(n);return console.log("[NotificationsController] 👂 Iniciando listener listenByRecipient..."),e.unsub=t(n,r=>{console.log("[NotificationsController] 📡 Dados recebidos do listener:",r.length,"itens"),console.log("[NotificationsController] 📡 Detalhes das notificações:",r.map(s=>({id:s.id,type:s.type,read:s.read,recipientUid:s.recipientUid}))),console.log("[NotificationsController] 🔧 DEBUG: Items completos:",r),window.appState=window.appState||{},window.appState.notifications=r;const i=r.filter(s=>!s.read&&!s.archivedAt).length;console.log(`[NotificationsController] 📊 ${r.length} notificações carregadas, ${i} não lidas`);try{D.emit("notifications:updated",r)}catch{}if(Xm())try{for(const s of r){const c=ua(s.createdAt);if(!e.lastIds.has(s.id)&&c>=e.lastSeenAt){if(!Zm(o,s))continue;if(localStorage.getItem("notification_use_modal")!=="false")try{console.log("[NotificationsController] 🔧 DEBUG: Emitindo evento notification:show-modal para:",s.type,s),console.log("[NotificationsController] 🔧 DEBUG: EventBus disponível:",!!D),console.log("[NotificationsController] 🔧 DEBUG: EventBus.emit disponível:",typeof D.emit),D.emit("notification:show-modal",s),console.log("[NotificationsController] 📱 Modal de notificação disparado para:",s.type)}catch(d){console.warn("[NotificationsController] ⚠️ Erro ao emitir evento de modal:",d),console.error("[NotificationsController] ❌ Stack trace:",d.stack);const g=sh(s);D.emit("snackbar:show",{message:g,type:"info",duration:3500,action:{label:"Ver",onClick:()=>{try{window.location.hash="#/notifications"}catch{}}}})}else{const d=sh(s);try{D.emit("snackbar:show",{message:d,type:"info",duration:3500,action:{label:"Ver",onClick:()=>{try{window.location.hash="#/notifications"}catch{}}}})}catch{try{window.Snackbar?.({message:d,type:"info",duration:3500})}catch{}}}}}}catch{}e.lastIds=new Set(r.map(s=>s.id)),e.lastSeenAt=Math.max(0,...r.map(s=>ua(s.createdAt)))},100),console.log("[NotificationsController] ✅ Listener de notificações configurado com sucesso"),e.unsub}async function C0(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>!o.read).map(o=>o.id);if(!e.length)return;const{markManyAsRead:t}=await N(async()=>{const{markManyAsRead:o}=await Promise.resolve().then(()=>le);return{markManyAsRead:o}},void 0);await t(e)}async function R0(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>o.read).map(o=>o.id);if(!e.length)return;const{deleteMany:t}=await N(async()=>{const{deleteMany:o}=await Promise.resolve().then(()=>le);return{deleteMany:o}},void 0);await t(e)}async function k0(n){if(!n)return;const{markAsRead:e}=await N(async()=>{const{markAsRead:t}=await Promise.resolve().then(()=>le);return{markAsRead:t}},void 0);await e(n)}async function N0(n,e=!0){if(!n)return;const{pin:t}=await N(async()=>{const{pin:o}=await Promise.resolve().then(()=>le);return{pin:o}},void 0);await t(n,e);try{D.emit("snackbar:show",{message:e?"Notificação fixada":"Notificação desfixada",type:"success",duration:1800})}catch{}}async function P0(n,e=!0){if(!n)return;const{archive:t}=await N(async()=>{const{archive:o}=await Promise.resolve().then(()=>le);return{archive:o}},void 0);await t(n,e);try{D.emit("snackbar:show",{message:e?"Notificação arquivada":"Notificação restaurada",type:"info",duration:1800})}catch{}}async function x0(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>o.read&&!o.archivedAt).map(o=>o.id);if(!e.length)return;const{archiveMany:t}=await N(async()=>{const{archiveMany:o}=await Promise.resolve().then(()=>le);return{archiveMany:o}},void 0);await t(e);try{D.emit("snackbar:show",{message:"Notificações lidas arquivadas",type:"info",duration:2e3})}catch{}}const dl=Object.freeze(Object.defineProperty({__proto__:null,__isToastAllowedForTest:Zm,archiveAllRead:x0,archiveOne:P0,deleteAllRead:R0,markAllAsRead:C0,markOneAsRead:k0,pinOne:N0,startNotificationsFor:ul},Symbol.toStringTag,{value:"Module"}));class M0{constructor(){this.isChecking=!1,this.lastCheckTime=null,this.pendingNotifications=[],this.catchUpModal=null}async init(){console.log("[CatchUpNotifications] 🚀 Inicializando sistema de catch-up..."),console.log("[CatchUpNotifications] ⚠️ Sistema de catch-up temporariamente desabilitado")}isNotificationModalActive(){const e=document.getElementById("notification-modal");if(!e)return console.log("[CatchUpNotifications] 🔍 Modal de notificação não existe"),!1;const t=window.getComputedStyle(e),o=e.classList.contains("notification-modal-show"),r=t.display!=="none"&&t.opacity!=="0"&&t.visibility!=="hidden"&&t.zIndex!=="auto"&&o;return console.log("[CatchUpNotifications] 🔍 Verificando modal de notificação:",{exists:!!e,display:t.display,opacity:t.opacity,visibility:t.visibility,zIndex:t.zIndex,hasShowClass:o,isVisible:r,classList:Array.from(e.classList),innerHTML:e.innerHTML.substring(0,100)+"..."}),r}async checkPendingNotifications(){if(this.isChecking){console.log("[CatchUpNotifications] ⏳ Verificação já em andamento, pulando...");return}if(this.isNotificationModalActive()){console.log("[CatchUpNotifications] ⏳ Modal de notificação já ativo, pulando catch-up...");return}if(await new Promise(e=>setTimeout(e,2e3)),this.isNotificationModalActive()){console.log("[CatchUpNotifications] ⏳ Modal de notificação ativo após delay, pulando catch-up...");return}this.isChecking=!0,console.log("[CatchUpNotifications] 🔍 Verificando notificações pendentes...");try{const e=this.getCurrentUserId();if(!e){console.log("[CatchUpNotifications] ❌ Usuário não autenticado");return}const o=await za().getUnreadNotifications(e);console.log("[CatchUpNotifications] 📊 Notificações não lidas encontradas:",o.length),o.length>0?(this.pendingNotifications=o,console.log("[CatchUpNotifications] 📋 Notificações pendentes:",o.map(r=>({id:r.id,type:r.type,message:r.message}))),await this.showCatchUpModal()):(this.pendingNotifications=[],console.log("[CatchUpNotifications] ✅ Nenhuma notificação pendente - array limpo"))}catch(e){console.error("[CatchUpNotifications] ❌ Erro ao verificar notificações:",e)}finally{this.isChecking=!1,this.lastCheckTime=new Date}}async showCatchUpModal(){if(!this.pendingNotifications||this.pendingNotifications.length===0){console.log("[CatchUpNotifications] ❌ Nenhuma notificação pendente, não mostrando modal");return}this.catchUpModal&&(console.log("[CatchUpNotifications] 🔄 Modal de catch-up já existe, removendo..."),this.catchUpModal.remove()),console.log("[CatchUpNotifications] 📱 Mostrando modal de catch-up com",this.pendingNotifications.length,"notificações...");const e=this.createCatchUpModal();document.body.appendChild(e),this.catchUpModal=e,setTimeout(()=>{e.classList.add("catch-up-modal-show")},100),setTimeout(()=>{this.closeCatchUpModal()},3e4)}createCatchUpModal(){const e=document.body.classList.contains("dark")||document.documentElement.classList.contains("dark")||window.matchMedia("(prefers-color-scheme: dark)").matches,t=e?"#1f2937":"white",o=e?"#f9fafb":"#111827",r=e?"#374151":"#e5e7eb",i=e?"#3b82f6":"#2563eb",s=document.createElement("div");return s.className="catch-up-modal-overlay",s.innerHTML=`
      <div class="catch-up-modal-container" style="
        background: ${t};
        color: ${o};
        border: 1px solid ${r};
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        transform: scale(0.9) translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
      ">
        <div class="catch-up-modal-header" style="
          padding: 20px 24px 16px;
          border-bottom: 1px solid ${r};
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 40px;
              height: 40px;
              background: ${i};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 18px;
              font-weight: bold;
            ">
              ${this.pendingNotifications.length}
            </div>
            <div>
              <h3 style="
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                color: ${o};
              ">
                Notificações Pendentes
              </h3>
              <p style="
                margin: 4px 0 0;
                font-size: 14px;
                color: ${e?"#9ca3af":"#6b7280"};
              ">
                Você tem ${this.pendingNotifications.length} notificação${this.pendingNotifications.length>1?"ões":""} não lida${this.pendingNotifications.length>1?"s":""}
              </p>
            </div>
          </div>
          <button id="catch-up-modal-close" style="
            background: none;
            border: none;
            color: ${e?"#9ca3af":"#6b7280"};
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
          " title="Fechar">
            ×
          </button>
        </div>

        <div class="catch-up-modal-content" style="
          padding: 16px 24px;
          max-height: 400px;
          overflow-y: auto;
        ">
          ${this.pendingNotifications.map(c=>`
            <div class="catch-up-notification-item" style="
              padding: 16px;
              background: ${e?"#374151":"#f9fafb"};
              border-radius: 12px;
              margin-bottom: 12px;
              border: 1px solid ${e?"#4b5563":"#e5e7eb"};
              transition: all 0.2s ease;
            ">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="
                  width: 32px;
                  height: 32px;
                  background: ${this.getNotificationColor(c.type)};
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: 14px;
                  font-weight: bold;
                  flex-shrink: 0;
                ">
                  ${this.getNotificationIcon(c.type)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <h4 style="
                    margin: 0 0 4px;
                    font-size: 14px;
                    font-weight: 600;
                    color: ${o};
                  ">
                    ${this.getNotificationTitle(c.type)}
                  </h4>
                  <p style="
                    margin: 0 0 8px;
                    font-size: 13px;
                    color: ${e?"#d1d5db":"#374151"};
                    line-height: 1.4;
                  ">
                    ${c.message||this.getDefaultMessage(c.type)}
                  </p>
                  <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 12px;
                    color: ${e?"#9ca3af":"#6b7280"};
                  ">
                    <span>${this.formatDate(c.createdAt)}</span>
                    <span>${c.budgetName||"Orçamento"}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="catch-up-modal-footer" style="
          padding: 16px 24px 20px;
          border-top: 1px solid ${r};
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        ">
          <button id="catch-up-modal-mark-all-read" style="
            background: ${i};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            Marcar Todas como Lidas
          </button>
          <button id="catch-up-modal-view-all" style="
            background: ${e?"#374151":"#f3f4f6"};
            color: ${o};
            border: 1px solid ${r};
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            Ver Todas
          </button>
        </div>
      </div>
    `,this.addCatchUpModalStyles(),this.bindCatchUpModalEvents(s),s}addCatchUpModalStyles(){if(document.getElementById("catch-up-modal-styles"))return;const e=document.createElement("style");e.id="catch-up-modal-styles",e.textContent=`
      .catch-up-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .catch-up-modal-overlay.catch-up-modal-show {
        opacity: 1;
        visibility: visible;
      }

      .catch-up-modal-overlay.catch-up-modal-show .catch-up-modal-container {
        transform: scale(1) translateY(0);
        opacity: 1;
      }

      .catch-up-notification-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      #catch-up-modal-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #ef4444;
      }

      #catch-up-modal-mark-all-read:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
      }

      #catch-up-modal-view-all:hover {
        background: #e5e7eb;
        transform: translateY(-1px);
      }

      .catch-up-modal-content::-webkit-scrollbar {
        width: 6px;
      }

      .catch-up-modal-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .catch-up-modal-content::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }

      .catch-up-modal-content::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    `,document.head.appendChild(e)}bindCatchUpModalEvents(e){const t=e.querySelector("#catch-up-modal-close"),o=e.querySelector("#catch-up-modal-mark-all-read"),r=e.querySelector("#catch-up-modal-view-all"),i=e;t&&t.addEventListener("click",()=>this.closeCatchUpModal()),i&&i.addEventListener("click",s=>{s.target===i&&this.closeCatchUpModal()}),o&&o.addEventListener("click",()=>this.markAllAsRead()),r&&r.addEventListener("click",()=>this.viewAllNotifications()),document.addEventListener("keydown",s=>{s.key==="Escape"&&this.catchUpModal&&this.closeCatchUpModal()})}closeCatchUpModal(){this.catchUpModal&&(console.log("[CatchUpNotifications] 🔒 Fechando modal de catch-up..."),this.catchUpModal.classList.remove("catch-up-modal-show"),setTimeout(()=>{this.catchUpModal&&(this.catchUpModal.remove(),this.catchUpModal=null)},300))}async markAllAsRead(){console.log("[CatchUpNotifications] ✅ Marcando todas as notificações como lidas...");try{const e=za(),t=this.getCurrentUserId();for(const o of this.pendingNotifications)await e.markAsRead(o.id);console.log("[CatchUpNotifications] ✅ Todas as notificações marcadas como lidas"),this.closeCatchUpModal(),window.Snackbar&&window.Snackbar.show("Todas as notificações foram marcadas como lidas","success")}catch(e){console.error("[CatchUpNotifications] ❌ Erro ao marcar notificações como lidas:",e)}}viewAllNotifications(){console.log("[CatchUpNotifications] 📬 Navegando para página de notificações..."),this.closeCatchUpModal(),window.location.hash="#/notifications"}setupRouteListener(){window.addEventListener("hashchange",()=>{setTimeout(()=>{this.checkPendingNotifications()},5e3)})}getCurrentUserId(){return window.appState?.user?.uid?window.appState.user.uid:window.currentUser?.uid?window.currentUser.uid:window.firebase?.auth?.currentUser?.uid?window.firebase.auth.currentUser.uid:null}getNotificationColor(e){return{transaction_created:"#10b981",transaction_updated:"#f59e0b",transaction_deleted:"#ef4444",category_created:"#8b5cf6",category_updated:"#f59e0b",category_deleted:"#ef4444",recurring_created:"#06b6d4",recurring_updated:"#f59e0b",recurring_deleted:"#ef4444",budget_shared:"#3b82f6",budget_unshared:"#6b7280",test_notification:"#8b5cf6"}[e]||"#6b7280"}getNotificationIcon(e){return{transaction_created:"💰",transaction_updated:"✏️",transaction_deleted:"🗑️",category_created:"📁",category_updated:"✏️",category_deleted:"🗑️",recurring_created:"🔄",recurring_updated:"✏️",recurring_deleted:"🗑️",budget_shared:"👥",budget_unshared:"👤",test_notification:"🧪"}[e]||"📢"}getNotificationTitle(e){return{transaction_created:"Nova Transação",transaction_updated:"Transação Atualizada",transaction_deleted:"Transação Excluída",category_created:"Nova Categoria",category_updated:"Categoria Atualizada",category_deleted:"Categoria Excluída",recurring_created:"Nova Recorrente",recurring_updated:"Recorrente Atualizada",recurring_deleted:"Recorrente Excluída",budget_shared:"Orçamento Compartilhado",budget_unshared:"Orçamento Descompartilhado",test_notification:"Notificação de Teste"}[e]||"Notificação"}getDefaultMessage(e){return{transaction_created:"Uma nova transação foi criada",transaction_updated:"Uma transação foi atualizada",transaction_deleted:"Uma transação foi excluída",category_created:"Uma nova categoria foi criada",category_updated:"Uma categoria foi atualizada",category_deleted:"Uma categoria foi excluída",recurring_created:"Uma nova transação recorrente foi criada",recurring_updated:"Uma transação recorrente foi atualizada",recurring_deleted:"Uma transação recorrente foi excluída",budget_shared:"Um orçamento foi compartilhado com você",budget_unshared:"Um orçamento foi descompartilhado",test_notification:"Esta é uma notificação de teste"}[e]||"Nova notificação disponível"}formatDate(e){if(!e)return"Agora";const t=new Date,o=new Date(e),r=Math.floor((t-o)/(1e3*60));return r<1?"Agora":r<60?`${r}min atrás`:r<1440?`${Math.floor(r/60)}h atrás`:`${Math.floor(r/1440)}d atrás`}}let da=null;function hl(){return da||(da=new M0),da}async function ys(){const n=hl();return await n.init(),n}typeof window<"u"&&(window.getCatchUpNotifications=hl,window.initCatchUpNotifications=ys);const B0=Object.freeze(Object.defineProperty({__proto__:null,getCatchUpNotifications:hl,initCatchUpNotifications:ys},Symbol.toStringTag,{value:"Module"})),ja="app_cache_version",ni="v4.43.0";async function ep(){try{const n=localStorage.getItem(ja);n!==ni?(console.log(`🔄 [CacheManager] Nova versão detectada: ${ni} (anterior: ${n})`),await tp(),np(),localStorage.setItem(ja,ni),console.log("✅ [CacheManager] Cache limpo e versão atualizada"),n&&(console.log("🔄 [CacheManager] Recarregando página para aplicar nova versão..."),setTimeout(()=>{window.location.reload()},1e3))):console.log(`✅ [CacheManager] Versão atual já está em uso: ${ni}`)}catch(n){console.error("❌ [CacheManager] Erro ao verificar/limpar cache:",n)}}async function tp(){try{if("caches"in window){const n=await caches.keys();console.log(`🧹 [CacheManager] Limpando ${n.length} caches:`,n),await Promise.all(n.map(e=>(console.log(`🗑️ [CacheManager] Removendo cache: ${e}`),caches.delete(e)))),console.log("✅ [CacheManager] Todos os caches foram limpos")}}catch(n){console.error("❌ [CacheManager] Erro ao limpar caches:",n)}}function np(){try{const n=[],e=["notification_use_modal","notification_toasts_enabled","sw_version","app_state","user_preferences"];for(let t=0;t<localStorage.length;t++){const o=localStorage.key(t);o&&e.some(r=>o.includes(r))&&n.push(o)}n.forEach(t=>{console.log(`🗑️ [CacheManager] Removendo chave do localStorage: ${t}`),localStorage.removeItem(t)}),console.log(`✅ [CacheManager] ${n.length} chaves antigas removidas do localStorage`)}catch(n){console.error("❌ [CacheManager] Erro ao limpar localStorage:",n)}}async function O0(){try{console.log("🧹 [CacheManager] Forçando limpeza completa do cache..."),await tp(),np(),localStorage.removeItem(ja),console.log("✅ [CacheManager] Limpeza forçada concluída"),window.location.reload()}catch(n){console.error("❌ [CacheManager] Erro na limpeza forçada:",n)}}async function U0(){try{if("serviceWorker"in navigator){const n=await navigator.serviceWorker.getRegistration();return n?(console.log("✅ [CacheManager] Service Worker ativo:",n.scope),n.waiting&&(console.log("🔄 [CacheManager] Nova versão do Service Worker aguardando ativação"),n.waiting.postMessage({type:"SKIP_WAITING"})),!0):(console.warn("⚠️ [CacheManager] Service Worker não encontrado"),!1)}else return console.warn("⚠️ [CacheManager] Service Worker não suportado neste navegador"),!1}catch(n){return console.error("❌ [CacheManager] Erro ao verificar Service Worker:",n),!1}}typeof window<"u"&&(window.clearCache=O0,window.checkCache=ep,window.checkSW=U0);const ch={debug:10,info:20,warn:30,error:40};let V0="info";function oi(n){return ch[n]>=ch[V0]}function ri(n,e,t){return[`[${new Date().toISOString()}] [${n.toUpperCase()}]`,e,...t]}const O={debug(n,...e){oi("debug")&&console.debug(...ri("debug",n,e))},info(n,...e){oi("info")&&console.info(...ri("info",n,e))},warn(n,...e){oi("warn")&&console.warn(...ri("warn",n,e))},error(n,...e){oi("error")&&console.error(...ri("error",n,e))}};function L0(n){try{const t={"/":"Dashboard","/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/analytics":"Análises","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[n]||"Dashboard";document.title=`Financeiro • ${t}`;const o=document.querySelector(".tab-title-highlight");if(o&&!o.textContent.includes(t)){const r=o.textContent.split(" ")[0];o.textContent=`${r} ${t}`}}catch{}}function op(){const n=localStorage.getItem("compactMode")==="true",e=localStorage.getItem("microMode")==="true",t=localStorage.getItem("nanoMode")==="true",o=document.querySelector(".app-container"),r=document.body;r.classList.remove("compact-mode","micro-mode","nano-mode"),o&&o.classList.remove("compact-mode","micro-mode","nano-mode"),t?(r.classList.add("compact-mode","micro-mode","nano-mode"),o&&o.classList.add("compact-mode","micro-mode","nano-mode")):e?(r.classList.add("compact-mode","micro-mode"),o&&o.classList.add("compact-mode","micro-mode")):n&&(r.classList.add("compact-mode"),o&&o.classList.add("compact-mode"))}function F0(n,e="info",t=3e3){D.emit("notification:show",{message:n,type:e,duration:t})}function $0(n,e={}){D.emit("modal:show",{content:n,options:e})}function G0(){D.emit("modal:hide")}function ge(n,e="info"){D.emit("snackbar:show",{message:n,type:e})}function z0(n){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n||0)}function j0(n){return n?new Date(n).toLocaleDateString("pt-BR"):""}function q0(n){return n?new Date(n).toLocaleString("pt-BR"):""}function H0(n){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)}function W0(n){return!isNaN(n)&&parseFloat(n)>0}function K0(n,e=null){try{const t=localStorage.getItem(n);return t?JSON.parse(t):e}catch{return e}}function Q0(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch(t){console.error("Erro ao salvar no localStorage:",t)}}function Y0(n,e){let t;return function(...r){const i=()=>{clearTimeout(t),n(...r)};clearTimeout(t),t=setTimeout(i,e)}}function J0(n,e){let t;return function(){const o=arguments,r=this;t||(n.apply(r,o),t=!0,setTimeout(()=>t=!1,e))}}function rp(n){window.location.hash!==`#${n}`&&(window.location.hash=n)}function X0(n=!0){try{const e=[];try{const t=document.getElementById("app-content");t&&e.push(t);const o=document.querySelector(".tab-content");o&&e.push(o);const r=document.querySelector(".content-spacing");r&&e.push(r)}catch{}for(const t of e)try{typeof t.scrollTo=="function"&&t.scrollTo({top:0,left:0,behavior:"auto"}),t.scrollTop=0,t.scrollLeft=0}catch{}if(n&&typeof document<"u"){try{document.documentElement.scrollTop=0}catch{}try{document.body.scrollTop=0}catch{}}if(n&&typeof window<"u"&&typeof window.scrollTo=="function")try{window.scrollTo({top:0,left:0,behavior:"auto"})}catch{}}catch{}}const ao={user:null,currentBudget:null,transactions:[],categories:[],recorrentes:[],selectedYear:new Date().getFullYear(),selectedMonth:new Date().getMonth()+1,setUser(n){this.user=n,D.emit("user:changed",n)},setCurrentBudget(n){this.currentBudget=n,D.emit("budget:changed",n)},setTransactions(n){this.transactions=n,D.emit("transactions:changed",n)},setCategories(n){this.categories=n,D.emit("categories:changed",n)},setRecorrentes(n){this.recorrentes=n,D.emit("recorrentes:changed",n)},setSelectedPeriod(n,e){this.selectedYear=n,this.selectedMonth=e,D.emit("period:changed",{year:n,month:e})}};function ip(){try{if(typeof window<"u"&&window.appState&&window.appState.selectedYear&&window.appState.selectedMonth)return{year:window.appState.selectedYear,month:window.appState.selectedMonth}}catch{}try{const n=typeof localStorage<"u"?localStorage.getItem("selectedYM"):null;if(n){const e=String(n).match(/^(\d{4})-(\d{2})$/);if(e){const t=parseInt(e[1],10),o=parseInt(e[2],10);if(t>1900&&o>=1&&o<=12)return{year:t,month:o}}}}catch{}return{year:ao.selectedYear,month:ao.selectedMonth}}function sp(n,e){try{if(typeof window<"u"){window.appState=window.appState||ao,window.appState.selectedYear=n,window.appState.selectedMonth=e;try{localStorage.setItem("selectedYM",`${n}-${String(e).padStart(2,"0")}`)}catch{}try{const t=window.location.hash||"",o=t.split("?")[0]||"#/dashboard",r=`${n}-${String(e).padStart(2,"0")}`,i=/[?&]ym=\d{4}-\d{2}/.test(t),s=i?(t.match(/ym=(\d{4}-\d{2})/)||[])[1]:null;if(!i||s!==r){const c=`${o}?ym=${r}`;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.includes("jsdom"))window.location.hash=c;else{const d=new URL(window.location.href);d.hash=c,window.history&&window.history.replaceState?window.history.replaceState(null,"",d.toString()):window.location.hash=c}}}catch{}}}catch{}ao.setSelectedPeriod(n,e)}function Z0(){try{const e=(typeof window<"u"&&window.location.hash||"").match(/ym=(\d{4})-(\d{2})/);if(e){const t=parseInt(e[1],10),o=parseInt(e[2],10);if(t>1900&&o>=1&&o<=12)return{year:t,month:o}}}catch{}return null}function eA(n,e){try{const t=window.location.hash||"",o=t.split("?")[0]||"#/dashboard",r=`${n}-${String(e).padStart(2,"0")}`,i=t.match(/ym=(\d{4}-\d{2})/);if(!i||i[1]!==r){const s=`${o}?ym=${r}`;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.includes("jsdom"))window.location.hash=s;else{const l=new URL(window.location.href);l.hash=s,window.history&&window.history.replaceState?window.history.replaceState(null,"",l.toString()):window.location.hash=s}}}catch{}}const qa={showAddTransactionModal:async n=>{try{const{showTransactionModal:e}=await N(async()=>{const{showTransactionModal:o}=await import("./TransactionModalShim-Cv1MlLf1.js");return{showTransactionModal:o}},[]);if(await e(n||{}))return;D.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}catch(e){console.warn("Falha ao abrir modal de transação via shim:",e),D.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}},showAddRecorrenteModal:n=>{D.emit("modal:show",{type:"recorrente",data:n,title:"Nova Recorrente"})},closeModal:()=>{try{const n=document.getElementById("app-modal")||document.querySelector("#app-modal, .modal");if(n&&n.parentNode&&n.parentNode.removeChild(n),window.toggleFABOnModal)try{window.toggleFABOnModal()}catch{}}catch{}try{D.emit("modal:hide")}catch{}}};typeof window<"u"&&(window.getSelectedPeriod=ip,window.setSelectedPeriod=sp,window.showAddTransactionModal=async n=>{try{const{showTransactionModal:e}=await N(async()=>{const{showTransactionModal:o}=await import("./TransactionModalShim-Cv1MlLf1.js");return{showTransactionModal:o}},[]);if(await e(n||{}))return;D.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}catch(e){console.warn("Falha ao abrir modal de transação:",e),D.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}},window.showAddRecorrenteModal=qa.showAddRecorrenteModal,window.closeModal=qa.closeModal,window.appState=ao);const Wn=Object.freeze(Object.defineProperty({__proto__:null,applyCompactMode:op,debounce:Y0,ensureHashHasYm:eA,formatCurrency:z0,formatDate:j0,formatDateTime:q0,getSelectedPeriod:ip,getStorageItem:K0,globalFunctions:qa,globalState:ao,hideModal:G0,isValidAmount:W0,isValidEmail:H0,navigateTo:rp,parseYmFromHash:Z0,scrollToTop:X0,setSelectedPeriod:sp,setStorageItem:Q0,showModal:$0,showNotification:F0,showSnackbar:ge,throttle:J0,updatePageTitle:L0},Symbol.toStringTag,{value:"Module"}));function ap({title:n="",content:e="",onClose:t=null}){console.log("🔧 Modal sendo criado com:",{title:n,content:e.substring(0,100)+"..."});const o=document.createElement("div");o.id="app-modal",o.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",o.style.cssText=`
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 9999 !important;
    background: rgba(0, 0, 0, 0.4) !important;
  `,o.onclick=i=>{i.target===o&&(t?t():o.remove()),window.toggleFABOnModal&&window.toggleFABOnModal()};const r=document.createElement("div");r.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",r.style.cssText=`
    max-width: 90vw !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
    margin: auto !important;
    transform: none !important;
  `,r.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,o.appendChild(r),document.body.appendChild(o),r.querySelector("#modal-close-btn").onclick=i=>{i.stopPropagation(),t?t():o.remove(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),console.log("🔧 Modal criado:",o),console.log("🔧 Modal HTML:",o.outerHTML.substring(0,200)+"...");try{typeof window<"u"&&typeof window.closeModal!="function"&&(window.closeModal=function(){try{const i=document.getElementById("app-modal")||o;i&&i.parentNode&&i.parentNode.removeChild(i)}catch{}if(window.toggleFABOnModal)try{window.toggleFABOnModal()}catch{}})}catch{}return o}const HA=Object.freeze(Object.defineProperty({__proto__:null,Modal:ap},Symbol.toStringTag,{value:"Module"}));function tA(){O.info("Configurando listeners de eventos..."),D.on("notification:show",({message:n,type:e})=>{O.info(`Notificação [${e}]: ${n}`)}),D.on("modal:show",async(n={})=>{try{const{content:e,options:t={},title:o,type:r,data:i}=n,s=o||r||(e?"[conteúdo HTML]":"sem conteúdo");if(O.info("Modal solicitado:",s),e){const c=ap({title:t.title||o||"Informação",content:e,onClose:()=>c.remove()});document.body.appendChild(c);return}if(r==="transaction"){if(typeof window.showAddTransactionModal=="function"){window.showAddTransactionModal(i||{});return}try{if(await N(()=>import("./showAddTransactionModal-B29K1FaU.js"),[]),typeof window.showAddTransactionModal=="function"){window.showAddTransactionModal(i||{});return}}catch(c){console.warn("Falha ao importar modal de transação:",c)}}if(r==="category")try{const{default:c}=await N(async()=>{const{default:l}=await import("./showAddCategoryModal-DPFJK833.js");return{default:l}},[]);typeof window.showAddCategoryModal!="function"&&(window.showAddCategoryModal=c),c(i||{});return}catch(c){console.warn("Falha ao importar modal de categoria:",c)}if(r==="recorrente"&&(await N(()=>import("./showAddRecorrenteModal-CR-JZwIg.js"),[]),typeof window.showAddRecorrenteModal=="function")){window.showAddRecorrenteModal(i||{});return}ge("Não foi possível abrir o modal solicitado","error")}catch(e){O.error("Falha ao processar modal:show",e),ge("Erro ao abrir modal","error")}}),D.on("modal:hide",()=>{O.info("Modal escondido")}),D.on("snackbar:show",({message:n,type:e})=>{O.info(`Snackbar [${e}]: ${n}`)}),D.on("transaction:added",n=>{O.info("Transação adicionada:",n.id),ge("Transação adicionada com sucesso","success")}),D.on("transaction:updated",({id:n})=>{O.info("Transação atualizada:",n),ge("Transação atualizada com sucesso","success")}),D.on("transaction:deleted",({id:n})=>{O.info("Transação removida:",n),ge("Transação removida com sucesso","success")}),D.on("budget:created",n=>{O.info("Orçamento criado:",n.id),ge("Orçamento criado com sucesso","success")}),D.on("budget:updated",({id:n})=>{O.info("Orçamento atualizado:",n),ge("Orçamento atualizado com sucesso","success")}),D.on("budget:deleted",({id:n})=>{O.info("Orçamento removido:",n),ge("Orçamento removido com sucesso","success")}),D.on("category:created",n=>{try{const e=typeof n=="string"?n:n?.id;O.info("Categoria criada:",e||"[sem id]")}catch{O.warn("Evento category:created com payload inesperado:",n)}ge("Categoria criada com sucesso","success")}),D.on("category:updated",({id:n})=>{O.info("Categoria atualizada:",n),ge("Categoria atualizada com sucesso","success")}),D.on("category:deleted",({id:n})=>{O.info("Categoria removida:",n),ge("Categoria removida com sucesso","success")}),D.on("transaction:recurring:applied",n=>{O.info("Recorrente aplicada:",n.id),ge("Despesa recorrente aplicada","info")}),D.on("error:transaction",n=>{O.error("Erro em transação:",n),ge("Erro ao processar transação","error")}),D.on("error:budget",n=>{O.error("Erro em orçamento:",n),ge("Erro ao processar orçamento","error")}),D.on("error:category",n=>{O.error("Erro em categoria:",n),ge("Erro ao processar categoria","error")}),D.on("auth:login",n=>{O.info("Usuário logado:",n.uid),ge("Login realizado com sucesso","success")}),D.on("auth:logout",()=>{O.info("Usuário deslogado"),ge("Logout realizado","info")}),D.on("auth:error",n=>{O.error("Erro de autenticação:",n),ge("Erro de autenticação","error")}),D.on("app:ready",n=>{O.info("Aplicação pronta:",n),ge("Aplicação carregada","success")}),D.on("app:error",n=>{O.error("Erro na aplicação:",n),ge("Erro ao carregar aplicação","error")}),O.info("Listeners de eventos configurados")}function nA(){O.info("Limpando listeners de eventos..."),D.off("notification:show"),D.off("modal:show"),D.off("modal:hide"),D.off("snackbar:show"),D.off("transaction:added"),D.off("transaction:updated"),D.off("transaction:deleted"),D.off("budget:created"),D.off("budget:updated"),D.off("budget:deleted"),D.off("category:created"),D.off("category:updated"),D.off("category:deleted"),D.off("transaction:recurring:applied"),D.off("error:transaction"),D.off("error:budget"),D.off("error:category"),D.off("auth:login"),D.off("auth:logout"),D.off("auth:error"),D.off("app:ready"),D.off("app:error"),O.info("Listeners de eventos limpos")}const cp=ps({user:null,loading:!0,error:null});function lp(){return new Promise(n=>{const e=()=>W_(gs,o=>{cp.setState({user:o,loading:!1}),D.emit("auth:changed",o),o&&up(o).catch(()=>{}),n(o||null),t()});let t;Qc.then(()=>{t=e()}).catch(()=>{t=e()})})}async function up(n){try{if(!n||!n.uid)return;const{doc:e,getDoc:t,setDoc:o,updateDoc:r,serverTimestamp:i}=await N(async()=>{const{doc:g,getDoc:f,setDoc:p,updateDoc:v,serverTimestamp:A}=await Promise.resolve().then(()=>Ye);return{doc:g,getDoc:f,setDoc:p,updateDoc:v,serverTimestamp:A}},void 0),{db:s}=await N(async()=>{const{db:g}=await Promise.resolve().then(()=>kn);return{db:g}},void 0),c=e(s,"users",n.uid),l=await t(c),d={uid:n.uid,email:n.email||null,emailLower:n.email?String(n.email).toLowerCase():null,displayName:n.displayName||null,photoURL:n.photoURL||null,providers:Array.isArray(n.providerData)?n.providerData.map(g=>g?.providerId).filter(Boolean):[],lastLoginAt:i()};l.exists()?await r(c,d):await o(c,{...d,createdAt:i()},{merge:!0})}catch(e){console.warn("ensureUserProfile: falha ao salvar perfil do usuário:",e?.message||e)}}const WA=Object.freeze(Object.defineProperty({__proto__:null,authStore:cp,ensureUserProfile:up,waitForAuth:lp},Symbol.toStringTag,{value:"Module"})),Pn="budgets";async function oA(n){if(!n)return null;const e=fe(ee,Pn,n),t=await Tr(e);return t.exists()?{id:t.id,...t.data()}:null}async function dp(n={}){const e=pe(ee,Pn),t=[];n.userId&&t.push(De("userId","==",n.userId));const o=t.length?ke(e,...t):e;return(await wt(o)).docs.map(i=>({id:i.id,...i.data()}))}async function hp(n){return dp({userId:n})}async function fl(n){const e=pe(ee,Pn),t=ke(e,De("usuariosPermitidos","array-contains",n));return(await wt(t)).docs.map(r=>({id:r.id,...r.data()}))}async function fp(n){const e=pe(ee,Pn);return(await tn(e,n)).id}async function gp(n,e){const t=fe(ee,Pn,n);return await en(t,e),!0}async function mp(n){const e=fe(ee,Pn,n);return await To(e),!0}function pp(n,e){const t=pe(ee,Pn),o=ke(t,De("userId","==",n));return Ir(o,r=>{const i=c=>c?.toDate?c.toDate():c?.seconds?new Date(c.seconds*1e3):c?new Date(c):new Date(0),s=r.docs.map(c=>({id:c.id,...c.data()})).sort((c,l)=>i(l.createdAt)-i(c.createdAt));e(s)})}const _s=Object.freeze(Object.defineProperty({__proto__:null,create:fp,getById:oA,list:dp,listOwn:hp,listShared:fl,listenToChanges:pp,remove:mp,update:gp},Symbol.toStringTag,{value:"Module"})),Kn=ps({budgets:[],currentBudget:null,loading:!1,error:null});let co=new Map;async function gl(n){try{Kn.setState({loading:!0,error:null});const[e,t]=await Promise.all([hp(n),fl(n)]),o=(d,g)=>(d||[]).map(f=>({...f,isOwner:typeof f.isOwner=="boolean"?f.isOwner:f.userId===n})),r=o(e,!0),i=o(t,!1),s=new Map;[...r,...i].forEach(d=>{const g=s.get(d.id);g?d.isOwner&&!g.isOwner&&d.userId===n&&s.set(d.id,d):s.set(d.id,d)});const c=d=>d?.toDate?d.toDate():d?.seconds?new Date(d.seconds*1e3):d?new Date(d):new Date(0),l=Array.from(s.values()).sort((d,g)=>c(g.createdAt)-c(d.createdAt));return Kn.setState({budgets:l,loading:!1}),typeof window<"u"&&(window.appState=window.appState||{},window.appState.budgets=l),l}catch(e){throw Kn.setState({error:e.message,loading:!1}),e}}async function rA(n){try{return await fl(n)}catch(e){throw D.emit("error:budget",e),e}}function wp(n){if(co.has(n))return;const e=pp(n,t=>{Kn.setState({budgets:t}),D.emit("budgets:updated",{budgets:t})});co.set(n,e)}function iA(n){const e=co.get(n);e&&(e(),co.delete(n))}function lo(n){Kn.setState({currentBudget:n}),D.emit("budget:changed",n);try{n?.id&&localStorage.setItem("currentBudgetId",n.id)}catch{}}async function yp(n){try{const e=await fp(n);return D.emit("budget:created",e),e}catch(e){throw D.emit("error:budget",e),e}}async function sA(n,e){try{await gp(n,e),D.emit("budget:updated",{id:n,data:e})}catch(t){throw D.emit("error:budget",t),t}}async function aA(n){try{await mp(n),D.emit("budget:deleted",{id:n})}catch(e){throw D.emit("error:budget",e),e}}function _p(){co.forEach(n=>n()),co.clear()}async function vp(n){try{const e=await gl(n);if(e&&e.length>0){let t=e[0];try{const o=localStorage.getItem("currentBudgetId");if(o){const r=e.find(i=>i.id===o);r?(t=r,console.log("✅ Orçamento restaurado do localStorage:",t.nome)):console.log("⚠️ Orçamento salvo não encontrado, usando primeiro disponível")}}catch(o){console.warn("Erro ao restaurar orçamento do localStorage:",o)}return lo(t),window.appState&&(window.appState.currentBudget=t),console.log("✅ Orçamento padrão selecionado:",t.nome),t}else{const o=await yp({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente",userId:n,tipo:"pessoal",createdAt:new Date,usuariosPermitidos:[n]}),r=await ml(o);if(r)return lo(r),window.appState&&(window.appState.currentBudget=r),console.log("✅ Novo orçamento padrão criado:",r.nome),r}return null}catch(e){throw console.error("❌ Erro ao selecionar orçamento padrão:",e),e}}async function ml(n){const{getById:e}=await N(async()=>{const{getById:t}=await Promise.resolve().then(()=>_s);return{getById:t}},void 0);return e(n)}function cA(n){lo(n),window.appState&&(window.appState.currentBudget=n);try{n?.id&&localStorage.setItem("currentBudgetId",n.id)}catch{}return n}function lA(n){if(!n||!n.id)return console.warn("Tentativa de persistir orçamento inválido:",n),!1;try{return localStorage.setItem("currentBudgetId",n.id),window.appState&&(window.appState.currentBudget=n),D.emit("budget:changed",n),console.log("✅ Orçamento persistido:",n.nome,n.id),!0}catch(e){return console.error("❌ Erro ao persistir orçamento:",e),!1}}async function Ep(n){try{const e=localStorage.getItem("currentBudgetId");if(!e)return console.log("Nenhum orçamento salvo encontrado"),null;const t=await ml(e);return t?(console.log("✅ Orçamento restaurado do localStorage:",t.nome),lo(t),t):(console.warn("⚠️ Orçamento salvo não encontrado no banco de dados"),localStorage.removeItem("currentBudgetId"),null)}catch(e){return console.error("❌ Erro ao restaurar orçamento:",e),null}}const bp=Object.freeze(Object.defineProperty({__proto__:null,budgetsStore:Kn,createBudget:yp,deleteBudget:aA,ensureBudgetPersistence:lA,getById:ml,loadSharedBudgets:rA,loadUserBudgets:gl,restoreBudgetFromStorage:Ep,selectDefaultBudget:vp,setCurrentBudget:lo,setCurrentBudgetGlobal:cA,startBudgetsListener:wp,stopAllListeners:_p,stopBudgetsListener:iA,updateBudget:sA},Symbol.toStringTag,{value:"Module"}));function uA({path:n="/service-worker.js",onNewVersion:e}={}){"serviceWorker"in navigator&&(window.__swUpdateState={awaitingActivation:!1},navigator.serviceWorker.register(n).then(t=>{const o=()=>{try{if(t.waiting)t.waiting.postMessage({type:"SKIP_WAITING"});else if(t.installing){const i=t.installing;i.addEventListener("statechange",()=>{i.state==="installed"&&t.waiting&&t.waiting.postMessage({type:"SKIP_WAITING"})})}else navigator.serviceWorker?.controller&&navigator.serviceWorker.controller.postMessage({type:"SKIP_WAITING"})}catch{}};function r(){const i=t.installing;i&&i.addEventListener("statechange",()=>{i.state==="installed"&&navigator.serviceWorker.controller&&(window.__swUpdateState.awaitingActivation=!0,typeof e=="function"?e({skipWaiting:o}):setTimeout(()=>o(),3e3))})}t.waiting&&(window.__swUpdateState.awaitingActivation=!0,e&&e({skipWaiting:o})),t.addEventListener("updatefound",r)}).catch(t=>console.warn("SW register failed:",t)))}function dA({onReload:n}={}){if(!navigator.serviceWorker)return;let e=!1;const t=()=>{e||(e=!0,typeof n=="function"?n():window.location.reload())};navigator.serviceWorker.addEventListener("controllerchange",()=>{t()}),setTimeout(()=>{window.__swUpdateState?.awaitingActivation&&t()},4e3)}async function hA(n=!1){const e=(s,c="info")=>{try{window.Snackbar?.({message:s,type:c})}catch{}};if(n){e("🔄 Iniciando atualização completa (hard refresh)…","info"),await Tp();return}if(e("Procurando atualizações…","info"),!("serviceWorker"in navigator)){e("Service Worker indisponível","warning");return}const t=await navigator.serviceWorker.getRegistration();if(!t){e("Registro do Service Worker não encontrado","warning");return}let o=!1;const r=()=>{if(!o){o=!0;try{window.location.reload()}catch{}}};navigator.serviceWorker.addEventListener("controllerchange",r,{once:!0});try{await t.update()}catch(s){console.warn("[checkForUpdates] Erro ao atualizar service worker:",s)}const i=s=>new Promise(c=>{if(!s)return c(!1);const l=()=>{if(s.state==="installed"){try{t.waiting?.postMessage({type:"SKIP_WAITING"})}catch{}e("Atualização encontrada. Aplicando…","info"),setTimeout(r,4e3),c(!0)}};s.addEventListener("statechange",l),s.state==="installed"&&l(),setTimeout(()=>c(!1),5e3)});if(t.waiting){try{t.waiting.postMessage({type:"SKIP_WAITING"})}catch{}e("Atualização encontrada. Aplicando…","info"),setTimeout(r,4e3)}else if(!await i(t.installing)&&!await new Promise(d=>{let g=!1;const f=async()=>{g||(g=!0,t.removeEventListener("updatefound",f),await i(t.installing),d(!0))};t.addEventListener("updatefound",f),setTimeout(()=>{g||(t.removeEventListener("updatefound",f),d(!1))},3e3)})){try{t.active?.postMessage?.({type:"UPDATE_CONTENT"})}catch{}e("Atualizando conteúdo…","info"),setTimeout(r,500)}try{const s=Date.now();localStorage?.setItem?.("sw_last_check",String(s));const c=document.getElementById("sw-last-check");c&&(c.textContent=new Date(s).toLocaleString()),setTimeout(()=>{window.updateSwStatus&&window.updateSwStatus()},10)}catch{}}async function Tp(){const n=(e,t="info")=>{try{window.Snackbar?.({message:e,type:t})}catch{}};try{if(n("🧹 Limpando cache e dados…","info"),typeof caches<"u"&&caches.keys){const o=await caches.keys();await Promise.all(o.map(r=>caches.delete(r))),console.log("[HARD REFRESH] Caches limpos:",o)}if("serviceWorker"in navigator){const o=await navigator.serviceWorker.getRegistration();o&&(await o.unregister(),console.log("[HARD REFRESH] Service Worker removido"))}const e=["user","currentBudget","theme","language"],t={};e.forEach(o=>{const r=localStorage.getItem(o);r&&(t[o]=r)}),localStorage.clear(),Object.entries(t).forEach(([o,r])=>{localStorage.setItem(o,r)}),console.log("[HARD REFRESH] localStorage limpo (dados importantes preservados)"),sessionStorage.clear(),console.log("[HARD REFRESH] sessionStorage limpo"),n("✅ Limpeza concluída. Recarregando aplicação…","success"),setTimeout(()=>{window.location.reload(!0)},1500)}catch(e){console.error("[HARD REFRESH] Erro durante limpeza:",e),n("❌ Erro durante limpeza. Recarregando mesmo assim…","warning"),setTimeout(()=>{window.location.reload(!0)},1e3)}}async function fA(){try{if(typeof caches<"u"&&caches.keys){const n=await caches.keys();await Promise.all(n.map(e=>caches.delete(e)))}try{navigator.serviceWorker?.controller?.postMessage?.({action:"clearCache"})}catch{}window.Snackbar?.({message:"Cache offline limpo. Recarregue se necessário.",type:"success"})}catch(n){console.warn("clearAppCaches error:",n),window.Snackbar?.({message:"Falha ao limpar cache",type:"error"})}}console.log("🚀 bootstrap.js carregado e executando!");typeof window<"u"&&ep().then(()=>{console.log("✅ [Bootstrap] Verificação de cache concluída")}).catch(n=>{console.error("❌ [Bootstrap] Erro na verificação de cache:",n)});typeof window<"u"&&(window.eventBus=D,console.log("🌐 [Bootstrap] EventBus exposto globalmente"));typeof window<"u"&&window.eventBus&&typeof window.eventBus.on=="function"&&(window.__notificationModalListenerBound||(window.__notificationModalListenerBound=!0,console.log("🎧 [Bootstrap] Configurando listener global para notification:show-modal..."),window.eventBus.on("notification:show-modal",async n=>{try{console.log("📱 [Bootstrap] Evento notification:show-modal recebido:",n.type),console.log("📱 [Bootstrap] Dados da notificação:",n),console.log("📱 [Bootstrap] 🔧 DEBUG: EventBus listener funcionando!"),console.log("📱 [Bootstrap] 🔧 DEBUG: Importando NotificationModal...");const{getNotificationModal:e}=await N(async()=>{const{getNotificationModal:o}=await import("./NotificationModal-CXlK3t7N.js");return{getNotificationModal:o}},[]);console.log("📱 [Bootstrap] 🔧 DEBUG: NotificationModal importado:",!!e);const t=e();console.log("📱 [Bootstrap] Modal obtido:",!!t),t?(console.log("📱 [Bootstrap] 🔧 DEBUG: Chamando modal.show()..."),t.show(n),console.log("✅ [Bootstrap] Modal exibido com sucesso")):console.error("❌ [Bootstrap] Modal não foi obtido")}catch(e){console.error("❌ [Bootstrap] Erro ao mostrar modal de notificação:",e),console.error("❌ [Bootstrap] Stack trace:",e.stack)}}),console.log("✅ [Bootstrap] Listener notification:show-modal configurado globalmente")));typeof window<"u"&&window.eventBus&&typeof window.eventBus.on=="function"&&(console.log("🟢 Registrando listener global para transactions:updated e categories:updated"),window.eventBus.on("transactions:updated",(n={})=>{if(console.log("🟢 Listener global recebeu transactions:updated",n),Array.isArray(n.transactions)&&(window.appState=window.appState||{},window.appState.transactions=n.transactions),(window.location.hash||"").split("?")[0]==="#/transactions"&&typeof window.renderTransactions=="function")try{window.renderTransactions()}catch(t){console.warn("Falha ao renderizar transações após atualização global",t)}}),window.eventBus.on("categories:updated",(n={})=>{console.log("🟢 Listener global recebeu categories:updated",n),Array.isArray(n.categories)&&(window.appState=window.appState||{},window.appState.categories=n.categories)}));const Vi=typeof window<"u"&&"BroadcastChannel"in window?new window.BroadcastChannel("financeiro-sync"):null;function uo(n,e,t=!1){if(t){lh({type:n,payload:e});return}if(lh({type:n,payload:e}),Vi)Vi.postMessage({type:n,payload:e});else try{localStorage.setItem("financeiro-sync-event",JSON.stringify({type:n,payload:e,ts:Date.now()})),setTimeout(()=>localStorage.removeItem("financeiro-sync-event"),100)}catch{}}function lh({type:n,payload:e}){n==="transactions:updated"&&D.emit("transactions:updated",{...e,__syncRemote:!0}),n==="categories:updated"&&D.emit("categories:updated",{...e,__syncRemote:!0})}Vi?Vi.onmessage=n=>{n?.data&&uo(n.data.type,n.data.payload,!0)}:window.addEventListener("storage",n=>{if(n.key==="financeiro-sync-event"&&n.newValue)try{const e=JSON.parse(n.newValue);uo(e.type,e.payload,!0)}catch{}});const J={user:null,currentBudget:null,transactions:[],categories:[],recorrentes:[],loading:!1,error:null};async function gA(){try{O.info("Inicializando aplicação..."),window.checkForUpdates=hA,window.clearAppCaches=fA,window.performHardRefresh=Tp;try{uA({onNewVersion:({skipWaiting:e})=>{try{const t=()=>e();typeof window.Snackbar=="function"?window.Snackbar({message:"Nova versão disponível. Toque para atualizar.",type:"info",action:{label:"Atualizar",handler:t},duration:1e4}):confirm("Nova versão disponível. Atualizar agora?")&&t()}catch{}}}),dA()}catch(e){O.warn("Falha ao iniciar fluxo de SW update:",e)}const n=await lp();n||O.warn("Usuário não autenticado — seguindo com modo limitado"),J.user=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentUser=n||null)}catch{}if(n?O.info("Usuário autenticado:",n.uid):O.info("Sem usuário autenticado"),n){try{await mA(n.uid)}catch(e){O.warn("Falha ao carregar dados iniciais (possível permission-denied):",e?.message||e);try{window?.Snackbar&&window.Snackbar({message:"Sem permissão para ler dados. Verifique acesso ao orçamento.",type:"warning"})}catch{}}try{Ip(n.uid)}catch(e){O.warn("Falha ao iniciar listeners (possível permission-denied):",e?.message||e)}}tA(),pA(),O.info("Aplicação inicializada com sucesso"),D.emit("app:ready",J)}catch(n){O.error("Erro ao inicializar aplicação:",n),J.error=n.message,D.emit("app:error",n)}}async function mA(n){try{const e=await gl(n);if(e.length>0){let t=e[0];try{const i=localStorage.getItem("currentBudgetId");if(i){const s=e.find(c=>c.id===i);s?(t=s,O.info("Orçamento restaurado na inicialização:",t.nome)):O.warn("Orçamento salvo não encontrado, usando primeiro disponível")}}catch(i){O.warn("Erro ao restaurar orçamento do localStorage:",i)}J.currentBudget=t;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=t)}catch{}lo(t);const[o,r]=await Promise.all([Dr(t.id,n),Cr(t.id)]);J.transactions=o,J.categories=r;try{uo("transactions:updated",{budgetId:t.id,transactions:o})}catch{}try{uo("categories:updated",{budgetId:t.id,categories:r})}catch{}}O.info("Dados iniciais carregados")}catch(e){throw O.error("Erro ao carregar dados iniciais:",e),e}}async function Ip(n){if(J.currentBudget){const e=J.currentBudget.id;try{await Qc,O.info("Firebase Auth pronto, iniciando listeners...")}catch(t){O.warn("Erro ao aguardar authReady:",t?.message||t)}try{wp(n)}catch(t){O.warn("Listener budgets falhou:",t?.message||t)}try{tl(e,n)}catch(t){O.warn("Listener transactions falhou:",t?.message||t)}try{rl(e)}catch(t){O.warn("Listener categories falhou:",t?.message||t)}try{ul(n),O.info("Listener de notificações iniciado")}catch(t){O.warn("Listener notifications falhou:",t?.message||t)}try{await ys(),O.info("Sistema de catch-up de notificações iniciado")}catch(t){O.warn("Sistema de catch-up falhou:",t?.message||t)}O.info("Listeners em tempo real iniciados")}}async function KA(n){try{if(!n)return;J.user=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentUser=n)}catch{}if(!J.currentBudget)try{const t=await Ep(n.uid);if(t){J.currentBudget=t;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=t)}catch{}}if(!J.currentBudget){const o=await vp(n.uid);if(o){J.currentBudget=o;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=o)}catch{}O.info("Orçamento padrão selecionado:",o.nome)}}}catch(t){O.warn("Falha ao selecionar orçamento pós-login:",t?.message||t)}const e=J.currentBudget?.id;if(e){try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=J.currentBudget)}catch{}const[t,o]=await Promise.all([Dr(e,n.uid),Cr(e)]);J.transactions=t,J.categories=o;try{D.emit("transactions:updated",{budgetId:e,transactions:t})}catch{}try{D.emit("categories:updated",{budgetId:e,categories:o})}catch{}Ip(n.uid)}try{ul(n.uid),O.info("Listener de notificações iniciado após login")}catch(t){O.warn("Listener notifications falhou após login:",t?.message||t)}try{await ys(),O.info("Sistema de catch-up de notificações iniciado após login")}catch(t){O.warn("Sistema de catch-up falhou após login:",t?.message||t)}try{D.emit("app:ready",J)}catch{}O.info("Realtime ativado após login")}catch(e){O.error("Erro ao ativar realtime pós-login:",e)}}function pA(){D.on("budget:changed",n=>{J.currentBudget=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=n||null)}catch{}O.info("Orçamento alterado:",n?.id);try{if(n?.id){try{nl()}catch{}try{il()}catch{}J.transactions=[],J.categories=[];try{typeof window<"u"&&(window.appState.transactions=[],window.appState.categories=[])}catch{}const e=J.user?.uid;Promise.all([Dr(n.id,e),Cr(n.id)]).then(async([t,o])=>{J.transactions=t,J.categories=o;try{D.emit("transactions:updated",{budgetId:n.id,transactions:t})}catch{}try{D.emit("categories:updated",{budgetId:n.id,categories:o})}catch{}try{tl(n.id,e)}catch{}try{rl(n.id)}catch{}try{rp("/dashboard")}catch{try{window.location.hash="#/dashboard"}catch{}}try{const{scrollToTop:r}=await N(async()=>{const{scrollToTop:i}=await Promise.resolve().then(()=>Wn);return{scrollToTop:i}},void 0);r()}catch{}try{typeof window.renderDashboard=="function"&&window.renderDashboard()}catch{}}).catch(t=>O.warn("Falha ao recarregar dados no budget:changed:",t)),wA(n.id)}}catch{}}),D.on("transactions:updated",(n={})=>{try{const e=n.budgetId??J.currentBudget?.id,t=n.transactions??J.transactions;e&&J.currentBudget?.id===e&&Array.isArray(t)&&(J.transactions=t),n.__syncRemote||uo("transactions:updated",n)}catch(e){O.warn("transactions:updated handler skipped:",e)}}),D.on("categories:updated",(n={})=>{try{const e=n.budgetId??J.currentBudget?.id,t=n.categories??J.categories;e&&J.currentBudget?.id===e&&Array.isArray(t)&&(J.categories=t),n.__syncRemote||uo("categories:updated",n)}catch(e){O.warn("categories:updated handler skipped:",e)}}),D.on("error:transaction",n=>{O.error("Erro em transação:",n)}),D.on("error:budget",n=>{O.error("Erro em orçamento:",n)}),D.on("error:category",n=>{O.error("Erro em categoria:",n)})}async function wA(n){try{const e=J?.user?.uid||J?.currentUser?.uid;if(!e||!n)return;const t=new Date,o=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`,r=`legacyfix:${e}:${n}:${o}`;if(localStorage.getItem(r)==="done")return;try{await(await N(()=>import("./fixers-D_igjmuy.js"),[])).corrigirTudoSemBudget({silent:!0})}catch(i){console.warn("AutoFix: falha ao importar/rodar fixers:",i)}localStorage.setItem(r,"done")}catch(e){console.warn("runAutoLegacyFixForBudget erro:",e)}}function yA(){O.info("Limpando recursos da aplicação..."),_p(),nl(),il(),D.off("budget:changed"),D.off("transactions:updated"),D.off("categories:updated"),D.off("error:transaction"),D.off("error:budget"),D.off("error:category"),nA(),O.info("Recursos limpos")}typeof window<"u"&&(window.appState=J);console.log("[settings.handlers] minimal handlers loaded @",new Date().toISOString());function P(){return console.log("[DEBUG] snk() chamada - verificando disponibilidade do Snackbar..."),console.log("[DEBUG] window.Snackbar disponível:",!!window.Snackbar),console.log("[DEBUG] window.Snackbar.show disponível:",!!(window.Snackbar&&typeof window.Snackbar.show=="function")),window.Snackbar&&typeof window.Snackbar.show=="function"?(console.log("[DEBUG] Usando window.Snackbar"),{success:n=>window.Snackbar.show(n,"success",3e3),error:n=>window.Snackbar.show(n,"error",3e3),info:n=>window.Snackbar.show(n,"info",3e3),warning:n=>window.Snackbar.show(n,"warning",3e3)}):(console.log("[DEBUG] Usando fallback alert"),{success:n=>{console.log("SUCCESS:",n),alert("✅ "+n)},error:n=>{console.log("ERROR:",n),alert("❌ "+n)},info:n=>{console.log("INFO:",n),alert("ℹ️ "+n)},warning:n=>{console.log("WARNING:",n),alert("⚠️ "+n)}})}function Ie(){if(console.log("[DEBUG] applyToastSettings chamada - usando sistema simplificado"),typeof window.applySimpleSnackbarConfig=="function")window.applySimpleSnackbarConfig();else{console.warn("[DEBUG] Sistema simplificado não disponível, carregando...");const n=document.createElement("script");n.src="/src/js/config/simple-snackbar-config.js",n.onload=()=>{console.log("[DEBUG] Sistema simplificado carregado, aplicando configurações..."),typeof window.applySimpleSnackbarConfig=="function"&&window.applySimpleSnackbarConfig()},document.head.appendChild(n)}}function or(n){if(console.log("[DEBUG] applyCompactMode chamada:",n),n){document.body.classList.add("compact-mode"),document.body.setAttribute("data-compact-mode","enabled");const e=localStorage.getItem("compactMode");e&&(document.body.classList.add(`${e}-mode`),document.body.setAttribute("data-compact-size",e)),console.log("[DEBUG] Modo compacto ativado")}else document.body.classList.remove("compact-mode","micro-mode","nano-mode"),document.body.removeAttribute("data-compact-mode"),document.body.removeAttribute("data-compact-size"),console.log("[DEBUG] Modo compacto desativado")}function Wo(n){console.log("[DEBUG] applyCompactSize chamada:",n),document.body.classList.remove("micro-mode","nano-mode"),n&&n!=="normal"?(document.body.classList.add(`${n}-mode`),document.body.setAttribute("data-compact-size",n),localStorage.setItem("compactMode",n),console.log("[DEBUG] Tamanho compacto aplicado:",n)):(document.body.removeAttribute("data-compact-size"),localStorage.removeItem("compactMode"),console.log("[DEBUG] Tamanho compacto removido"))}function _A(n){console.log("[DEBUG] handleToggleChange executado para:",n.id,"checked:",n.checked);const e=n.checked;switch(n.id){case"limit-alerts-toggle":localStorage.setItem("noti_limit_alerts",e),P().success(`Alertas de limite ${e?"ativados":"desativados"}`);break;case"recurring-reminders-toggle":localStorage.setItem("noti_recurring_reminders",e),P().success(`Lembretes recorrentes ${e?"ativados":"desativados"}`);break;case"weekly-summary-toggle":localStorage.setItem("noti_weekly_summary",e),P().success(`Resumo semanal ${e?"ativado":"desativado"}`);break;case"toast-hover-pause":localStorage.setItem("toast_hover_pause",e),Ie(),P().success(`Pausar toast no hover ${e?"ativado":"desativado"}`);break;case"compact-mode-toggle":localStorage.setItem("compactModeEnabled",e),or(e),P().success(`Modo compacto ${e?"ativado":"desativado"}`);break;case"animations-toggle":console.log("[DEBUG] Handler animations-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("animationsEnabled",e.toString()),e?(document.body.classList.remove("no-animations"),console.log("[DEBUG] Animações ativadas - classe no-animations removida")):(document.body.classList.add("no-animations"),console.log("[DEBUG] Animações desativadas - classe no-animations adicionada"));const t=document.body.classList.contains("no-animations");console.log("[DEBUG] Estado final - no-animations presente:",t),console.log("[DEBUG] Classes do body:",document.body.className),P().success(`Animações ${e?"ativadas":"desativadas"}`);break;case"performance-telemetry-toggle":console.log("[DEBUG] Handler performance-telemetry-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("perfTelemetry",e.toString()),N(()=>import("./perf-tobPnqr4.js"),[]).then(o=>{o.setEnabled(e),console.log("[DEBUG] Sistema de telemetria configurado:",e)}).catch(o=>{console.warn("[DEBUG] Erro ao importar sistema de telemetria:",o)}),P().success(`Telemetria de performance ${e?"ativada":"desativada"}`);break;case"biometric-auth-toggle":console.log("[DEBUG] Handler biometric-auth-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("biometricAuth",e.toString()),e?N(()=>import("./biometric-auth-DyX_2zF9.js"),[]).then(()=>{window.biometricAuth&&window.biometricAuth.checkAvailability().then(o=>{o?P().success("Autenticação biométrica ativada! Configure nas configurações do dispositivo."):P().warning("Autenticação biométrica não disponível neste dispositivo.")})}).catch(o=>{console.warn("[DEBUG] Erro ao carregar sistema biométrico:",o),P().info("Autenticação biométrica em desenvolvimento")}):P().info("Autenticação biométrica desativada");break;case"auto-sync-toggle":console.log("[DEBUG] Handler auto-sync-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("autoSync",e.toString()),e?(console.log("[DEBUG] Sincronização automática ativada"),P().success("Sincronização automática ativada - dados serão sincronizados automaticamente")):(console.log("[DEBUG] Sincronização automática desativada"),P().info("Sincronização automática desativada - sincronização manual necessária"));break;case"analytics-toggle":console.log("[DEBUG] Handler analytics-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("analyticsEnabled",e.toString()),e?(console.log("[DEBUG] Analytics ativado"),P().success("Analytics ativado - dados de uso serão coletados localmente")):(console.log("[DEBUG] Analytics desativado"),P().info("Analytics desativado - nenhum dado de uso será coletado"));break}}async function nn(){return N(()=>import("./settings.service-B90Pw1gN.js"),[])}window.acceptInvitation=async function(n){if(n)try{(await nn()).acceptBudgetInvitation(n),P().success("Convite aceito"),window.dispatchEvent(new CustomEvent("invitation:changed"))}catch{P().error("Falha ao aceitar convite")}};window.declineInvitation=async function(n){if(n)try{(await nn()).declineBudgetInvitation(n),P().info("Convite recusado"),window.dispatchEvent(new CustomEvent("invitation:changed"))}catch{P().error("Falha ao recusar convite")}};window.cancelSentInvitation=async function(n){if(n)try{(await nn()).cancelSentInvitation(n),P().info("Convite cancelado"),window.dispatchEvent(new CustomEvent("invitation:changed"))}catch{P().error("Erro ao cancelar")}};window.removeUserFromBudget=async function(n){try{const{appState:e}=window;if(!e?.currentBudget?.id)throw new Error("Orçamento inválido");if(!n||!confirm("Remover este usuário do orçamento?"))return;(await nn()).removeUserFromBudget(e.currentBudget.id,n),P().success("Usuário removido"),window.dispatchEvent(new CustomEvent("budget:changed"))}catch{P().error("Erro ao remover usuário")}};window.updateBudgetName=async function(n){try{const{appState:e}=window,t=(n||"").trim();if(!t)return P().warning("Nome vazio");if(!e?.currentBudget?.id)throw new Error("Sem orçamento");(await nn()).updateBudgetName(e.currentBudget.id,t),P().success("Nome atualizado"),window.dispatchEvent(new CustomEvent("budget:changed"))}catch{P().error("Erro ao renomear")}};window.enterBudget=async function(n,e){try{if(console.log("[DEBUG] enterBudget chamado",n,e),!n)return console.error("[DEBUG] ID do orçamento inválido"),P().error("ID do orçamento inválido");const t=await N(()=>Promise.resolve().then(()=>bp),void 0),o=await t.getById(n);if(!o)return console.error("[DEBUG] Orçamento não encontrado no banco de dados"),P().error("Orçamento não encontrado");if(console.log("[DEBUG] Orçamento encontrado:",o),!t.ensureBudgetPersistence(o))return console.error("[DEBUG] Falha ao persistir orçamento"),P().error("Erro ao salvar seleção do orçamento");window.appState&&(window.appState.currentBudget=o),window.dispatchEvent(new CustomEvent("budget:changed",{detail:{budgetId:n,budgetName:o.nome}})),console.log("[DEBUG] Orçamento alterado com sucesso"),P().success(`Entrando no orçamento: ${o.nome}`),setTimeout(()=>{window.location.hash="#/dashboard"},500)}catch(t){console.error("[DEBUG] Erro ao entrar no orçamento:",t),P().error("Erro ao entrar no orçamento: "+t.message)}};async function vA(n){try{console.log("[DEBUG] Aceitando convite:",n);const{appState:e}=window;if(!e?.currentUser){P().error("Precisa estar autenticado");return}await(await nn()).acceptBudgetInvitation(n),P().success("Convite aceito com sucesso!"),window.dispatchEvent(new CustomEvent("invitation:changed"));try{const{loadUserBudgets:t}=await N(async()=>{const{loadUserBudgets:o}=await Promise.resolve().then(()=>bp);return{loadUserBudgets:o}},void 0);await t(e.currentUser.uid),console.log("[DEBUG] Orçamentos recarregados após aceitar convite"),console.log("[DEBUG] Orçamentos no appState após recarregar:",window.appState?.budgets),console.log("[DEBUG] Orçamentos compartilhados:",window.appState?.budgets?.filter(o=>o.isOwner===!1))}catch(t){console.error("[DEBUG] Erro ao recarregar orçamentos:",t)}setTimeout(()=>{window.location.reload()},1e3)}catch(e){console.error("[DEBUG] Erro ao aceitar convite:",e),P().error(e?.message||"Erro ao aceitar convite")}}async function EA(n){try{console.log("[DEBUG] Recusando convite:",n);const{appState:e}=window;if(!e?.currentUser){P().error("Precisa estar autenticado");return}await(await nn()).declineBudgetInvitation(n),P().success("Convite recusado"),window.dispatchEvent(new CustomEvent("invitation:changed")),setTimeout(()=>{window.location.reload()},1e3)}catch(e){console.error("[DEBUG] Erro ao recusar convite:",e),P().error(e?.message||"Erro ao recusar convite")}}async function bA(n){try{const e=n.querySelector('input[name="inviteEmail"], input[type="email"]'),t=e?.value?.trim();if(!t){P().warning("Informe um email");return}const{appState:o}=window;if(!o?.currentBudget?.id){P().error("Nenhum orçamento ativo");return}if(!o?.currentUser){P().error("Precisa estar autenticado");return}await(await nn()).inviteUserToBudget(o.currentBudget.id,t,o.currentUser),P().success("Convite enviado"),e.value="",window.dispatchEvent(new CustomEvent("invitation:changed"))}catch(e){P().error(e?.message||"Erro ao convidar")}}window.toggleThemeColor=function(n){try{if(!n)return;localStorage.setItem("themeColor",n),document.documentElement.setAttribute("data-theme-color",n),P().info("Cor aplicada")}catch{}};function TA(){if(console.log("[DEBUG] Iniciando verificação de atualizações..."),!("serviceWorker"in navigator)){console.log("[DEBUG] Service Workers não suportados"),P().warning("Seu navegador não suporta atualizações automáticas");return}navigator.serviceWorker.getRegistration().then(n=>{if(!n){console.log("[DEBUG] Nenhum Service Worker registrado"),P().info("Nenhum Service Worker encontrado");return}if(console.log("[DEBUG] Service Worker encontrado:",n),n.waiting){console.log("[DEBUG] Atualização já disponível e esperando"),uh();return}if(n.installing){console.log("[DEBUG] Atualização em andamento"),P().info("Atualização em andamento...");return}console.log("[DEBUG] Tentando atualizar Service Worker..."),n.update().then(()=>{console.log("[DEBUG] Verificação de atualização concluída"),n.waiting?(console.log("[DEBUG] Nova atualização disponível após verificação"),uh()):(console.log("[DEBUG] Nenhuma atualização disponível"),P().success("Você já está usando a versão mais recente!"))}).catch(e=>{console.error("[DEBUG] Erro ao verificar atualizações:",e),P().error("Erro ao verificar atualizações")})}).catch(n=>{console.error("[DEBUG] Erro ao obter registro do Service Worker:",n),P().error("Erro ao verificar atualizações")})}function uh(){console.log("[DEBUG] Mostrando que há atualização disponível");const n=`
    <div class="space-y-4">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h3 class="font-semibold text-green-800 dark:text-green-200 mb-2">🆕 Atualização Disponível!</h3>
        <p class="text-sm text-green-700 dark:text-green-300 mb-3">
          Uma nova versão do aplicativo está disponível com melhorias e correções.
        </p>
        <div class="flex gap-2">
          <button onclick="window.location.reload()" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            🔄 Atualizar Agora
          </button>
          <button onclick="this.closest('.update-modal').remove()" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            ⏰ Mais Tarde
          </button>
        </div>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">✨ O que há de novo:</h4>
        <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc ml-4">
          <li>Melhorias de performance</li>
          <li>Correções de bugs</li>
          <li>Novas funcionalidades</li>
          <li>Otimizações de segurança</li>
        </ul>
      </div>
    </div>
  `;if(window.Modal){const e=window.Modal({title:"🆕 Atualização Disponível",content:n,onClose:()=>console.log("[DEBUG] Modal de atualização fechado")});e.className="update-modal"}else confirm(`🆕 Atualização disponível!

Deseja atualizar agora?`)&&window.location.reload()}window.copyAppInfo=function(){try{let t=function(o){const r=document.createElement("textarea");r.value=o,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();try{document.execCommand("copy"),console.log("[DEBUG] Informações copiadas via fallback"),P().success("Informações do app copiadas!")}catch(i){console.error("[DEBUG] Erro no fallback copy:",i),P().error("Erro ao copiar informações")}document.body.removeChild(r)};console.log("[DEBUG] Copiando informações do app...");const n={app:{versao:"4.3.0",swVersao:"v4.2.9",cacheEstatico:"financeiro-static-v4.2.9",cacheDinamico:"financeiro-dynamic-v4.2.9",desenvolvedor:"Igor Bispo",tecnologias:"Firebase, JavaScript, PWA",ultimaAtualizacao:"Setembro 2025"},dispositivo:{userAgent:navigator.userAgent,plataforma:navigator.platform,idioma:navigator.language,online:navigator.onLine},configuracoes:{tema:document.documentElement.classList.contains("dark")?"dark":"light",corTema:localStorage.getItem("themeColor")||"default",animacoes:localStorage.getItem("animationsEnabled")!=="false",telemetria:localStorage.getItem("perfTelemetry")==="true",biometria:localStorage.getItem("biometricAuth")==="true",autoSync:localStorage.getItem("autoSync")==="true",analytics:localStorage.getItem("analyticsEnabled")==="true"},usuario:{uid:window.appState?.currentUser?.uid||null,email:window.appState?.currentUser?.email||null,ultimaVerificacao:new Date().toLocaleString("pt-BR")}},e=JSON.stringify(n,null,2);navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(()=>{console.log("[DEBUG] Informações copiadas para clipboard"),P().success("Informações do app copiadas!")}).catch(o=>{console.warn("[DEBUG] Erro ao copiar para clipboard:",o),t(e)}):t(e)}catch(n){console.error("[DEBUG] Erro ao copiar informações:",n),P().error("Falha ao copiar informações")}};window.clearOfflineCache=function(){if(console.log("[DEBUG] Iniciando limpeza de cache offline..."),!confirm("Limpar cache offline? Isso pode afetar a performance do app.")){console.log("[DEBUG] Limpeza de cache cancelada pelo usuário");return}try{let n=0,e=0;"caches"in window?caches.keys().then(t=>{console.log("[DEBUG] Caches encontrados:",t);const o=t.map(r=>(console.log("[DEBUG] Removendo cache:",r),caches.delete(r).then(i=>(i&&n++,i))));Promise.all(o).then(()=>{if(console.log("[DEBUG] Caches removidos:",n),Object.keys(localStorage).filter(i=>i.includes("cache")||i.includes("static")||i.includes("dynamic")||i.includes("offline")).forEach(i=>{localStorage.removeItem(i),e++}),console.log("[DEBUG] Dados de cache removidos do localStorage:",e),"indexedDB"in window)try{indexedDB.deleteDatabase("financeiro-cache"),console.log("[DEBUG] IndexedDB cache removido")}catch(i){console.warn("[DEBUG] Erro ao remover IndexedDB:",i)}P().success(`Cache limpo! Removidos ${n} caches e ${e} dados locais.`)}).catch(r=>{console.error("[DEBUG] Erro ao remover caches:",r),P().error("Erro ao limpar alguns caches")})}):(console.log("[DEBUG] Cache API não disponível"),P().warning("Cache API não disponível neste navegador"))}catch(n){console.error("[DEBUG] Erro geral na limpeza de cache:",n),P().error("Erro ao limpar cache")}};window.showWhatsNew=async function(){console.log("[DEBUG] showWhatsNew executada!");try{let g=function(){s&&s.remove()};const{getLatestChangeLog:e}=await N(async()=>{const{getLatestChangeLog:f}=await import("./changelog-BemkHolD.js");return{getLatestChangeLog:f}},[]),t=e();if(!t){console.warn("[DEBUG] Nenhum changelog encontrado"),n();return}console.log("[DEBUG] Changelog carregado:",t);const o=`
      <div class="space-y-6">
        <!-- Header do Modal -->
        <div class="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-3xl text-white">🚀</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Novidades da Versão</h2>
          <p class="text-gray-600 dark:text-gray-400">Confira as últimas melhorias e recursos</p>
        </div>

        <!-- Changelog Principal -->
        <div class="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/30 dark:to-purple-800/20 p-6 rounded-xl border border-violet-200 dark:border-violet-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-violet-500 rounded-lg flex items-center justify-center shadow-md">
              <span class="text-xl text-white">✨</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-violet-800 dark:text-violet-200">${t.title}</h3>
              <p class="text-sm text-violet-600 dark:text-violet-400">📅 ${t.date}</p>
            </div>
          </div>
          <div class="space-y-3">
            ${t.items.map(f=>`
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="flex items-start gap-3">
                  <span class="text-violet-500 mt-1">🔹</span>
                  <span class="text-gray-700 dark:text-gray-300">${f}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Dica -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
              <span class="text-xl text-white">💡</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-blue-800 dark:text-blue-200">Dica Importante</h3>
              <p class="text-sm text-blue-600 dark:text-blue-400">Informações sobre esta atualização</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p class="text-gray-700 dark:text-gray-300">
              Esta versão traz headers harmonizados em todas as abas, um modal de alertas interativo no Dashboard e otimizações mobile significativas. 
              O design agora está completamente unificado com melhor aproveitamento do espaço em dispositivos móveis.
            </p>
          </div>
        </div>

        <!-- Ações -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
              <span class="text-xl text-white">🎯</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-green-800 dark:text-green-200">Próximos Passos</h3>
              <p class="text-sm text-green-600 dark:text-green-400">Aproveite ao máximo as novas funcionalidades</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button id="go-to-dashboard-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
              <span>📊</span>
              <span>Ver Dashboard</span>
            </button>
            <button id="understand-btn" class="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
              <span>✅</span>
              <span>Entendi</span>
            </button>
          </div>
        </div>
      </div>
    `;console.log("[DEBUG] Verificando disponibilidade do Modal..."),console.log("[DEBUG] window.Modal disponível:",!!window.Modal);const r=`
      <div id="whats-new-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          ${o}
          <!-- Botão de fechar -->
          <div class="text-center p-6 border-t border-gray-200 dark:border-gray-700">
            <button id="close-whats-new-modal" class="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
              Fechar
            </button>
          </div>
        </div>
      </div>
    `,i=document.getElementById("whats-new-modal");i&&i.remove(),document.body.insertAdjacentHTML("beforeend",r);const s=document.getElementById("whats-new-modal"),c=document.getElementById("close-whats-new-modal"),l=document.getElementById("go-to-dashboard-btn"),d=document.getElementById("understand-btn");c&&c.addEventListener("click",g),l&&l.addEventListener("click",()=>{g(),window.location.hash="#/dashboard"}),d&&d.addEventListener("click",g),s&&s.addEventListener("click",f=>{f.target===s&&g()})}catch(e){console.error("[DEBUG] Erro ao carregar changelog:",e),n()}function n(){console.log("[DEBUG] Executando fallback alert..."),alert(`🆕 Novidades v4.43.0:

🎨 Headers Harmonizados: Design unificado em todas as abas
🎯 Seletor de Período Minimalista: Interface clean e compacta
📱 Otimização Mobile: Espaçamentos melhorados para mobile
👑 Card Proprietário Melhorado: Layout vertical mais claro
🚨 Modal de Alertas Clicável: Clique em "Alertas" no Dashboard
📊 Informações Detalhadas: Gasto, limite e percentual por categoria
🎨 Interface Moderna: Barras de progresso animadas
🔧 Eliminação de Redundâncias: Informações duplicadas removidas
⚡ Event Handlers Precisos: Cliques corrigidos sem falsos positivos
📋 Seção Resumo Otimizada: Layout mais limpo e organizado
🚀 Performance Melhorada: Otimizações de cache e renderização`)}};window.installApp=function(){console.log("[DEBUG] Iniciando processo de instalação do app...");try{if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.log("[DEBUG] App já está instalado"),P().info("O app já está instalado no seu dispositivo!");return}window.deferredPrompt?(console.log("[DEBUG] Prompt de instalação disponível, mostrando..."),window.deferredPrompt.prompt(),window.deferredPrompt.userChoice.then(n=>{console.log("[DEBUG] Escolha do usuário:",n.outcome),n.outcome==="accepted"?(console.log("[DEBUG] Instalação aceita pelo usuário"),P().success("Instalação iniciada! O app será adicionado à sua tela inicial.")):(console.log("[DEBUG] Instalação cancelada pelo usuário"),P().info("Instalação cancelada. Você pode tentar novamente a qualquer momento.")),window.deferredPrompt=null}).catch(n=>{console.error("[DEBUG] Erro no prompt de instalação:",n),P().error("Erro no processo de instalação"),window.deferredPrompt=null})):(console.log("[DEBUG] Nenhum prompt de instalação disponível"),navigator.userAgent.includes("Chrome")||navigator.userAgent.includes("Edge")||navigator.userAgent.includes("Safari")?window.Modal?window.Modal({title:"📱 Instalar App",content:`
          <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 Como instalar o app:</h3>
              <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li><strong>Chrome/Edge:</strong> Clique no ícone de instalação na barra de endereços</li>
                <li><strong>Safari (iOS):</strong> Toque no botão "Compartilhar" e selecione "Adicionar à Tela Inicial"</li>
                <li><strong>Android:</strong> Toque no menu do navegador e selecione "Instalar app"</li>
              </ul>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">✨ Benefícios da instalação:</h4>
              <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Acesso rápido direto da tela inicial</li>
                <li>• Funciona offline</li>
                <li>• Notificações push</li>
                <li>• Experiência nativa</li>
              </ul>
            </div>
          </div>
        `,onClose:()=>console.log("[DEBUG] Modal de instalação fechado")}):alert(`Para instalar o app:

Chrome/Edge: Clique no ícone de instalação na barra de endereços
Safari: Toque em "Compartilhar" > "Adicionar à Tela Inicial"`):P().warning("Instalação não disponível neste navegador"))}catch(n){console.error("[DEBUG] Erro na instalação:",n),P().error("Erro no processo de instalação")}};document.addEventListener("click",n=>{const e=n.target;if(console.log("[DEBUG] Click detectado:",e.tagName,e.className,e.id,e.textContent?.substring(0,50)),e.id==="test-notifications-btn"&&(console.log("[DEBUG] 🎯 BOTÃO DE TESTE DETECTADO!"),console.log("[DEBUG] Evento completo:",n),console.log("[DEBUG] Target:",e),console.log("[DEBUG] ID:",e.id),console.log("[DEBUG] Texto:",e.textContent),console.log("[DEBUG] Continuando para o handler específico...")),(e.textContent?.includes("🌙")||e.textContent?.includes("☀️"))&&e.tagName==="SPAN"&&e.parentElement?.classList?.contains("theme-toggle-btn")){const f=e.parentElement,p=document.documentElement.classList.contains("dark");if(p){document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light");const v=f.querySelector("span");v&&(v.textContent="🌙")}else{document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark");const v=f.querySelector("span");v&&(v.textContent="☀️")}window.snk&&window.snk().success(`Tema alterado para ${p?"claro":"escuro"}`);return}const t=e.textContent?.includes("Backup completo")||e.textContent?.includes("Importar Dados")||e.textContent?.includes("Limpar Dados")||e.textContent?.includes("Exportar Dados")||e.textContent?.includes("Restaurar backup")||e.textContent?.includes("Remover tudo")||e.textContent?.includes("Enviar Convite")||e.textContent?.includes("📤 Enviar")||e.textContent?.includes("Aceitar")||e.textContent?.includes("Recusar")||e.id==="export-data-btn"||e.id==="import-data-btn"||e.id==="share-budget-btn"||e.classList?.contains("accept-invitation-btn")||e.classList?.contains("decline-invitation-btn")||e.id==="clear-data-btn"||e.id==="btn-logout"||e.id==="limit-alerts-toggle"||e.id==="recurring-reminders-toggle"||e.id==="weekly-summary-toggle"||e.id==="toast-hover-pause"||e.id==="apply-toast-settings"||e.id==="reset-toast-settings"||e.id==="test-toast"||e.id==="debug-snackbar"||e.id==="test-direct"||e.id==="debug-complete"||e.id==="test-console"||e.id==="test-compact"||e.id==="test-days-chunk"||e.id==="test-animations"||e.id==="compact-mode-toggle"||e.id==="animations-toggle"||e.id==="performance-telemetry-toggle"||e.id==="biometric-auth-toggle"||e.id==="auto-sync-toggle"||e.id==="analytics-toggle"||e.id==="view-performance-events"||e.id==="save-days-chunk"||e.id==="reset-days-chunk"||e.id==="check-updates-btn"||e.closest("#check-updates-btn")||e.id==="help-support-btn"||e.closest("#help-support-btn")||e.id==="toggle-theme-btn"||e.classList?.contains("theme-toggle-btn")||e.id==="enter-budget-button"||e.id==="enter-text"||e.classList?.contains("color-theme-btn")||e.classList?.contains("compact-size-btn")||e.textContent?.includes("Copiar Informações")||e.textContent?.includes("Limpar Cache Offline")||e.textContent?.includes("O que mudou")||e.textContent?.includes("Instalar App")||e.textContent?.trim()==="Entrar"||e.textContent?.trim()==="Sair"||e.id==="test-notifications-btn"||e.textContent?.includes("Testar Notificações");if((e.id==="btn-logout"||e.textContent?.trim()==="Sair")&&console.log("[DEBUG] isTargetElement para logout:",t),e.id==="btn-logout"||e.textContent?.trim()==="Sair"){console.log("[DEBUG] Handler logout executado!"),n.preventDefault(),n.stopPropagation(),confirm("Tem certeza que deseja sair? Você será deslogado do aplicativo.")?(console.log("[DEBUG] Logout confirmado pelo usuário"),P().info("Fazendo logout..."),typeof window.logout=="function"?(console.log("[DEBUG] Executando window.logout()..."),window.logout()):(console.warn("[DEBUG] window.logout não está disponível, tentando importar..."),N(()=>import("./AuthService-DinJOQir.js"),[]).then(f=>{console.log("[DEBUG] AuthService importado, executando logout..."),f.logout()}).catch(f=>{console.error("[DEBUG] Erro ao importar AuthService:",f),window.firebase&&window.firebase.auth?(console.log("[DEBUG] Usando Firebase auth diretamente..."),window.firebase.auth().signOut().then(()=>{console.log("[DEBUG] Logout via Firebase realizado"),P().success("Logout realizado com sucesso"),window.location.reload()}).catch(p=>{console.error("[DEBUG] Erro no logout via Firebase:",p),P().error("Erro ao fazer logout")})):(console.error("[DEBUG] Firebase auth não disponível"),P().error("Erro: Sistema de autenticação não disponível"))}))):(console.log("[DEBUG] Logout cancelado pelo usuário"),P().info("Logout cancelado"));return}if(!t)return;if(e.type==="checkbox"){setTimeout(()=>{_A(e)},0);return}n.preventDefault(),n.stopPropagation();const o=e.closest("[data-accept-inv]");if(o){window.acceptInvitation(o.getAttribute("data-accept-inv"));return}const r=e.closest("[data-decline-inv]");if(r){window.declineInvitation(r.getAttribute("data-decline-inv"));return}const i=e.closest("[data-cancel-inv]");if(i){window.cancelSentInvitation(i.getAttribute("data-cancel-inv"));return}const s=e.closest("[data-remove-user]");if(s){window.removeUserFromBudget(s.getAttribute("data-remove-user"));return}const c=e.closest(".enter-budget-button")||e.closest("#enter-budget-button");if(c){console.log("[DEBUG] Handler enter-budget-button executado!");const f=c.getAttribute("data-budget-id"),p=c.getAttribute("data-budget-name");console.log("[DEBUG] Budget ID:",f,"Budget Name:",p),f?window.enterBudget(f,p):(console.warn("[DEBUG] Budget ID não encontrado no elemento"),P().error("Erro: ID do orçamento não encontrado"));return}if(e.id==="enter-budget-button"){console.log("[DEBUG] Handler alternativo enter-budget-button executado!");const f=e.getAttribute("data-budget-id"),p=e.getAttribute("data-budget-name");console.log("[DEBUG] Budget ID:",f,"Budget Name:",p),f?window.enterBudget(f,p):(console.warn("[DEBUG] Budget ID não encontrado no elemento"),P().error("Erro: ID do orçamento não encontrado"));return}if(e.textContent?.trim()==="Entrar"||e.id==="enter-text"){console.log('[DEBUG] Handler "Entrar" executado!'),console.log("[DEBUG] Elemento clicado:",e);const f=e.closest("button")||e.closest(".enter-budget-button")||e.closest("#enter-budget-button");if(f){console.log("[DEBUG] Botão pai encontrado:",f);const p=f.getAttribute("data-budget-id"),v=f.getAttribute("data-budget-name");console.log("[DEBUG] Budget ID do pai:",p,"Budget Name do pai:",v),p?window.enterBudget(p,v):(console.warn("[DEBUG] Budget ID não encontrado no botão pai"),P().error("Erro: ID do orçamento não encontrado"))}else console.warn("[DEBUG] Botão pai não encontrado"),P().error("Erro: Botão pai não encontrado");return}const l=e.closest(".color-theme-btn");if(l){const f=l.getAttribute("data-theme");f&&window.toggleThemeColor(f);return}const d=e.closest(".compact-size-btn");if(d){const f=d.getAttribute("data-size");f&&(Wo(f),P().success(`Tamanho compacto: ${f}`));return}if(e.id==="apply-toast-settings"){console.log("[DEBUG] Handler apply-toast-settings executado!");const f=document.getElementById("limit-alerts-toggle")?.checked||!1,p=document.getElementById("recurring-reminders-toggle")?.checked||!1,v=document.getElementById("weekly-summary-toggle")?.checked||!1,A=document.getElementById("toast-hover-pause")?.checked||!1;localStorage.setItem("noti_limit_alerts",f),localStorage.setItem("noti_recurring_reminders",p),localStorage.setItem("noti_weekly_summary",v),localStorage.setItem("toast_hover_pause",A),Ie(),setTimeout(()=>{Ie(),console.log("[DEBUG] Configurações reaplicadas após timeout")},100),setTimeout(()=>{if(window.Snackbar&&window.Snackbar.__getStatsForTest){const R=window.Snackbar.__getStatsForTest();console.log("[DEBUG] Stats do Snackbar após aplicação:",R)}},200),P().success("Configurações de notificação aplicadas");return}if(e.id==="reset-toast-settings"){console.log("[DEBUG] Handler reset-toast-settings executado!"),document.getElementById("limit-alerts-toggle").checked=!0,document.getElementById("recurring-reminders-toggle").checked=!0,document.getElementById("weekly-summary-toggle").checked=!1,document.getElementById("toast-hover-pause").checked=!0,typeof window.resetSimpleSnackbarConfig=="function"&&window.resetSimpleSnackbarConfig(),P().info("Configurações restauradas para o padrão");return}if(e.id==="test-toast"){console.log("[DEBUG] Handler test-toast executado!"),typeof window.testSimpleSnackbarConfig=="function"?window.testSimpleSnackbarConfig():(console.warn("[DEBUG] Sistema simplificado não disponível, usando fallback..."),P().info("Teste INFO - Sistema antigo!"));return}if(e.id==="debug-snackbar"){console.log("[DEBUG] Handler debug-snackbar executado!"),console.log("[DEBUG] Testando Snackbar diretamente..."),console.log("[DEBUG] window.Snackbar disponível:",!!window.Snackbar),console.log("[DEBUG] window.SnackbarInstance disponível:",!!window.SnackbarInstance),window.Snackbar?(window.Snackbar.info("Teste direto - INFO"),setTimeout(()=>{window.Snackbar.success("Teste direto - SUCCESS")},100),setTimeout(()=>{window.Snackbar.warning("Teste direto - WARNING")},200)):(console.error("[DEBUG] window.Snackbar não está disponível!"),alert("ERRO: window.Snackbar não está disponível!"));return}if(e.id==="test-direct"){console.log("[DEBUG] Handler test-direct executado!"),console.log("[DEBUG] === TESTE DIRETO ==="),console.log("[DEBUG] window.Snackbar:",window.Snackbar),console.log("[DEBUG] window.SnackbarInstance:",window.SnackbarInstance),window.Snackbar&&(console.log("[DEBUG] Testando window.Snackbar.info..."),window.Snackbar.info("Teste 1: INFO básico")),window.SnackbarInstance&&(console.log("[DEBUG] Configurações atuais da instância:",{defaultDuration:window.SnackbarInstance.defaultDuration,bottomOffset:window.SnackbarInstance.bottomOffset,position:window.SnackbarInstance.position,align:window.SnackbarInstance.align}),window.SnackbarInstance.defaultDuration=5e3,window.SnackbarInstance.position="top",window.SnackbarInstance.align="right",console.log("[DEBUG] Configurações modificadas:",{defaultDuration:window.SnackbarInstance.defaultDuration,position:window.SnackbarInstance.position,align:window.SnackbarInstance.align}),setTimeout(()=>{window.Snackbar.success("Teste 2: SUCCESS com configurações modificadas")},100));return}if(e.id==="debug-complete"){console.log("[DEBUG] Handler debug-complete executado!");const f=document.createElement("script");f.src="/src/js/config/debug-snackbar.js",f.onload=()=>{console.log("[DEBUG] Script de debug carregado"),typeof window.debugSnackbarSystem=="function"&&window.debugSnackbarSystem()},document.head.appendChild(f);return}if(e.id==="test-console"){console.log("[DEBUG] Handler test-console executado!"),console.log("[DEBUG] === TESTE NO CONSOLE ==="),console.log("[DEBUG] Execute os comandos abaixo no console:"),console.log('[DEBUG] 1. localStorage.setItem("toastDuration", "5000")'),console.log('[DEBUG] 2. localStorage.setItem("toastPosition", "top")'),console.log('[DEBUG] 3. localStorage.setItem("toastAlignment", "right")'),console.log("[DEBUG] 4. window.SnackbarInstance.defaultDuration = 5000"),console.log('[DEBUG] 5. window.SnackbarInstance.position = "top"'),console.log('[DEBUG] 6. window.SnackbarInstance.align = "right"'),console.log('[DEBUG] 7. window.Snackbar.info("Teste final!")'),localStorage.setItem("toastDuration","5000"),localStorage.setItem("toastPosition","top"),localStorage.setItem("toastAlignment","right"),window.SnackbarInstance&&(window.SnackbarInstance.defaultDuration=5e3,window.SnackbarInstance.position="top",window.SnackbarInstance.align="right",console.log("[DEBUG] Configurações aplicadas automaticamente"),console.log("[DEBUG] Estado da instância:",{defaultDuration:window.SnackbarInstance.defaultDuration,position:window.SnackbarInstance.position,align:window.SnackbarInstance.align}),window.Snackbar.info("Teste final: Configurações aplicadas!"));return}if(e.id==="test-compact"){console.log("[DEBUG] Handler test-compact executado!"),console.log("[DEBUG] === TESTE MODO COMPACTO ==="),console.log("[DEBUG] Estado atual do body:"),console.log("  - Classes:",document.body.className),console.log("  - data-compact-mode:",document.body.getAttribute("data-compact-mode")),console.log("  - data-compact-size:",document.body.getAttribute("data-compact-size")),document.body.classList.contains("compact-mode")?(console.log("[DEBUG] Desativando modo compacto..."),or(!1)):(console.log("[DEBUG] Ativando modo compacto..."),or(!0)),setTimeout(()=>{console.log("[DEBUG] Testando tamanho Micro..."),Wo("micro")},1e3),setTimeout(()=>{console.log("[DEBUG] Testando tamanho Nano..."),Wo("nano")},2e3),setTimeout(()=>{console.log("[DEBUG] Voltando ao normal..."),or(!1)},3e3);return}if(e.id==="test-animations"){console.log("[DEBUG] Handler test-animations executado!"),console.log("[DEBUG] === TESTE ANIMAÇÕES ===");const f=document.body.classList.contains("no-animations");console.log("[DEBUG] Estado atual - no-animations presente:",f),f?(console.log("[DEBUG] Ativando animações..."),document.body.classList.remove("no-animations"),localStorage.setItem("animationsEnabled","true"),P().success("Animações ativadas para teste!"),setTimeout(()=>{hh()},500)):(console.log("[DEBUG] Desativando animações..."),document.body.classList.add("no-animations"),localStorage.setItem("animationsEnabled","false"),P().info("Animações desativadas para teste!"),setTimeout(()=>{hh()},500)),setTimeout(()=>{console.log("[DEBUG] Restaurando estado original..."),f?(document.body.classList.add("no-animations"),localStorage.setItem("animationsEnabled","false")):(document.body.classList.remove("no-animations"),localStorage.setItem("animationsEnabled","true")),P().info("Estado das animações restaurado!")},3e3);return}if(e.id==="test-days-chunk"){console.log("[DEBUG] Handler test-days-chunk executado!"),console.log("[DEBUG] === TESTE TAMANHO DO BLOCO ===");const f=document.getElementById("days-chunk-size");if(f){console.log("[DEBUG] Input encontrado:",f),console.log("[DEBUG] Valor atual:",f.value);const p=["","12","16","25","automático"];let v=0;const A=()=>{if(v<p.length){const R=p[v];f.value=R,console.log(`[DEBUG] Testando valor: "${R}"`);const k=new Event("input",{bubbles:!0});f.dispatchEvent(k),v++,setTimeout(A,1e3)}else console.log("[DEBUG] Teste concluído"),P().info("Teste do tamanho do bloco concluído!")};A()}else console.warn("[DEBUG] Input days-chunk-size não encontrado"),P().error("Erro: Campo de entrada não encontrado");return}if(e.id==="save-days-chunk"){console.log("[DEBUG] Handler save-days-chunk executado!");const f=document.getElementById("days-chunk-size");if(f){const p=f.value.trim();if(console.log("[DEBUG] Valor do input:",p),p===""||p.toLowerCase()==="automático")localStorage.removeItem("txChunkSize"),console.log("[DEBUG] Modo automático ativado"),P().success("Modo automático ativado - sistema ajustará automaticamente");else{const v=parseInt(p);if(isNaN(v)||v<6||v>40){P().error("Valor inválido! Use um número entre 6 e 40 (recomendado 10-16)");return}localStorage.setItem("txChunkSize",v.toString()),console.log("[DEBUG] Chunk de dias definido para:",v),P().success(`Tamanho do bloco definido para ${v} grupos de dias`)}}else console.warn("[DEBUG] Input days-chunk-size não encontrado"),P().error("Erro: Campo de entrada não encontrado");return}if(e.id==="reset-days-chunk"){console.log("[DEBUG] Handler reset-days-chunk executado!");const f=document.getElementById("days-chunk-size");f?(f.value="",localStorage.removeItem("txChunkSize"),console.log("[DEBUG] Chunk de dias restaurado para o padrão (automático)"),P().info("Configuração restaurada para o padrão (automático)")):(console.warn("[DEBUG] Input days-chunk-size não encontrado"),P().error("Erro: Campo de entrada não encontrado"));return}if(e.closest("#whats-new-btn")){console.log("[DEBUG] Handler whats-new-btn executado!"),window.showWhatsNew();return}if(e.id==="whats-new-btn"||e.id==="whats-new"){console.log('[DEBUG] Handler alternativo "O que mudou" executado!'),window.showWhatsNew();return}if(e.id==="copy-info-btn"){window.copyAppInfo();return}if(e.id==="clear-cache-btn"){window.clearOfflineCache();return}if(e.id==="install-app-btn"){window.installApp();return}if(e.closest('[data-action="backup"]')){P().info("Funcionalidade de backup em desenvolvimento");return}if(e.closest('[data-action="import"]')){P().info("Funcionalidade de importação em desenvolvimento");return}if(e.id==="export-data-btn"||e.closest("#export-data-btn")){console.log("[DEBUG] export-data-btn clicado!"),P().info("Preparando exportação de dados...");try{const{currentUser:f,currentBudget:p}=window.appState||{};if(!f||!p){P().error("Usuário ou orçamento não encontrado");return}const v={metadata:{exportedAt:new Date().toISOString(),version:"v4.40.0",userId:f.uid,budgetId:p.id,budgetName:p.nome},budget:p,transactions:window.appState?.transactions||[],categories:window.appState?.categories||[],recorrentes:window.appState?.recorrentes||[]},A=JSON.stringify(v,null,2),R=new Blob([A],{type:"application/json"}),k=document.createElement("a");k.href=URL.createObjectURL(R),k.download=`backup-${p.nome}-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(k),k.click(),document.body.removeChild(k),P().success("Backup exportado com sucesso!")}catch(f){console.error("[DEBUG] Erro ao exportar dados:",f),P().error("Erro ao exportar dados")}return}if(e.id==="import-data-btn"||e.closest("#import-data-btn")){console.log("[DEBUG] import-data-btn clicado!");const f=document.createElement("input");f.type="file",f.accept=".json",f.onchange=async p=>{const v=p.target.files[0];if(v)try{let re=function(){V&&V.remove()};P().info("Lendo arquivo de backup...");const A=await v.text(),R=JSON.parse(A);if(!R.metadata||!R.budget||!R.transactions||!R.categories){P().error("Arquivo de backup inválido");return}const k=`
            <div id="import-confirm-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div class="text-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span class="text-3xl text-white">📥</span>
                  </div>
                  <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Confirmar Importação</h2>
                  <p class="text-gray-600 dark:text-gray-400">Deseja importar os dados do backup?</p>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                  <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📊 Dados encontrados:</h3>
                  <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• <strong>Orçamento:</strong> ${R.budget.nome}</li>
                    <li>• <strong>Transações:</strong> ${R.transactions.length} itens</li>
                    <li>• <strong>Categorias:</strong> ${R.categories.length} itens</li>
                    <li>• <strong>Recorrentes:</strong> ${R.recorrentes.length} itens</li>
                    <li>• <strong>Data do backup:</strong> ${new Date(R.metadata.exportedAt).toLocaleDateString("pt-BR")}</li>
                  </ul>
                </div>
                <div class="flex gap-3">
                  <button id="cancel-import" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                    Cancelar
                  </button>
                  <button id="confirm-import" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                    Importar
                  </button>
                </div>
              </div>
            </div>
          `;document.body.insertAdjacentHTML("beforeend",k);const V=document.getElementById("import-confirm-modal"),F=document.getElementById("cancel-import"),q=document.getElementById("confirm-import");F&&F.addEventListener("click",re),q&&q.addEventListener("click",()=>{re(),P().warning("Funcionalidade de importação em desenvolvimento")}),V&&V.addEventListener("click",be=>{be.target===V&&re()})}catch(A){console.error("[DEBUG] Erro ao ler arquivo:",A),P().error("Erro ao ler arquivo de backup")}},f.click();return}if(e.id==="clear-data-btn"||e.closest("#clear-data-btn")){let R=function(){p&&p.remove()};console.log("[DEBUG] clear-data-btn clicado!"),document.body.insertAdjacentHTML("beforeend",`
        <div id="clear-data-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-3xl text-white">⚠️</span>
              </div>
              <h2 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">Limpar Todos os Dados</h2>
              <p class="text-gray-600 dark:text-gray-400">Esta ação é irreversível!</p>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6 border border-red-200 dark:border-red-700">
              <h3 class="font-semibold text-red-800 dark:text-red-200 mb-2">🚨 Dados que serão removidos:</h3>
              <ul class="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Todas as transações</li>
                <li>• Todas as categorias</li>
                <li>• Todas as despesas recorrentes</li>
                <li>• Configurações do orçamento</li>
                <li>• Dados de compartilhamento</li>
              </ul>
            </div>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-6 border border-yellow-200 dark:border-yellow-700">
              <p class="text-xs text-yellow-700 dark:text-yellow-300">
                <strong>💡 Dica:</strong> Faça um backup usando "Exportar Dados" antes de limpar.
              </p>
            </div>
            <div class="flex gap-3">
              <button id="cancel-clear" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                Cancelar
              </button>
              <button id="confirm-clear" class="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      `);const p=document.getElementById("clear-data-modal"),v=document.getElementById("cancel-clear"),A=document.getElementById("confirm-clear");v&&v.addEventListener("click",R),A&&A.addEventListener("click",()=>{R(),P().warning("Funcionalidade de limpeza de dados em desenvolvimento")}),p&&p.addEventListener("click",k=>{k.target===p&&R()});return}if(e.textContent?.includes("Backup completo")){console.log("[DEBUG] Backup completo clicado!"),P().info("Funcionalidade de backup em desenvolvimento");return}if(e.textContent?.includes("Importar Dados")){console.log("[DEBUG] Importar Dados clicado!"),P().info("Funcionalidade de importação em desenvolvimento");return}if(e.textContent?.includes("Verificar Atualizações")){console.log("[DEBUG] Verificar Atualizações clicado!"),P().info("Verificando atualizações..."),TA();return}if(e.id==="help-support-btn"||e.closest("#help-support-btn")){let k=function(){A&&A.remove()};console.log("[DEBUG] Ajuda e Suporte clicado!");const p=`
        <div id="help-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            
        <div class="space-y-6">
          <!-- Header do Modal -->
          <div class="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-3xl text-white">🆘</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Central de Ajuda</h2>
            <p class="text-gray-600 dark:text-gray-400">Estamos aqui para ajudar você!</p>
          </div>

          <!-- Contato Direto -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-xl text-white">📞</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-blue-800 dark:text-blue-200">Contato Direto</h3>
                <p class="text-sm text-blue-600 dark:text-blue-400">Fale conosco para suporte personalizado</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span class="text-xl">📧</span>
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Email</div>
                  <div class="text-blue-600 dark:text-blue-400">igormbispo@hotmail.com</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span class="text-xl">📱</span>
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">WhatsApp</div>
                  <div class="text-green-600 dark:text-green-400">(71) 99200-3106</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span class="text-xl">🕒</span>
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Horário de Atendimento</div>
                  <div class="text-gray-600 dark:text-gray-400">Segunda a Sexta, 9h às 18h</div>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-xl text-white">❓</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-green-800 dark:text-green-200">Perguntas Frequentes</h3>
                <p class="text-sm text-green-600 dark:text-green-400">Respostas rápidas para dúvidas comuns</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">💾 Como fazer backup dos dados?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Use "Exportar Dados" na seção Dados e Privacidade</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">🔄 Como sincronizar entre dispositivos?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Faça login com a mesma conta Google em todos os dispositivos</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">🔔 Como configurar notificações?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Acesse a seção Notificações nas configurações</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">📱 Como usar offline?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">O app funciona offline automaticamente após o primeiro acesso</div>
              </div>
            </div>
          </div>

          <!-- Ações Rápidas -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-xl text-white">⚡</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-purple-800 dark:text-purple-200">Ações Rápidas</h3>
                <p class="text-sm text-purple-600 dark:text-purple-400">Ferramentas úteis para resolver problemas</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button onclick="window.location.reload()" class="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
                <span>🔄</span>
                <span>Recarregar App</span>
              </button>
              <button onclick="if(window.clearOfflineCache) window.clearOfflineCache()" class="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
                <span>🗑️</span>
                <span>Limpar Cache</span>
              </button>
            </div>
          </div>
        </div>
      
            <!-- Botão de fechar -->
            <div class="text-center p-6 border-t border-gray-200 dark:border-gray-700">
              <button id="close-help-modal" class="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
                Fechar
              </button>
            </div>
          </div>
        </div>
      `,v=document.getElementById("help-modal");v&&v.remove(),document.body.insertAdjacentHTML("beforeend",p);const A=document.getElementById("help-modal"),R=document.getElementById("close-help-modal");R&&R.addEventListener("click",k),A&&A.addEventListener("click",V=>{V.target===A&&k()});return}if(e.textContent?.includes("Avaliar App")){if(console.log("[DEBUG] Avaliar App clicado!"),/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){const p=navigator.userAgent.toLowerCase();p.includes("android")?(window.open("https://play.google.com/store/apps/details?id=com.servotech.financeiro","_blank"),P().success("Redirecionando para Google Play...")):p.includes("iphone")||p.includes("ipad")?(window.open("https://apps.apple.com/app/financeiro-servotech/id123456789","_blank"),P().success("Redirecionando para App Store...")):P().info("Avalie o app na loja de aplicativos do seu dispositivo!")}else window.Modal?window.Modal({title:"⭐ Avaliar App",content:`
          <div class="space-y-4">
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⭐ Avalie o App</h3>
              <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                Sua avaliação é muito importante para nós! Ajude outros usuários a descobrir o app.
              </p>
              <div class="flex gap-2">
                <button onclick="window.open('https://play.google.com/store/apps/details?id=com.servotech.financeiro', '_blank')" class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  Google Play
                </button>
                <button onclick="window.open('https://apps.apple.com/app/financeiro-servotech/id123456789', '_blank')" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                  App Store
                </button>
              </div>
            </div>
          </div>
        `}):alert(`Avalie o app:

Google Play: https://play.google.com/store/apps/details?id=com.servotech.financeiro
App Store: https://apps.apple.com/app/financeiro-servotech/id123456789`);return}if(e.textContent?.includes("Copiar Informações")){window.copyAppInfo();return}if(e.textContent?.includes("Limpar Cache Offline")){window.clearOfflineCache();return}if(e.textContent?.includes("O que mudou")){console.log('[DEBUG] Handler "O que mudou" executado!'),console.log("[DEBUG] Texto do elemento:",e.textContent),console.log("[DEBUG] Elemento completo:",e),console.log("[DEBUG] Chamando window.showWhatsNew()...");try{window.showWhatsNew(),console.log("[DEBUG] window.showWhatsNew() executado com sucesso"),P().success('Abrindo "O que mudou"...')}catch(f){console.error("[DEBUG] Erro ao executar showWhatsNew:",f),P().error('Erro ao abrir "O que mudou"')}return}if(e.textContent?.trim()==="O que mudou"||e.textContent?.includes("O que mudou")||e.getAttribute("data-action")==="whats-new"||e.classList?.contains("whats-new-btn")){console.log('[DEBUG] Handler adicional "O que mudou" executado!'),console.log("[DEBUG] Tipo de detecção:",{textTrim:e.textContent?.trim()==="O que mudou",textIncludes:e.textContent?.includes("O que mudou"),dataAction:e.getAttribute("data-action")==="whats-new",classList:e.classList?.contains("whats-new-btn")});try{window.showWhatsNew(),console.log("[DEBUG] Handler adicional executado com sucesso")}catch(f){console.error("[DEBUG] Erro no handler adicional:",f),P().error('Erro ao abrir "O que mudou"')}return}if(e.textContent?.includes("Instalar App")){window.installApp();return}if(e.id==="view-performance-events"){console.log("[DEBUG] Handler view-performance-events executado!"),N(()=>import("./perf-tobPnqr4.js"),[]).then(f=>{const p=f.getLog();if(console.log("[DEBUG] Eventos de performance coletados:",p),p.length===0){P().info("Nenhum evento de performance coletado ainda. Ative a telemetria e use o app para coletar dados.");return}console.table(p);const v=p.reduce((k,V)=>(k[V.event]=(k[V.event]||0)+1,k),{});console.log("[DEBUG] Resumo dos eventos:",v);const A=document.createElement("div");A.style.cssText=`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        `;const R=document.createElement("div");R.style.cssText=`
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 80%;
          max-height: 80%;
          overflow: auto;
        `,R.innerHTML=`
          <h3>Eventos de Performance (${p.length})</h3>
          <p><strong>Resumo:</strong></p>
          <ul>
            ${Object.entries(v).map(([k,V])=>`<li>${k}: ${V} ocorrências</li>`).join("")}
          </ul>
          <p><strong>Últimos 10 eventos:</strong></p>
          <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; max-height: 300px;">
${p.slice(0,10).map(k=>`${new Date(k.ts).toLocaleTimeString()} - ${k.event}${k.duration?` (${k.duration}ms)`:""}`).join(`
`)}
          </pre>
          <button onclick="this.closest('.perf-modal').remove()" style="margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Fechar
          </button>
        `,A.className="perf-modal",A.appendChild(R),document.body.appendChild(A),A.addEventListener("click",k=>{k.target===A&&A.remove()}),P().success(`Mostrando ${p.length} eventos de performance`)}).catch(f=>{console.error("[DEBUG] Erro ao carregar eventos de performance:",f),P().error("Erro ao carregar eventos de performance")});return}if(e.id==="toggle-theme-btn"||e.classList?.contains("theme-toggle-btn")||e.closest(".theme-toggle-btn")){console.log("[DEBUG] BOTÃO DE TEMA DETECTADO!",{id:e.id,className:e.className,tagName:e.tagName,textContent:e.textContent,closest:e.closest(".theme-toggle-btn")});const f=document.documentElement.classList.contains("dark"),p=e.closest(".theme-toggle-btn")||e;if(console.log("[DEBUG] Estado do tema:",{isDark:f,button:p}),f){document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light");const v=p.querySelector("span");v&&(v.textContent="🌙"),console.log("[DEBUG] Tema alterado para CLARO")}else{document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark");const v=p.querySelector("span");v&&(v.textContent="☀️"),console.log("[DEBUG] Tema alterado para ESCURO")}P().success(`Tema alterado para ${f?"claro":"escuro"}`);return}if(e.classList?.contains("color-theme-btn")){const f=e.getAttribute("data-theme");f&&(localStorage.setItem("colorTheme",f),document.body.setAttribute("data-color-theme",f),P().success(`Tema de cor alterado para ${f}`));return}if(e.classList?.contains("compact-size-btn")){const f=e.getAttribute("data-size");f&&(Wo(f),P().success(`Tamanho compacto: ${f}`));return}if(e.id==="check-updates-btn"||e.closest("#check-updates-btn")){let V=function(){console.log("🔍 [DEBUG] Fechando modal..."),v&&(v.remove(),console.log("🔍 [DEBUG] Modal removido com sucesso"));const F=document.getElementById("update-modal");F&&(F.remove(),console.log("🔍 [DEBUG] Modal órfão removido"))};console.log("🚀 [TESTE DIRETO] Botão de atualizações detectado!"),console.log("🔍 [DEBUG] Elemento clicado:",e),console.log("🔍 [DEBUG] ID do elemento:",e.id),console.log("🔍 [DEBUG] Texto do elemento:",e.textContent),console.log("🔍 [DEBUG] Closest check-updates-btn:",e.closest("#check-updates-btn")),n.preventDefault(),n.stopPropagation();const f=document.getElementById("update-modal");f&&(console.log("🔍 [DEBUG] Removendo modal existente..."),f.remove());const p=`
        <div id="update-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div class="text-center mb-6">
              <div class="text-4xl mb-3">🔄</div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Escolha o tipo de atualização
              </h3>
            </div>
            
            <div class="space-y-3 mb-6">
              <button id="normal-update-btn" class="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="text-2xl">✅</div>
                  <div class="text-left">
                    <div class="font-medium text-blue-800 dark:text-blue-200">Verificação Normal</div>
                    <div class="text-xs text-blue-600 dark:text-blue-400">Recomendado</div>
                  </div>
                </div>
              </button>
              
              <button id="hard-refresh-btn" class="w-full p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="text-2xl">🧹</div>
                  <div class="text-left">
                    <div class="font-medium text-orange-800 dark:text-orange-200">Hard Refresh Completo</div>
                    <div class="text-xs text-orange-600 dark:text-orange-400">Limpa cache e dados</div>
                  </div>
                </div>
              </button>
            </div>
            
            <div class="text-center">
              <button id="cancel-update-btn" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      `;console.log("🔍 [DEBUG] Adicionando modal ao DOM..."),document.body.insertAdjacentHTML("beforeend",p),console.log("🔍 [DEBUG] Modal adicionado ao DOM");const v=document.getElementById("update-modal");console.log("🔍 [DEBUG] Modal encontrado:",v);const A=document.getElementById("normal-update-btn"),R=document.getElementById("hard-refresh-btn"),k=document.getElementById("cancel-update-btn");A&&A.addEventListener("click",()=>{console.log("✅ Verificação normal escolhida"),V(),typeof window.checkForUpdates=="function"?window.checkForUpdates(!1):location.reload()}),R&&R.addEventListener("click",()=>{console.log("🧹 Hard refresh escolhido"),V(),typeof window.performHardRefresh=="function"?window.performHardRefresh():location.reload(!0)}),k&&k.addEventListener("click",V),v&&v.addEventListener("click",F=>{F.target===v&&V()}),console.log("🚀 [TESTE DIRETO] Modal criado e event listeners adicionados!");return}if(e.id==="rate-app-btn"){P().info("Avaliação do app em desenvolvimento");return}if(e.id==="install-app-btn"){P().info("Instalação do app em desenvolvimento");return}if(e.id==="copy-info-btn"){P().info("Copiando informações do app...");return}if(e.id==="share-budget-btn"||e.textContent?.includes("Enviar Convite")||e.textContent?.includes("📤 Enviar")){const f=e.closest("form");f&&bA(f);return}if(e.classList?.contains("accept-invitation-btn")||e.textContent?.includes("Aceitar")){const f=e.getAttribute("data-invite-id");f&&vA(f);return}if(e.classList?.contains("decline-invitation-btn")||e.textContent?.includes("Recusar")){const f=e.getAttribute("data-invite-id");f&&EA(f);return}if(console.log("[DEBUG] Verificando botão de teste - ID:",e.id,"Texto:",e.textContent),console.log("[DEBUG] Condição 1 (ID):",e.id==="test-notifications-btn"),console.log("[DEBUG] Condição 2 (Texto):",e.textContent?.includes("Testar Notificações")),e.id==="test-notifications-btn"||e.textContent?.includes("Testar Notificações")){console.log("[DEBUG] ✅ BOTÃO TESTAR NOTIFICAÇÕES CLICADO!"),console.log("[DEBUG] Elemento clicado:",e),console.log("[DEBUG] ID do elemento:",e.id),console.log("[DEBUG] Texto do elemento:",e.textContent),console.log("[DEBUG] Testando sistema de notificações...");try{console.log("[DEBUG] Chamando snk().success..."),console.log("[DEBUG] window.Snackbar:",window.Snackbar),console.log("[DEBUG] window.Snackbar.show:",window.Snackbar?.show),window.Snackbar&&window.Snackbar.show&&(console.log("[DEBUG] Testando Snackbar diretamente..."),window.Snackbar.show("Teste direto do Snackbar!","success",5e3),console.log("[DEBUG] Snackbar direto chamado")),P().success("Teste de notificação de sucesso!"),console.log("[DEBUG] snk().success chamado com sucesso")}catch(f){console.error("[DEBUG] Erro ao chamar snk().success:",f)}setTimeout(()=>{try{console.log("[DEBUG] Chamando snk().info..."),P().info("Teste de notificação de informação!"),console.log("[DEBUG] snk().info chamado com sucesso")}catch(f){console.error("[DEBUG] Erro ao chamar snk().info:",f)}},1e3),setTimeout(()=>{try{console.log("[DEBUG] Chamando snk().warning..."),P().warning("Teste de notificação de aviso!"),console.log("[DEBUG] snk().warning chamado com sucesso")}catch(f){console.error("[DEBUG] Erro ao chamar snk().warning:",f)}},2e3),setTimeout(()=>{try{console.log("[DEBUG] Chamando snk().error..."),P().error("Teste de notificação de erro!"),console.log("[DEBUG] snk().error chamado com sucesso")}catch(f){console.error("[DEBUG] Erro ao chamar snk().error:",f)}},3e3);return}if(e.id==="clear-cache-btn"){P().info("Limpando cache offline...");return}},{capture:!0});let mn=new Map;document.addEventListener("input",n=>{const e=n.target;mn.has(e.id)&&clearTimeout(mn.get(e.id));const t=setTimeout(()=>{if(e.id==="toast-duration"){const o=parseInt(e.value)||500;localStorage.setItem("toastDuration",o),console.log("[DEBUG] Duração do toast salva:",o),Ie()}if(e.id==="toast-distance"){const o=parseInt(e.value)||80;localStorage.setItem("toastDistance",o),console.log("[DEBUG] Distância da borda salva:",o),Ie()}if(e.id==="toast-max-queue"){const o=parseInt(e.value)||5;localStorage.setItem("toastMaxQueue",o),console.log("[DEBUG] Máximo de fila salvo:",o),Ie()}if(e.id==="toast-anti-spam"){const o=parseInt(e.value)||500;localStorage.setItem("toastAntiSpam",o),console.log("[DEBUG] Anti-spam salvo:",o),Ie()}if(e.id==="toast-offset"){const o=parseInt(e.value)||80;localStorage.setItem("toastOffset",o),console.log("[DEBUG] Offset do toast salvo:",o),Ie()}if(e.id==="toast-cooldown"){const o=parseInt(e.value)||500;localStorage.setItem("toastCooldown",o),console.log("[DEBUG] Cooldown do toast salvo:",o),Ie()}mn.delete(e.id)},1e3);mn.set(e.id,t)});document.addEventListener("blur",n=>{const e=n.target;if(mn.has(e.id)&&(clearTimeout(mn.get(e.id)),mn.delete(e.id)),e.id==="toast-duration"){const t=parseInt(e.value)||500;localStorage.setItem("toastDuration",t),console.log("[DEBUG] Duração do toast salva (blur):",t),Ie()}if(e.id==="toast-distance"){const t=parseInt(e.value)||80;localStorage.setItem("toastDistance",t),console.log("[DEBUG] Distância da borda salva (blur):",t),Ie()}if(e.id==="toast-max-queue"){const t=parseInt(e.value)||5;localStorage.setItem("toastMaxQueue",t),console.log("[DEBUG] Máximo de fila salvo (blur):",t),Ie()}if(e.id==="toast-anti-spam"){const t=parseInt(e.value)||500;localStorage.setItem("toastAntiSpam",t),console.log("[DEBUG] Anti-spam salvo (blur):",t),Ie()}if(e.id==="toast-offset"){const t=parseInt(e.value)||80;localStorage.setItem("toastOffset",t),console.log("[DEBUG] Offset do toast salvo (blur):",t),Ie()}if(e.id==="toast-cooldown"){const t=parseInt(e.value)||500;localStorage.setItem("toastCooldown",t),console.log("[DEBUG] Cooldown do toast salvo (blur):",t),Ie()}},!0);document.addEventListener("change",n=>{const e=n.target;if(e.id==="toast-position"){const t=e.value||"bottom";localStorage.setItem("toastPosition",t),console.log("[DEBUG] Posição do toast salva:",t),Ie(),P().success(`Posição alterada para ${t}`)}if(e.id==="toast-alignment"){const t=e.value||"center";localStorage.setItem("toastAlignment",t),console.log("[DEBUG] Alinhamento do toast salvo:",t),Ie(),P().success(`Alinhamento alterado para ${t}`)}if(e.id==="toast-align"){const t=e.value||"center";localStorage.setItem("toastAlign",t),console.log("[DEBUG] Alinhamento do toast salvo:",t),Ie(),P().success(`Alinhamento alterado para ${t}`)}});window.attachDynamicHandlers=function(n=document){console.log("[DEBUG] attachDynamicHandlers chamado para:",n)};window.setupGlobalHandlers=function(){console.log("[DEBUG] setupGlobalHandlers chamado - handlers já estão configurados globalmente")};function dh(){console.log("[DEBUG] Inicializando configurações salvas..."),localStorage.getItem("compactModeEnabled")==="true"&&or(!0);const e=localStorage.getItem("compactMode");e&&Wo(e);const t=localStorage.getItem("animationsEnabled");console.log("[DEBUG] Inicializando animações..."),console.log("[DEBUG] Valor do localStorage:",t),t==="false"?(document.body.classList.add("no-animations"),console.log("[DEBUG] Animações desabilitadas - classe no-animations adicionada")):(document.body.classList.remove("no-animations"),console.log("[DEBUG] Animações habilitadas - classe no-animations removida")),console.log("[DEBUG] Estado final das animações:",{localStorage:t,hasNoAnimations:document.body.classList.contains("no-animations"),bodyClasses:document.body.className});const o=localStorage.getItem("perfTelemetry");console.log("[DEBUG] Inicializando telemetria de performance..."),console.log("[DEBUG] Valor do localStorage:",o),o==="true"?N(()=>import("./perf-tobPnqr4.js"),[]).then(l=>{l.setEnabled(!0),console.log("[DEBUG] Telemetria de performance ativada")}).catch(l=>{console.warn("[DEBUG] Erro ao ativar telemetria:",l)}):console.log("[DEBUG] Telemetria de performance desabilitada"),console.log("[DEBUG] Inicializando configurações de privacidade e segurança...");const r=localStorage.getItem("biometricAuth");console.log("[DEBUG] Biometria:",r);const i=localStorage.getItem("autoSync");console.log("[DEBUG] Sincronização automática:",i);const s=localStorage.getItem("analyticsEnabled");console.log("[DEBUG] Analytics:",s),console.log("[DEBUG] Configurações de privacidade inicializadas");const c=document.getElementById("days-chunk-size");if(c){const l=localStorage.getItem("txChunkSize");l?(c.value=l,console.log("[DEBUG] Tamanho do bloco restaurado:",l)):(c.value="",console.log("[DEBUG] Modo automático ativado para tamanho do bloco"))}console.log("[DEBUG] Configurações salvas inicializadas")}function hh(){console.log("[DEBUG] Testando animações visualmente...");const n=document.createElement("div");n.id="animation-test-element",n.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    z-index: 10000;
    transition: all 0.5s ease;
    animation: pulse 1s infinite;
  `,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translate(-50%, -50%) scale(1.5)",n.style.background="linear-gradient(45deg, #ef4444, #f59e0b)"},500),setTimeout(()=>{n.style.transform="translate(-50%, -50%) scale(0.5)",n.style.background="linear-gradient(45deg, #10b981, #06b6d4)"},1e3),setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n),console.log("[DEBUG] Teste visual de animações concluído")},2e3)}document.addEventListener("input",n=>{if(n.target.id==="days-chunk-size"){const e=n.target,t=e.value.trim();if(t!==""&&t.toLowerCase()!=="automático"){const o=parseInt(t);isNaN(o)||o<6||o>40?(e.style.borderColor="#ef4444",e.title="Valor inválido! Use um número entre 6 e 40 (recomendado 10-16)"):(e.style.borderColor="#10b981",e.title=`Carregará ${o} grupos de dias por vez`)}else e.style.borderColor="",e.title="Modo automático - sistema ajustará automaticamente"}});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",dh):dh();let fh=!1;function pl(){return window.appState?.currentUser||window.appState?.user||null}function vs(){return window.appState?.currentBudget||null}function IA(n=new Date){return n.toISOString().split("T")[0]}function SA(n=new Date){const e=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate())),t=e.getUTCDay()||7;e.setUTCDate(e.getUTCDate()+4-t);const o=new Date(Date.UTC(e.getUTCFullYear(),0,1)),r=Math.ceil(((e-o)/864e5+1)/7);return`${e.getUTCFullYear()}-W${String(r).padStart(2,"0")}`}async function AA(n){try{const e=pl(),t=vs();if(!e||!t)return;try{const o=await N(()=>import("./NotificationService-DrPvGObm.js"),[]);o&&typeof o.sendRecorrenteReminderNotification=="function"?(await o.sendRecorrenteReminderNotification(t.id,e.uid,n),console.log("[NotificationTriggers] Lembrete de recorrente enviado com sucesso")):(console.warn("[NotificationTriggers] Função sendRecorrenteReminderNotification não encontrada no módulo"),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`🔄 Lembrete: ${n.nome||"Despesa recorrente"} - R$ ${n.valor||0}`,"warning",5e3))}catch(o){console.warn("[NotificationTriggers] Erro ao importar NotificationService:",o),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`🔄 Lembrete: ${n.nome||"Despesa recorrente"} - R$ ${n.valor||0}`,"warning",5e3)}}catch(e){console.warn("[NotificationTriggers] Falha ao enviar lembrete recorrente",e),console.log("🔄 Lembrete de recorrente:",n)}}async function DA(n){try{const e=pl(),t=vs();if(!e||!t)return;try{const o=await N(()=>import("./NotificationService-DrPvGObm.js"),[]);o&&typeof o.sendWeeklySummaryNotification=="function"?(await o.sendWeeklySummaryNotification(t.id,e.uid,n),console.log("[NotificationTriggers] Resumo semanal enviado com sucesso")):(console.warn("[NotificationTriggers] Função sendWeeklySummaryNotification não encontrada no módulo"),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`📊 ${n.resumo}`,"info",5e3))}catch(o){console.warn("[NotificationTriggers] Erro ao importar NotificationService:",o),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`📊 ${n.resumo}`,"info",5e3)}}catch(e){console.warn("[NotificationTriggers] Falha ao enviar resumo semanal",e),console.log("📊 Resumo semanal:",n)}}function CA(){return localStorage.getItem("noti_recurring_reminders")==="true"}function RA(){return localStorage.getItem("noti_weekly_summary")==="true"}function kA(n){try{return N(()=>Promise.resolve().then(()=>Sm),void 0).then(e=>{const t=window.appState?.transactions||[];return e.calcularStatusRecorrente(n,t)})}catch{return Promise.resolve(null)}}async function NA(){if(!CA())return;const n=window.appState?.recorrentes||[];if(!vs()||n.length===0)return;const t=IA();for(const o of n){if(!o?.id||o.ativa===!1)continue;const r=`recorrenteReminder:lastSent:${o.id}:${t}`;if(!localStorage.getItem(r))try{const i=await kA(o);i&&i.foiEfetivadaEsteMes===!1&&(await AA(o),localStorage.setItem(r,Date.now().toString()),console.log("[NotificationTriggers] Lembrete enviado para recorrente",o.id))}catch(i){console.warn("[NotificationTriggers] Erro processamento recorrente",o.id,i)}}}function PA(){const n=window.appState?.transactions||[];if(!Array.isArray(n)||n.length===0)return null;const e=new Date,o=(e.getDay()+6)%7,r=new Date(e);r.setHours(0,0,0,0),r.setDate(r.getDate()-o);const i=new Date(r);i.setDate(i.getDate()-7);const s=new Date(i);s.setDate(s.getDate()+6),s.setHours(23,59,59,999);const c=n.filter(p=>{let v;if(p.createdAt?.seconds)v=new Date(p.createdAt.seconds*1e3);else if(p.createdAt)v=new Date(p.createdAt);else return!1;return v>=i&&v<=s});if(c.length===0)return null;let l=0,d=0;c.forEach(p=>{const v=Number(p.valor)||0;p.tipo==="receita"?d+=v:l+=v});const g=`Semana anterior: Receitas R$ ${d.toFixed(2)} | Despesas R$ ${l.toFixed(2)} | Saldo R$ ${(d-l).toFixed(2)}`,f=`${i.toLocaleDateString("pt-BR")} - ${s.toLocaleDateString("pt-BR")}`;return{resumo:g,periodo:f}}async function xA(){if(!RA())return;const n=vs(),e=pl();if(!n||!e)return;const t=new Date;if(t.getDay()!==1||t.getHours()<8)return;const r=SA(new Date(t.getTime()-7*864e5)),i=`weeklySummary:lastSent:${n.id}:${r}`;if(localStorage.getItem(i))return;const s=PA();s&&(await DA(s),localStorage.setItem(i,Date.now().toString()),console.log("[NotificationTriggers] Resumo semanal enviado",r))}async function Ha(){try{await NA()}catch{}try{await xA()}catch{}}function MA(){window.__notificationIntervalsSetup||(window.__notificationIntervalsSetup=!0,setInterval(Ha,3600*1e3),setTimeout(Ha,8e3))}function gh(){setTimeout(Ha,2e3)}function Sp(){fh||(fh=!0,console.log("[NotificationTriggers] Inicializando schedulers de notificações"),MA(),D.on("transactions:updated",gh),D.on("recorrentes:updated",gh))}setTimeout(()=>{try{Sp()}catch{}},5e3);window.initializeNotificationSchedulers=Sp;class wl{constructor(){this.modal=null,this.resolve=null,this.reject=null}show(e){return new Promise((t,o)=>{this.resolve=t,this.reject=o,this.createModal(e)})}createModal(e){const{title:t="Confirmação",message:o="Tem certeza que deseja continuar?",confirmText:r="Confirmar",cancelText:i="Cancelar",type:s="info",icon:c=null}=e;this.removeModal();const l=document.createElement("div");l.className="confirm-modal-overlay",l.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.2s ease;
    `,this.modal=document.createElement("div"),this.modal.className="confirm-modal",this.modal.style.cssText=`
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      max-width: 400px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      transform: scale(0.95);
      transition: transform 0.2s ease;
    `;const d={info:{primary:"#3B82F6",bg:"#EFF6FF",icon:"ℹ️"},success:{primary:"#10B981",bg:"#ECFDF5",icon:"✅"},warning:{primary:"#F59E0B",bg:"#FFFBEB",icon:"⚠️"},danger:{primary:"#EF4444",bg:"#FEF2F2",icon:"❌"}},g=d[s]||d.info,f=c||g.icon;this.modal.innerHTML=`
      <div style="padding: 24px;">
        <!-- Header -->
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: ${g.bg};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-right: 16px;
            flex-shrink: 0;
          ">
            ${f}
          </div>
          <div style="flex: 1;">
            <h3 style="
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              color: #1F2937;
              line-height: 1.4;
            ">${t}</h3>
          </div>
        </div>

        <!-- Message -->
        <div style="
          margin-bottom: 24px;
          color: #6B7280;
          font-size: 14px;
          line-height: 1.5;
        ">${o}</div>

        <!-- Actions -->
        <div style="
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        ">
          <button class="confirm-modal-cancel" style="
            padding: 10px 20px;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            background: white;
            color: #374151;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 80px;
          ">${i}</button>
          <button class="confirm-modal-confirm" style="
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            background: ${g.primary};
            color: white;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 80px;
          ">${r}</button>
        </div>
      </div>
    `,l.appendChild(this.modal),document.body.appendChild(l),requestAnimationFrame(()=>{l.style.opacity="1",this.modal.style.transform="scale(1)"});const p=this.modal.querySelector(".confirm-modal-cancel"),v=this.modal.querySelector(".confirm-modal-confirm"),A=()=>{this.close(!1)},R=()=>{this.close(!0)},k=F=>{F.target===l&&this.close(!1)},V=F=>{F.key==="Escape"?this.close(!1):F.key==="Enter"&&this.close(!0)};p.addEventListener("click",A),v.addEventListener("click",R),l.addEventListener("click",k),document.addEventListener("keydown",V),setTimeout(()=>v.focus(),100),this.listeners={cancel:A,confirm:R,overlay:k,keydown:V}}close(e){if(!this.modal)return;const t=this.modal.parentElement;t.style.opacity="0",this.modal.style.transform="scale(0.95)",setTimeout(()=>{this.removeModal(),e?this.resolve?.(!0):this.reject?.(!1)},200)}removeModal(){if(this.modal){const e=this.modal.parentElement;if(e){const t=this.modal.querySelector(".confirm-modal-cancel"),o=this.modal.querySelector(".confirm-modal-confirm");t&&this.listeners?.cancel&&t.removeEventListener("click",this.listeners.cancel),o&&this.listeners?.confirm&&o.removeEventListener("click",this.listeners.confirm),e&&this.listeners?.overlay&&e.removeEventListener("click",this.listeners.overlay),this.listeners?.keydown&&document.removeEventListener("keydown",this.listeners.keydown),document.body.removeChild(e)}this.modal=null,this.listeners=null}}}const yl=new wl;function Rr(n){return yl.show(n)}function Ap(n){const{descricao:e,valor:t,tipo:o}=n,r=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t);return Rr({title:"Adicionar Transação",message:`Tem certeza que deseja adicionar "${e}" no valor de ${r}?`,confirmText:"Adicionar",cancelText:"Cancelar",type:"success",icon:"💰"})}function Dp(n,e="item"){return Rr({title:"Confirmar Exclusão",message:`Tem certeza que deseja excluir "${n}"? Esta ação não pode ser desfeita.`,confirmText:"Excluir",cancelText:"Cancelar",type:"danger",icon:"🗑️"})}function Cp(n,e="item"){return Rr({title:"Salvar Alterações",message:`Tem certeza que deseja salvar as alterações em "${n}"?`,confirmText:"Salvar",cancelText:"Cancelar",type:"info",icon:"💾"})}typeof window<"u"&&(window.ConfirmModal=wl,window.confirmModal=yl,window.confirm=Rr,window.confirmTransaction=Ap,window.confirmDelete=Dp,window.confirmUpdate=Cp);const QA=Object.freeze(Object.defineProperty({__proto__:null,ConfirmModal:wl,confirm:Rr,confirmDelete:Dp,confirmModal:yl,confirmTransaction:Ap,confirmUpdate:Cp},Symbol.toStringTag,{value:"Module"})),un={"/":()=>N(()=>import("./index-ByRJO4Zv.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])).then(n=>({default:n.renderDashboard})),"/dashboard":()=>N(()=>import("./index-ByRJO4Zv.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])).then(n=>({default:n.renderDashboard})),"/transactions":()=>N(()=>import("./TransactionsPage-CxBwcT7V.js"),__vite__mapDeps([2,1,3,4])),"/categories":()=>N(()=>import("./CategoriesPage-CF-cN8xU.js"),__vite__mapDeps([5,1,3])),"/recorrentes":()=>N(()=>import("./index-ByRJO4Zv.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])).then(n=>({default:n.renderRecorrentes})),"/analytics":()=>N(()=>import("./AnalyticsPage-epY47rEx.js"),[]),"/notifications":()=>N(()=>import("./NotificationsPage-CIoSC0Nt.js"),__vite__mapDeps([6,1,7])),"/settings":()=>N(()=>import("./SettingsPage-B6csGpa7.js"),[])};async function Rp(n){try{const e=(n||"/").split("?")[0]||"/",t=e==="/"?"/dashboard":e;console.log("🔄 Renderizando página:",t,"Rota original:",n);const o=document.getElementById("app-content");if(un[t]){const r=await un[t]();let i=null;if(typeof r=="function"?i=r:r&&typeof r.default=="function"?i=r.default:r&&typeof r.render=="function"?i=r.render:r&&typeof r.renderNotifications=="function"&&(i=r.renderNotifications),typeof i=="function"){await i(o);try{const{scrollToTop:s}=await N(async()=>{const{scrollToTop:c}=await Promise.resolve().then(()=>Wn);return{scrollToTop:c}},void 0);s()}catch{}try{const{renderFAB:s}=await N(async()=>{const{renderFAB:c}=await import("./index-ByRJO4Zv.js");return{renderFAB:c}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]));s()}catch(s){console.warn("FAB render falhou:",s)}try{const{renderBottomNav:s}=await N(async()=>{const{renderBottomNav:l}=await import("./index-ByRJO4Zv.js");return{renderBottomNav:l}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]));s(t==="/"?"/dashboard":t)}catch(s){console.warn("Bottom nav render falhou:",s)}try{const{SwipeNavigation:s}=await N(async()=>{const{SwipeNavigation:c}=await import("./SwipeTabs-VZ6UOvqM.js");return{SwipeNavigation:c}},[]);if(!window.swipeNavigation)console.log("🔄 Criando nova instância do SwipeNavigation..."),window.swipeNavigation=new s,console.log("✅ SwipeNavigation criado:",window.swipeNavigation);else{console.log("🔄 Atualizando SwipeNavigation existente...");try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(s){console.warn("❌ Swipe Navigation não pôde ser inicializado/atualizado:",s)}console.log("✅ Página renderizada:",t)}else console.error("❌ Função de renderização não encontrada para:",t)}else if(console.warn("⚠️ Rota não encontrada:",t),un["/dashboard"]){const r=await un["/dashboard"]();await(r&&(r.default||r.render)||r)(o);try{const{scrollToTop:s}=await N(async()=>{const{scrollToTop:c}=await Promise.resolve().then(()=>Wn);return{scrollToTop:c}},void 0);s()}catch{}try{const{renderBottomNav:s}=await N(async()=>{const{renderBottomNav:c}=await import("./index-ByRJO4Zv.js");return{renderBottomNav:c}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]));s("/dashboard")}catch(s){console.warn("Bottom nav render (fallback) falhou:",s)}try{const{SwipeNavigation:s}=await N(async()=>{const{SwipeNavigation:c}=await import("./SwipeTabs-VZ6UOvqM.js");return{SwipeNavigation:c}},[]);if(!window.swipeNavigation)window.swipeNavigation=new s;else{try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(s){console.warn("Swipe Navigation (fallback) não pôde ser inicializado:",s)}}}catch(e){console.error("❌ Erro ao renderizar página:",n,e);try{const t=document.getElementById("app-content");if(un["/dashboard"]){const o=await un["/dashboard"]();await(o&&(o.default||o.render)||o)(t);try{const{scrollToTop:i}=await N(async()=>{const{scrollToTop:s}=await Promise.resolve().then(()=>Wn);return{scrollToTop:s}},void 0);i()}catch{}try{const{renderBottomNav:i}=await N(async()=>{const{renderBottomNav:s}=await import("./index-ByRJO4Zv.js");return{renderBottomNav:s}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]));i("/dashboard")}catch(i){console.warn("Bottom nav render (fallback catch) falhou:",i)}try{const{SwipeNavigation:i}=await N(async()=>{const{SwipeNavigation:s}=await import("./SwipeTabs-VZ6UOvqM.js");return{SwipeNavigation:s}},[]);if(!window.swipeNavigation)window.swipeNavigation=new i;else{try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(i){console.warn("Swipe Navigation (fallback catch) não pôde ser inicializado:",i)}}}catch(t){console.error("❌ Erro no fallback para dashboard:",t)}}}const YA=Object.freeze(Object.defineProperty({__proto__:null,renderPage:Rp,routes:un},Symbol.toStringTag,{value:"Module"}));async function BA(){try{await gA();try{(()=>{const o=(window.location.hash||"").split("?")[0];(!o||o==="#"||o==="#/")&&(window.location.hash="#/dashboard")})()}catch{}async function n(){const o=((window.location.hash||"").split("?")[0].replace("#","")||"/").trim();try{const{scrollToTop:r}=await N(async()=>{const{scrollToTop:i}=await Promise.resolve().then(()=>Wn);return{scrollToTop:i}},void 0);r(!0)}catch{}try{const r=await N(()=>Promise.resolve().then(()=>Wn),void 0),i=r.parseYmFromHash(),s=r.getSelectedPeriod();i&&(i.year!==s.year||i.month!==s.month)?r.setSelectedPeriod(i.year,i.month):i||r.ensureHashHasYm(s.year,s.month)}catch{}try{await Rp(o)}catch(r){O.error("route error",r)}}window.addEventListener("hashchange",()=>{n()}),n();try{typeof history<"u"&&"scrollRestoration"in history&&(history.scrollRestoration="manual")}catch{}window.addEventListener("beforeunload",yA),O.info("Aplicação bootstrapada com sucesso")}catch(n){O.error("Erro no bootstrap:",n)}}function kp(){console.log("🎨 Configurando toggle de tema...");const n=document.getElementById("theme-toggle-btn");if(!n){ho();return}if(window.__themeToggleWired){console.log("⏭️ Toggle de tema já configurado");return}window.__themeToggleWired=!0,n.addEventListener("click",()=>{console.log("🎨 Toggle de tema clicado"),Np()}),ho(),console.log("✅ Toggle de tema configurado")}function Np(){try{const n=localStorage.getItem("theme")||"light",e=n==="light"?"dark":"light";console.log("🎨 Alternando tema:",{de:n,para:e}),localStorage.setItem("theme",e),Es(e),D.emit("theme:changed",e),_l(e),console.log("✅ Tema alterado para:",e)}catch(n){console.error("❌ Erro ao alternar tema:",n)}}function Es(n){try{const e=document.documentElement;n==="dark"?(e.classList.add("dark"),e.classList.remove("light")):(e.classList.add("light"),e.classList.remove("dark")),document.body.className=document.body.className.replace(/theme-\w+/g,"").trim(),document.body.classList.add(`theme-${n}`),OA(n),console.log("✅ Tema aplicado:",n)}catch(e){console.error("❌ Erro ao aplicar tema:",e)}}function OA(n){try{document.querySelectorAll('[class*="dark:"]').forEach(i=>{i.offsetHeight}),document.querySelectorAll([".u-card",".u-btn",".u-input",".tab-container",".tab-header",".tab-content",".modal-content",".bottom-nav",".card-resumo",".list-item"].join(", ")).forEach(i=>{i.offsetHeight});const o=document.createElement("style");o.textContent=`
      :root.dark {
        --bg-primary: #1f2937 !important;
        --bg-secondary: #111827 !important;
        --text-primary: #f9fafb !important;
        --text-secondary: #d1d5db !important;
        --border-color: #374151 !important;
      }
      :root.light {
        --bg-primary: #ffffff !important;
        --bg-secondary: #f9fafb !important;
        --text-primary: #111827 !important;
        --text-secondary: #6b7280 !important;
        --border-color: #e5e7eb !important;
      }
    `;const r=document.getElementById("force-theme-style");r&&r.remove(),o.id="force-theme-style",document.head.appendChild(o),console.log("🎨 Tema forçado em todos os elementos:",n)}catch(e){console.error("❌ Erro ao forçar aplicação do tema:",e)}}function Pp(){try{const n=window.matchMedia("(prefers-color-scheme: dark)").matches;return console.log("🔍 Sistema em modo escuro:",n),n?"dark":"light"}catch(n){return console.warn("⚠️ Não foi possível detectar preferência do sistema:",n),"light"}}function ho(){try{const n=localStorage.getItem("theme"),e=Pp();console.log("🎨 Aplicando tema atual:",{temaSalvo:n,preferenciaSistema:e,sistemaEscuro:window.matchMedia("(prefers-color-scheme: dark)").matches});const t=n||e;console.log("🎯 Tema a ser aplicado:",t),Es(t),_l(t),console.log("✅ Tema atual aplicado:",t,{salvo:n,sistema:e,aplicado:t})}catch(n){console.error("❌ Erro ao aplicar tema atual:",n)}}function _l(n){try{const e=document.getElementById("theme-toggle-btn");if(!e)return;const t=e.querySelector(".theme-icon");t&&(t.textContent=n==="dark"?"☀️":"🌙",t.setAttribute("title",n==="dark"?"Mudar para modo claro":"Mudar para modo escuro"))}catch(e){console.error("❌ Erro ao atualizar ícone do tema:",e)}}function vl(){try{localStorage.getItem("compactMode")==="true"?(document.body.classList.add("compact-mode"),console.log("✅ Modo compacto aplicado")):(document.body.classList.remove("compact-mode"),console.log("✅ Modo normal aplicado"))}catch(n){console.error("❌ Erro ao aplicar modo compacto:",n)}}function UA(){try{const e=!(localStorage.getItem("compactMode")==="true");localStorage.setItem("compactMode",e.toString()),vl(),D.emit("compactMode:changed",e),console.log("✅ Modo compacto alterado para:",e)}catch(n){console.error("❌ Erro ao alternar modo compacto:",n)}}function xp(){return localStorage.getItem("theme")||"light"}function VA(){return localStorage.getItem("compactMode")==="true"}function LA(){try{const n=window.matchMedia("(prefers-color-scheme: dark)"),e=t=>{if(!localStorage.getItem("theme")){const r=t.matches?"dark":"light";console.log("🔄 Preferência do sistema mudou para:",r),Es(r),_l(r)}};n.addEventListener?n.addEventListener("change",e):n.addListener(e),console.log("✅ Listener de preferência do sistema configurado")}catch(n){console.error("❌ Erro ao configurar listener de preferência do sistema:",n)}}function Mp(){try{localStorage.removeItem("theme"),console.log("🔄 Tema resetado, seguindo sistema"),ho()}catch(n){console.error("❌ Erro ao resetar tema:",n)}}function Bp(){try{ho(),vl(),LA(),typeof window<"u"&&(window.debugTheme={getCurrentTheme:xp,resetThemeToSystem:Mp,applyCurrentTheme:ho,detectSystemPreference:Pp},console.log("🔧 Funções de debug do tema disponíveis em window.debugTheme")),console.log("✅ Configurações de tema aplicadas")}catch(n){console.error("❌ Erro ao aplicar configurações de tema:",n)}}const JA=Object.freeze(Object.defineProperty({__proto__:null,applyCompactMode:vl,applyCurrentTheme:ho,applyTheme:Es,applyThemeSettings:Bp,getCurrentCompactMode:VA,getCurrentTheme:xp,resetThemeToSystem:Mp,setupThemeToggle:kp,toggleCompactMode:UA,toggleTheme:Np},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",async()=>{try{O.info("DOM carregado, iniciando aplicação...");try{const n=document.getElementById("voice-modal");n&&(n.style.display="none",n.style.pointerEvents="none",n.style.background="rgba(0, 0, 0, 0)",n.style.backdropFilter="blur(0px)")}catch{}try{document.body.classList.add("mobile-ui")}catch{}try{Bp()}catch(n){O.warn("Falha ao aplicar configurações de tema iniciais:",n)}try{const e=(window.location.hash||"").split("?")[0];(!e||e==="#"||e==="#/")&&(window.location.hash="#/dashboard")}catch{}try{const{setupLoginButton:n,checkAuthState:e}=await N(async()=>{const{setupLoginButton:t,checkAuthState:o}=await import("./index-ByRJO4Zv.js");return{setupLoginButton:t,checkAuthState:o}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]));n(),await e()}catch(n){O.warn("Falha ao configurar login/estado de auth:",n)}await BA();try{kp()}catch(n){O.warn("Falha ao configurar toggle de tema pós-bootstrap:",n)}}catch(n){O.error("Erro fatal ao inicializar aplicação:",n),document.body.innerHTML=`
      <div style="padding: 2rem; text-align: center; color: #ef4444;">
        <h1>Erro ao carregar aplicação</h1>
        <p>${n.message}</p>
        <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
          Tentar novamente
        </button>
      </div>
    `}});window.addEventListener("online",()=>{O.info("Aplicação online"),document.body.classList.remove("offline")});window.addEventListener("offline",()=>{O.info("Aplicação offline"),document.body.classList.add("offline")});op();try{window.deferredPrompt=null,window.addEventListener("beforeinstallprompt",n=>{try{n.preventDefault()}catch{}try{window.deferredPrompt=n}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}}),window.addEventListener("appinstalled",()=>{try{window.deferredPrompt=null}catch{}try{window.Snackbar?.({message:"App instalado com sucesso",type:"success"})}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}}),typeof window.installApp!="function"&&(window.installApp=async function(){try{const n=window.deferredPrompt;if(!n)return window.Snackbar?.({message:"Instalação não disponível neste momento",type:"warning"}),!1;n.prompt();const e=await n.userChoice.catch(()=>({outcome:"dismissed"}));e&&e.outcome==="accepted"?window.Snackbar?.({message:"Instalação iniciada",type:"success"}):window.Snackbar?.({message:"Instalação cancelada",type:"info"});try{window.deferredPrompt=null}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}return e?.outcome==="accepted"}catch(n){return console.warn("installApp error:",n),window.Snackbar?.({message:"Falha ao solicitar instalação",type:"error"}),!1}})}catch{}const XA=Object.freeze(Object.defineProperty({__proto__:null,get analytics(){return Kc},app:Ar,auth:gs,db:ee},Symbol.toStringTag,{value:"Module"}));export{GA as $,C0 as A,R0 as B,x0 as C,N0 as D,P0 as E,ul as F,Ut as G,HS as H,YS as I,QS as J,MS as K,BS as L,ap as M,OS as N,kp as O,Np as P,Es as Q,ho as R,ve as S,vl as T,UA as U,xp as V,VA as W,Bp as X,Ye as Y,kn as Z,N as _,fe as a,zA as a0,jA as a1,qA as a2,Sm as a3,le as a4,HA as a5,WA as a6,_s as a7,bp as a8,QA as a9,YA as aa,JA as ab,XA as ac,Tr as b,pe as c,ee as d,D as e,sI as f,wt as g,ip as h,Im as i,sp as j,aI as k,La as l,k0 as m,To as n,tn as o,ml as p,ke as q,gl as r,ds as s,FA as t,en as u,gs as v,De as w,KA as x,gi as y,KS as z};
