import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
