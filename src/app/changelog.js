// Changelog simples para exibir no modal de "O que mudou"
// Adicione entradas conforme releases forem saindo
export const CHANGELOG = {
  '4.38.0': {
    date: '2025-09-16',
    title: '4.38.0 — Organização Completa das Abas com Padrão Compacto',
    items: [
      '📊 Dashboard: Resumo compacto com métricas essenciais e widgets organizados',
      '💰 Transações: Interface otimizada com 3 métricas principais e filtros organizados',
      '📂 Categorias: Cards compactos com resumo financeiro detalhado',
      '🔄 Recorrentes: Seções organizadas por status com resumo financeiro',
      '📈 Analytics: Gráficos em layout compacto e análises otimizadas',
      '🔔 Notificações: Filtros organizados em seções e lista otimizada',
      '⚙️ Config: Seções lógicas com cards compactos e interface unificada',
      '🎯 Espaçamento Otimizado: Padding reduzido (p-4) para melhor aproveitamento do espaço',
      '📱 UX Mobile Aprimorada: Interface limpa, organizada e fácil de navegar',
      '⚡ Performance Melhorada: Menos elementos DOM, carregamento mais rápido',
      '🎨 Design Consistente: Padrão visual unificado em todas as 7 abas principais'
    ]
  },
  '4.37.0': {
    date: '2025-09-16',
    title: '4.37.0 — Interface de Login Premium com Glass Morphism',
    items: [
      '🎨 Interface de Login Completamente Redesenhada: Design glass morphism com transparência e blur avançados',
      '✨ Animações Avançadas: Float, glow, shimmer effects e micro-interações suaves',
      '🌈 Gradientes Dinâmicos: Paleta violet → purple → fuchsia com efeitos visuais premium',
      '🎯 Elementos Decorativos: Círculos flutuantes com blur e transparência animados',
      '🔧 Correção do Botão de Logout: Handler específico implementado com debug melhorado',
      '💫 Efeitos Visuais: Shimmer effects, hover transformations e partículas animadas',
      '📱 Tipografia Premium: Gradientes no texto e hierarquia visual aprimorada',
      '🛡️ Segurança Aprimorada: Mensagens de criptografia e conformidade LGPD',
      '🚀 Nome Atualizado: "Servo Tech Finanças" com identidade visual moderna',
      '⚡ Performance: Animações otimizadas e transições suaves de 500ms'
    ]
  },
  '4.2.8': {
    date: '2025-09-08',
    title: '4.2.8 — Atualização instantânea e Recorrentes',
    items: [
      'PWA: "Verificar atualizações" aplica imediatamente a nova versão (skipWaiting + recarregamento seguro) e caches limitados à versão atual',
      'Service Worker: escopo de cache restrito à versão corrente para evitar conteúdo desatualizado após deploy',
      'Recorrentes (1 parcela): ao efetivar, cria transação no mês correto (dia ajustado) e conta nas métricas do mês mesmo inativa após aplicar',
      'Listas de Recorrentes: itens com início futuro não aparecem em meses anteriores',
      'Fidelidade do mês selecionado em painéis/listas unificada pelo estado global do período'
    ]
  },
  '4.2.7': {
    date: '2025-09-05',
    title: '4.2.7 — Categorias e PWA',
    items: [
      'Categorias: Card “Controle de Categorias” agora mostra totais agregados — Despesas (Limite, Gasto do mês, Saldo) e Receitas (Meta, Recebido do mês, Saldo)',
      'Categorias: Destaque visual para Saldo negativo (badge “negativo” + cor do valor)',
      'Configurações: “O que mudou” exibe no máximo as 5 últimas alterações desta versão',
      'PWA: melhorias na barra de atualização (fechamento confiável, botão Detalhes, auto-hide e ocultar ao navegar)',
      'PWA: atualização forçada para testes; Service Worker v4.2.7'
    ]
  },
  '4.2.3': {
    date: '2025-09-04',
    title: '4.2.3 — Atualizações PWA e Ajustes',
    items: [
      'Atualização PWA sem hard refresh: banner “Nova versão disponível” com ações Atualizar/Detalhes',
      'Indicador (ponto) na aba Configurações quando há atualização disponível',
      'Checagens automáticas de atualização (intervalo e ao recuperar foco da aba)',
      'Aplicação automática segura quando a aba está oculta ou após inatividade (~60s)',
      'Data de “Última Atualização” agora dinâmica (mês/ano atuais)',
      'Service Worker versão v4.2.3 para forçar atualização dos clientes'
    ]
  },
  '4.2.2': {
    date: '2025-08-20',
    title: '4.2.2 — Estabilidade e UX',
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
  // Ordena versões semântico simples (assume mesmo major/minor, compara patch)
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
