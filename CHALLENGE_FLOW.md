# Challenge Acceptance Flow

A complete 4-screen challenge acceptance flow built with React Native, TypeScript, and Expo.

## Flow Overview

```
HOOK → CAMERA → UPLOADING → SUCCESS
  ↑                             ↓
  └─────────────────────────────┘
```

## Screens

### 1. HOOK Screen
- **Purpose**: Video finished state with challenge prompt
- **Features**:
  - 16:9 fake video thumbnail with emoji and progress bar
  - Bottom card with "CHALLENGE TIME" badge
  - Challenge title: "Can you cartwheel like this?"
  - 3-step instructions using `StepRow` component
  - Primary button: "✨ I'm doing it!" → goes to CAMERA
  - Secondary button: "Maybe later" → stays on HOOK
  - **Animation**: Fade + scale on mount

### 2. CAMERA Screen
- **Purpose**: Mock camera interface for recording
- **Features**:
  - Top bar with back button and title
  - Large rounded viewfinder with emoji 📷
  - Crosshair overlay for alignment
  - Bottom controls: flip 🔄, shutter button, gallery 🖼️
  - Shutter button triggers flash animation
  - **Animation**: Fade + slide up entrance, white flash overlay on capture
- **Flow**: Shutter press → Flash → UPLOADING (after 200ms)

### 3. UPLOADING Screen
- **Purpose**: Progress feedback during upload
- **Features**:
  - Dimmed overlay background
  - Center card with upload message
  - "Safety checking your video 👀" subtitle
  - Animated progress bar: 0% → 100% over 2 seconds
  - **Animation**: Progress bar animation
- **Flow**: Auto-advances to SUCCESS when complete

### 4. SUCCESS Screen
- **Purpose**: Celebration and reward notification
- **Features**:
  - 🎉 celebration emoji
  - Title: "Sent for Safety Check!"
  - Subtitle: "You earned 10⭐"
  - Primary button: "Back to videos" → returns to HOOK
  - Secondary button: "Do it again" → returns to CAMERA
  - **Animation**: Scale in with fade

## File Structure

```
my-expo-app/
├── App.tsx                           # Main app with state machine
├── src/
│   ├── components/
│   │   └── StepRow.tsx              # Reusable step indicator component
│   ├── screens/
│   │   ├── HookScreen.tsx           # Challenge prompt screen
│   │   ├── MockCameraScreen.tsx     # Camera interface screen
│   │   ├── UploadScreen.tsx         # Upload progress screen
│   │   └── SuccessScreen.tsx        # Success celebration screen
│   └── theme/
│       └── colors.ts                # Shared color constants
```

## State Management

The app uses a simple state machine in `App.tsx` with no navigation library:

```typescript
type AppState = 'HOOK' | 'CAMERA' | 'UPLOADING' | 'SUCCESS';
```

State transitions:
- `HOOK` → `CAMERA`: User taps "I'm doing it!"
- `CAMERA` → `HOOK`: User taps back button
- `CAMERA` → `UPLOADING`: User taps shutter button
- `UPLOADING` → `SUCCESS`: Auto-transition after 2s progress
- `SUCCESS` → `HOOK`: User taps "Back to videos"
- `SUCCESS` → `CAMERA`: User taps "Do it again"

## Animations

All animations use React Native's Animated API:

- **Fade**: `Animated.timing` with opacity
- **Scale**: `Animated.spring` for bouncy effect
- **Slide**: `Animated.timing` with translateY
- **Flash**: Quick fade in/out of white overlay
- **Progress**: Width interpolation from 0% to 100%

## Running the App

```bash
# Start the development server
npm start

# Scan QR code with Expo Go on your phone
# Or press 'i' for iOS simulator, 'a' for Android emulator
```

## Technical Details

- **TypeScript**: Full type safety throughout
- **No external dependencies**: Only Expo defaults (expo, react, react-native)
- **Responsive**: Uses Dimensions API for adaptive sizing
- **Dark theme**: Modern dark UI with purple accents
- **Clean code**: Separated concerns, reusable components

## Color Scheme

- Primary: Purple (`#6C5CE7`)
- Background: Black (`#000000`)
- Surface: Dark gray (`#1A1A1A`)
- Text: White (`#FFFFFF`)
- Success: Green (`#00D68F`)

