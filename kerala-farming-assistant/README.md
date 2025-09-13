# Kerala Farming Assistant

A comprehensive mobile app designed specifically for Kerala farmers to get AI-powered farming advice, weather updates, market prices, and government subsidy information.

## Features

### 🌱 Core Features
- **AI Chatbot**: Get real-time farming advice and answers to your questions
- **Multi-language Support**: Available in English, Hindi, and Malayalam
- **Weather Information**: Real-time weather updates using OpenWeather API
- **Market Prices**: Current crop prices from major markets in Kerala
- **Government Subsidies**: Information about available schemes and subsidies
- **Simple UI**: Beginner-friendly interface designed for farmers of all ages

### 📱 Technical Features
- Built with React Native and Expo
- Cross-platform compatibility (Android/iOS)
- Offline-capable with local data storage
- Location-based weather services
- Real-time data updates

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- EAS CLI (for building APKs)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Install Expo CLI (if not already installed)
```bash
npm install -g @expo/cli
```

### Step 3: Install EAS CLI (for building APKs)
```bash
npm install -g eas-cli
```

### Step 4: Configure OpenWeather API (Optional)
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace `YOUR_OPENWEATHER_API_KEY` in `src/services/WeatherService.js` with your actual API key
3. Without an API key, the app will use mock weather data

### Step 5: Run the App
```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Building APK

### Method 1: Using EAS Build (Recommended)
```bash
# Login to Expo (create account if needed)
eas login

# Configure the project
eas build:configure

# Build APK for Android
eas build --platform android --profile preview
```

### Method 2: Local Build
```bash
# Build APK locally (requires Android Studio setup)
npx expo run:android --variant release
```

## Project Structure

```
kerala-farming-assistant/
├── src/
│   ├── screens/          # App screens
│   │   ├── HomeScreen.js
│   │   ├── ChatScreen.js
│   │   ├── WeatherScreen.js
│   │   ├── MarketScreen.js
│   │   ├── SubsidyScreen.js
│   │   └── SettingsScreen.js
│   ├── services/         # API services
│   │   ├── ChatService.js
│   │   ├── WeatherService.js
│   │   ├── MarketService.js
│   │   └── SubsidyService.js
│   ├── theme/           # App theme
│   │   └── theme.js
│   └── i18n/            # Internationalization
│       ├── i18n.js
│       └── locales/
│           ├── en.json
│           ├── hi.json
│           └── ml.json
├── assets/              # App assets
├── App.js              # Main app component
├── app.json            # Expo configuration
├── package.json        # Dependencies
└── README.md           # This file
```

## Customization

### Adding New Languages
1. Create a new JSON file in `src/i18n/locales/`
2. Add the language code to the resources object in `src/i18n/i18n.js`
3. Update the language list in `src/screens/SettingsScreen.js`

### Adding New Features
1. Create new screens in `src/screens/`
2. Add corresponding services in `src/services/`
3. Update navigation in `App.js`
4. Add translations to all language files

### Styling
- Modify `src/theme/theme.js` for global theme changes
- Individual screen styles are defined in each component

## API Integration

### Weather API
- Currently uses OpenWeather API
- Mock data is provided as fallback
- Replace API key in `WeatherService.js`

### Market Data
- Currently uses mock data
- Can be integrated with real market APIs
- Modify `MarketService.js` for real data

### Government Subsidies
- Currently uses static data
- Can be integrated with government APIs
- Modify `SubsidyService.js` for real data

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **Dependency conflicts**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help
- Check Expo documentation: https://docs.expo.dev/
- React Native documentation: https://reactnative.dev/
- EAS Build documentation: https://docs.expo.dev/build/introduction/

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: support@keralafarming.com
- Phone: +91-471-1234567
- Website: www.keralafarming.com

---

**Built with ❤️ for the Kerala farming community**
