/**
 * Módulo de Gráficos
 * Gerencia criação e atualização de gráficos com Chart.js
 */

class ChartsModule {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        console.log('📊 Inicializando módulo de gráficos...');
        this.loadChartJS();
    }

    loadChartJS() {
        // Verificar se Chart.js já está carregado
        if (typeof Chart === 'undefined') {
            console.warn('⚠️ Chart.js não encontrado. Carregando...');
            this.loadChartJSScript();
        } else {
            console.log('✅ Chart.js já carregado');
            this.setupCharts();
        }
    }

    loadChartJSScript() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            console.log('✅ Chart.js carregado com sucesso');
            this.setupCharts();
        };
        script.onerror = () => {
            console.error('❌ Erro ao carregar Chart.js');
        };
        document.head.appendChild(script);
    }

    setupCharts() {
        // Aguardar um pouco para garantir que os canvas estejam prontos
        setTimeout(() => {
            this.createIncomeExpenseChart();
            this.createCategoryChart();
        }, 100);
    }

    createIncomeExpenseChart() {
        const canvas = document.getElementById('incomeExpenseChart');
        if (!canvas) {
            console.warn('⚠️ Canvas incomeExpenseChart não encontrado');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.incomeExpense = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Receitas', 'Despesas'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [
                        '#10b981', // Verde para receitas
                        '#ef4444'  // Vermelho para despesas
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: R$ ${value.toFixed(2)}`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });

        console.log('✅ Gráfico de receitas vs despesas criado');
    }

    createCategoryChart() {
        const canvas = document.getElementById('categoryChart');
        if (!canvas) {
            console.warn('⚠️ Canvas categoryChart não encontrado');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.category = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Valor por Categoria',
                    data: [],
                    backgroundColor: [
                        '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
                        '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
                    ],
                    borderWidth: 1,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                return `R$ ${value.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toFixed(0);
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });

        console.log('✅ Gráfico de categorias criado');
    }

    updateIncomeExpenseChart(income = 0, expense = 0) {
        if (this.charts.incomeExpense) {
            this.charts.incomeExpense.data.datasets[0].data = [income, expense];
            this.charts.incomeExpense.update('active');
            console.log('📊 Gráfico de receitas vs despesas atualizado');
        }
    }

    updateCategoryChart(categories = []) {
        if (this.charts.category) {
            const labels = categories.map(cat => cat.name);
            const data = categories.map(cat => cat.total || 0);
            
            this.charts.category.data.labels = labels;
            this.charts.category.data.datasets[0].data = data;
            this.charts.category.update('active');
            console.log('📊 Gráfico de categorias atualizado');
        }
    }

    updateAllCharts(data = {}) {
        // Atualizar gráfico de receitas vs despesas
        const income = data.totalIncome || 0;
        const expense = data.totalExpense || 0;
        this.updateIncomeExpenseChart(income, expense);

        // Atualizar gráfico de categorias
        const categories = data.categories || [];
        this.updateCategoryChart(categories);
    }

    // Método estático para compatibilidade
    static init() {
        if (!window.chartsModule) {
            window.chartsModule = new ChartsModule();
        }
        return window.chartsModule;
    }

    static updateCharts(data) {
        if (window.chartsModule) {
            window.chartsModule.updateAllCharts(data);
        }
    }
}

// Criar instância global
window.ChartsModule = ChartsModule;
window.chartsModule = new ChartsModule();

console.log('✅ Módulo de gráficos carregado'); 