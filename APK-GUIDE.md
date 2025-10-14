# 📱 Guia para Gerar APK do Controle Financeiro

Este guia explica como gerar um arquivo APK (Android Package) do nosso aplicativo web Controle Financeiro.

## 🔧 Pré-requisitos

### 1. **Android Studio** (Recomendado)
- Baixe e instale o [Android Studio](https://developer.android.com/studio)
- Durante a instalação, certifique-se de incluir:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device

### 2. **Java JDK** (já instalado)
- ✅ Java 21 já está instalado no sistema
- ✅ JAVA_HOME configurado: `C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot`

### 3. **Node.js** (já instalado)
- ✅ Node.js já está instalado
- ✅ Capacitor já foi configurado no projeto

## 🚀 Como Gerar o APK

### Método 1: Script Automático (Windows)

1. **Execute o script de build:**
   ```bash
   ./build-apk.bat
   ```

### Método 2: Comandos Manuais

1. **Build da aplicação web:**
   ```bash
   npm run build
   ```

2. **Sincronizar com Android:**
   ```bash
   npx cap sync android
   ```

3. **Abrir no Android Studio:**
   ```bash
   npx cap open android
   ```

4. **No Android Studio:**
   - Vá em **Build** → **Generate Signed Bundle/APK**
   - Escolha **APK**
   - Selecione **debug** para teste ou **release** para produção
   - Clique em **Finish**

### Método 3: NPM Scripts

```bash
# Build completo com sincronização
npm run android:build

# Apenas sincronizar arquivos
npm run android:sync  

# Abrir Android Studio
npm run android:open
```

## 📁 Localização do APK

Após o build, o APK será gerado em:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔐 Configurações do Aplicativo

### Informações do App
- **Nome:** Controle Financeiro
- **Package ID:** com.financeiro.app
- **Versão:** 1.0.0

### Permissões Incluídas
- ✅ Internet (para Firebase)
- ✅ Acesso à rede
- ✅ Armazenamento (para cache)
- ✅ Biometria (para autenticação)
- ✅ Wake Lock (para notificações)

## 🛠️ Solução de Problemas

### Erro: SDK location not found
1. Instale o Android Studio
2. Configure ANDROID_HOME:
   ```bash
   set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   ```

### Erro: JAVA_HOME inválido
1. Verifique a instalação do Java:
   ```bash
   java -version
   ```
2. Configure JAVA_HOME (já feito):
   ```bash
   set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot
   ```

### Build muito lento
1. Primeira vez sempre é mais lenta (download de dependências)
2. Builds subsequentes são mais rápidos
3. Use `./gradlew build --parallel` para builds paralelos

## 📋 Checklist de Deploy

- [x] Capacitor instalado e configurado
- [x] Projeto Android criado
- [x] Permissões configuradas
- [x] Ícones copiados
- [x] Build scripts criados
- [ ] Android SDK instalado
- [ ] APK gerado com sucesso

## 📱 Testando o APK

1. **Instalar no dispositivo Android:**
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

2. **Ou copiar o arquivo APK para o dispositivo e instalar manualmente**

## 🔄 Atualizações Futuras

Para gerar uma nova versão do APK após mudanças no código:

1. **Fazer as alterações no código web**
2. **Testar localmente:**
   ```bash
   npm run dev
   ```
3. **Gerar novo APK:**
   ```bash
   npm run android:build
   ```

## 💡 Dicas

- Use `debug` para testes internos
- Use `release` para publicar na Play Store
- Mantenha os ícones atualizados em `public/`
- Teste sempre em dispositivos reais antes de publicar

---

**📞 Suporte:** Se encontrar problemas, verifique os logs do Android Studio ou execute `npx cap doctor` para diagnóstico.