import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import HomeScreen from '../screens/home/HomeScreen';
import MapScreen from '../screens/map/MapScreen';
import AnimalListScreen from '../screens/animals/AnimalListScreen';
import AnimalDetailScreen from '../screens/animals/AnimalDetailScreen';
import TranslateScreen from '../screens/translate/TranslateScreen';
import AccountScreen from '../screens/account/AccountScreen';
import LoginScreen from '../screens/account/LoginScreen';
import RegisterScreen from '../screens/account/RegisterScreen';

const Tab = createBottomTabNavigator();
const AnimalStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

const stackOptions = { headerTintColor: colors.primary, headerStyle: { backgroundColor: colors.bg }, headerShadowVisible: false, headerTitleStyle: { color: colors.primaryDark } };

function AnimalsNavigator() {
  return (
    <AnimalStack.Navigator screenOptions={stackOptions}>
      <AnimalStack.Screen name="AnimalList" component={AnimalListScreen} options={{ headerShown: false }} />
      <AnimalStack.Screen name="AnimalDetail" component={AnimalDetailScreen} options={({ route }: any) => ({ title: route.params?.name ?? 'Hồ sơ loài' })} />
    </AnimalStack.Navigator>
  );
}

function AccountNavigator() {
  return (
    <AccountStack.Navigator screenOptions={stackOptions}>
      <AccountStack.Screen name="AccountHome" component={AccountScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name="Login" component={LoginScreen} options={{ title: '' }} />
      <AccountStack.Screen name="Register" component={RegisterScreen} options={{ title: '' }} />
    </AccountStack.Navigator>
  );
}

const icons: Record<string, [string, string]> = {
  Home: ['home', 'home-outline'], Map: ['map', 'map-outline'], Animals: ['paw', 'paw-outline'],
  Translate: ['language', 'language-outline'], Account: ['person', 'person-outline'],
};

export default function Navigation() {
  return (
    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.bg } }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.bg, borderTopColor: colors.line },
          tabBarIcon: ({ focused, color, size }) => <Ionicons name={icons[route.name][focused ? 0 : 1] as any} size={size} color={color} />,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Bản đồ' }} />
        <Tab.Screen name="Animals" component={AnimalsNavigator} options={{ title: 'Động vật' }} />
        <Tab.Screen name="Translate" component={TranslateScreen} options={{ title: 'Phiên dịch' }} />
        <Tab.Screen name="Account" component={AccountNavigator} options={{ title: 'Tài khoản' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
