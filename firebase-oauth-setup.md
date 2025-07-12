# Configurar Domínios Autorizados no Firebase

## Passo a passo para adicionar o domínio do Firebase Hosting:

1. **Acesse o Firebase Console:**
   - Vá para: https://console.firebase.google.com/project/financeiro-8c5b7/overview

2. **Navegue para Authentication:**
   - No menu lateral, clique em "Authentication"
   - Clique na aba "Settings" (Configurações)

3. **Adicione domínios autorizados:**
   - Role até a seção "Authorized domains" (Domínios autorizados)
   - Clique em "Add domain" (Adicionar domínio)
   - Adicione: `financeiro-8c5b7.web.app`
   - Clique em "Add" (Adicionar)

4. **Verifique se foi adicionado:**
   - O domínio deve aparecer na lista de domínios autorizados

## Domínios que devem estar na lista:
- `localhost` (para desenvolvimento local)
- `financeiro-8c5b7.web.app` (Firebase Hosting)
- `financeiro-8c5b7.firebaseapp.com` (domínio alternativo do Firebase)

## Teste a aplicação:
Após adicionar o domínio, acesse: https://financeiro-8c5b7.web.app

O login com Google deve funcionar corretamente agora! 