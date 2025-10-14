# Script para gerar APK atualizado
Write-Host "🚀 Iniciando build do APK v1.0.40..." -ForegroundColor Green

# Navegar para pasta android
Set-Location "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app\android"

# Verificar se está na pasta correta
if (Test-Path "gradlew.bat") {
    Write-Host "✅ Encontrado gradlew.bat" -ForegroundColor Green
    
    # Executar build
    Write-Host "📱 Gerando APK de release..." -ForegroundColor Yellow
    cmd /c "gradlew.bat assembleRelease"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ APK gerado com sucesso!" -ForegroundColor Green
        Write-Host "📍 Localização: app\build\outputs\apk\release\" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Erro ao gerar APK" -ForegroundColor Red
    }
} else {
    Write-Host "❌ gradlew.bat não encontrado!" -ForegroundColor Red
}

# Voltar para pasta raiz
Set-Location "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app"