## 📱 **Guia de Correção do Login Android (APK)**

### **🔧 Problema Identificado**
O login do APK não está funcionando porque:
1. ❌ **Client ID Android incorreto** no `google-services.json`
2. ❌ **SHA-1 Fingerprint** pode não estar registrado no Firebase Console
3. ❌ **Configuração incompleta** do Google Auth para Android

### **🛠️ Soluções Implementadas**

#### **1. ✅ Google Auth Android Melhorado**
- Criado `android-google-auth.js` com tratamento completo de erros
- Logs detalhados para debug
- Fallback para Firebase Auth web se necessário

#### **2. ✅ Configuração Atualizada**
- Client ID configurado no `capacitor.config.json`
- SHA-1 Fingerprint identificado: `C2:3C:10:3D:89:00:BC:B5:E9:A8:CA:99:ED:B9:5F:D5:A4:CD:88:EE`

#### **3. ✅ Script de Build**
- Criado `build-apk.ps1` para build automatizado

### **🔥 Passos para Resolver Definitivamente**

#### **Passo 1: Configurar Firebase Console**
1. **Acesse:** https://console.firebase.google.com/project/controle-financeiro-b98ec/settings/general
2. **Vá para:** Seção "Seus apps" → Android app
3. **Adicione/Verifique:**
   - **Package name:** `com.financeiro.app`
   - **SHA-1:** `C2:3C:10:3D:89:00:BC:B5:E9:A8:CA:99:ED:B9:5F:D5:A4:CD:88:EE`
4. **Baixe** o novo `google-services.json`
5. **Substitua** o arquivo em `android/app/google-services.json`

#### **Passo 2: Atualizar Client ID**
Após baixar o novo `google-services.json`, atualize o `capacitor.config.json`:
```json
"GoogleAuth": {
  "androidClientId": "[CLIENT_ID_DO_GOOGLE_SERVICES_JSON]"
}
```

#### **Passo 3: Rebuild do APK**
```powershell
# Executar o script de build
.\build-apk.ps1
```

### **🧪 Testando o Login**
Quando o APK for instalado, você verá logs como:
```
📱 [AndroidGoogleAuth] Inicializando Google Auth para Android...
📱 [AndroidGoogleAuth] Configurando com clientId: [SEU_CLIENT_ID]
✅ [AndroidGoogleAuth] Google Auth inicializado com sucesso
📱 [AndroidGoogleAuth] Iniciando processo de login...
✅ [AndroidGoogleAuth] Login completo bem-sucedido
```

### **⚠️ Erros Comuns e Soluções**

| Erro | Solução |
|------|---------|
| **Error 12500** | SHA-1 não configurado no Firebase Console |
| **Error 12501** | Login cancelado pelo usuário |
| **Error 10** | `google-services.json` inválido |
| **Network Error** | Verificar conexão com internet |

### **📋 Checklist Final**
- [ ] SHA-1 registrado no Firebase Console
- [ ] `google-services.json` atualizado
- [ ] `capacitor.config.json` com client ID correto
- [ ] APK reconstruído com as correções
- [ ] Teste de login no dispositivo

### **🚀 Resultado Esperado**
Após essas correções, o APK deve:
1. ✅ Mostrar botão "Entrar com Google"
2. ✅ Abrir popup do Google Auth
3. ✅ Autenticar com sucesso
4. ✅ Redirecionar para dashboard

**O principal problema é que o Firebase Console precisa ter o SHA-1 fingerprint registrado para o package `com.financeiro.app`.**