// 🎤 SISTEMA DE COMANDO DE VOZ REESTRUTURADO
// Versão 2.0.0 - Completamente modular e robusto

class VoiceSystem {
  constructor() {
    this.isListening = false;
    this.isStarting = false;
    this.hasError = false;
    this.isProcessingCommand = false;
    this.recognition = null;
    this.currentType = null;
    this.isModalOpen = false;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.microphonePermissionChecked = false; // Cache de permissão para evitar delays
    this.hasReceivedSpeech = false; // Flag para controlar se já recebeu fala
    
    console.log('🎤 VoiceSystem inicializado');
  }

  // ===== INICIALIZAÇÃO =====
  
  init() {
    console.log('🎤 Inicializando VoiceSystem...');
    
    // Verificar suporte do navegador
    if (!this.checkBrowserSupport()) {
      console.error('❌ Navegador não suporta reconhecimento de voz');
      this.showError('Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.');
      return false;
    }

    // Verificar HTTPS
    if (!this.checkHTTPS()) {
      console.error('❌ HTTPS necessário para reconhecimento de voz');
      this.showError('O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS.');
      return false;
    }

    // Configurar reconhecimento
    try {
      this.setupRecognition();
      console.log('✅ Reconhecimento configurado');
    } catch (error) {
      console.error('❌ Erro ao configurar reconhecimento:', error);
      return false;
    }
    
    // Configurar eventos globais (remover existentes primeiro para evitar duplicação)
    try {
      this.removeGlobalEvents(); // Limpar eventos existentes
      this.setupGlobalEvents();
      console.log('✅ Eventos globais configurados');
    } catch (error) {
      console.error('❌ Erro ao configurar eventos:', error);
    }
    
    console.log('✅ VoiceSystem inicializado com sucesso');
    return true;
  }

  // ===== VERIFICAÇÕES =====
  
  checkBrowserSupport() {
    const hasSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    console.log('🔍 Suporte ao reconhecimento de voz:', hasSupport);
    return hasSupport;
  }

  checkHTTPS() {
    const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
    console.log('🔍 Protocolo seguro:', isSecure);
    return isSecure;
  }

  // ===== CONFIGURAÇÃO DO RECONHECIMENTO =====
  
  setupRecognition() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      // Configurações otimizadas para evitar cortes
      this.recognition.lang = 'pt-BR';
      this.recognition.continuous = true;  // Manter continuous para captura contínua
      this.recognition.interimResults = true;  // Resultados intermediários para feedback
      this.recognition.maxAlternatives = 1;  // Reduzido para 1 para melhor performance
      
      // Configurações adicionais para estabilidade
      if (this.recognition.serviceURI !== undefined) {
        // Configurações específicas do Chrome
        this.recognition.serviceURI = 'wss://www.google.com/speech-api/v2/recognize';
      }
      
      // Event listeners
      this.recognition.onstart = () => this.handleRecognitionStart();
      this.recognition.onresult = (event) => this.handleRecognitionResult(event);
      this.recognition.onerror = (event) => this.handleRecognitionError(event);
      this.recognition.onend = () => this.handleRecognitionEnd();
      this.recognition.onspeechstart = () => this.handleSpeechStart();
      this.recognition.onspeechend = () => this.handleSpeechEnd();
      this.recognition.onsoundstart = () => this.handleSoundStart();
      this.recognition.onsoundend = () => this.handleSoundEnd();
      
      console.log('✅ Reconhecimento configurado com eventos adicionais');
    } catch (error) {
      console.error('❌ Erro ao configurar reconhecimento:', error);
      this.showError('Erro ao configurar reconhecimento de voz');
    }
  }

  // ===== EVENTOS DO RECONHECIMENTO =====
  
  handleRecognitionStart() {
    console.log('🎤 Reconhecimento iniciado');
    this.isListening = true;
    this.hasReceivedSpeech = false; // Flag para controlar se já recebeu fala
    this.updateModalStatus('', 'Aguardando sua voz...', 'listening');
  }

  handleSpeechStart() {
    console.log('🗣️ Fala detectada - início');
    this.hasReceivedSpeech = true;
    this.updateModalStatus('', 'Ouvindo...', 'listening');
  }

  handleSpeechEnd() {
    console.log('🗣️ Fala detectada - fim');
    // Não reiniciar imediatamente após o fim da fala
    // Aguardar o resultado final
  }

  handleSoundStart() {
    console.log('🔊 Som detectado - início');
  }

  handleSoundEnd() {
    console.log('🔊 Som detectado - fim');
  }

  handleRecognitionResult(event) {
    console.log('🎤 Resultado recebido:', event);
    
    const lastResult = event.results[event.results.length - 1];
    const transcript = lastResult[0].transcript;
    const confidence = lastResult[0].confidence;
    const isFinal = lastResult.isFinal;
    
    console.log('🎤 Transcrição:', transcript);
    console.log('🎤 Confiança:', confidence);
    console.log('🎤 Final:', isFinal);
    
    if (isFinal) {
      // Resultado final - aguardar um pouco antes de processar para evitar cortes
      console.log('✅ Resultado final recebido, aguardando antes de processar...');
      this.updateModalStatus('', `Você disse: "${transcript}"`, 'processing');
      
      // Aguardar 200ms antes de processar para permitir que o áudio termine naturalmente
      setTimeout(() => {
        if (!this.isProcessingCommand) {
          this.processCommand(transcript, confidence);
        }
      }, 200);
    } else {
      // Resultado intermediário - mostrar feedback
      this.updateModalStatus('', `Ouvindo: "${transcript}..."`, 'listening');
    }
  }

  handleRecognitionError(event) {
    console.error('🎤 Erro no reconhecimento:', event);
    this.isListening = false;
    this.isStarting = false;
    
    const errorMessage = this.getErrorMessage(event.error);
    
    // Marcar que houve erro para evitar reinicialização automática
    this.hasError = true;
    
    // Limpar flag de erro após um tempo
    setTimeout(() => {
      this.hasError = false;
    }, 5000);
    
    // Tratamento especial para 'no-speech'
    if (event.error === 'no-speech') {
      console.log('⚠️ Nenhuma fala detectada');
      
      // Se já recebeu fala antes, não reiniciar imediatamente
      if (this.hasReceivedSpeech) {
        console.log('ℹ️ Já havia recebido fala, aguardando mais tempo...');
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 2000); // Aguardar mais tempo se já havia fala
      } else {
        console.log('ℹ️ Nenhuma fala detectada ainda, reiniciando rapidamente...');
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 500); // Reiniciar mais rápido se não houve fala
      }
      return;
    }
    
    this.updateModalStatus('', errorMessage, 'error');
    
    // Tentar novamente se for erro de rede ou serviço
    if (this.shouldRetry(event.error) && this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`🔄 Tentativa ${this.retryCount} de ${this.maxRetries}`);
      
      setTimeout(() => {
        if (this.isModalOpen) {
          this.hasError = false;
          this.startListening(this.currentType);
        }
      }, 2000);
    } else {
      // Fechar modal após erro
      setTimeout(() => {
        this.closeModal();
      }, 3000);
    }
  }

  handleRecognitionEnd() {
    console.log('🎤 Reconhecimento finalizado');
    this.isListening = false;
    this.isStarting = false;
    
    // Se recebeu fala mas não processou comando, aguardar mais tempo antes de reiniciar
    const restartDelay = this.hasReceivedSpeech && !this.isProcessingCommand ? 1000 : 500;
    
    // Só reiniciar se modal estiver aberto, não houve erro e não está processando comando
    if (this.isModalOpen && !this.isListening && !this.hasError && !this.isProcessingCommand) {
      console.log(`🔄 Reiniciando reconhecimento em ${restartDelay}ms...`);
      setTimeout(() => {
        if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
          console.log('🔄 Executando reinicialização...');
          this.startListening(this.currentType);
        } else {
          console.log('🚫 Cancelando reinicialização - condições não atendidas');
        }
      }, restartDelay);
    } else {
      console.log('🚫 Não reiniciando - condições não atendidas:', {
        isModalOpen: this.isModalOpen,
        isListening: this.isListening,
        hasError: this.hasError,
        isProcessingCommand: this.isProcessingCommand
      });
    }
  }

  // ===== PROCESSAMENTO DE COMANDOS =====
  
  async processCommand(transcript, confidence) {
    try {
      this.isProcessingCommand = true;
      console.log('🎤 Processando comando:', transcript);
      
      // Normalizar texto
      const normalizedText = this.normalizeText(transcript);
      console.log('🎤 Texto normalizado:', normalizedText);
      
      // Determinar tipo de comando
      const commandType = this.determineCommandType(normalizedText);
      console.log('🎤 Tipo de comando:', commandType);
      
      // Parar reconhecimento de forma suave APÓS determinar o comando
      if (this.recognition && this.isListening) {
        // Aguardar um pouco antes de parar para evitar corte abrupto
        setTimeout(() => {
          if (this.recognition && this.isListening) {
            this.recognition.stop();
          }
        }, 100);
      }
      
      // Processar comando
      const result = await this.executeCommand(normalizedText, commandType);
      
      // Mostrar resultado
      this.showSuccess(result);
      
      // Fechar modal
      setTimeout(() => {
        this.closeModal();
      }, 2000);
      
    } catch (error) {
      console.error('❌ Erro ao processar comando:', error);
      this.showError(`Erro ao processar comando: ${error.message}`);
      
      setTimeout(() => {
        this.closeModal();
      }, 3000);
    } finally {
      this.isProcessingCommand = false;
    }
  }

  normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .trim();
  }

  determineCommandType(text) {
    console.log('🔍 Determinando tipo de comando para:', text);
    
    // Comandos de consulta explícitos
    if (/\b(saldo|qual.*saldo|saldo atual|quanto.*tenho|meu saldo)\b/.test(text)) {
      console.log('✅ Comando de consulta detectado');
      return 'query';
    }
    
    // Comandos de navegação explícitos
    if (/\b(ir para|va para|mostrar|abrir|navegar).*(dashboard|transacoes|categorias|recorrentes)\b/.test(text)) {
      console.log('✅ Comando de navegação detectado');
      return 'navigation';
    }
    
    // Comandos explícitos de categoria
    if (/\b(adicionar|nova|criar|inserir).*(categoria)\b/.test(text) ||
        /\b(categoria).*(nova|adicionar|criar)\b/.test(text)) {
      console.log('✅ Comando de categoria detectado (explícito)');
      return 'category';
    }
    
    // NOVA LÓGICA: Detecção inteligente baseada na quantidade de itens
    const items = this.extractCommandItems(text);
    console.log('🔍 Itens extraídos do comando:', items);
    
    if (items.length === 3) {
      console.log('✅ 3 itens detectados → Comando de CATEGORIA');
      return 'category';
    } else if (items.length === 4) {
      console.log('✅ 4 itens detectados → Comando de TRANSAÇÃO');
      return 'transaction';
    }
    
    // Fallback: Comandos de transação - padrões tradicionais
    if (/\b(adicionar|nova|criar|inserir|registrar|lancamento|lancar).*(despesa|receita|transacao|gasto|entrada|compra|pagamento)\b/.test(text) ||
        /\b(despesa|receita|gasto|entrada|compra|pagamento).*(de|por|valor|no valor)\b/.test(text) ||
        /\b(gastei|paguei|comprei|recebi|ganhei)\b/.test(text) ||
        /\b(pagar|gastar|comprar|receber|ganhar)\b/.test(text) ||
        /\b\d+.*(?:reais?|real|r\$)\b/.test(text) ||
        /\b(?:cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos).*(?:reais?|real|r\$)?\b/.test(text)) {
      console.log('✅ Comando de transação detectado (padrão tradicional)');
      return 'transaction';
    }
    
    // Se contém números e palavras relacionadas a dinheiro, provavelmente é transação
    if (/\b\d+\b/.test(text) && /\b(reais?|real|r\$|dinheiro|valor)\b/.test(text)) {
      console.log('✅ Comando de transação detectado (padrão numérico)');
      return 'transaction';
    }
    
    // Se contém números por extenso e contexto financeiro
    if (/\b(cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\b/.test(text)) {
      console.log('✅ Comando de transação detectado (número por extenso)');
      return 'transaction';
    }
    
    // Comando padrão
    console.log('⚠️ Usando tipo padrão:', this.currentType || 'transaction');
    return this.currentType || 'transaction';
  }

  extractCommandItems(text) {
    console.log('🔍 Extraindo itens do comando:', text);
    
    // Normalizar texto
    const normalizedText = text.toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .trim();
    
    // Palavras a ignorar na contagem de itens
    const wordsToIgnore = [
      'adicionar', 'nova', 'novo', 'criar', 'inserir', 'registrar', 
      'lancamento', 'lancar', 'de', 'da', 'do', 'na', 'no', 'em', 
      'para', 'por', 'com', 'valor', 'reais', 'real', 'r$', 'dinheiro',
      'categoria', 'transacao', 'e', 'a', 'o', 'as', 'os'
    ];
    
    // Dividir em palavras e filtrar
    const words = normalizedText.split(/\s+/)
      .filter(word => word.length > 1)
      .filter(word => !wordsToIgnore.includes(word));
    
    console.log('🔍 Palavras filtradas:', words);
    
    // Identificar itens significativos
    const items = [];
    
    for (const word of words) {
      // Verificar se é um número (valor)
      if (/^\d+([.,]\d+)?$/.test(word)) {
        items.push({ type: 'valor', value: word });
        continue;
      }
      
      // Verificar se é tipo (despesa/receita)
      if (/^(despesa|receita|gasto|entrada)s?$/.test(word)) {
        items.push({ type: 'tipo', value: word });
        continue;
      }
      
      // Verificar se é uma categoria conhecida
      let isKnownCategory = false;
      if (window.appState?.categories) {
        for (const cat of window.appState.categories) {
          if (cat.nome.toLowerCase().includes(word) || word.includes(cat.nome.toLowerCase())) {
            items.push({ type: 'categoria', value: word });
            isKnownCategory = true;
            break;
          }
        }
      }
      
      // Se não é categoria conhecida, pode ser descrição ou nova categoria
      if (!isKnownCategory && word.length > 2) {
        items.push({ type: 'descricao', value: word });
      }
    }
    
    console.log('🔍 Itens identificados:', items);
    return items;
  }

  async executeCommand(text, type) {
    console.log('🎤 Executando comando:', type, text);
    
    switch (type) {
      case 'query':
        return await this.handleQueryCommand(text);
      case 'transaction':
        return await this.handleTransactionCommand(text);
      case 'category':
        return await this.handleCategoryCommand(text);
      case 'navigation':
        return await this.handleNavigationCommand(text);
      default:
        throw new Error('Tipo de comando não reconhecido');
    }
  }

  // ===== HANDLERS DE COMANDOS =====
  
  async handleQueryCommand(text) {
    console.log('🔍 Processando comando de consulta:', text);
    
    if (/\b(saldo|qual.*saldo|saldo atual)\b/.test(text)) {
      const saldo = this.calculateBalance();
      return `Saldo atual: R$ ${saldo.toFixed(2)}`;
    }
    
    if (/\b(despesas|gastos)\b/.test(text)) {
      const despesas = this.calculateExpenses();
      return `Total de despesas: R$ ${despesas.toFixed(2)}`;
    }
    
    if (/\b(receitas|entradas)\b/.test(text)) {
      const receitas = this.calculateIncome();
      return `Total de receitas: R$ ${receitas.toFixed(2)}`;
    }
    
    return 'Comando de consulta não reconhecido';
  }

  async handleTransactionCommand(text) {
    console.log('💰 Processando comando de transação:', text);
    
    // Extrair informações da transação
    const transactionData = this.parseTransactionCommand(text);
    
    if (!transactionData) {
      throw new Error('Não foi possível entender os dados da transação');
    }
    
    // Preparar mensagem sobre categoria
    const categoriaInfo = transactionData.categoriaExistente 
      ? `categoria existente "${transactionData.categoria}"` 
      : `nova categoria "${transactionData.categoria}"`;
    
    // Abrir modal de transação para edição
    if (window.showAddTransactionModal) {
      // Preparar dados para o modal
      const modalData = {
        descricao: transactionData.descricao,
        valor: transactionData.valor,
        tipo: transactionData.tipo,
        categoriaId: transactionData.categoriaId,
        data: new Date().toISOString().split('T')[0] // formato YYYY-MM-DD
      };
      
      console.log('🎤 Abrindo modal de transação com dados:', modalData);
      
      // Abrir modal para edição (passar apenas os dados como primeiro parâmetro)
      window.showAddTransactionModal(modalData);
      
      const valorText = transactionData.valor !== null ? `de R$ ${transactionData.valor.toFixed(2)}` : '(valor a definir)';
      return `✅ Modal aberto com: ${transactionData.tipo} ${valorText} na ${categoriaInfo}. Você pode editar e salvar.`;
    } else {
      // Fallback para função com confirmação
      if (window.addTransactionWithConfirmation) {
        await window.addTransactionWithConfirmation(transactionData);
        return `✅ Transação confirmada: ${transactionData.tipo} de R$ ${transactionData.valor.toFixed(2)} na ${categoriaInfo}`;
      } else if (window.addTransaction) {
        await window.addTransaction(transactionData);
        return `✅ Transação adicionada: ${transactionData.tipo} de R$ ${transactionData.valor.toFixed(2)} na ${categoriaInfo}`;
      } else {
        throw new Error('Função de adicionar transação não disponível');
      }
    }
  }

  async handleCategoryCommand(text) {
    console.log('📂 Processando comando de categoria:', text);
    
    // Extrair dados da categoria
    const categoryData = this.parseCategoryCommand(text);
    
    if (!categoryData || !categoryData.nome) {
      throw new Error('Nome da categoria não foi entendido');
    }
    
    // Abrir modal de categoria para edição
    if (window.showAddCategoryModal) {
      // Preparar dados para o modal
      const modalData = {
        nome: categoryData.nome,
        tipo: categoryData.tipo,
        limite: categoryData.limite || 0
      };
      
      console.log('🎤 Abrindo modal de categoria com dados:', modalData);
      
      // Abrir modal para edição
      window.showAddCategoryModal(modalData);
      
      const limiteText = categoryData.limite > 0 ? ` com limite de R$ ${categoryData.limite.toFixed(2)}` : '';
      return `✅ Modal aberto com: categoria "${categoryData.nome}" (${categoryData.tipo})${limiteText}. Você pode editar e salvar.`;
    } else {
      // Fallback para adicionar diretamente
      if (window.addCategory) {
        await window.addCategory(categoryData);
        const limiteText = categoryData.limite > 0 ? ` com limite de R$ ${categoryData.limite.toFixed(2)}` : '';
        return `✅ Categoria "${categoryData.nome}" (${categoryData.tipo})${limiteText} adicionada com sucesso`;
      } else {
        throw new Error('Função de adicionar categoria não disponível');
      }
    }
  }

  async handleNavigationCommand(text) {
    console.log('🧭 Processando comando de navegação:', text);
    
    if (/\b(dashboard|início|principal)\b/.test(text)) {
      window.location.hash = '#/dashboard';
      return 'Navegando para o Dashboard';
    }
    
    if (/\b(transações|transação)\b/.test(text)) {
      window.location.hash = '#/transactions';
      return 'Navegando para Transações';
    }
    
    if (/\b(categorias|categoria)\b/.test(text)) {
      window.location.hash = '#/categories';
      return 'Navegando para Categorias';
    }
    
    if (/\b(recorrentes|recorrente)\b/.test(text)) {
      window.location.hash = '#/recorrentes';
      return 'Navegando para Recorrentes';
    }
    
    return 'Comando de navegação não reconhecido';
  }

  // ===== PARSERS =====
  
  parseTransactionCommand(text) {
    console.log('🔍 Analisando comando de transação:', text);
    
    // Padrões para extrair informações
    const patterns = {
      tipo: {
        despesa: /\b(despesa|despesas|gasto|gastos|pago|comprei|gastei|pagar|gastar|comprar|pagamento|compra|saida|saidas)\b/i,
        receita: /\b(receita|receitas|entrada|entradas|ganhei|recebi|salario|ganhar|receber|renda|rendas|ganho|ganhos)\b/i
      },
      // Padrões mais flexíveis para valores
      valor: [
        // Padrões com contexto monetário
        /(?:de|por|valor|custou|custa|custando|no valor de|foi de)\s*(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)?/i,
        /(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,
        // Números por extenso com contexto
        /\b(zero|uma?|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\s*(?:reais?|r\$|real|dinheiro)?\b/i,
        // Números simples
        /\b(\d+(?:[.,]\d{1,2})?)\b/
      ],
      // Padrões para categorias - mais flexíveis
      categoria: [
        /\b(?:categoria|para|em|de|na categoria|tipo)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa)\s*\d)/i,
        /\b(?:com|para|em|de)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa))/i,
        /([a-záàâãéèêíìîóòôõúùûç]+)\s*$/, // última palavra
      ]
    };
    
    // Determinar tipo
    let tipo = 'despesa'; // padrão
    if (patterns.tipo.receita.test(text)) {
      tipo = 'receita';
    }
    
    // Extrair valor - tentar múltiplos padrões
    let valor = null;
    let valorMatch = null;
    
    console.log('🔍 Tentando extrair valor do texto:', text);
    
    // Mapa de números por extenso
    const numerosExtenso = {
      'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
      'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
      'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
      'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
      'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
      'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
      'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
      'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
      'mil': 1000
    };
    
    for (let i = 0; i < patterns.valor.length; i++) {
      const pattern = patterns.valor[i];
      console.log(`🔍 Testando padrão ${i + 1}:`, pattern);
      
      valorMatch = text.match(pattern);
      if (valorMatch) {
        console.log('✅ Match encontrado:', valorMatch);
        const valorCapturado = valorMatch[1];
        console.log('📝 Valor capturado:', valorCapturado);
        
        // Verificar se é um número por extenso
        if (numerosExtenso[valorCapturado.toLowerCase()]) {
          valor = numerosExtenso[valorCapturado.toLowerCase()];
          console.log('🔢 Número por extenso convertido:', valor);
        } else {
          // É um número normal
          valor = parseFloat(valorCapturado.replace(',', '.'));
          console.log('🔢 Número convertido:', valor);
        }
        
        if (valor && valor > 0) {
          console.log('✅ Valor válido encontrado:', valor);
          break;
        } else {
          console.log('❌ Valor inválido, continuando busca...');
          valor = null;
          valorMatch = null;
        }
      } else {
        console.log('❌ Nenhum match para este padrão');
      }
    }
    
    // Se não encontrou valor numérico, tentar números por extenso
    if (!valor) {
      const numerosExtenso = {
        'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
        'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
        'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
        'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
        'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
        'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
        'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
        'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
        'mil': 1000
      };
      
      // Primeiro, tentar encontrar padrões específicos para números por extenso
      const numeroPorExtensoPattern = /\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i;
      
      const numeroMatch = text.match(numeroPorExtensoPattern);
      if (numeroMatch) {
        const numeroEncontrado = numeroMatch[1].toLowerCase();
        if (numerosExtenso[numeroEncontrado]) {
          valor = numerosExtenso[numeroEncontrado];
        }
      }
      
      // Se ainda não encontrou, tentar palavra por palavra (fallback)
      if (!valor) {
        const words = text.split(' ');
        for (const word of words) {
          if (numerosExtenso[word.toLowerCase()]) {
            valor = numerosExtenso[word.toLowerCase()];
            break;
          }
        }
      }
    }
    
    // Se não encontrou valor, definir como null para permitir preenchimento manual
    if (!valor) {
      console.log('⚠️ Valor não encontrado, será preenchido manualmente no modal');
      valor = null;
    }
    
    // Extrair categoria - tentar múltiplos padrões
    let categoria = 'Outros'; // padrão
    let categoriaMatch = null;
    let categoriaEncontrada = null;
    
    // Primeiro, tentar encontrar categorias existentes no texto completo
    if (window.appState?.categories) {
      console.log('🔍 Procurando categorias existentes no texto:', text);
      
      // Buscar por correspondência exata ou parcial
      for (const cat of window.appState.categories) {
        const nomeCategoria = cat.nome.toLowerCase();
        const textoNormalizado = text.toLowerCase();
        
        // Verificar correspondência exata
        if (textoNormalizado.includes(nomeCategoria)) {
          categoriaEncontrada = cat;
          categoria = cat.nome;
          console.log('✅ Categoria encontrada (exata):', categoria);
          break;
        }
        
        // Verificar correspondência parcial (palavras-chave)
        const palavrasCategoria = nomeCategoria.split(' ');
        const palavrasTexto = textoNormalizado.split(' ');
        
        let correspondencias = 0;
        for (const palavra of palavrasCategoria) {
          if (palavra.length > 2 && palavrasTexto.some(p => p.includes(palavra) || palavra.includes(p))) {
            correspondencias++;
          }
        }
        
        // Se encontrou pelo menos 50% das palavras da categoria
        if (correspondencias > 0 && correspondencias >= palavrasCategoria.length * 0.5) {
          categoriaEncontrada = cat;
          categoria = cat.nome;
          console.log('✅ Categoria encontrada (parcial):', categoria, `(${correspondencias}/${palavrasCategoria.length} palavras)`);
          break;
        }
      }
    }
    
    // Se não encontrou categoria existente, tentar extrair do texto
    if (!categoriaEncontrada) {
      for (const pattern of patterns.categoria) {
        categoriaMatch = text.match(pattern);
        if (categoriaMatch && categoriaMatch[1]) {
          let categoriaExtraida = categoriaMatch[1].trim();
          // Limpar palavras comuns que não são categorias
          categoriaExtraida = categoriaExtraida.replace(/\b(de|por|valor|reais?|r\$|real|dinheiro|custou|custa)\b/gi, '').trim();
          
          if (categoriaExtraida.length > 2) { // só aceitar se tiver pelo menos 3 caracteres
            categoria = categoriaExtraida;
            console.log('📝 Categoria extraída do texto:', categoria);
            break;
          }
        }
      }
    }
    
    // PRIMEIRO: Extrair a primeira palavra significativa ANTES de qualquer limpeza
    console.log('🔍 Texto original para descrição:', text);
    
    const palavras = text.toLowerCase().split(' ');
    const palavrasIgnorar = ['adicionar', 'nova', 'criar', 'inserir', 'despesa', 'receita', 'transação', 'gasto', 'entrada', 'gastei', 'comprei', 'paguei', 'com', 'para', 'em', 'de', 'categoria', 'na', 'da', 'tipo', 'reais', 'real', 'dinheiro', 'valor', 'custou', 'custa', 'custando'];
    
    // Encontrar a primeira palavra significativa
    let palavraSignificativa = null;
    for (const palavra of palavras) {
      // Ignorar números
      if (/^\d+([.,]\d+)?$/.test(palavra)) continue;
      // Ignorar palavras comuns
      if (palavrasIgnorar.includes(palavra)) continue;
      // Ignorar categoria encontrada
      if (categoriaEncontrada && palavra === categoriaEncontrada.nome.toLowerCase()) continue;
      // Aceitar palavras com pelo menos 2 caracteres
      if (palavra.length >= 2) {
        palavraSignificativa = palavra;
        break;
      }
    }
    
    console.log('🔍 Primeira palavra significativa encontrada:', palavraSignificativa);
    
    let descricao;
    if (palavraSignificativa) {
      // Usar a primeira palavra significativa como descrição
      descricao = palavraSignificativa.charAt(0).toUpperCase() + palavraSignificativa.slice(1);
      console.log('🔍 Descrição definida como primeira palavra significativa:', descricao);
    } else {
      // Fallback: tentar extrair descrição do texto limpo
      descricao = text;
      
      // Remover valor encontrado
      if (valorMatch) {
        console.log('🔍 Removendo valor encontrado:', valorMatch[0]);
        descricao = descricao.replace(valorMatch[0], '');
      }
      
      // Remover categoria encontrada (se foi extraída por padrão)
      if (categoriaMatch) {
        console.log('🔍 Removendo categoria extraída:', categoriaMatch[0]);
        descricao = descricao.replace(categoriaMatch[0], '');
      }
      
      // Se categoria foi encontrada no sistema, remover do texto também
      if (categoriaEncontrada) {
        const nomeCategoria = categoriaEncontrada.nome.toLowerCase();
        const regex = new RegExp(`\\b${nomeCategoria.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        console.log('🔍 Removendo categoria do sistema:', nomeCategoria);
        descricao = descricao.replace(regex, '');
      }
      
      // Limpar descrição de palavras comuns
      descricao = descricao
        .replace(/\b(adicionar|nova?|criar|inserir|transação|gasto|entrada|gastei|comprei|paguei)\b/gi, '')
        .replace(/\b(com|para|em|de|categoria|na categoria|da categoria|tipo)\b/gi, '')
        .replace(/\b(reais?|r\$|real|dinheiro|valor|custou|custa|custando)\b/gi, '')
        .replace(/\b(despesa|receita)\b(?=.*\w)/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log('🔍 Descrição após limpeza (fallback):', descricao);
      
      // Se ainda ficou vazia, usar descrição padrão
      if (!descricao || descricao.length < 3) {
        if (valor !== null) {
          descricao = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} de R$ ${valor.toFixed(2)}`;
        } else {
          descricao = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
        }
        console.log('🔍 Usando descrição padrão (fallback final):', descricao);
      }
    }
    
    return {
      tipo,
      valor,
      categoria,
      categoriaId: categoriaEncontrada?.id || null,
      categoriaExistente: !!categoriaEncontrada,
      descricao,
      data: new Date().toISOString()
    };
  }

  parseCategoryCommand(text) {
    console.log('🔍 Analisando comando de categoria:', text);
    
    // Verificar se é um comando de 3 itens
    const items = this.extractCommandItems(text);
    if (items.length === 3) {
      console.log('🔍 Processando comando de categoria com 3 itens');
      return this.parseCategoryCommandFromItems(items, text);
    }
    
    // Fallback para padrões tradicionais
    return this.parseCategoryCommandTraditional(text);
  }

  parseCategoryCommandFromItems(items, originalText) {
    console.log('🔍 Analisando comando de categoria com 3 itens:', items);
    
    let nome = null;
    let tipo = 'despesa'; // padrão
    let limite = 0;
    
    // Analisar cada item
    for (const item of items) {
      switch (item.type) {
        case 'valor':
          limite = parseFloat(item.value.replace(',', '.'));
          console.log('💰 Limite extraído:', limite);
          break;
          
        case 'tipo':
          if (/^(receita|entrada)s?$/.test(item.value)) {
            tipo = 'receita';
          } else {
            tipo = 'despesa';
          }
          console.log('📊 Tipo extraído:', tipo);
          break;
          
        case 'descricao':
          if (!nome) { // usar a primeira descrição como nome
            nome = item.value.charAt(0).toUpperCase() + item.value.slice(1);
            console.log('📝 Nome da categoria extraído:', nome);
          }
          break;
      }
    }
    
    // Se não encontrou nome, tentar extrair do texto original
    if (!nome) {
      const words = originalText.toLowerCase().split(' ');
      const wordsToIgnore = ['adicionar', 'nova', 'novo', 'criar', 'inserir', 'categoria', 'despesa', 'receita', 'de', 'da', 'do', 'na', 'no', 'em', 'para', 'por', 'com', 'valor', 'reais', 'real', 'r$', 'dinheiro'];
      
      for (const word of words) {
        if (word.length > 2 && !wordsToIgnore.includes(word) && !/^\d+([.,]\d+)?$/.test(word)) {
          nome = word.charAt(0).toUpperCase() + word.slice(1);
          console.log('📝 Nome da categoria extraído (fallback):', nome);
          break;
        }
      }
    }
    
    if (!nome) {
      throw new Error('Nome da categoria não foi entendido no comando de 3 itens');
    }
    
    console.log('✅ Categoria processada:', { nome, tipo, limite });
    
    return {
      nome,
      tipo,
      limite: limite || 0,
      cor: this.getRandomColor()
    };
  }

  parseCategoryCommandTraditional(text) {
    console.log('🔍 Analisando comando de categoria (método tradicional):', text);
    
    // Padrões para extrair informações da categoria
    const patterns = {
      nome: [
        /\b(?:categoria|categoria)\s+(?:chamada|de|para|com nome)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+(?:chamada|de|para|com nome)?\s*([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b([a-záàâãéèêíìîóòôõúùûç\s]+?)\s+(?:categoria|despesa|receita)\b/i
      ],
      tipo: {
        despesa: /\b(despesa|despesas|gasto|gastos)\b/i,
        receita: /\b(receita|receitas|entrada|entradas|renda|rendas)\b/i
      },
      limite: [
        /\blimite\s+(?:de\s+)?(\d+(?:[.,]\d{1,2})?)/i,
        /(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,
        /(\d+(?:[.,]\d{1,2})?)/
      ]
    };
    
    // Extrair nome da categoria
    let nome = null;
    for (const pattern of patterns.nome) {
      const match = text.match(pattern);
      if (match && match[1]) {
        nome = match[1].trim();
        // Limpar palavras comuns que não são nomes de categoria
        nome = nome.replace(/\b(nova?|criar|adicionar|categoria|tipo|despesa|receita|limite|de|por|valor|reais?|r\$|real|dinheiro)\b/gi, '').trim();
        if (nome.length > 2) { // só aceitar se tiver pelo menos 3 caracteres
          break;
        }
      }
    }
    
    if (!nome) {
      throw new Error('Nome da categoria não foi entendido. Diga algo como "nova categoria chamada transporte"');
    }
    
    // Determinar tipo
    let tipo = 'despesa'; // padrão
    if (patterns.tipo.receita.test(text)) {
      tipo = 'receita';
    }
    
    // Extrair limite (opcional)
    let limite = 0;
    for (const pattern of patterns.limite) {
      const match = text.match(pattern);
      if (match) {
        limite = parseFloat(match[1].replace(',', '.'));
        break;
      }
    }
    
    // Se não encontrou limite numérico, tentar números por extenso
    if (!limite) {
      const numerosExtenso = {
        'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
        'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
        'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
        'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
        'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
        'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
        'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
        'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
        'mil': 1000
      };
      
      // Primeiro, tentar encontrar padrões específicos para números por extenso
      const numeroPorExtensoPattern = /\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i;
      
      const numeroMatch = text.match(numeroPorExtensoPattern);
      if (numeroMatch) {
        const numeroEncontrado = numeroMatch[1].toLowerCase();
        if (numerosExtenso[numeroEncontrado]) {
          limite = numerosExtenso[numeroEncontrado];
        }
      }
      
      // Se ainda não encontrou, tentar palavra por palavra (fallback)
      if (!limite) {
        const words = text.split(' ');
        for (const word of words) {
          if (numerosExtenso[word.toLowerCase()]) {
            limite = numerosExtenso[word.toLowerCase()];
            break;
          }
        }
      }
    }
    
    return {
      nome,
      tipo,
      limite: limite || 0,
      cor: this.getRandomColor()
    };
  }

  getRandomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ===== CÁLCULOS =====
  
  calculateBalance() {
    if (!window.appState?.transactions) {
      return 0;
    }
    
    const receitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
      
    const despesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
      
    return receitas - despesas;
  }

  calculateExpenses() {
    if (!window.appState?.transactions) {
      return 0;
    }
    
    return window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  }

  calculateIncome() {
    if (!window.appState?.transactions) {
      return 0;
    }
    
    return window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  }

  // ===== UTILITÁRIOS =====
  
  getErrorMessage(error) {
    const errorMessages = {
      'not-allowed': 'Permissão do microfone negada. Clique no ícone do microfone na barra de endereços e permita o acesso.',
      'no-speech': 'Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.',
      'audio-capture': 'Erro ao capturar áudio. Verifique se o microfone está funcionando.',
      'network': 'Erro de rede. Verifique sua conexão com a internet.',
      'service-not-allowed': 'Serviço de reconhecimento de voz não permitido.',
      'not-supported': 'Reconhecimento de voz não suportado neste navegador.',
      'aborted': 'Reconhecimento de voz interrompido.',
      'audio-capture-device-not-found': 'Microfone não encontrado.',
      'audio-capture-device-in-use': 'Microfone em uso por outro aplicativo.'
    };
    
    return errorMessages[error] || `Erro desconhecido: ${error}`;
  }

  shouldRetry(error) {
    const retryableErrors = ['network', 'service-not-allowed', 'audio-capture-device-in-use'];
    return retryableErrors.includes(error);
  }

  getRandomColor() {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ===== CONTROLE DO MODAL =====
  
  openModal(type = 'transaction') {
    console.log('🎤 Abrindo modal de voz:', type);
    
    this.currentType = type;
    this.isModalOpen = true;
    this.retryCount = 0;
    
    const modal = document.getElementById('voice-modal');
    const content = modal?.querySelector('.voice-content');
    
    if (modal && content) {
      // Mostrar modal
      modal.style.display = 'flex';
      modal.style.pointerEvents = 'auto';
      modal.style.background = 'rgba(0, 0, 0, 0.95)';
      modal.style.backdropFilter = 'blur(30px)';
      
      // Animar conteúdo
      content.style.transform = 'scale(1)';
      content.style.opacity = '1';
      
      // Adicionar classe ao body
      document.body.classList.add('voice-modal-open');
      
      // Iniciar reconhecimento
      setTimeout(() => {
        this.startListening(type);
      }, 500);
      
      console.log('✅ Modal de voz aberto');
    } else {
      console.error('❌ Modal de voz não encontrado');
    }
  }

  closeModal() {
    // Evitar múltiplas chamadas
    if (!this.isModalOpen) {
      return;
    }
    
    console.log('🎤 Fechando modal de voz');
    
    // Limpar todos os estados
    this.isModalOpen = false;
    this.isListening = false;
    this.isStarting = false;
    this.hasError = false;
    this.isProcessingCommand = false;
    this.retryCount = 0;
    
    const modal = document.getElementById('voice-modal');
    const content = modal?.querySelector('.voice-content');
    
    if (modal && content) {
      // Parar reconhecimento de forma robusta
      if (this.recognition) {
        try {
          this.recognition.stop();
          console.log('🛑 Reconhecimento parado');
        } catch (error) {
          console.log('ℹ️ Reconhecimento já estava parado');
        }
      }
      
      // Animar fechamento
      content.style.transform = 'scale(0.95)';
      content.style.opacity = '0';
      modal.style.background = 'rgba(0, 0, 0, 0)';
      modal.style.backdropFilter = 'blur(0px)';
      
      // Remover classe do body
      document.body.classList.remove('voice-modal-open');
      
      setTimeout(() => {
        modal.style.pointerEvents = 'none';
        modal.style.display = 'none';
        console.log('✅ Modal de voz fechado');
      }, 300);
    }
  }

  updateModalStatus(title, description, status) {
    const modal = document.getElementById('voice-modal');
    if (!modal) return;
    
    const titleEl = modal.querySelector('h3');
    const descEl = modal.querySelector('p');
    const iconEl = modal.querySelector('.voice-icon div');
    const statusEl = modal.querySelector('.voice-status');
    const statusTextEl = statusEl?.querySelector('p');
    
    // Atualizar textos com mensagens mais amigáveis
    if (titleEl) {
      switch (status) {
        case 'listening':
          titleEl.textContent = '🎤 Estou te ouvindo!';
          break;
        case 'processing':
          titleEl.textContent = '🧠 Processando...';
          break;
        case 'error':
          titleEl.textContent = '❌ Ops! Algo deu errado';
          break;
        case 'success':
          titleEl.textContent = '✅ Perfeito!';
          break;
        default:
          titleEl.textContent = title || '🎤 Estou te ouvindo!';
      }
    }
    
    if (descEl) {
      switch (status) {
        case 'listening':
          descEl.textContent = 'Fale naturalmente como você gastou ou recebeu dinheiro';
          break;
        case 'processing':
          descEl.textContent = 'Entendendo o que você disse...';
          break;
        case 'error':
          descEl.textContent = description || 'Tente falar novamente de forma mais clara';
          break;
        case 'success':
          descEl.textContent = description || 'Transação adicionada com sucesso!';
          break;
        default:
          descEl.textContent = description || 'Fale naturalmente como você gastou ou recebeu dinheiro';
      }
    }
    
    // Atualizar ícone baseado no status
    if (iconEl) {
      iconEl.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg';
      
      switch (status) {
        case 'listening':
          iconEl.classList.add('bg-gradient-to-r', 'from-green-400', 'to-blue-500', 'animate-pulse');
          break;
        case 'processing':
          iconEl.classList.add('bg-gradient-to-r', 'from-yellow-400', 'to-orange-500', 'animate-spin');
          break;
        case 'error':
          iconEl.classList.add('bg-gradient-to-r', 'from-red-400', 'to-pink-500');
          break;
        case 'success':
          iconEl.classList.add('bg-gradient-to-r', 'from-green-400', 'to-emerald-500');
          break;
        default:
          iconEl.classList.add('bg-gradient-to-r', 'from-green-400', 'to-blue-500', 'animate-pulse');
      }
    }
    
    // Atualizar indicadores de status e texto
    if (statusEl) {
      const dots = statusEl.querySelectorAll('div');
      
      // Atualizar animação dos pontos
      dots.forEach((dot, index) => {
        // Remover classes antigas
        dot.classList.remove('animate-bounce', 'animate-pulse', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500');
        
        switch (status) {
          case 'listening':
            dot.classList.add('animate-bounce', 'bg-green-500');
            dot.style.animationDelay = `${index * 0.1}s`;
            break;
          case 'processing':
            dot.classList.add('animate-pulse', 'bg-yellow-500');
            dot.style.animationDelay = `${index * 0.2}s`;
            break;
          case 'error':
            dot.classList.add('bg-red-500');
            dot.style.animationDelay = '';
            break;
          case 'success':
            dot.classList.add('bg-green-500');
            dot.style.animationDelay = '';
            break;
          default:
            dot.classList.add('animate-bounce', 'bg-green-500');
            dot.style.animationDelay = `${index * 0.1}s`;
        }
      });
      
      // Atualizar texto do status
      if (statusTextEl) {
        switch (status) {
          case 'listening':
            statusTextEl.textContent = 'Microfone ativo';
            statusTextEl.className = 'text-xs text-green-600 dark:text-green-400 font-medium';
            break;
          case 'processing':
            statusTextEl.textContent = 'Processando comando...';
            statusTextEl.className = 'text-xs text-yellow-600 dark:text-yellow-400 font-medium';
            break;
          case 'error':
            statusTextEl.textContent = 'Erro no reconhecimento';
            statusTextEl.className = 'text-xs text-red-600 dark:text-red-400 font-medium';
            break;
          case 'success':
            statusTextEl.textContent = 'Comando executado!';
            statusTextEl.className = 'text-xs text-green-600 dark:text-green-400 font-medium';
            break;
          default:
            statusTextEl.textContent = 'Microfone ativo';
            statusTextEl.className = 'text-xs text-green-600 dark:text-green-400 font-medium';
        }
      }
    }
  }

  // ===== CONTROLE DO RECONHECIMENTO =====
  
  async startListening(type = 'transaction') {
    console.log('🎤 Iniciando reconhecimento de voz...', { type, isListening: this.isListening });
    
    try {
      // Verificar se o reconhecimento está configurado
      if (!this.recognition) {
        console.error('❌ Reconhecimento não configurado');
        throw new Error('Reconhecimento não configurado');
      }

      // Se já está ouvindo, não fazer nada
      if (this.isListening) {
        console.log('⚠️ Reconhecimento já está ativo, ignorando nova tentativa');
        return true;
      }

      // Definir tipo atual imediatamente
      this.currentType = type;
      console.log('✅ Tipo de comando definido:', this.currentType);
      
      // Atualizar status do modal
      this.updateModalStatus('', 'Iniciando...', 'processing');
      
      // Verificação rápida de permissão (sem aguardar stream completo)
      if (!this.microphonePermissionChecked) {
        console.log('🔍 Verificação rápida de permissão...');
        const hasPermission = await this.quickPermissionCheck();
        if (!hasPermission) {
          console.log('❌ Permissão do microfone negada');
          return false;
        }
        this.microphonePermissionChecked = true;
      }
      
      // Parada rápida do reconhecimento anterior (sem delay)
      try {
        this.recognition.stop();
        console.log('🛑 Parando reconhecimento anterior (sem delay)...');
      } catch (stopError) {
        console.log('ℹ️ Nenhum reconhecimento anterior para parar');
      }
      
      // Marcar como iniciando para evitar múltiplas tentativas
      this.isStarting = true;
      
      // Iniciar reconhecimento IMEDIATAMENTE (sem delays)
      console.log('🚀 Iniciando reconhecimento IMEDIATAMENTE...');
      this.recognition.start();
      console.log('✅ Reconhecimento iniciado com sucesso');
      
      // Limpar flag de iniciando após um tempo menor
      setTimeout(() => {
        this.isStarting = false;
      }, 500);
      
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao iniciar reconhecimento:', error);
      this.isStarting = false;
      
      let errorMessage = 'Erro ao iniciar reconhecimento de voz';
      
      if (error.name === 'InvalidStateError') {
        console.log('🔄 Reconhecimento já ativo, aguardando...');
        // Aguardar um pouco e tentar novamente
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!this.isListening && !this.isStarting) {
          console.log('🔄 Tentando novamente após aguardar...');
          return this.startListening(type);
        }
        errorMessage = 'Sistema de voz ocupado. Tente novamente em alguns segundos.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Reconhecimento de voz não suportado neste navegador. Use Chrome ou Edge.';
      } else if (error.name === 'NetworkError') {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      }
      
      this.showError(errorMessage);
      return false;
    }
  }

  // Verificação rápida de permissão (sem aguardar stream completo)
  async quickPermissionCheck() {
    console.log('⚡ Verificação rápida de permissão...');
    
    try {
      // Verificar se a API está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('⚠️ API getUserMedia não disponível');
        this.showError('Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox.');
        return false;
      }

      // Verificar permissões via API de permissões (mais rápido)
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'microphone' });
          console.log('🔍 Status da permissão:', permission.state);
          
          if (permission.state === 'granted') {
            console.log('✅ Permissão já concedida');
            return true;
          } else if (permission.state === 'denied') {
            console.log('❌ Permissão negada');
            this.showError('Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.');
            return false;
          }
          // Se 'prompt', continuar com verificação completa
        } catch (permError) {
          console.log('ℹ️ API de permissões não disponível, usando método alternativo');
        }
      }

      // Verificação rápida com timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 1000)
      );
      
      const streamPromise = navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      try {
        const stream = await Promise.race([streamPromise, timeoutPromise]);
        
        // Parar o stream imediatamente (apenas para verificar permissão)
        stream.getTracks().forEach(track => track.stop());
        
        console.log('✅ Permissão do microfone concedida (verificação rápida)');
        return true;
      } catch (raceError) {
        if (raceError.message === 'Timeout') {
          console.log('⚠️ Timeout na verificação, assumindo permissão OK');
          return true; // Assumir que está OK para não bloquear
        }
        throw raceError;
      }

    } catch (error) {
      console.warn('⚠️ Erro na verificação rápida:', error.name);
      
      // Para erros de permissão, mostrar mensagem específica
      if (error.name === 'NotAllowedError') {
        this.showError('Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.');
        return false;
      } else if (error.name === 'NotFoundError') {
        this.showError('Nenhum microfone encontrado. Verifique se há um microfone conectado.');
        return false;
      }
      
      // Para outros erros, assumir que está OK para não bloquear
      console.log('ℹ️ Assumindo permissão OK para não bloquear o sistema');
      return true;
    }
  }

  async requestMicrophonePermission() {
    console.log('🎤 Solicitando permissão do microfone...');
    
    try {
      // Verificar se a API está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('⚠️ API getUserMedia não disponível');
        return false;
      }

      // Tentar solicitar permissão primeiro (pode revelar dispositivos)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        });
        
        // Parar o stream imediatamente (apenas para verificar permissão)
        stream.getTracks().forEach(track => track.stop());
        
        console.log('✅ Permissão do microfone concedida');
        return true;
        
      } catch (permissionError) {
        console.warn('⚠️ Erro de permissão:', permissionError.name);
        
        // Se for erro de permissão, tentar enumerar dispositivos
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioDevices = devices.filter(device => device.kind === 'audioinput');
          
          console.log('🔍 Dispositivos encontrados:', devices.length);
          console.log('🎤 Dispositivos de áudio:', audioDevices.length);
          
          if (audioDevices.length === 0) {
            console.warn('⚠️ Nenhum dispositivo de áudio encontrado');
            this.showError('Nenhum microfone encontrado. Verifique se há um microfone conectado.');
            return false;
          } else {
            console.log('✅ Dispositivos de áudio disponíveis:', audioDevices.map(d => d.label || 'Microfone'));
            // Se há dispositivos mas permissão foi negada, mostrar mensagem específica
            this.showError('Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.');
            return false;
          }
        } catch (enumError) {
          console.error('❌ Erro ao enumerar dispositivos:', enumError);
          this.showError('Erro ao verificar dispositivos de áudio. Tente recarregar a página.');
          return false;
        }
      }
      
    } catch (error) {
      console.error('❌ Erro ao solicitar permissão:', error);
      
      // Tratar erros específicos
      let errorMessage = 'Erro ao acessar microfone';
      
      if (error.name === 'NotFoundError') {
        errorMessage = 'Nenhum microfone encontrado. Verifique se há um microfone conectado.';
      } else if (error.name === 'NotAllowedError') {
        errorMessage = 'Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Microfone em uso por outro aplicativo. Feche outros aplicativos que possam estar usando o microfone.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'Configuração de microfone não suportada. Tente usar outro navegador.';
      } else if (error.name === 'TypeError') {
        errorMessage = 'Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox.';
      }
      
      this.showError(errorMessage);
      return false;
    }
  }

  // ===== NOTIFICAÇÕES =====
  
  showSuccess(message) {
    console.log('✅ Sucesso:', message);
    this.updateModalStatus('', message, 'success');
    
    // Usar nova API do Snackbar
    if (window.Snackbar && typeof window.Snackbar.success === 'function') {
      window.Snackbar.success(message);
    } else if (window.Snackbar && typeof window.Snackbar.show === 'function') {
      window.Snackbar.show(message, 'success');
    } else if (window.Snackbar && typeof window.Snackbar === 'function') {
      window.Snackbar({ message, type: 'success' });
    } else if (window.alert) {
      alert(`✅ ${message}`);
    }
  }

  showError(message) {
    console.error('❌ Erro:', message);
    this.updateModalStatus('', message, 'error');
    
    // Usar nova API do Snackbar com fallbacks
    if (window.Snackbar && typeof window.Snackbar.error === 'function') {
      window.Snackbar.error(message);
    } else if (window.Snackbar && typeof window.Snackbar.show === 'function') {
      window.Snackbar.show(message, 'error');
    } else if (window.Snackbar && typeof window.Snackbar === 'function') {
      window.Snackbar({ message, type: 'error' });
    } else if (window.alert) {
      alert(`❌ ${message}`);
    } else {
      console.error('Nenhum sistema de notificação disponível');
    }
  }

  // ===== EVENTOS GLOBAIS =====
  
  setupGlobalEvents() {
    // Remover event listeners existentes para evitar duplicação
    this.removeGlobalEvents();
    
    console.log('🔧 Configurando eventos globais do VoiceSystem...');
    
    // Fechar modal com ESC
    this.escapeHandler = (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);
    
    // Fechar modal ao clicar fora
    this.outsideClickHandler = (e) => {
      const modal = document.getElementById('voice-modal');
      if (e.target === modal && this.isModalOpen) {
        this.closeModal();
      }
    };
    document.addEventListener('click', this.outsideClickHandler);
    
    // Botão de fechar modal
    const closeBtn = document.getElementById('close-voice-modal');
    if (closeBtn) {
      console.log('🔧 Configurando botão de fechar modal...');
      
      // Remover event listeners existentes do botão
      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
      
      this.closeBtnHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('❌ Close voice modal button clicked');
        this.closeModal();
      };
      newCloseBtn.addEventListener('click', this.closeBtnHandler);
      console.log('✅ Event listener do botão de fechar configurado');
    } else {
      console.log('⚠️ Botão de fechar modal não encontrado');
    }
  }

  removeGlobalEvents() {
    console.log('🧹 Removendo event listeners existentes...');
    
    // Remover event listeners existentes
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
      console.log('✅ Event listener ESC removido');
    }
    
    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
      console.log('✅ Event listener click fora removido');
    }
    
    if (this.closeBtnHandler) {
      const closeBtn = document.getElementById('close-voice-modal');
      if (closeBtn) {
        closeBtn.removeEventListener('click', this.closeBtnHandler);
        console.log('✅ Event listener botão fechar removido');
      }
      this.closeBtnHandler = null;
    }
    
    console.log('🧹 Limpeza de event listeners concluída');
  }

  // ===== FUNÇÕES PÚBLICAS =====
  
  start(type = 'transaction') {
    console.log('🎤 VoiceSystem.start chamado:', type);
    
    try {
      // Verificar se já está inicializado
      if (!this.recognition) {
        console.log('🔄 Inicializando VoiceSystem...');
        if (!this.init()) {
          console.error('❌ Falha na inicialização do VoiceSystem');
          return false;
        }
      }
      
      // Verificar se o modal existe
      const modal = document.getElementById('voice-modal');
      if (!modal) {
        console.error('❌ Modal de voz não encontrado no DOM');
        this.showError('Interface de voz não disponível');
        return false;
      }
      
      // Definir tipo atual
      this.currentType = type;
      console.log('✅ Tipo de comando definido:', this.currentType);
      
      // Abrir modal
      this.openModal(type);
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao iniciar VoiceSystem:', error);
      this.showError(`Erro ao iniciar reconhecimento de voz: ${error.message}`);
      return false;
    }
  }

  stop() {
    console.log('🎤 VoiceSystem.stop chamado');
    this.closeModal();
  }

  // ===== DESTRUTOR =====
  
  destroy() {
    console.log('🎤 Destruindo VoiceSystem...');
    
    // Parar reconhecimento
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
    
    // Remover event listeners
    this.removeGlobalEvents();
    
    // Fechar modal se estiver aberto
    if (this.isModalOpen) {
      this.closeModal();
    }
    
    // Resetar estado
    this.isListening = false;
    this.isModalOpen = false;
    this.retryCount = 0;
    
    console.log('✅ VoiceSystem destruído');
  }
}

// ===== INSTÂNCIA GLOBAL =====
let voiceSystem = null;

// ===== FUNÇÕES GLOBAIS =====
window.openVoiceModal = function(type = 'transaction') {
  console.log('🎤 openVoiceModal chamado:', type);
  
  if (!voiceSystem) {
    voiceSystem = new VoiceSystem();
  }
  
  return voiceSystem.start(type);
};

window.closeVoiceModal = function() {
  console.log('🎤 closeVoiceModal chamado');
  
  if (voiceSystem) {
    voiceSystem.stop();
  }
};

window.startVoiceRecognition = function(type = 'transaction') {
  console.log('🎤 startVoiceRecognition chamado:', type);
  
  if (!voiceSystem) {
    voiceSystem = new VoiceSystem();
  }
  
  return voiceSystem.start(type);
};

// ===== EXPORT =====
export { VoiceSystem };
