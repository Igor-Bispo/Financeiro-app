# 🚀 Deploy no GitHub Pages

## Passo a Passo Rápido:

### 1. Criar Repositório
- Vá para: https://github.com/new
- Nome: `controle-financeiro`
- Público
- Clique em "Create repository"

### 2. Subir Arquivos
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/controle-financeiro.git
git push -u origin main
```

### 3. Configurar GitHub Pages
- Settings > Pages
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)
- Save

### 4. URL Final
```
https://SEU-USUARIO.github.io/controle-financeiro
```

## ⚡ Alternativa Mais Rápida:

### Netlify (Recomendado)
1. Acesse: https://netlify.com
2. Clique em "Deploy manually"
3. Arraste a pasta do projeto
4. Pronto! URL em 2 minutos 