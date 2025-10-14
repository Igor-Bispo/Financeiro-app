# Servo Tech • Controle Financeiro — Guia Rápido (pt-BR)

Este repositório contém um aplicativo PWA de controle financeiro com arquitetura moderna **feature-first**, autenticação (Firebase), Firestore em tempo real, modo offline, relatórios e comandos de voz avançados. É uma SPA roteada por hash (Vite) com **sistema de eventos centralizado** e **repositórios isolados**.

**Versão atual: v1.0.17** 🚀
**Arquitetura: Refatorada e Otimizada** ✨

## Como rodar localmente

1) Requisitos: Node 18+ e npm
2) Instale dependências:
- npm install
3) Inicie o servidor de desenvolvimento:
- npm run dev
4) Rodar testes:
- npm run test:run
5) Build de produção e preview:
- npm run build
- npm run preview
6) Deploy (Firebase Hosting):
- npm run deploy

Observação: o projeto já inclui emulators no firebase.json para dev.

## Funcionalidades principais

- Autenticação com Google (Firebase Auth) e biometria
- Orçamentos múltiplos e compartilhados entre usuários
- Transações (receitas e despesas), filtros, busca e histórico
- Categorias com limites e barras de progresso
- Recorrentes avançado (parcelas, dia do mês, logs, status)
- Dashboard com resumo mensal e alertas
- Analytics com gráficos e relatórios
- Sistema de notificações em tempo real
- Modal de notificações com ações
- Backup/Export (JSON, Excel, PDF)
- Reconhecimento de voz (Web Speech API)
- PWA completo: cache, offline, background sync e push
- Arquitetura modular com EventBus
- Interface de login premium com glass morphism
- Efeitos visuais avançados e animações suaves
- Widgets modernos inspirados no Mobills
- Correção de bugs em parcelas de recorrentes

## Novidades rápidas (v4.43.0)

### 🎨 Melhorias de Interface
- Headers harmonizados em todas as abas com design unificado
- Seletor de período minimalista e compacto
- Otimização mobile com espaçamentos melhorados
- Card proprietário com layout vertical mais claro

### 🚨 Sistema de Alertas Aprimorado
- Modal de alertas clicável no Dashboard
- Informações detalhadas sobre categorias em alerta
- Interface moderna com barras de progresso animadas
- Estados visuais diferenciados (próximo vs ultrapassado)

### 🔧 Otimizações e Correções
- Eliminação de redundâncias na aba Configurações
- Event handlers precisos para evitar falsos positivos
- Seção Resumo otimizada com layout mais limpo
- Performance melhorada com otimizações de cache

## Funcionalidades principais

### 🔐 Autenticação e Segurança
- Login com Google (Firebase Auth) e autenticação biométrica
- Múltiplos orçamentos e compartilhamento entre usuários
- Firestore Security Rules com isolamento por usuário
- Interface de login premium com glass morphism

### 💰 Gestão Financeira Completa
- Transações com CRUD completo, filtros e busca fuzzy
- Categorias inteligentes com limites e barras de progresso
- Sistema de recorrentes avançado (parcelas, logs, status)
- Dashboard interativo com resumo mensal e alertas clicáveis

### 📊 Analytics e Relatórios
- Gráficos interativos e métricas detalhadas
- Backup/Export em múltiplos formatos (JSON, Excel, PDF)
- Sistema de notificações em tempo real com modal dedicado
- Analytics page com filtros temporais

### 🎤 Sistema de Voz Enterprise
- Reconhecimento de voz (Web Speech API) com 4,826+ linhas
- Comandos inteligentes em português brasileiro  
- Interface dedicada com feedback auditivo
- Processamento de linguagem natural para transações

### 📱 PWA e Interface Moderna
- PWA completo: cache, offline, background sync e push
- Service Worker com estratégias de cache inteligentes
- Interface responsiva mobile-first com tema claro/escuro
- Efeitos visuais avançados, animações suaves e widgets modernos
- FAB (Floating Action Button) e sistema de navegação otimizado

### 🏗️ Arquitetura Avançada
- **Feature-first architecture** com separação clara
- **EventBus centralizado** para comunicação entre componentes  
- **Repositórios isolados** abstraindo Firebase
- **Lazy loading** e code splitting por features
- **Stores reativos** para gerenciamento de estado
- Sistema de testes com Vitest e cobertura v8

### Deep links e roteamento

- Período global via query string: ?ym=YYYY-MM (ex.: #/dashboard?ym=2025-01)
- Seções da aba Config via ?section= (ex.: #/settings?section=section-notifications)
- A SPA usa hash routing; links mantêm estado e funcionam offline

### Testes, lint e qualidade

- Rodar toda a suíte de testes: npm run test:run
- Lint (silencioso): npm run lint:quiet
- Lint com autofix: npm run lint:fix
- Build de produção e pré-visualização: npm run build; npm run preview

## Arquitetura (refatorada)

### Estrutura Feature-First + Camadas Transversais

- **app/**: Bootstrap e roteamento (entry → bootstrap → routes)
- **core/**: EventBus, stores reativos, config e utilitários agnósticos
- **data/**: Firebase client isolado + repositórios (CRUD/consultas por domínio)
- **features/**: Páginas, serviços e UI organizados por domínio de negócio
- **ui/**: Componentes compartilhados (Modal, Snackbar, FAB, BottomNav)
- **utils/**: Utilitários gerais (cache, backup, validadores, formatadores)

### Fluxo de Dados e Controle

```text
index.html (#app-content)
   |
 entry.js → bootstrap.js → main.js → routes.js ── lazy → features/*/Page.js
   |                                                            |
   |                                                            v
   └─ core/utils/globalUtils ←─ EventBus ←─ features/*/service.js
            |                                         |
            v                                         v
   period:changed events                   data/repositories/* → firebase/client
```

### Padrões Implementados

- **Repository Pattern**: Isolamento total do Firebase em repositórios
- **Event-Driven Architecture**: EventBus centralizado para comunicação
- **Service Layer**: Orquestração de regras de negócio + repositórios  
- **Reactive Stores**: Gerenciamento de estado com subscriptions
- **Lazy Loading**: Code splitting por features para performance
- **Single Source of Truth**: Período global via globalUtils + localStorage

### Benefícios da Nova Arquitetura

- 🚀 **Manutenibilidade**: Código organizado por feature
- ⚡ **Performance**: Lazy loading e code splitting otimizado
- 🧪 **Testabilidade**: Separação clara de responsabilidades
- 🔒 **Escalabilidade**: Baixo acoplamento, alta coesão
- 📊 **Bundle Size**: Reduzido com carregamento sob demanda

### Service Worker e PWA (resumo)

- Pré-cache dos assets essenciais e suporte offline
- Mensagens de controle: SKIP_WAITING/UPDATE_CONTENT, limpar cache e checar status do cache
- Push notifications com ícones válidos (192/512)
- Ações expostas na aba Config para forçar atualização e manutenção de cache

## Documentação detalhada

- docs/ARCHITECTURE-OVERVIEW.md — visão completa com fluxos e diagramas
- README.md — visão geral e badges

---

Dúvidas? Abra uma issue.