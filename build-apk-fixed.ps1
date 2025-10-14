# Script para build APK com JAVA_HOME corrigido
Write-Host "🔧 Configurando JAVA_HOME..." -ForegroundColor Green
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot"

Write-Host "📍 JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Cyan
Write-Host "☕ Testando Java..." -ForegroundColor Yellow
& "$env:JAVA_HOME\bin\java.exe" -version

Write-Host "📱 Navegando para pasta android..." -ForegroundColor Yellow
Set-Location "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app\android"

Write-Host "🚀 Iniciando build do APK..." -ForegroundColor Green
& ".\gradlew.bat" assembleRelease

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ APK gerado com sucesso!" -ForegroundColor Green
    Write-Host "📍 Localização: app\build\outputs\apk\release\" -ForegroundColor Cyan
} else {
    Write-Host "❌ Erro no build" -ForegroundColor Red
}

Write-Host "🔄 Voltando para pasta raiz..." -ForegroundColor Yellow
Set-Location "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app"