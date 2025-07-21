# 🚀 Servo Tech - Aplicação Financeira

Uma aplicação moderna de controle financeiro pessoal com reconhecimento de voz, sincronização em tempo real e interface mobile-first.

## ✨ **Características Principais**

### 🔐 **Autenticação**
- Login com Google (Firebase Auth)
- Sessão persistente
- Proteção de rotas

### 🎙️ **Reconhecimento de Voz**
- Comandos de voz para transações
- Reconhecimento de números por extenso
- Feedback visual em tempo real
- Suporte a categorias por voz

### 📊 **Dashboard Inteligente**
- Cards de resumo (Receitas, Despesas, Saldo, Orçado)
- Gráficos interativos
- Progresso de categorias
- Transações recentes

### 💰 **Gestão Financeira**
- CRUD completo de transações
- Categorização automática
- Orçamentos por categoria
- Metas financeiras

### 📱 **Interface Mobile-First**
- Design responsivo
- Navegação por abas
- Botões touch-friendly
- Dark mode automático

### 🔄 **Sincronização em Tempo Real**
- Firestore real-time
- Offline support
- Backup automático
- Exportação (PDF, Excel, JSON)

## 🛠️ **Tecnologias Utilizadas**

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Auth, Firestore)
- **Deploy:** Firebase Hosting
- **PWA:** Service Worker + Manifest

## 📁 **Estrutura do Projeto**

```
Financeiro-app/
├── src/
│   ├── index.html          # Página principal
│   ├── js/
│   │   ├── app.js          # Aplicação principal (2.2k linhas)
│   │   ├── i18n/           # Internacionalização
│   │   ├── modules/        # Módulos específicos
│   │   └── ui/             # Componentes UI
│   └── css/
│       └── styles.css      # Estilos customizados
├── dist/                   # Build de produção
├── package.json           # Dependências
├── vite.config.js         # Configuração Vite
├── firebase.json          # Configuração Firebase
└── README.md              # Este arquivo
```

## 🚀 **Como Executar**

### **Pré-requisitos**
- Node.js 14+
- npm ou yarn
- Conta Firebase

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/Igor-Bispo/Financeiro-app.git
cd Financeiro-app

# Instale as dependências
npm install

# Configure o Firebase (se necessário)
# Copie suas credenciais para src/js/app.js
```

### **Desenvolvimento**
```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Formatação
npm run format
```

### **Deploy**
```bash
# Deploy para Firebase
npm run deploy

# Servir localmente
npm run serve
```

## 📱 **Funcionalidades por Aba**

### **Dashboard**
- Resumo financeiro
- Cards de métricas
- Gráficos de progresso
- Transações recentes

### **Transações**
- Lista de transações
- Filtros por data/categoria
- Adicionar/editar/excluir
- Comandos de voz

### **Categorias**
- Gestão de categorias
- Cores personalizadas
- Limites de orçamento
- Relatórios

### **Configurações**
- Perfil do usuário
- Exportação de dados
- Backup/restore
- Instalação PWA
- Guia do usuário (PDF)

## 🎙️ **Comandos de Voz**

### **Transações**
```
"Adicionar receita de 500 reais para salário"
"Gasto de 50 reais com alimentação"
"Receita de 1000 reais do freela"
```

### **Categorias**
```
"Criar categoria trabalho"
"Editar categoria alimentação"
"Excluir categoria lazer"
```

## 🔧 **Configuração Firebase**

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative Authentication (Google)
3. Crie um banco Firestore
4. Configure as regras de segurança
5. Copie as credenciais para `src/js/app.js`

## 📊 **Métricas de Performance**

- **Tamanho do Bundle:** ~67KB (gzipped)
- **Tempo de Carregamento:** < 2s
- **Lighthouse Score:** 95+
- **PWA Score:** 100

## 🐛 **Problemas Corrigidos**

### **Limpeza Realizada:**
- ✅ Removido código duplicado
- ✅ Eliminado console.log de debug
- ✅ Removido dependência desnecessária (firebase-admin)
- ✅ Consolidado CSS duplicado
- ✅ Configurado ESLint e Prettier
- ✅ Otimizado build com Vite

### **Melhorias Implementadas:**
- ✅ Estrutura de arquivos limpa
- ✅ Configuração de linting
- ✅ Formatação automática
- ✅ Build otimizado
- ✅ CSS consolidado

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 **Autor**

**Igor Bispo** - [GitHub](https://github.com/Igor-Bispo)

## 🔗 **Links Úteis**

- **App em Produção:** https://controle-financeiro-b98ec.web.app
- **Repositório:** https://github.com/Igor-Bispo/Financeiro-app
- **Issues:** https://github.com/Igor-Bispo/Financeiro-app/issues

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** 