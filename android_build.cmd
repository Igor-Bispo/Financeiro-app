@echo off
setlocal ENABLEDELAYEDEXPANSION
REM Configure JDK (Android Studio JBR)
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
if not exist "%JAVA_HOME%\bin\java.exe" (
  echo JAVA_HOME not found at "%JAVA_HOME%". Please install JDK 17+ or adjust this path.
  exit /b 1
)
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Change to android folder and build debug APK
cd /d "%~dp0android"
call gradlew.bat assembleDebug
exit /b %ERRORLEVEL%


