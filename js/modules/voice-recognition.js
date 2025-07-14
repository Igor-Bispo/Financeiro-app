// Módulo de reconhecimento de voz usando namespace global
class VoiceRecognition {
    constructor() {
        this.recognition = null;
        this.currentMode = null;
        this.isListening = false;
        this.isEditMode = false;
        this.init();
    }

    init() {
        if (!this.checkSupport()) return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'pt-BR';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.setupEvents();
    }

    checkSupport() {
        const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        if (!isSupported) {
            console.warn("Reconhecimento de voz não suportado");
            if (window.FinanceUI) {
                window.FinanceUI.addLog('Reconhecimento de voz não suportado neste navegador', 'error');
            }
        }
        return isSupported;
    }

    setupEvents() {
        this.recognition.onresult = this.handleResult.bind(this);
        this.recognition.onerror = this.handleError.bind(this);
        this.recognition.onend = this.handleEnd.bind(this);
    }

    startListening(mode, isEdit = false) {
        if (this.isListening) return;
        this.currentMode = mode;
        this.isEditMode = isEdit;
        this.isListening = true;
        try {
            this.recognition.start();
            this.showFeedback(`Diga o comando para ${mode}...`);
        } catch (error) {
            console.error("Erro ao iniciar reconhecimento:", error);
            this.isListening = false;
            if (window.FinanceUI) {
                window.FinanceUI.addLog('Erro ao iniciar reconhecimento de voz: ' + error.message, 'error');
            }
        }
    }

    handleResult(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("[VOICE] Comando:", transcript);
        
        if (window.FinanceUI) {
            window.FinanceUI.addLog(`🎤 Comando de voz: "${transcript}"`);
        }
        
        switch(this.currentMode) {
            case 'transaction':
                this.processTransactionCommand(transcript);
                break;
            case 'category':
                this.processCategoryCommand(transcript, this.isEditMode);
                break;
            default:
                console.warn("Modo de comando não reconhecido");
                if (window.FinanceUI) {
                    window.FinanceUI.addLog('Modo de comando não reconhecido', 'error');
                }
        }
    }

    handleError(event) {
        console.error("Erro no reconhecimento de voz:", event.error);
        this.isListening = false;
        
        if (window.FinanceUI) {
            window.FinanceUI.addLog('Erro no reconhecimento de voz: ' + event.error, 'error');
            window.FinanceUI.updateVoiceStatus('❌ Erro no reconhecimento de voz');
        }
    }

    handleEnd() {
        this.isListening = false;
        if (window.FinanceUI) {
            window.FinanceUI.updateVoiceStatus('Clique para ativar o microfone');
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            try {
                this.recognition.stop();
            } catch (error) {
                console.log('Reconhecimento já parado');
            }
        }
        this.isListening = false;
    }

    showFeedback(msg) {
        console.log("[VOICE FEEDBACK]", msg);
        if (window.FinanceUI) {
            window.FinanceUI.addLog(msg);
            window.FinanceUI.updateVoiceStatus(msg);
        }
    }

    async processTransactionCommand(transcript) {
        try {
            // Parser melhorado para transações
            const amount = this.extractAmount(transcript);
            const description = this.extractDescription(transcript);
            const type = this.extractType(transcript);
            const category = this.extractCategory(transcript);
            
            // Log detalhado do que foi reconhecido
            console.log('[VOICE][DEBUG] Reconhecido:', { amount, description, type, category, transcript });
            if (window.FinanceUI) {
                window.FinanceUI.addLog(`🔎 Valor: ${amount || 'não reconhecido'}, Descrição: ${description || 'não reconhecida'}, Tipo: ${type}, Categoria: ${category}`);
            }
            
            if (!amount) {
                this.showFeedback('Não consegui entender o valor. Tente frases como "gastei 50 reais no mercado" ou "recebi 100".');
                return;
            }
            
            const transaction = {
                description: description || 'Transação por voz',
                amount: amount,
                type: type || 'expense',
                category: category || 'Geral',
                date: new Date()
            };
            
            // Log do objeto transação
            console.log('[VOICE][DEBUG] Transação montada:', transaction);
            
            // Adiciona a transação
            if (window.FinanceTransactions) {
                await window.FinanceTransactions.addTransaction(transaction);
                this.showFeedback(`Transação adicionada: ${transaction.description} - ${window.FinanceHelpers ? window.FinanceHelpers.formatCurrency(amount) : amount}`);
                
                // Atualiza a lista de transações
                const transactions = await window.FinanceTransactions.getTransactions();
                if (window.FinanceUI && window.FinanceUI.updateTransactionsList) {
                    window.FinanceUI.updateTransactionsList(transactions);
                }
            } else {
                this.showFeedback('Erro: Módulo de transações não disponível');
            }
            
        } catch (error) {
            console.error('Erro ao processar comando de transação:', error);
            this.showFeedback('Erro ao processar comando: ' + error.message);
        }
    }

    processCategoryCommand(transcript, isEdit) {
        // Implementar parser de categoria
        console.log("[VOICE] Categoria:", transcript, isEdit);
        this.showFeedback('Funcionalidade de categoria por voz em desenvolvimento');
    }

    // Funções auxiliares para parsing
    extractAmount(text) {
        // Parser melhorado para valores: aceita números por extenso e variações comuns
        const patterns = [
            /(\d+)[.,](\d{2})/, // 100,50 ou 100.50
            /(\d+)\s*reais?/, // 100 reais
            /r\$\s*(\d+)/, // R$ 100
            /(\d+)\s*real/, // 100 real
        ];
        // Números por extenso (básico)
        const extenso = {
            'um': 1, 'dois': 2, 'três': 3, 'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9, 'dez': 10,
            'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14, 'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19, 'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100, 'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500, 'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900, 'mil': 1000
        };
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                if (match[2]) {
                    // Formato com centavos
                    return parseFloat(match[1] + '.' + match[2]);
                } else {
                    // Formato inteiro
                    return parseFloat(match[1]);
                }
            }
        }
        // Busca por número por extenso
        let soma = 0;
        let encontrou = false;
        const palavras = text.toLowerCase().split(/\s+/);
        for (const palavra of palavras) {
            if (extenso[palavra] !== undefined) {
                soma += extenso[palavra];
                encontrou = true;
            }
        }
        if (encontrou && soma > 0) return soma;
        return null;
    }

    extractDescription(text) {
        // Remove palavras relacionadas a valores e tipos
        const valueWords = ['reais', 'real', 'r$', 'dólares', 'dólar', 'euros', 'euro'];
        const typeWords = ['gasto', 'despesa', 'receita', 'entrada', 'saída'];
        
        let description = text;
        
        // Remove padrões de valor
        description = description.replace(/(\d+)[.,](\d{2})/g, '');
        description = description.replace(/(\d+)\s*reais?/g, '');
        description = description.replace(/r\$\s*(\d+)/g, '');
        
        // Remove palavras específicas
        [...valueWords, ...typeWords].forEach(word => {
            description = description.replace(new RegExp(word, 'gi'), '');
        });
        
        // Limpa espaços extras
        description = description.replace(/\s+/g, ' ').trim();
        
        return description || null;
    }

    extractType(text) {
        const expenseWords = ['gasto', 'despesa', 'paguei', 'comprei', 'saída'];
        const incomeWords = ['receita', 'entrada', 'recebi', 'ganhei', 'salário'];
        
        const lowerText = text.toLowerCase();
        
        if (expenseWords.some(word => lowerText.includes(word))) {
            return 'expense';
        }
        
        if (incomeWords.some(word => lowerText.includes(word))) {
            return 'income';
        }
        
        return 'expense'; // Padrão
    }

    extractCategory(text) {
        // Parser robusto para categorias exatas do usuário, ignorando acentos e maiúsculas/minúsculas
        const categories = [
            'MERCADO',
            'RECARGA',
            'LUZ',
            'AGUA',
            'REMEDIOS',
            'PADARIA',
            'FDS',
            'CABELO IGOR',
            'CAMILA',
            'INTERNET',
            'SEGURO CARRO',
            'GABRIELA FRALDA',
            'DIZMO',
            'ACADEMIA',
            'GASOLINA',
            'ESCOLA GABI',
            'NETFLIX',
            'YOUTUBE',
            'TAG CARRO',
            'GOOGLE CAMILA',
            'ALMOÇO CAMILA/LANCHE',
            'TRANSPORTE GABI',
            'DIZMO CAMILA',
            'GABI MICELANEAS',
            'MEI CAMILA'
        ];
        // Função para remover acentos
        function removerAcentos(str) {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
        const lowerText = removerAcentos(text.toLowerCase());
        console.log('[VOICE][DEBUG] Texto reconhecido (sem acento):', lowerText);
        for (const category of categories) {
            const catNorm = removerAcentos(category.toLowerCase());
            console.log(`[VOICE][DEBUG] Comparando categoria: '${catNorm}'`);
            if (lowerText.includes(catNorm)) {
                console.log(`[VOICE][DEBUG] Categoria reconhecida: '${category}'`);
                return category;
            }
        }
        console.log('[VOICE][DEBUG] Nenhuma categoria reconhecida. Retornando "Geral"');
        return 'Geral';
    }
}

function initVoiceRecognition() {
    return new VoiceRecognition();
}

// Disponibiliza globalmente
window.FinanceVoice = {
    initVoiceRecognition,
    VoiceRecognition,
    startListening: function(mode, isEdit = false) {
        if (this.voiceInstance) {
            this.voiceInstance.startListening(mode, isEdit);
        } else {
            this.voiceInstance = new VoiceRecognition();
            this.voiceInstance.startListening(mode, isEdit);
        }
    },
    stopListening: function() {
        if (this.voiceInstance) {
            this.voiceInstance.stopListening();
        }
    }
};

// Inicializa automaticamente
window.FinanceVoice.voiceInstance = new VoiceRecognition();

console.log('Módulo de reconhecimento de voz carregado'); 