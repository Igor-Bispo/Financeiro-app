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
        
        this.showVoiceExamples(this.currentMode);
        let parsed = null;
        if (this.currentMode === 'transaction') {
            parsed = this.parseVoiceTransaction(transcript);
        } else if (this.currentMode === 'categoria') {
            parsed = this.parseVoiceCategory(transcript);
        }
        if (parsed) {
            this.showVoicePreview(parsed, this.currentMode);
            this.showConfirmButtons(parsed, this.currentMode);
        } else {
            this.showFeedback('Não consegui entender. Tente seguir o exemplo abaixo.');
            this.showVoiceExamples(this.currentMode);
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
            const categoria = this.extractCategoria(transcript);
            
            // Log detalhado do que foi reconhecido
            console.log('[VOICE][DEBUG] Reconhecido:', { amount, description, type, categoria, transcript });
            if (window.FinanceUI) {
                window.FinanceUI.addLog(`🔎 Valor: ${amount || 'não reconhecido'}, Descrição: ${description || 'não reconhecida'}, Tipo: ${type}, Categoria: ${categoria}`);
            }
            
            if (!amount) {
                this.showFeedback('Não consegui entender o valor. Tente frases como "gastei 50 reais no mercado" ou "recebi 100".');
                return;
            }
            
            const transaction = {
                description: description || 'Transação por voz',
                amount: amount,
                type: type || 'expense',
                categoria: categoria || 'Geral',
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

    processCategoriaCommand(transcript, isEdit) {
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

    extractCategoria(text) {
        // Parser robusto para categorias exatas do usuário, ignorando acentos e maiúsculas/minúsculas
        const categorias = [
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
        for (const categoria of categorias) {
            const catNorm = removerAcentos(categoria.toLowerCase());
            console.log(`[VOICE][DEBUG] Comparando categoria: '${catNorm}'`);
            if (lowerText.includes(catNorm)) {
                console.log(`[VOICE][DEBUG] Categoria reconhecida: '${categoria}'`);
                return categoria;
            }
        }
        console.log('[VOICE][DEBUG] Nenhuma categoria reconhecida. Retornando "Geral"');
        return 'Geral';
    }

    // Função robusta para transação: descricao valor tipo categoria
    parseVoiceTransaction(text) {
        text = text.toLowerCase()
            .replace(/ vírgula /g, ".")
            .replace(/,/g, ".")
            .replace(/ reais?/g, "")
            .replace(/ r\$/g, "")
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const match = text.match(/(.+?)\s+(\d+[.,]?\d*)\s+(receita|despesa)\s+(.+)/);
        if (match) {
            return {
                descricao: match[1].trim(),
                valor: parseFloat(match[2].replace(",", ".")),
                tipo: match[3],
                categoria: match[4].trim()
            };
        }
        return null;
    }

    // Função robusta para categoria: nome tipo limite
    parseVoiceCategory(text) {
        text = text.toLowerCase()
            .replace(/ vírgula /g, ".")
            .replace(/,/g, ".")
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const match = text.match(/categoria\s+(.+?)\s+(receita|despesa)\s+(\d+[.,]?\d*)/);
        if (match) {
            return {
                nome: match[1].trim(),
                tipo: match[2],
                limite: parseFloat(match[3].replace(",", "."))
            };
        }
        return null;
    }

    // Feedback visual aprimorado
    showVoicePreview(data, mode) {
        let html = '';
        if (mode === 'transaction' && data) {
            html = `<div style="padding:12px 0;text-align:left;">
                <b>Descrição:</b> ${data.descricao}<br>
                <b>Valor:</b> R$ ${data.valor}<br>
                <b>Tipo:</b> ${data.tipo}<br>
                <b>Categoria:</b> ${data.categoria}
            </div>`;
        } else if (mode === 'categoria' && data) {
            html = `<div style="padding:12px 0;text-align:left;">
                <b>Nome:</b> ${data.nome}<br>
                <b>Tipo:</b> ${data.tipo}<br>
                <b>Limite:</b> R$ ${data.limite}
            </div>`;
        }
        const modal = document.getElementById('voice-modal');
        if (modal) {
            let preview = document.getElementById('voice-preview');
            if (!preview) {
                preview = document.createElement('div');
                preview.id = 'voice-preview';
                modal.appendChild(preview);
            }
            preview.innerHTML = html;
        }
    }

    // Exemplo de comandos na interface
    showVoiceExamples(mode) {
        const modal = document.getElementById('voice-modal');
        if (modal) {
            let ex = document.getElementById('voice-examples');
            if (!ex) {
                ex = document.createElement('div');
                ex.id = 'voice-examples';
                ex.style = 'font-size:13px;color:#666;margin-top:8px;';
                modal.appendChild(ex);
            }
            if (mode === 'transaction') {
                ex.innerHTML = `<b>Exemplo:</b> mercado 120 despesa alimentação`;
            } else if (mode === 'categoria') {
                ex.innerHTML = `<b>Exemplo:</b> categoria lazer despesa 300`;
            }
        }
    }

    showConfirmButtons(data, mode) {
        const modal = document.getElementById('voice-modal');
        if (!modal) return;
        let btns = document.getElementById('voice-confirm-btns');
        if (!btns) {
            btns = document.createElement('div');
            btns.id = 'voice-confirm-btns';
            btns.style = 'margin-top:10px;display:flex;gap:10px;justify-content:center;';
            modal.appendChild(btns);
        }
        btns.innerHTML = `<button id='btn-voice-confirm' style='padding:7px 18px;background:#06b6d4;color:#fff;border:none;border-radius:6px;font-weight:600;'>Confirmar</button>
            <button id='btn-voice-edit' style='padding:7px 18px;background:#f3f4f6;color:#222;border:none;border-radius:6px;font-weight:600;'>Editar</button>`;
        document.getElementById('btn-voice-confirm').onclick = () => {
            if (mode === 'transaction') {
                // Chame a função de adicionar transação com os dados
                if (window.FinanceTransactions) {
                    window.FinanceTransactions.addTransaction({
                        description: data.descricao,
                        amount: data.valor,
                        type: data.tipo,
                        categoria: data.categoria,
                        date: new Date()
                    });
                }
            } else if (mode === 'categoria') {
                // Chame a função de adicionar categoria com os dados
                if (window.FinanceCategories) {
                    window.FinanceCategories.addCategory({
                        nome: data.nome,
                        tipo: data.tipo,
                        limite: data.limite,
                        date: new Date()
                    });
                }
            }
            modal.style.display = 'none';
        };
        document.getElementById('btn-voice-edit').onclick = () => {
            // Permitir edição manual (pode abrir um modal de edição ou preencher o formulário)
            modal.style.display = 'none';
            // Aqui você pode chamar a função para abrir o formulário já preenchido
        };
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