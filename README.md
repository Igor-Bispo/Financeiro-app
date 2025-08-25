# 💰 **Servo Tech - Controle Financeiro Pessoal**

> **Um aplicativo financeiro moderno, responsivo e completo para controle total das suas finanças pessoais**

![Status](https://img.shields.io/badge/Status-Produção%20Ativa-brightgreen)
![Versão](https://img.shields.io/badge/Versão-4.2.0-blue)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)
![Firebase](https://img.shields.io/badge/Firebase-Integrado-red)
![Voz](https://img.shields.io/badge/Reconhecimento%20de%20Voz-Ativo-green)

## 🎯 **Visão Geral**

O **Servo Tech - Controle Financeiro** é uma aplicação web completa desenvolvida com **JavaScript moderno**, **Firebase** e recursos **PWA**. Oferece controle total sobre receitas, despesas, categorias, despesas recorrentes e muito mais, com interface intuitiva e responsiva.

**🌐 URL do Aplicativo:** https://controle-financeiro-b98ec.web.app

## ✨ **Funcionalidades Principais**

### 🔐 **Sistema de Autenticação e Usuários**
- ✅ **Login com Google** - Autenticação OAuth2 via Firebase
- ✅ **Múltiplos Orçamentos** - Suporte a vários orçamentos por usuário
- ✅ **Compartilhamento** - Orçamentos compartilhados entre usuários
- ✅ **Perfil Personalizado** - Dados salvos no Firestore
- ✅ **Autenticação Biométrica** - Login com impressão digital/face ID

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

### 📊 **Dashboard Inteligente e Analytics**
- ✅ **Resumo Mensal** - Visão geral das finanças
- ✅ **Cards Informativos** - Saldo, receitas, despesas, orçado
- ✅ **Progress Bars** - Visualização de gastos vs limite
- ✅ **Alertas Inteligentes** - Notificações de limites excedidos
- ✅ **Top 5 Categorias** - Gráfico das categorias mais utilizadas
- ✅ **Filtros Temporais** - Por mês/ano
- ✅ **Atualização em Tempo Real** - Listeners Firestore
- ✅ **Gráficos Interativos** - Visualização de dados financeiros
- ✅ **Relatórios Detalhados** - Análise de gastos por categoria

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

## 🛠️ **Stack Tecnológica**

### **Frontend**
- **JavaScript ES6+** - Código moderno e modular
- **HTML5** - Semântica e acessibilidade
- **CSS3 + Tailwind CSS** - Estilos modernos e responsivos
- **Vite** - Build tool rápido e eficiente

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

## 🎯 **Funcionalidades Avançadas**

### **Sistema de Alertas**
- **Alertas de Limite** - Notificações quando categoria excede 70%
- **Alertas Gerais** - Notificações de orçamento excedido
- **Cores Dinâmicas** - Verde (ok) / Amarelo (atenção) / Vermelho (crítico)

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

### **Problemas Comuns**

**Sistema de Voz:**
- **"Nenhum microfone encontrado"** → Use a entrada de texto
- **"Permissão negada"** → Clique no ícone do microfone na barra
- **"Microfone em uso"** → Feche outros apps

**Recorrentes:**
- **Não aplica automaticamente** → Use o botão "Aplicar Recorrentes"
- **Parcela incorreta** → Verifique se `parcelasTotal` está salvo
- **Duplicação** → Sistema evita duplicação automática

**Categorias:**
- **Progress bar não aparece** → Verifique se há limite definido
- **Cálculos incorretos** → Recarregue a página

**PWA:**
- **Não instala** → Verifique se está em HTTPS
- **Não funciona offline** → Limpe cache do navegador

### **Para Dúvidas**
- Verifique os logs do console (F12)
- Teste em diferentes navegadores
- Consulte a documentação técnica

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

**Versão atual: v4.2.0** 🚀

**Status: ✅ APLICATIVO RODANDO 100%!** 🎉

**Autor: Igor Bispo** 👨‍💻 