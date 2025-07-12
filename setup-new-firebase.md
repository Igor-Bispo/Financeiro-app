# 🚀 Configuração Rápida - Novo Projeto Firebase

## 📋 **Passo a Passo Completo**

### **1. Criar Nova Conta Google**
- Acesse: https://accounts.google.com
- Clique em "Criar conta"
- Use email: `seuprojeto@gmail.com` (ou similar)
- Complete o cadastro

### **2. Criar Projeto Firebase**
- Acesse: https://console.firebase.google.com
- Login com a nova conta
- Clique em "Criar projeto"
- Nome: `Controle Financeiro`
- ID: `controle-financeiro-12345` (ou similar)
- Desabilite Google Analytics (opcional)

### **3. Configurar Authentication**
1. No menu lateral → **Authentication**
2. Clique em **"Get started"**
3. Aba **Sign-in method**
4. Habilite **Google**
5. Configure domínios autorizados:
   - `localhost` (para desenvolvimento)
   - Seu domínio futuro (para produção)

### **4. Criar Firestore Database**
1. Menu lateral → **Firestore Database**
2. Clique em **"Create database"**
3. Escolha **"Start in test mode"**
4. Localização: **us-central1** (ou mais próxima)

### **5. Configurar Regras de Segurança**
1. Na aba **Rules** do Firestore
2. Substitua por estas regras temporárias:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Clique em **"Publish"**

### **6. Obter Credenciais**
1. Menu lateral → **Project settings** (ícone ⚙️)
2. Role para baixo → **Your apps**
3. Clique em **"Add app"** → **Web**
4. Nome: `Controle Financeiro Web`
5. **NÃO** marque "Set up Firebase Hosting"
6. Clique em **"Register app"**

### **7. Copiar Configuração**
Copie a configuração que aparece:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### **8. Atualizar Arquivo de Configuração**
Substitua em `js/firebase/config.js`:

```javascript
// Configuração centralizada do Firebase
const firebaseConfig = {
    apiKey: "SUA_NOVA_API_KEY",
    authDomain: "seu-novo-projeto.firebaseapp.com",
    projectId: "seu-novo-projeto-id",
    storageBucket: "seu-novo-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Inicializa o Firebase apenas uma vez
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Disponibiliza configuração e instâncias globalmente
window.FirebaseConfig = firebaseConfig;
window.FirebaseApp = firebase.app();
window.FirebaseAuth = firebase.auth();
window.FirebaseDB = firebase.firestore();

console.log('Firebase inicializado com sucesso');
```

## 🧪 **Teste Rápido**

### **1. Reiniciar Servidor**
```bash
# Parar servidor atual (Ctrl+C)
# Iniciar novamente
node server.js
```

### **2. Testar Aplicação**
- Acesse: `http://localhost:8000`
- Clique em "Entrar com Google"
- Use a nova conta Google
- Teste adicionar uma transação

### **3. Verificar Firestore**
- Firebase Console → Firestore Database
- Deve aparecer a transação criada

## 🎯 **Vantagens do Novo Projeto**

- ✅ Projeto limpo e dedicado
- ✅ Sem conflitos com outros projetos
- ✅ Regras de segurança personalizadas
- ✅ Analytics separados
- ✅ Mais espaço de armazenamento

## 🔧 **Solução de Problemas**

### **Erro: "Firebase App not initialized"**
- Verifique se as credenciais estão corretas
- Confirme se o projeto está ativo

### **Erro: "Permission denied"**
- Use as regras temporárias fornecidas
- Verifique se Authentication está configurado

### **Erro: "Domain not authorized"**
- Adicione `localhost` aos domínios autorizados
- Authentication → Settings → Authorized domains

## 🚀 **Próximos Passos**

1. **Teste todas as funcionalidades**
2. **Configure domínio de produção** (quando necessário)
3. **Atualize regras de segurança** para produção
4. **Configure backup automático**

## 📞 **Suporte**

Se houver problemas:
1. Verifique o console do navegador
2. Confirme as credenciais
3. Teste com a versão local primeiro
4. Verifique se todos os serviços estão ativos 