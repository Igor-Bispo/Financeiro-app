# 🔧 Guia de Troubleshooting - APK Android

## 📱 APK Versão 1.0.23 (versionCode: 24)

---

## ✅ VERIFICAÇÕES REALIZADAS

### 1. **Configurações do Capacitor**
- ✅ `capacitor.config.json` configurado corretamente
- ✅ `serverClientId` do Google Auth presente
- ✅ `webDir` apontando para `dist/`
- ✅ `androidScheme` configurado como `https`

### 2. **Configurações do Android**
- ✅ `build.gradle` com versionCode 24 e versionName 1.0.23
- ✅ `strings.xml` com `server_client_id` configurado
- ✅ `AndroidManifest.xml` com todas as permissões necessárias
- ✅ Google Services configurado

### 3. **Configurações do Firebase**
- ✅ Firebase inicializado corretamente
- ✅ Auth configurado com `browserLocalPersistence`
- ✅ Firestore rules permitindo acesso autenticado

### 4. **Sistema de Login**
- ✅ APK Login Handler implementado
- ✅ Borda verde como indicador visual
- ✅ Chrome Custom Tabs para Google Auth
- ✅ Login anônimo (convidado) funcional
- ✅ Persistência de sessão

### 5. **Build e Deploy**
- ✅ Build limpo (gradle clean)
- ✅ Assets sincronizados (cap sync)
- ✅ APK gerado com sucesso (22.91 MB)
- ✅ Service Worker v4.64.0

---

## 🚨 PROBLEMAS CONHECIDOS E SOLUÇÕES

### **Problema 1: Snackbar Duplicado**
**Sintoma:** Mensagem "Aplicação carregada" aparece duas vezes

**Causa:** Evento `app:ready` sendo escutado em múltiplos lugares

**Solução Aplicada:**
- ✅ Removido Snackbar do listener em `eventConfig.js` (linha 193)
- ✅ Mantido apenas o log para debug

**Arquivo:** `src/core/events/eventConfig.js`

---

### **Problema 2: Tela de Login Sobreposta**
**Sintoma:** Duas telas de login aparecem simultaneamente

**Causa:** `setupLoginButton()` sendo chamado em dois lugares

**Solução Aplicada:**
- ✅ Removida chamada duplicada em `app.js` (linha 1850)
- ✅ Mantida apenas a chamada em `entry.js` (linha 178)

**Arquivos:**
- `src/js/app.js`
- `src/app/entry.js`

---

### **Problema 3: Botão de Login Não Responde**
**Sintoma:** Clique no botão Google não faz nada

**Causa:** Handler não sendo configurado ou configurado múltiplas vezes

**Solução Aplicada:**
- ✅ Borda verde adicionada como indicador visual (linha 280)
- ✅ Retry logic implementado (5 tentativas, 300ms delay)
- ✅ Logs detalhados para debugging
- ✅ Prevenção de múltiplos listeners (cloneNode)

**Arquivo:** `src/js/apk-login-handler.js`

---

### **Problema 4: Orçamentos Não Carregam**
**Sintoma:** Após login, os orçamentos do usuário não aparecem

**Causa:** `activateRealtimeAfterLogin` não sendo chamado

**Solução Aplicada:**
- ✅ Chamada explícita após login Google (linha 343)
- ✅ Chamada após login anônimo (linha 195)
- ✅ Retry automático em caso de falha (3 tentativas)

**Arquivo:** `src/js/apk-login-handler.js`

---

### **Problema 5: APK Não Atualiza**
**Sintoma:** APK instalado mostra versão antiga

**Causa:** Android não reconhece a atualização

**Solução:**
1. **Desinstale completamente** o app antigo
2. **Limpe os dados** do app (Configurações > Apps)
3. **Instale o novo APK** (1.0.23)
4. **Verifique a versão** em Configurações > Informações do Sistema

---

### **Problema 6: Sessão Perdida ao Minimizar**
**Sintoma:** Ao voltar ao app, precisa fazer login novamente

**Causa:** Persistência de sessão não configurada

**Solução Aplicada:**
- ✅ `browserLocalPersistence` configurado no Firebase Auth
- ✅ `checkPersistentAuth()` verifica sessão ao abrir o app
- ✅ Retry automático para restaurar sessão

**Arquivo:** `src/js/apk-login-handler.js` (linha 64-93)

---

## 🔍 COMO DEBUGAR O APK

### **1. Conectar Dispositivo ao PC**
```bash
# Verificar se o dispositivo está conectado
adb devices
```

### **2. Ver Logs em Tempo Real**
```bash
# Filtrar apenas logs do app
adb logcat | findstr "chromium"
adb logcat | findstr "APK-Handler"
adb logcat | findstr "AuthService"
```

### **3. Verificar Console do Chrome**
1. Abra o Chrome no PC
2. Acesse: `chrome://inspect`
3. Selecione o dispositivo
4. Clique em "inspect" no app

### **4. Limpar Cache do App**
```bash
# Limpar dados do app via ADB
adb shell pm clear com.financeiro.app
```

---

## 📋 CHECKLIST DE INSTALAÇÃO

Antes de instalar o APK, verifique:

- [ ] Desinstalou a versão antiga completamente
- [ ] Limpou os dados do app antigo
- [ ] Tem conexão com a internet
- [ ] Permitiu instalação de fontes desconhecidas
- [ ] Transferiu o APK correto (1.0.23)

Durante a instalação:

- [ ] Instalação concluiu sem erros
- [ ] App aparece na lista de apps
- [ ] Ícone do app está correto

Ao abrir o app:

- [ ] Tela de splash aparece
- [ ] Tela de login carrega
- [ ] Snackbar "Aplicação carregada" aparece APENAS 1 vez
- [ ] Botão Google tem BORDA VERDE na parte inferior
- [ ] Botão responde ao clique

Após clicar no botão Google:

- [ ] Navegador abre (Chrome Custom Tab)
- [ ] Página de login do Google aparece
- [ ] Consegue selecionar conta
- [ ] Retorna ao app automaticamente
- [ ] Dashboard carrega com os dados do usuário

---

## 🎯 INDICADORES DE SUCESSO

### **Borda Verde no Botão**
Se o botão Google tem uma **borda verde** na parte inferior, significa que:
- ✅ APK Login Handler foi carregado
- ✅ Capacitor foi detectado
- ✅ Plugin GoogleAuth está disponível
- ✅ Botão está configurado corretamente

### **Logs no Console**
Se você ver estes logs, está tudo OK:
```
🚨🚨🚨 [APK-Handler] ARQUIVO CARREGADO! 🚨🚨🚨
🚨🚨🚨 [APK-Handler] FUNÇÃO EXECUTADA! 🚨🚨🚨
✅ [APK-Handler] Borda verde aplicada ao botão Google
📱 [APK-Handler] APK detectado, procurando botões...
```

---

## 🆘 SE AINDA NÃO FUNCIONAR

### **Opção 1: Build de Release**
Gerar um APK de release assinado:
```bash
cd android
./gradlew assembleRelease
```

### **Opção 2: Verificar Google Cloud Console**
1. Acesse: https://console.cloud.google.com/
2. Selecione o projeto: `controle-financeiro-b98ec`
3. Vá em: APIs & Services > Credentials
4. Verifique se o **Android Client ID** está configurado
5. Verifique se o **SHA-1** do keystore está registrado

### **Opção 3: Regenerar Keystore**
Se o SHA-1 não estiver correto:
```bash
# Gerar novo keystore
keytool -genkey -v -keystore release.keystore -alias financeiro -keyalg RSA -keysize 2048 -validity 10000

# Obter SHA-1
keytool -list -v -keystore release.keystore -alias financeiro
```

### **Opção 4: Usar Web Client ID**
Se o Android Client ID não funcionar, tente usar o **Web Client ID** no `capacitor.config.json`:
```json
"serverClientId": "418109336597-mi7u3efmc2g9854r7uboupcc9iru3v5h.apps.googleusercontent.com"
```

---

## 📞 SUPORTE

Se nenhuma solução funcionar, forneça:
1. Logs do `adb logcat`
2. Logs do Chrome DevTools (`chrome://inspect`)
3. Screenshot da tela de login
4. Versão do Android do dispositivo

---

**Última atualização:** 10/10/2025 12:01:35
**Versão do APK:** 1.0.23 (versionCode: 24)
**Service Worker:** v4.64.0

