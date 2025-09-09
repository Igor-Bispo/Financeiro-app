// features/voice/VoiceService.js
import { VoiceSystem } from '@js/ui/VoiceSystem.js';

// Funções de voz (migradas do app.js)
export function parseNumeroPorExtenso(palavra) {
  const mapa = {
    zero: 0, um: 1, uma: 1, dois: 2, duas: 2, três: 3, tres: 3, quatro: 4, cinco: 5,
    seis: 6, sete: 7, oito: 8, nove: 9, dez: 10, onze: 11, doze: 12, treze: 13,
    quatorze: 14, catorze: 14, quinze: 15, dezesseis: 16, dezessete: 17, dezoito: 18,
    dezenove: 19, vinte: 20, trinta: 30, quarenta: 40, cinquenta: 50, sessenta: 60,
    setenta: 70, oitenta: 80, noventa: 90, cem: 100, cento: 100, sem: 100,
    duzentos: 200, trezentos: 300, quatrocentos: 400, quinhentos: 500,
    seiscentos: 600, setecentos: 700, oitocentos: 800, novecentos: 900, mil: 1000
  };

  if (!palavra) return NaN;

  palavra = palavra.toLowerCase().replace(/\./g, '');
  if (mapa[palavra] !== undefined) return mapa[palavra];

  // Tenta converter por extenso composto (ex: cento e vinte)
  if (palavra.includes(' e ')) {
    return palavra.split(' e ').reduce((total, parte) => {
      const num = parseNumeroPorExtenso(parte);
      return isNaN(num) ? total : total + num;
    }, 0);
  }

  return NaN;
}

// Processar comando de voz para transação
export async function processTransactionVoice(transcript) {
  const texto = transcript.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const words = texto.split(' ');

  if (words.length < 4) {
    alert('Comando inválido. Use: "descrição valor tipo categoria"');
    return;
  }

  // Extrair valor (número ou por extenso)
  let valorIndex = words.findIndex(word => !isNaN(parseFloat(word)));
  let valor = NaN;
  if (valorIndex !== -1) {
    valor = parseFloat(words[valorIndex]);
  } else {
    for (let i = 0; i < words.length; i++) {
      const n = parseNumeroPorExtenso(words[i]);
      if (!isNaN(n) && n > 0) {
        valor = n;
        valorIndex = i;
        break;
      }
    }
  }

  if (isNaN(valor)) {
    alert('Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")');
    return;
  }

  // Extrair tipo (receita/despesa)
  const tipoIndex = words.findIndex(word => /^(receita|receitas|despesa|despesas)$/.test(word));
  if (tipoIndex === -1) {
    alert('Tipo não encontrado (receita ou despesa)');
    return;
  }

  let tipo = words[tipoIndex];
  if (/^receita/.test(tipo)) tipo = 'receita';
  if (/^despesa/.test(tipo)) tipo = 'despesa';

  // Extrair categoria (última palavra)
  const categoriaNome = words[words.length - 1];
  // Extrair descrição (tudo antes do valor)
  const descricao = words.slice(0, valorIndex).join(' ');

  // Encontrar categoria no banco (normalizando)
  const categoria = window.appState.categories.find(c =>
    normalizarTexto(c.nome).includes(normalizarTexto(categoriaNome)) ||
    normalizarTexto(categoriaNome).includes(normalizarTexto(c.nome))
  );

  if (!categoria) {
    alert(`Categoria "${categoriaNome}" não encontrada. Crie a categoria primeiro.`);
    return;
  }

  // Exibir formulário real já preenchido para revisão
  window.showAddTransactionModal({
    descricao,
    valor,
    tipo,
    categoriaId: categoria.id
  });
}

// Processar comando de voz para categoria
export async function processCategoryVoice(transcript) {
  const texto = transcript.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const words = texto.split(' ');

  if (words.length < 3) {
    alert('Comando inválido. Use: "nome tipo limite"');
    return;
  }

  // Extrair tipo (receita/despesa)
  const tipoIndex = words.findIndex(word => ['receita', 'despesa'].includes(word));
  if (tipoIndex === -1) {
    alert('Tipo não encontrado (receita ou despesa)');
    return;
  }
  const tipo = words[tipoIndex];

  // Extrair limite (número ou por extenso)
  let limiteIndex = words.findIndex(word => !isNaN(parseFloat(word)));
  let limite = NaN;
  if (limiteIndex !== -1) {
    limite = parseFloat(words[limiteIndex]);
  } else {
    for (let i = 0; i < words.length; i++) {
      const n = parseNumeroPorExtenso(words[i]);
      if (!isNaN(n) && n > 0) {
        limite = n;
        limiteIndex = i;
        break;
      }
    }
  }

  if (isNaN(limite)) {
    alert('Limite não encontrado (diga um número, ex: "cem", "duzentos", "mil" ou "100")');
    return;
  }

  // Extrair nome (tudo antes do tipo)
  const nome = words.slice(0, tipoIndex).join(' ');
  if (!nome) {
    alert('Nome da categoria não encontrado');
    return;
  }

  // Gerar cor aleatória
  const cores = ['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
  const cor = cores[Math.floor(Math.random() * cores.length)];

  // Exibir formulário real já preenchido para revisão
  window.showAddCategoryModal({
    nome,
    tipo,
    limite,
    cor
  });
}

// Função para normalizar texto
export function normalizarTexto(str) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[.,;:!?]+$/, '')
    .trim();
}

// Função para obter instância do sistema de voz
export function getVoiceSystem() {
  if (!window.voiceSystem) {
    window.voiceSystem = new VoiceSystem();
  }
  return window.voiceSystem;
}

// Função global para abrir modal de voz
export function openVoiceModal(type = 'transaction') {
  console.log('🎤 openVoiceModal chamado:', type);
  const system = getVoiceSystem();
  return system.start(type);
}

// Função global para fechar modal de voz
export function closeVoiceModal() {
  console.log('🎤 closeVoiceModal chamado');
  if (window.voiceSystem) {
    window.voiceSystem.stop();
  }
}

// Função global para iniciar reconhecimento de voz
export function startVoiceRecognition(type = 'transaction') {
  console.log('🎤 startVoiceRecognition chamado:', type);
  const system = getVoiceSystem();
  return system.start(type);
}

// Função para processar comandos de voz (mantida para compatibilidade)
export async function processVoiceCommand(transcript, type) {
  console.log('🎤 processVoiceCommand chamado (compatibilidade):', transcript, type);

  // Usar o novo sistema de voz se disponível
  if (window.voiceSystem) {
    try {
      await window.voiceSystem.processCommand(transcript, type);
    } catch (error) {
      console.error('❌ Erro no novo sistema de voz:', error);
      if (window.Snackbar) {
        window.Snackbar.show(`Erro ao processar comando: ${error.message}`, 'error');
      }
    }
  } else {
    console.warn('⚠️ Sistema de voz não disponível');
  }
}
