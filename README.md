# 💰 **Servo Tech - Controle Financeiro Pessoal**

> **Um aplicativo financeiro moderno, responsivo e completo para controle total das suas finanças pessoais**

![Status](https://img.shields.io/badge/Status-Produção%20Ativa-brightgreen)
![Versão](https://img.shields.io/badge/Versão-v1.0.17-blue)
![PWA](https://img.shields.io/badge/PWA-Enterprise%20Ready-orange)
![Firebase](https://img.shields.io/badge/Firebase-Integrado-red)
![Voz](https://img.shields.io/badge/Sistema%20de%20Voz-4.8k%20Linhas-green)
![Arquitetura](https://img.shields.io/badge/Arquitetura-Feature%20First-purple)
![Testes](https://img.shields.io/badge/Testes-Vitest%20+%20V8-yellow)

## 🎯 **Visão Geral**

O **Servo Tech - Controle Financeiro** é uma aplicação web **enterprise-grade** desenvolvida com **arquitetura feature-first**, **JavaScript moderno**, **Firebase** e recursos **PWA avançados**. Oferece controle total sobre finanças pessoais com **sistema de voz de 4,826+ linhas**, **repositórios isolados** e **EventBus centralizado**.

**🌐 URL do Aplicativo:** [controle-financeiro-b98ec.web.app](https://controle-financeiro-b98ec.web.app)

**📚 Documentação Técnica:** [LEIA-ME.md](./LEIA-ME.md) • [ARCHITECTURE-OVERVIEW.md](./docs/ARCHITECTURE-OVERVIEW.md) • [API.md](./docs/API.md)

## 🏗️ **Arquitetura Feature-First Refatorada**

```text
                    📱 PWA + Service Worker
                           |
    🏠 index.html (#app-content) → 🚀 entry.js → bootstrap.js
                           |                          |
                    🧭 main.js (hash router)         |
                           |                          |
                  🛣️ routes.js (lazy loading)       |
                           |                          |
              📄 features/*/Page.js ←──────────── EventBus
                           |                          ↕️
              ⚙️ features/*/service.js → 💾 data/repositories → 🔥 Firebase
                           ↕️
              📦 core/stores (reactive) + 🌐 globalUtils (período)
```

### **Camadas Principais**
- **🚀 app/**: Bootstrap, roteamento e inicialização
- **🧠 core/**: EventBus, stores reativos, config e utilitários
- **💾 data/**: Firebase client + repositórios isolados por domínio
- **🎨 features/**: Páginas e serviços organizados por feature
- **🖼️ ui/**: Componentes compartilhados (Modal, FAB, Snackbar)

## ✨ **Funcionalidades Principais**

### 🔐 **Sistema de Autenticação e Usuários**
- ✅ **Login com Google** - Autenticação OAuth2 via Firebase
- ✅ **Múltiplos Orçamentos** - Suporte a vários orçamentos por usuário
- ✅ **Compartilhamento** - Orçamentos compartilhados entre usuários
- ✅ **Perfil Personalizado** - Dados salvos no Firestore
- ✅ **Autenticação Biométrica** - Login com impressão digital/face ID
- ✅ **Interface de Login Premium** - Design glass morphism com animações avançadas
- ✅ **Efeitos Visuais Avançados** - Gradientes dinâmicos, shimmer effects e micro-interações
- ✅ **Animações Suaves** - Float, glow, pulse e hover effects
- ✅ **Elementos Decorativos** - Círculos flutuantes com blur e transparência

### 💳 **Gestão Completa de Transações**
- ✅ **CRUD Completo** - Criar, editar, excluir transações
- ✅ **Categorização Inteligente** - Organização por categorias personalizáveis
- ✅ **Tipos de Transação** - Receitas e despesas
- ✅ **Validação em Tempo Real** - Dados validados instantaneamente
- ✅ **Busca e Filtros Avançados** - Filtros por categoria, tipo, data, valor
- ✅ **Timestamps Automáticos** - Data de criação automática
- ✅ **Histórico Completo** - Visualização de todas as transações

### 🔄 **Sistema de Recorrentes Avançado** ⭐
- ✅ **Controle Total** - Despesas recorrentes com controle manual
- ✅ **Parcelamento Inteligente** - Suporte a transações parceladas (X de Y)
- ✅ **Verificação de Pendências** - Sistema inteligente de verificação
- ✅ **Log de Aplicações** - Histórico completo de aplicações
- ✅ **Configuração Flexível** - Data de início, dia do mês, valor
- ✅ **Controle de Parcelas** - Total e restantes calculadas corretamente
- ✅ **Aplicação Inteligente** - Evita duplicação automática
- ✅ **Histórico Completo** - Visualização de todas as aplicações
- ✅ **Status Dinâmico** - Indicação visual de status (aplicada/pendente)
- ✅ **Dashboard Widget** - Top 5 recorrentes com progresso de parcelas
- ✅ **Correção de Bugs** - Parcelas salvas corretamente em transações

### 📊 **Dashboard Inteligente e Analytics**
- ✅ **Resumo Mensal** - Visão geral das finanças
- ✅ **Cards Informativos** - Saldo, receitas, despesas, orçado
- ✅ **Progress Bars** - Visualização de gastos vs limite
- ✅ **Alertas Inteligentes** - Notificações de limites excedidos
- ✅ **Modal de Alertas Clicável** - Clique em "Alertas" para ver categorias em alerta
- ✅ **Top 5 Categorias** - Gráfico das categorias mais utilizadas
- ✅ **Top 5 Recorrentes** - Widget com progresso de parcelas
- ✅ **Filtros Temporais** - Por mês/ano
- ✅ **Atualização em Tempo Real** - Listeners Firestore
- ✅ **Gráficos Interativos** - Visualização de dados financeiros
- ✅ **Relatórios Detalhados** - Análise de gastos por categoria
- ✅ **Widgets Modernos** - Interface inspirada no Mobills
- ✅ **Headers Harmonizados** - Design unificado em todas as abas
- ✅ **Seletor de Período Minimalista** - Interface clean e compacta

### 🏷️ **Categorias com Progress Bar**
- ✅ **Gestão Completa** - CRUD de categorias
- ✅ **Cores Personalizáveis** - Identificação visual
- ✅ **Limites Configuráveis** - Definição de limites por categoria
- ✅ **Progress Bar Dinâmica** - Visualização de gastos vs limite
- ✅ **Cálculos Detalhados** - Total gasto, limite, saldo, porcentagem
- ✅ **Cores Dinâmicas** - Verde (dentro do limite) / Vermelho (excedido)
- ✅ **Alertas Automáticos** - Notificações quando limite é excedido

### 🎤 **Sistema de Voz Inteligente** 🎯
- ✅ **Comandos de Voz** - Adicionar transações por voz
- ✅ **Reconhecimento Avançado** - Processamento inteligente de comandos
- ✅ **Fallback para Texto** - Alternativa quando microfone não disponível
- ✅ **Tratamento de Erros** - Mensagens específicas para cada problema
- ✅ **Interface Modal** - Interface dedicada para comandos de voz
- ✅ **Suporte a Categorias** - Reconhecimento automático de categorias
- ✅ **Validação de Comandos** - Verificação de comandos válidos

### 💾 **Backup e Restore**
- ✅ **Exportação Completa** - Dados em JSON
- ✅ **Importação Segura** - Restauração de dados
- ✅ **Limpeza Automática** - Exclusão de dados antigos
- ✅ **Exportação Excel** - Relatórios em Excel
- ✅ **Exportação PDF** - Relatórios em PDF

### 🎨 **Interface Moderna e Responsiva**
- ✅ **PWA Completo** - Instalação como app nativo
- ✅ **Design Responsivo** - Mobile-first design
- ✅ **Tema Escuro/Claro** - Alternância automática
- ✅ **Temas de Cores** - Personalização de cores
- ✅ **Navegação por Swipe** - Gestos touch
- ✅ **FAB (Botão Flutuante)** - Acesso rápido às ações
- ✅ **Snackbar** - Notificações elegantes
- ✅ **Touch Feedback** - Animações de toque
- ✅ **Offline Support** - Funcionamento sem internet
- ✅ **Bottom Navigation** - Navegação intuitiva
- ✅ **Interface de Login Premium** - Design glass morphism com animações avançadas
- ✅ **Efeitos Visuais Avançados** - Gradientes, shimmer effects e micro-interações
- ✅ **Sistema de Notificações** - Notificações em tempo real
- ✅ **Modal de Notificações** - Interface dedicada para notificações
- ✅ **Headers Harmonizados** - Design unificado em todas as abas
- ✅ **Seletor de Período Minimalista** - Interface clean e compacta
- ✅ **Otimização Mobile** - Espaçamentos otimizados para mobile
- ✅ **Modal de Alertas Interativo** - Interface moderna para categorias em alerta

Para a lista completa de funcionalidades e notas de arquitetura, consulte [docs/ARCHITECTURE-OVERVIEW.md](./docs/ARCHITECTURE-OVERVIEW.md).

## 🛠️ **Stack Tecnológica**

### **Frontend**
- **JavaScript ES6+** - Código moderno e modular
- **HTML5** - Semântica e acessibilidade
- **CSS3 + Tailwind CSS** - Estilos modernos e responsivos
- **Vite** - Build tool rápido e eficiente
- **Arquitetura Modular** - Organização por features
- **EventBus** - Sistema de eventos centralizado

### **Backend & Serviços**
- **Firebase Authentication** - Autenticação segura
- **Firestore** - Banco de dados NoSQL em tempo real
- **Firebase Hosting** - Deploy e hospedagem

### **Funcionalidades Avançadas**
- **PWA** - Service Worker e Web App Manifest
- **Web Speech API** - Reconhecimento de voz
- **SheetJS** - Exportação Excel
- **jsPDF** - Geração de PDFs
- **Google Analytics** - Análise de uso
- **Sistema de Notificações** - Notificações em tempo real
- **Cache Inteligente** - Estratégias de cache otimizadas
- **Backup Automático** - Sincronização automática

## 📱 **PWA Features**

### **Instalação como App**
- ✅ **Prompt de Instalação** - Sugestão automática
- ✅ **Ícone na Área de Trabalho** - Experiência nativa
- ✅ **Splash Screen** - Tela de carregamento
- ✅ **Fullscreen Mode** - Modo tela cheia
- ✅ **Shortcuts** - Atalhos rápidos

### **Funcionalidades Offline**
- ✅ **Cache Inteligente** - Estratégias diferentes por recurso
- ✅ **Página Offline** - Interface quando sem internet
- ✅ **Background Sync** - Sincronização em segundo plano

### 🔄 Atualizações sem hard refresh (PWA)
- ✅ Detecção automática de novas versões (checks periódicos a cada ~30 min e ao voltar o foco da aba)
- ✅ Banner persistente “Nova versão disponível” com ações: “Atualizar” (aplica a atualização) e “Detalhes” (leva à aba Configurações)
- ✅ Indicador visual na aba Configurações (ponto) quando há atualização disponível
- ✅ Aplicação automática com segurança quando a aba estiver oculta ou após ~60s de inatividade
- ✅ Botão “Verificar Atualizações” na tela de Configurações para forçar a checagem

Como testar:
- Abra o app, instale como PWA (opcional) e mantenha a aba aberta. Publique uma nova versão e, ao retornar o foco, a atualização será detectada; o banner aparecerá e o ponto na aba Configurações ficará visível.
- Em ambiente de desenvolvimento, use DevTools → Application → Service Workers para acionar “Update/Skip waiting” e verificar o fluxo de recarregamento controlado.


## 🚀 **Como Usar**

### **1. Primeiro Acesso**
1. Acesse https://controle-financeiro-b98ec.web.app
2. Clique em "Entrar com Google"
3. Autorize o acesso
4. Crie seu primeiro orçamento

### **2. Configuração Inicial**
1. **Criar Categorias** - Organize suas despesas e receitas
2. **Definir Limites** - Configure limites para categorias importantes
3. **Adicionar Recorrentes** - Configure despesas fixas mensais

### **3. Uso Diário**
- **Adicionar Transações** - Use o botão + ou comandos de voz
- **Verificar Dashboard** - Acompanhe seu saldo e gastos
- **Aplicar Recorrentes** - Use o botão na aba Recorrentes
- **Monitorar Limites** - Fique atento aos alertas

### **4. Comandos de Voz**
```
"gastei 50 reais no supermercado em alimentação"
"recebi 2000 de salário em rendimentos"
"criar categoria alimentação despesa 500"
"qual meu saldo"
"adicionar despesa de 30 reais para transporte"
```

## 📊 **Estrutura de Dados**

### **Transação**
```javascript
{
  id: "transaction_id",
  descricao: "Supermercado",
  valor: 150.00,
  tipo: "despesa", // ou "receita"
  categoriaId: "alimentacao",
  budgetId: "budget_id",
  userId: "user_id",
  createdAt: Timestamp,
  recorrenteId: "recorrente_id" // opcional
}
```

### **Categoria**
```javascript
{
  id: "category_id",
  nome: "Alimentação",
  tipo: "despesa", // ou "receita"
  limite: 500.00, // opcional
  cor: "#FF6B6B",
  budgetId: "budget_id",
  userId: "user_id"
}
```

### **Recorrente**
```javascript
{
  id: "recorrente_id",
  descricao: "Netflix",
  valor: 39.90,
  categoriaId: "entretenimento",
  dataInicio: "2024-01-01",
  parcelasTotal: 12,        // Total de parcelas
  parcelasRestantes: 8,     // Parcelas restantes
  ativa: true,
  efetivarMesAtual: true,   // Aplicar no mês atual
  budgetId: "budget_id",
  userId: "user_id"
}
```

### **Orçamento**
```javascript
{
  id: "budget_id",
  nome: "Orçamento Pessoal",
  userId: "user_id",
  usuariosPermitidos: ["user_id_1", "user_id_2"],
  createdAt: Timestamp,
  ativo: true
}
```

## 🔧 **Scripts Disponíveis**

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build

# Deploy
npm run deploy       # Build + Deploy Firebase
npm run serve        # Servidor local Firebase

# Qualidade
npm run lint         # Verificação de código
npm run format       # Formatação de código
npm run clean        # Limpeza de build
```

## 🆕 **Novidades da Versão v1.0.17 - Arquitetura Refatorada**

### **�️ Arquitetura Feature-First Implementada**
- ✅ **Separação de Responsabilidades** - Camadas bem definidas (app, core, data, features, ui)
- ✅ **Repositórios Isolados** - Firebase abstraído em repositórios por domínio
- ✅ **EventBus Centralizado** - Comunicação entre componentes via eventos
- ✅ **Stores Reativos** - Gerenciamento de estado com subscriptions
- ✅ **Lazy Loading** - Code splitting por features para performance otimizada
- ✅ **Service Layer** - Lógica de negócio separada da UI

### **🎨 Sistema de UI Modernizado**
- ✅ **Componentes Modulares** - UI components reutilizáveis e testáveis
- ✅ **Sistema de Voz Enterprise** - 4,826+ linhas com Web Speech API
- ✅ **Interface Responsiva** - Mobile-first com tema claro/escuro
- ✅ **PWA Avançado** - Service Worker com estratégias de cache inteligentes
- ✅ **FAB e Navegação** - Floating Action Button e sistema de navegação otimizado

### **� Performance e Qualidade**
- ✅ **Bundle Otimizado** - Code splitting reduz tamanho inicial
- ✅ **Sistema de Testes** - Vitest com cobertura v8 e testes unitários
- ✅ **Lazy Loading** - Carregamento sob demanda de páginas
- ✅ **Cache Strategy** - Service Worker com múltiplas estratégias
- ✅ **Build System** - Vite com compression e otimizações

### **🔧 Melhorias Técnicas**
- ✅ **Repository Pattern** - Abstração completa do Firebase
- ✅ **Event-Driven Architecture** - Comunicação desacoplada
- ✅ **Single Source of Truth** - Período global sincronizado
- ✅ **Error Handling** - Tratamento robusto de erros
- ✅ **Aliases de Path** - Imports organizados com @app, @core, @data, @features

## 🎯 **Funcionalidades Avançadas**

### **Sistema de Alertas**
- **Alertas de Limite** - Notificações quando categoria excede 70%
- **Alertas Gerais** - Notificações de orçamento excedido
- **Cores Dinâmicas** - Verde (ok) / Amarelo (atenção) / Vermelho (crítico)
- **Modal de Alertas Clicável** - Clique em "Alertas" no Dashboard para ver detalhes
- **Informações Detalhadas** - Gasto, limite, percentual e diferença por categoria
- **Interface Moderna** - Design responsivo com barras de progresso animadas

### **Sistema de Recorrentes**
- **Aplicação Manual** - Controle total sobre quando aplicar
- **Cálculo de Parcelas** - Sistema inteligente de parcelamento
- **Histórico Completo** - Log de todas as aplicações
- **Status Visual** - Indicação clara de status

### **Analytics e Relatórios**
- **Gráficos Interativos** - Visualização de dados
- **Exportação Múltipla** - JSON, Excel, PDF
- **Filtros Temporais** - Análise por período
- **Métricas Detalhadas** - Estatísticas completas

## 🔐 **Segurança**

### **Firebase Security Rules**
- ✅ **Autenticação obrigatória** - Todas as operações requerem login
- ✅ **Isolamento por usuário** - Dados separados por usuário
- ✅ **Validação de dados** - Schemas e tipos validados
- ✅ **Regras de orçamento** - Acesso controlado a orçamentos compartilhados

### **Validação Frontend**
- ✅ **Sanitização de inputs** - Prevenção de XSS
- ✅ **Validação de tipos** - Verificação de dados
- ✅ **Rate Limiting** - Limitação de requisições

## 📈 **Performance**

### **Otimizações Implementadas**
- ✅ **Code Splitting** - Carregamento sob demanda
- ✅ **Lazy Loading** - Componentes carregados quando necessário
- ✅ **Cache Strategy** - Service Worker inteligente
- ✅ **Bundle Optimization** - Vite build otimizado
- ✅ **Minification** - Código minificado para produção
- ✅ **Compression** - Compressão Brotli

### **Métricas**
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Bundle Size**: ~600KB (comprimido)
- **PWA Score**: 95+

## 🧪 **Testes e Qualidade**

### **Funcionalidades Testadas**
- ✅ **Autenticação** - Login/logout funcionando
- ✅ **CRUD Transações** - Todas as operações funcionando
- ✅ **CRUD Categorias** - Com limites e alertas
- ✅ **Sistema de Recorrentes** - Aplicação e histórico
- ✅ **Dashboard** - Cálculos e alertas
- ✅ **Backup/Restore** - Exportação e importação
- ✅ **PWA** - Instalação e funcionalidades offline
- ✅ **Responsividade** - Mobile e desktop
- ✅ **Temas** - Escuro/claro e cores personalizadas
- ✅ **Sistema de Voz** - Reconhecimento e comandos

## 🚀 **Deploy e Configuração**

### **Firebase Hosting**
```bash
npm run build
firebase deploy --only hosting
```

### **Configuração Completa**
- **firebase.json** - Configuração do projeto
- **firestore.rules** - Regras de segurança
- **service-worker.js** - Cache e offline
- **manifest.json** - Configuração PWA
- **vite.config.js** - Build e otimizações

## 📞 **Suporte e Troubleshooting**

### **Arquitetura e Desenvolvimento**

**Event System:**
- **Eventos não propagam** → Verifique se EventBus está importado corretamente
- **Estado não sincroniza** → Use stores reativos em vez de window globals
- **Período não atualiza** → Verifique globalUtils.setSelectedPeriod()

**Repositories:**
- **Firebase não conecta** → Verifique data/firebase/client.js
- **CRUD não funciona** → Confirme se repository está sendo usado
- **Listeners param** → Repositories gerenciam onSnapshot automaticamente

**Performance:**
- **Lazy loading falha** → Verifique imports dinâmicos em routes.js
- **Bundle muito grande** → Use code splitting por feature
- **Cache não funciona** → Service Worker pode precisar ser atualizado

### **Problemas Funcionais**

**Sistema de Voz (4,826+ linhas):**
- **"Nenhum microfone encontrado"** → Use entrada de texto como fallback
- **"Permissão negada"** → Clique no ícone do microfone na barra
- **Reconhecimento falha** → VoiceSystem.js tem múltiplos fallbacks
- **Comandos não reconhecidos** → Veja lista de comandos no modal

**Recorrentes:**
- **Aplicação manual** → Use features/recorrentes/service.js
- **Parcelas incorretas** → Repository valida parcelasTotal
- **Duplicação** → Sistema tem validação anti-duplicação

**PWA e Cache:**
- **Service Worker desatualizado** → Use checkForUpdates() no console
- **Cache corrompido** → Execute clearAppCaches() no console
- **Offline mode** → Service Worker tem fallback para /offline.html

### **Debugging Avançado**

**EventBus Debug:**
```javascript
// No console do navegador
window.eventBus.on('*', (event, data) => console.log('Event:', event, data))
```

**Store Debug:**
```javascript
// Ver estado atual
console.log(window.authStore?.getState())
console.log(window.budgetStore?.getState())
```

**Cache Debug:**
```javascript
// Verificar Service Worker
window.checkSW()
// Forçar limpeza
window.clearCache()
```

## 🎉 **Status Atual**

### **✅ Funcionalidades 100% Operacionais**
- 🔐 Autenticação e usuários
- 💳 Gestão de transações
- 🔄 Sistema de recorrentes
- 📊 Dashboard inteligente
- 🏷️ Categorias com progress bar
- 💾 Backup e restore
- 🎨 Interface moderna
- 🎤 Sistema de voz
- 📱 PWA completo
- 🔔 Sistema de alertas
- 📈 Analytics e relatórios

### **🚀 Aplicativo Rodando 100%**
- **URL:** https://controle-financeiro-b98ec.web.app
- **Status:** Produção ativa
- **Performance:** Otimizada
- **Segurança:** Implementada
- **Responsividade:** Mobile-first

## 🤝 **Contribuição**

Este projeto está em desenvolvimento ativo. Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para controle financeiro eficiente e intuitivo.**

**Versão atual: v1.0.17** 🚀  
**Arquitetura: Feature-First Refatorada** ✨  
**Sistema de Voz: 4,826+ linhas enterprise** 🎤  
**Performance: Lazy Loading + Code Splitting** ⚡

**Status: ✅ APLICATIVO RODANDO 100% - ARQUITETURA MODERNIZADA!** 🎉

**Desenvolvido com ❤️ por Igor Bispo** 👨‍💻

---

## 📈 **Estatísticas do Projeto**

- 📁 **Arquitetura**: Feature-first com 5 camadas
- 🗂️ **Repositórios**: 7 repositórios isolados + Firebase client
- 🎨 **UI Components**: Sistema modular completo
- 🎤 **Sistema de Voz**: 4,826+ linhas (VoiceSystem.js)
- 🧪 **Testes**: 22 testes unitários com Vitest
- 📦 **Bundle**: Otimizado com lazy loading
- 🌐 **PWA Score**: 95+ com Service Worker avançado
 
 