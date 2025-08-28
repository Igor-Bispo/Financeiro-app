# Deploy e Preview no Firebase Hosting

Este projeto possui dois workflows GitHub Actions:

- Deploy de Produção: `.github/workflows/deploy.yml`
  - Dispara em push para `master` e manualmente via Actions (workflow_dispatch)
  - Executa lint, testes e build antes de publicar no canal `live`
- Preview para Pull Requests: `.github/workflows/preview.yml`
  - Dispara em PRs contra `master` e manualmente
  - Publica em um canal de preview e expõe a URL nos logs

## Pré-requisito: Secret de conta de serviço

Crie o secret `FIREBASE_SERVICE_ACCOUNT` com o conteúdo JSON da conta de serviço do projeto `controle-financeiro-b98ec`.

1. Firebase Console > Project Settings > Service Accounts > Generate new private key
2. (Recomendado) No Google Cloud IAM, conceda apenas `Firebase Hosting Admin` à conta de serviço usada
3. GitHub > Repo > Settings > Secrets and variables > Actions > New repository secret
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: cole o JSON completo (multilinha)

> Segurança: Se um JSON foi exposto/publicado, delete a chave antiga (por `private_key_id`) em IAM > Service Accounts > Keys e gere uma nova. Nunca commitar o JSON no repositório.

## Como rodar os workflows

- Produção: Actions > Deploy Firebase Hosting > Run workflow (ou `git push` na branch `master`)
- Preview: Actions > Preview Firebase Hosting > Run workflow (ou abrir/atualizar um PR contra `master`)

## Variáveis importantes

- `FIREBASE_SERVICE_ACCOUNT`: JSON da conta de serviço (obrigatório)
- `projectId`: já configurado como `controle-financeiro-b98ec` nos workflows

## Próximos passos (opcional)

- Migrar de chave estática para OIDC (Workload Identity Federation) para eliminar chaves long-lived
- Adicionar proteção de branch e required checks (lint/test/build) antes de mergear na `master`
