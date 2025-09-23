import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import screens
import LaunchScreen from '../components/screens/LaunchScreen';
import Launch2 from '../components/screens/Launch2';
import Onboarding1 from '../components/screens/Onboarding2';
import Onboarding2 from '../components/screens/LaunchIntroScreen';
import Onboarding3 from '../components/screens/Onboarding1';
import LoginScreen from '../components/screens/LoginScreen';
import SignupScreen from '../components/screens/SignupScreen';
import TabNavigator from './TabNavigator';
import NotificationsScreen from '../components/screens/NotificationsScreen';
import SettingsScreen from '../components/screens/SettingsScreen';
import OceanAwarenessScreen from '../components/screens/OceanAwarenessScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LaunchScreen"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
        <Stack.Screen name="Launch2" component={Launch2} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="OceanAwareness" component={OceanAwarenessScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;