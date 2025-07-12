# 🔥 Configuração do Firebase

## 📋 Passos para Configurar o Firebase

### 1. Acesse o Firebase Console
1. Vá para [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto ou crie um novo

### 2. Configurar Authentication
1. No menu lateral, clique em **Authentication**
2. Clique em **Get started**
3. Vá para a aba **Sign-in method**
4. Habilite **Google** como provedor de autenticação
5. Configure o domínio autorizado (localhost para desenvolvimento)

### 3. Configurar Firestore Database
1. No menu lateral, clique em **Firestore Database**
2. Clique em **Create database**
3. Escolha **Start in test mode** (para desenvolvimento)
4. Selecione a localização mais próxima

### 4. Configurar Regras de Segurança
1. Na aba **Rules** do Firestore
2. Substitua as regras existentes pelas regras do arquivo `firestore-rules.txt`
3. Clique em **Publish**

### 5. Obter Credenciais
1. No menu lateral, clique em **Project settings** (ícone de engrenagem)
2. Role para baixo até **Your apps**
3. Clique em **Add app** > **Web**
4. Registre o app com um nome
5. Copie as credenciais para `js/firebase/config.js`

## 🔧 Configuração das Credenciais

Substitua as credenciais em `js/firebase/config.js`:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-1VYZSEV9M3"
};
```

## 🚨 Regras de Segurança Importantes

### Para Desenvolvimento (Teste Inicial)
Use estas regras temporárias para testar:

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

### Para Produção
Use as regras completas do arquivo `firestore-rules.txt` que incluem:
- Verificação de autenticação
- Verificação de propriedade dos dados
- Regras específicas por coleção

## 🐛 Solução de Problemas

### Erro: "Missing or insufficient permissions"
1. Verifique se o usuário está autenticado
2. Confirme se as regras estão publicadas
3. Verifique se o `userId` está sendo adicionado aos documentos

### Erro: "Firebase App not initialized"
1. Confirme se as credenciais estão corretas
2. Verifique se os scripts do Firebase estão carregando

### Erro: "Permission denied"
1. Use as regras de teste temporárias
2. Verifique se o Authentication está configurado
3. Confirme se o domínio está autorizado

## 📱 Configuração para Produção

### 1. Domínios Autorizados
1. Vá para Authentication > Settings
2. Adicione seus domínios de produção
3. Remova localhost se necessário

### 2. Regras de Segurança
1. Use as regras completas (não as de teste)
2. Teste todas as funcionalidades
3. Monitore os logs de segurança

### 3. Configuração de Hosting (Opcional)
1. Instale Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Inicialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## 🔍 Verificação da Configuração

Após configurar, teste:

1. **Login/Logout** - Deve funcionar sem erros
2. **Adicionar Transação** - Deve salvar no Firestore
3. **Listar Transações** - Deve carregar dados
4. **Reconhecimento de Voz** - Deve processar comandos
5. **Exportação** - Deve gerar arquivos

## 📞 Suporte

Se ainda houver problemas:
1. Verifique o console do navegador
2. Confirme as regras do Firestore
3. Teste com as regras de desenvolvimento temporárias
4. Verifique se o Authentication está ativo 