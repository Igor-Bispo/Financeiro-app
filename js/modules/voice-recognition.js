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
            // Parser simples para transações
            const amount = this.extractAmount(transcript);
            const description = this.extractDescription(transcript);
            const type = this.extractType(transcript);
            const category = this.extractCategory(transcript);
            
            if (!amount) {
                this.showFeedback('Não consegui entender o valor. Tente novamente.');
                return;
            }
            
            const transaction = {
                description: description || 'Transação por voz',
                amount: amount,
                type: type || 'expense',
                category: category || 'Geral',
                date: new Date()
            };
            
            // Adiciona a transação
            if (window.FinanceTransactions) {
                await window.FinanceTransactions.addTransaction(transaction);
                this.showFeedback(`Transação adicionada: ${description} - ${window.FinanceHelpers.formatCurrency(amount)}`);
                
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
        // Procura por padrões de valor monetário
        const patterns = [
            /(\d+)[.,](\d{2})/, // 100,50 ou 100.50
            /(\d+)\s*reais?/, // 100 reais
            /r\$\s*(\d+)/, // R$ 100
            /(\d+)\s*real/, // 100 real
        ];
        
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
        const categories = {
            'alimentação': ['comida', 'restaurante', 'supermercado', 'lanche'],
            'transporte': ['uber', 'ônibus', 'metrô', 'gasolina', 'combustível'],
            'lazer': ['cinema', 'teatro', 'show', 'bar', 'balada'],
            'saúde': ['médico', 'farmácia', 'consulta', 'exame'],
            'educação': ['curso', 'livro', 'escola', 'universidade'],
            'moradia': ['aluguel', 'condomínio', 'energia', 'água', 'internet']
        };
        
        const lowerText = text.toLowerCase();
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                return category;
            }
        }
        
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