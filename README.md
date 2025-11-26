# My Expo App

A React Native project built with Expo SDK 54, ready for testing with Expo Go.

## Project Details

- **Expo SDK**: ~54.0.25
- **React**: 19.1.0
- **React Native**: 0.81.5

## Getting Started

### 1. Install Expo Go on Your Device

Download Expo Go from your app store:
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 2. Start the Development Server

```bash
cd my-expo-app
npm start
```

This will open the Expo Developer Tools in your browser and display a QR code in your terminal.

### 3. Test on Your Device

#### Option A: Scan QR Code
- **iOS**: Open the Camera app and scan the QR code. Tap the notification to open in Expo Go.
- **Android**: Open the Expo Go app and use the built-in QR scanner.

#### Option B: Manual Connection
- Make sure your phone and computer are on the same WiFi network
- Open Expo Go on your device
- Enter the connection URL manually (shown in the terminal)

### 4. Development Commands

- `npm start` - Start the development server
- `npm run android` - Open on Android emulator
- `npm run ios` - Open on iOS simulator (Mac only)
- `npm run web` - Open in web browser

## Making Changes

Edit `App.js` to start building your app. Changes will automatically reload in Expo Go!

## Troubleshooting

- **QR code not working?** Make sure your phone and computer are on the same WiFi network
- **Connection issues?** Try using tunnel mode: `npx expo start --tunnel`
- **App not updating?** Shake your device to open the developer menu and tap "Reload"

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Go Documentation](https://docs.expo.dev/get-started/expo-go/)

