# monitor-logs.ps1
# Script para monitorar logs do Android em tempo real com filtros específicos

# Caminho para o adb.exe
$adbPath = "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"

# Verificar se o adb.exe existe
if (-not (Test-Path $adbPath)) {
    Write-Host "Erro: adb.exe não encontrado em $adbPath" -ForegroundColor Red
    Write-Host "Por favor, verifique se o Android SDK está instalado e configurado corretamente." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ adb.exe encontrado em $adbPath" -ForegroundColor Green

# Limpar logs anteriores
Write-Host "🔄 Limpando logs anteriores..." -ForegroundColor Cyan
& $adbPath logcat -c

# Iniciar monitoramento com filtros
Write-Host "🚀 Iniciando monitoramento de logs em tempo real..." -ForegroundColor Green
Write-Host "Pressione Ctrl+C para parar." -ForegroundColor Yellow
Write-Host ""
Write-Host "AGORA CLIQUE NO BOTÃO DE LOGIN NO APK!" -ForegroundColor Yellow
Write-Host ""

# Executar logcat filtrando especificamente para console.log e chromium
& $adbPath logcat chromium:V console:V *:S
