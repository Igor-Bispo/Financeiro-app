# DEBUG: Problema com Detecção de 3 Itens

## Análise do Problema

Pelos logs fornecidos, o comando "A despesa, 200." foi detectado como **4 itens**:

```
🔍 Total de itens encontrados: 4
🔍 Item 1: valor = "200" (confiança: high)
🔍 Item 2: tipo = "despesa" (confiança: high)  
🔍 Item 3: descricao = "despesa," (confiança: medium)
🔍 Item 4: descricao = "200." (confiança: medium)
```

## Identificação do Bug

O problema está na função `detectarDescricoes()` que está duplicando elementos:

1. **"despesa"** é detectado como **tipo** (correto)
2. **"despesa,"** também é detectado como **descrição** (duplicação!)
3. **"200"** é detectado como **valor** (correto)  
4. **"200."** também é detectado como **descrição** (duplicação!)

## Solução Necessária

Precisa melhorar a lógica de detecção para:
1. Evitar duplicações de palavras já classificadas como valor/tipo
2. Filtrar pontuações corretamente
3. Garantir que itens não sejam contados múltiplas vezes

## Teste Para Reproduzir

Execute no console:
```javascript
window.debugVoiceSystem.simulate("categoria alimentacao despesa");
```

Deveria retornar exatamente 3 itens, não mais.