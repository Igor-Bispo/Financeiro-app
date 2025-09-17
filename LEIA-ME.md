# Servo Tech • Controle Financeiro — Guia Rápido (pt-BR)

Este repositório contém um aplicativo PWA de controle financeiro com autenticação (Firebase), Firestore em tempo real, modo offline, relatórios e comandos de voz. É uma SPA roteada por hash (Vite) com organização por features.

**Versão atual: v4.43.0** 🚀

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

- Autenticação com Google (Firebase Auth) e biometria
- Orçamentos múltiplos e compartilhados entre usuários
- Transações (receitas e despesas), filtros, busca e histórico
- Categorias com limites e barras de progresso
- Recorrentes avançado (parcelas, dia do mês, logs, status)
- Dashboard com resumo mensal e alertas clicáveis
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

### Deep links e roteamento

- Período global via query string: ?ym=YYYY-MM (ex.: #/dashboard?ym=2025-01)
- Seções da aba Config via ?section= (ex.: #/settings?section=section-notifications)
- A SPA usa hash routing; links mantêm estado e funcionam offline

### Testes, lint e qualidade

- Rodar toda a suíte de testes: npm run test:run
- Lint (silencioso): npm run lint:quiet
- Lint com autofix: npm run lint:fix
- Build de produção e pré-visualização: npm run build; npm run preview

## Arquitetura (resumo)

- app/: bootstrap e roteamento (entry → bootstrap → routes)
- core/: utilitários, eventBus, store, config
- data/: Firebase client e repositórios (CRUD/consultas)
- features/: páginas, serviços e UI por domínio (transactions, categories, recorrentes, analytics, settings, notifications, etc.)
- ui/: componentes compartilhados (FAB, BottomNav, feedback)
- utils/: utilitários gerais (cache, backup, etc.)

Diagrama (alto nível):

```
index.html (#app-content)
   |
 entry.js → main.js → routes.js ── lazy → features/*/Page.js
   |                               \
   |                                → features/*/service.js → data/repositories → firebase/client
   └─ globalUtils(eventBus, period) ──────────────────────────▲
```

- Período global: getSelectedPeriod/setSelectedPeriod emite eventBus('period:changed') e sincroniza ?ym=YYYY-MM.
- Dashboard é a única tela com seletor de mês; demais exibem rótulo somente-leitura.

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