import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import HomeScreen from '../components/screens/HomeScreen';
import EcoHabitsScreen from '../components/screens/EcoHabitsScreen';
import ActionEventsScreen from '../components/screens/ActionEventsScreen';
import NotificationsScreen from '../components/screens/NotificationsScreen';
import ProfileScreen from '../components/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = '🏠';
          } else if (route.name === 'EcoHabits') {
            iconName = '🎯';
          } else if (route.name === 'ActionEvents') {
            iconName = '📋';
          } else if (route.name === 'Notifications') {
            iconName = '🔔';
          } else if (route.name === 'Profile') {
            iconName = '👤';
          }

          return <Text style={{ fontSize: size, color: color }}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#1F2937',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="EcoHabits" 
        component={EcoHabitsScreen}
        options={{ tabBarLabel: 'Habits' }}
      />
      <Tab.Screen 
        name="ActionEvents" 
        component={ActionEventsScreen}
        options={{ tabBarLabel: 'Events' }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Alerts' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;