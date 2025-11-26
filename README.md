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

---

## 🐙 System Design: Child-Safe Content Moderation

### Database Schema: UserChallengeSubmission

```
UserChallengeSubmission {
  id: UUID (primary key)
  userId: UUID (foreign key → User)
  challengeId: UUID (foreign key → Challenge)
  
  // Image storage
  imageUrl: String (storage URL, e.g., S3)
  imageThumbnailUrl: String (optimized thumbnail)
  imageHash: String (perceptual hash for duplicate detection)
  
  // Moderation fields
  moderationStatus: Enum ['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED']
  aiModerationScore: Float (0-1, confidence from AI scan)
  aiModerationFlags: JSON (specific issues detected: inappropriate, violence, etc.)
  humanModeratorId: UUID (nullable, foreign key → Moderator)
  moderationNotes: Text (nullable, reason for rejection)
  moderatedAt: Timestamp (nullable)
  
  // Metadata
  createdAt: Timestamp
  uploadedAt: Timestamp
  publishedAt: Timestamp (nullable, only set when approved)
  
  // Engagement (post-approval)
  viewCount: Integer (default: 0)
  likeCount: Integer (default: 0)
  
  // Safety tracking
  reportCount: Integer (default: 0, user reports)
  isHidden: Boolean (default: false, can be hidden after approval if reported)
  
  // Indexes
  INDEX(userId, createdAt)
  INDEX(challengeId, publishedAt)
  INDEX(moderationStatus, createdAt)
}
```

### Safety Logic: Image Lifecycle

#### Phase 1: Client-Side (Phone)
1. **Capture**: User takes photo in app
2. **Pre-upload validation**:
   - Check file size (< 10MB)
   - Verify image format (JPEG/PNG only)
   - Basic client-side checks (dimensions, corruption)
3. **Compression**: Reduce size for faster upload, generate thumbnail
4. **Encrypted upload**: Send to secure API endpoint via HTTPS

#### Phase 2: Server Reception
5. **Authentication**: Verify user session token
6. **Rate limiting**: Check user hasn't exceeded daily submission limit (prevent spam)
7. **Secure storage**: Upload to isolated storage bucket (not public-facing)
8. **Database record**: Create `UserChallengeSubmission` with `moderationStatus: PENDING`

#### Phase 3: AI Moderation (Automated, ~1-2 seconds)
9. **AI safety scan** using services like AWS Rekognition, Google Cloud Vision, or Sightengine:
   - Detect explicit/inappropriate content
   - Check for violence, weapons, alcohol
   - Facial recognition (verify single person, age appropriateness)
   - Text detection (prevent hidden inappropriate text)
   - Known harmful content matching (via hash comparison)
10. **Scoring**: Generate `aiModerationScore` and `aiModerationFlags`
11. **Auto-decision**:
    - **High confidence safe** (score > 0.95, no flags): → `APPROVED` (skip human review)
    - **High confidence unsafe** (score < 0.3): → `REJECTED` (auto-reject)
    - **Uncertain** (0.3 - 0.95): → `FLAGGED` (requires human review)

#### Phase 4: Human Moderation (for flagged content)
12. **Moderation queue**: `FLAGGED` submissions sent to trained moderators
13. **Human review**:
    - Moderator views image with context (challenge prompt, user age)
    - Makes approval/rejection decision
    - Adds `moderationNotes` if rejected
14. **Update record**: Set `moderationStatus`, `moderatedAt`, `humanModeratorId`

#### Phase 5: Publication (Approved Content Only)
15. **Move to public bucket**: Copy from isolated storage to CDN-backed public storage
16. **Set `publishedAt`**: Timestamp when made visible
17. **Index for feed**: Add to challenge leaderboard, user profile, public feed
18. **Notify user**: Push notification that submission was approved

#### Phase 6: Post-Publication Monitoring
19. **User reporting**: Other users can flag inappropriate content
20. **Auto-hide threshold**: If `reportCount` > 3, automatically set `isHidden: true` and re-queue for review
21. **Periodic re-scan**: Random sampling of approved content for quality checks
22. **Takedown**: Rejected content deleted from storage after 30 days (kept temporarily for appeals)

### Key Safety Principles
- **Default deny**: Content is private until explicitly approved
- **Defense in depth**: Multiple layers (AI + human + community reporting)
- **Audit trail**: All moderation decisions logged with timestamps and moderator IDs
- **Fast feedback**: Users notified within 1 hour of submission status
- **Privacy**: Failed submissions never exposed publicly, deleted after retention period

