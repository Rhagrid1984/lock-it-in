import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import VaultScreen from './screens/VaultScreen';
import SharedScreen from './screens/SharedScreen';
import SettingsScreen from './screens/SettingsScreen';
import AcademicsScreen from './screens/AcademicsScreen';
import SponsoredScreen from './screens/SponsoredScreen';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'lock-closed-outline';
                break;
              case 'Vault':
                iconName = 'archive-outline';
                break;
              case 'Shared':
                iconName = 'people-outline';
                break;
              case 'Academics':
                iconName = 'school-outline';
                break;
              case 'Sponsored':
                iconName = 'pricetags-outline';
                break;
              case 'Settings':
                iconName = 'settings-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Vault" component={VaultScreen} />
        <Tab.Screen name="Shared" component={SharedScreen} />
        <Tab.Screen name="Academics" component={AcademicsScreen} />
        <Tab.Screen name="Sponsored" component={SponsoredScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
