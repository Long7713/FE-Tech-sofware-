import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { LangProvider } from './src/context/LangContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <LangProvider>
        <AuthProvider>
          <Navigation />
          <StatusBar style="dark" />
        </AuthProvider>
      </LangProvider>
    </SafeAreaProvider>
  );
}
