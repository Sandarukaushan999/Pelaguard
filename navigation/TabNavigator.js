import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../components/screens/HomeScreen';
import AllocationScreen from '../components/screens/ActionEventsScreen';
import ExpensesScreen from '../components/screens/EcoHabitsScreen';
import SalesScreen from '../components/screens/ProfileScreen';
import SettingsScreen from '../components/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Allocation') {
            iconName = focused ? 'layers' : 'layers-outline';
          } else if (route.name === 'Expences') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Sales') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="Allocation" component={AllocationScreen} />
      <Tab.Screen name="Expences" component={ExpensesScreen} />
      <Tab.Screen name="Sales" component={SalesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
