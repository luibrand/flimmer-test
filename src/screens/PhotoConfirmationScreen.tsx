// src/screens/PhotoConfirmationScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface PhotoConfirmationScreenProps {
  onShare: () => void;
  onBack: () => void;
}

export const PhotoConfirmationScreen: React.FC<PhotoConfirmationScreenProps> = ({
  onShare,
  onBack,
}) => {
  const [privacy, setPrivacy] = useState<'everyone' | 'private'>('everyone');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#934DFF', '#340181']}
      locations={[0, 1]}
      style={styles.container}
    >
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Del billede</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Photo Preview */}
          <View style={styles.photoPreview}>
            <Text style={styles.photoEmoji}>🤸</Text>
            <Text style={styles.photoLabel}>Sådan stod du på hænder!</Text>
          </View>

          {/* Privacy Question */}
          <Text style={styles.question}>Hvem kan se dit billede i appen?</Text>

          {/* Privacy Options */}
          <View style={styles.privacyOptions}>
            <TouchableOpacity
              style={[
                styles.privacyButton,
                privacy === 'everyone' && styles.privacyButtonActive,
              ]}
              onPress={() => setPrivacy('everyone')}
            >
              <Text
                style={[
                  styles.privacyButtonText,
                  privacy === 'everyone' && styles.privacyButtonTextActive,
                ]}
              >
                Alle 👥
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.privacyButton,
                privacy === 'private' && styles.privacyButtonActive,
              ]}
              onPress={() => setPrivacy('private')}
            >
              <Text
                style={[
                  styles.privacyButtonText,
                  privacy === 'private' && styles.privacyButtonTextActive,
                ]}
              >
                Kun mig 🔒
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Notice */}
          <Text style={styles.notice}>
            Alle billeder bliver godkendt af Flimmer - uanset indstillingen foroven.
          </Text>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Text style={styles.shareButtonText}>Del</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  photoPreview: {
    width: width * 0.65,
    height: width * 0.85,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  photoEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  photoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkText,
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  privacyOptions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  privacyButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  privacyButtonActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  privacyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  privacyButtonTextActive: {
    color: colors.primary,
  },
  notice: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
    opacity: 0.9,
  },
  shareButton: {
    backgroundColor: '#FDA34F',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  shareButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

