@echo off
echo Building Kerala Farming Assistant APK...
echo.

echo Logging into Expo (if not already logged in)...
eas login

echo.
echo Building APK...
eas build --platform android --profile preview

echo.
echo Build process started! Check the Expo dashboard for progress.
echo The APK will be available for download once the build completes.
echo.
pause
