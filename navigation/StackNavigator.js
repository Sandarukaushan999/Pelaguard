import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LaunchScreen from '../components/screens/LaunchScreen';
import TabNavigator from './TabNavigator';

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
        {/* Launch Screen (first screen shown) */}
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
        
        {/* Main Tab Navigator */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
