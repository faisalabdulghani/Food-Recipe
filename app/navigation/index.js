import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
                <Stack.Screen name='RecipeDetailScreen' component={RecipeDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}