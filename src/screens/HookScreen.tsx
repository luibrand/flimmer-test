// src/screens/HookScreen.tsx

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { FlimmerLogo } from '../components/FlimmerLogo';
import { ShareIcon, BookmarkIcon, AirplayIcon, ShoppingBagIcon } from '../components/Icons';

const { width, height } = Dimensions.get('window');
const VIDEO_HEIGHT = (width * 9) / 16; // Pure 16:9 aspect ratio
const HEADER_HEIGHT = 106; // Top bar height
const VIDEO_INFO_HEIGHT = 72; // Video info bar height
const MIN_CHALLENGE_HEIGHT = height - HEADER_HEIGHT - VIDEO_HEIGHT - VIDEO_INFO_HEIGHT;

interface HookScreenProps {
  onAccept: () => void;
  onDecline: () => void;
  onBack?: () => void;
}

export const HookScreen: React.FC<HookScreenProps> = ({ onAccept, onDecline, onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <FlimmerLogo width={130} height={24} />
        </View>
        <TouchableOpacity style={styles.backButton}>
          <ShoppingBagIcon size={24} color={colors.darkText} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} bounces={false} contentContainerStyle={styles.scrollContent}>
        {/* Video Section */}
        <View style={styles.videoSection}>
        <View style={styles.videoBox}>
          <Text style={styles.videoEmoji}>🤸</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarFilled} />
          </View>
        </View>

        {/* Video Info Bar */}
        <View style={styles.videoInfoBar}>
          <View style={styles.videoInfoLeft}>
            <View style={styles.channelLogo}>
              <Text style={styles.channelLogoEmoji}>👧</Text>
            </View>
          <View style={styles.videoTextInfo}>
            <Text style={styles.videoTitle}>Fantastisk at stå på hænder!</Text>
            <Text style={styles.videoCreator}>Sarah & Venner</Text>
          </View>
          </View>
          <View style={styles.videoActions}>
            <TouchableOpacity style={styles.actionButton}>
              <ShareIcon size={24} color={colors.darkText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <BookmarkIcon size={24} color={colors.darkText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <AirplayIcon size={24} color={colors.darkText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Challenge Section - Bright Yellow */}
      <View style={styles.challengeSection}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
        {/* Thumbnails of other attempts */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailsContainer}
          contentContainerStyle={styles.thumbnailsContent}
          bounces={false}
        >
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸‍♀️</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Emma</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸‍♂️</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Lucas</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Sofia</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸‍♀️</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Olivia</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸‍♂️</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Noah</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Mia</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸‍♂️</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Liam</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸‍♀️</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Ella</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸‍♂️</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Oscar</Text>
            </View>
          </View>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🤸</Text>
            <View style={styles.thumbnailBadge}>
              <Text style={styles.thumbnailName}>Lily</Text>
            </View>
          </View>
        </ScrollView>

        <Text style={styles.challengeTitle}>Kan du stå på hænder sådan her?</Text>
        <Text style={styles.challengeSubtitle}>
          Vis hvordan du bedst kan stå på hænder og tjen stjerner! ⭐
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={onAccept}>
          <Text style={styles.primaryButtonText}>Tag billede</Text>
        </TouchableOpacity>
        </Animated.View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: colors.darkText,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  videoSection: {
    width: '100%',
    backgroundColor: colors.background,
  },
  videoBox: {
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: colors.surface,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoEmoji: {
    fontSize: 100,
    marginBottom: 16,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.surfaceLight,
  },
  progressBarFilled: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.primary,
  },
  videoInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  videoInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  channelLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  channelLogoEmoji: {
    fontSize: 24,
  },
  videoTextInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 2,
  },
  videoCreator: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  videoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  actionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeSection: {
    backgroundColor: colors.yellow,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 20,
    minHeight: MIN_CHALLENGE_HEIGHT,
  },
  thumbnailsContainer: {
    marginTop: 24,
    marginBottom: 32,
    marginHorizontal: -20, // Extend full width by negating parent padding
    maxHeight: (width - 40 - 24) / 3, // Match thumbnail height exactly
  },
  thumbnailsContent: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 12,
  },
  thumbnail: {
    width: (width - 40 - 24) / 3, // Screen width minus padding (40px) and gaps (24px)
    height: (width - 40 - 24) / 3, // Explicit height
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.white,
  },
  thumbnailEmoji: {
    fontSize: 48,
  },
  thumbnailBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  thumbnailName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.darkText,
  },
  challengeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: 12,
  },
  challengeSubtitle: {
    fontSize: 16,
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.darkText,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    color: colors.darkText,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
