#!/bin/bash

# Script para gerar APK do Controle Financeiro
# Certifique-se de ter o Android SDK e Java instalados

echo "🏗️  Preparando build do APK..."

# 1. Fazer build da aplicação web
echo "📦 Fazendo build da aplicação web..."
npm run build

# 2. Sincronizar com Android
echo "🔄 Sincronizando arquivos com Android..."
npx cap sync android

# 3. Gerar APK
echo "📱 Gerando APK..."
npx cap build android

# 4. Localizar APK gerado
echo "🔍 Localizando APK gerado..."
find ./android -name "*.apk" -type f

echo "✅ Build concluído!"
echo "📱 APK disponível em: ./android/app/build/outputs/apk/"