@echo off
REM Script para gerar APK do Controle Financeiro
REM Certifique-se de ter o Android SDK e Java instalados

echo 🏗️  Preparando build do APK...

REM 1. Fazer build da aplicação web
echo 📦 Fazendo build da aplicação web...
npm run build

REM 2. Sincronizar com Android
echo 🔄 Sincronizando arquivos com Android...
npx cap sync android

REM 3. Gerar APK
echo 📱 Gerando APK...
npx cap build android

REM 4. Localizar APK gerado
echo 🔍 Localizando APK gerado...
dir /s android\*.apk

echo ✅ Build concluído!
echo 📱 APK disponível em: android\app\build\outputs\apk\
pause