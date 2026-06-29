@echo off
echo Limpiando cache del juego SE FUE...
taskkill /F /IM msedge.exe /T >nul 2>&1
timeout /t 1 >nul
rmdir /s /q "%TEMP%\SE_FUE_Profile"
echo Cache limpiado. Ya puedes abrir el juego normalmente.
pause
