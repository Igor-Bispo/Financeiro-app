// Script de debug para calcular os valores corretos
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = hoje.getMonth() + 1; // outubro = 10

console.log(`=== DEBUG CÁLCULOS - ${hoje.toLocaleDateString()} ===`);
console.log(`Ano: ${ano}, Mês: ${mes}`);

// Dados do dashboard (conforme imagem)
const receitas = 300.00;
const despesas = 200.00;
const saldo = 100.00;
const orcado = 300.00; // progresso 66.7% = 200/300

console.log(`\n=== DADOS ===`);
console.log(`Receitas: R$ ${receitas.toFixed(2)}`);
console.log(`Despesas: R$ ${despesas.toFixed(2)}`);
console.log(`Saldo: R$ ${saldo.toFixed(2)}`);
console.log(`Orçado: R$ ${orcado.toFixed(2)}`);

// Cálculo de dias - EXATAMENTE como no código corrigido
const ultimoDiaDoMes = new Date(ano, mes, 0).getDate();
const agora = new Date();
const mesAtual = agora.getMonth() + 1;
const anoAtual = agora.getFullYear();

let diaAtual;
if (ano === anoAtual && mes === mesAtual) {
  // Mês atual: usar o dia real de hoje
  diaAtual = agora.getDate();
} else {
  // Mês diferente
  if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
    diaAtual = ultimoDiaDoMes;
  } else {
    diaAtual = 1;
  }
}

const diasRestantes = Math.max(1, ultimoDiaDoMes - diaAtual + 1);

console.log(`\n=== CÁLCULO DE DIAS ===`);
console.log(`Último dia do mês: ${ultimoDiaDoMes}`);
console.log(`Dia atual: ${diaAtual}`);
console.log(`Dias restantes: ${diasRestantes}`);

// Cálculos das metas conforme código
const saldoRestanteOrcamento = orcado - despesas; // saldo do orçamento
const metaDiariaGlobal = saldoRestanteOrcamento > 0 ? (saldoRestanteOrcamento / diasRestantes) : 0;

const saldoRestanteReceitas = receitas - despesas;
const metaDiariaReceitasCompletas = saldoRestanteReceitas > 0 ? (saldoRestanteReceitas / diasRestantes) : 0;

const saldoRestanteConservador = saldoRestanteReceitas * 0.8;
const metaDiariaConservadora = saldoRestanteConservador > 0 ? (saldoRestanteConservador / diasRestantes) : 0;

console.log(`\n=== CÁLCULOS DAS METAS ===`);
console.log(`Saldo restante orçamento: R$ ${saldoRestanteOrcamento.toFixed(2)}`);
console.log(`Meta diária orçamento: R$ ${metaDiariaGlobal.toFixed(2)}/dia`);
console.log(`\nSaldo restante receitas: R$ ${saldoRestanteReceitas.toFixed(2)}`);
console.log(`Meta diária 100% receitas: R$ ${metaDiariaReceitasCompletas.toFixed(2)}/dia`);
console.log(`\nSaldo conservador (80%): R$ ${saldoRestanteConservador.toFixed(2)}`);
console.log(`Meta diária conservadora: R$ ${metaDiariaConservadora.toFixed(2)}/dia`);

console.log(`\n=== VALORES ESPERADOS NA TELA ===`);
console.log(`Meta diária orçamento deveria ser: R$ ${metaDiariaGlobal.toFixed(2)}/dia`);
console.log(`Meta diária 100% receitas deveria ser: R$ ${metaDiariaReceitasCompletas.toFixed(2)}/dia`);
console.log(`Meta diária conservadora deveria ser: R$ ${metaDiariaConservadora.toFixed(2)}/dia`);