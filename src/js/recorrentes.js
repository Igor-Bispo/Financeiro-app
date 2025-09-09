// Shim de compatibilidade: reexporta as funÃ§Ãµes do novo service
export {
  calcularParcelaRecorrente,
  calcularStatusRecorrente,
  getRecorrentesDoOrcamento as getDespesasRecorrentes,
  addRecorrente as addDespesaRecorrente,
  updateRecorrente as updateDespesaRecorrente,
  deleteRecorrente as deleteDespesaRecorrente,
  aplicarRecorrentesDoMes,
  limparLogsAntigos,
} from '@features/recorrentes/service.js';
