// export.js - centraliza funções de exportação de dados

export function showExportModal() {
  const exportContent = `
    <div class="export-modal">
      <h3>📤 Exportar Dados</h3>
      <p>Escolha o formato de exportação:</p>
      <div class="export-options">
        <button onclick="exportToJSON()" class="export-option">
          <span class="export-icon">📄</span>
          <span class="export-text">JSON (Backup Completo)</span>
        </button>
        <button onclick="exportToExcel()" class="export-option">
          <span class="export-icon">📊</span>
          <span class="export-text">Excel (Planilha)</span>
        </button>
        <button onclick="exportToPDF()" class="export-option">
          <span class="export-icon">📋</span>
          <span class="export-text">PDF (Relatório)</span>
        </button>
      </div>
      <button onclick="closeModal()" class="close-button">Fechar</button>
    </div>
  `;
  if (window.showModal) {
    window.showModal(exportContent);
  } else {
    alert('Funcionalidade de exportação em desenvolvimento. Use a função global showExportOptions.');
  }
}

export function exportData() {
  console.log('📤 Iniciando exportação de dados...');
  if (window.showExportOptions) {
    console.log('🔧 Usando função global de exportação');
    window.showExportOptions();
    return;
  }
  showExportModal();
}
