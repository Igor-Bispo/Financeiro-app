# 🔗 Reconexão de Transações às Categorias

Este documento explica como resolver o problema onde transações de um backup não estão associadas às suas categorias porque os IDs das categorias mudaram após a importação.

## 📋 Problema

Quando você importa um backup de outro aplicativo idêntico, as transações podem não aparecer associadas às suas categorias corretas. Isso acontece porque:

1. Os IDs das categorias são diferentes entre os sistemas
2. As transações ainda referenciam os IDs antigos das categorias
3. O sistema não consegue fazer a associação automaticamente

## ✅ Soluções Implementadas

### 1. 🤖 Reconexão Automática (Recomendado)

A partir de agora, quando você restaurar um backup, o sistema **automaticamente** tentará reconectar as transações às categorias baseado no nome das categorias.

**Como funciona:**
- Durante a restauração do backup, após importar os dados
- O sistema busca transações sem categoria ou com categoria inválida
- Tenta encontrar uma categoria com nome similar
- Reconecta automaticamente as transações

**Para usar:**
1. Vá em Configurações → Restaurar Backup
2. Selecione seu arquivo de backup JSON
3. Confirme a restauração
4. O sistema fará a reconexão automaticamente

### 2. 🛠️ Script Manual (Para casos especiais)

Se você já importou um backup e precisa reconectar as transações manualmente, use o script fornecido.

**Arquivo:** `script-reconectar-transacoes.js`

#### Como usar o script:

1. **Abra o console do navegador:**
   - Pressione `F12` ou `Ctrl+Shift+I`
   - Vá para a aba "Console"

2. **Carregue o script:**
   - Abra o arquivo `script-reconectar-transacoes.js`
   - Copie todo o conteúdo
   - Cole no console e pressione Enter

3. **Execute os comandos disponíveis:**

#### 🔍 Analisar situação atual
```javascript
analisarTransacoes()
```
Mostra quantas transações estão sem categoria ou com categoria inválida.

#### 🧪 Simular reconexão
```javascript
simularReconexao()
```
Testa a reconexão sem fazer alterações reais no banco de dados.

#### ✅ Executar reconexão
```javascript
reconectarTransacoes()
```
Executa a reconexão real, modificando os dados no banco.

#### 📁 Reconectar com backup original
```javascript
// Primeiro, carregue seus dados de backup em uma variável
const meuBackup = { /* seus dados de backup aqui */ };

// Depois execute a reconexão
reconectarComBackup(meuBackup);
```

## 🔧 Como Funciona a Reconexão

### Algoritmo de Correspondência

1. **Busca Exata:** Procura categoria com nome exatamente igual
2. **Busca Normalizada:** Remove acentos, espaços e converte para minúsculas
3. **Busca Parcial:** Verifica se o nome da categoria está contido no nome da transação
4. **Busca por Tipo:** Se não encontrar, usa uma categoria padrão do mesmo tipo (receita/despesa)

### Exemplos de Correspondência

| Categoria Original | Categoria Encontrada | Tipo de Match |
|-------------------|---------------------|---------------|
| "Alimentação" | "Alimentação" | Exato |
| "Transporte" | "transporte" | Normalizado |
| "Supermercado" | "Alimentação" | Por tipo |
| "Salário" | "Receitas" | Por tipo |

## 🚨 Importante

### ⚠️ Antes de Executar

1. **Faça um backup** dos seus dados atuais
2. **Teste primeiro** com a simulação
3. **Verifique** se você está no orçamento correto
4. **Confirme** que está logado no sistema

### 🔒 Segurança

- O script só funciona se você estiver logado
- Só modifica dados do orçamento atual
- Sempre pede confirmação antes de fazer alterações
- Registra todas as operações no console

### 📊 Monitoramento

- Todas as operações são registradas no console
- Você pode ver quantas reconexões foram feitas
- Falhas são reportadas com detalhes
- A página é recarregada automaticamente após a reconexão

## 🆘 Solução de Problemas

### Problema: "Você precisa estar logado"
**Solução:** Faça login no sistema antes de executar o script.

### Problema: "Nenhum orçamento selecionado"
**Solução:** Selecione um orçamento na interface antes de executar.

### Problema: "Erro durante reconexão"
**Solução:** 
1. Verifique o console para detalhes do erro
2. Tente executar a simulação primeiro
3. Verifique se os dados estão corretos

### Problema: Reconexões não aparecem
**Solução:** 
1. Aguarde o recarregamento automático da página
2. Se não recarregar, pressione F5 manualmente
3. Verifique se as categorias têm nomes similares

## 📞 Suporte

Se você encontrar problemas:

1. **Verifique o console** para mensagens de erro
2. **Execute a análise** primeiro para entender o estado atual
3. **Use a simulação** para testar antes de fazer alterações reais
4. **Documente o erro** com prints do console se necessário

---

**Desenvolvido para resolver problemas de importação de backup entre sistemas idênticos.**