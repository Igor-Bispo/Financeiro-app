# Configuração do Novo Projeto Firebase

## Passo 1: Obter Credenciais do Projeto

1. **Acesse o Firebase Console:**
   - Vá para: https://console.firebase.google.com/project/controle-financeiro-b98ec/overview

2. **Configurar Authentication:**
   - No menu lateral, clique em "Authentication"
   - Clique em "Get started" (Começar)
   - Na aba "Sign-in method", habilite "Google"
   - Clique em "Save" (Salvar)

3. **Configurar Firestore Database:**
   - No menu lateral, clique em "Firestore Database"
   - Clique em "Create database" (Criar banco de dados)
   - Escolha "Start in test mode" (Iniciar em modo de teste)
   - Escolha a localização mais próxima (us-east1 ou us-central1)
   - Clique em "Done" (Concluído)

4. **Obter Configuração do Projeto:**
   - No menu lateral, clique em "Project settings" (Configurações do projeto)
   - Role até "Your apps" (Seus aplicativos)
   - Clique em "Add app" (Adicionar aplicativo)
   - Escolha o ícone da web (</>)
   - Nome do app: "Controle Financeiro Web"
   - Clique em "Register app" (Registrar aplicativo)

5. **Copiar Configuração:**
   - Copie o objeto de configuração que aparece
   - Substitua no arquivo `js/firebase/config.js`

## Passo 2: Configurar Regras do Firestore

1. **No Firestore Database:**
   - Clique na aba "Rules"
   - Substitua as regras pelas regras de segurança fornecidas

## Passo 3: Configurar Domínios Autorizados

1. **No Authentication:**
   - Clique na aba "Settings"
   - Adicione os domínios autorizados:
     - `localhost`
     - `controle-financeiro-b98ec.web.app`
     - `controle-financeiro-b98ec.firebaseapp.com`

## Passo 4: Testar Deploy

Após configurar tudo, execute:
```bash
firebase deploy --only hosting
``` 