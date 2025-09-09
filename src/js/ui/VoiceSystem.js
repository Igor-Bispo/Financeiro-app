// ðŸŽ¤ SISTEMA DE COMANDO DE VOZ REESTRUTURADO
// VersÃ£o 2.0.0 - Completamente modular e robusto

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
    this.microphonePermissionChecked = false; // Cache de permissÃ£o para evitar delays
    this.hasReceivedSpeech = false; // Flag para controlar se jÃ¡ recebeu fala

    console.log('ðŸŽ¤ VoiceSystem inicializado');
  }

  // ===== INICIALIZAÃ‡ÃƒO =====

  init() {
    console.log('ðŸŽ¤ Inicializando VoiceSystem...');

    // Verificar suporte do navegador
    if (!this.checkBrowserSupport()) {
      console.error('âŒ Navegador nÃ£o suporta reconhecimento de voz');
      this.showError('Seu navegador nÃ£o suporta reconhecimento de voz. Use Chrome ou Edge.');
      return false;
    }

    // Verificar HTTPS
    if (!this.checkHTTPS()) {
      console.error('âŒ HTTPS necessÃ¡rio para reconhecimento de voz');
      this.showError('O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS.');
      return false;
    }

    // Configurar reconhecimento
    try {
      this.setupRecognition();
      console.log('âœ… Reconhecimento configurado');
    } catch (error) {
      console.error('âŒ Erro ao configurar reconhecimento:', error);
      return false;
    }

    // Configurar eventos globais
    try {
      this.setupGlobalEvents();
      console.log('âœ… Eventos globais configurados');
    } catch (error) {
      console.error('âŒ Erro ao configurar eventos:', error);
    }

    console.log('âœ… VoiceSystem inicializado com sucesso');
    return true;
  }

  // ===== VERIFICAÃ‡Ã•ES =====

  checkBrowserSupport() {
    const hasSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    console.log('ðŸ” Suporte ao reconhecimento de voz:', hasSupport);
    return hasSupport;
  }

  checkHTTPS() {
    const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
    console.log('ðŸ” Protocolo seguro:', isSecure);
    return isSecure;
  }

  // ===== CONFIGURAÃ‡ÃƒO DO RECONHECIMENTO =====

  setupRecognition() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();

      // ConfiguraÃ§Ãµes otimizadas para evitar cortes
      this.recognition.lang = 'pt-BR';
      this.recognition.continuous = true;  // Manter continuous para captura contÃ­nua
      this.recognition.interimResults = true;  // Resultados intermediÃ¡rios para feedback
      this.recognition.maxAlternatives = 1;  // Reduzido para 1 para melhor performance

      // ConfiguraÃ§Ãµes adicionais para estabilidade
      if (this.recognition.serviceURI !== undefined) {
        // ConfiguraÃ§Ãµes especÃ­ficas do Chrome
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

      console.log('âœ… Reconhecimento configurado com eventos adicionais');
    } catch (error) {
      console.error('âŒ Erro ao configurar reconhecimento:', error);
      this.showError('Erro ao configurar reconhecimento de voz');
    }
  }

  // ===== EVENTOS DO RECONHECIMENTO =====

  handleRecognitionStart() {
    console.log('ðŸŽ¤ Reconhecimento iniciado');
    this.isListening = true;
    this.hasReceivedSpeech = false; // Flag para controlar se jÃ¡ recebeu fala
    this.updateModalStatus('', 'Aguardando sua voz...', 'listening');
  }

  handleSpeechStart() {
    console.log('ðŸ—£ï¸ Fala detectada - inÃ­cio');
    this.hasReceivedSpeech = true;
    this.updateModalStatus('', 'Ouvindo...', 'listening');
  }

  handleSpeechEnd() {
    console.log('ðŸ—£ï¸ Fala detectada - fim');
    // NÃ£o reiniciar imediatamente apÃ³s o fim da fala
    // Aguardar o resultado final
  }

  handleSoundStart() {
    console.log('ðŸ”Š Som detectado - inÃ­cio');
  }

  handleSoundEnd() {
    console.log('ðŸ”Š Som detectado - fim');
  }

  handleRecognitionResult(event) {
    console.log('ðŸŽ¤ Resultado recebido:', event);

    const lastResult = event.results[event.results.length - 1];
    const transcript = lastResult[0].transcript;
    const confidence = lastResult[0].confidence;
    const isFinal = lastResult.isFinal;

    console.log('ðŸŽ¤ TranscriÃ§Ã£o:', transcript);
    console.log('ðŸŽ¤ ConfianÃ§a:', confidence);
    console.log('ðŸŽ¤ Final:', isFinal);

    if (isFinal) {
      // Resultado final - aguardar um pouco antes de processar para evitar cortes
      console.log('âœ… Resultado final recebido, aguardando antes de processar...');
      this.updateModalStatus('', `VocÃª disse: "${transcript}"`, 'processing');

      // Aguardar 200ms antes de processar para permitir que o Ã¡udio termine naturalmente
      setTimeout(() => {
        if (!this.isProcessingCommand) {
          this.processCommand(transcript, confidence);
        }
      }, 200);
    } else {
      // Resultado intermediÃ¡rio - mostrar feedback
      this.updateModalStatus('', `Ouvindo: "${transcript}..."`, 'listening');
    }
  }

  handleRecognitionError(event) {
    console.error('ðŸŽ¤ Erro no reconhecimento:', event);
    this.isListening = false;
    this.isStarting = false;

    const errorMessage = this.getErrorMessage(event.error);

    // Marcar que houve erro para evitar reinicializaÃ§Ã£o automÃ¡tica
    this.hasError = true;

    // Limpar flag de erro apÃ³s um tempo
    setTimeout(() => {
      this.hasError = false;
    }, 5000);

    // Tratamento especial para 'no-speech'
    if (event.error === 'no-speech') {
      console.log('âš ï¸ Nenhuma fala detectada');

      // Se jÃ¡ recebeu fala antes, nÃ£o reiniciar imediatamente
      if (this.hasReceivedSpeech) {
        console.log('â„¹ï¸ JÃ¡ havia recebido fala, aguardando mais tempo...');
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 2000); // Aguardar mais tempo se jÃ¡ havia fala
      } else {
        console.log('â„¹ï¸ Nenhuma fala detectada ainda, reiniciando rapidamente...');
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 500); // Reiniciar mais rÃ¡pido se nÃ£o houve fala
      }
      return;
    }

    this.updateModalStatus('', errorMessage, 'error');

    // Tentar novamente se for erro de rede ou serviÃ§o
    if (this.shouldRetry(event.error) && this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`ðŸ”„ Tentativa ${this.retryCount} de ${this.maxRetries}`);

      setTimeout(() => {
        if (this.isModalOpen) {
          this.hasError = false;
          this.startListening(this.currentType);
        }
      }, 2000);
    } else {
      // Fechar modal apÃ³s erro
      setTimeout(() => {
        this.closeModal();
      }, 3000);
    }
  }

  handleRecognitionEnd() {
    console.log('ðŸŽ¤ Reconhecimento finalizado');
    this.isListening = false;
    this.isStarting = false;

    // Se recebeu fala mas nÃ£o processou comando, aguardar mais tempo antes de reiniciar
    const restartDelay = this.hasReceivedSpeech && !this.isProcessingCommand ? 1000 : 500;

    // SÃ³ reiniciar se modal estiver aberto, nÃ£o houve erro e nÃ£o estÃ¡ processando comando
    if (this.isModalOpen && !this.isListening && !this.hasError && !this.isProcessingCommand) {
      console.log(`ðŸ”„ Reiniciando reconhecimento em ${restartDelay}ms...`);
      setTimeout(() => {
        if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
          console.log('ðŸ”„ Executando reinicializaÃ§Ã£o...');
          this.startListening(this.currentType);
        } else {
          console.log('ðŸš« Cancelando reinicializaÃ§Ã£o - condiÃ§Ãµes nÃ£o atendidas');
        }
      }, restartDelay);
    } else {
      console.log('ðŸš« NÃ£o reiniciando - condiÃ§Ãµes nÃ£o atendidas:', {
        isModalOpen: this.isModalOpen,
        isListening: this.isListening,
        hasError: this.hasError,
        isProcessingCommand: this.isProcessingCommand
      });
    }
  }

  // ===== PROCESSAMENTO DE COMANDOS =====

  async processCommand(transcript, _confidence) {
    try {
      this.isProcessingCommand = true;
      console.log('ðŸŽ¤ Processando comando:', transcript);

      // Normalizar texto
      const normalizedText = this.normalizeText(transcript);
      console.log('ðŸŽ¤ Texto normalizado:', normalizedText);

      // Determinar tipo de comando
      const commandType = this.determineCommandType(normalizedText);
      console.log('ðŸŽ¤ Tipo de comando:', commandType);

      // Parar reconhecimento de forma suave APÃ“S determinar o comando
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
      console.error('âŒ Erro ao processar comando:', error);
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
    console.log('ðŸ” Determinando tipo de comando para:', text);

    // Comandos de consulta explÃ­citos
    if (/\b(saldo|qual.*saldo|saldo atual|quanto.*tenho|meu saldo)\b/.test(text)) {
      console.log('âœ… Comando de consulta detectado');
      return 'query';
    }

    // Comandos de navegaÃ§Ã£o explÃ­citos
    if (/\b(ir para|va para|mostrar|abrir|navegar).*(dashboard|transacoes|categorias|recorrentes)\b/.test(text)) {
      console.log('âœ… Comando de navegaÃ§Ã£o detectado');
      return 'navigation';
    }

    // Comandos explÃ­citos de categoria
    if (/\b(adicionar|nova|criar|inserir).*(categoria)\b/.test(text) ||
        /\b(categoria).*(nova|adicionar|criar)\b/.test(text)) {
      console.log('âœ… Comando de categoria detectado (explÃ­cito)');
      return 'category';
    }

    // NOVA LÃ“GICA: DetecÃ§Ã£o inteligente baseada na quantidade de itens
    const items = this.extractCommandItems(text);
    console.log('ðŸ” Itens extraÃ­dos do comando:', items);

    if (items.length === 3) {
      console.log('âœ… 3 itens detectados â†’ Comando de CATEGORIA');
      return 'category';
    } else if (items.length === 4) {
      console.log('âœ… 4 itens detectados â†’ Comando de TRANSAÃ‡ÃƒO');
      return 'transaction';
    }

    // Fallback: Comandos de transaÃ§Ã£o - padrÃµes tradicionais
    if (/\b(adicionar|nova|criar|inserir|registrar|lancamento|lancar).*(despesa|receita|transacao|gasto|entrada|compra|pagamento)\b/.test(text) ||
        /\b(despesa|receita|gasto|entrada|compra|pagamento).*(de|por|valor|no valor)\b/.test(text) ||
        /\b(gastei|paguei|comprei|recebi|ganhei)\b/.test(text) ||
        /\b(pagar|gastar|comprar|receber|ganhar)\b/.test(text) ||
        /\b\d+.*(?:reais?|real|r\$)\b/.test(text) ||
        /\b(?:cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos).*(?:reais?|real|r\$)?\b/.test(text)) {
      console.log('âœ… Comando de transaÃ§Ã£o detectado (padrÃ£o tradicional)');
      return 'transaction';
    }

    // Se contÃ©m nÃºmeros e palavras relacionadas a dinheiro, provavelmente Ã© transaÃ§Ã£o
    if (/\b\d+\b/.test(text) && /\b(reais?|real|r\$|dinheiro|valor)\b/.test(text)) {
      console.log('âœ… Comando de transaÃ§Ã£o detectado (padrÃ£o numÃ©rico)');
      return 'transaction';
    }

    // Se contÃ©m nÃºmeros por extenso e contexto financeiro
    if (/\b(cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\b/.test(text)) {
      console.log('âœ… Comando de transaÃ§Ã£o detectado (nÃºmero por extenso)');
      return 'transaction';
    }

    // Comando padrÃ£o
    console.log('âš ï¸ Usando tipo padrÃ£o:', this.currentType || 'transaction');
    return this.currentType || 'transaction';
  }

  extractCommandItems(text) {
    console.log('ðŸ” Extraindo itens do comando:', text);

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

    console.log('ðŸ” Palavras filtradas:', words);

    // Identificar itens significativos
    const items = [];

    for (const word of words) {
      // Verificar se Ã© um nÃºmero (valor)
      if (/^\d+([.,]\d+)?$/.test(word)) {
        items.push({ type: 'valor', value: word });
        continue;
      }

      // Verificar se Ã© tipo (despesa/receita)
      if (/^(despesa|receita|gasto|entrada)s?$/.test(word)) {
        items.push({ type: 'tipo', value: word });
        continue;
      }

      // Verificar se Ã© uma categoria conhecida
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

      // Se nÃ£o Ã© categoria conhecida, pode ser descriÃ§Ã£o ou nova categoria
      if (!isKnownCategory && word.length > 2) {
        items.push({ type: 'descricao', value: word });
      }
    }

    console.log('ðŸ” Itens identificados:', items);
    return items;
  }

  async executeCommand(text, type) {
    console.log('ðŸŽ¤ Executando comando:', type, text);

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
      throw new Error('Tipo de comando nÃ£o reconhecido');
    }
  }

  // ===== HANDLERS DE COMANDOS =====

  async handleQueryCommand(text) {
    console.log('ðŸ” Processando comando de consulta:', text);

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

    return 'Comando de consulta nÃ£o reconhecido';
  }

  async handleTransactionCommand(text) {
    console.log('ðŸ’° Processando comando de transaÃ§Ã£o:', text);

    // Extrair informaÃ§Ãµes da transaÃ§Ã£o
    const transactionData = this.parseTransactionCommand(text);

    if (!transactionData) {
      throw new Error('NÃ£o foi possÃ­vel entender os dados da transaÃ§Ã£o');
    }

    // Preparar mensagem sobre categoria
    const categoriaInfo = transactionData.categoriaExistente
      ? `categoria existente "${transactionData.categoria}"`
      : `nova categoria "${transactionData.categoria}"`;

    // Abrir modal de transaÃ§Ã£o para ediÃ§Ã£o
    if (window.showAddTransactionModal) {
      // Preparar dados para o modal
      const modalData = {
        descricao: transactionData.descricao,
        valor: transactionData.valor,
        tipo: transactionData.tipo,
        categoriaId: transactionData.categoriaId,
        data: new Date().toISOString().split('T')[0] // formato YYYY-MM-DD
      };

      console.log('ðŸŽ¤ Abrindo modal de transaÃ§Ã£o com dados:', modalData);

      // Abrir modal para ediÃ§Ã£o (passar apenas os dados como primeiro parÃ¢metro)
      window.showAddTransactionModal(modalData);

      const valorText = transactionData.valor !== null ? `de R$ ${transactionData.valor.toFixed(2)}` : '(valor a definir)';
      return `âœ… Modal aberto com: ${transactionData.tipo} ${valorText} na ${categoriaInfo}. VocÃª pode editar e salvar.`;
    } else {
      // Fallback para funÃ§Ã£o com confirmaÃ§Ã£o
      if (window.addTransactionWithConfirmation) {
        await window.addTransactionWithConfirmation(transactionData);
        return `âœ… TransaÃ§Ã£o confirmada: ${transactionData.tipo} de R$ ${transactionData.valor.toFixed(2)} na ${categoriaInfo}`;
      } else if (window.addTransaction) {
        await window.addTransaction(transactionData);
        return `âœ… TransaÃ§Ã£o adicionada: ${transactionData.tipo} de R$ ${transactionData.valor.toFixed(2)} na ${categoriaInfo}`;
      } else {
        throw new Error('FunÃ§Ã£o de adicionar transaÃ§Ã£o nÃ£o disponÃ­vel');
      }
    }
  }

  async handleCategoryCommand(text) {
    console.log('ðŸ“‚ Processando comando de categoria:', text);

    // Extrair dados da categoria
    const categoryData = this.parseCategoryCommand(text);

    if (!categoryData || !categoryData.nome) {
      throw new Error('Nome da categoria nÃ£o foi entendido');
    }

    // Abrir modal de categoria para ediÃ§Ã£o
    if (window.showAddCategoryModal) {
      // Preparar dados para o modal
      const modalData = {
        nome: categoryData.nome,
        tipo: categoryData.tipo,
        limite: categoryData.limite || 0
      };

      console.log('ðŸŽ¤ Abrindo modal de categoria com dados:', modalData);

      // Abrir modal para ediÃ§Ã£o
      window.showAddCategoryModal(modalData);

      const limiteText = categoryData.limite > 0 ? ` com limite de R$ ${categoryData.limite.toFixed(2)}` : '';
      return `âœ… Modal aberto com: categoria "${categoryData.nome}" (${categoryData.tipo})${limiteText}. VocÃª pode editar e salvar.`;
    } else {
      // Fallback para adicionar diretamente
      if (window.addCategory) {
        await window.addCategory(categoryData);
        const limiteText = categoryData.limite > 0 ? ` com limite de R$ ${categoryData.limite.toFixed(2)}` : '';
        return `âœ… Categoria "${categoryData.nome}" (${categoryData.tipo})${limiteText} adicionada com sucesso`;
      } else {
        throw new Error('FunÃ§Ã£o de adicionar categoria nÃ£o disponÃ­vel');
      }
    }
  }

  async handleNavigationCommand(text) {
    console.log('ðŸ§­ Processando comando de navegaÃ§Ã£o:', text);

    if (/\b(dashboard|inÃ­cio|principal)\b/.test(text)) {
      window.location.hash = '#/dashboard';
      return 'Navegando para o Dashboard';
    }

    if (/\b(transaÃ§Ãµes|transaÃ§Ã£o)\b/.test(text)) {
      window.location.hash = '#/transactions';
      return 'Navegando para TransaÃ§Ãµes';
    }

    if (/\b(categorias|categoria)\b/.test(text)) {
      window.location.hash = '#/categories';
      return 'Navegando para Categorias';
    }

    if (/\b(recorrentes|recorrente)\b/.test(text)) {
      window.location.hash = '#/recorrentes';
      return 'Navegando para Recorrentes';
    }

    return 'Comando de navegaÃ§Ã£o nÃ£o reconhecido';
  }

  // ===== PARSERS =====

  parseTransactionCommand(text) {
    console.log('ðŸ” Analisando comando de transaÃ§Ã£o:', text);

    // PadrÃµes para extrair informaÃ§Ãµes
    const patterns = {
      tipo: {
        despesa: /\b(despesa|despesas|gasto|gastos|pago|comprei|gastei|pagar|gastar|comprar|pagamento|compra|saida|saidas)\b/i,
        receita: /\b(receita|receitas|entrada|entradas|ganhei|recebi|salario|ganhar|receber|renda|rendas|ganho|ganhos)\b/i
      },
      // PadrÃµes mais flexÃ­veis para valores
      valor: [
        // PadrÃµes com contexto monetÃ¡rio
        /(?:de|por|valor|custou|custa|custando|no valor de|foi de)\s*(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)?/i,
        /(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,
        // NÃºmeros por extenso com contexto
        /\b(zero|uma?|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\s*(?:reais?|r\$|real|dinheiro)?\b/i,
        // NÃºmeros simples
        /\b(\d+(?:[.,]\d{1,2})?)\b/
      ],
      // PadrÃµes para categorias - mais flexÃ­veis
      categoria: [
        /\b(?:categoria|para|em|de|na categoria|tipo)\s+([a-zÃ¡Ã Ã¢Ã£Ã©Ã¨ÃªÃ­Ã¬Ã®Ã³Ã²Ã´ÃµÃºÃ¹Ã»Ã§\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa)\s*\d)/i,
        /\b(?:com|para|em|de)\s+([a-zÃ¡Ã Ã¢Ã£Ã©Ã¨ÃªÃ­Ã¬Ã®Ã³Ã²Ã´ÃµÃºÃ¹Ã»Ã§\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa))/i,
        /([a-zÃ¡Ã Ã¢Ã£Ã©Ã¨ÃªÃ­Ã¬Ã®Ã³Ã²Ã´ÃµÃºÃ¹Ã»Ã§]+)\s*$/, // Ãºltima palavra
      ]
    };

    // Determinar tipo
    let tipo = 'despesa'; // padrÃ£o
    if (patterns.tipo.receita.test(text)) {
      tipo = 'receita';
    }

    // Extrair valor - tentar mÃºltiplos padrÃµes
    let valor = null;
    let valorMatch = null;

    console.log('ðŸ” Tentando extrair valor do texto:', text);

    // Mapa de nÃºmeros por extenso
    const numerosExtenso = {
      'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'trÃªs': 3, 'tres': 3,
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
      console.log(`ðŸ” Testando padrÃ£o ${i + 1}:`, pattern);

      valorMatch = text.match(pattern);
      if (valorMatch) {
        console.log('âœ… Match encontrado:', valorMatch);
        const valorCapturado = valorMatch[1];
        console.log('ðŸ“ Valor capturado:', valorCapturado);

        // Verificar se Ã© um nÃºmero por extenso
        if (numerosExtenso[valorCapturado.toLowerCase()]) {
          valor = numerosExtenso[valorCapturado.toLowerCase()];
          console.log('ðŸ”¢ NÃºmero por extenso convertido:', valor);
        } else {
          // Ã‰ um nÃºmero normal
          valor = parseFloat(valorCapturado.replace(',', '.'));
          console.log('ðŸ”¢ NÃºmero convertido:', valor);
        }

        if (valor && valor > 0) {
          console.log('âœ… Valor vÃ¡lido encontrado:', valor);
          break;
        } else {
          console.log('âŒ Valor invÃ¡lido, continuando busca...');
          valor = null;
          valorMatch = null;
        }
      } else {
        console.log('âŒ Nenhum match para este padrÃ£o');
      }
    }

    // Se nÃ£o encontrou valor numÃ©rico, tentar nÃºmeros por extenso
    if (!valor) {
      const numerosExtenso = {
        'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'trÃªs': 3, 'tres': 3,
        'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
        'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
        'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
        'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
        'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
        'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
        'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
        'mil': 1000
      };

      // Primeiro, tentar encontrar padrÃµes especÃ­ficos para nÃºmeros por extenso
      const numeroPorExtensoPattern = /\b(zero|uma?|dois|duas|trÃªs|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i;

      const numeroMatch = text.match(numeroPorExtensoPattern);
      if (numeroMatch) {
        const numeroEncontrado = numeroMatch[1].toLowerCase();
        if (numerosExtenso[numeroEncontrado]) {
          valor = numerosExtenso[numeroEncontrado];
        }
      }

      // Se ainda nÃ£o encontrou, tentar palavra por palavra (fallback)
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

    // Se nÃ£o encontrou valor, definir como null para permitir preenchimento manual
    if (!valor) {
      console.log('âš ï¸ Valor nÃ£o encontrado, serÃ¡ preenchido manualmente no modal');
      valor = null;
    }

    // Extrair categoria - tentar mÃºltiplos padrÃµes
    let categoria = 'Outros'; // padrÃ£o
    let categoriaMatch = null;
    let categoriaEncontrada = null;

    // Primeiro, tentar encontrar categorias existentes no texto completo
    if (window.appState?.categories) {
      console.log('ðŸ” Procurando categorias existentes no texto:', text);

      // Buscar por correspondÃªncia exata ou parcial
      for (const cat of window.appState.categories) {
        const nomeCategoria = cat.nome.toLowerCase();
        const textoNormalizado = text.toLowerCase();

        // Verificar correspondÃªncia exata
        if (textoNormalizado.includes(nomeCategoria)) {
          categoriaEncontrada = cat;
          categoria = cat.nome;
          console.log('âœ… Categoria encontrada (exata):', categoria);
          break;
        }

        // Verificar correspondÃªncia parcial (palavras-chave)
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
          console.log('âœ… Categoria encontrada (parcial):', categoria, `(${correspondencias}/${palavrasCategoria.length} palavras)`);
          break;
        }
      }
    }

    // Se nÃ£o encontrou categoria existente, tentar extrair do texto
    if (!categoriaEncontrada) {
      for (const pattern of patterns.categoria) {
        categoriaMatch = text.match(pattern);
        if (categoriaMatch && categoriaMatch[1]) {
          let categoriaExtraida = categoriaMatch[1].trim();
          // Limpar palavras comuns que nÃ£o sÃ£o categorias
          categoriaExtraida = categoriaExtraida.replace(/\b(de|por|valor|reais?|r\$|real|dinheiro|custou|custa)\b/gi, '').trim();

          if (categoriaExtraida.length > 2) { // sÃ³ aceitar se tiver pelo menos 3 caracteres
            categoria = categoriaExtraida;
            console.log('ðŸ“ Categoria extraÃ­da do texto:', categoria);
            break;
          }
        }
      }
    }

    // PRIMEIRO: Extrair a primeira palavra significativa ANTES de qualquer limpeza
    console.log('ðŸ” Texto original para descriÃ§Ã£o:', text);

    const palavras = text.toLowerCase().split(' ');
    const palavrasIgnorar = ['adicionar', 'nova', 'criar', 'inserir', 'despesa', 'receita', 'transaÃ§Ã£o', 'gasto', 'entrada', 'gastei', 'comprei', 'paguei', 'com', 'para', 'em', 'de', 'categoria', 'na', 'da', 'tipo', 'reais', 'real', 'dinheiro', 'valor', 'custou', 'custa', 'custando'];

    // Encontrar a primeira palavra significativa
    let palavraSignificativa = null;
    for (const palavra of palavras) {
      // Ignorar nÃºmeros
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

    console.log('ðŸ” Primeira palavra significativa encontrada:', palavraSignificativa);

    let descricao;
    if (palavraSignificativa) {
      // Usar a primeira palavra significativa como descriÃ§Ã£o
      descricao = palavraSignificativa.charAt(0).toUpperCase() + palavraSignificativa.slice(1);
      console.log('ðŸ” DescriÃ§Ã£o definida como primeira palavra significativa:', descricao);
    } else {
      // Fallback: tentar extrair descriÃ§Ã£o do texto limpo
      descricao = text;

      // Remover valor encontrado
      if (valorMatch) {
        console.log('ðŸ” Removendo valor encontrado:', valorMatch[0]);
        descricao = descricao.replace(valorMatch[0], '');
      }

      // Remover categoria encontrada (se foi extraÃ­da por padrÃ£o)
      if (categoriaMatch) {
        console.log('ðŸ” Removendo categoria extraÃ­da:', categoriaMatch[0]);
        descricao = descricao.replace(categoriaMatch[0], '');
      }

      // Se categoria foi encontrada no sistema, remover do texto tambÃ©m
      if (categoriaEncontrada) {
        const nomeCategoria = categoriaEncontrada.nome.toLowerCase();
        const regex = new RegExp(`\\b${nomeCategoria.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        console.log('ðŸ” Removendo categoria do sistema:', nomeCategoria);
        descricao = descricao.replace(regex, '');
      }

      // Limpar descriÃ§Ã£o de palavras comuns
      descricao = descricao
        .replace(/\b(adicionar|nova?|criar|inserir|transaÃ§Ã£o|gasto|entrada|gastei|comprei|paguei)\b/gi, '')
        .replace(/\b(com|para|em|de|categoria|na categoria|da categoria|tipo)\b/gi, '')
        .replace(/\b(reais?|r\$|real|dinheiro|valor|custou|custa|custando)\b/gi, '')
        .replace(/\b(despesa|receita)\b(?=.*\w)/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

      console.log('ðŸ” DescriÃ§Ã£o apÃ³s limpeza (fallback):', descricao);

      // Se ainda ficou vazia, usar descriÃ§Ã£o padrÃ£o
      if (!descricao || descricao.length < 3) {
        if (valor !== null) {
          descricao = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} de R$ ${valor.toFixed(2)}`;
        } else {
          descricao = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
        }
        console.log('ðŸ” Usando descriÃ§Ã£o padrÃ£o (fallback final):', descricao);
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
    console.log('ðŸ” Analisando comando de categoria:', text);

    // Verificar se Ã© um comando de 3 itens
    const items = this.extractCommandItems(text);
    if (items.length === 3) {
      console.log('ðŸ” Processando comando de categoria com 3 itens');
      return this.parseCategoryCommandFromItems(items, text);
    }

    // Fallback para padrÃµes tradicionais
    return this.parseCategoryCommandTraditional(text);
  }

  parseCategoryCommandFromItems(items, originalText) {
    console.log('ðŸ” Analisando comando de categoria com 3 itens:', items);

    let nome = null;
    let tipo = 'despesa'; // padrÃ£o
    let limite = 0;

    // Analisar cada item
    for (const item of items) {
      switch (item.type) {
      case 'valor':
        limite = parseFloat(item.value.replace(',', '.'));
        console.log('ðŸ’° Limite extraÃ­do:', limite);
        break;

      case 'tipo':
        if (/^(receita|entrada)s?$/.test(item.value)) {
          tipo = 'receita';
        } else {
          tipo = 'despesa';
        }
        console.log('ðŸ“Š Tipo extraÃ­do:', tipo);
        break;

      case 'descricao':
        if (!nome) { // usar a primeira descriÃ§Ã£o como nome
          nome = item.value.charAt(0).toUpperCase() + item.value.slice(1);
          console.log('ðŸ“ Nome da categoria extraÃ­do:', nome);
        }
        break;
      }
    }

    // Se nÃ£o encontrou nome, tentar extrair do texto original
    if (!nome) {
      const words = originalText.toLowerCase().split(' ');
      const wordsToIgnore = ['adicionar', 'nova', 'novo', 'criar', 'inserir', 'categoria', 'despesa', 'receita', 'de', 'da', 'do', 'na', 'no', 'em', 'para', 'por', 'com', 'valor', 'reais', 'real', 'r$', 'dinheiro'];

      for (const word of words) {
        if (word.length > 2 && !wordsToIgnore.includes(word) && !/^\d+([.,]\d+)?$/.test(word)) {
          nome = word.charAt(0).toUpperCase() + word.slice(1);
          console.log('ðŸ“ Nome da categoria extraÃ­do (fallback):', nome);
          break;
        }
      }
    }

    if (!nome) {
      throw new Error('Nome da categoria nÃ£o foi entendido no comando de 3 itens');
    }

    console.log('âœ… Categoria processada:', { nome, tipo, limite });

    return {
      nome,
      tipo,
      limite: limite || 0,
      cor: this.getRandomColor()
    };
  }

  parseCategoryCommandTraditional(text) {
    console.log('ðŸ” Analisando comando de categoria (mÃ©todo tradicional):', text);

    // PadrÃµes para extrair informaÃ§Ãµes da categoria
    const patterns = {
      nome: [
        /\b(?:categoria|categoria)\s+(?:chamada|de|para|com nome)\s+([a-zÃ¡Ã Ã¢Ã£Ã©Ã¨ÃªÃ­Ã¬Ã®Ã³Ã²Ã´ÃµÃºÃ¹Ã»Ã§\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+(?:chamada|de|para|com nome)?\s*([a-zÃ¡Ã Ã¢Ã£Ã©Ã¨ÃªÃ­Ã¬Ã®Ã³Ã²Ã´ÃµÃºÃ¹Ã»Ã§\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b(?:categoria|categoria)\s+([a-zÃ¡Ã Ã¢Ã£Ã©Ã¨ÃªÃ­Ã¬Ã®Ã³Ã²Ã´ÃµÃºÃ¹Ã»Ã§\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b([a-zÃ¡Ã Ã¢Ã£Ã©Ã¨ÃªÃ­Ã¬Ã®Ã³Ã²Ã´ÃµÃºÃ¹Ã»Ã§\s]+?)\s+(?:categoria|despesa|receita)\b/i
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
        // Limpar palavras comuns que nÃ£o sÃ£o nomes de categoria
        nome = nome.replace(/\b(nova?|criar|adicionar|categoria|tipo|despesa|receita|limite|de|por|valor|reais?|r\$|real|dinheiro)\b/gi, '').trim();
        if (nome.length > 2) { // sÃ³ aceitar se tiver pelo menos 3 caracteres
          break;
        }
      }
    }

    if (!nome) {
      throw new Error('Nome da categoria nÃ£o foi entendido. Diga algo como "nova categoria chamada transporte"');
    }

    // Determinar tipo
    let tipo = 'despesa'; // padrÃ£o
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

    // Se nÃ£o encontrou limite numÃ©rico, tentar nÃºmeros por extenso
    if (!limite) {
      const numerosExtenso = {
        'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'trÃªs': 3, 'tres': 3,
        'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
        'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
        'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
        'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
        'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
        'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
        'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
        'mil': 1000
      };

      // Primeiro, tentar encontrar padrÃµes especÃ­ficos para nÃºmeros por extenso
      const numeroPorExtensoPattern = /\b(zero|uma?|dois|duas|trÃªs|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i;

      const numeroMatch = text.match(numeroPorExtensoPattern);
      if (numeroMatch) {
        const numeroEncontrado = numeroMatch[1].toLowerCase();
        if (numerosExtenso[numeroEncontrado]) {
          limite = numerosExtenso[numeroEncontrado];
        }
      }

      // Se ainda nÃ£o encontrou, tentar palavra por palavra (fallback)
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

  // ===== CÃLCULOS =====

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

  // ===== UTILITÃRIOS =====

  getErrorMessage(error) {
    const errorMessages = {
      'not-allowed': 'PermissÃ£o do microfone negada. Clique no Ã­cone do microfone na barra de endereÃ§os e permita o acesso.',
      'no-speech': 'Nenhuma fala detectada. Tente falar mais alto ou mais prÃ³ximo do microfone.',
      'audio-capture': 'Erro ao capturar Ã¡udio. Verifique se o microfone estÃ¡ funcionando.',
      'network': 'Erro de rede. Verifique sua conexÃ£o com a internet.',
      'service-not-allowed': 'ServiÃ§o de reconhecimento de voz nÃ£o permitido.',
      'not-supported': 'Reconhecimento de voz nÃ£o suportado neste navegador.',
      'aborted': 'Reconhecimento de voz interrompido.',
      'audio-capture-device-not-found': 'Microfone nÃ£o encontrado.',
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
    console.log('ðŸŽ¤ Abrindo modal de voz:', type);

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

      // Animar conteÃºdo
      content.style.transform = 'scale(1)';
      content.style.opacity = '1';

      // Adicionar classe ao body
      document.body.classList.add('voice-modal-open');

      // Iniciar reconhecimento
      setTimeout(() => {
        this.startListening(type);
      }, 500);

      console.log('âœ… Modal de voz aberto');
    } else {
      console.error('âŒ Modal de voz nÃ£o encontrado');
    }
  }

  closeModal() {
    // Evitar mÃºltiplas chamadas
    if (!this.isModalOpen) {
      return;
    }

    console.log('ðŸŽ¤ Fechando modal de voz');

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
          console.log('ðŸ›‘ Reconhecimento parado');
        } catch {
          console.log('â„¹ï¸ Reconhecimento jÃ¡ estava parado');
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
        console.log('âœ… Modal de voz fechado');
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

    // Atualizar textos com mensagens mais amigÃ¡veis
    if (titleEl) {
      switch (status) {
      case 'listening':
        titleEl.textContent = 'ðŸŽ¤ Estou te ouvindo!';
        break;
      case 'processing':
        titleEl.textContent = 'ðŸ§  Processando...';
        break;
      case 'error':
        titleEl.textContent = 'âŒ Ops! Algo deu errado';
        break;
      case 'success':
        titleEl.textContent = 'âœ… Perfeito!';
        break;
      default:
        titleEl.textContent = title || 'ðŸŽ¤ Estou te ouvindo!';
      }
    }

    if (descEl) {
      switch (status) {
      case 'listening':
        descEl.textContent = 'Fale naturalmente como vocÃª gastou ou recebeu dinheiro';
        break;
      case 'processing':
        descEl.textContent = 'Entendendo o que vocÃª disse...';
        break;
      case 'error':
        descEl.textContent = description || 'Tente falar novamente de forma mais clara';
        break;
      case 'success':
        descEl.textContent = description || 'TransaÃ§Ã£o adicionada com sucesso!';
        break;
      default:
        descEl.textContent = description || 'Fale naturalmente como vocÃª gastou ou recebeu dinheiro';
      }
    }

    // Atualizar Ã­cone baseado no status
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

      // Atualizar animaÃ§Ã£o dos pontos
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
    console.log('ðŸŽ¤ Iniciando reconhecimento de voz...', { type, isListening: this.isListening });

    try {
      // Verificar se o reconhecimento estÃ¡ configurado
      if (!this.recognition) {
        console.error('âŒ Reconhecimento nÃ£o configurado');
        throw new Error('Reconhecimento nÃ£o configurado');
      }

      // Se jÃ¡ estÃ¡ ouvindo, nÃ£o fazer nada
      if (this.isListening) {
        console.log('âš ï¸ Reconhecimento jÃ¡ estÃ¡ ativo, ignorando nova tentativa');
        return true;
      }

      // Definir tipo atual imediatamente
      this.currentType = type;
      console.log('âœ… Tipo de comando definido:', this.currentType);

      // Atualizar status do modal
      this.updateModalStatus('', 'Iniciando...', 'processing');

      // VerificaÃ§Ã£o rÃ¡pida de permissÃ£o (sem aguardar stream completo)
      if (!this.microphonePermissionChecked) {
        console.log('ðŸ” VerificaÃ§Ã£o rÃ¡pida de permissÃ£o...');
        const hasPermission = await this.quickPermissionCheck();
        if (!hasPermission) {
          console.log('âŒ PermissÃ£o do microfone negada');
          return false;
        }
        this.microphonePermissionChecked = true;
      }

      // Parada rÃ¡pida do reconhecimento anterior (sem delay)
      try {
        this.recognition.stop();
        console.log('ðŸ›‘ Parando reconhecimento anterior (sem delay)...');
      } catch {
        console.log('â„¹ï¸ Nenhum reconhecimento anterior para parar');
      }

      // Marcar como iniciando para evitar mÃºltiplas tentativas
      this.isStarting = true;

      // Iniciar reconhecimento IMEDIATAMENTE (sem delays)
      console.log('ðŸš€ Iniciando reconhecimento IMEDIATAMENTE...');
      this.recognition.start();
      console.log('âœ… Reconhecimento iniciado com sucesso');

      // Limpar flag de iniciando apÃ³s um tempo menor
      setTimeout(() => {
        this.isStarting = false;
      }, 500);

      return true;

    } catch (error) {
      console.error('âŒ Erro ao iniciar reconhecimento:', error);
      this.isStarting = false;

      let errorMessage = 'Erro ao iniciar reconhecimento de voz';

      if (error.name === 'InvalidStateError') {
        console.log('ðŸ”„ Reconhecimento jÃ¡ ativo, aguardando...');
        // Aguardar um pouco e tentar novamente
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!this.isListening && !this.isStarting) {
          console.log('ðŸ”„ Tentando novamente apÃ³s aguardar...');
          return this.startListening(type);
        }
        errorMessage = 'Sistema de voz ocupado. Tente novamente em alguns segundos.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Reconhecimento de voz nÃ£o suportado neste navegador. Use Chrome ou Edge.';
      } else if (error.name === 'NetworkError') {
        errorMessage = 'Erro de conexÃ£o. Verifique sua internet e tente novamente.';
      }

      this.showError(errorMessage);
      return false;
    }
  }

  // VerificaÃ§Ã£o rÃ¡pida de permissÃ£o (sem aguardar stream completo)
  async quickPermissionCheck() {
    console.log('âš¡ VerificaÃ§Ã£o rÃ¡pida de permissÃ£o...');

    try {
      // Verificar se a API estÃ¡ disponÃ­vel
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('âš ï¸ API getUserMedia nÃ£o disponÃ­vel');
        this.showError('Navegador nÃ£o suporta acesso ao microfone. Use Chrome, Edge ou Firefox.');
        return false;
      }

      // Verificar permissÃµes via API de permissÃµes (mais rÃ¡pido)
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'microphone' });
          console.log('ðŸ” Status da permissÃ£o:', permission.state);

          if (permission.state === 'granted') {
            console.log('âœ… PermissÃ£o jÃ¡ concedida');
            return true;
          } else if (permission.state === 'denied') {
            console.log('âŒ PermissÃ£o negada');
            this.showError('PermissÃ£o do microfone negada. Permita o acesso ao microfone nas configuraÃ§Ãµes do navegador.');
            return false;
          }
          // Se 'prompt', continuar com verificaÃ§Ã£o completa
        } catch {
          console.log('â„¹ï¸ API de permissÃµes nÃ£o disponÃ­vel, usando mÃ©todo alternativo');
        }
      }

      // VerificaÃ§Ã£o rÃ¡pida com timeout
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

        // Parar o stream imediatamente (apenas para verificar permissÃ£o)
        stream.getTracks().forEach(track => track.stop());

        console.log('âœ… PermissÃ£o do microfone concedida (verificaÃ§Ã£o rÃ¡pida)');
        return true;
      } catch (raceError) {
        if (raceError.message === 'Timeout') {
          console.log('âš ï¸ Timeout na verificaÃ§Ã£o, assumindo permissÃ£o OK');
          return true; // Assumir que estÃ¡ OK para nÃ£o bloquear
        }
        throw raceError;
      }

    } catch (error) {
      console.warn('âš ï¸ Erro na verificaÃ§Ã£o rÃ¡pida:', error.name);

      // Para erros de permissÃ£o, mostrar mensagem especÃ­fica
      if (error.name === 'NotAllowedError') {
        this.showError('PermissÃ£o do microfone negada. Permita o acesso ao microfone nas configuraÃ§Ãµes do navegador.');
        return false;
      } else if (error.name === 'NotFoundError') {
        this.showError('Nenhum microfone encontrado. Verifique se hÃ¡ um microfone conectado.');
        return false;
      }

      // Para outros erros, assumir que estÃ¡ OK para nÃ£o bloquear
      console.log('â„¹ï¸ Assumindo permissÃ£o OK para nÃ£o bloquear o sistema');
      return true;
    }
  }

  async requestMicrophonePermission() {
    console.log('ðŸŽ¤ Solicitando permissÃ£o do microfone...');

    try {
      // Verificar se a API estÃ¡ disponÃ­vel
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('âš ï¸ API getUserMedia nÃ£o disponÃ­vel');
        return false;
      }

      // Tentar solicitar permissÃ£o primeiro (pode revelar dispositivos)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        // Parar o stream imediatamente (apenas para verificar permissÃ£o)
        stream.getTracks().forEach(track => track.stop());

        console.log('âœ… PermissÃ£o do microfone concedida');
        return true;

      } catch (permissionError) {
        console.warn('âš ï¸ Erro de permissÃ£o:', permissionError.name);

        // Se for erro de permissÃ£o, tentar enumerar dispositivos
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioDevices = devices.filter(device => device.kind === 'audioinput');

          console.log('ðŸ” Dispositivos encontrados:', devices.length);
          console.log('ðŸŽ¤ Dispositivos de Ã¡udio:', audioDevices.length);

          if (audioDevices.length === 0) {
            console.warn('âš ï¸ Nenhum dispositivo de Ã¡udio encontrado');
            this.showError('Nenhum microfone encontrado. Verifique se hÃ¡ um microfone conectado.');
            return false;
          } else {
            console.log('âœ… Dispositivos de Ã¡udio disponÃ­veis:', audioDevices.map(d => d.label || 'Microfone'));
            // Se hÃ¡ dispositivos mas permissÃ£o foi negada, mostrar mensagem especÃ­fica
            this.showError('PermissÃ£o do microfone negada. Permita o acesso ao microfone nas configuraÃ§Ãµes do navegador.');
            return false;
          }
        } catch (enumError) {
          console.error('âŒ Erro ao enumerar dispositivos:', enumError);
          this.showError('Erro ao verificar dispositivos de Ã¡udio. Tente recarregar a pÃ¡gina.');
          return false;
        }
      }

    } catch (error) {
      console.error('âŒ Erro ao solicitar permissÃ£o:', error);

      // Tratar erros especÃ­ficos
      let errorMessage = 'Erro ao acessar microfone';

      if (error.name === 'NotFoundError') {
        errorMessage = 'Nenhum microfone encontrado. Verifique se hÃ¡ um microfone conectado.';
      } else if (error.name === 'NotAllowedError') {
        errorMessage = 'PermissÃ£o do microfone negada. Permita o acesso ao microfone nas configuraÃ§Ãµes do navegador.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Microfone em uso por outro aplicativo. Feche outros aplicativos que possam estar usando o microfone.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'ConfiguraÃ§Ã£o de microfone nÃ£o suportada. Tente usar outro navegador.';
      } else if (error.name === 'TypeError') {
        errorMessage = 'Navegador nÃ£o suporta acesso ao microfone. Use Chrome, Edge ou Firefox.';
      }

      this.showError(errorMessage);
      return false;
    }
  }

  // ===== NOTIFICAÃ‡Ã•ES =====

  showSuccess(message) {
    console.log('âœ… Sucesso:', message);
    this.updateModalStatus('', message, 'success');

    // Usar nova API do Snackbar
    if (window.Snackbar && typeof window.Snackbar.success === 'function') {
      window.Snackbar.success(message);
    } else if (window.Snackbar && typeof window.Snackbar.show === 'function') {
      window.Snackbar.show(message, 'success');
    } else if (window.Snackbar && typeof window.Snackbar === 'function') {
      window.Snackbar({ message, type: 'success' });
    } else if (window.alert) {
      alert(`âœ… ${message}`);
    }
  }

  showError(message) {
    console.error('âŒ Erro:', message);
    this.updateModalStatus('', message, 'error');

    // Usar nova API do Snackbar com fallbacks
    if (window.Snackbar && typeof window.Snackbar.error === 'function') {
      window.Snackbar.error(message);
    } else if (window.Snackbar && typeof window.Snackbar.show === 'function') {
      window.Snackbar.show(message, 'error');
    } else if (window.Snackbar && typeof window.Snackbar === 'function') {
      window.Snackbar({ message, type: 'error' });
    } else if (window.alert) {
      alert(`âŒ ${message}`);
    } else {
      console.error('Nenhum sistema de notificaÃ§Ã£o disponÃ­vel');
    }
  }

  // ===== EVENTOS GLOBAIS =====

  setupGlobalEvents() {
    // Remover event listeners existentes para evitar duplicaÃ§Ã£o
    this.removeGlobalEvents();

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

    // BotÃ£o de fechar modal
    const closeBtn = document.getElementById('close-voice-modal');
    if (closeBtn) {
      // Remover event listeners existentes do botÃ£o
      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

      this.closeBtnHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('âŒ Close voice modal button clicked');
        this.closeModal();
      };
      newCloseBtn.addEventListener('click', this.closeBtnHandler);
    }
  }

  removeGlobalEvents() {
    // Remover event listeners existentes
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }

    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
    }

    if (this.closeBtnHandler) {
      const closeBtn = document.getElementById('close-voice-modal');
      if (closeBtn) {
        closeBtn.removeEventListener('click', this.closeBtnHandler);
      }
      this.closeBtnHandler = null;
    }
  }

  // ===== FUNÃ‡Ã•ES PÃšBLICAS =====

  start(type = 'transaction') {
    console.log('ðŸŽ¤ VoiceSystem.start chamado:', type);

    try {
      // Verificar se jÃ¡ estÃ¡ inicializado
      if (!this.recognition) {
        console.log('ðŸ”„ Inicializando VoiceSystem...');
        if (!this.init()) {
          console.error('âŒ Falha na inicializaÃ§Ã£o do VoiceSystem');
          return false;
        }
      }

      // Verificar se o modal existe
      const modal = document.getElementById('voice-modal');
      if (!modal) {
        console.error('âŒ Modal de voz nÃ£o encontrado no DOM');
        this.showError('Interface de voz nÃ£o disponÃ­vel');
        return false;
      }

      // Definir tipo atual
      this.currentType = type;
      console.log('âœ… Tipo de comando definido:', this.currentType);

      // Abrir modal
      this.openModal(type);
      return true;

    } catch (error) {
      console.error('âŒ Erro ao iniciar VoiceSystem:', error);
      this.showError(`Erro ao iniciar reconhecimento de voz: ${error.message}`);
      return false;
    }
  }

  stop() {
    console.log('ðŸŽ¤ VoiceSystem.stop chamado');
    this.closeModal();
  }

  // ===== DESTRUTOR =====

  destroy() {
    console.log('ðŸŽ¤ Destruindo VoiceSystem...');

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

    console.log('âœ… VoiceSystem destruÃ­do');
  }
}

// ===== INSTÃ‚NCIA GLOBAL =====
let voiceSystem = null;

// ===== FUNÃ‡Ã•ES GLOBAIS =====
window.openVoiceModal = function(type = 'transaction') {
  console.log('ðŸŽ¤ openVoiceModal chamado:', type);

  if (!voiceSystem) {
    voiceSystem = new VoiceSystem();
  }

  return voiceSystem.start(type);
};

window.closeVoiceModal = function() {
  console.log('ðŸŽ¤ closeVoiceModal chamado');

  if (voiceSystem) {
    voiceSystem.stop();
  }
};

window.startVoiceRecognition = function(type = 'transaction') {
  console.log('ðŸŽ¤ startVoiceRecognition chamado:', type);

  if (!voiceSystem) {
    voiceSystem = new VoiceSystem();
  }

  return voiceSystem.start(type);
};

// ===== EXPORT =====
export { VoiceSystem };
