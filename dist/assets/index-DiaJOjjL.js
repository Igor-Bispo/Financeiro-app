(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const df=()=>{};var Ic={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ff=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],u=n[t++],h=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},tu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,u=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,c=i>>2,y=(i&3)<<4|u>>4;let v=(u&15)<<2|f>>6,R=f&63;h||(R=64,a||(v=64)),r.push(t[c],t[y],t[v],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(eu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ff(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const y=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||u==null||f==null||y==null)throw new pf;const v=i<<2|u>>4;if(r.push(v),f!==64){const R=u<<4&240|f>>2;if(r.push(R),y!==64){const C=f<<6&192|y;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class pf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const mf=function(n){const e=eu(n);return tu.encodeByteArray(e,!0)},vs=function(n){return mf(n).replace(/\./g,"")},nu=function(n){try{return tu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function gf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const yf=()=>gf().__FIREBASE_DEFAULTS__,_f=()=>{if(typeof process>"u"||typeof Ic>"u")return;const n=Ic.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},vf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&nu(n[1]);return e&&JSON.parse(e)},Bs=()=>{try{return df()||yf()||_f()||vf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ru=n=>Bs()?.emulatorHosts?.[n],wf=n=>{const e=ru(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},su=()=>Bs()?.config,iu=n=>Bs()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function In(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ou(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function bf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[vs(JSON.stringify(t)),vs(JSON.stringify(a)),""].join(".")}const rr={};function Tf(){const n={prod:[],emulator:[]};for(const e of Object.keys(rr))rr[e]?n.emulator.push(e):n.prod.push(e);return n}function If(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ac=!1;function au(n,e){if(typeof window>"u"||typeof document>"u"||!In(window.location.host)||rr[n]===e||rr[n]||Ac)return;rr[n]=e;function t(v){return`__firebase__banner__${v}`}const r="__firebase__banner",i=Tf().prod.length>0;function a(){const v=document.getElementById(r);v&&v.remove()}function u(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function h(v,R){v.setAttribute("width","24"),v.setAttribute("id",R),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function f(){const v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{Ac=!0,a()},v}function c(v,R){v.setAttribute("id",R),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function y(){const v=If(r),R=t("text"),C=document.getElementById(R)||document.createElement("span"),N=t("learnmore"),k=document.getElementById(N)||document.createElement("a"),z=t("preprendIcon"),B=document.getElementById(z)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){const H=v.element;u(H),c(k,N);const he=f();h(B,z),H.append(B,C,k,he),document.body.appendChild(H)}i?(C.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",y):y()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Af(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ie())}function xf(){const n=Bs()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Rf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Cf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pf(){const n=Ie();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function kf(){return!xf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Df(){try{return typeof indexedDB=="object"}catch{return!1}}function Vf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nf="FirebaseError";class ht extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Nf,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vr.prototype.create)}}class vr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Of(i,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new ht(s,u,r)}}function Of(n,e){return n.replace(Mf,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Mf=/\{\$([^}]+)}/g;function Lf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Gt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(xc(i)&&xc(a)){if(!Gt(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function xc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ff(n,e){const t=new Uf(n,e);return t.subscribe.bind(t)}class Uf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Bf(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Vi),s.error===void 0&&(s.error=Vi),s.complete===void 0&&(s.complete=Vi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Bf(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Vi(){}/**
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
 */function le(n){return n&&n._delegate?n._delegate:n}class Wt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Bt="[DEFAULT]";/**
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
 */class $f{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Ef;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(jf(e))try{this.getOrInitializeService({instanceIdentifier:Bt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Bt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Bt){return this.instances.has(e)}getOptions(e=Bt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);r===u&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Bt){return this.component?this.component.multipleInstances?e:Bt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qf(n){return n===Bt?void 0:n}function jf(n){return n.instantiationMode==="EAGER"}/**
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
 */class zf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new $f(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const Hf={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},Gf=$.INFO,Wf={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},Kf=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Wf[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ao{constructor(e){this.name=e,this._logLevel=Gf,this._logHandler=Kf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in $))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Hf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...e),this._logHandler(this,$.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...e),this._logHandler(this,$.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,$.INFO,...e),this._logHandler(this,$.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,$.WARN,...e),this._logHandler(this,$.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...e),this._logHandler(this,$.ERROR,...e)}}const Qf=(n,e)=>e.some(t=>n instanceof t);let Rc,Sc;function Xf(){return Rc||(Rc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jf(){return Sc||(Sc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cu=new WeakMap,Wi=new WeakMap,lu=new WeakMap,Ni=new WeakMap,xo=new WeakMap;function Yf(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Et(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&cu.set(t,n)}).catch(()=>{}),xo.set(e,n),e}function Zf(n){if(Wi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Wi.set(n,e)}let Ki={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||lu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Et(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ep(n){Ki=n(Ki)}function tp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Oi(this),e,...t);return lu.set(r,e.sort?e.sort():[e]),Et(r)}:Jf().includes(n)?function(...e){return n.apply(Oi(this),e),Et(cu.get(this))}:function(...e){return Et(n.apply(Oi(this),e))}}function np(n){return typeof n=="function"?tp(n):(n instanceof IDBTransaction&&Zf(n),Qf(n,Xf())?new Proxy(n,Ki):n)}function Et(n){if(n instanceof IDBRequest)return Yf(n);if(Ni.has(n))return Ni.get(n);const e=np(n);return e!==n&&(Ni.set(n,e),xo.set(e,n)),e}const Oi=n=>xo.get(n);function rp(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),u=Et(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Et(a.result),h.oldVersion,h.newVersion,Et(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{i&&h.addEventListener("close",()=>i()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const sp=["get","getKey","getAll","getAllKeys","count"],ip=["put","add","delete","clear"],Mi=new Map;function Cc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Mi.get(e))return Mi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=ip.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||sp.includes(t)))return;const i=async function(a,...u){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),s&&h.done]))[0]};return Mi.set(e,i),i}ep(n=>({...n,get:(e,t,r)=>Cc(e,t)||n.get(e,t,r),has:(e,t)=>!!Cc(e,t)||n.has(e,t)}));/**
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
 */class op{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ap(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function ap(n){return n.getComponent()?.type==="VERSION"}const Qi="@firebase/app",Pc="0.14.0";/**
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
 */const ot=new Ao("@firebase/app"),cp="@firebase/app-compat",lp="@firebase/analytics-compat",up="@firebase/analytics",hp="@firebase/app-check-compat",dp="@firebase/app-check",fp="@firebase/auth",pp="@firebase/auth-compat",mp="@firebase/database",gp="@firebase/data-connect",yp="@firebase/database-compat",_p="@firebase/functions",vp="@firebase/functions-compat",wp="@firebase/installations",Ep="@firebase/installations-compat",bp="@firebase/messaging",Tp="@firebase/messaging-compat",Ip="@firebase/performance",Ap="@firebase/performance-compat",xp="@firebase/remote-config",Rp="@firebase/remote-config-compat",Sp="@firebase/storage",Cp="@firebase/storage-compat",Pp="@firebase/firestore",kp="@firebase/ai",Dp="@firebase/firestore-compat",Vp="firebase",Np="12.0.0";/**
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
 */const Xi="[DEFAULT]",Op={[Qi]:"fire-core",[cp]:"fire-core-compat",[up]:"fire-analytics",[lp]:"fire-analytics-compat",[dp]:"fire-app-check",[hp]:"fire-app-check-compat",[fp]:"fire-auth",[pp]:"fire-auth-compat",[mp]:"fire-rtdb",[gp]:"fire-data-connect",[yp]:"fire-rtdb-compat",[_p]:"fire-fn",[vp]:"fire-fn-compat",[wp]:"fire-iid",[Ep]:"fire-iid-compat",[bp]:"fire-fcm",[Tp]:"fire-fcm-compat",[Ip]:"fire-perf",[Ap]:"fire-perf-compat",[xp]:"fire-rc",[Rp]:"fire-rc-compat",[Sp]:"fire-gcs",[Cp]:"fire-gcs-compat",[Pp]:"fire-fst",[Dp]:"fire-fst-compat",[kp]:"fire-vertex","fire-js":"fire-js",[Vp]:"fire-js-all"};/**
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
 */const ws=new Map,Mp=new Map,Ji=new Map;function kc(n,e){try{n.container.addComponent(e)}catch(t){ot.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function gn(n){const e=n.name;if(Ji.has(e))return ot.debug(`There were multiple attempts to register component ${e}.`),!1;Ji.set(e,n);for(const t of ws.values())kc(t,n);for(const t of Mp.values())kc(t,n);return!0}function Ro(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Le(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Lp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},bt=new vr("app","Firebase",Lp);/**
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
 */class Fp{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Wt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw bt.create("app-deleted",{appName:this._name})}}/**
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
 */const An=Np;function uu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Xi,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw bt.create("bad-app-name",{appName:String(s)});if(t||(t=su()),!t)throw bt.create("no-options");const i=ws.get(s);if(i){if(Gt(t,i.options)&&Gt(r,i.config))return i;throw bt.create("duplicate-app",{appName:s})}const a=new zf(s);for(const h of Ji.values())a.addComponent(h);const u=new Fp(t,r,a);return ws.set(s,u),u}function hu(n=Xi){const e=ws.get(n);if(!e&&n===Xi&&su())return uu();if(!e)throw bt.create("no-app",{appName:n});return e}function Tt(n,e,t){let r=Op[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ot.warn(a.join(" "));return}gn(new Wt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Up="firebase-heartbeat-database",Bp=1,lr="firebase-heartbeat-store";let Li=null;function du(){return Li||(Li=rp(Up,Bp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(lr)}catch(t){console.warn(t)}}}}).catch(n=>{throw bt.create("idb-open",{originalErrorMessage:n.message})})),Li}async function $p(n){try{const t=(await du()).transaction(lr),r=await t.objectStore(lr).get(fu(n));return await t.done,r}catch(e){if(e instanceof ht)ot.warn(e.message);else{const t=bt.create("idb-get",{originalErrorMessage:e?.message});ot.warn(t.message)}}}async function Dc(n,e){try{const r=(await du()).transaction(lr,"readwrite");await r.objectStore(lr).put(e,fu(n)),await r.done}catch(t){if(t instanceof ht)ot.warn(t.message);else{const r=bt.create("idb-set",{originalErrorMessage:t?.message});ot.warn(r.message)}}}function fu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const qp=1024,jp=30;class zp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Gp(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Vc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>jp){const s=Wp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ot.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Vc(),{heartbeatsToSend:t,unsentEntries:r}=Hp(this._heartbeatsCache.heartbeats),s=vs(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ot.warn(e),""}}}function Vc(){return new Date().toISOString().substring(0,10)}function Hp(n,e=qp){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Nc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Nc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Gp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Df()?Vf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await $p(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Dc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Dc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Nc(n){return vs(JSON.stringify({version:2,heartbeats:n})).length}function Wp(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Kp(n){gn(new Wt("platform-logger",e=>new op(e),"PRIVATE")),gn(new Wt("heartbeat",e=>new zp(e),"PRIVATE")),Tt(Qi,Pc,n),Tt(Qi,Pc,"esm2020"),Tt("fire-js","")}Kp("");var Oc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var It,pu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,m){function _(){}_.prototype=m.prototype,b.D=m.prototype,b.prototype=new _,b.prototype.constructor=b,b.C=function(w,E,I){for(var g=Array(arguments.length-2),et=2;et<arguments.length;et++)g[et-2]=arguments[et];return m.prototype[E].apply(w,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,m,_){_||(_=0);var w=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)w[E]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(E=0;16>E;++E)w[E]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=b.g[0],_=b.g[1],E=b.g[2];var I=b.g[3],g=m+(I^_&(E^I))+w[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=I+(E^m&(_^E))+w[1]+3905402710&4294967295,I=m+(g<<12&4294967295|g>>>20),g=E+(_^I&(m^_))+w[2]+606105819&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(m^E&(I^m))+w[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(I^_&(E^I))+w[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=I+(E^m&(_^E))+w[5]+1200080426&4294967295,I=m+(g<<12&4294967295|g>>>20),g=E+(_^I&(m^_))+w[6]+2821735955&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(m^E&(I^m))+w[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(I^_&(E^I))+w[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=I+(E^m&(_^E))+w[9]+2336552879&4294967295,I=m+(g<<12&4294967295|g>>>20),g=E+(_^I&(m^_))+w[10]+4294925233&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(m^E&(I^m))+w[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(I^_&(E^I))+w[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=I+(E^m&(_^E))+w[13]+4254626195&4294967295,I=m+(g<<12&4294967295|g>>>20),g=E+(_^I&(m^_))+w[14]+2792965006&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(m^E&(I^m))+w[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(E^I&(_^E))+w[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(m^_))+w[6]+3225465664&4294967295,I=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(I^m))+w[11]+643717713&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^m&(E^I))+w[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^I&(_^E))+w[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(m^_))+w[10]+38016083&4294967295,I=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(I^m))+w[15]+3634488961&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^m&(E^I))+w[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^I&(_^E))+w[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(m^_))+w[14]+3275163606&4294967295,I=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(I^m))+w[3]+4107603335&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^m&(E^I))+w[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^I&(_^E))+w[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(m^_))+w[2]+4243563512&4294967295,I=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(I^m))+w[7]+1735328473&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^m&(E^I))+w[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(_^E^I)+w[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=I+(m^_^E)+w[8]+2272392833&4294967295,I=m+(g<<11&4294967295|g>>>21),g=E+(I^m^_)+w[11]+1839030562&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^m)+w[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^I)+w[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=I+(m^_^E)+w[4]+1272893353&4294967295,I=m+(g<<11&4294967295|g>>>21),g=E+(I^m^_)+w[7]+4139469664&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^m)+w[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^I)+w[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=I+(m^_^E)+w[0]+3936430074&4294967295,I=m+(g<<11&4294967295|g>>>21),g=E+(I^m^_)+w[3]+3572445317&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^m)+w[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^I)+w[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=I+(m^_^E)+w[12]+3873151461&4294967295,I=m+(g<<11&4294967295|g>>>21),g=E+(I^m^_)+w[15]+530742520&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^m)+w[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(E^(_|~I))+w[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=I+(_^(m|~E))+w[7]+1126891415&4294967295,I=m+(g<<10&4294967295|g>>>22),g=E+(m^(I|~_))+w[14]+2878612391&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~m))+w[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~I))+w[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=I+(_^(m|~E))+w[3]+2399980690&4294967295,I=m+(g<<10&4294967295|g>>>22),g=E+(m^(I|~_))+w[10]+4293915773&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~m))+w[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~I))+w[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=I+(_^(m|~E))+w[15]+4264355552&4294967295,I=m+(g<<10&4294967295|g>>>22),g=E+(m^(I|~_))+w[6]+2734768916&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~m))+w[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~I))+w[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=I+(_^(m|~E))+w[11]+3174756917&4294967295,I=m+(g<<10&4294967295|g>>>22),g=E+(m^(I|~_))+w[2]+718787259&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~m))+w[9]+3951481745&4294967295,b.g[0]=b.g[0]+m&4294967295,b.g[1]=b.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,b.g[2]=b.g[2]+E&4294967295,b.g[3]=b.g[3]+I&4294967295}r.prototype.u=function(b,m){m===void 0&&(m=b.length);for(var _=m-this.blockSize,w=this.B,E=this.h,I=0;I<m;){if(E==0)for(;I<=_;)s(this,b,I),I+=this.blockSize;if(typeof b=="string"){for(;I<m;)if(w[E++]=b.charCodeAt(I++),E==this.blockSize){s(this,w),E=0;break}}else for(;I<m;)if(w[E++]=b[I++],E==this.blockSize){s(this,w),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var m=1;m<b.length-8;++m)b[m]=0;var _=8*this.o;for(m=b.length-8;m<b.length;++m)b[m]=_&255,_/=256;for(this.u(b),b=Array(16),m=_=0;4>m;++m)for(var w=0;32>w;w+=8)b[_++]=this.g[m]>>>w&255;return b};function i(b,m){var _=u;return Object.prototype.hasOwnProperty.call(_,b)?_[b]:_[b]=m(b)}function a(b,m){this.h=m;for(var _=[],w=!0,E=b.length-1;0<=E;E--){var I=b[E]|0;w&&I==m||(_[E]=I,w=!1)}this.g=_}var u={};function h(b){return-128<=b&&128>b?i(b,function(m){return new a([m|0],0>m?-1:0)}):new a([b|0],0>b?-1:0)}function f(b){if(isNaN(b)||!isFinite(b))return y;if(0>b)return k(f(-b));for(var m=[],_=1,w=0;b>=_;w++)m[w]=b/_|0,_*=4294967296;return new a(m,0)}function c(b,m){if(b.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(b.charAt(0)=="-")return k(c(b.substring(1),m));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(m,8)),w=y,E=0;E<b.length;E+=8){var I=Math.min(8,b.length-E),g=parseInt(b.substring(E,E+I),m);8>I?(I=f(Math.pow(m,I)),w=w.j(I).add(f(g))):(w=w.j(_),w=w.add(f(g)))}return w}var y=h(0),v=h(1),R=h(16777216);n=a.prototype,n.m=function(){if(N(this))return-k(this).m();for(var b=0,m=1,_=0;_<this.g.length;_++){var w=this.i(_);b+=(0<=w?w:4294967296+w)*m,m*=4294967296}return b},n.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(C(this))return"0";if(N(this))return"-"+k(this).toString(b);for(var m=f(Math.pow(b,6)),_=this,w="";;){var E=he(_,m).g;_=z(_,E.j(m));var I=((0<_.g.length?_.g[0]:_.h)>>>0).toString(b);if(_=E,C(_))return I+w;for(;6>I.length;)I="0"+I;w=I+w}},n.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function C(b){if(b.h!=0)return!1;for(var m=0;m<b.g.length;m++)if(b.g[m]!=0)return!1;return!0}function N(b){return b.h==-1}n.l=function(b){return b=z(this,b),N(b)?-1:C(b)?0:1};function k(b){for(var m=b.g.length,_=[],w=0;w<m;w++)_[w]=~b.g[w];return new a(_,~b.h).add(v)}n.abs=function(){return N(this)?k(this):this},n.add=function(b){for(var m=Math.max(this.g.length,b.g.length),_=[],w=0,E=0;E<=m;E++){var I=w+(this.i(E)&65535)+(b.i(E)&65535),g=(I>>>16)+(this.i(E)>>>16)+(b.i(E)>>>16);w=g>>>16,I&=65535,g&=65535,_[E]=g<<16|I}return new a(_,_[_.length-1]&-2147483648?-1:0)};function z(b,m){return b.add(k(m))}n.j=function(b){if(C(this)||C(b))return y;if(N(this))return N(b)?k(this).j(k(b)):k(k(this).j(b));if(N(b))return k(this.j(k(b)));if(0>this.l(R)&&0>b.l(R))return f(this.m()*b.m());for(var m=this.g.length+b.g.length,_=[],w=0;w<2*m;w++)_[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<b.g.length;E++){var I=this.i(w)>>>16,g=this.i(w)&65535,et=b.i(E)>>>16,On=b.i(E)&65535;_[2*w+2*E]+=g*On,B(_,2*w+2*E),_[2*w+2*E+1]+=I*On,B(_,2*w+2*E+1),_[2*w+2*E+1]+=g*et,B(_,2*w+2*E+1),_[2*w+2*E+2]+=I*et,B(_,2*w+2*E+2)}for(w=0;w<m;w++)_[w]=_[2*w+1]<<16|_[2*w];for(w=m;w<2*m;w++)_[w]=0;return new a(_,0)};function B(b,m){for(;(b[m]&65535)!=b[m];)b[m+1]+=b[m]>>>16,b[m]&=65535,m++}function H(b,m){this.g=b,this.h=m}function he(b,m){if(C(m))throw Error("division by zero");if(C(b))return new H(y,y);if(N(b))return m=he(k(b),m),new H(k(m.g),k(m.h));if(N(m))return m=he(b,k(m)),new H(k(m.g),m.h);if(30<b.g.length){if(N(b)||N(m))throw Error("slowDivide_ only works with positive integers.");for(var _=v,w=m;0>=w.l(b);)_=qe(_),w=qe(w);var E=ge(_,1),I=ge(w,1);for(w=ge(w,2),_=ge(_,2);!C(w);){var g=I.add(w);0>=g.l(b)&&(E=E.add(_),I=g),w=ge(w,1),_=ge(_,1)}return m=z(b,E.j(m)),new H(E,m)}for(E=y;0<=b.l(m);){for(_=Math.max(1,Math.floor(b.m()/m.m())),w=Math.ceil(Math.log(_)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),I=f(_),g=I.j(m);N(g)||0<g.l(b);)_-=w,I=f(_),g=I.j(m);C(I)&&(I=v),E=E.add(I),b=z(b,g)}return new H(E,b)}n.A=function(b){return he(this,b).h},n.and=function(b){for(var m=Math.max(this.g.length,b.g.length),_=[],w=0;w<m;w++)_[w]=this.i(w)&b.i(w);return new a(_,this.h&b.h)},n.or=function(b){for(var m=Math.max(this.g.length,b.g.length),_=[],w=0;w<m;w++)_[w]=this.i(w)|b.i(w);return new a(_,this.h|b.h)},n.xor=function(b){for(var m=Math.max(this.g.length,b.g.length),_=[],w=0;w<m;w++)_[w]=this.i(w)^b.i(w);return new a(_,this.h^b.h)};function qe(b){for(var m=b.g.length+1,_=[],w=0;w<m;w++)_[w]=b.i(w)<<1|b.i(w-1)>>>31;return new a(_,b.h)}function ge(b,m){var _=m>>5;m%=32;for(var w=b.g.length-_,E=[],I=0;I<w;I++)E[I]=0<m?b.i(I+_)>>>m|b.i(I+_+1)<<32-m:b.i(I+_);return new a(E,b.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,pu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=c,It=a}).apply(typeof Oc<"u"?Oc:typeof self<"u"?self:typeof window<"u"?window:{});var ts=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var mu,Yn,gu,as,Yi,yu,_u,vu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ts=="object"&&ts];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var T=o[p];if(!(T in d))break e;d=d[T]}o=o[o.length-1],p=d[o],l=l(p),l!=p&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var d=0,p=!1,T={next:function(){if(!p&&d<o.length){var A=d++;return{value:l(A,o[A]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function h(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function f(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function c(o,l,d){return o.call.apply(o.bind,arguments)}function y(o,l,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),o.apply(l,T)}}return function(){return o.apply(l,arguments)}}function v(o,l,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?c:y,v.apply(null,arguments)}function R(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function C(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,T,A){for(var P=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)P[Q-2]=arguments[Q];return l.prototype[T].apply(p,P)}}function N(o){const l=o.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=o[p];return d}return[]}function k(o,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(h(p)){const T=o.length||0,A=p.length||0;o.length=T+A;for(let P=0;P<A;P++)o[T+P]=p[P]}else o.push(p)}}class z{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function B(o){return/^[\s\xa0]*$/.test(o)}function H(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function he(o){return he[" "](o),o}he[" "]=function(){};var qe=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function ge(o,l,d){for(const p in o)l.call(d,o[p],p,o)}function b(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function m(o){const l={};for(const d in o)l[d]=o[d];return l}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,l){let d,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(d in p)o[d]=p[d];for(let A=0;A<_.length;A++)d=_[A],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function E(o){var l=1;o=o.split(":");const d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function I(o){u.setTimeout(()=>{throw o},0)}function g(){var o=li;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class et{constructor(){this.h=this.g=null}add(l,d){const p=On.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var On=new z(()=>new Pd,o=>o.reset());class Pd{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Mn,Ln=!1,li=new et,Ia=()=>{const o=u.Promise.resolve(void 0);Mn=()=>{o.then(kd)}};var kd=()=>{for(var o;o=g();){try{o.h.call(o.g)}catch(d){I(d)}var l=On;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}Ln=!1};function dt(){this.s=this.s,this.C=this.C}dt.prototype.s=!1,dt.prototype.ma=function(){this.s||(this.s=!0,this.N())},dt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ye(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}ye.prototype.h=function(){this.defaultPrevented=!0};var Dd=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};u.addEventListener("test",d,l),u.removeEventListener("test",d,l)}catch{}return o}();function Fn(o,l){if(ye.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(qe){e:{try{he(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Vd[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Fn.aa.h.call(this)}}C(Fn,ye);var Vd={2:"touch",3:"pen",4:"mouse"};Fn.prototype.h=function(){Fn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Mr="closure_listenable_"+(1e6*Math.random()|0),Nd=0;function Od(o,l,d,p,T){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=T,this.key=++Nd,this.da=this.fa=!1}function Lr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Fr(o){this.src=o,this.g={},this.h=0}Fr.prototype.add=function(o,l,d,p,T){var A=o.toString();o=this.g[A],o||(o=this.g[A]=[],this.h++);var P=hi(o,l,p,T);return-1<P?(l=o[P],d||(l.fa=!1)):(l=new Od(l,this.src,A,!!p,T),l.fa=d,o.push(l)),l};function ui(o,l){var d=l.type;if(d in o.g){var p=o.g[d],T=Array.prototype.indexOf.call(p,l,void 0),A;(A=0<=T)&&Array.prototype.splice.call(p,T,1),A&&(Lr(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function hi(o,l,d,p){for(var T=0;T<o.length;++T){var A=o[T];if(!A.da&&A.listener==l&&A.capture==!!d&&A.ha==p)return T}return-1}var di="closure_lm_"+(1e6*Math.random()|0),fi={};function Aa(o,l,d,p,T){if(Array.isArray(l)){for(var A=0;A<l.length;A++)Aa(o,l[A],d,p,T);return null}return d=Sa(d),o&&o[Mr]?o.K(l,d,f(p)?!!p.capture:!1,T):Md(o,l,d,!1,p,T)}function Md(o,l,d,p,T,A){if(!l)throw Error("Invalid event type");var P=f(T)?!!T.capture:!!T,Q=mi(o);if(Q||(o[di]=Q=new Fr(o)),d=Q.add(l,d,p,P,A),d.proxy)return d;if(p=Ld(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)Dd||(T=P),T===void 0&&(T=!1),o.addEventListener(l.toString(),p,T);else if(o.attachEvent)o.attachEvent(Ra(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ld(){function o(d){return l.call(o.src,o.listener,d)}const l=Fd;return o}function xa(o,l,d,p,T){if(Array.isArray(l))for(var A=0;A<l.length;A++)xa(o,l[A],d,p,T);else p=f(p)?!!p.capture:!!p,d=Sa(d),o&&o[Mr]?(o=o.i,l=String(l).toString(),l in o.g&&(A=o.g[l],d=hi(A,d,p,T),-1<d&&(Lr(A[d]),Array.prototype.splice.call(A,d,1),A.length==0&&(delete o.g[l],o.h--)))):o&&(o=mi(o))&&(l=o.g[l.toString()],o=-1,l&&(o=hi(l,d,p,T)),(d=-1<o?l[o]:null)&&pi(d))}function pi(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Mr])ui(l.i,o);else{var d=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(d,p,o.capture):l.detachEvent?l.detachEvent(Ra(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=mi(l))?(ui(d,o),d.h==0&&(d.src=null,l[di]=null)):Lr(o)}}}function Ra(o){return o in fi?fi[o]:fi[o]="on"+o}function Fd(o,l){if(o.da)o=!0;else{l=new Fn(l,this);var d=o.listener,p=o.ha||o.src;o.fa&&pi(o),o=d.call(p,l)}return o}function mi(o){return o=o[di],o instanceof Fr?o:null}var gi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Sa(o){return typeof o=="function"?o:(o[gi]||(o[gi]=function(l){return o.handleEvent(l)}),o[gi])}function _e(){dt.call(this),this.i=new Fr(this),this.M=this,this.F=null}C(_e,dt),_e.prototype[Mr]=!0,_e.prototype.removeEventListener=function(o,l,d,p){xa(this,o,l,d,p)};function Ae(o,l){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new ye(l,o);else if(l instanceof ye)l.target=l.target||o;else{var T=l;l=new ye(p,o),w(l,T)}if(T=!0,d)for(var A=d.length-1;0<=A;A--){var P=l.g=d[A];T=Ur(P,p,!0,l)&&T}if(P=l.g=o,T=Ur(P,p,!0,l)&&T,T=Ur(P,p,!1,l)&&T,d)for(A=0;A<d.length;A++)P=l.g=d[A],T=Ur(P,p,!1,l)&&T}_e.prototype.N=function(){if(_e.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],p=0;p<d.length;p++)Lr(d[p]);delete o.g[l],o.h--}}this.F=null},_e.prototype.K=function(o,l,d,p){return this.i.add(String(o),l,!1,d,p)},_e.prototype.L=function(o,l,d,p){return this.i.add(String(o),l,!0,d,p)};function Ur(o,l,d,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,A=0;A<l.length;++A){var P=l[A];if(P&&!P.da&&P.capture==d){var Q=P.listener,de=P.ha||P.src;P.fa&&ui(o.i,P),T=Q.call(de,p)!==!1&&T}}return T&&!p.defaultPrevented}function Ca(o,l,d){if(typeof o=="function")d&&(o=v(o,d));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(o,l||0)}function Pa(o){o.g=Ca(()=>{o.g=null,o.i&&(o.i=!1,Pa(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Ud extends dt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Pa(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Un(o){dt.call(this),this.h=o,this.g={}}C(Un,dt);var ka=[];function Da(o){ge(o.g,function(l,d){this.g.hasOwnProperty(d)&&pi(l)},o),o.g={}}Un.prototype.N=function(){Un.aa.N.call(this),Da(this)},Un.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var yi=u.JSON.stringify,Bd=u.JSON.parse,$d=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function _i(){}_i.prototype.h=null;function Va(o){return o.h||(o.h=o.i())}function Na(){}var Bn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function vi(){ye.call(this,"d")}C(vi,ye);function wi(){ye.call(this,"c")}C(wi,ye);var Mt={},Oa=null;function Br(){return Oa=Oa||new _e}Mt.La="serverreachability";function Ma(o){ye.call(this,Mt.La,o)}C(Ma,ye);function $n(o){const l=Br();Ae(l,new Ma(l))}Mt.STAT_EVENT="statevent";function La(o,l){ye.call(this,Mt.STAT_EVENT,o),this.stat=l}C(La,ye);function xe(o){const l=Br();Ae(l,new La(l,o))}Mt.Ma="timingevent";function Fa(o,l){ye.call(this,Mt.Ma,o),this.size=l}C(Fa,ye);function qn(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},l)}function jn(){this.g=!0}jn.prototype.xa=function(){this.g=!1};function qd(o,l,d,p,T,A){o.info(function(){if(o.g)if(A)for(var P="",Q=A.split("&"),de=0;de<Q.length;de++){var W=Q[de].split("=");if(1<W.length){var ve=W[0];W=W[1];var we=ve.split("_");P=2<=we.length&&we[1]=="type"?P+(ve+"="+W+"&"):P+(ve+"=redacted&")}}else P=null;else P=A;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+l+`
`+d+`
`+P})}function jd(o,l,d,p,T,A,P){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+l+`
`+d+`
`+A+" "+P})}function nn(o,l,d,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Hd(o,d)+(p?" "+p:"")})}function zd(o,l){o.info(function(){return"TIMEOUT: "+l})}jn.prototype.info=function(){};function Hd(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var P=1;P<T.length;P++)T[P]=""}}}}return yi(d)}catch{return l}}var $r={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ua={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ei;function qr(){}C(qr,_i),qr.prototype.g=function(){return new XMLHttpRequest},qr.prototype.i=function(){return{}},Ei=new qr;function ft(o,l,d,p){this.j=o,this.i=l,this.l=d,this.R=p||1,this.U=new Un(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ba}function Ba(){this.i=null,this.g="",this.h=!1}var $a={},bi={};function Ti(o,l,d){o.L=1,o.v=Gr(tt(l)),o.m=d,o.P=!0,qa(o,null)}function qa(o,l){o.F=Date.now(),jr(o),o.A=tt(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),nc(d.i,"t",p),o.C=0,d=o.j.J,o.h=new Ba,o.g=wc(o.j,d?l:null,!o.m),0<o.O&&(o.M=new Ud(v(o.Y,o,o.g),o.O)),l=o.U,d=o.g,p=o.ca;var T="readystatechange";Array.isArray(T)||(T&&(ka[0]=T.toString()),T=ka);for(var A=0;A<T.length;A++){var P=Aa(d,T[A],p||l.handleEvent,!1,l.h||l);if(!P)break;l.g[P.key]=P}l=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),$n(),qd(o.i,o.u,o.A,o.l,o.R,o.m)}ft.prototype.ca=function(o){o=o.target;const l=this.M;l&&nt(o)==3?l.j():this.Y(o)},ft.prototype.Y=function(o){try{if(o==this.g)e:{const we=nt(this.g);var l=this.g.Ba();const on=this.g.Z();if(!(3>we)&&(we!=3||this.g&&(this.h.h||this.g.oa()||lc(this.g)))){this.J||we!=4||l==7||(l==8||0>=on?$n(3):$n(2)),Ii(this);var d=this.g.Z();this.X=d;t:if(ja(this)){var p=lc(this.g);o="";var T=p.length,A=nt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Lt(this),zn(this);var P="";break t}this.h.i=new u.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,o+=this.h.i.decode(p[l],{stream:!(A&&l==T-1)});p.length=0,this.h.g+=o,this.C=0,P=this.h.g}else P=this.g.oa();if(this.o=d==200,jd(this.i,this.u,this.A,this.l,this.R,we,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Q,de=this.g;if((Q=de.g?de.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(Q)){var W=Q;break t}}W=null}if(d=W)nn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ai(this,d);else{this.o=!1,this.s=3,xe(12),Lt(this),zn(this);break e}}if(this.P){d=!0;let Me;for(;!this.J&&this.C<P.length;)if(Me=Gd(this,P),Me==bi){we==4&&(this.s=4,xe(14),d=!1),nn(this.i,this.l,null,"[Incomplete Response]");break}else if(Me==$a){this.s=4,xe(15),nn(this.i,this.l,P,"[Invalid Chunk]"),d=!1;break}else nn(this.i,this.l,Me,null),Ai(this,Me);if(ja(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),we!=4||P.length!=0||this.h.h||(this.s=1,xe(16),d=!1),this.o=this.o&&d,!d)nn(this.i,this.l,P,"[Invalid Chunked Response]"),Lt(this),zn(this);else if(0<P.length&&!this.W){this.W=!0;var ve=this.j;ve.g==this&&ve.ba&&!ve.M&&(ve.j.info("Great, no buffering proxy detected. Bytes received: "+P.length),ki(ve),ve.M=!0,xe(11))}}else nn(this.i,this.l,P,null),Ai(this,P);we==4&&Lt(this),this.o&&!this.J&&(we==4?gc(this.j,this):(this.o=!1,jr(this)))}else uf(this.g),d==400&&0<P.indexOf("Unknown SID")?(this.s=3,xe(12)):(this.s=0,xe(13)),Lt(this),zn(this)}}}catch{}finally{}};function ja(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Gd(o,l){var d=o.C,p=l.indexOf(`
`,d);return p==-1?bi:(d=Number(l.substring(d,p)),isNaN(d)?$a:(p+=1,p+d>l.length?bi:(l=l.slice(p,p+d),o.C=p+d,l)))}ft.prototype.cancel=function(){this.J=!0,Lt(this)};function jr(o){o.S=Date.now()+o.I,za(o,o.I)}function za(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=qn(v(o.ba,o),l)}function Ii(o){o.B&&(u.clearTimeout(o.B),o.B=null)}ft.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(zd(this.i,this.A),this.L!=2&&($n(),xe(17)),Lt(this),this.s=2,zn(this)):za(this,this.S-o)};function zn(o){o.j.G==0||o.J||gc(o.j,o)}function Lt(o){Ii(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Da(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function Ai(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||xi(d.h,o))){if(!o.K&&xi(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Yr(d),Xr(d);else break e;Pi(d),xe(18)}}else d.za=T[1],0<d.za-d.T&&37500>T[2]&&d.F&&d.v==0&&!d.C&&(d.C=qn(v(d.Za,d),6e3));if(1>=Wa(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Ut(d,11)}else if((o.K||d.g==o)&&Yr(d),!B(l))for(T=d.Da.g.parse(l),l=0;l<T.length;l++){let W=T[l];if(d.T=W[0],W=W[1],d.G==2)if(W[0]=="c"){d.K=W[1],d.ia=W[2];const ve=W[3];ve!=null&&(d.la=ve,d.j.info("VER="+d.la));const we=W[4];we!=null&&(d.Aa=we,d.j.info("SVER="+d.Aa));const on=W[5];on!=null&&typeof on=="number"&&0<on&&(p=1.5*on,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Me=o.g;if(Me){const es=Me.g?Me.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(es){var A=p.h;A.g||es.indexOf("spdy")==-1&&es.indexOf("quic")==-1&&es.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Ri(A,A.h),A.h=null))}if(p.D){const Di=Me.g?Me.g.getResponseHeader("X-HTTP-Session-Id"):null;Di&&(p.ya=Di,J(p.I,p.D,Di))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var P=o;if(p.qa=vc(p,p.J?p.ia:null,p.W),P.K){Ka(p.h,P);var Q=P,de=p.L;de&&(Q.I=de),Q.B&&(Ii(Q),jr(Q)),p.g=P}else pc(p);0<d.i.length&&Jr(d)}else W[0]!="stop"&&W[0]!="close"||Ut(d,7);else d.G==3&&(W[0]=="stop"||W[0]=="close"?W[0]=="stop"?Ut(d,7):Ci(d):W[0]!="noop"&&d.l&&d.l.ta(W),d.v=0)}}$n(4)}catch{}}var Wd=class{constructor(o,l){this.g=o,this.map=l}};function Ha(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ga(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Wa(o){return o.h?1:o.g?o.g.size:0}function xi(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Ri(o,l){o.g?o.g.add(l):o.h=l}function Ka(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Ha.prototype.cancel=function(){if(this.i=Qa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Qa(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.D);return l}return N(o.i)}function Kd(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(h(o)){for(var l=[],d=o.length,p=0;p<d;p++)l.push(o[p]);return l}l=[],d=0;for(p in o)l[d++]=o[p];return l}function Qd(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(h(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(const p in o)l[d++]=p;return l}}}function Xa(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(h(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=Qd(o),p=Kd(o),T=p.length,A=0;A<T;A++)l.call(void 0,p[A],d&&d[A],o)}var Ja=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xd(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),T=null;if(0<=p){var A=o[d].substring(0,p);T=o[d].substring(p+1)}else A=o[d];l(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Ft(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Ft){this.h=o.h,zr(this,o.j),this.o=o.o,this.g=o.g,Hr(this,o.s),this.l=o.l;var l=o.i,d=new Wn;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Ya(this,d),this.m=o.m}else o&&(l=String(o).match(Ja))?(this.h=!1,zr(this,l[1]||"",!0),this.o=Hn(l[2]||""),this.g=Hn(l[3]||"",!0),Hr(this,l[4]),this.l=Hn(l[5]||"",!0),Ya(this,l[6]||"",!0),this.m=Hn(l[7]||"")):(this.h=!1,this.i=new Wn(null,this.h))}Ft.prototype.toString=function(){var o=[],l=this.j;l&&o.push(Gn(l,Za,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Gn(l,Za,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Gn(d,d.charAt(0)=="/"?Zd:Yd,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Gn(d,tf)),o.join("")};function tt(o){return new Ft(o)}function zr(o,l,d){o.j=d?Hn(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Hr(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function Ya(o,l,d){l instanceof Wn?(o.i=l,nf(o.i,o.h)):(d||(l=Gn(l,ef)),o.i=new Wn(l,o.h))}function J(o,l,d){o.i.set(l,d)}function Gr(o){return J(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Hn(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Gn(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Jd),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Jd(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Za=/[#\/\?@]/g,Yd=/[#\?:]/g,Zd=/[#\?]/g,ef=/[#\?@]/g,tf=/#/g;function Wn(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function pt(o){o.g||(o.g=new Map,o.h=0,o.i&&Xd(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Wn.prototype,n.add=function(o,l){pt(this),this.i=null,o=rn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function ec(o,l){pt(o),l=rn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function tc(o,l){return pt(o),l=rn(o,l),o.g.has(l)}n.forEach=function(o,l){pt(this),this.g.forEach(function(d,p){d.forEach(function(T){o.call(l,T,p,this)},this)},this)},n.na=function(){pt(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const T=o[p];for(let A=0;A<T.length;A++)d.push(l[p])}return d},n.V=function(o){pt(this);let l=[];if(typeof o=="string")tc(this,o)&&(l=l.concat(this.g.get(rn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},n.set=function(o,l){return pt(this),this.i=null,o=rn(this,o),tc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function nc(o,l,d){ec(o,l),0<d.length&&(o.i=null,o.g.set(rn(o,l),N(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const A=encodeURIComponent(String(p)),P=this.V(p);for(p=0;p<P.length;p++){var T=A;P[p]!==""&&(T+="="+encodeURIComponent(String(P[p]))),o.push(T)}}return this.i=o.join("&")};function rn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function nf(o,l){l&&!o.j&&(pt(o),o.i=null,o.g.forEach(function(d,p){var T=p.toLowerCase();p!=T&&(ec(this,p),nc(this,T,d))},o)),o.j=l}function rf(o,l){const d=new jn;if(u.Image){const p=new Image;p.onload=R(mt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=R(mt,d,"TestLoadImage: error",!1,l,p),p.onabort=R(mt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=R(mt,d,"TestLoadImage: timeout",!1,l,p),u.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function sf(o,l){const d=new jn,p=new AbortController,T=setTimeout(()=>{p.abort(),mt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(A=>{clearTimeout(T),A.ok?mt(d,"TestPingServer: ok",!0,l):mt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),mt(d,"TestPingServer: error",!1,l)})}function mt(o,l,d,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(d)}catch{}}function of(){this.g=new $d}function af(o,l,d){const p=d||"";try{Xa(o,function(T,A){let P=T;f(T)&&(P=yi(T)),l.push(p+A+"="+encodeURIComponent(P))})}catch(T){throw l.push(p+"type="+encodeURIComponent("_badmap")),T}}function Wr(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Wr,_i),Wr.prototype.g=function(){return new Kr(this.l,this.j)},Wr.prototype.i=function(o){return function(){return o}}({});function Kr(o,l){_e.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Kr,_e),n=Kr.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Qn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Kn(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Qn(this)),this.g&&(this.readyState=3,Qn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;rc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function rc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Kn(this):Qn(this),this.readyState==3&&rc(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Kn(this))},n.Qa=function(o){this.g&&(this.response=o,Kn(this))},n.ga=function(){this.g&&Kn(this)};function Kn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Qn(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Qn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Kr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function sc(o){let l="";return ge(o,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Si(o,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=sc(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):J(o,l,d))}function te(o){_e.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(te,_e);var cf=/^https?$/i,lf=["POST","PUT"];n=te.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ei.g(),this.v=this.o?Va(this.o):Va(Ei),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(A){ic(this,A);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)d.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const A of p.keys())d.set(A,p.get(A));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(A=>A.toLowerCase()=="content-type"),T=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(lf,l,void 0))||p||T||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,P]of d)this.g.setRequestHeader(A,P);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{cc(this),this.u=!0,this.g.send(o),this.u=!1}catch(A){ic(this,A)}};function ic(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,oc(o),Qr(o)}function oc(o){o.A||(o.A=!0,Ae(o,"complete"),Ae(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ae(this,"complete"),Ae(this,"abort"),Qr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qr(this,!0)),te.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ac(this):this.bb())},n.bb=function(){ac(this)};function ac(o){if(o.h&&typeof a<"u"&&(!o.v[1]||nt(o)!=4||o.Z()!=2)){if(o.u&&nt(o)==4)Ca(o.Ea,0,o);else if(Ae(o,"readystatechange"),nt(o)==4){o.h=!1;try{const P=o.Z();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=P===0){var T=String(o.D).match(Ja)[1]||null;!T&&u.self&&u.self.location&&(T=u.self.location.protocol.slice(0,-1)),p=!cf.test(T?T.toLowerCase():"")}d=p}if(d)Ae(o,"complete"),Ae(o,"success");else{o.m=6;try{var A=2<nt(o)?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.Z()+"]",oc(o)}}finally{Qr(o)}}}}function Qr(o,l){if(o.g){cc(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Ae(o,"ready");try{d.onreadystatechange=p}catch{}}}function cc(o){o.I&&(u.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function nt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<nt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Bd(l)}};function lc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function uf(o){const l={};o=(o.g&&2<=nt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(B(o[p]))continue;var d=E(o[p]);const T=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const A=l[T]||[];l[T]=A,A.push(d)}b(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xn(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function uc(o){this.Aa=0,this.i=[],this.j=new jn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xn("baseRetryDelayMs",5e3,o),this.cb=Xn("retryDelaySeedMs",1e4,o),this.Wa=Xn("forwardChannelMaxRetries",2,o),this.wa=Xn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ha(o&&o.concurrentRequestLimit),this.Da=new of,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=uc.prototype,n.la=8,n.G=1,n.connect=function(o,l,d,p){xe(0),this.W=o,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=vc(this,null,this.W),Jr(this)};function Ci(o){if(hc(o),o.G==3){var l=o.U++,d=tt(o.I);if(J(d,"SID",o.K),J(d,"RID",l),J(d,"TYPE","terminate"),Jn(o,d),l=new ft(o,o.j,l),l.L=2,l.v=Gr(tt(d)),d=!1,u.navigator&&u.navigator.sendBeacon)try{d=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&u.Image&&(new Image().src=l.v,d=!0),d||(l.g=wc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),jr(l)}_c(o)}function Xr(o){o.g&&(ki(o),o.g.cancel(),o.g=null)}function hc(o){Xr(o),o.u&&(u.clearTimeout(o.u),o.u=null),Yr(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function Jr(o){if(!Ga(o.h)&&!o.s){o.s=!0;var l=o.Ga;Mn||Ia(),Ln||(Mn(),Ln=!0),li.add(l,o),o.B=0}}function hf(o,l){return Wa(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=qn(v(o.Ga,o,l),yc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const T=new ft(this,this.j,o);let A=this.o;if(this.S&&(A?(A=m(A),w(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=fc(this,T,l),d=tt(this.I),J(d,"RID",o),J(d,"CVER",22),this.D&&J(d,"X-HTTP-Session-Id",this.D),Jn(this,d),A&&(this.O?l="headers="+encodeURIComponent(String(sc(A)))+"&"+l:this.m&&Si(d,this.m,A)),Ri(this.h,T),this.Ua&&J(d,"TYPE","init"),this.P?(J(d,"$req",l),J(d,"SID","null"),T.T=!0,Ti(T,d,null)):Ti(T,d,l),this.G=2}}else this.G==3&&(o?dc(this,o):this.i.length==0||Ga(this.h)||dc(this))};function dc(o,l){var d;l?d=l.l:d=o.U++;const p=tt(o.I);J(p,"SID",o.K),J(p,"RID",d),J(p,"AID",o.T),Jn(o,p),o.m&&o.o&&Si(p,o.m,o.o),d=new ft(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=fc(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ri(o.h,d),Ti(d,p,l)}function Jn(o,l){o.H&&ge(o.H,function(d,p){J(l,p,d)}),o.l&&Xa({},function(d,p){J(l,p,d)})}function fc(o,l,d){d=Math.min(o.i.length,d);var p=o.l?v(o.l.Na,o.l,o):null;e:{var T=o.i;let A=-1;for(;;){const P=["count="+d];A==-1?0<d?(A=T[0].g,P.push("ofs="+A)):A=0:P.push("ofs="+A);let Q=!0;for(let de=0;de<d;de++){let W=T[de].g;const ve=T[de].map;if(W-=A,0>W)A=Math.max(0,T[de].g-100),Q=!1;else try{af(ve,P,"req"+W+"_")}catch{p&&p(ve)}}if(Q){p=P.join("&");break e}}}return o=o.i.splice(0,d),l.D=o,p}function pc(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;Mn||Ia(),Ln||(Mn(),Ln=!0),li.add(l,o),o.v=0}}function Pi(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=qn(v(o.Fa,o),yc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,mc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=qn(v(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xe(10),Xr(this),mc(this))};function ki(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function mc(o){o.g=new ft(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=tt(o.qa);J(l,"RID","rpc"),J(l,"SID",o.K),J(l,"AID",o.T),J(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&J(l,"TO",o.ja),J(l,"TYPE","xmlhttp"),Jn(o,l),o.m&&o.o&&Si(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Gr(tt(l)),d.m=null,d.P=!0,qa(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Xr(this),Pi(this),xe(19))};function Yr(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function gc(o,l){var d=null;if(o.g==l){Yr(o),ki(o),o.g=null;var p=2}else if(xi(o.h,l))d=l.D,Ka(o.h,l),p=1;else return;if(o.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var T=o.B;p=Br(),Ae(p,new Fa(p,d)),Jr(o)}else pc(o);else if(T=l.s,T==3||T==0&&0<l.X||!(p==1&&hf(o,l)||p==2&&Pi(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),T){case 1:Ut(o,5);break;case 4:Ut(o,10);break;case 3:Ut(o,6);break;default:Ut(o,2)}}}function yc(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function Ut(o,l){if(o.j.info("Error code "+l),l==2){var d=v(o.fb,o),p=o.Xa;const T=!p;p=new Ft(p||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||zr(p,"https"),Gr(p),T?rf(p.toString(),d):sf(p.toString(),d)}else xe(2);o.G=0,o.l&&o.l.sa(l),_c(o),hc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),xe(2)):(this.j.info("Failed to ping google.com"),xe(1))};function _c(o){if(o.G=0,o.ka=[],o.l){const l=Qa(o.h);(l.length!=0||o.i.length!=0)&&(k(o.ka,l),k(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function vc(o,l,d){var p=d instanceof Ft?tt(d):new Ft(d);if(p.g!="")l&&(p.g=l+"."+p.g),Hr(p,p.s);else{var T=u.location;p=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var A=new Ft(null);p&&zr(A,p),l&&(A.g=l),T&&Hr(A,T),d&&(A.l=d),p=A}return d=o.D,l=o.ya,d&&l&&J(p,d,l),J(p,"VER",o.la),Jn(o,p),p}function wc(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new te(new Wr({eb:d})):new te(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ec(){}n=Ec.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Zr(){}Zr.prototype.g=function(o,l){return new De(o,l)};function De(o,l){_e.call(this),this.g=new uc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!B(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!B(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new sn(this)}C(De,_e),De.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},De.prototype.close=function(){Ci(this.g)},De.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=yi(o),o=d);l.i.push(new Wd(l.Ya++,o)),l.G==3&&Jr(l)},De.prototype.N=function(){this.g.l=null,delete this.j,Ci(this.g),delete this.g,De.aa.N.call(this)};function bc(o){vi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(bc,vi);function Tc(){wi.call(this),this.status=1}C(Tc,wi);function sn(o){this.g=o}C(sn,Ec),sn.prototype.ua=function(){Ae(this.g,"a")},sn.prototype.ta=function(o){Ae(this.g,new bc(o))},sn.prototype.sa=function(o){Ae(this.g,new Tc)},sn.prototype.ra=function(){Ae(this.g,"b")},Zr.prototype.createWebChannel=Zr.prototype.g,De.prototype.send=De.prototype.o,De.prototype.open=De.prototype.m,De.prototype.close=De.prototype.close,vu=function(){return new Zr},_u=function(){return Br()},yu=Mt,Yi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},$r.NO_ERROR=0,$r.TIMEOUT=8,$r.HTTP_ERROR=6,as=$r,Ua.COMPLETE="complete",gu=Ua,Na.EventType=Bn,Bn.OPEN="a",Bn.CLOSE="b",Bn.ERROR="c",Bn.MESSAGE="d",_e.prototype.listen=_e.prototype.K,Yn=Na,te.prototype.listenOnce=te.prototype.L,te.prototype.getLastError=te.prototype.Ka,te.prototype.getLastErrorCode=te.prototype.Ba,te.prototype.getStatus=te.prototype.Z,te.prototype.getResponseJson=te.prototype.Oa,te.prototype.getResponseText=te.prototype.oa,te.prototype.send=te.prototype.ea,te.prototype.setWithCredentials=te.prototype.Ha,mu=te}).apply(typeof ts<"u"?ts:typeof self<"u"?self:typeof window<"u"?window:{});const Mc="@firebase/firestore",Lc="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */let xn="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt=new Ao("@firebase/firestore");function an(){return Kt.logLevel}function V(n,...e){if(Kt.logLevel<=$.DEBUG){const t=e.map(So);Kt.debug(`Firestore (${xn}): ${n}`,...t)}}function at(n,...e){if(Kt.logLevel<=$.ERROR){const t=e.map(So);Kt.error(`Firestore (${xn}): ${n}`,...t)}}function yn(n,...e){if(Kt.logLevel<=$.WARN){const t=e.map(So);Kt.warn(`Firestore (${xn}): ${n}`,...t)}}function So(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function M(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,wu(n,r,t)}function wu(n,e,t){let r=`FIRESTORE (${xn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw at(r),new Error(r)}function K(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||wu(e,s,r)}function U(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Qp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(be.UNAUTHENTICATED))}shutdown(){}}class Xp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Jp{constructor(e){this.t=e,this.currentUser=be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){K(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let i=new At;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new At,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=i;e.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},u=h=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new At)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(K(typeof r.accessToken=="string",31837,{l:r}),new Eu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return K(e===null||typeof e=="string",2055,{h:e}),new be(e)}}class Yp{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=be.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Zp{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Yp(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Fc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class em{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Le(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){K(this.o===void 0,3512);const r=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Fc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(K(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Fc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=tm(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function q(n,e){return n<e?-1:n>e?1:0}function Zi(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Fi(s)===Fi(i)?q(s,i):Fi(s)?1:-1}return q(n.length,e.length)}const nm=55296,rm=57343;function Fi(n){const e=n.charCodeAt(0);return e>=nm&&e<=rm}function _n(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc="__name__";class je{constructor(e,t,r){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&M(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return je.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof je?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=je.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return q(e.length,t.length)}static compareSegments(e,t){const r=je.isNumericId(e),s=je.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?je.extractNumericId(e).compare(je.extractNumericId(t)):Zi(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return It.fromString(e.substring(4,e.length-2))}}class X extends je{construct(e,t,r){return new X(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(x.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new X(t)}static emptyPath(){return new X([])}}const sm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pe extends je{construct(e,t,r){return new pe(e,t,r)}static isValidIdentifier(e){return sm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Uc}static keyField(){return new pe([Uc])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new D(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new D(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new D(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(i(),s++)}if(i(),a)throw new D(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pe(t)}static emptyPath(){return new pe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(n,e,t){if(!t)throw new D(x.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function im(n,e,t,r){if(e===!0&&r===!0)throw new D(x.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Bc(n){if(!O.isDocumentKey(n))throw new D(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function $c(n){if(O.isDocumentKey(n))throw new D(x.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Tu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function $s(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function Ne(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=$s(n);throw new D(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function ae(n,e){const t={typeString:n};return e&&(t.value=e),t}function Er(n,e){if(!Tu(n))throw new D(x.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new D(x.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc=-62135596800,jc=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(e){return Y.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*jc);return new Y(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<qc)throw new D(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/jc}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Er(e,Y._jsonSchema))return new Y(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-qc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:ae("string",Y._jsonSchemaVersion),seconds:ae("number"),nanoseconds:ae("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(e){return new F(e)}static min(){return new F(new Y(0,0))}static max(){return new F(new Y(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ur=-1;function om(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=F.fromTimestamp(r===1e9?new Y(t+1,0):new Y(t,r));return new Rt(s,O.empty(),e)}function am(n){return new Rt(n.readTime,n.key,ur)}class Rt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Rt(F.min(),O.empty(),ur)}static max(){return new Rt(F.max(),O.empty(),ur)}}function cm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(n.documentKey,e.documentKey),t!==0?t:q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class um{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rn(n){if(n.code!==x.FAILED_PRECONDITION||n.message!==lm)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):S.reject(t)}static resolve(e){return new S((t,r)=>{t(e)})}static reject(e){return new S((t,r)=>{r(e)})}static waitFor(e){return new S((t,r)=>{let s=0,i=0,a=!1;e.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&t()},h=>r(h))}),a=!0,i===s&&t()})}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next(s=>s?S.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new S((r,s)=>{const i=e.length,a=new Array(i);let u=0;for(let h=0;h<i;h++){const f=h;t(e[f]).next(c=>{a[f]=c,++u,u===i&&r(a)},c=>s(c))}})}static doWhile(e,t){return new S((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function hm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Sn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class qs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}qs.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po=-1;function js(n){return n==null}function Es(n){return n===0&&1/n==-1/0}function dm(n){return typeof n=="number"&&Number.isInteger(n)&&!Es(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu="";function fm(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=zc(e)),e=pm(n.get(t),e);return zc(e)}function pm(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Iu:t+="";break;default:t+=i}}return t}function zc(n){return n+Iu+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Nt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Au(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e,t){this.comparator=e,this.root=t||fe.EMPTY}insert(e,t){return new ee(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,fe.BLACK,null,null))}remove(e){return new ee(this.comparator,this.root.remove(e,this.comparator).copy(null,null,fe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ns(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ns(this.root,e,this.comparator,!1)}getReverseIterator(){return new ns(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ns(this.root,e,this.comparator,!0)}}class ns{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class fe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??fe.RED,this.left=s??fe.EMPTY,this.right=i??fe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new fe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return fe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return fe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}fe.EMPTY=null,fe.RED=!0,fe.BLACK=!1;fe.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new fe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.comparator=e,this.data=new ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Gc(this.data.getIterator())}getIteratorFrom(e){return new Gc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ce(this.comparator);return t.data=e,t}}class Gc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.fields=e,e.sort(pe.comparator)}static empty(){return new Ve([])}unionWith(e){let t=new ce(pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ve(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return _n(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class xu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new xu("Invalid base64 string: "+i):i}}(e);return new me(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new me(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}me.EMPTY_BYTE_STRING=new me("");const mm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function St(n){if(K(!!n,39018),typeof n=="string"){let e=0;const t=mm.exec(n);if(K(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:re(n.seconds),nanos:re(n.nanos)}}function re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ct(n){return typeof n=="string"?me.fromBase64String(n):me.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="server_timestamp",Su="__type__",Cu="__previous_value__",Pu="__local_write_time__";function ko(n){return(n?.mapValue?.fields||{})[Su]?.stringValue===Ru}function zs(n){const e=n.mapValue.fields[Cu];return ko(e)?zs(e):e}function hr(n){const e=St(n.mapValue.fields[Pu].timestampValue);return new Y(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e,t,r,s,i,a,u,h,f,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=c}}const bs="(default)";class dr{constructor(e,t){this.projectId=e,this.database=t||bs}static empty(){return new dr("","")}get isDefaultDatabase(){return this.database===bs}isEqual(e){return e instanceof dr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ku="__type__",ym="__max__",rs={mapValue:{}},Du="__vector__",Ts="value";function Pt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ko(n)?4:vm(n)?9007199254740991:_m(n)?10:11:M(28295,{value:n})}function Xe(n,e){if(n===e)return!0;const t=Pt(n);if(t!==Pt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return hr(n).isEqual(hr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=St(s.timestampValue),u=St(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Ct(s.bytesValue).isEqual(Ct(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return re(s.geoPointValue.latitude)===re(i.geoPointValue.latitude)&&re(s.geoPointValue.longitude)===re(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return re(s.integerValue)===re(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=re(s.doubleValue),u=re(i.doubleValue);return a===u?Es(a)===Es(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return _n(n.arrayValue.values||[],e.arrayValue.values||[],Xe);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Hc(a)!==Hc(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Xe(a[h],u[h])))return!1;return!0}(n,e);default:return M(52216,{left:n})}}function fr(n,e){return(n.values||[]).find(t=>Xe(t,e))!==void 0}function vn(n,e){if(n===e)return 0;const t=Pt(n),r=Pt(e);if(t!==r)return q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return q(n.booleanValue,e.booleanValue);case 2:return function(i,a){const u=re(i.integerValue||i.doubleValue),h=re(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,e);case 3:return Wc(n.timestampValue,e.timestampValue);case 4:return Wc(hr(n),hr(e));case 5:return Zi(n.stringValue,e.stringValue);case 6:return function(i,a){const u=Ct(i),h=Ct(a);return u.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const u=i.split("/"),h=a.split("/");for(let f=0;f<u.length&&f<h.length;f++){const c=q(u[f],h[f]);if(c!==0)return c}return q(u.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const u=q(re(i.latitude),re(a.latitude));return u!==0?u:q(re(i.longitude),re(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Kc(n.arrayValue,e.arrayValue);case 10:return function(i,a){const u=i.fields||{},h=a.fields||{},f=u[Ts]?.arrayValue,c=h[Ts]?.arrayValue,y=q(f?.values?.length||0,c?.values?.length||0);return y!==0?y:Kc(f,c)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===rs.mapValue&&a===rs.mapValue)return 0;if(i===rs.mapValue)return 1;if(a===rs.mapValue)return-1;const u=i.fields||{},h=Object.keys(u),f=a.fields||{},c=Object.keys(f);h.sort(),c.sort();for(let y=0;y<h.length&&y<c.length;++y){const v=Zi(h[y],c[y]);if(v!==0)return v;const R=vn(u[h[y]],f[c[y]]);if(R!==0)return R}return q(h.length,c.length)}(n.mapValue,e.mapValue);default:throw M(23264,{he:t})}}function Wc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return q(n,e);const t=St(n),r=St(e),s=q(t.seconds,r.seconds);return s!==0?s:q(t.nanos,r.nanos)}function Kc(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=vn(t[s],r[s]);if(i)return i}return q(t.length,r.length)}function wn(n){return eo(n)}function eo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=St(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ct(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return O.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=eo(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${eo(t.fields[a])}`;return s+"}"}(n.mapValue):M(61005,{value:n})}function cs(n){switch(Pt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=zs(n);return e?16+cs(e):16;case 5:return 2*n.stringValue.length;case 6:return Ct(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+cs(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Nt(r.fields,(i,a)=>{s+=i.length+cs(a)}),s}(n.mapValue);default:throw M(13486,{value:n})}}function Qc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function to(n){return!!n&&"integerValue"in n}function Do(n){return!!n&&"arrayValue"in n}function Xc(n){return!!n&&"nullValue"in n}function Jc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ls(n){return!!n&&"mapValue"in n}function _m(n){return(n?.mapValue?.fields||{})[ku]?.stringValue===Du}function sr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Nt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=sr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=sr(n.arrayValue.values[t]);return e}return{...n}}function vm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ym}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.value=e}static empty(){return new Ce({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ls(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=sr(t)}setAll(e){let t=pe.emptyPath(),r={},s=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=sr(a):s.push(u.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ls(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Xe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ls(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Nt(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ce(sr(this.value))}}function Vu(n){const e=[];return Nt(n.fields,(t,r)=>{const s=new pe([t]);if(ls(r)){const i=Vu(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Ve(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t,r,s,i,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new Te(e,0,F.min(),F.min(),F.min(),Ce.empty(),0)}static newFoundDocument(e,t,r,s){return new Te(e,1,t,F.min(),r,s,0)}static newNoDocument(e,t){return new Te(e,2,t,F.min(),F.min(),Ce.empty(),0)}static newUnknownDocument(e,t){return new Te(e,3,t,F.min(),F.min(),Ce.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ce.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ce.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Te&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Te(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Is{constructor(e,t){this.position=e,this.inclusive=t}}function Yc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=O.comparator(O.fromName(a.referenceValue),t.key):r=vn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Zc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Xe(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class As{constructor(e,t="asc"){this.field=e,this.dir=t}}function wm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Nu{}class oe extends Nu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new bm(e,t,r):t==="array-contains"?new Am(e,r):t==="in"?new xm(e,r):t==="not-in"?new Rm(e,r):t==="array-contains-any"?new Sm(e,r):new oe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Tm(e,r):new Im(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(vn(t,this.value)):t!==null&&Pt(this.value)===Pt(t)&&this.matchesComparison(vn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Be extends Nu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Be(e,t)}matches(e){return Ou(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ou(n){return n.op==="and"}function Mu(n){return Em(n)&&Ou(n)}function Em(n){for(const e of n.filters)if(e instanceof Be)return!1;return!0}function no(n){if(n instanceof oe)return n.field.canonicalString()+n.op.toString()+wn(n.value);if(Mu(n))return n.filters.map(e=>no(e)).join(",");{const e=n.filters.map(t=>no(t)).join(",");return`${n.op}(${e})`}}function Lu(n,e){return n instanceof oe?function(r,s){return s instanceof oe&&r.op===s.op&&r.field.isEqual(s.field)&&Xe(r.value,s.value)}(n,e):n instanceof Be?function(r,s){return s instanceof Be&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,u)=>i&&Lu(a,s.filters[u]),!0):!1}(n,e):void M(19439)}function Fu(n){return n instanceof oe?function(t){return`${t.field.canonicalString()} ${t.op} ${wn(t.value)}`}(n):n instanceof Be?function(t){return t.op.toString()+" {"+t.getFilters().map(Fu).join(" ,")+"}"}(n):"Filter"}class bm extends oe{constructor(e,t,r){super(e,t,r),this.key=O.fromName(r.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class Tm extends oe{constructor(e,t){super(e,"in",t),this.keys=Uu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Im extends oe{constructor(e,t){super(e,"not-in",t),this.keys=Uu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Uu(n,e){return(e.arrayValue?.values||[]).map(t=>O.fromName(t.referenceValue))}class Am extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Do(t)&&fr(t.arrayValue,this.value)}}class xm extends oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&fr(this.value.arrayValue,t)}}class Rm extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(fr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!fr(this.value.arrayValue,t)}}class Sm extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Do(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>fr(this.value.arrayValue,r))}}/**
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
 */class Cm{constructor(e,t=null,r=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function el(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Cm(n,e,t,r,s,i,a)}function Vo(n){const e=U(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>no(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),js(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>wn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>wn(r)).join(",")),e.Te=t}return e.Te}function No(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!wm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Lu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Zc(n.startAt,e.startAt)&&Zc(n.endAt,e.endAt)}function ro(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t=null,r=[],s=[],i=null,a="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=h,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Pm(n,e,t,r,s,i,a,u){return new br(n,e,t,r,s,i,a,u)}function Oo(n){return new br(n)}function tl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Bu(n){return n.collectionGroup!==null}function ir(n){const e=U(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new ce(pe.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new As(i,r))}),t.has(pe.keyField().canonicalString())||e.Ie.push(new As(pe.keyField(),r))}return e.Ie}function ze(n){const e=U(n);return e.Ee||(e.Ee=km(e,ir(n))),e.Ee}function km(n,e){if(n.limitType==="F")return el(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new As(s.field,i)});const t=n.endAt?new Is(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Is(n.startAt.position,n.startAt.inclusive):null;return el(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function so(n,e){const t=n.filters.concat([e]);return new br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function io(n,e,t){return new br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Hs(n,e){return No(ze(n),ze(e))&&n.limitType===e.limitType}function $u(n){return`${Vo(ze(n))}|lt:${n.limitType}`}function cn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Fu(s)).join(", ")}]`),js(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>wn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>wn(s)).join(",")),`Target(${r})`}(ze(n))}; limitType=${n.limitType})`}function Gs(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):O.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of ir(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,u,h){const f=Yc(a,u,h);return a.inclusive?f<=0:f<0}(r.startAt,ir(r),s)||r.endAt&&!function(a,u,h){const f=Yc(a,u,h);return a.inclusive?f>=0:f>0}(r.endAt,ir(r),s))}(n,e)}function Dm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function qu(n){return(e,t)=>{let r=!1;for(const s of ir(n)){const i=Vm(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Vm(n,e,t){const r=n.field.isKeyField()?O.comparator(e.key,t.key):function(i,a,u){const h=a.data.field(i),f=u.data.field(i);return h!==null&&f!==null?vn(h,f):M(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Nt(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Au(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm=new ee(O.comparator);function ct(){return Nm}const ju=new ee(O.comparator);function Zn(...n){let e=ju;for(const t of n)e=e.insert(t.key,t);return e}function zu(n){let e=ju;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function $t(){return or()}function Hu(){return or()}function or(){return new Jt(n=>n.toString(),(n,e)=>n.isEqual(e))}const Om=new ee(O.comparator),Mm=new ce(O.comparator);function j(...n){let e=Mm;for(const t of n)e=e.add(t);return e}const Lm=new ce(q);function Fm(){return Lm}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Es(e)?"-0":e}}function Gu(n){return{integerValue:""+n}}function Um(n,e){return dm(e)?Gu(e):Mo(n,e)}/**
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
 */class Ws{constructor(){this._=void 0}}function Bm(n,e,t){return n instanceof pr?function(s,i){const a={fields:{[Su]:{stringValue:Ru},[Pu]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ko(i)&&(i=zs(i)),i&&(a.fields[Cu]=i),{mapValue:a}}(t,e):n instanceof mr?Ku(n,e):n instanceof gr?Qu(n,e):function(s,i){const a=Wu(s,i),u=nl(a)+nl(s.Ae);return to(a)&&to(s.Ae)?Gu(u):Mo(s.serializer,u)}(n,e)}function $m(n,e,t){return n instanceof mr?Ku(n,e):n instanceof gr?Qu(n,e):t}function Wu(n,e){return n instanceof xs?function(r){return to(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class pr extends Ws{}class mr extends Ws{constructor(e){super(),this.elements=e}}function Ku(n,e){const t=Xu(e);for(const r of n.elements)t.some(s=>Xe(s,r))||t.push(r);return{arrayValue:{values:t}}}class gr extends Ws{constructor(e){super(),this.elements=e}}function Qu(n,e){let t=Xu(e);for(const r of n.elements)t=t.filter(s=>!Xe(s,r));return{arrayValue:{values:t}}}class xs extends Ws{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function nl(n){return re(n.integerValue||n.doubleValue)}function Xu(n){return Do(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e,t){this.field=e,this.transform=t}}function jm(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof mr&&s instanceof mr||r instanceof gr&&s instanceof gr?_n(r.elements,s.elements,Xe):r instanceof xs&&s instanceof xs?Xe(r.Ae,s.Ae):r instanceof pr&&s instanceof pr}(n.transform,e.transform)}class zm{constructor(e,t){this.version=e,this.transformResults=t}}class Re{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Re}static exists(e){return new Re(void 0,e)}static updateTime(e){return new Re(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function us(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ks{}function Ju(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Qs(n.key,Re.none()):new Tr(n.key,n.data,Re.none());{const t=n.data,r=Ce.empty();let s=new ce(pe.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Ot(n.key,r,new Ve(s.toArray()),Re.none())}}function Hm(n,e,t){n instanceof Tr?function(s,i,a){const u=s.value.clone(),h=sl(s.fieldTransforms,i,a.transformResults);u.setAll(h),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Ot?function(s,i,a){if(!us(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=sl(s.fieldTransforms,i,a.transformResults),h=i.data;h.setAll(Yu(s)),h.setAll(u),i.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function ar(n,e,t,r){return n instanceof Tr?function(i,a,u,h){if(!us(i.precondition,a))return u;const f=i.value.clone(),c=il(i.fieldTransforms,h,a);return f.setAll(c),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ot?function(i,a,u,h){if(!us(i.precondition,a))return u;const f=il(i.fieldTransforms,h,a),c=a.data;return c.setAll(Yu(i)),c.setAll(f),a.convertToFoundDocument(a.version,c).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(i,a,u){return us(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function Gm(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Wu(r.transform,s||null);i!=null&&(t===null&&(t=Ce.empty()),t.set(r.field,i))}return t||null}function rl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&_n(r,s,(i,a)=>jm(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Tr extends Ks{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ot extends Ks{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Yu(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function sl(n,e,t){const r=new Map;K(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,u=e.data.field(i.field);r.set(i.field,$m(a,u,t[s]))}return r}function il(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Bm(i,a,e))}return r}class Qs extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Wm extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Hm(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ar(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ar(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Hu();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;const h=Ju(a,u);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),j())}isEqual(e){return this.batchId===e.batchId&&_n(this.mutations,e.mutations,(t,r)=>rl(t,r))&&_n(this.baseMutations,e.baseMutations,(t,r)=>rl(t,r))}}class Lo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){K(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return Om}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Lo(e,t,r,s)}}/**
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
 */class Qm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Xm{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie,G;function Jm(n){switch(n){case x.OK:return M(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function Zu(n){if(n===void 0)return at("GRPC error has no .code"),x.UNKNOWN;switch(n){case ie.OK:return x.OK;case ie.CANCELLED:return x.CANCELLED;case ie.UNKNOWN:return x.UNKNOWN;case ie.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case ie.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case ie.INTERNAL:return x.INTERNAL;case ie.UNAVAILABLE:return x.UNAVAILABLE;case ie.UNAUTHENTICATED:return x.UNAUTHENTICATED;case ie.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case ie.NOT_FOUND:return x.NOT_FOUND;case ie.ALREADY_EXISTS:return x.ALREADY_EXISTS;case ie.PERMISSION_DENIED:return x.PERMISSION_DENIED;case ie.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case ie.ABORTED:return x.ABORTED;case ie.OUT_OF_RANGE:return x.OUT_OF_RANGE;case ie.UNIMPLEMENTED:return x.UNIMPLEMENTED;case ie.DATA_LOSS:return x.DATA_LOSS;default:return M(39323,{code:n})}}(G=ie||(ie={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Ym(){return new TextEncoder}/**
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
 */const Zm=new It([4294967295,4294967295],0);function ol(n){const e=Ym().encode(n),t=new pu;return t.update(e),new Uint8Array(t.digest())}function al(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new It([t,r],0),new It([s,i],0)]}class Fo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new er(`Invalid padding: ${t}`);if(r<0)throw new er(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new er(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new er(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=It.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(It.fromNumber(r)));return s.compare(Zm)===1&&(s=new It([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=ol(e),[r,s]=al(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Fo(i,s,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.ge===0)return;const t=ol(e),[r,s]=al(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class er extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ir.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Xs(F.min(),s,new ee(q),ct(),j())}}class Ir{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ir(r,t,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class eh{constructor(e,t){this.targetId=e,this.Ce=t}}class th{constructor(e,t,r=me.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class cl{constructor(){this.ve=0,this.Fe=ll(),this.Me=me.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=j(),t=j(),r=j();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:i})}}),new Ir(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=ll()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,K(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class eg{constructor(e){this.Ge=e,this.ze=new Map,this.je=ct(),this.Je=ss(),this.He=ss(),this.Ye=new ee(q)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(ro(i))if(r===0){const a=new O(i.path);this.et(t,a,Te.newNoDocument(a,F.min()))}else K(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const u=this.ut(e),h=u?this.ct(u,e,a):1;if(h!==0){this.it(t);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,f)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,u;try{a=Ct(r).toUint8Array()}catch(h){if(h instanceof xu)return yn("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new Fo(a,s,i)}catch(h){return yn(h instanceof er?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.ge===0?null:u}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const u=this.ot(a);if(u){if(i.current&&ro(u.target)){const h=new O(u.target.path);this.It(h).has(a)||this.Et(a,h)||this.et(a,h,Te.newNoDocument(h,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=j();this.He.forEach((i,a)=>{let u=!0;a.forEachWhile(h=>{const f=this.ot(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new Xs(e,t,this.Ye,this.je,r);return this.je=ct(),this.Je=ss(),this.He=ss(),this.Ye=new ee(q),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new cl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new ce(q),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ce(q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new cl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ss(){return new ee(O.comparator)}function ll(){return new ee(O.comparator)}const tg={asc:"ASCENDING",desc:"DESCENDING"},ng={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rg={and:"AND",or:"OR"};class sg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function oo(n,e){return n.useProto3Json||js(e)?e:{value:e}}function Rs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function nh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ig(n,e){return Rs(n,e.toTimestamp())}function He(n){return K(!!n,49232),F.fromTimestamp(function(t){const r=St(t);return new Y(r.seconds,r.nanos)}(n))}function Uo(n,e){return ao(n,e).canonicalString()}function ao(n,e){const t=function(s){return new X(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function rh(n){const e=X.fromString(n);return K(ch(e),10190,{key:e.toString()}),e}function co(n,e){return Uo(n.databaseId,e.path)}function Ui(n,e){const t=rh(e);if(t.get(1)!==n.databaseId.projectId)throw new D(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new O(ih(t))}function sh(n,e){return Uo(n.databaseId,e)}function og(n){const e=rh(n);return e.length===4?X.emptyPath():ih(e)}function lo(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ih(n){return K(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function ul(n,e,t){return{name:co(n,e),fields:t.value.mapValue.fields}}function ag(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(f,c){return f.useProto3Json?(K(c===void 0||typeof c=="string",58123),me.fromBase64String(c||"")):(K(c===void 0||c instanceof Buffer||c instanceof Uint8Array,16193),me.fromUint8Array(c||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(f){const c=f.code===void 0?x.UNKNOWN:Zu(f.code);return new D(c,f.message||"")}(a);t=new th(r,s,i,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ui(n,r.document.name),i=He(r.document.updateTime),a=r.document.createTime?He(r.document.createTime):F.min(),u=new Ce({mapValue:{fields:r.document.fields}}),h=Te.newFoundDocument(s,i,a,u),f=r.targetIds||[],c=r.removedTargetIds||[];t=new hs(f,c,h.key,h)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ui(n,r.document),i=r.readTime?He(r.readTime):F.min(),a=Te.newNoDocument(s,i),u=r.removedTargetIds||[];t=new hs([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ui(n,r.document),i=r.removedTargetIds||[];t=new hs([],i,s,null)}else{if(!("filter"in e))return M(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Xm(s,i),u=r.targetId;t=new eh(u,a)}}return t}function cg(n,e){let t;if(e instanceof Tr)t={update:ul(n,e.key,e.value)};else if(e instanceof Qs)t={delete:co(n,e.key)};else if(e instanceof Ot)t={update:ul(n,e.key,e.data),updateMask:yg(e.fieldMask)};else{if(!(e instanceof Wm))return M(16599,{Vt:e.type});t={verify:co(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const u=a.transform;if(u instanceof pr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof mr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof gr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof xs)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw M(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:ig(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)}(n,e.precondition)),t}function lg(n,e){return n&&n.length>0?(K(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?He(s.updateTime):He(i);return a.isEqual(F.min())&&(a=He(i)),new zm(a,s.transformResults||[])}(t,e))):[]}function ug(n,e){return{documents:[sh(n,e.path)]}}function hg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=sh(n,s);const i=function(f){if(f.length!==0)return ah(Be.create(f,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(f){if(f.length!==0)return f.map(c=>function(v){return{field:ln(v.field),direction:pg(v.dir)}}(c))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=oo(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{ft:t,parent:s}}function dg(n){let e=og(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){K(r===1,65062);const c=t.from[0];c.allDescendants?s=c.collectionId:e=e.child(c.collectionId)}let i=[];t.where&&(i=function(y){const v=oh(y);return v instanceof Be&&Mu(v)?v.getFilters():[v]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(v=>function(C){return new As(un(C.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(v))}(t.orderBy));let u=null;t.limit&&(u=function(y){let v;return v=typeof y=="object"?y.value:y,js(v)?null:v}(t.limit));let h=null;t.startAt&&(h=function(y){const v=!!y.before,R=y.values||[];return new Is(R,v)}(t.startAt));let f=null;return t.endAt&&(f=function(y){const v=!y.before,R=y.values||[];return new Is(R,v)}(t.endAt)),Pm(e,s,a,i,u,"F",h,f)}function fg(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function oh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=un(t.unaryFilter.field);return oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=un(t.unaryFilter.field);return oe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=un(t.unaryFilter.field);return oe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=un(t.unaryFilter.field);return oe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(t){return oe.create(un(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Be.create(t.compositeFilter.filters.map(r=>oh(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(t.compositeFilter.op))}(n):M(30097,{filter:n})}function pg(n){return tg[n]}function mg(n){return ng[n]}function gg(n){return rg[n]}function ln(n){return{fieldPath:n.canonicalString()}}function un(n){return pe.fromServerFormat(n.fieldPath)}function ah(n){return n instanceof oe?function(t){if(t.op==="=="){if(Jc(t.value))return{unaryFilter:{field:ln(t.field),op:"IS_NAN"}};if(Xc(t.value))return{unaryFilter:{field:ln(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Jc(t.value))return{unaryFilter:{field:ln(t.field),op:"IS_NOT_NAN"}};if(Xc(t.value))return{unaryFilter:{field:ln(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ln(t.field),op:mg(t.op),value:t.value}}}(n):n instanceof Be?function(t){const r=t.getFilters().map(s=>ah(s));return r.length===1?r[0]:{compositeFilter:{op:gg(t.op),filters:r}}}(n):M(54877,{filter:n})}function yg(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ch(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t,r,s,i=F.min(),a=F.min(),u=me.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(e){return new wt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e){this.yt=e}}function vg(n){const e=dg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?io(e,e.limit,"L"):e}/**
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
 */class wg{constructor(){this.Cn=new Eg}addToCollectionParentIndex(e,t){return this.Cn.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(Rt.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(Rt.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class Eg{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ce(X.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ce(X.comparator)).toArray()}}/**
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
 */const hl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lh=41943040;class Se{static withCacheSize(e){return new Se(e,Se.DEFAULT_COLLECTION_PERCENTILE,Se.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Se.DEFAULT_COLLECTION_PERCENTILE=10,Se.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Se.DEFAULT=new Se(lh,Se.DEFAULT_COLLECTION_PERCENTILE,Se.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Se.DISABLED=new Se(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new En(0)}static cr(){return new En(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl="LruGarbageCollector",bg=1048576;function fl([n,e],[t,r]){const s=q(n,t);return s===0?q(e,r):s}class Tg{constructor(e){this.Ir=e,this.buffer=new ce(fl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();fl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Ig{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){V(dl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Sn(t)?V(dl,"Ignoring IndexedDB error during garbage collection: ",t):await Rn(t)}await this.Vr(3e5)})}}class Ag{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return S.resolve(qs.ce);const r=new Tg(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(hl)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),hl):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,u,h,f;const c=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(y=>(y>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),s=this.params.maximumSequenceNumbersToCollect):s=y,a=Date.now(),this.nthSequenceNumber(e,s))).next(y=>(r=y,u=Date.now(),this.removeTargets(e,r,t))).next(y=>(i=y,h=Date.now(),this.removeOrphanedDocuments(e,r))).next(y=>(f=Date.now(),an()<=$.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-c}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(h-u)+`ms
	Removed ${y} documents in `+(f-h)+`ms
Total Duration: ${f-c}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:y})))}}function xg(n,e){return new Ag(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(){this.changes=new Jt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Te.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Sg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&ar(r.mutation,s,Ve.empty(),Y.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,j()).next(()=>r))}getLocalViewOfDocuments(e,t,r=j()){const s=$t();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Zn();return i.forEach((u,h)=>{a=a.insert(u,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=$t();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,j()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,s){let i=ct();const a=or(),u=function(){return or()}();return t.forEach((h,f)=>{const c=r.get(f.key);s.has(f.key)&&(c===void 0||c.mutation instanceof Ot)?i=i.insert(f.key,f):c!==void 0?(a.set(f.key,c.mutation.getFieldMask()),ar(c.mutation,f,c.mutation.getFieldMask(),Y.now())):a.set(f.key,Ve.empty())}),this.recalculateAndSaveOverlays(e,i).next(h=>(h.forEach((f,c)=>a.set(f,c)),t.forEach((f,c)=>u.set(f,new Sg(c,a.get(f)??null))),u))}recalculateAndSaveOverlays(e,t){const r=or();let s=new ee((a,u)=>a-u),i=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const u of a)u.keys().forEach(h=>{const f=t.get(h);if(f===null)return;let c=r.get(h)||Ve.empty();c=u.applyToLocalView(f,c),r.set(h,c);const y=(s.get(u.batchId)||j()).add(h);s=s.insert(u.batchId,y)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,c=h.value,y=Hu();c.forEach(v=>{if(!i.has(v)){const R=Ju(t.get(v),r.get(v));R!==null&&y.set(v,R),i=i.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,y))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Bu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):S.resolve($t());let u=ur,h=i;return a.next(f=>S.forEach(f,(c,y)=>(u<y.largestBatchId&&(u=y.largestBatchId),i.get(c)?S.resolve():this.remoteDocumentCache.getEntry(e,c).next(v=>{h=h.insert(c,v)}))).next(()=>this.populateOverlays(e,f,i)).next(()=>this.computeViews(e,h,f,j())).next(c=>({batchId:u,changes:zu(c)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next(r=>{let s=Zn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Zn();return this.indexManager.getCollectionParents(e,i).next(u=>S.forEach(u,h=>{const f=function(y,v){return new br(v,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,h.child(i));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next(c=>{c.forEach((y,v)=>{a=a.insert(y,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((h,f)=>{const c=f.getKey();a.get(c)===null&&(a=a.insert(c,Te.newInvalidDocument(c)))});let u=Zn();return a.forEach((h,f)=>{const c=i.get(h);c!==void 0&&ar(c.mutation,f,Ve.empty(),Y.now()),Gs(t,f)&&(u=u.insert(h,f))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return S.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:He(s.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:vg(s.bundledQuery),readTime:He(s.readTime)}}(t)),S.resolve()}}/**
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
 */class kg{constructor(){this.overlays=new ee(O.comparator),this.qr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=$t();return S.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),S.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const s=$t(),i=t.length+1,a=new O(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===i&&h.largestBatchId>r&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ee((f,c)=>f-c);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let c=i.get(f.largestBatchId);c===null&&(c=$t(),i=i.insert(f.largestBatchId,c)),c.set(f.getKey(),f)}}const u=$t(),h=i.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,c)=>u.set(f,c)),!(u.size()>=s)););return S.resolve(u)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Qm(t,r));let i=this.qr.get(t);i===void 0&&(i=j(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
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
 */class Dg{constructor(){this.sessionToken=me.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(){this.Qr=new ce(ue.$r),this.Ur=new ce(ue.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new ue(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new ue(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new O(new X([])),r=new ue(t,e),s=new ue(t,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new O(new X([])),r=new ue(t,e),s=new ue(t,e+1);let i=j();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new ue(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ue{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return O.comparator(e.key,t.key)||q(e.Yr,t.Yr)}static Kr(e,t){return q(e.Yr,t.Yr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new ce(ue.$r)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Km(i,t,r,s);this.mutationQueue.push(a);for(const u of s)this.Zr=this.Zr.add(new ue(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return S.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Po:this.tr-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ue(t,0),s=new ue(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const u=this.Xr(a.Yr);i.push(u)}),S.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(q);return t.forEach(s=>{const i=new ue(s,0),a=new ue(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],u=>{r=r.add(u.Yr)})}),S.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;O.isDocumentKey(i)||(i=i.child(""));const a=new ue(new O(i),0);let u=new ce(q);return this.Zr.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(u=u.add(h.Yr)),!0)},a),S.resolve(this.ti(u))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){K(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return S.forEach(t.mutations,s=>{const i=new ue(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new ue(t,0),s=this.Zr.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e){this.ri=e,this.docs=function(){return new ee(O.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():Te.newInvalidDocument(t))}getEntries(e,t){let r=ct();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Te.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=ct();const a=t.path,u=new O(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:c}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||cm(am(c),r)<=0||(s.has(c.key)||Gs(t,c))&&(i=i.insert(c.key,c.mutableCopy()))}return S.resolve(i)}getAllFromCollectionGroup(e,t,r,s){M(9500)}ii(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Og(this)}getSize(e){return S.resolve(this.size)}}class Og extends Rg{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(e){this.persistence=e,this.si=new Jt(t=>Vo(t),No),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.oi=0,this._i=new Bo,this.targetCount=0,this.ai=En.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),S.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new En(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.Pr(t),S.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),S.waitFor(i).next(()=>s)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),S.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),S.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,t){this.ui={},this.overlays={},this.ci=new qs(0),this.li=!1,this.li=!0,this.hi=new Dg,this.referenceDelegate=e(this),this.Pi=new Mg(this),this.indexManager=new wg,this.remoteDocumentCache=function(s){return new Ng(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new _g(t),this.Ii=new Pg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new kg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new Vg(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);const s=new Lg(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return S.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class Lg extends um{constructor(e){super(),this.currentSequenceNumber=e}}class $o{constructor(e){this.persistence=e,this.Ri=new Bo,this.Vi=null}static mi(e){return new $o(e)}get fi(){if(this.Vi)return this.Vi;throw M(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),S.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.fi,r=>{const s=O.fromPath(r);return this.gi(e,s).next(i=>{i||t.removeEntry(s,F.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return S.or([()=>S.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Ss{constructor(e,t){this.persistence=e,this.pi=new Jt(r=>fm(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=xg(this,t)}static mi(e,t){return new Ss(e,t)}Ei(){}di(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return S.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?S.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(u=>{u||(r++,i.removeEntry(a,F.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),S.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=cs(e.data.value)),t}br(e,t,r){return S.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=j(),s=j();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new qo(e,t.fromCache,r,s)}}/**
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
 */class Fg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ug{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return kf()?8:hm(Ie())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Fg;return this.Ss(e,t,a).next(u=>{if(i.result=u,this.Vs)return this.bs(e,t,a,u.size)})}).next(()=>i.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(an()<=$.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",cn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),S.resolve()):(an()<=$.DEBUG&&V("QueryEngine","Query:",cn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(an()<=$.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",cn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ze(t))):S.resolve())}ys(e,t){if(tl(t))return S.resolve(null);let r=ze(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=io(t,null,"F"),r=ze(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=j(...i);return this.ps.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(h=>{const f=this.Ds(t,u);return this.Cs(t,f,a,h.readTime)?this.ys(e,io(t,null,"F")):this.vs(e,f,t,h)}))})))}ws(e,t,r,s){return tl(t)||s.isEqual(F.min())?S.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?S.resolve(null):(an()<=$.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),cn(t)),this.vs(e,a,t,om(s,ur)).next(u=>u))})}Ds(e,t){let r=new ce(qu(e));return t.forEach((s,i)=>{Gs(e,i)&&(r=r.add(i))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return an()<=$.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",cn(t)),this.ps.getDocumentsMatchingQuery(e,t,Rt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo="LocalStore",Bg=3e8;class $g{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new ee(q),this.xs=new Jt(i=>Vo(i),No),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Cg(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function qg(n,e,t,r){return new $g(n,e,t,r)}async function hh(n,e){const t=U(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],u=[];let h=j();for(const f of s){a.push(f.batchId);for(const c of f.mutations)h=h.add(c.key)}for(const f of i){u.push(f.batchId);for(const c of f.mutations)h=h.add(c.key)}return t.localDocuments.getDocuments(r,h).next(f=>({Ls:f,removedBatchIds:a,addedBatchIds:u}))})})}function jg(n,e){const t=U(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(u,h,f,c){const y=f.batch,v=y.keys();let R=S.resolve();return v.forEach(C=>{R=R.next(()=>c.getEntry(h,C)).next(N=>{const k=f.docVersions.get(C);K(k!==null,48541),N.version.compareTo(k)<0&&(y.applyToRemoteDocument(N,f),N.isValidDocument()&&(N.setReadTime(f.commitVersion),c.addEntry(N)))})}),R.next(()=>u.mutationQueue.removeMutationBatch(h,y))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=j();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function dh(n){const e=U(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function zg(n,e){const t=U(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const u=[];e.targetChanges.forEach((c,y)=>{const v=s.get(y);if(!v)return;u.push(t.Pi.removeMatchingKeys(i,c.removedDocuments,y).next(()=>t.Pi.addMatchingKeys(i,c.addedDocuments,y)));let R=v.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(y)!==null?R=R.withResumeToken(me.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):c.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(c.resumeToken,r)),s=s.insert(y,R),function(N,k,z){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Bg?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(v,R,c)&&u.push(t.Pi.updateTargetData(i,R))});let h=ct(),f=j();if(e.documentUpdates.forEach(c=>{e.resolvedLimboDocuments.has(c)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,c))}),u.push(Hg(i,a,e.documentUpdates).next(c=>{h=c.ks,f=c.qs})),!r.isEqual(F.min())){const c=t.Pi.getLastRemoteSnapshotVersion(i).next(y=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(c)}return S.waitFor(u).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,h,f)).next(()=>h)}).then(i=>(t.Ms=s,i))}function Hg(n,e,t){let r=j(),s=j();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=ct();return t.forEach((u,h)=>{const f=i.get(u);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(u)),h.isNoDocument()&&h.version.isEqual(F.min())?(e.removeEntry(u,h.readTime),a=a.insert(u,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(h),a=a.insert(u,h)):V(jo,"Ignoring outdated watch update for ",u,". Current version:",f.version," Watch version:",h.version)}),{ks:a,qs:s}})}function Gg(n,e){const t=U(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Po),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Wg(n,e){const t=U(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(i=>i?(s=i,S.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new wt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function uo(n,e,t){const r=U(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Sn(a))throw a;V(jo,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function pl(n,e,t){const r=U(n);let s=F.min(),i=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,c){const y=U(h),v=y.xs.get(c);return v!==void 0?S.resolve(y.Ms.get(v)):y.Pi.getTargetData(f,c)}(r,a,ze(e)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,u.targetId).next(h=>{i=h})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:F.min(),t?i:j())).next(u=>(Kg(r,Dm(e),u),{documents:u,Qs:i})))}function Kg(n,e,t){let r=n.Os.get(e)||F.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Os.set(e,r)}class ml{constructor(){this.activeTargetIds=Fm()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Qg{constructor(){this.Mo=new ml,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new ml,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Xg{Oo(e){}shutdown(){}}/**
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
 */const gl="ConnectivityMonitor";class yl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){V(gl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){V(gl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let is=null;function ho(){return is===null?is=function(){return 268435456+Math.round(2147483648*Math.random())}():is++,"0x"+is.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi="RestConnection",Jg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Yg{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===bs?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=ho(),u=this.zo(e,t.toUriEncodedString());V(Bi,`Sending RPC '${e}' ${a}:`,u,r);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(h,s,i);const{host:f}=new URL(u),c=In(f);return this.Jo(e,u,h,r,c).then(y=>(V(Bi,`Received RPC '${e}' ${a}: `,y),y),y=>{throw yn(Bi,`RPC '${e}' ${a} failed with error: `,y,"url: ",u,"request:",r),y})}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+xn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const r=Jg[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="WebChannelConnection";class ey extends Yg{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=ho();return new Promise((u,h)=>{const f=new mu;f.setWithCredentials(!0),f.listenOnce(gu.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case as.NO_ERROR:const y=f.getResponseJson();V(Ee,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(y)),u(y);break;case as.TIMEOUT:V(Ee,`RPC '${e}' ${a} timed out`),h(new D(x.DEADLINE_EXCEEDED,"Request time out"));break;case as.HTTP_ERROR:const v=f.getStatus();if(V(Ee,`RPC '${e}' ${a} failed with status:`,v,"response text:",f.getResponseText()),v>0){let R=f.getResponseJson();Array.isArray(R)&&(R=R[0]);const C=R?.error;if(C&&C.status&&C.message){const N=function(z){const B=z.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(B)>=0?B:x.UNKNOWN}(C.status);h(new D(N,C.message))}else h(new D(x.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new D(x.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:e,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{V(Ee,`RPC '${e}' ${a} completed.`)}});const c=JSON.stringify(s);V(Ee,`RPC '${e}' ${a} sending request:`,s),f.send(t,"POST",c,r,15)})}T_(e,t,r){const s=ho(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=vu(),u=_u(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.jo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const c=i.join("");V(Ee,`Creating RPC '${e}' stream ${s}: ${c}`,h);const y=a.createWebChannel(c,h);this.I_(y);let v=!1,R=!1;const C=new Zg({Yo:k=>{R?V(Ee,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(v||(V(Ee,`Opening RPC '${e}' stream ${s} transport.`),y.open(),v=!0),V(Ee,`RPC '${e}' stream ${s} sending:`,k),y.send(k))},Zo:()=>y.close()}),N=(k,z,B)=>{k.listen(z,H=>{try{B(H)}catch(he){setTimeout(()=>{throw he},0)}})};return N(y,Yn.EventType.OPEN,()=>{R||(V(Ee,`RPC '${e}' stream ${s} transport opened.`),C.o_())}),N(y,Yn.EventType.CLOSE,()=>{R||(R=!0,V(Ee,`RPC '${e}' stream ${s} transport closed`),C.a_(),this.E_(y))}),N(y,Yn.EventType.ERROR,k=>{R||(R=!0,yn(Ee,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),C.a_(new D(x.UNAVAILABLE,"The operation could not be completed")))}),N(y,Yn.EventType.MESSAGE,k=>{if(!R){const z=k.data[0];K(!!z,16349);const B=z,H=B?.error||B[0]?.error;if(H){V(Ee,`RPC '${e}' stream ${s} received error:`,H);const he=H.status;let qe=function(m){const _=ie[m];if(_!==void 0)return Zu(_)}(he),ge=H.message;qe===void 0&&(qe=x.INTERNAL,ge="Unknown error status: "+he+" with message "+H.message),R=!0,C.a_(new D(qe,ge)),y.close()}else V(Ee,`RPC '${e}' stream ${s} received:`,z),C.u_(z)}}),N(u,yu.STAT_EVENT,k=>{k.stat===Yi.PROXY?V(Ee,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Yi.NOPROXY&&V(Ee,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.__()},0),C}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function $i(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(n){return new sg(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _l="PersistentStream";class ph{constructor(e,t,r,s,i,a,u,h){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new fh(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(at(t.toString()),at("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new D(x.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return V(_l,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(V(_l,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ty extends ph{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=ag(this.serializer,e),r=function(i){if(!("targetChange"in i))return F.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?He(a.readTime):F.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=lo(this.serializer),t.addTarget=function(i,a){let u;const h=a.target;if(u=ro(h)?{documents:ug(i,h)}:{query:hg(i,h).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=nh(i,a.resumeToken);const f=oo(i,a.expectedCount);f!==null&&(u.expectedCount=f)}else if(a.snapshotVersion.compareTo(F.min())>0){u.readTime=Rs(i,a.snapshotVersion.toTimestamp());const f=oo(i,a.expectedCount);f!==null&&(u.expectedCount=f)}return u}(this.serializer,e);const r=fg(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=lo(this.serializer),t.removeTarget=e,this.q_(t)}}class ny extends ph{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return K(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,K(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){K(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=lg(e.writeResults,e.commitTime),r=He(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=lo(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>cg(this.serializer,r))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{}class sy extends ry{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(x.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,ao(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(x.UNKNOWN,i.toString())})}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Ho(e,ao(t,r),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(x.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class iy{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(at(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt="RemoteStore";class oy{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{Yt(this)&&(V(Qt,"Restarting streams for network reachability change."),await async function(h){const f=U(h);f.Ea.add(4),await Ar(f),f.Ra.set("Unknown"),f.Ea.delete(4),await Ys(f)}(this))})}),this.Ra=new iy(r,s)}}async function Ys(n){if(Yt(n))for(const e of n.da)await e(!0)}async function Ar(n){for(const e of n.da)await e(!1)}function mh(n,e){const t=U(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Wo(t)?Go(t):Cn(t).O_()&&Ho(t,e))}function zo(n,e){const t=U(n),r=Cn(t);t.Ia.delete(e),r.O_()&&gh(t,e),t.Ia.size===0&&(r.O_()?r.L_():Yt(t)&&t.Ra.set("Unknown"))}function Ho(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(F.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Cn(n).Y_(e)}function gh(n,e){n.Va.Ue(e),Cn(n).Z_(e)}function Go(n){n.Va=new eg({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Cn(n).start(),n.Ra.ua()}function Wo(n){return Yt(n)&&!Cn(n).x_()&&n.Ia.size>0}function Yt(n){return U(n).Ea.size===0}function yh(n){n.Va=void 0}async function ay(n){n.Ra.set("Online")}async function cy(n){n.Ia.forEach((e,t)=>{Ho(n,e)})}async function ly(n,e){yh(n),Wo(n)?(n.Ra.ha(e),Go(n)):n.Ra.set("Unknown")}async function uy(n,e,t){if(n.Ra.set("Online"),e instanceof th&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ia.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Va.removeTarget(u))}(n,e)}catch(r){V(Qt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Cs(n,r)}else if(e instanceof hs?n.Va.Ze(e):e instanceof eh?n.Va.st(e):n.Va.tt(e),!t.isEqual(F.min()))try{const r=await dh(n.localStore);t.compareTo(r)>=0&&await function(i,a){const u=i.Va.Tt(a);return u.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const c=i.Ia.get(f);c&&i.Ia.set(f,c.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,f)=>{const c=i.Ia.get(h);if(!c)return;i.Ia.set(h,c.withResumeToken(me.EMPTY_BYTE_STRING,c.snapshotVersion)),gh(i,h);const y=new wt(c.target,h,f,c.sequenceNumber);Ho(i,y)}),i.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){V(Qt,"Failed to raise snapshot:",r),await Cs(n,r)}}async function Cs(n,e,t){if(!Sn(e))throw e;n.Ea.add(1),await Ar(n),n.Ra.set("Offline"),t||(t=()=>dh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V(Qt,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Ys(n)})}function _h(n,e){return e().catch(t=>Cs(n,t,e))}async function Zs(n){const e=U(n),t=kt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Po;for(;hy(e);)try{const s=await Gg(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,dy(e,s)}catch(s){await Cs(e,s)}vh(e)&&wh(e)}function hy(n){return Yt(n)&&n.Ta.length<10}function dy(n,e){n.Ta.push(e);const t=kt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function vh(n){return Yt(n)&&!kt(n).x_()&&n.Ta.length>0}function wh(n){kt(n).start()}async function fy(n){kt(n).ra()}async function py(n){const e=kt(n);for(const t of n.Ta)e.ea(t.mutations)}async function my(n,e,t){const r=n.Ta.shift(),s=Lo.from(r,e,t);await _h(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Zs(n)}async function gy(n,e){e&&kt(n).X_&&await async function(r,s){if(function(a){return Jm(a)&&a!==x.ABORTED}(s.code)){const i=r.Ta.shift();kt(r).B_(),await _h(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Zs(r)}}(n,e),vh(n)&&wh(n)}async function vl(n,e){const t=U(n);t.asyncQueue.verifyOperationInProgress(),V(Qt,"RemoteStore received new credentials");const r=Yt(t);t.Ea.add(3),await Ar(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Ys(t)}async function yy(n,e){const t=U(n);e?(t.Ea.delete(2),await Ys(t)):e||(t.Ea.add(2),await Ar(t),t.Ra.set("Unknown"))}function Cn(n){return n.ma||(n.ma=function(t,r,s){const i=U(t);return i.sa(),new ty(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:ay.bind(null,n),t_:cy.bind(null,n),r_:ly.bind(null,n),H_:uy.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Wo(n)?Go(n):n.Ra.set("Unknown")):(await n.ma.stop(),yh(n))})),n.ma}function kt(n){return n.fa||(n.fa=function(t,r,s){const i=U(t);return i.sa(),new ny(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:fy.bind(null,n),r_:gy.bind(null,n),ta:py.bind(null,n),na:my.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Zs(n)):(await n.fa.stop(),n.Ta.length>0&&(V(Qt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new At,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,u=new Ko(e,t,a,s,i);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qo(n,e){if(at("AsyncQueue",`${e}: ${n}`),Sn(n))return new D(x.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{static emptySet(e){return new dn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||O.comparator(t.key,r.key):(t,r)=>O.comparator(t.key,r.key),this.keyedMap=Zn(),this.sortedSet=new ee(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof dn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new dn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(){this.ga=new ee(O.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):M(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class bn{constructor(e,t,r,s,i,a,u,h,f){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new bn(e,t,dn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Hs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _y{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class vy{constructor(){this.queries=El(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=U(t),i=s.queries;s.queries=El(),i.forEach((a,u)=>{for(const h of u.Sa)h.onError(r)})})(this,new D(x.ABORTED,"Firestore shutting down"))}}function El(){return new Jt(n=>$u(n),Hs)}async function Eh(n,e){const t=U(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new _y,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const u=Qo(a,`Initialization of query '${cn(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Xo(t)}async function bh(n,e){const t=U(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function wy(n,e){const t=U(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const u of a.Sa)u.Fa(s)&&(r=!0);a.wa=s}}r&&Xo(t)}function Ey(n,e,t){const r=U(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Xo(n){n.Ca.forEach(e=>{e.next()})}var fo,bl;(bl=fo||(fo={})).Ma="default",bl.Cache="cache";class Th{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new bn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=bn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==fo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(e){this.key=e}}class Ah{constructor(e){this.key=e}}class by{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=j(),this.mutatedKeys=j(),this.eu=qu(e),this.tu=new dn(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new wl,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((c,y)=>{const v=s.get(c),R=Gs(this.query,y)?y:null,C=!!v&&this.mutatedKeys.has(v.key),N=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let k=!1;v&&R?v.data.isEqual(R.data)?C!==N&&(r.track({type:3,doc:R}),k=!0):this.su(v,R)||(r.track({type:2,doc:R}),k=!0,(h&&this.eu(R,h)>0||f&&this.eu(R,f)<0)&&(u=!0)):!v&&R?(r.track({type:0,doc:R}),k=!0):v&&!R&&(r.track({type:1,doc:v}),k=!0,(h||f)&&(u=!0)),k&&(R?(a=a.add(R),i=N?i.add(c):i.delete(c)):(a=a.delete(c),i=i.delete(c)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const c=this.query.limitType==="F"?a.last():a.first();a=a.delete(c.key),i=i.delete(c.key),r.track({type:1,doc:c})}return{tu:a,iu:r,Cs:u,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((c,y)=>function(R,C){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Rt:k})}};return N(R)-N(C)}(c.type,y.type)||this.eu(c.doc,y.doc)),this.ou(r),s=s??!1;const u=t&&!s?this._u():[],h=this.Xa.size===0&&this.current&&!s?1:0,f=h!==this.Za;return this.Za=h,a.length!==0||f?{snapshot:new bn(this.query,e.tu,i,a,e.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new wl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=j(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new Ah(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new Ih(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=j();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return bn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Jo="SyncEngine";class Ty{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Iy{constructor(e){this.key=e,this.hu=!1}}class Ay{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Jt(u=>$u(u),Hs),this.Iu=new Map,this.Eu=new Set,this.du=new ee(O.comparator),this.Au=new Map,this.Ru=new Bo,this.Vu={},this.mu=new Map,this.fu=En.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function xy(n,e,t=!0){const r=kh(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await xh(r,e,t,!0),s}async function Ry(n,e){const t=kh(n);await xh(t,e,!0,!1)}async function xh(n,e,t,r){const s=await Wg(n.localStore,ze(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let u;return r&&(u=await Sy(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&mh(n.remoteStore,s),u}async function Sy(n,e,t,r,s){n.pu=(y,v,R)=>async function(N,k,z,B){let H=k.view.ru(z);H.Cs&&(H=await pl(N.localStore,k.query,!1).then(({documents:b})=>k.view.ru(b,H)));const he=B&&B.targetChanges.get(k.targetId),qe=B&&B.targetMismatches.get(k.targetId)!=null,ge=k.view.applyChanges(H,N.isPrimaryClient,he,qe);return Il(N,k.targetId,ge.au),ge.snapshot}(n,y,v,R);const i=await pl(n.localStore,e,!0),a=new by(e,i.Qs),u=a.ru(i.documents),h=Ir.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),f=a.applyChanges(u,n.isPrimaryClient,h);Il(n,t,f.au);const c=new Ty(e,t,a);return n.Tu.set(e,c),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),f.snapshot}async function Cy(n,e,t){const r=U(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!Hs(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await uo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&zo(r.remoteStore,s.targetId),po(r,s.targetId)}).catch(Rn)):(po(r,s.targetId),await uo(r.localStore,s.targetId,!0))}async function Py(n,e){const t=U(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),zo(t.remoteStore,r.targetId))}async function ky(n,e,t){const r=Fy(n);try{const s=await function(a,u){const h=U(a),f=Y.now(),c=u.reduce((R,C)=>R.add(C.key),j());let y,v;return h.persistence.runTransaction("Locally write mutations","readwrite",R=>{let C=ct(),N=j();return h.Ns.getEntries(R,c).next(k=>{C=k,C.forEach((z,B)=>{B.isValidDocument()||(N=N.add(z))})}).next(()=>h.localDocuments.getOverlayedDocuments(R,C)).next(k=>{y=k;const z=[];for(const B of u){const H=Gm(B,y.get(B.key).overlayedDocument);H!=null&&z.push(new Ot(B.key,H,Vu(H.value.mapValue),Re.exists(!0)))}return h.mutationQueue.addMutationBatch(R,f,z,u)}).next(k=>{v=k;const z=k.applyToLocalDocumentSet(y,N);return h.documentOverlayCache.saveOverlays(R,k.batchId,z)})}).then(()=>({batchId:v.batchId,changes:zu(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,u,h){let f=a.Vu[a.currentUser.toKey()];f||(f=new ee(q)),f=f.insert(u,h),a.Vu[a.currentUser.toKey()]=f}(r,s.batchId,t),await xr(r,s.changes),await Zs(r.remoteStore)}catch(s){const i=Qo(s,"Failed to persist write");t.reject(i)}}async function Rh(n,e){const t=U(n);try{const r=await zg(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(K(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?K(a.hu,14607):s.removedDocuments.size>0&&(K(a.hu,42227),a.hu=!1))}),await xr(t,r,e)}catch(r){await Rn(r)}}function Tl(n,e,t){const r=U(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const u=a.view.va(e);u.snapshot&&s.push(u.snapshot)}),function(a,u){const h=U(a);h.onlineState=u;let f=!1;h.queries.forEach((c,y)=>{for(const v of y.Sa)v.va(u)&&(f=!0)}),f&&Xo(h)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Dy(n,e,t){const r=U(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new ee(O.comparator);a=a.insert(i,Te.newNoDocument(i,F.min()));const u=j().add(i),h=new Xs(F.min(),new Map,new ee(q),a,u);await Rh(r,h),r.du=r.du.remove(i),r.Au.delete(e),Yo(r)}else await uo(r.localStore,e,!1).then(()=>po(r,e,t)).catch(Rn)}async function Vy(n,e){const t=U(n),r=e.batch.batchId;try{const s=await jg(t.localStore,e);Ch(t,r,null),Sh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await xr(t,s)}catch(s){await Rn(s)}}async function Ny(n,e,t){const r=U(n);try{const s=await function(a,u){const h=U(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let c;return h.mutationQueue.lookupMutationBatch(f,u).next(y=>(K(y!==null,37113),c=y.keys(),h.mutationQueue.removeMutationBatch(f,y))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,c,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,c)).next(()=>h.localDocuments.getDocuments(f,c))})}(r.localStore,e);Ch(r,e,t),Sh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await xr(r,s)}catch(s){await Rn(s)}}function Sh(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Ch(n,e,t){const r=U(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function po(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||Ph(n,r)})}function Ph(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(zo(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Yo(n))}function Il(n,e,t){for(const r of t)r instanceof Ih?(n.Ru.addReference(r.key,e),Oy(n,r)):r instanceof Ah?(V(Jo,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||Ph(n,r.key)):M(19791,{wu:r})}function Oy(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(V(Jo,"New document in limbo: "+t),n.Eu.add(r),Yo(n))}function Yo(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new O(X.fromString(e)),r=n.fu.next();n.Au.set(r,new Iy(t)),n.du=n.du.insert(t,r),mh(n.remoteStore,new wt(ze(Oo(t.path)),r,"TargetPurposeLimboResolution",qs.ce))}}async function xr(n,e,t){const r=U(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((u,h)=>{a.push(r.pu(h,e,t).then(f=>{if((f||t)&&r.isPrimaryClient){const c=f?!f.fromCache:t?.targetChanges.get(h.targetId)?.current;r.sharedClientState.updateQueryState(h.targetId,c?"current":"not-current")}if(f){s.push(f);const c=qo.As(h.targetId,f);i.push(c)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(h,f){const c=U(h);try{await c.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>S.forEach(f,v=>S.forEach(v.Es,R=>c.persistence.referenceDelegate.addReference(y,v.targetId,R)).next(()=>S.forEach(v.ds,R=>c.persistence.referenceDelegate.removeReference(y,v.targetId,R)))))}catch(y){if(!Sn(y))throw y;V(jo,"Failed to update sequence numbers: "+y)}for(const y of f){const v=y.targetId;if(!y.fromCache){const R=c.Ms.get(v),C=R.snapshotVersion,N=R.withLastLimboFreeSnapshotVersion(C);c.Ms=c.Ms.insert(v,N)}}}(r.localStore,i))}async function My(n,e){const t=U(n);if(!t.currentUser.isEqual(e)){V(Jo,"User change. New user:",e.toKey());const r=await hh(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(u=>{u.forEach(h=>{h.reject(new D(x.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await xr(t,r.Ls)}}function Ly(n,e){const t=U(n),r=t.Au.get(e);if(r&&r.hu)return j().add(r.key);{let s=j();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const u=t.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}function kh(n){const e=U(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Rh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ly.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Dy.bind(null,e),e.Pu.H_=wy.bind(null,e.eventManager),e.Pu.yu=Ey.bind(null,e.eventManager),e}function Fy(n){const e=U(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Vy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Ny.bind(null,e),e}class Ps{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Js(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return qg(this.persistence,new Ug,e.initialUser,this.serializer)}Cu(e){return new uh($o.mi,this.serializer)}Du(e){return new Qg}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ps.provider={build:()=>new Ps};class Uy extends Ps{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){K(this.persistence.referenceDelegate instanceof Ss,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Ig(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Se.withCacheSize(this.cacheSizeBytes):Se.DEFAULT;return new uh(r=>Ss.mi(r,t),this.serializer)}}class mo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Tl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=My.bind(null,this.syncEngine),await yy(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new vy}()}createDatastore(e){const t=Js(e.databaseInfo.databaseId),r=function(i){return new ey(i)}(e.databaseInfo);return function(i,a,u,h){return new sy(i,a,u,h)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,u){return new oy(r,s,i,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Tl(this.syncEngine,t,0),function(){return yl.v()?new yl:new Xg}())}createSyncEngine(e,t){return function(s,i,a,u,h,f,c){const y=new Ay(s,i,a,u,h,f);return c&&(y.gu=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const r=U(t);V(Qt,"RemoteStore shutting down."),r.Ea.add(5),await Ar(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}mo.provider={build:()=>new mo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Dh{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):at("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt="FirestoreClient";class By{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=be.UNAUTHENTICATED,this.clientId=Co.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{V(Dt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(V(Dt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new At;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Qo(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function qi(n,e){n.asyncQueue.verifyOperationInProgress(),V(Dt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await hh(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Al(n,e){n.asyncQueue.verifyOperationInProgress();const t=await $y(n);V(Dt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>vl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>vl(e.remoteStore,s)),n._onlineComponents=e}async function $y(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(Dt,"Using user provided OfflineComponentProvider");try{await qi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===x.FAILED_PRECONDITION||s.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;yn("Error using user provided cache. Falling back to memory cache: "+t),await qi(n,new Ps)}}else V(Dt,"Using default OfflineComponentProvider"),await qi(n,new Uy(void 0));return n._offlineComponents}async function Vh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(Dt,"Using user provided OnlineComponentProvider"),await Al(n,n._uninitializedComponentsProvider._online)):(V(Dt,"Using default OnlineComponentProvider"),await Al(n,new mo))),n._onlineComponents}function qy(n){return Vh(n).then(e=>e.syncEngine)}async function go(n){const e=await Vh(n),t=e.eventManager;return t.onListen=xy.bind(null,e.syncEngine),t.onUnlisten=Cy.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Ry.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Py.bind(null,e.syncEngine),t}function jy(n,e,t={}){const r=new At;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,u,h,f){const c=new Dh({next:v=>{c.Nu(),a.enqueueAndForget(()=>bh(i,y)),v.fromCache&&h.source==="server"?f.reject(new D(x.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(v)},error:v=>f.reject(v)}),y=new Th(u,c,{includeMetadataChanges:!0,qa:!0});return Eh(i,y)}(await go(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Nh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xl=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh="firestore.googleapis.com",Rl=!0;class Sl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Oh,this.ssl=Rl}else this.host=e.host,this.ssl=e.ssl??Rl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=lh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<bg)throw new D(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}im("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Nh(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ei{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Sl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Sl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Qp;switch(r.type){case"firstParty":return new Zp(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=xl.get(t);r&&(V("ComponentProvider","Removing Datastore"),xl.delete(t),r.terminate())}(this),Promise.resolve()}}function zy(n,e,t,r={}){n=Ne(n,ei);const s=In(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&(ou(`https://${u}`),au("Firestore",!0)),i.host!==Oh&&i.host!==u&&yn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...i,host:u,ssl:s,emulatorOptions:r};if(!Gt(h,a)&&(n._setSettings(h),r.mockUserToken)){let f,c;if(typeof r.mockUserToken=="string")f=r.mockUserToken,c=be.MOCK_USER;else{f=bf(r.mockUserToken,n._app?.options.projectId);const y=r.mockUserToken.sub||r.mockUserToken.user_id;if(!y)throw new D(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new be(y)}n._authCredentials=new Xp(new Eu(f,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Zt(this.firestore,e,this._query)}}class se{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}toJSON(){return{type:se._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Er(t,se._jsonSchema))return new se(e,r||null,new O(X.fromString(t.referencePath)))}}se._jsonSchemaVersion="firestore/documentReference/1.0",se._jsonSchema={type:ae("string",se._jsonSchemaVersion),referencePath:ae("string")};class xt extends Zt{constructor(e,t,r){super(e,t,Oo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new O(e))}withConverter(e){return new xt(this.firestore,e,this._path)}}function ke(n,e,...t){if(n=le(n),bu("collection","path",e),n instanceof ei){const r=X.fromString(e,...t);return $c(r),new xt(n,null,r)}{if(!(n instanceof se||n instanceof xt))throw new D(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return $c(r),new xt(n.firestore,null,r)}}function Ye(n,e,...t){if(n=le(n),arguments.length===1&&(e=Co.newId()),bu("doc","path",e),n instanceof ei){const r=X.fromString(e,...t);return Bc(r),new se(n,null,new O(r))}{if(!(n instanceof se||n instanceof xt))throw new D(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return Bc(r),new se(n.firestore,n instanceof xt?n.converter:null,new O(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cl="AsyncQueue";class Pl{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new fh(this,"async_queue_retry"),this._c=()=>{const r=$i();r&&V(Cl,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=$i();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=$i();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new At;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Sn(e))throw e;V(Cl,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,at("INTERNAL UNHANDLED ERROR: ",kl(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Ko.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:kl(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function kl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Dl(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class lt extends ei{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Pl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Pl(e),this._firestoreClient=void 0,await e}}}function Hy(n,e){const t=typeof n=="object"?n:hu(),r=typeof n=="string"?n:bs,s=Ro(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=wf("firestore");i&&zy(s,...i)}return s}function ti(n){if(n._terminated)throw new D(x.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Gy(n),n._firestoreClient}function Gy(n){const e=n._freezeSettings(),t=function(s,i,a,u){return new gm(s,i,a,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Nh(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new By(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Oe(me.fromBase64String(e))}catch(t){throw new D(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Oe(me.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Oe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Er(e,Oe._jsonSchema))return Oe.fromBase64String(e.bytes)}}Oe._jsonSchemaVersion="firestore/bytes/1.0",Oe._jsonSchema={type:ae("string",Oe._jsonSchemaVersion),bytes:ae("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return q(this._lat,e._lat)||q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ge._jsonSchemaVersion}}static fromJSON(e){if(Er(e,Ge._jsonSchema))return new Ge(e.latitude,e.longitude)}}Ge._jsonSchemaVersion="firestore/geoPoint/1.0",Ge._jsonSchema={type:ae("string",Ge._jsonSchemaVersion),latitude:ae("number"),longitude:ae("number")};/**
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
 */class We{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:We._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Er(e,We._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new We(e.vectorValues);throw new D(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}We._jsonSchemaVersion="firestore/vectorValue/1.0",We._jsonSchema={type:ae("string",We._jsonSchemaVersion),vectorValues:ae("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wy=/^__.*__$/;class Ky{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ot(e,this.data,this.fieldMask,t,this.fieldTransforms):new Tr(e,this.data,t,this.fieldTransforms)}}class Mh{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ot(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Lh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ac:n})}}class Zo{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Zo({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return ks(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Lh(this.Ac)&&Wy.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class Qy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Js(e)}Cc(e,t,r,s=!1){return new Zo({Ac:e,methodName:t,Dc:r,path:pe.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Sr(n){const e=n._freezeSettings(),t=Js(n._databaseId);return new Qy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function ea(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);na("Data must be an object, but it was:",a,r);const u=Bh(r,a);let h,f;if(i.merge)h=new Ve(a.fieldMask),f=a.fieldTransforms;else if(i.mergeFields){const c=[];for(const y of i.mergeFields){const v=yo(e,y,t);if(!a.contains(v))throw new D(x.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);qh(c,v)||c.push(v)}h=new Ve(c),f=a.fieldTransforms.filter(y=>h.covers(y.field))}else h=null,f=a.fieldTransforms;return new Ky(new Ce(u),h,f)}class ri extends ni{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ri}}class ta extends ni{_toFieldTransform(e){return new qm(e.path,new pr)}isEqual(e){return e instanceof ta}}function Fh(n,e,t,r){const s=n.Cc(1,e,t);na("Data must be an object, but it was:",s,r);const i=[],a=Ce.empty();Nt(r,(h,f)=>{const c=ra(e,h,t);f=le(f);const y=s.yc(c);if(f instanceof ri)i.push(c);else{const v=Cr(f,y);v!=null&&(i.push(c),a.set(c,v))}});const u=new Ve(i);return new Mh(a,u,s.fieldTransforms)}function Uh(n,e,t,r,s,i){const a=n.Cc(1,e,t),u=[yo(e,r,t)],h=[s];if(i.length%2!=0)throw new D(x.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<i.length;v+=2)u.push(yo(e,i[v])),h.push(i[v+1]);const f=[],c=Ce.empty();for(let v=u.length-1;v>=0;--v)if(!qh(f,u[v])){const R=u[v];let C=h[v];C=le(C);const N=a.yc(R);if(C instanceof ri)f.push(R);else{const k=Cr(C,N);k!=null&&(f.push(R),c.set(R,k))}}const y=new Ve(f);return new Mh(c,y,a.fieldTransforms)}function Xy(n,e,t,r=!1){return Cr(t,n.Cc(r?4:3,e))}function Cr(n,e){if($h(n=le(n)))return na("Unsupported field value:",e,n),Bh(n,e);if(n instanceof ni)return function(r,s){if(!Lh(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const u of r){let h=Cr(u,s.wc(a));h==null&&(h={nullValue:"NULL_VALUE"}),i.push(h),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=le(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Um(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Y.fromDate(r);return{timestampValue:Rs(s.serializer,i)}}if(r instanceof Y){const i=new Y(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rs(s.serializer,i)}}if(r instanceof Ge)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Oe)return{bytesValue:nh(s.serializer,r._byteString)};if(r instanceof se){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Uo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof We)return function(a,u){return{mapValue:{fields:{[ku]:{stringValue:Du},[Ts]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw u.Sc("VectorValues must only contain numeric values.");return Mo(u.serializer,f)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${$s(r)}`)}(n,e)}function Bh(n,e){const t={};return Au(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Nt(n,(r,s)=>{const i=Cr(s,e.mc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function $h(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Y||n instanceof Ge||n instanceof Oe||n instanceof se||n instanceof ni||n instanceof We)}function na(n,e,t){if(!$h(t)||!Tu(t)){const r=$s(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function yo(n,e,t){if((e=le(e))instanceof Rr)return e._internalPath;if(typeof e=="string")return ra(n,e);throw ks("Field path arguments must be of type string or ",n,!1,void 0,t)}const Jy=new RegExp("[~\\*/\\[\\]]");function ra(n,e,t){if(e.search(Jy)>=0)throw ks(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Rr(...e.split("."))._internalPath}catch{throw ks(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ks(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(i||a)&&(h+=" (found",i&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new D(x.INVALID_ARGUMENT,u+n+h)}function qh(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Yy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(sa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Yy extends jh{data(){return super.data()}}function sa(n,e){return typeof e=="string"?ra(n,e):e instanceof Rr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(x.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ia{}class Zy extends ia{}function Pn(n,e,...t){let r=[];e instanceof ia&&r.push(e),r=r.concat(t),function(i){const a=i.filter(h=>h instanceof oa).length,u=i.filter(h=>h instanceof si).length;if(a>1||a>0&&u>0)throw new D(x.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class si extends Zy{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new si(e,t,r)}_apply(e){const t=this._parse(e);return Hh(e._query,t),new Zt(e.firestore,e.converter,so(e._query,t))}_parse(e){const t=Sr(e.firestore);return function(i,a,u,h,f,c,y){let v;if(f.isKeyField()){if(c==="array-contains"||c==="array-contains-any")throw new D(x.INVALID_ARGUMENT,`Invalid Query. You can't perform '${c}' queries on documentId().`);if(c==="in"||c==="not-in"){Nl(y,c);const C=[];for(const N of y)C.push(Vl(h,i,N));v={arrayValue:{values:C}}}else v=Vl(h,i,y)}else c!=="in"&&c!=="not-in"&&c!=="array-contains-any"||Nl(y,c),v=Xy(u,a,y,c==="in"||c==="not-in");return oe.create(f,c,v)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Vt(n,e,t){const r=e,s=sa("where",n);return si._create(s,r,t)}class oa extends ia{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new oa(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Be.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const h of u)Hh(a,h),a=so(a,h)}(e._query,t),new Zt(e.firestore,e.converter,so(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Vl(n,e,t){if(typeof(t=le(t))=="string"){if(t==="")throw new D(x.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Bu(e)&&t.indexOf("/")!==-1)throw new D(x.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(X.fromString(t));if(!O.isDocumentKey(r))throw new D(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Qc(n,new O(r))}if(t instanceof se)return Qc(n,t._key);throw new D(x.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${$s(t)}.`)}function Nl(n,e){if(!Array.isArray(n)||n.length===0)throw new D(x.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Hh(n,e){const t=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new D(x.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(x.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class e_{convertValue(e,t="none"){switch(Pt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ct(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Nt(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){const t=e.fields?.[Ts].arrayValue?.values?.map(r=>re(r.doubleValue));return new We(t)}convertGeoPoint(e){return new Ge(re(e.latitude),re(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=zs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(hr(e));default:return null}}convertTimestamp(e){const t=St(e);return new Y(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=X.fromString(e);K(ch(r),9688,{name:e});const s=new dr(r.get(1),r.get(3)),i=new O(r.popFirst(5));return s.isEqual(t)||at(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class tr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class jt extends jh{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ds(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(sa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=jt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}jt._jsonSchemaVersion="firestore/documentSnapshot/1.0",jt._jsonSchema={type:ae("string",jt._jsonSchemaVersion),bundleSource:ae("string","DocumentSnapshot"),bundleName:ae("string"),bundle:ae("string")};class ds extends jt{data(e={}){return super.data(e)}}class zt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new tr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ds(this._firestore,this._userDataWriter,r.key,r,new tr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const h=new ds(s._firestore,s._userDataWriter,u.doc.key,u.doc,new tr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const h=new ds(s._firestore,s._userDataWriter,u.doc.key,u.doc,new tr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,c=-1;return u.type!==0&&(f=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),c=a.indexOf(u.doc.key)),{type:t_(u.type),doc:h,oldIndex:f,newIndex:c}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=zt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Co.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function t_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}zt._jsonSchemaVersion="firestore/querySnapshot/1.0",zt._jsonSchema={type:ae("string",zt._jsonSchemaVersion),bundleSource:ae("string","QuerySnapshot"),bundleName:ae("string"),bundle:ae("string")};class ca extends e_{constructor(e){super(),this.firestore=e}convertBytes(e){return new Oe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}function en(n){n=Ne(n,Zt);const e=Ne(n.firestore,lt),t=ti(e),r=new ca(e);return zh(n._query),jy(t,n._query).then(s=>new zt(e,r,n,s))}function n_(n,e,t){n=Ne(n,se);const r=Ne(n.firestore,lt),s=aa(n.converter,e,t);return kr(r,[ea(Sr(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Re.none())])}function ii(n,e,t,...r){n=Ne(n,se);const s=Ne(n.firestore,lt),i=Sr(s);let a;return a=typeof(e=le(e))=="string"||e instanceof Rr?Uh(i,"updateDoc",n._key,e,t,r):Fh(i,"updateDoc",n._key,e),kr(s,[a.toMutation(n._key,Re.exists(!0))])}function la(n){return kr(Ne(n.firestore,lt),[new Qs(n._key,Re.none())])}function Pr(n,e){const t=Ne(n.firestore,lt),r=Ye(n),s=aa(n.converter,e);return kr(t,[ea(Sr(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Re.exists(!1))]).then(()=>r)}function r_(n,...e){n=le(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Dl(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Dl(e[r])){const h=e[r];e[r]=h.next?.bind(h),e[r+1]=h.error?.bind(h),e[r+2]=h.complete?.bind(h)}let i,a,u;if(n instanceof se)a=Ne(n.firestore,lt),u=Oo(n._key.path),i={next:h=>{e[r]&&e[r](s_(a,n,h))},error:e[r+1],complete:e[r+2]};else{const h=Ne(n,Zt);a=Ne(h.firestore,lt),u=h._query;const f=new ca(a);i={next:c=>{e[r]&&e[r](new zt(a,f,h,c))},error:e[r+1],complete:e[r+2]},zh(n._query)}return function(f,c,y,v){const R=new Dh(v),C=new Th(c,R,y);return f.asyncQueue.enqueueAndForget(async()=>Eh(await go(f),C)),()=>{R.Nu(),f.asyncQueue.enqueueAndForget(async()=>bh(await go(f),C))}}(ti(a),u,s,i)}function kr(n,e){return function(r,s){const i=new At;return r.asyncQueue.enqueueAndForget(async()=>ky(await qy(r),s,i)),i.promise}(ti(n),e)}function s_(n,e,t){const r=t.docs.get(e._key),s=new ca(n);return new jt(n,s,e._key,r,new tr(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Sr(e)}set(e,t,r){this._verifyNotCommitted();const s=ji(e,this._firestore),i=aa(s.converter,t,r),a=ea(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,Re.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=ji(e,this._firestore);let a;return a=typeof(t=le(t))=="string"||t instanceof Rr?Uh(this._dataReader,"WriteBatch.update",i._key,t,r,s):Fh(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,Re.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ji(e,this._firestore);return this._mutations=this._mutations.concat(new Qs(t._key,Re.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(x.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ji(n,e){if((n=le(n)).firestore!==e)throw new D(x.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function ua(){return new ta("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o_(n){return ti(n=Ne(n,lt)),new i_(n,e=>kr(n,e))}(function(e,t=!0){(function(s){xn=s})(An),gn(new Wt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),u=new lt(new Jp(r.getProvider("auth-internal")),new em(a,r.getProvider("app-check-internal")),function(f,c){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new D(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new dr(f.options.projectId,c)}(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),Tt(Mc,Lc,e),Tt(Mc,Lc,"esm2020")})();var a_="firebase",c_="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tt(a_,c_,"app");function Gh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const l_=Gh,Wh=new vr("auth","Firebase",Gh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds=new Ao("@firebase/auth");function u_(n,...e){Ds.logLevel<=$.WARN&&Ds.warn(`Auth (${An}): ${n}`,...e)}function fs(n,...e){Ds.logLevel<=$.ERROR&&Ds.error(`Auth (${An}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n,...e){throw da(n,...e)}function Ue(n,...e){return da(n,...e)}function ha(n,e,t){const r={...l_(),[e]:t};return new vr("auth","Firebase",r).create(e,{appName:n.name})}function Ht(n){return ha(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function h_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Je(n,"argument-error"),ha(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function da(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Wh.create(n,...e)}function L(n,e,...t){if(!n)throw da(e,...t)}function st(n){const e="INTERNAL ASSERTION FAILED: "+n;throw fs(e),new Error(e)}function ut(n,e){n||st(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _o(){return typeof self<"u"&&self.location?.href||""}function d_(){return Ol()==="http:"||Ol()==="https:"}function Ol(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(d_()||Sf()||"connection"in navigator)?navigator.onLine:!0}function p_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e,t){this.shortDelay=e,this.longDelay=t,ut(t>e,"Short delay should be less than long delay!"),this.isMobile=Af()||Cf()}get(){return f_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(n,e){ut(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;st("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;st("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;st("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],y_=new Dr(3e4,6e4);function pa(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function kn(n,e,t,r,s={}){return Qh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const u=wr({key:n.config.apiKey,...a}).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f={method:e,headers:h,...i};return Rf()||(f.referrerPolicy="no-referrer"),n.emulatorConfig&&In(n.emulatorConfig.host)&&(f.credentials="include"),Kh.fetch()(await Xh(n,n.config.apiHost,t,u),f)})}async function Qh(n,e,t){n._canInitEmulator=!1;const r={...m_,...e};try{const s=new v_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw os(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const u=i.ok?a.errorMessage:a.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw os(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw os(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw os(n,"user-disabled",a);const c=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw ha(n,c,f);Je(n,c)}}catch(s){if(s instanceof ht)throw s;Je(n,"network-request-failed",{message:String(s)})}}async function __(n,e,t,r,s={}){const i=await kn(n,e,t,r,s);return"mfaPendingCredential"in i&&Je(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Xh(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?fa(n.config,s):`${n.config.apiScheme}://${s}`;return g_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class v_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ue(this.auth,"network-request-failed")),y_.get())})}}function os(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ue(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w_(n,e){return kn(n,"POST","/v1/accounts:delete",e)}async function Vs(n,e){return kn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function E_(n,e=!1){const t=le(n),r=await t.getIdToken(e),s=ma(r);L(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:cr(zi(s.auth_time)),issuedAtTime:cr(zi(s.iat)),expirationTime:cr(zi(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function zi(n){return Number(n)*1e3}function ma(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return fs("JWT malformed, contained fewer than 3 sections"),null;try{const s=nu(t);return s?JSON.parse(s):(fs("Failed to decode base64 JWT payload"),null)}catch(s){return fs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Ml(n){const e=ma(n);return L(e,"internal-error"),L(typeof e.exp<"u","internal-error"),L(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ht&&b_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function b_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=cr(this.lastLoginAt),this.creationTime=cr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ns(n){const e=n.auth,t=await n.getIdToken(),r=await yr(n,Vs(e,{idToken:t}));L(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Jh(s.providerUserInfo):[],a=A_(n.providerData,i),u=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!a?.length,f=u?h:!1,c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new vo(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,c)}async function I_(n){const e=le(n);await Ns(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function A_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Jh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function x_(n,e){const t=await Qh(n,{},async()=>{const r=wr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Xh(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const h={method:"POST",headers:u,body:r};return n.emulatorConfig&&In(n.emulatorConfig.host)&&(h.credentials="include"),Kh.fetch()(a,h)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function R_(n,e){return kn(n,"POST","/v2/accounts:revokeToken",pa(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken<"u","internal-error"),L(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ml(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");const t=Ml(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await x_(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new fn;return r&&(L(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(L(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(L(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new fn,this.toJSON())}_performRefresh(){return st("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(n,e){L(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Fe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new T_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new vo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await yr(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return E_(this,e)}reload(){return I_(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Fe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ns(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Le(this.auth.app))return Promise.reject(Ht(this.auth));const e=await this.getIdToken();return await yr(this,w_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,h=t._redirectEventId??void 0,f=t.createdAt??void 0,c=t.lastLoginAt??void 0,{uid:y,emailVerified:v,isAnonymous:R,providerData:C,stsTokenManager:N}=t;L(y&&N,e,"internal-error");const k=fn.fromJSON(this.name,N);L(typeof y=="string",e,"internal-error"),gt(r,e.name),gt(s,e.name),L(typeof v=="boolean",e,"internal-error"),L(typeof R=="boolean",e,"internal-error"),gt(i,e.name),gt(a,e.name),gt(u,e.name),gt(h,e.name),gt(f,e.name),gt(c,e.name);const z=new Fe({uid:y,auth:e,email:s,emailVerified:v,displayName:r,isAnonymous:R,photoURL:a,phoneNumber:i,tenantId:u,stsTokenManager:k,createdAt:f,lastLoginAt:c});return C&&Array.isArray(C)&&(z.providerData=C.map(B=>({...B}))),h&&(z._redirectEventId=h),z}static async _fromIdTokenResponse(e,t,r=!1){const s=new fn;s.updateFromServerResponse(t);const i=new Fe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ns(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];L(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Jh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,u=new fn;u.updateFromIdToken(r);const h=new Fe({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new vo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=new Map;function it(n){ut(n instanceof Function,"Expected a class definition");let e=Ll.get(n);return e?(ut(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ll.set(n,e),e)}/**
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
 */class Yh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Yh.type="NONE";const Fl=Yh;/**
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
 */function ps(n,e,t){return`firebase:${n}:${e}:${t}`}class pn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ps(this.userKey,s.apiKey,i),this.fullPersistenceKey=ps("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Vs(this.auth,{idToken:e}).catch(()=>{});return t?Fe._fromGetAccountInfoResponse(this.auth,t,e):null}return Fe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new pn(it(Fl),e,r);const s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let i=s[0]||it(Fl);const a=ps(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const c=await f._get(a);if(c){let y;if(typeof c=="string"){const v=await Vs(e,{idToken:c}).catch(()=>{});if(!v)break;y=await Fe._fromGetAccountInfoResponse(e,v,c)}else y=Fe._fromJSON(e,c);f!==i&&(u=y),i=f;break}}catch{}const h=s.filter(f=>f._shouldAllowMigration);return!i._shouldAllowMigration||!h.length?new pn(i,e,r):(i=h[0],u&&await i._set(a,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==i)try{await f._remove(a)}catch{}})),new pn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(nd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Zh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(sd(e))return"Blackberry";if(id(e))return"Webos";if(ed(e))return"Safari";if((e.includes("chrome/")||td(e))&&!e.includes("edge/"))return"Chrome";if(rd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Zh(n=Ie()){return/firefox\//i.test(n)}function ed(n=Ie()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function td(n=Ie()){return/crios\//i.test(n)}function nd(n=Ie()){return/iemobile/i.test(n)}function rd(n=Ie()){return/android/i.test(n)}function sd(n=Ie()){return/blackberry/i.test(n)}function id(n=Ie()){return/webos/i.test(n)}function ga(n=Ie()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function S_(n=Ie()){return ga(n)&&!!window.navigator?.standalone}function C_(){return Pf()&&document.documentMode===10}function od(n=Ie()){return ga(n)||rd(n)||id(n)||sd(n)||/windows phone/i.test(n)||nd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ad(n,e=[]){let t;switch(n){case"Browser":t=Ul(Ie());break;case"Worker":t=`${Ul(Ie())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${An}/${r}`}/**
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
 */class P_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,u)=>{try{const h=e(i);a(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function k_(n,e={}){return kn(n,"GET","/v2/passwordPolicy",pa(n,e))}/**
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
 */const D_=6;class V_{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??D_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bl(this),this.idTokenSubscription=new Bl(this),this.beforeStateQueue=new P_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=it(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await pn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Vs(this,{idToken:e}),r=await Fe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Le(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,u=await this.tryRedirectSignIn(e);(!i||i===a)&&u?.user&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ns(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=p_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Le(this.app))return Promise.reject(Ht(this));const t=e?le(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Le(this.app)?Promise.reject(Ht(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Le(this.app)?Promise.reject(Ht(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(it(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await k_(this),t=new V_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new vr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await R_(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&it(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await pn.create(this,[it(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(u,this,"internal-error"),u.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ad(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Le(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&u_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function oi(n){return le(n)}class Bl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ff(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ya={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function O_(n){ya=n}function M_(n){return ya.loadJS(n)}function L_(){return ya.gapiScript}function F_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(n,e){const t=Ro(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Gt(i,e??{}))return s;Je(s,"already-initialized")}return t.initialize({options:e})}function B_(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(it);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function $_(n,e,t){const r=oi(n);L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=cd(e),{host:a,port:u}=q_(e),h=u===null?"":`:${u}`,f={url:`${i}//${a}${h}/`},c=Object.freeze({host:a,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){L(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),L(Gt(f,r.config.emulator)&&Gt(c,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=f,r.emulatorConfig=c,r.settings.appVerificationDisabledForTesting=!0,In(a)?(ou(`${i}//${a}${h}`),au("Auth",!0)):j_()}function cd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function q_(n){const e=cd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:$l(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:$l(a)}}}function $l(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function j_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return st("not implemented")}_getIdTokenResponse(e){return st("not implemented")}_linkToIdToken(e,t){return st("not implemented")}_getReauthenticationResolver(e){return st("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mn(n,e){return __(n,"POST","/v1/accounts:signInWithIdp",pa(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_="http://localhost";class Xt extends ld{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Xt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Xt(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return mn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,mn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,mn(e,t)}buildRequest(){const e={requestUri:z_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=wr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Vr extends _a{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends Vr{constructor(){super("facebook.com")}static credential(e){return Xt._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yt.credential(e.oauthAccessToken)}catch{return null}}}yt.FACEBOOK_SIGN_IN_METHOD="facebook.com";yt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt extends Vr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Xt._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return rt.credential(t,r)}catch{return null}}}rt.GOOGLE_SIGN_IN_METHOD="google.com";rt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Vr{constructor(){super("github.com")}static credential(e){return Xt._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _t.credential(e.oauthAccessToken)}catch{return null}}}_t.GITHUB_SIGN_IN_METHOD="github.com";_t.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Vr{constructor(){super("twitter.com")}static credential(e,t){return Xt._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return vt.credential(t,r)}catch{return null}}}vt.TWITTER_SIGN_IN_METHOD="twitter.com";vt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Fe._fromIdTokenResponse(e,r,s),a=ql(r);return new Tn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ql(r);return new Tn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ql(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends ht{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Os.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Os(e,t,r,s)}}function ud(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Os._fromErrorAndOperation(n,i,e,r):i})}async function H_(n,e,t=!1){const r=await yr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Tn._forOperation(n,"link",r)}/**
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
 */async function G_(n,e,t=!1){const{auth:r}=n;if(Le(r.app))return Promise.reject(Ht(r));const s="reauthenticate";try{const i=await yr(n,ud(r,s,e,n),t);L(i.idToken,r,"internal-error");const a=ma(i.idToken);L(a,r,"internal-error");const{sub:u}=a;return L(n.uid===u,r,"user-mismatch"),Tn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Je(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W_(n,e,t=!1){if(Le(n.app))return Promise.reject(Ht(n));const r="signIn",s=await ud(n,r,e),i=await Tn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K_(n,e){return le(n).setPersistence(e)}function Q_(n,e,t,r){return le(n).onIdTokenChanged(e,t,r)}function X_(n,e,t){return le(n).beforeAuthStateChanged(e,t)}const Ms="__sak";/**
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
 */class hd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ms,"1"),this.storage.removeItem(Ms),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J_=1e3,Y_=10;class dd extends hd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=od(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,h)=>{this.notifyListeners(a,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);C_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Y_):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},J_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}dd.type="LOCAL";const fd=dd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd extends hd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}pd.type="SESSION";const md=pd;/**
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
 */function Z_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ai{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ai(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(a).map(async f=>f(t.origin,i)),h=await Z_(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ai.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class ev{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((u,h)=>{const f=va("",20);s.port1.start();const c=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(y){const v=y;if(v.data.eventId===f)switch(v.data.status){case"ack":clearTimeout(c),i=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(v.data.response);break;default:clearTimeout(c),clearTimeout(i),h(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(){return window}function tv(n){Ke().location.href=n}/**
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
 */function gd(){return typeof Ke().WorkerGlobalScope<"u"&&typeof Ke().importScripts=="function"}async function nv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function rv(){return navigator?.serviceWorker?.controller||null}function sv(){return gd()?self:null}/**
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
 */const yd="firebaseLocalStorageDb",iv=1,Ls="firebaseLocalStorage",_d="fbase_key";class Nr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ci(n,e){return n.transaction([Ls],e?"readwrite":"readonly").objectStore(Ls)}function ov(){const n=indexedDB.deleteDatabase(yd);return new Nr(n).toPromise()}function wo(){const n=indexedDB.open(yd,iv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ls,{keyPath:_d})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ls)?e(r):(r.close(),await ov(),e(await wo()))})})}async function jl(n,e,t){const r=ci(n,!0).put({[_d]:e,value:t});return new Nr(r).toPromise()}async function av(n,e){const t=ci(n,!1).get(e),r=await new Nr(t).toPromise();return r===void 0?null:r.value}function zl(n,e){const t=ci(n,!0).delete(e);return new Nr(t).toPromise()}const cv=800,lv=3;class vd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await wo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>lv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return gd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ai._getInstance(sv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await nv(),!this.activeServiceWorker)return;this.sender=new ev(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||rv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wo();return await jl(e,Ms,"1"),await zl(e,Ms),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>jl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>av(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ci(s,!1).getAll();return new Nr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),cv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vd.type="LOCAL";const uv=vd;new Dr(3e4,6e4);/**
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
 */function wd(n,e){return e?it(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class wa extends ld{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return mn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return mn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function hv(n){return W_(n.auth,new wa(n),n.bypassAuthState)}function dv(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),G_(t,new wa(n),n.bypassAuthState)}async function fv(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),H_(t,new wa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:u}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hv;case"linkViaPopup":case"linkViaRedirect":return fv;case"reauthViaPopup":case"reauthViaRedirect":return dv;default:Je(this.auth,"internal-error")}}resolve(e){ut(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ut(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pv=new Dr(2e3,1e4);async function mv(n,e,t){if(Le(n.app))return Promise.reject(Ue(n,"operation-not-supported-in-this-environment"));const r=oi(n);h_(n,e,_a);const s=wd(r,t);return new qt(r,"signInViaPopup",e,s).executeNotNull()}class qt extends Ed{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,qt.currentPopupAction&&qt.currentPopupAction.cancel(),qt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){ut(this.filter.length===1,"Popup operations only handle one event");const e=va();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ue(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ue(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ue(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pv.get())};e()}}qt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv="pendingRedirect",ms=new Map;class yv extends Ed{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ms.get(this.auth._key());if(!e){try{const r=await _v(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ms.set(this.auth._key(),e)}return this.bypassAuthState||ms.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _v(n,e){const t=Ev(e),r=wv(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function vv(n,e){ms.set(n._key(),e)}function wv(n){return it(n._redirectPersistence)}function Ev(n){return ps(gv,n.config.apiKey,n.name)}async function bv(n,e,t=!1){if(Le(n.app))return Promise.reject(Ht(n));const r=oi(n),s=wd(r,e),a=await new yv(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv=600*1e3;class Iv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Av(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!bd(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ue(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Tv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hl(e))}saveEventToCache(e){this.cachedEventUids.add(Hl(e)),this.lastProcessedEventTime=Date.now()}}function Hl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function bd({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Av(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return bd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xv(n,e={}){return kn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sv=/^https?/;async function Cv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await xv(n);for(const t of e)try{if(Pv(t))return}catch{}Je(n,"unauthorized-domain")}function Pv(n){const e=_o(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Sv.test(t))return!1;if(Rv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const kv=new Dr(3e4,6e4);function Gl(){const n=Ke().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Dv(n){return new Promise((e,t)=>{function r(){Gl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gl(),t(Ue(n,"network-request-failed"))},timeout:kv.get()})}if(Ke().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ke().gapi?.load)r();else{const s=F_("iframefcb");return Ke()[s]=()=>{gapi.load?r():t(Ue(n,"network-request-failed"))},M_(`${L_()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw gs=null,e})}let gs=null;function Vv(n){return gs=gs||Dv(n),gs}/**
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
 */const Nv=new Dr(5e3,15e3),Ov="__/auth/iframe",Mv="emulator/auth/iframe",Lv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Fv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Uv(n){const e=n.config;L(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?fa(e,Mv):`https://${n.config.authDomain}/${Ov}`,r={apiKey:e.apiKey,appName:n.name,v:An},s=Fv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${wr(r).slice(1)}`}async function Bv(n){const e=await Vv(n),t=Ke().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:Uv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Lv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ue(n,"network-request-failed"),u=Ke().setTimeout(()=>{i(a)},Nv.get());function h(){Ke().clearTimeout(u),s(r)}r.ping(h).then(h,()=>{i(a)})}))}/**
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
 */const $v={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qv=500,jv=600,zv="_blank",Hv="http://localhost";class Wl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Gv(n,e,t,r=qv,s=jv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h={...$v,width:r.toString(),height:s.toString(),top:i,left:a},f=Ie().toLowerCase();t&&(u=td(f)?zv:t),Zh(f)&&(e=e||Hv,h.scrollbars="yes");const c=Object.entries(h).reduce((v,[R,C])=>`${v}${R}=${C},`,"");if(S_(f)&&u!=="_self")return Wv(e||"",u),new Wl(null);const y=window.open(e||"",u,c);L(y,n,"popup-blocked");try{y.focus()}catch{}return new Wl(y)}function Wv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Kv="__/auth/handler",Qv="emulator/auth/handler",Xv=encodeURIComponent("fac");async function Kl(n,e,t,r,s,i){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:An,eventId:s};if(e instanceof _a){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Lf(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,y]of Object.entries({}))a[c]=y}if(e instanceof Vr){const c=e.getScopes().filter(y=>y!=="");c.length>0&&(a.scopes=c.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const c of Object.keys(u))u[c]===void 0&&delete u[c];const h=await n._getAppCheckToken(),f=h?`#${Xv}=${encodeURIComponent(h)}`:"";return`${Jv(n)}?${wr(u).slice(1)}${f}`}function Jv({config:n}){return n.emulator?fa(n,Qv):`https://${n.authDomain}/${Kv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hi="webStorageSupport";class Yv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=md,this._completeRedirectFn=bv,this._overrideRedirectResult=vv}async _openPopup(e,t,r,s){ut(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Kl(e,t,r,_o(),s);return Gv(e,i,va())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Kl(e,t,r,_o(),s);return tv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ut(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Bv(e),r=new Iv(e);return t.register("authEvent",s=>(L(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Hi,{type:Hi},s=>{const i=s?.[0]?.[Hi];i!==void 0&&t(!!i),Je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Cv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return od()||ed()||ga()}}const Zv=Yv;var Ql="@firebase/auth",Xl="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nw(n){gn(new Wt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;L(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ad(n)},f=new N_(r,s,i,h);return B_(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),gn(new Wt("auth-internal",e=>{const t=oi(e.getProvider("auth").getImmediate());return(r=>new ew(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Tt(Ql,Xl,tw(n)),Tt(Ql,Xl,"esm2020")}/**
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
 */const rw=300,sw=iu("authIdTokenMaxAge")||rw;let Jl=null;const iw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>sw)return;const s=t?.token;Jl!==s&&(Jl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ow(n=hu()){const e=Ro(n,"auth");if(e.isInitialized())return e.getImmediate();const t=U_(n,{popupRedirectResolver:Zv,persistence:[uv,fd,md]}),r=iu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=iw(i.toString());X_(t,a,()=>a(t.currentUser)),Q_(t,u=>a(u))}}const s=ru("auth");return s&&$_(t,`http://${s}`),t}function aw(){return document.getElementsByTagName("head")?.[0]??document}O_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ue("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",aw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nw("Browser");const cw={apiKey:"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:"controle-financeiro-b98ec.firebaseapp.com",projectId:"controle-financeiro-b98ec",storageBucket:"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:"418109336597",appId:"1:418109336597:web:871b262a76e57455ebb21c",measurementId:"G-7RW2F269V6"},Ea=uu(cw),Ze=ow(Ea),ne=Hy(Ea);K_(Ze,fd).then(()=>{}).catch(n=>{console.error("Erro ao configurar persistência do Firebase Auth:",n)});async function lw(n,e){const t=ke(ne,"users",n,"despesasRecorrentes");let r=t;return e&&(r=Pn(t,Vt("budgetId","==",e))),(await en(r)).docs.map(i=>({id:i.id,...i.data()}))}async function uw(n,e,t){return await Pr(ke(ne,"users",n,"despesasRecorrentes"),{...t,userId:n,budgetId:e})}async function hw(n,e,t){return await ii(Ye(ne,"users",n,"despesasRecorrentes",e),t)}async function dw(n,e){return await la(Ye(ne,"users",n,"despesasRecorrentes",e))}function $e({title:n="",content:e="",onClose:t=null}){const r=document.createElement("div");r.id="app-modal",r.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",r.onclick=i=>{i.target===r&&t&&t()};const s=document.createElement("div");return s.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",s.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,r.appendChild(s),s.querySelector("#modal-close-btn").onclick=i=>{i.stopPropagation(),t&&t()},r}function fw({onSubmit:n,initialData:e={}}){const t=document.createElement("form");return t.className="space-y-4",t.innerHTML=`
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
      <input type="text" id="rec-desc" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: Aluguel"
             value="${e.descricao||""}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
      <input type="number" id="rec-valor" required step="0.01" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="0,00"
             value="${e.valor||""}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
      <select id="rec-categoria" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg">
        <option value="">Selecione...</option>
        ${(window.appState.categories||[]).map(r=>`<option value="${r.id}" ${e.categoriaId===r.id?"selected":""}>${r.nome}</option>`).join("")}
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
      <input type="date" id="rec-data" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             value="${e.dataInicio||new Date().toISOString().split("T")[0]}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Parcelas (opcional)</label>
      <input type="number" id="rec-parcelas" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Deixe vazio para infinito"
             value="${e.parcelasRestantes||""}">
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Salvar</button>
    </div>
  `,t.addEventListener("submit",r=>{r.preventDefault();const s={descricao:document.getElementById("rec-desc").value,valor:parseFloat(document.getElementById("rec-valor").value),categoriaId:document.getElementById("rec-categoria").value,dataInicio:document.getElementById("rec-data").value,parcelasRestantes:document.getElementById("rec-parcelas").value?parseInt(document.getElementById("rec-parcelas").value):null,ativa:!0};n(s)}),t}function Z({message:n,type:e="info",duration:t=3e3}){const r=document.createElement("div");r.className=`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
    ${e==="success"?"bg-green-600":e==="error"?"bg-red-600":"bg-gray-800"}`,r.textContent=n,document.body.appendChild(r),setTimeout(()=>{r.classList.add("opacity-0"),setTimeout(()=>r.remove(),500)},t)}window.showAddRecorrenteModal=function(){const n=$e({title:"Nova Despesa Recorrente",content:"",onClose:()=>n.remove()}),e=window.FirebaseAuth.currentUser,t=window.appState.currentBudget;if(!e||!t)return;const r=fw({onSubmit:async i=>{try{await uw(e.uid,t.id,i),n.remove(),Z({message:"Despesa recorrente salva!",type:"success"}),typeof window.loadRecorrentes=="function"&&await window.loadRecorrentes(),window.location.hash.includes("recorrentes")?typeof window.renderRecorrentes=="function"&&await window.renderRecorrentes():typeof window.renderDashboard=="function"&&await window.renderDashboard()}catch(a){console.error(a),Z({message:"Erro ao salvar recorrente",type:"error"})}}}),s=n.querySelector(".modal-body");s?s.appendChild(r):n.appendChild(r),document.body.appendChild(n)};function Td(n="theme-toggle-btn"){const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=document.documentElement,r=localStorage.getItem("theme"),s=r?r==="dark":e;t.classList.toggle("dark",s),a();const i=document.getElementById(n);i&&i.addEventListener("click",()=>{const u=t.classList.toggle("dark");localStorage.setItem("theme",u?"dark":"light"),a()});function a(){const u=document.getElementById("theme-icon");u&&(u.textContent=t.classList.contains("dark")?"🌙":"☀️")}}function Dn(n="#app-content"){let e=0,t=0;const r=50,s=["/dashboard","/transactions","/categories","/recorrentes","/settings"];function i(){const u=document.querySelector(".nav-btn.active")?.getAttribute("data-route"),h=s.indexOf(u);t<e-r&&h<s.length-1&&router(s[h+1]),t>e+r&&h>0&&router(s[h-1])}const a=document.querySelector(n);a&&(a.addEventListener("touchstart",u=>{e=u.changedTouches[0].screenX}),a.addEventListener("touchend",u=>{t=u.changedTouches[0].screenX,i()}))}async function pw(){const n=new rt;return(await mv(Ze,n)).user}async function mw(n,e){const t=ke(ne,"users",n,"transacoes");return await Pr(t,e)}async function gw(n,e,t){const r=ke(ne,"users",n,"historicoMensal"),s=t.toISOString().slice(0,7);await n_(Ye(r,s),{transacoes:e,dataFechamento:t.toISOString()})}async function yw(n){const e=ke(ne,"users",n,"transacoes"),t=await en(e),r=o_(ne);t.forEach(s=>r.delete(s.ref)),await r.commit()}async function Id(n){const e=ke(ne,"users",n,"despesasRecorrentes");return(await en(e)).docs.map(r=>({id:r.id,...r.data()}))}async function Yl(n,e,t){const r=Ye(ne,"users",n,"despesasRecorrentes",e);await ii(r,t)}function _w({titulo:n,valor:e,cor:t="",icone:r=""}){const s=document.createElement("div");switch(s.className="card-resumo",t){case"card-resumo receita":s.style.background="linear-gradient(90deg, #22c55e 80%, #16a34a 100%)",s.style.color="#fff";break;case"card-resumo despesa":s.style.background="linear-gradient(90deg, #ef4444 80%, #b91c1c 100%)",s.style.color="#fff";break;case"card-resumo saldo":s.style.background="linear-gradient(90deg, #3b82f6 80%, #1d4ed8 100%)",s.style.color="#fff";break;case"card-resumo orcado":s.style.background="linear-gradient(90deg, #eab308 80%, #f59e42 100%)",s.style.color="#fff";break;default:s.style.background="#fff",s.style.color="#222"}return s.innerHTML=`
    <div class="icon-bg">${r}</div>
    <div>
      <div class="titulo">${n}</div>
      <div class="valor">${e}</div>
    </div>
  `,s}function vw(){const n=document.createElement("div");return n.className="fixed bottom-5 right-5 flex flex-col items-end z-50 fab",n.style.zIndex="2001",n.style.bottom="70px",n.innerHTML=`
    <div id="fab-actions" class="hidden mb-2 space-y-3 transition-all duration-300">
      <button id="fab-transacao" class="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-xl text-sm hover:bg-blue-700 transition">
        ➕ Nova Transação
      </button>
      <button id="fab-recorrente" class="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-xl text-sm hover:bg-purple-700 transition">
        ♻️ Nova Recorrente
      </button>
    </div>
    <button id="fab-main" class="bg-gradient-to-tr from-indigo-500 to-blue-500 text-white w-16 h-16 rounded-full shadow-2xl text-3xl hover:scale-105 transform transition">
      +
    </button>
  `,setTimeout(()=>{const e=n.querySelector("#fab-main"),t=n.querySelector("#fab-actions"),r=n.querySelector("#fab-transacao"),s=n.querySelector("#fab-recorrente");e.addEventListener("click",()=>{t.classList.toggle("hidden")}),r.addEventListener("click",()=>{window.showAddTransactionModal(),t.classList.add("hidden")}),s.addEventListener("click",()=>{window.showAddRecorrenteModal(),t.classList.add("hidden")})},100),n}function ww(n){const e=document.createElement("nav");return e.className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around py-2 z-50 text-xs sm:text-sm",e.innerHTML=[{icon:"📊",label:"Dashboard",route:"/dashboard"},{icon:"💸",label:"Transações",route:"/transactions"},{icon:"📂",label:"Categorias",route:"/categories"},{icon:"♻️",label:"Recorrentes",route:"/recorrentes"},{icon:"⚙️",label:"Config.",route:"/settings"}].map(t=>`
    <button class="nav-btn flex flex-col items-center gap-0.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 ${n===t.route?"text-blue-600 font-semibold":""}"
            data-route="${t.route}">
      <span class="text-xl">${t.icon}</span>
      <span>${t.label}</span>
    </button>
  `).join(""),e}async function Ew(n){if(!confirm("Tem certeza que deseja excluir esta despesa recorrente?"))return;const e=window.FirebaseAuth?.currentUser;e&&(await dw(e.uid,n),Z({message:"Recorrente excluída com sucesso.",type:"success"}),typeof window.loadRecorrentes=="function"&&await window.loadRecorrentes(),window.location.hash.includes("recorrentes")?typeof window.renderRecorrentes=="function"&&await window.renderRecorrentes():typeof window.renderDashboard=="function"&&await window.renderDashboard())}function bw(n){const e=window.FirebaseAuth?.currentUser;e&&(hw(e.uid,n.id,{ativa:!n.ativa}),Z({message:"Status atualizado com sucesso.",type:"info"}),typeof window.renderRecorrentes=="function"&&window.renderRecorrentes())}window.handleDeleteRecorrente=Ew;window.handleToggleRecorrente=bw;function Tw(n,e){try{const t=new Date,r=new Date(n),s=t.getMonth()>r.getMonth()?t.getFullYear():r.getFullYear(),i=t.getMonth()+(e<=t.getDate()?1:0);return new Date(s,i,e)}catch{return new Date}}async function Iw(){const n=window.FirebaseAuth?.currentUser,e=window.appState?.currentBudget,t=document.getElementById("app-content");if(t.innerHTML=`
    <div class="bg-white rounded-xl shadow-lg p-4 flex justify-between items-center mb-4 font-inter">
      <h2 class="text-xl font-bold text-gray-900 font-inter">Despesas Recorrentes</h2>
      <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold font-inter">+ Nova Recorrente</button>
    </div>
    <div id="recorrentes-list"></div>
  `,!n||!e){document.getElementById("recorrentes-list").innerHTML='<p class="text-gray-500">Nenhum usuário ou orçamento ativo.</p>';return}const r=await lw(n.uid,e.id),s=document.getElementById("recorrentes-list");if(!r.length){s.innerHTML='<p class="text-gray-500">Nenhuma despesa recorrente cadastrada.</p>';return}s.innerHTML="",r.forEach(i=>{const u=Tw(i.dataInicio,i.diaLancamento||1).toLocaleDateString("pt-BR"),h=document.createElement("div");h.className="p-3 rounded-xl shadow-md bg-white dark:bg-gray-800 flex justify-between items-start mb-2 font-inter",h.innerHTML=`
      <div>
        <p class="font-semibold">${i.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(i.valor).toFixed(2)} • ${i.categoriaId||"Sem categoria"}</p>
        <p class="text-xs text-gray-400">${i.parcelasRestantes===null?"Infinito":i.parcelasRestantes+" parcelas restantes"}</p>
        ${i.ativa!==!1?'<p class="text-xs text-green-500 mt-1">Próxima aplicação: '+u+"</p>":""}
      </div>
      <div class="flex flex-col items-end gap-2">
        <button class="text-sm text-blue-500 hover:underline font-inter" onclick="window.showAddRecorrenteModal(${JSON.stringify(i).replace(/\"/g,"&quot;")})">Editar</button>
        <button class="text-sm text-red-500 hover:underline font-inter" onclick="window.handleDeleteRecorrente('${i.id}')">Excluir</button>
        <button class="text-sm text-yellow-500 hover:underline font-inter" onclick='window.handleToggleRecorrente(${JSON.stringify(i).replace(/\"/g,"&quot;")})'>
          ${i.ativa===!1?"▶️ Ativar":"⏸️ Pausar"}
        </button>
      </div>
    `,s.appendChild(h)})}window.FirebaseApp=Ea;window.FirebaseAuth=Ze;window.FirebaseDB=ne;window.appState={currentUser:null,transactions:[],categories:[],budgets:[],currentBudget:null,recorrentes:[]};function Eo(n){const e=document.getElementById("login-page"),t=document.querySelector(".app-container");n?(e&&(e.style.display="flex",document.body.classList.add("login-open")),t&&(t.style.display="none")):(e&&(e.style.display="none",document.body.classList.remove("login-open")),t&&(t.style.display="block"))}async function tn(){const n=document.querySelector(".nav-item.active")?.getAttribute("data-tab");if(n)switch(n){case"dashboard":await _r(),await Qe(),await Fs(),Pe();break;case"transactions":await _r(),ba();break;case"categories":await Qe(),Rd();break;case"settings":await Fs(),Sd();break}}async function Aw(n){try{const e=Ze.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget?.id;if(!t)throw new Error("Nenhum orçamento selecionado");const r=await Pr(ke(ne,"transactions"),{...n,userId:e.uid,budgetId:t,createdAt:ua()});return await tn(),Pe(),r}catch(e){throw e}}async function xw(n,e){try{const t=Ye(ne,"transactions",n);await ii(t,e),await tn(),Pe()}catch(t){throw t}}async function Ad(n){try{const e=Ye(ne,"transactions",n);await la(e),await tn(),Pe()}catch(e){throw e}}async function _r(){try{const n=Ze.currentUser;if(!n)return;const e=Pn(ke(ne,"transactions"),Vt("userId","==",n.uid),Vt("budgetId","==",window.appState.currentBudget?.id)),t=await en(e);window.appState.transactions=t.docs.map(r=>({id:r.id,...r.data()}))}catch(n){console.error("Erro ao carregar transações:",n)}}async function Rw(n){try{const e=Ze.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget?.id;if(!t)throw new Error("Nenhum orçamento selecionado");const r=await Pr(ke(ne,"categories"),{...n,nome:nr(n.nome),userId:e.uid,budgetId:t,createdAt:ua()});return await tn(),await Qe(),Pe(),r}catch(e){throw e}}async function Sw(n,e){try{const t=Ye(ne,"categories",n);await ii(t,e),await tn(),Pe()}catch(t){throw t}}async function Cw(n){try{const e=Ye(ne,"categories",n);await la(e),await tn(),await Qe(),Pe()}catch(e){throw e}}async function Qe(){try{const n=Ze.currentUser;if(!n)return;const e=Pn(ke(ne,"categories"),Vt("userId","==",n.uid),Vt("budgetId","==",window.appState.currentBudget?.id)),t=await en(e);window.appState.categories=t.docs.map(r=>({id:r.id,...r.data()}))}catch(n){console.error("Erro ao carregar categorias:",n)}}async function xd(n){try{const e=Ze.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=await Pr(ke(ne,"budgets"),{...n,userId:e.uid,createdAt:ua()});return await tn(),t.id}catch(e){throw console.error("Erro ao adicionar orçamento:",e),e}}async function Fs(){try{const n=Ze.currentUser;if(!n)return;const e=Pn(ke(ne,"budgets"),Vt("userId","==",n.uid)),t=await en(e);window.appState.budgets=t.docs.map(r=>({id:r.id,...r.data()}))}catch(n){console.error("Erro ao carregar orçamentos:",n)}}async function Pe(){try{const n=document.getElementById("app-content");if(!n)return;n.innerHTML="";const e=window.appState.transactions.filter(h=>h.tipo==="receita").reduce((h,f)=>h+parseFloat(f.valor),0),t=window.appState.transactions.filter(h=>h.tipo==="despesa").reduce((h,f)=>h+parseFloat(f.valor),0),r=e-t,i=window.appState.categories.reduce((h,f)=>h+parseFloat(f.limite||0),0)-t;n.innerHTML='<div id="dashboard-cards" class="grid grid-cols-4 gap-1 md:gap-4 mb-4"></div>'+n.innerHTML;const a=document.getElementById("dashboard-cards");a.innerHTML="",[{titulo:"Receitas",valor:`R$ ${e.toFixed(2)}`,cor:"card-resumo receita",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/></svg>'},{titulo:"Despesas",valor:`R$ ${t.toFixed(2)}`,cor:"card-resumo despesa",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 12h18" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/></svg>'},{titulo:"Saldo",valor:`R$ ${r.toFixed(2)}`,cor:"card-resumo saldo",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" stroke-width="2"/></svg>'},{titulo:"Orçado",valor:`R$ ${i.toFixed(2)}`,cor:"card-resumo orcado",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#eab308" stroke-width="2"/></svg>'}].forEach(h=>{a.appendChild(_w(h))}),n.innerHTML+=`
      <!-- Espaço entre cards e categorias -->
      <div style="height: 1.5rem;"></div>
      <!-- Categorias com Progresso -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Categorias</h3>
        <div class="space-y-2 md:space-y-4">
          ${window.appState.categories.map(h=>{const c=window.appState.transactions.filter(C=>C.categoriaId===h.id&&C.tipo==="despesa").reduce((C,N)=>C+parseFloat(N.valor),0),y=parseFloat(h.limite||0),v=y>0?c/y*100:0,R=y-c;return`
              <div class="border rounded-lg p-2 md:p-4">
                <div class="flex justify-between items-center mb-1 md:mb-2">
                  <div class="flex items-center space-x-2 md:space-x-3">
                    <div class="w-4 h-4 rounded-full" style="background-color: ${h.cor||"#4F46E5"}"></div>
                    <span class="font-semibold text-xs md:text-base">${h.nome}</span>
                  </div>
                  <div class="text-right">
                    <p class="text-xs md:text-sm text-gray-600">R$ ${c.toFixed(2)} / R$ ${y.toFixed(2)}</p>
                    <p class="text-xs md:text-sm ${R>=0?"text-green-600":"text-red-600"}">
                      Saldo: R$ ${R.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-1 md:mb-2">
                  <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${v>100?"bg-red-500":v>80?"bg-yellow-500":"bg-green-500"}" style="width: ${Math.min(v,100)}%"></div>
                </div>
                <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                  <button onclick="editCategory('${h.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
                  <button onclick="deleteCategory('${h.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
                  <button onclick="showCategoryHistory('${h.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
      <!-- Espaço entre categorias e despesas recorrentes -->
      <div style="height: 1.5rem;"></div>
      <!-- === Despesas Recorrentes === -->
      <div class="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 md:p-6 mb-4">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold text-gray-900 font-inter">Despesas Recorrentes</h3>
          <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold font-inter">
            + Nova Despesa Recorrente
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${(window.appState.recorrentes||[]).length===0?"<p class='text-gray-500 text-center py-4 font-inter'>Nenhuma despesa recorrente cadastrada</p>":(window.appState.recorrentes||[]).map(h=>{const f=(window.appState.categories||[]).find(c=>c.id===h.categoriaId);return`
                <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 gap-1 md:gap-0 bg-white shadow font-inter">
                  <div class="flex-1 min-w-[120px]">
                    <p class="font-medium text-xs md:text-base">${h.descricao}</p>
                    <p class="text-xs md:text-sm text-gray-500">
                      ${f?.nome||"Sem categoria"}
                      • R$ ${parseFloat(h.valor).toFixed(2)}
                      ${h.parcelasRestantes!==void 0?`• ${h.parcelasRestantes}x restantes`:""}
                    </p>
                  </div>
                  <div class="flex items-center space-x-1 md:space-x-2">
                    <button onclick="window.showAddRecorrenteModal(${JSON.stringify(h).replace(/\"/g,"&quot;")})" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                    <button onclick="window.handleDeleteRecorrente('${h.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                  </div>
                </div>
              `}).join("")}
        </div>
      </div>
      <!-- Espaço entre categorias e transações recentes -->
      <div style="height: 1.5rem;"></div>
      <!-- Transações Recentes -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold">Transações Recentes</h3>
          <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
            + Nova Transação
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${window.appState.transactions.slice(0,10).map(h=>{const f=window.appState.categories.find(c=>c.id===h.categoriaId);return`
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 gap-1 md:gap-0">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base">${h.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500">${f?.nome||"Sem categoria"} • ${h.createdAt&&h.createdAt.toDate?h.createdAt.toDate().toLocaleDateString():""}</p>
                </div>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <span class="font-bold text-xs md:text-base ${h.tipo==="receita"?"text-green-600":"text-red-600"}">
                    ${h.tipo==="receita"?"+":"-"}R$ ${parseFloat(h.valor).toFixed(2)}
                  </span>
                  <button onclick="window.editTransaction('${h.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                  <button onclick="window.deleteTransaction('${h.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,Nn(),Dn(),Or("/dashboard")}catch(n){console.error("Erro ao renderizar dashboard:",n);const e=document.getElementById("app-content");e&&(e.innerHTML+="<div class='text-red-600 text-center mt-4'>Erro ao carregar dashboard. Tente novamente.</div>")}}function ba(){const n=document.getElementById("app-content");n.innerHTML=`
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="tab-title-highlight">Transações</h2>
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
        `:window.appState.transactions.map(e=>{const t=window.appState.categories.find(r=>r.id===e.categoriaId);return`
            <div class="flex flex-wrap justify-between items-center p-2 md:p-4 border-b last:border-b-0 hover:bg-gray-50 gap-1 md:gap-0">
              <div class="flex-1 min-w-[120px]">
                <p class="font-medium text-xs md:text-base">${e.descricao}</p>
                <p class="text-xs md:text-sm text-gray-500">${t?.nome||"Sem categoria"} • ${e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString():""}</p>
              </div>
              <div class="flex items-center space-x-1 md:space-x-2">
                <span class="font-bold text-xs md:text-base ${e.tipo==="receita"?"text-green-600":"text-red-600"}">
                  ${e.tipo==="receita"?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
                </span>
                <button onclick="editTransaction('${e.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                <button onclick="deleteTransaction('${e.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,Nn(),Dn(),Or("/transactions")}function Rd(){const n=document.getElementById("app-content");n.innerHTML=`
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="tab-title-highlight">Categorias</h2>
        <button onclick="showAddCategoryModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Categoria</span>
          <button onclick="startVoiceRecognition('category')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        ${window.appState.categories.map(e=>{const r=window.appState.transactions.filter(u=>u.categoriaId===e.id&&u.tipo==="despesa").reduce((u,h)=>u+parseFloat(h.valor),0),s=parseFloat(e.limite||0),i=s>0?r/s*100:0,a=s-r;return`
            <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
              <div class="flex items-center justify-between mb-2 md:mb-4">
                <div class="flex items-center space-x-2 md:space-x-3">
                  <div class="w-6 h-6 rounded-full" style="background-color: ${e.cor||"#4F46E5"}"></div>
                  <span class="font-bold text-xs md:text-lg">${e.nome}</span>
                </div>
                <div class="text-right">
                  <p class="text-xs md:text-sm text-gray-600">Limite: R$ ${s.toFixed(2)}</p>
                  <p class="text-xs md:text-sm ${a>=0?"text-green-600":"text-red-600"}">
                    Saldo: R$ ${a.toFixed(2)}
                  </p>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-2 md:mb-4">
                <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${i>100?"bg-red-500":i>80?"bg-yellow-500":"bg-green-500"}" style="width: ${Math.min(i,100)}%"></div>
              </div>
              <div class="flex flex-wrap justify-between text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                <span>Gasto: R$ ${r.toFixed(2)}</span>
                <span>${i.toFixed(1)}% usado</span>
              </div>
              <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                <button onclick="editCategory('${e.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-base">Editar</button>
                <button onclick="deleteCategory('${e.id}')" class="bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-red-200 text-xs md:text-base">Excluir</button>
                <button onclick="showCategoryHistory('${e.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-base">Histórico</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,Nn(),Dn(),Or("/categories")}let hn=null;window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),hn=n,document.querySelector('.nav-item.active[data-tab="settings"]')&&bo(!0)});function bo(n){const e=document.getElementById("install-app-btn");e&&(e.style.display=n?"block":"none")}function Sd(){const n=document.getElementById("app-content");n.innerHTML=`
    <div class="space-y-2 md:space-y-8">
      <h2 class="tab-title-highlight">Configurações</h2>
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
          ${window.appState.budgets.map(t=>`
            <div class="border rounded-lg p-2 md:p-4 flex flex-wrap justify-between items-center">
              <div>
                <p class="font-medium text-xs md:text-base">${t.nome}</p>
                <p class="text-xs md:text-sm text-gray-500">ID: <span class='select-all'>${t.id}</span></p>
              </div>
              <div class="flex gap-1 md:space-x-2">
                <button onclick="copyBudgetId('${t.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-sm" title="Copiar ID do orçamento">
                  📋 Copiar ID
                </button>
                <button onclick="selectBudget('${t.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-sm">
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
  `,bo(!!hn);const e=document.getElementById("install-app-btn");e&&(e.onclick=async()=>{if(hn){hn.prompt();const{outcome:t}=await hn.userChoice;t==="accepted"&&(e.textContent="Aplicativo instalado!",e.disabled=!0),hn=null,bo(!1)}}),Nn(),Dn(),Or("/settings")}async function Vn(n){document.getElementById("app-content"),document.querySelectorAll(".nav-btn").forEach(t=>{t.classList.remove("active")});const e=document.querySelector(`.nav-btn[data-route='${n}']`);switch(e&&e.classList.add("active"),n){case"/dashboard":await Qe(),await _s(),await Pe();break;case"/transactions":ba();break;case"/categories":Qe().then(Rd);break;case"/recorrentes":await _s(),await Mw();break;case"/settings":Fs().then(Sd);break;default:await Qe(),await _s(),await Pe()}}function Zl(n){window.appState.currentBudget=n,Cd()}window.showAddTransactionModal=function(n={}){const e=$e({title:"Adicionar Transação",content:`
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <input type="text" id="transaction-descricao" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Supermercado"
                 value="${n.descricao||""}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input type="number" id="transaction-valor" required step="0.01" min="0"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00"
                 value="${n.valor!==void 0?n.valor:""}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="transaction-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select id="transaction-categoria" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            ${window.appState.categories.length>0?window.appState.categories.map(t=>`<option value="${t.id}" ${n.categoriaId===t.id?"selected":""}>${t.nome}</option>`).join(""):'<option value="" disabled>Nenhuma categoria disponível</option>'}
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
    `,onClose:()=>e.remove()});document.body.appendChild(e),document.getElementById("transaction-form").addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("transaction-descricao").value,s=parseFloat(document.getElementById("transaction-valor").value),i=document.getElementById("transaction-tipo").value,a=document.getElementById("transaction-categoria").value;try{await Aw({descricao:r,valor:s,tipo:i,categoriaId:a}),e.remove(),Pe(),Z({message:"Transação adicionada com sucesso!",type:"success"})}catch(u){console.error("Erro ao adicionar transação:",u),Z({message:"Erro ao adicionar transação: "+u.message,type:"error"})}})};window.showAddCategoryModal=function(n={}){const e=$e({title:"Adicionar Categoria",content:`
      <form id="category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="category-nome" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Alimentação"
                 value="${n.nome||""}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="category-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
          <input type="number" id="category-limite" step="0.01" min="0"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00"
                 value="${n.limite!==void 0?n.limite:""}">
          <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
          <input type="color" id="category-cor" value="${n.cor||"#4F46E5"}"
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
    `,onClose:()=>e.remove()});document.body.appendChild(e),document.getElementById("category-form").addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("category-nome").value,s=document.getElementById("category-tipo").value,i=parseFloat(document.getElementById("category-limite").value)||0,a=document.getElementById("category-cor").value;try{await Rw({nome:r,tipo:s,limite:i,cor:a}),e.remove(),Pe(),Z({message:"Categoria adicionada com sucesso!",type:"success"})}catch(u){console.error("Erro ao adicionar categoria:",u),Z({message:"Erro ao adicionar categoria: "+u.message,type:"error"})}})};window.showAddBudgetModal=function(){const n=$e({title:"Adicionar Orçamento",content:`
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
    `,onClose:()=>n.remove()});document.getElementById("budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-nome").value,r=document.getElementById("budget-descricao").value;try{await xd({nome:t,descricao:r}),n.remove(),Vn("/settings"),Z({message:"Orçamento adicionado com sucesso!",type:"success"})}catch(s){console.error("Erro ao adicionar orçamento:",s),Z({message:"Erro ao adicionar orçamento: "+s.message,type:"error"})}})};window.editTransaction=function(n){const e=window.appState.transactions.find(r=>r.id===n);if(!e){alert("Transação não encontrada");return}const t=$e({title:"Editar Transação",content:`
      <form id="edit-transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <input type="text" id="edit-transaction-descricao" required 
                 value="${e.descricao}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Supermercado">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input type="number" id="edit-transaction-valor" required step="0.01" min="0"
                 value="${e.valor}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="edit-transaction-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="receita" ${e.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${e.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select id="edit-transaction-categoria" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            ${window.appState.categories.map(r=>`<option value="${r.id}" ${e.categoriaId===r.id?"selected":""}>${r.nome}</option>`).join("")}
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const r=document.getElementById("edit-transaction-form");r&&r.addEventListener("submit",async s=>{s.preventDefault();const i=document.getElementById("edit-transaction-descricao").value,a=parseFloat(document.getElementById("edit-transaction-valor").value),u=document.getElementById("edit-transaction-tipo").value,h=document.getElementById("edit-transaction-categoria").value;try{await xw(n,{descricao:i,valor:a,tipo:u,categoriaId:h}),t.remove(),Vn("/dashboard"),Z({message:"Transação atualizada com sucesso!",type:"success"})}catch(f){console.error("Erro ao atualizar transação:",f),Z({message:"Erro ao atualizar transação: "+f.message,type:"error"})}})},0)};window.deleteTransaction=function(n){confirm("Tem certeza que deseja excluir esta transação?")&&Ad(n)};window.editCategory=function(n){const e=window.appState.categories.find(r=>r.id===n);if(!e){alert("Categoria não encontrada");return}const t=$e({title:"Editar Categoria",content:`
      <form id="edit-category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="edit-category-nome" required 
                 value="${e.nome}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Alimentação">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="edit-category-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="receita" ${e.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${e.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
          <input type="number" id="edit-category-limite" step="0.01" min="0"
                 value="${e.limite||""}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00">
          <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
          <input type="color" id="edit-category-cor" value="${e.cor||"#4F46E5"}"
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const r=document.getElementById("edit-category-form");r&&r.addEventListener("submit",async s=>{s.preventDefault();const i=document.getElementById("edit-category-nome").value,a=document.getElementById("edit-category-tipo").value,u=parseFloat(document.getElementById("edit-category-limite").value)||0,h=document.getElementById("edit-category-cor").value;try{await Sw(n,{nome:i,tipo:a,limite:u,cor:h}),t.remove(),Vn("/categories"),Z({message:"Categoria atualizada com sucesso!",type:"success"})}catch(f){console.error("Erro ao atualizar categoria:",f),Z({message:"Erro ao atualizar categoria: "+f.message,type:"error"})}})},0)};window.deleteCategory=function(n){confirm("Tem certeza que deseja excluir esta categoria?")&&Cw(n)};window.showCategoryHistory=function(n){const e=window.appState.categories.find(s=>s.id===n);if(!e){alert("Categoria não encontrada");return}const t=window.appState.transactions.filter(s=>s.categoriaId===n);t.filter(s=>s.tipo==="receita").reduce((s,i)=>s+parseFloat(i.valor),0),t.filter(s=>s.tipo==="despesa").reduce((s,i)=>s+parseFloat(i.valor),0);const r=$e({title:`Histórico - ${e.nome}`,content:`
      <div class="space-y-6">
        <!-- Bloco de resumo removido para evitar duplicidade -->
        <div>
          <h3 class="font-semibold text-lg mb-3">Transações (${t.length})</h3>
          ${t.length===0?`
            <p class="text-gray-500 text-center py-4">Nenhuma transação encontrada nesta categoria</p>
          `:`
            <div class="space-y-2 max-h-64 overflow-y-auto">
              ${t.map(s=>`
                <div class="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p class="font-medium">${s.descricao}</p>
                    <p class="text-sm text-gray-500">${s.createdAt&&s.createdAt.toDate?new Date(s.createdAt.toDate()).toLocaleDateString():""}</p>
                  </div>
                  <div class="text-right">
                    <span class="font-bold ${s.tipo==="receita"?"text-green-600":"text-red-600"}">
                      ${s.tipo==="receita"?"+":"-"}R$ ${parseFloat(s.valor).toFixed(2)}
                    </span>
                    <p class="text-xs text-gray-500">${s.tipo}</p>
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
    `,onClose:()=>r.remove()});document.body.appendChild(r)};window.copyBudgetId=function(n){navigator.clipboard.writeText(n),alert("ID copiado para a área de transferência!")};window.selectBudget=function(n){window.appState.currentBudget=window.appState.budgets.find(e=>e.id===n),_r(),Qe(),Vn("/dashboard")};window.exportToExcel=function(){const n=XLSX.utils.book_new(),e=window.appState.transactions.map(s=>({Descrição:s.descricao,Valor:s.valor,Tipo:s.tipo,Categoria:window.appState.categories.find(i=>i.id===s.categoriaId)?.nome||"",Data:s.createdAt&&s.createdAt.toDate?s.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(s=>({Nome:s.nome,Tipo:s.tipo,Limite:s.limite,Cor:s.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const r=window.appState.budgets.map(s=>({Nome:s.nome,Descrição:s.descricao,ID:s.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(r),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx")};window.exportToPDF=function(){const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(16),e.text("Resumo Financeiro",10,t),t+=10,e.setFontSize(12),e.text("Transações:",10,t),t+=8,window.appState.transactions.slice(0,20).forEach(r=>{e.text(`- ${r.descricao} | R$ ${r.valor} | ${r.tipo} | ${window.appState.categories.find(s=>s.id===r.categoriaId)?.nome||""}`,12,t),t+=7,t>270&&(e.addPage(),t=10)}),t+=5,e.text("Categorias:",10,t),t+=8,window.appState.categories.forEach(r=>{e.text(`- ${r.nome} | ${r.tipo} | Limite: R$ ${r.limite}`,12,t),t+=7,t>270&&(e.addPage(),t=10)}),t+=5,e.text("Orçamentos:",10,t),t+=8,window.appState.budgets.forEach(r=>{e.text(`- ${r.nome} | ID: ${r.id}`,12,t),t+=7,t>270&&(e.addPage(),t=10)}),e.save("financeiro-resumo.pdf")};window.downloadBackup=function(){const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="financeiro-backup.json",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)};window.importBackup=function(){const n=document.createElement("input");n.type="file",n.accept="application/json",n.onchange=async e=>{const t=e.target.files[0];if(!t)return;const r=await t.text();try{const s=JSON.parse(r);s.transactions&&s.categories&&s.budgets?alert("Importação de backup só está disponível para leitura neste protótipo."):alert("Arquivo de backup inválido.")}catch(s){alert("Erro ao importar backup: "+s.message)}},n.click()};window.startVoiceRecognition=function(n){console.log("DEBUG: startVoiceRecognition chamada",n),ys();const e=$e({title:"Reconhecimento de Voz",content:`
      <div class="voice-feedback text-center py-6">
        <div class="voice-animation mb-4">
          <svg class="animate-pulse mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18v4m0 0h-4m4 0h4m-4-8a4 4 0 01-4-4V5a4 4 0 118 0v5a4 4 0 01-4 4z"/></svg>
        </div>
        <p class="text-lg font-semibold">Ouvindo...</p>
        <p id="voice-status" class="text-sm text-gray-500 mt-2">Fale agora</p>
        <p class="mt-4 text-gray-700">Dica: você pode dizer, por exemplo:<br><span class="italic">"gastei 50 reais no supermercado em alimentação"</span></p>
        <div class="mt-4"><span id="voice-text" class="font-mono text-indigo-700"></span></div>
        <button onclick="closeModal()" class="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancelar</button>
      </div>
    `,onClose:()=>e.remove()});if(document.body.appendChild(e),!("webkitSpeechRecognition"in window)&&!("SpeechRecognition"in window)){alert("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.");return}const t=window.SpeechRecognition||window.webkitSpeechRecognition;console.log("DEBUG: Criando SpeechRecognition");const r=new t;r.lang="pt-BR",r.continuous=!1,r.interimResults=!1,r.maxAlternatives=1,r.onstart=function(){console.log("DEBUG: recognition.onstart");const s=document.getElementById("voice-status");s&&(s.textContent="Ouvindo...",s.className="text-sm text-green-600")},r.onresult=function(s){console.log("DEBUG: recognition.onresult",s);const i=s.results[0][0].transcript.toLowerCase(),a=document.getElementById("voice-status");a&&(a.textContent=`Reconhecido: "${i}"`,a.className="text-sm text-blue-600"),setTimeout(async()=>{e.remove();try{await Pw(i,n)}catch(u){Z({message:"Erro ao processar comando de voz: "+u.message,type:"error"})}},500)},r.onerror=function(s){console.error("DEBUG: recognition.onerror",s);const i=document.getElementById("voice-status");i&&(i.textContent=`Erro: ${s.error}`,i.className="text-sm text-red-600")},r.onend=function(){console.log("DEBUG: recognition.onend")},console.log("DEBUG: recognition.start()"),r.start()};async function Pw(n,e){try{const t=n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"");if(/\b(saldo|qual.*saldo|saldo atual)\b/.test(t)){const a=window.appState.transactions.filter(f=>f.tipo==="receita").reduce((f,c)=>f+parseFloat(c.valor),0),u=window.appState.transactions.filter(f=>f.tipo==="despesa").reduce((f,c)=>f+parseFloat(c.valor),0),h=a-u;Z({message:`Saldo atual: R$ ${h.toFixed(2)}`,type:"info"});return}if(/\b(ultimas transacoes|mostrar transacoes|quais.*gastos|listar transacoes)\b/.test(t)){const a=window.appState.transactions.slice(-5).reverse();if(a.length===0){Z({message:"Nenhuma transação encontrada.",type:"info"});return}let u=`Últimas transações:
`;a.forEach(h=>{const f=window.appState.categories.find(c=>c.id===h.categoriaId)?.nome||"";u+=`${h.descricao} - R$ ${parseFloat(h.valor).toFixed(2)} - ${h.tipo} - ${f}
`}),alert(u);return}const r=t.match(/editar transacao (.+)/);if(r){const a=r[1].trim(),u=window.appState.transactions.find(h=>h.descricao.toLowerCase().includes(a));u?window.editTransaction(u.id):Z({message:`Transação '${a}' não encontrada.`,type:"error"});return}const s=t.match(/excluir transacao (.+)/);if(s){const a=s[1].trim(),u=window.appState.transactions.find(h=>h.descricao.toLowerCase().includes(a));u?confirm(`Excluir transação '${u.descricao}'?`)&&(await Ad(u.id),Z({message:"Transação excluída!",type:"success"}),Pe()):Z({message:`Transação '${a}' não encontrada.`,type:"error"});return}const i=t.match(/(gastei|paguei|recebi|ganhei)\s+(\d+[\.,]?\d*)\s*(reais|rs)?\s*(no|na|em|de)?\s*([\w\s]+?)(?:\s+em\s+([\w\s]+))?$/);if(i){const a=i[1],u=parseFloat(i[2].replace(",","."));let h="despesa";(a==="recebi"||a==="ganhei")&&(h="receita");let f=(i[5]||"").trim(),c=(i[6]||"").trim();if(!c&&f.includes(" ")){const v=f.split(" ");c=v[v.length-1],f=v.slice(0,-1).join(" ")}let y=window.appState.categories.find(v=>v.nome.toLowerCase().includes(c));if(y||(y=window.appState.categories.find(v=>v.tipo===h)),!y){alert("Nenhuma categoria encontrada para o tipo. Crie uma categoria primeiro.");return}f||(f=y.nome),ys(),console.log("DEBUG: Abrindo formulário de transação/categoria por voz",{descricao:f,valor:u,tipo:h,categoriaId:y.id}),window.showAddTransactionModal({descricao:f,valor:u,tipo:h,categoriaId:y.id});return}e==="transaction"?(ys(),console.log("DEBUG: Chamando processTransactionVoice por voz"),await kw(n)):e==="category"&&(ys(),console.log("DEBUG: Chamando processCategoryVoice por voz"),await Dw(n))}catch(t){console.error("Erro ao processar comando de voz:",t),Z({message:"Erro ao processar comando de voz: "+t.message,type:"error"})}}function Ta(n){const e={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,sem:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3};return n?(n=n.toLowerCase().replace(/\./g,""),e[n]!==void 0?e[n]:n.includes(" e ")?n.split(" e ").map(Ta).reduce((t,r)=>t+r,0):NaN):NaN}async function kw(n){const t=n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").split(" ");if(t.length<4){alert('Comando inválido. Use: "descrição valor tipo categoria"');return}let r=t.findIndex(c=>!isNaN(parseFloat(c))),s=NaN;if(r!==-1)s=parseFloat(t[r]);else for(let c=0;c<t.length;c++){const y=Ta(t[c]);if(!isNaN(y)&&y>0){s=y,r=c;break}}if(isNaN(s)){alert('Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const i=t.findIndex(c=>/^(receita|receitas|despesa|despesas)$/.test(c));if(i===-1){alert("Tipo não encontrado (receita ou despesa)");return}let a=t[i];/^receita/.test(a)&&(a="receita"),/^despesa/.test(a)&&(a="despesa");const u=t[t.length-1],h=t.slice(0,r).join(" "),f=window.appState.categories.find(c=>nr(c.nome).includes(nr(u))||nr(u).includes(nr(c.nome)));if(!f){alert(`Categoria "${u}" não encontrada. Crie a categoria primeiro.`);return}window.showAddTransactionModal({descricao:h,valor:s,tipo:a,categoriaId:f.id})}async function Dw(n){const t=n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").split(" ");if(t.length<3){alert('Comando inválido. Use: "nome tipo limite"');return}const r=t.findIndex(c=>["receita","despesa"].includes(c));if(r===-1){alert("Tipo não encontrado (receita ou despesa)");return}const s=t[r];let i=t.findIndex(c=>!isNaN(parseFloat(c))),a=NaN;if(i!==-1)a=parseFloat(t[i]);else for(let c=0;c<t.length;c++){const y=Ta(t[c]);if(!isNaN(y)&&y>0){a=y,i=c;break}}if(isNaN(a)){alert('Limite não encontrado (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const u=t.slice(0,r).join(" ");if(!u){alert("Nome da categoria não encontrado");return}const h=["#4F46E5","#EF4444","#10B981","#F59E0B","#8B5CF6","#EC4899","#06B6D4","#84CC16"],f=h[Math.floor(Math.random()*h.length)];window.showAddCategoryModal({nome:u,tipo:s,limite:a,cor:f})}function Us(){console.log("DEBUG: closeModal chamada");const n=document.getElementById("app-modal");n&&n.remove(),document.querySelectorAll(".modal").forEach(t=>t.remove())}function To(){document.querySelectorAll(".nav-btn").forEach(n=>{n.addEventListener("click",async e=>{e.preventDefault();const t=n.getAttribute("data-route");await Vn(t)})})}function Vw(){const n=document.getElementById("btn-entrar");n&&(n.onclick=pw)}function Io(n){let e=document.getElementById("loading-page");e||(e=document.createElement("div"),e.id="loading-page",e.className="fixed inset-0 flex items-center justify-center bg-white z-50",e.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div><span class="text-lg font-semibold text-gray-700">Carregando...</span></div>',document.body.appendChild(e)),e.style.display=n?"flex":"none"}Ze.onAuthStateChanged(async n=>{if(Io(!0),n){window.appState.currentUser=n;try{if(await Fs(),window.appState.budgets.length===0){const e=await xd({nome:"Orçamento Principal",descricao:"Orçamento padrão do usuário"});await Zl({id:e,nome:"Orçamento Principal"})}else await Zl(window.appState.budgets[0]);await _r(),await Qe(),await _s(),Pe(),Eo(!1)}catch(e){console.error("Erro ao carregar dados do usuário:",e)}}else window.appState.currentUser=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.currentBudget=null,Eo(!0);Io(!1)});document.addEventListener("DOMContentLoaded",()=>{Td(),Dn(),Vw(),Eo(!0),To(),Nn();const n=document.getElementById("voice-control");n&&n.addEventListener("click",()=>{$e({title:"Comando de Voz",content:`
          <div class='space-y-4 text-center'>
            <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
            <div class='flex flex-col gap-3'>
              <button onclick='window.startVoiceRecognition("transaction")' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
              <button onclick='window.startVoiceRecognition("category")' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
            </div>
            <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
          </div>
        `,onClose:()=>modal.remove()})})});window.selectSharedBudget=function(){$e({title:"Entrar em Orçamento Compartilhado",content:`
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
    `,onClose:()=>modal.remove()}),document.getElementById("shared-budget-form").addEventListener("submit",async n=>{n.preventDefault();const e=document.getElementById("shared-budget-id").value.trim();if(e)try{const t=Ye(window.FirebaseDB,"budgets",e),s=(await en(Pn(ke(window.FirebaseDB,"budgets")))).docs.find(i=>i.id===e);if(!s){alert("Orçamento não encontrado!");return}window.appState.currentBudget={id:s.id,...s.data()},Us(),await _r(),await Qe(),Vn("/dashboard"),Z({message:"Você entrou no orçamento compartilhado!",type:"success"})}catch(t){Z({message:"Erro ao entrar no orçamento: "+t.message,type:"error"})}})};let Gi=null;function Cd(){Gi&&Gi();const n=window.appState.currentUser?.uid,e=window.appState.currentBudget?.id;if(!n||!e)return;const t=Pn(ke(ne,"transactions"),Vt("userId","==",n),Vt("budgetId","==",e));Gi=r_(t,r=>{window.appState.transactions=r.docs.map(i=>({id:i.id,...i.data()}));const s=document.querySelector(".nav-item.active")?.getAttribute("data-tab");["transactions","dashboard"].includes(s)&&(s==="transactions"&&ba(),s==="dashboard"&&Pe())})}Cd();window.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("login-page");n&&(n.style.display="none"),Io(!0)});window.generateUserGuide=function(){try{let a=function(y,v,R,C=170){const N=i.splitTextToSize(y,C);return R+N.length*8>270?(i.addPage(),20):(i.text(N,v,R),R+N.length*8+2)},u=function(y,v){return v>250&&(i.addPage(),v=20),i.setFontSize(16),i.setTextColor(79,70,229),i.text(y,20,v),v+12},h=function(y,v){return v>260&&(i.addPage(),v=20),i.setFontSize(12),i.setTextColor(79,70,229),i.text(y,20,v),v+8},f=function(y,v,R=25){return v>270&&(i.addPage(),v=20),i.setFontSize(11),i.setTextColor(0,0,0),i.text(y,R,v),v+8};var n=a,e=u,t=h,r=f;const{jsPDF:s}=window.jspdf,i=new s;i.setFont("helvetica"),i.setFillColor(79,70,229),i.rect(0,0,210,40,"F"),i.setTextColor(255,255,255),i.setFontSize(24),i.text("Servo Tech Finanças",20,25),i.setFontSize(14),i.text("Guia Completo do Usuário",20,35);let c=50;i.setTextColor(0,0,0),c=u("🎯 Bem-vindo ao Servo Tech Finanças!",c),c=a("O Servo Tech Finanças é um aplicativo completo e intuitivo para controle financeiro pessoal. Desenvolvido com foco na praticidade e simplicidade, ele oferece todas as ferramentas necessárias para você gerenciar suas finanças de forma eficiente e organizada.",20,c),c=h("🌟 Principais Funcionalidades:",c),c=f("📊 Dashboard completo com visão geral das finanças",c),c=f("💰 Gestão completa de receitas e despesas",c),c=f("🏷️ Categorização inteligente com limites de gastos",c),c=f("🎤 Comandos de voz para adicionar transações rapidamente",c),c=f("📈 Controle de orçamentos com compartilhamento",c),c=f("💾 Backup e restauração de dados",c),c=f("📱 Instalação como aplicativo (PWA)",c),c=f("🌙 Modo escuro para conforto visual",c),c=f("📊 Exportação de relatórios em Excel, PDF e JSON",c),c=u("📊 Dashboard - Centro de Controle Financeiro",c),c=a("O Dashboard é o coração do aplicativo, oferecendo uma visão completa e em tempo real de suas finanças. Aqui você encontra todos os dados importantes organizados de forma clara e intuitiva.",20,c),c+=8,c=h("📈 Cards Principais:",c),c=f("🟢 Receitas: Soma total de todo dinheiro recebido no período",c),c=f("   Inclui salários, bônus, rendimentos extras, etc.",c,30),c=f("🔴 Despesas: Soma total de todos os gastos realizados",c),c=f("   Contas, compras, lazer, transporte, etc.",c,30),c=f("🔵 Saldo: Receitas - Despesas (dinheiro disponível)",c),c=f("   Indica se você está no azul ou no vermelho",c,30),c=f("🟡 Orçado: Limite das categorias - Despesas",c),c=f("   Mostra quanto ainda pode gastar dentro dos limites",c,30),c+=8,c=h("📊 Seção de Categorias:",c),c=f("Barras de progresso coloridas para cada categoria",c),c=f("Verde: Dentro do limite estabelecido",c,30),c=f("Amarelo: Próximo do limite (80% ou mais)",c,30),c=f("Vermelho: Acima do limite (gasto excessivo)",c,30),c=f("Porcentagem de uso visível em cada barra",c,30),c+=8,c=h("📝 Transações Recentes:",c),c=f("Lista das últimas 10 transações realizadas",c),c=f("Mostra: Data, Descrição, Valor, Categoria e Tipo",c,30),c=f("Atualização automática em tempo real",c,30),c=f("Acesso rápido para editar ou excluir",c,30),c+=8,c=u("💰 Transações - Gestão Completa de Receitas e Despesas",c),c=a("A aba Transações é onde você gerencia todas as suas movimentações financeiras. Aqui você pode adicionar, editar, excluir e visualizar todas as transações.",20,c),c+=8,c=h("📝 Como Adicionar uma Transação:",c),c=f("Método 1 - Botão Flutuante (FAB):",c),c=f("1. Toque no botão + (canto inferior direito)",c,30),c=f("2. Preencha os campos obrigatórios:",c,30),c=f('   • Descrição: Nome da transação (ex: "Supermercado")',c,35),c=f("   • Valor: Quantia em reais (ex: 150,50)",c,35),c=f("   • Tipo: Receita ou Despesa",c,35),c=f("   • Categoria: Selecione uma categoria existente",c,35),c=f('3. Toque em "Adicionar"',c,30),c+=8,c=f("Método 2 - Aba Transações:",c),c=f('1. Vá na aba "Transações" (navegação inferior)',c,30),c=f('2. Toque em "+ Nova Transação"',c,30),c=f("3. Preencha os campos e confirme",c,30),c+=8,c=h("✏️ Como Editar uma Transação:",c),c=f("1. Localize a transação na lista",c),c=f("2. Toque no ícone ✏️ (lápis) ao lado",c,30),c=f("3. Modifique os campos desejados",c,30),c=f('4. Toque em "Salvar"',c,30),c+=8,c=h("🗑️ Como Excluir uma Transação:",c),c=f("1. Localize a transação na lista",c),c=f("2. Toque no ícone 🗑️ (lixeira) ao lado",c,30),c=f("3. Confirme a exclusão",c,30),c+=8,c=h("📊 Visualização de Transações:",c),c=f("Lista completa de todas as transações",c),c=f("Ordenadas por data (mais recentes primeiro)",c,30),c=f("Filtros por tipo (Receita/Despesa)",c,30),c=f("Busca por descrição",c,30),c=f("Atualização automática em tempo real",c,30),c+=8,c=h("💡 Dicas Importantes:",c),c=f("Use comandos de voz para adicionar mais rapidamente",c),c=f("Mantenha descrições claras e específicas",c),c=f("Categorize corretamente para melhor controle",c),c=f("Revise transações regularmente",c),c+=8,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🎤 Comandos de Voz - Revolução na Praticidade",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("O sistema de comandos de voz é uma das funcionalidades mais inovadoras do app.",20,c),c+=8,i.text("Permite adicionar transações e criar categorias sem precisar digitar,",20,c),c+=8,i.text("tornando o controle financeiro muito mais rápido e prático.",20,c),c+=12,i.text("🎯 Como Ativar o Comando de Voz:",20,c),c+=8,i.text("1. Toque no ícone do microfone no cabeçalho",25,c),c+=8,i.text('2. Aguarde a animação de "Ouvindo"',30,c),c+=8,i.text("3. Fale claramente o comando",30,c),c+=8,i.text("4. Aguarde a confirmação",30,c),c+=12,i.text("📝 Comando para Adicionar Transação:",20,c),c+=8,i.text('Formato: "descrição valor tipo categoria"',25,c),c+=8,i.text("Exemplos Práticos:",25,c),c+=8,i.text('• "supermercado cem despesa alimentação"',30,c),c+=8,i.text('• "salário mil quinhentos receita trabalho"',30,c),c+=8,i.text('• "padaria cinquenta despesa alimentação"',30,c),c+=8,i.text('• "uber trinta despesa transporte"',30,c),c+=8,i.text('• "bônus quinhentos receita trabalho"',30,c),c+=8,i.text('• "cinema oitenta despesa lazer"',30,c),c+=12,i.text("🏷️ Comando para Criar Categoria:",20,c),c+=8,i.text('Formato: "nome tipo limite"',25,c),c+=8,i.text("Exemplos Práticos:",25,c),c+=8,i.text('• "alimentação despesa cem"',30,c),c+=8,i.text('• "transporte despesa duzentos"',30,c),c+=8,i.text('• "lazer despesa cento cinquenta"',30,c),c+=8,i.text('• "trabalho receita zero"',30,c),c+=12,i.text("🔢 Valores por Extenso Suportados:",20,c),c+=8,i.text('Números: "zero", "um", "dois", "três", "quatro", "cinco"',25,c),c+=8,i.text('Dezenas: "dez", "vinte", "trinta", "quarenta", "cinquenta"',25,c),c+=8,i.text('Centenas: "cem", "duzentos", "trezentos", "quatrocentos"',25,c),c+=8,i.text('Milhares: "mil", "mil quinhentos", "dois mil"',25,c),c+=8,i.text('Compostos: "cento cinquenta", "mil duzentos"',25,c),c+=8,i.text('Sinônimos: "sem" = "cem" (para evitar confusão)',25,c),c+=12,i.text("💡 Dicas para Comandos de Voz:",20,c),c+=8,i.text("• Fale claramente e pausadamente",25,c),c+=8,i.text("• Use valores por extenso ao invés de números",25,c),c+=8,i.text("• Mantenha o microfone próximo",25,c),c+=8,i.text("• Evite ambientes muito barulhentos",25,c),c+=8,i.text("• Confirme sempre se o comando foi entendido",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🏷️ Categorias - Organização Inteligente dos Gastos",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("As categorias são fundamentais para organizar e controlar seus gastos de forma eficiente.",20,c),c+=8,i.text("Elas permitem que você estabeleça limites de gastos e monitore o progresso em tempo real.",20,c),c+=12,i.text("📝 Como Criar uma Categoria:",20,c),c+=8,i.text("Método 1 - Interface:",25,c),c+=8,i.text('1. Vá na aba "Categorias" (navegação inferior)',30,c),c+=8,i.text('2. Toque em "+ Nova Categoria"',30,c),c+=8,i.text("3. Preencha os campos:",30,c),c+=8,i.text('   • Nome: Nome da categoria (ex: "Alimentação")',35,c),c+=8,i.text("   • Tipo: Receita ou Despesa",35,c),c+=8,i.text("   • Limite: Valor máximo mensal (opcional)",35,c),c+=8,i.text("   • Cor: Escolha uma cor para identificação",35,c),c+=8,i.text('4. Toque em "Criar"',30,c),c+=12,i.text("Método 2 - Comando de Voz:",25,c),c+=8,i.text("1. Ative o microfone",30,c),c+=8,i.text('2. Diga: "nome tipo limite"',30,c),c+=8,i.text('3. Exemplo: "alimentação despesa cem"',30,c),c+=12,i.text("📊 Sistema de Controle por Cores:",20,c),c+=8,i.text("🟢 Verde: Dentro do limite estabelecido",25,c),c+=8,i.text("   • Gasto abaixo de 80% do limite",30,c),c+=8,i.text("   • Situação financeira saudável",30,c),c+=8,i.text("🟡 Amarelo: Próximo do limite",25,c),c+=8,i.text("   • Gasto entre 80% e 100% do limite",30,c),c+=8,i.text("   • Atenção: Reduza gastos nesta categoria",30,c),c+=8,i.text("🔴 Vermelho: Acima do limite",25,c),c+=8,i.text("   • Gasto superior ao limite estabelecido",30,c),c+=8,i.text("   • Alerta: Necessário ajuste imediato",30,c),c+=12,i.text("📈 Categorias Recomendadas:",20,c),c+=8,i.text("Para Despesas:",25,c),c+=8,i.text("• Alimentação (supermercado, restaurantes)",30,c),c+=8,i.text("• Transporte (combustível, Uber, transporte público)",30,c),c+=8,i.text("• Moradia (aluguel, contas, manutenção)",30,c),c+=8,i.text("• Lazer (cinema, shows, viagens)",30,c),c+=8,i.text("• Saúde (médico, farmácia, plano de saúde)",30,c),c+=8,i.text("• Educação (cursos, livros, material escolar)",30,c),c+=8,i.text("Para Receitas:",25,c),c+=8,i.text("• Trabalho (salário, bônus, comissões)",30,c),c+=8,i.text("• Investimentos (rendimentos, dividendos)",30,c),c+=8,i.text("• Freelance (trabalhos extras)",30,c),c+=12,i.text("✏️ Gerenciando Categorias:",20,c),c+=8,i.text("• Editar: Toque no ícone ✏️ ao lado da categoria",25,c),c+=8,i.text("• Excluir: Toque no ícone 🗑️ ao lado da categoria",25,c),c+=8,i.text("• Visualizar transações: Toque na categoria",25,c),c+=8,i.text("• Ajustar limites: Edite conforme necessário",25,c),c+=12,i.text("💡 Dicas para Categorias Eficientes:",20,c),c+=8,i.text("• Crie categorias específicas e claras",25,c),c+=8,i.text("• Estabeleça limites realistas baseados na renda",25,c),c+=8,i.text("• Use cores diferentes para fácil identificação",25,c),c+=8,i.text("• Revise e ajuste limites mensalmente",25,c),c+=8,i.text("• Monitore as barras de progresso regularmente",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("⚙️ Configurações - Centro de Personalização",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("A aba Configurações é o centro de controle do aplicativo, onde você pode personalizar",20,c),c+=8,i.text("sua experiência, gerenciar dados e acessar funcionalidades avançadas.",20,c),c+=12,i.text("📖 Guia do Usuário:",20,c),c+=8,i.text("• Baixe este manual completo em PDF",25,c),c+=8,i.text("• Acesso offline ao guia de uso",25,c),c+=8,i.text("• Referência completa de todas as funcionalidades",25,c),c+=12,i.text("👤 Perfil do Usuário:",20,c),c+=8,i.text("• Visualizar email da conta Google",25,c),c+=8,i.text("• Fazer logout da aplicação",25,c),c+=8,i.text("• Gerenciar sessão de login",25,c),c+=12,i.text("💰 Sistema de Orçamentos:",20,c),c+=8,i.text("Criar Novo Orçamento:",25,c),c+=8,i.text("• Defina um nome para o orçamento",30,c),c+=8,i.text("• Estabeleça período de vigência",30,c),c+=8,i.text("• Configure categorias e limites",30,c),c+=8,i.text("Compartilhar Orçamento:",25,c),c+=8,i.text("• Gere um ID único do orçamento",30,c),c+=8,i.text("• Compartilhe com família ou amigos",30,c),c+=8,i.text("• Controle colaborativo de gastos",30,c),c+=8,i.text("Entrar em Orçamento Compartilhado:",25,c),c+=8,i.text("• Cole o ID do orçamento compartilhado",30,c),c+=8,i.text("• Acesse dados compartilhados",30,c),c+=8,i.text("• Contribua com transações",30,c),c+=12,i.text("📊 Exportação de Dados:",20,c),c+=8,i.text("Excel (.xlsx):",25,c),c+=8,i.text("• Formato ideal para análise em planilhas",30,c),c+=8,i.text("• Compatível com Microsoft Excel e Google Sheets",30,c),c+=8,i.text("• Inclui todas as transações e categorias",30,c),c+=8,i.text("PDF (.pdf):",25,c),c+=8,i.text("• Relatório formatado para impressão",30,c),c+=8,i.text("• Resumo financeiro completo",30,c),c+=8,i.text("• Gráficos e estatísticas",30,c),c+=8,i.text("JSON (.json):",25,c),c+=8,i.text("• Backup completo de todos os dados",30,c),c+=8,i.text("• Formato para restauração futura",30,c),c+=8,i.text("• Compatível com outros sistemas",30,c),c+=12,i.text("📱 Instalação como Aplicativo (PWA):",20,c),c+=8,i.text("• Baixe o app no seu celular",25,c),c+=8,i.text("• Acesso offline às funcionalidades",25,c),c+=8,i.text("• Experiência nativa de aplicativo",25,c),c+=8,i.text("• Notificações push (futuro)",25,c),c+=12,i.text("🌙 Modo Escuro:",20,c),c+=8,i.text("• Alternar entre tema claro e escuro",25,c),c+=8,i.text("• Reduz fadiga visual",25,c),c+=8,i.text("• Economiza bateria em telas OLED",25,c),c+=8,i.text("• Preferência salva automaticamente",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("💡 Dicas e Truques para Aproveitar Melhor",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("🚀 Dicas de Produtividade:",20,c),c+=8,i.text("• Use comandos de voz para adicionar transações rapidamente",25,c),c+=8,i.text("• Configure limites realistas nas categorias",25,c),c+=8,i.text("• Faça backup regular dos seus dados",25,c),c+=8,i.text("• Instale o app para acesso offline",25,c),c+=8,i.text("• Compartilhe orçamentos com família/amigos",25,c),c+=8,i.text('• Monitore o card "Orçado" para controle de gastos',25,c),c+=8,i.text("• Use cores diferentes para categorias",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🔧 Solução de Problemas Comuns",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("❓ Comando de voz não funciona:",20,c),c+=8,i.text("• Verifique se o microfone está ativo",25,c),c+=8,i.text("• Fale claramente e pausadamente",25,c),c+=8,i.text('• Use valores por extenso: "cem" ao invés de "100"',25,c),c+=8,i.text("❓ Transação não aparece:",20,c),c+=8,i.text("• Aguarde alguns segundos (atualização automática)",25,c),c+=8,i.text("• Verifique se está na categoria correta",25,c),c+=8,i.text("❓ App não carrega:",20,c),c+=8,i.text("• Verifique sua conexão com a internet",25,c),c+=8,i.text("• Faça login novamente se necessário",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🆘 Suporte e Contato",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("👨‍💻 Fundador: Igor Bispo",20,c),c+=8,i.text("📱 Versão do App: 1.0",20,c),c+=8,i.text("📅 Data do Guia: "+new Date().toLocaleDateString("pt-BR"),20,c),c+=8,i.text("🌐 URL: https://controle-financeiro-b98ec.web.app",20,c),c+=8,i.text("💡 Para dúvidas, consulte este guia ou entre em contato.",20,c),c+=15,i.setFillColor(79,70,229),i.rect(0,270,210,30,"F"),i.setTextColor(255,255,255),i.setFontSize(10),i.text("Servo Tech Finanças - Transformando sua vida financeira",20,280),i.text("© 2025 • Fundador: Igor Bispo • Versão 1.0",20,290),i.save("Servo-Tech-Financas-Guia-Usuario.pdf")}catch(s){console.error("Erro ao gerar PDF:",s),Z({message:"Erro ao gerar PDF. Verifique se a biblioteca jsPDF está carregada.",type:"error"})}};function Nn(){let n=document.querySelector(".fab");n&&n.remove(),window.appState.currentUser&&(n=vw(),document.body.appendChild(n))}window.closeModal=Us;function ys(){console.log("DEBUG: closeVoiceModalIfOpen chamado");const n=document.getElementById("app-modal");n&&n.remove()}document.addEventListener("DOMContentLoaded",()=>{Td(),Dn(),setTimeout(()=>{const n=document.getElementById("voice-control");n&&!n.dataset.voiceBound&&(n.addEventListener("click",()=>{console.log("DEBUG: Botão de voz do topo clicado!");const e=$e({title:"Comando de Voz",content:`
            <div class='space-y-4 text-center'>
              <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
              <div class='flex flex-col gap-3'>
                <button id='btn-voz-transacao' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
                <button id='btn-voz-categoria' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
              </div>
              <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
            </div>
          `,onClose:()=>e.remove()});document.body.appendChild(e),setTimeout(()=>{document.getElementById("btn-voz-transacao")?.addEventListener("click",()=>{Us(),window.startVoiceRecognition("transaction")}),document.getElementById("btn-voz-categoria")?.addEventListener("click",()=>{Us(),window.startVoiceRecognition("category")})},100)}),n.dataset.voiceBound="1")},500)});function nr(n){return n.normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").toLowerCase().replace(/[.,;:!?]+$/,"").trim()}function Nw(){const n=document.querySelector(".bottom-nav");if(!n)return;n.addEventListener("click",t=>{const r=t.target.closest(".nav-btn");r&&(n.querySelectorAll(".nav-btn").forEach(s=>{s.classList.remove("active"),s.style.background="",s.style.color="",s.style.fontWeight=""}),r.classList.add("active"),r.style.background="#3b82f6",r.style.color="#fff",r.style.fontWeight="700")});const e=n.querySelector(".nav-btn.active");e&&(e.style.background="#3b82f6",e.style.color="#fff",e.style.fontWeight="700")}Nw();async function Ow(){const n=window.FirebaseAuth.currentUser;if(!n)return;const e=new Date;if(e.getDate()!==1)return;const t=localStorage.getItem("ultimoFechamentoMensal"),r=e.toISOString().slice(0,7);if(t===r)return;await gw(n.uid,window.appState.transactions,e),await yw(n.uid);const s=await Id(n.uid);for(const i of s)i.ativa!==!1&&(!i.parcelasRestantes||i.parcelasRestantes>0)&&(await mw(n.uid,{descricao:i.descricao,valor:i.valor,categoriaId:i.categoriaId,tipo:"despesa",createdAt:new Date,recorrenteId:i.id}),i.parcelasRestantes&&(await Yl(n.uid,i.id,{parcelasRestantes:i.parcelasRestantes-1}),i.parcelasRestantes-1<=0&&await Yl(n.uid,i.id,{ativa:!1})));localStorage.setItem("ultimoFechamentoMensal",r)}Ow();async function _s(){try{const n=window.FirebaseAuth.currentUser;if(!n){window.appState.recorrentes=[];return}window.appState.recorrentes=await Id(n.uid)}catch(n){window.appState.recorrentes=[],console.error("Erro ao carregar despesas recorrentes:",n)}}function Or(n){let e=document.querySelector("nav.bottom-nav");e&&e.remove(),window.appState.currentUser&&(e=ww(n),e.classList.add("bottom-nav"),document.body.appendChild(e),typeof To=="function"&&To())}async function Mw(){await Iw(),Nn(),Or("/recorrentes")}
