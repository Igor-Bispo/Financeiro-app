# Script para monitorar logs do APK em tempo real
# Foca em logs de autenticação e erro

$adbPath = "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"

if (-not (Test-Path $adbPath)) {
    Write-Host "❌ adb.exe não encontrado!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Limpando logs anteriores..." -ForegroundColor Green
& $adbPath logcat -c

Write-Host ""
Write-Host "🚀 MONITORANDO LOGS DO APK EM TEMPO REAL" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 AGORA CLIQUE NO BOTÃO DE LOGIN NO APK!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Procurando por:" -ForegroundColor White
Write-Host "  🔐 [AUTH] - Logs de autenticação" -ForegroundColor Green
Write-Host "  🔍 [REDIRECT] - Logs de redirect" -ForegroundColor Blue
Write-Host "  ❌ Erros do Firebase/Google Auth" -ForegroundColor Red
Write-Host ""
Write-Host "Pressione Ctrl+C para parar" -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Filtrar logs relevantes
& $adbPath logcat | Select-String -Pattern "AUTH|REDIRECT|GoogleAuth|Firebase|chromium.*console|Capacitor|ERROR" -CaseSensitive:$false

