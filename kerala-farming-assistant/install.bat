@echo off
echo Installing Kerala Farming Assistant...
echo.

echo Installing dependencies...
npm install

echo.
echo Installing Expo CLI globally...
npm install -g @expo/cli

echo.
echo Installing EAS CLI globally...
npm install -g eas-cli

echo.
echo Installation complete!
echo.
echo To start the app:
echo   npm start
echo.
echo To build APK:
echo   eas build --platform android --profile preview
echo.
pause
