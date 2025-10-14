# Script para monitorar logs do APK em tempo real
# Filtra apenas logs relevantes do app

Write-Host "🔍 MONITOR DE LOGS DO APK" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar se ADB está disponível
try {
    $adbVersion = adb version 2>&1
    Write-Host "✅ ADB encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ ADB não encontrado. Instale o Android SDK Platform Tools" -ForegroundColor Red
    exit 1
}

# Verificar dispositivos conectados
Write-Host "📱 Verificando dispositivos conectados..." -ForegroundColor Yellow
$devices = adb devices | Select-String -Pattern "device$"

if ($devices.Count -eq 0) {
    Write-Host "❌ Nenhum dispositivo conectado" -ForegroundColor Red
    Write-Host "   1. Conecte o celular via USB" -ForegroundColor White
    Write-Host "   2. Ative a Depuração USB" -ForegroundColor White
    Write-Host "   3. Execute novamente" -ForegroundColor White
    exit 1
}

Write-Host "✅ Dispositivo conectado!" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 INICIANDO MONITORAMENTO DE LOGS" -ForegroundColor Blue
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔍 Filtrando logs de:" -ForegroundColor Yellow
Write-Host "   • [APK-Handler]" -ForegroundColor White
Write-Host "   • [AuthService]" -ForegroundColor White
Write-Host "   • [Bootstrap]" -ForegroundColor White
Write-Host "   • chromium (Google Auth)" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para parar" -ForegroundColor Gray
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Limpar logs antigos
adb logcat -c

# Monitorar logs em tempo real com filtros
adb logcat | Select-String -Pattern "APK-Handler|AuthService|Bootstrap|chromium|firebase|Google" | ForEach-Object {
    $line = $_.Line
    
    # Colorir diferentes tipos de logs
    if ($line -match "❌|ERROR|ERRO") {
        Write-Host $line -ForegroundColor Red
    } elseif ($line -match "⚠️|WARN|WARNING") {
        Write-Host $line -ForegroundColor Yellow
    } elseif ($line -match "✅|SUCCESS") {
        Write-Host $line -ForegroundColor Green
    } elseif ($line -match "🔍|DEBUG") {
        Write-Host $line -ForegroundColor Cyan
    } elseif ($line -match "APK-Handler") {
        Write-Host $line -ForegroundColor Magenta
    } else {
        Write-Host $line -ForegroundColor White
    }
}

