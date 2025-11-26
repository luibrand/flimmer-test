// App.tsx

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HookScreen } from './src/screens/HookScreen';
import { MockCameraScreen } from './src/screens/MockCameraScreen';
import { PhotoConfirmationScreen } from './src/screens/PhotoConfirmationScreen';
import { StatusModal } from './src/components/StatusModal';
import { colors } from './src/theme/colors';

type AppState = 'HOOK' | 'CAMERA' | 'CONFIRMATION';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('HOOK');
  const [showStatusModal, setShowStatusModal] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOOK':
        return (
          <HookScreen
            onAccept={() => setCurrentScreen('CAMERA')}
            onDecline={() => {
              // User declined, stay on HOOK screen
              console.log('User declined challenge');
            }}
          />
        );

      case 'CAMERA':
        return (
          <MockCameraScreen
            onBack={() => setCurrentScreen('HOOK')}
            onCapture={() => setCurrentScreen('CONFIRMATION')}
          />
        );

      case 'CONFIRMATION':
        return (
          <PhotoConfirmationScreen
            onBack={() => setCurrentScreen('CAMERA')}
            onShare={() => setShowStatusModal(true)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={currentScreen === 'CONFIRMATION' ? 'light' : 'dark'} />
      {renderScreen()}
      
      <StatusModal
        visible={showStatusModal}
        onBackToVideos={() => {
          setShowStatusModal(false);
          setCurrentScreen('HOOK');
        }}
        onDoAgain={() => {
          setShowStatusModal(false);
          setCurrentScreen('CAMERA');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

