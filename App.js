import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigator />
    </GestureHandlerRootView>
  );
}