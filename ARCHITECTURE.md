# 🏗️ Arquitetura Refatorada - Servo Tech Financeiro

## 🎯 **Objetivos da Refatoração**

- **Alta coesão por feature**, baixo acoplamento entre camadas
- **Isolar Firebase** em um data layer (repositórios)
- **Remover dependência de globais** no window usando event bus e store simples
- **Facilitar code-splitting** por página/aba para reduzir bundle e acelerar carregamento

## 📁 **Estrutura Proposta (Feature-First + Camadas Transversais)**

```
src/
├── 📁 app/                    # Bootstrap e roteamento
│   ├── 📄 main.js            # Entrypoint enxuto
│   └── 📄 routes.js          # Rotas/tabs e lazy imports
├── 📁 core/                   # Utilitários agnósticos
│   ├── 📁 events/
│   │   └── 📄 eventBus.js    # Pub/sub simples
│   ├── 📁 store/
│   │   └── 📄 createStore.js # Store reativa simples
│   ├── 📁 logger/
│   │   └── 📄 logger.js      # Logging central
│   └── 📄 config/index.js    # Flags, env, constantes
├── 📁 data/                   # Infra e acesso a dados
│   ├── 📁 firebase/
│   │   └── 📄 client.js      # Init do app, auth, db
│   └── 📁 repositories/
│       ├── 📄 budgetsRepo.js
│       ├── 📄 categoriesRepo.js
│       ├── 📄 transactionsRepo.js
│       └── 📄 recorrentesRepo.js
├── 📁 features/               # Features organizadas
│   ├── 📁 auth/
│   │   ├── 📄 service.js     # Fluxos auth
│   │   ├── 📄 store.js       # Estado do usuário
│   │   └── 📁 ui/            # Componentes específicos
│   ├── 📁 budgets/
│   │   ├── 📄 service.js     # Use-cases
│   │   ├── 📄 store.js
│   │   └── 📁 ui/
│   ├── 📁 transactions/
│   │   ├── 📄 service.js
│   │   ├── 📄 store.js
│   │   └── 📁 ui/
│   ├── 📁 categories/
│   │   ├── 📄 service.js
│   │   ├── 📄 store.js
│   │   └── 📁 ui/
│   ├── 📁 recorrentes/
│   │   ├── 📄 service.js     # Mover lógica de recorrentes.js
│   │   ├── 📄 store.js
│   │   ├── 📄 RecorrentesPage.js
│   │   └── 📁 ui/
│   ├── 📁 analytics/
│   │   ├── 📄 AnalyticsPage.js
│   │   └── 📁 ui/
│   └── 📁 settings/
│       ├── 📄 SettingsPage.js
│       └── 📁 ui/
└── 📁 ui/                     # Componentes compartilhados
    ├── 📁 Modal/
    ├── 📁 Snackbar/
    ├── 📁 FAB/
    ├── 📁 BottomNav/
    ├── 📁 CardResumo/
    ├── 📁 ThemeToggle/
    ├── 📁 VoiceSystem/
    └── 📁 feedback/           # Modal + Snackbar unificados
```

## 🔧 **Padrões e Contratos-Chave**

### **Event Bus** (`core/events/eventBus.js`)
```javascript
// Contrato: on(eventName, handler), off(eventName, handler), emit(eventName, payload)
// Eventos úteis: auth:changed, budget:changed, tx:added/updated/deleted, recurring:applied, pwa:installPrompt, error:raised
```

### **Store Simples** (`core/store/createStore.js`)
```javascript
// Contrato: getState(), setState(partial), subscribe(selector, listener)
// Stores por feature: authStore, budgetStore, transactionsStore, recurringStore
```

### **Repositórios** (`data/repositories/*`)
```javascript
// Contrato: funções puras que retornam dados/streams; escondem Firebase
// Preferir assinaturas: getById(id), list(query), create(dto), update(id, dto), remove(id)
```

### **Serviços por Feature** (`features/*/service.js`)
```javascript
// Orquestram repositórios + validam regras de negócio
// Não conhecem UI; disparam eventos/stores
```

### **UI sem Globais**
```javascript
// Nada no window; UI escuta store/eventos e invoca serviços
// Modal/Snackbar expostos por import, não por window
```

## 🚀 **Plano de Migração Incremental**

### **Fase 0 — Quick Wins (1 dia)**
- [ ] Parar de anexar novos itens ao window
- [ ] Criar eventBus e logger
- [ ] Extrair init do Firebase para `data/firebase/client.js`

### **Fase 1 — Isolar Firebase (2-3 dias)**
- [ ] Criar repositories: budgetsRepo, categoriesRepo, transactionsRepo, recorrentesRepo
- [ ] Migrar chamadas diretas de Firestore
- [ ] Remover imports diretos de 'firebase/firestore' fora de data/

### **Fase 2 — Stores por Feature (2 dias)**
- [ ] authStore, budgetStore, recurringStore
- [ ] Substituir window.appState por stores
- [ ] Emitir eventos para sincronizar UI existente

### **Fase 3 — Pages + Rotas + Lazy (2-3 dias)**
- [ ] Criar `app/main.js` e `app/routes.js`
- [ ] Mover páginas para features/*/ e configurar lazy imports
- [ ] Integrar SwipeTabs/BottomNav com navegação

### **Fase 4 — Remover Globais (2 dias)**
- [ ] Substituir window.Modal, window.Snackbar por imports
- [ ] Dividir app.js em bootstrap, wiring e inicializações
- [ ] Meta: app.js < 300 linhas

### **Fase 5 — Qualidade (contínuo)**
- [ ] Adicionar Vitest + Testing Library DOM
- [ ] ESLint import/order e regra contra window leakage
- [ ] Code-splitting verificado

## 📋 **Mapeamento Atual → Nova Estrutura**

| Arquivo Atual | Nova Localização |
|---------------|------------------|
| `app.js` | `app/main.js` (bootstrap) + `app/routes.js` (roteamento) |
| `firebase.js` | `data/firebase/client.js` (init) |
| `firestore.js` | `data/repositories/*` + `features/budgets/service.js` |
| `recorrentes.js` | `features/recorrentes/service.js` |
| `RecorrentesPage.js` | `features/recorrentes/RecorrentesPage.js` |
| `src/js/ui/*` | `ui/*` (shared) + `features/*/ui/` (específicos) |
| `SettingsPage.js` | `features/settings/SettingsPage.js` |

## 🎯 **Quick Wins Específicos**

1. **PWA**: Trocar globais por módulo PWA com eventos
2. **Layout Modes**: Isolar compact/micro/nano mode em `ui/theme/layoutModes.js`
3. **Feedback**: Unificar Modal e Snackbar sob `ui/feedback`
4. **Recorrentes**: Extrair cálculos para `features/recorrentes/service.js`

## 📊 **Métricas de Sucesso**

- [ ] Tamanho de app.js: ~7.7k linhas → < 300 linhas
- [ ] 100% das chamadas Firebase atrás de data/repositories
- [ ] Bundle inicial reduzido via lazy-loading
- [ ] Remoção de 90% dos acessos a window.*
- [ ] Pelo menos 10 testes de serviços/stores

## 🔗 **Aliases (jsconfig.json)**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/core/*"],
      "@data/*": ["src/data/*"],
      "@features/*": ["src/features/*"],
      "@ui/*": ["src/ui/*"]
    }
  }
}
```

---

## ✅ Status atual da migração

- Core: `core/events/eventBus.js`, `core/store/createStore.js`, `core/logger/logger.js`, `core/config/index.js`
- Data:
  - Firebase: `data/firebase/client.js`
  - Repositórios:
    - `data/repositories/transactionsRepo.js` — CRUD completo + `createFromRecurring`
    - `data/repositories/categoriesRepo.js` — CRUD completo
    - `data/repositories/budgetsRepo.js` — CRUD + `listOwn`/`listShared`
    - `data/repositories/recurringRepo.js` — CRUD básico
    - `data/repositories/invitationsRepo.js` — `listByBudget`/`remove`
- Features:
  - Recorrentes: `features/recorrentes/service.js` usa `transactionsRepo.createFromRecurring` e `recurringRepo`
- App: `src/js/app.js`
  - Transações: `add/update/delete/load` migrados para `transactionsRepo`
  - Categorias: `add/update/delete/load` migrados para `categoriesRepo`
  - Orçamentos: `add`/`delete`/`load` migrados para `budgetsRepo` (+ limpeza de dependências com repos de TX/CAT/REC/INV)
  - Fixes: remoção de HMR port fixo (Vite escolhe porta livre); correção de imports dinâmicos com `await` dentro de `map`

Entrada segue por `src/js/app.js` durante a transição. Partes legadas (listeners e trechos com `firebase/firestore` dinâmico) continuam operando e serão migradas por etapa.

### Próximos passos
- Mover listeners (onSnapshot) para serviços por feature e publicar eventos/atualizações via store
- Reduzir `app.js` particionando bootstrap/rotas/wiring
- Remover globais (`window.*`) substituindo por imports/event bus
- Adicionar testes (Vitest) para repos e serviços principais
