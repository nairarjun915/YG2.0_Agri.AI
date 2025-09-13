# Quick Start Guide - Kerala Farming Assistant

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
Double-click `install.bat` or run:
```bash
npm install
npm install -g @expo/cli eas-cli
```

### Step 2: Start the App
```bash
npm start
```
Then scan the QR code with Expo Go app on your phone, or press 'a' for Android emulator.

### Step 3: Build APK (Optional)
Double-click `build-apk.bat` or run:
```bash
eas build --platform android --profile preview
```

## 📱 What You Get

✅ **AI Chatbot** - Ask farming questions in English, Hindi, or Malayalam
✅ **Weather Updates** - Real-time weather for your location
✅ **Market Prices** - Current crop prices in Kerala
✅ **Government Subsidies** - Information about available schemes
✅ **Multi-language** - Switch between English, Hindi, and Malayalam
✅ **Simple UI** - Easy to use for farmers of all ages

## 🔧 Customization

### Add Your Weather API Key
1. Get free API key from https://openweathermap.org/api
2. Edit `src/services/WeatherService.js`
3. Replace `YOUR_OPENWEATHER_API_KEY` with your key

### Change App Name/Details
Edit `app.json` to customize:
- App name
- Package name
- Icons
- Colors

## 📦 Building APK

### Prerequisites
- Expo account (free at https://expo.dev)
- Android device or emulator

### Build Process
1. Run `eas login` to sign in
2. Run `eas build --platform android --profile preview`
3. Download APK from Expo dashboard
4. Install on Android device

## 🆘 Need Help?

- Check the full README.md for detailed instructions
- Visit https://docs.expo.dev for Expo documentation
- Contact support: support@keralafarming.com

---

**Ready to help Kerala farmers! 🌱**
