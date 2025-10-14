# Build Script para APK com Google Auth
# SHA-1 Fingerprint: C2:3C:10:3D:89:00:BC:B5:E9:A8:CA:99:ED:B9:5F:D5:A4:CD:88:EE

Write-Host "🔨 Iniciando build do APK com Google Auth..." -ForegroundColor Green

# 1. Build da aplicação web
Write-Host "📦 Building web app..." -ForegroundColor Yellow
npm run build

# 2. Sync com Android
Write-Host "🔄 Syncing with Android..." -ForegroundColor Yellow
npx cap sync android

# 3. Build do APK
Write-Host "📱 Building APK..." -ForegroundColor Yellow
npx cap build android

Write-Host "✅ Build concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Configurações importantes para o Firebase Console:" -ForegroundColor Cyan
Write-Host "   Package Name: com.financeiro.app" -ForegroundColor White
Write-Host "   SHA-1: C2:3C:10:3D:89:00:BC:B5:E9:A8:CA:99:ED:B9:5F:D5:A4:CD:88:EE" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Links importantes:" -ForegroundColor Cyan
Write-Host "   Firebase Console: https://console.firebase.google.com/project/controle-financeiro-b98ec" -ForegroundColor Blue
Write-Host "   Android Settings: https://console.firebase.google.com/project/controle-financeiro-b98ec/settings/general/android:com.financeiro.app" -ForegroundColor Blue
Write-Host ""