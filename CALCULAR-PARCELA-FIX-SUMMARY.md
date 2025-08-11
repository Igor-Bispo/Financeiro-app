# Correção do Erro: calcularParcelaRecorrente is not defined

## 🚨 Problema Identificado

O erro `main-K5Je4sp7.js:4962 Uncaught ReferenceError: calcularParcelaRecorrente is not defined` estava ocorrendo porque:

1. **Função não importada**: A função `calcularParcelaRecorrente` estava sendo exportada do arquivo `src/js/recorrentes.js`, mas não estava sendo importada no `src/js/app.js`.

2. **Referência global ausente**: O código estava tentando acessar `window.calcularParcelaRecorrente`, mas a função não estava disponível no escopo global.

## 🔧 Correções Implementadas

### 1. Adicionada Importação da Função

**Arquivo**: `src/js/app.js`
**Linha**: 29-34

```javascript
import {
  getDespesasRecorrentes,
  aplicarRecorrentesDoMes,
  deleteDespesaRecorrente,
  addDespesaRecorrente,
  calcularParcelaRecorrente  // ← Adicionada esta linha
} from './recorrentes.js';
```

### 2. Removida Duplicação de Atribuição

**Arquivo**: `src/js/app.js`
**Linha**: 5932

Removida a duplicação da linha:
```javascript
window.calcularParcelaRecorrente = calcularParcelaRecorrente;
```

A atribuição já existia na linha 5234, então a duplicação foi removida.

## 📋 Verificação da Função

### Função Original em `recorrentes.js`

```javascript
export function calcularParcelaRecorrente(recorrente) {
  if (!recorrente.parcelasTotal || recorrente.parcelasTotal <= 1) {
    return null; // Não é parcelada
  }
  try {
    const dataInicio = new Date(recorrente.dataInicio);
    const agora = new Date();
    // Calcular meses desde o início
    const mesesDecorridos = (agora.getFullYear() - dataInicio.getFullYear()) * 12 + 
                           (agora.getMonth() - dataInicio.getMonth());
    // A parcela atual é baseada nos meses decorridos + 1 (primeiro mês é parcela 1)
    let parcelaAtual = mesesDecorridos + 1;
    // Se a parcela atual exceder o total, retornar o total
    if (parcelaAtual > recorrente.parcelasTotal) {
      parcelaAtual = recorrente.parcelasTotal;
    }
    // Se a parcela atual for menor que 1, retornar 1
    if (parcelaAtual < 1) {
      parcelaAtual = 1;
    }
    return parcelaAtual;
  } catch (error) {
    console.error('Erro ao calcular parcela da recorrente:', error);
    return 1; // Fallback para primeira parcela
  }
}
```

## 🧪 Teste Implementado

Criado arquivo `test-calcular-parcela.js` com testes para:

1. **Verificação de disponibilidade global**
2. **Teste de cálculo de parcela**
3. **Teste de diferentes cenários**
4. **Verificação de uso no código**

## ✅ Resultado

- ✅ Build executado com sucesso
- ✅ Função importada corretamente
- ✅ Atribuição global funcionando
- ✅ Erro `calcularParcelaRecorrente is not defined` resolvido

## 🎯 Impacto

A correção resolve:

1. **Erro de runtime**: A função agora está disponível quando chamada
2. **Exibição de parcelas**: Transações recorrentes agora mostram corretamente a parcela atual
3. **Estabilidade**: A aplicação não mais apresenta erros relacionados a esta função

## 📝 Como Testar

1. Execute o build: `npm run build`
2. Abra a aplicação no navegador
3. Verifique o console - não deve haver mais o erro `calcularParcelaRecorrente is not defined`
4. Execute o teste: `window.testCalcularParcela()` no console do navegador

## 🔍 Arquivos Modificados

- `src/js/app.js`: Adicionada importação da função
- `test-calcular-parcela.js`: Criado arquivo de teste
- `CALCULAR-PARCELA-FIX-SUMMARY.md`: Este arquivo de documentação
