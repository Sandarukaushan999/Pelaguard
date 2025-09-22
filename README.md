# Pelaguard - Ocean Conservation App

A React Native mobile app built with Expo for ocean conservation and environmental awareness.

## Features

- **Launch Screens**: Beautiful splash screen and intro
- **Onboarding**: 3-step onboarding process
- **Authentication**: Login and Signup screens
- **Home Dashboard**: Overview of user stats and quick actions
- **Eco Habits**: Track and manage eco-friendly habits
- **Action Events**: Join ocean conservation events
- **Ocean Awareness**: Educational content about ocean conservation
- **Notifications**: Alerts, tips, and achievements
- **Profile**: User profile and achievements

## Screens Included

1. **LaunchScreen** - App logo and loading
2. **LaunchIntroScreen** - "Save the Sea" introduction
3. **Onboarding1** - Ocean protection introduction
4. **Onboarding2** - Eco habits introduction
5. **Onboarding3** - Community introduction
6. **LoginScreen** - User authentication
7. **SignupScreen** - User registration
8. **HomeScreen** - Main dashboard
9. **EcoHabitsScreen** - Habit tracking
10. **ActionEventsScreen** - Event participation
11. **OceanAwarenessScreen** - Educational content
12. **NotificationsScreen** - Alerts and tips
13. **ProfileScreen** - User profile and settings

## Navigation Flow

```
LaunchScreen → LaunchIntroScreen → Onboarding1 → Onboarding2 → Onboarding3 → LoginScreen/SignupScreen → MainTabs
```

Main tabs include:
- Home
- Eco Habits
- Action Events
- Ocean Awareness
- Notifications
- Profile

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. Navigate to the project directory:
   ```bash
   cd Pelaguard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Scan the QR code with Expo Go app on your iPhone/Android device

### Running on iPhone 13

The app is optimized for iPhone 13 and other devices with:
- Responsive design using Dimensions API
- Proper status bar handling
- Touch-friendly button sizes
- Optimized layouts for different screen sizes

## Project Structure

```
Pelaguard/
├── components/
│   └── screens/
│       ├── LaunchScreen.js
│       ├── LaunchIntroScreen.js
│       ├── Onboarding1.js
│       ├── Onboarding2.js
│       ├── Onboarding3.js
│       ├── LoginScreen.js
│       ├── SignupScreen.js
│       ├── HomeScreen.js
│       ├── EcoHabitsScreen.js
│       ├── ActionEventsScreen.js
│       ├── OceanAwarenessScreen.js
│       ├── NotificationsScreen.js
│       └── ProfileScreen.js
├── navigation/
│   ├── StackNavigator.js
│   └── TabNavigator.js
├── App.js
└── package.json
```

## Dependencies

- @react-navigation/native
- @react-navigation/stack
- @react-navigation/bottom-tabs
- react-native-screens
- react-native-safe-area-context
- react-native-gesture-handler
- @expo/vector-icons

## Image Placeholders

The app includes placeholder comments for images that need to be replaced:
- Ocean backgrounds
- App logo
- User avatars
- Event images
- Article images

Replace these placeholders with actual images for production use.

## Customization

- Colors: Update the color scheme in individual screen styles
- Icons: Replace MaterialIcons with custom icons
- Content: Update text content and data in each screen
- Navigation: Modify navigation flow in StackNavigator.js and TabNavigator.js

## Testing

The app has been tested for:
- iPhone 13 compatibility
- Responsive design
- Navigation flow
- Touch interactions
- Status bar handling

## Future Enhancements

- Backend integration
- Real-time data
- Push notifications
- Offline support
- Advanced animations
- Custom illustrations

## Support

For issues or questions, please check the Expo documentation or React Navigation guides.
