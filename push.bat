@echo off
REM Script para push automático de todas as mudanças para o GitHub

git add .
git commit -m "Atualizações automáticas"
git push

echo Push automático concluído!
pause 