# 🚀 Deploy e Monitoramento via Android Studio

## 📱 **CONFIGURAÇÃO INICIAL**

### **1. Abrir Projeto no Android Studio**
1. Abra o Android Studio
2. Clique em **"Open"**
3. Navegue até: `C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app\android`
4. Clique em **"OK"**
5. Aguarde o **Gradle Sync** finalizar (pode demorar 1-2 minutos na primeira vez)

### **2. Conectar Dispositivo**
1. Conecte o celular via **USB**
2. No celular, ative **Depuração USB** (Configurações > Opções do desenvolvedor)
3. Autorize o PC quando aparecer a mensagem no celular
4. No topo do Android Studio, você verá o nome do seu dispositivo

---

## 🏗️ **FAZER BUILD E INSTALAR**

### **Opção 1: Via Android Studio (Recomendado)**

1. **Clique no botão verde "Run" (▶)** no topo do Android Studio
   - OU pressione **Shift + F10**
   
2. Aguarde o build e instalação automática

3. O app será aberto automaticamente no celular

### **Opção 2: Via Gradle (Manual)**

1. No Android Studio, abra o **Terminal** (Alt + F12)

2. Execute:
   ```bash
   ./gradlew assembleDebug
   ```

3. Instale manualmente:
   - Arraste o APK para o celular
   - OU use `adb install app/build/outputs/apk/debug/app-debug.apk`

---

## 📊 **MONITORAR LOGS EM TEMPO REAL**

### **Via Android Studio Logcat (Melhor opção)**

1. Na parte inferior do Android Studio, clique em **"Logcat"**

2. No campo de filtro, digite:
   ```
   APK-Handler
   ```

3. Você verá os logs em tempo real coloridos

4. **Filtros úteis:**
   - `APK-Handler` - Logs do sistema de login APK
   - `chromium` - Logs do navegador (Google Auth)
   - `AuthService` - Logs de autenticação
   - `Bootstrap` - Logs de inicialização
   - `firebase` - Logs do Firebase

### **Filtros Avançados**

Para ver múltiplos filtros ao mesmo tempo, use:
```
tag:APK-Handler OR tag:chromium OR tag:AuthService
```

OU expressão regular:
```
APK-Handler|AuthService|Bootstrap|firebase
```

---

## 🔍 **LOGS CRÍTICOS PARA VERIFICAR**

Quando você fizer login com Google, procure por estas linhas:

### **1. Início do Google Login**
```
🚀 [APK-Handler] ===== INICIANDO GoogleAuth.signIn() ===== 🚀
```

### **2. Google User Retornado**
```
✅ [APK-Handler] Login Google bem-sucedido via Chrome!
============================================================
📧 [APK-Handler] Email do Google: seu@email.com
👤 [APK-Handler] Nome do Google: Seu Nome
🆔 [APK-Handler] Google ID: 1234567890
🔑 [APK-Handler] ID Token presente: true
```

### **3. Firebase User Após Conversão**
```
✅ [APK-Handler] Credencial convertida para Firebase!
============================================================
🔐 [APK-Handler] UID Firebase: abc123xyz...
📧 [APK-Handler] Email Firebase: seu@email.com
👤 [APK-Handler] Display Name Firebase: Seu Nome
🆔 [APK-Handler] Provider ID: google.com
✅ [APK-Handler] isAnonymous: false
```

### **4. Comparação (CRÍTICO)**
```
🔍 [APK-Handler] COMPARAÇÃO Google vs Firebase:
   Google Email: seu@email.com
   Firebase Email: seu@email.com
   Emails correspondem? true
```

### **5. Verificação de Anônimo (CRÍTICO)**
```
✅ [APK-Handler] Usuário NÃO é anônimo - login Google válido!
✅ [APK-Handler] appState.currentUser atualizado: seu@email.com
```

---

## 🚨 **ERROS PARA OBSERVAR**

Se você ver **qualquer um destes logs**, me avise IMEDIATAMENTE:

### **❌ Erro 1: Usuário Anônimo Após Google Login**
```
❌❌❌ [APK-Handler] ERRO CRÍTICO: Usuário está ANÔNIMO após login Google!
```
**Significado:** O Firebase converteu o token mas criou um usuário anônimo

### **❌ Erro 2: Emails Não Correspondem**
```
🔍 Emails correspondem? false
```
**Significado:** Google retornou um email mas Firebase usou outro

### **❌ Erro 3: Provider ID Incorreto**
```
🆔 [APK-Handler] Provider ID: null
```
**Significado:** Firebase não reconheceu o Google como provider

---

## 🔄 **WORKFLOW DE DESENVOLVIMENTO**

### **Para fazer mudanças rápidas:**

1. **Edite o código** no VS Code/Cursor

2. **Build rápido:**
   ```bash
   npm run build
   npx cap sync android
   ```

3. **No Android Studio:**
   - Clique no botão **"Run" (▶)**
   - OU pressione **Shift + F10**

4. **App será reinstalado** automaticamente

5. **Veja os logs** no Logcat

### **Para mudanças apenas em JavaScript/CSS:**

1. Edite o código

2. Execute:
   ```bash
   npm run build
   npx cap sync android
   ```

3. No Android Studio, clique em **"Run"**

---

## 📋 **CHECKLIST DE TESTE**

Ao fazer login, verifique:

- [ ] Snackbar aparece APENAS 1 vez
- [ ] Botão Google tem **borda verde**
- [ ] Clique abre o navegador (Chrome)
- [ ] Consegue selecionar a conta
- [ ] Retorna ao app automaticamente
- [ ] **Vê os logs no Logcat**
- [ ] `isAnonymous: false` nos logs
- [ ] `Emails correspondem? true` nos logs
- [ ] Email correto aparece na aba Config
- [ ] Orçamentos carregam corretamente

---

## 🎯 **PRÓXIMOS PASSOS**

1. **Abra o Android Studio**
2. **Abra o projeto:** `Financeiro-app/android`
3. **Clique em Run (▶)**
4. **Abra o Logcat**
5. **Filtre por:** `APK-Handler`
6. **Faça login** no app
7. **Copie TODOS os logs** e me envie

Com os logs em tempo real, vou identificar exatamente onde está o problema! 🔍✨

