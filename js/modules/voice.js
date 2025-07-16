/**
 * Módulo de Reconhecimento de Voz
 * Gerencia reconhecimento de voz para entrada de dados
 */

class VoiceRecognition {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.isSupported = false;
        this.init();
    }

    init() {
        console.log('🎙️ Inicializando módulo de reconhecimento de voz...');
        this.checkSupport();
        this.bindEvents();
    }

    checkSupport() {
        // Verificar se o navegador suporta reconhecimento de voz
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.isSupported = true;
            this.setupRecognition();
            console.log('✅ Reconhecimento de voz suportado');
        } else {
            this.isSupported = false;
            console.warn('⚠️ Reconhecimento de voz não suportado neste navegador');
        }
    }

    setupRecognition() {
        if (!this.recognition) return;

        // Configurar reconhecimento de voz
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'pt-BR';
        this.recognition.maxAlternatives = 1;

        // Event listeners
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI();
            console.log('🎤 Iniciando reconhecimento de voz...');
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('🎤 Texto reconhecido:', transcript);
            this.processTranscript(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error('❌ Erro no reconhecimento de voz:', event.error);
            this.isListening = false;
            this.updateUI();
            
            if (window.NotificationManager) {
                window.NotificationManager.showNotification({
                    type: 'error',
                    title: 'Erro no reconhecimento',
                    message: 'Não foi possível reconhecer sua voz. Tente novamente.',
                    duration: 3000
                });
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI();
            console.log('🎤 Reconhecimento de voz finalizado');
        };
    }

    bindEvents() {
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceRecognition());
        }

        // Atalho de teclado Ctrl+V
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'v' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.toggleVoiceRecognition();
            }
        });
    }

    toggleVoiceRecognition() {
        if (!this.isSupported) {
            if (window.NotificationManager) {
                window.NotificationManager.showNotification({
                    type: 'warning',
                    title: 'Recurso não suportado',
                    message: 'Reconhecimento de voz não está disponível neste navegador.',
                    duration: 3000
                });
            }
            return;
        }

        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('❌ Erro ao iniciar reconhecimento:', error);
            }
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            try {
                this.recognition.stop();
            } catch (error) {
                console.error('❌ Erro ao parar reconhecimento:', error);
            }
        }
    }

    updateUI() {
        const voiceBtn = document.getElementById('voiceBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        const voiceIndicator = document.getElementById('voiceIndicator');
        const voiceText = document.getElementById('voiceText');

        if (voiceBtn) {
            voiceBtn.textContent = this.isListening ? '🔴' : '🎙️';
            voiceBtn.title = this.isListening ? 'Parar reconhecimento de voz' : 'Reconhecimento de voz (Ctrl+V)';
        }

        if (voiceStatus) {
            if (this.isListening) {
                voiceStatus.classList.remove('hidden');
            } else {
                voiceStatus.classList.add('hidden');
            }
        }

        if (voiceIndicator) {
            if (this.isListening) {
                voiceIndicator.classList.add('listening');
            } else {
                voiceIndicator.classList.remove('listening');
            }
        }

        if (voiceText) {
            voiceText.textContent = this.isListening ? 'Ouvindo...' : 'Clique para falar';
        }
    }

    processTranscript(transcript) {
        const lowerTranscript = transcript.toLowerCase();
        
        // Notificar sobre o texto reconhecido
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'info',
                title: 'Voz reconhecida',
                message: `"${transcript}"`,
                duration: 2000
            });
        }

        // Processar comandos de voz
        this.processVoiceCommands(lowerTranscript);
        
        // Preencher campos de formulário se algum modal estiver aberto
        this.fillFormFields(transcript);
    }

    processVoiceCommands(transcript) {
        // Comandos para abrir modais
        if (transcript.includes('nova transação') || transcript.includes('adicionar transação')) {
            showTransactionModal();
        } else if (transcript.includes('nova categoria') || transcript.includes('adicionar categoria')) {
            showCategoryModal();
        } else if (transcript.includes('nova meta') || transcript.includes('adicionar meta')) {
            showGoalModal();
        } else if (transcript.includes('novo orçamento') || transcript.includes('adicionar orçamento')) {
            showBudgetModal();
        }
        // Comandos para navegação
        else if (transcript.includes('dashboard') || transcript.includes('início')) {
            if (window.mobileNav) {
                window.mobileNav.showTab('dashboard');
            }
        } else if (transcript.includes('transações')) {
            if (window.mobileNav) {
                window.mobileNav.showTab('transactions');
            }
        } else if (transcript.includes('categorias')) {
            if (window.mobileNav) {
                window.mobileNav.showTab('goals');
            }
        } else if (transcript.includes('orçamentos')) {
            if (window.mobileNav) {
                window.mobileNav.showTab('budgets');
            }
        }
    }

    fillFormFields(transcript) {
        // Verificar se algum modal está aberto
        const transactionModal = document.getElementById('transactionModal');
        const categoryModal = document.getElementById('categoryModal');
        const goalModal = document.getElementById('goalModal');
        const budgetModal = document.getElementById('budgetModal');

        if (transactionModal && transactionModal.classList.contains('show')) {
            this.fillTransactionForm(transcript);
        } else if (categoryModal && categoryModal.classList.contains('show')) {
            this.fillCategoryForm(transcript);
        } else if (goalModal && goalModal.classList.contains('show')) {
            this.fillGoalForm(transcript);
        } else if (budgetModal && budgetModal.classList.contains('show')) {
            this.fillBudgetForm(transcript);
        }
    }

    fillTransactionForm(transcript) {
        // Extrair valor monetário
        const valueMatch = transcript.match(/(\d+[.,]?\d*)\s*(reais?|r\$)/i);
        if (valueMatch) {
            const value = valueMatch[1].replace(',', '.');
            const amountField = document.getElementById('transactionAmount');
            if (amountField) {
                amountField.value = value;
            }
        }

        // Extrair título/descrição
        const titleMatch = transcript.match(/(?:para|sobre|referente a)\s+(.+?)(?:\s+\d|$)/i);
        if (titleMatch) {
            const title = titleMatch[1].trim();
            const titleField = document.getElementById('transactionTitle');
            if (titleField) {
                titleField.value = title;
            }
        }

        // Detectar tipo (receita/despesa)
        if (transcript.includes('receita') || transcript.includes('ganho') || transcript.includes('entrada')) {
            const typeField = document.getElementById('transactionType');
            if (typeField) {
                typeField.value = 'income';
            }
        } else if (transcript.includes('despesa') || transcript.includes('gasto') || transcript.includes('saída')) {
            const typeField = document.getElementById('transactionType');
            if (typeField) {
                typeField.value = 'expense';
            }
        }
    }

    fillCategoryForm(transcript) {
        // Extrair nome da categoria
        const nameMatch = transcript.match(/(?:categoria|nome)\s+(.+?)(?:\s+com|$)/i);
        if (nameMatch) {
            const name = nameMatch[1].trim();
            const nameField = document.getElementById('categoryName');
            if (nameField) {
                nameField.value = name;
            }
        }

        // Detectar tipo
        if (transcript.includes('receita') || transcript.includes('ganho')) {
            const typeField = document.getElementById('categoryType');
            if (typeField) {
                typeField.value = 'income';
            }
        } else if (transcript.includes('despesa') || transcript.includes('gasto')) {
            const typeField = document.getElementById('categoryType');
            if (typeField) {
                typeField.value = 'expense';
            }
        }
    }

    fillGoalForm(transcript) {
        // Extrair valor da meta
        const valueMatch = transcript.match(/(\d+[.,]?\d*)\s*(reais?|r\$)/i);
        if (valueMatch) {
            const value = valueMatch[1].replace(',', '.');
            const targetField = document.getElementById('goalTarget');
            if (targetField) {
                targetField.value = value;
            }
        }

        // Extrair título da meta
        const titleMatch = transcript.match(/(?:meta|objetivo)\s+(.+?)(?:\s+\d|$)/i);
        if (titleMatch) {
            const title = titleMatch[1].trim();
            const titleField = document.getElementById('goalTitle');
            if (titleField) {
                titleField.value = title;
            }
        }
    }

    fillBudgetForm(transcript) {
        // Extrair valor do orçamento
        const valueMatch = transcript.match(/(\d+[.,]?\d*)\s*(reais?|r\$)/i);
        if (valueMatch) {
            const value = valueMatch[1].replace(',', '.');
            const amountField = document.getElementById('budgetAmount');
            if (amountField) {
                amountField.value = value;
            }
        }

        // Extrair título do orçamento
        const titleMatch = transcript.match(/(?:orçamento|título)\s+(.+?)(?:\s+\d|$)/i);
        if (titleMatch) {
            const title = titleMatch[1].trim();
            const titleField = document.getElementById('budgetTitle');
            if (titleField) {
                titleField.value = title;
            }
        }
    }

    // Método estático para compatibilidade
    static init() {
        if (!window.voiceRecognition) {
            window.voiceRecognition = new VoiceRecognition();
        }
        return window.voiceRecognition;
    }

    static toggleVoiceRecognition() {
        if (window.voiceRecognition) {
            window.voiceRecognition.toggleVoiceRecognition();
        }
    }
}

// Criar instância global
window.VoiceRecognition = VoiceRecognition;
window.voiceRecognition = new VoiceRecognition();

// Função global para compatibilidade
window.toggleVoiceRecognition = () => {
    if (window.voiceRecognition) {
        window.voiceRecognition.toggleVoiceRecognition();
    }
};

console.log('✅ Módulo de reconhecimento de voz carregado'); 