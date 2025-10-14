Write-Host "🚀 Iniciando build do APK v1.0.40..." -ForegroundColor Green

Set-Location "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app\android"

Write-Host "📱 Gerando APK de release..." -ForegroundColor Yellow
cmd /c "gradlew.bat assembleRelease"

Write-Host "✅ Processo concluído!" -ForegroundColor Green
Set-Location "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app"