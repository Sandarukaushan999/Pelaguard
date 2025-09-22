import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import screens
import HomeScreen from '../components/screens/HomeScreen';
import EcoHabitsScreen from '../components/screens/EcoHabitsScreen';
import ActionEventsScreen from '../components/screens/ActionEventsScreen';
import ProfileScreen from '../components/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'EcoHabits') {
            iconName = 'bullseye';
          } else if (route.name === 'ActionEvents') {
            iconName = 'calendar';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#5145E5',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 24,
          height: 80,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarShowLabel: false,
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
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;