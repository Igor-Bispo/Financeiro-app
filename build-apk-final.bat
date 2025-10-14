@echo off
echo 🚀 Iniciando build do APK v1.0.40...

cd /d "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app\android"

echo 📱 Gerando APK de release...
gradlew.bat assembleRelease

echo ✅ Processo finalizado!
cd /d "C:\MeuProjetoOrcamento\Financeiro-app\Financeiro-app"
pause