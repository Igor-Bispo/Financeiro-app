// Changelog simples para exibir no modal de "O que mudou"
// Adicione entradas conforme releases forem saindo
export const CHANGELOG = {
  '4.2.8': {
    date: '2025-09-08',
    title: '4.2.8 â€” AtualizaÃ§Ã£o instantÃ¢nea e Recorrentes',
    items: [
      'PWA: â€œVerificar atualizaÃ§Ãµesâ€ aplica imediatamente a nova versÃ£o (skipWaiting + recarregamento seguro) e caches limitados Ã  versÃ£o atual',
      'Service Worker: escopo de cache restrito Ã  versÃ£o corrente para evitar conteÃºdo desatualizado apÃ³s deploy',
      'Recorrentes (1 parcela): ao efetivar, cria transaÃ§Ã£o no mÃªs correto (dia ajustado) e conta nas mÃ©tricas do mÃªs mesmo inativa apÃ³s aplicar',
      'Listas de Recorrentes: itens com inÃ­cio futuro nÃ£o aparecem em meses anteriores',
      'Fidelidade do mÃªs selecionado em painÃ©is/listas unificada pelo estado global do perÃ­odo'
    ]
  },
  '4.2.7': {
    date: '2025-09-05',
    title: '4.2.7 â€” Categorias e PWA',
    items: [
      'Categorias: Card â€œControle de Categoriasâ€ agora mostra totais agregados â€” Despesas (Limite, Gasto do mÃªs, Saldo) e Receitas (Meta, Recebido do mÃªs, Saldo)',
      'Categorias: Destaque visual para Saldo negativo (badge â€œnegativoâ€ + cor do valor)',
      'ConfiguraÃ§Ãµes: â€œO que mudouâ€ exibe no mÃ¡ximo as 5 Ãºltimas alteraÃ§Ãµes desta versÃ£o',
      'PWA: melhorias na barra de atualizaÃ§Ã£o (fechamento confiÃ¡vel, botÃ£o Detalhes, auto-hide e ocultar ao navegar)',
      'PWA: atualizaÃ§Ã£o forÃ§ada para testes; Service Worker v4.2.7'
    ]
  },
  '4.2.3': {
    date: '2025-09-04',
    title: '4.2.3 â€” AtualizaÃ§Ãµes PWA e Ajustes',
    items: [
      'AtualizaÃ§Ã£o PWA sem hard refresh: banner â€œNova versÃ£o disponÃ­velâ€ com aÃ§Ãµes Atualizar/Detalhes',
      'Indicador (ponto) na aba ConfiguraÃ§Ãµes quando hÃ¡ atualizaÃ§Ã£o disponÃ­vel',
      'Checagens automÃ¡ticas de atualizaÃ§Ã£o (intervalo e ao recuperar foco da aba)',
      'AplicaÃ§Ã£o automÃ¡tica segura quando a aba estÃ¡ oculta ou apÃ³s inatividade (~60s)',
      'Data de â€œÃšltima AtualizaÃ§Ã£oâ€ agora dinÃ¢mica (mÃªs/ano atuais)',
      'Service Worker versÃ£o v4.2.3 para forÃ§ar atualizaÃ§Ã£o dos clientes'
    ]
  },
  '4.2.2': {
    date: '2025-08-20',
    title: '4.2.2 â€” Estabilidade e UX',
    items: [
      'Melhorias na estabilidade do Service Worker e limpeza de caches antigos',
      'Aprimoramentos de Snackbar e feedbacks de UI'
    ]
  }
};

export function getChangeLog(version) {
  return CHANGELOG[version] || null;
}

export function getLatestChangeLog() {
  const versions = Object.keys(CHANGELOG);
  // Ordena versÃµes semÃ¢ntico simples (assume mesmo major/minor, compara patch)
  versions.sort((a, b) => {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const da = pa[i] || 0;
      const db = pb[i] || 0;
      if (da !== db) return db - da;
    }
    return 0;
  });
  return CHANGELOG[versions[0]];
}
