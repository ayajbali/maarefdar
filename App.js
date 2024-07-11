import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './components/Onboarding';
import Out from './components/Out';
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import EditProfileScreen from "./components/screens/EditProfileScreen";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import * as Font from 'expo-font';
import SearchScreen from "./components/screens/Search";
import BooksDetails from "./components/screens/BooksDetails";
const Stack = createStackNavigator();

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Out} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> 
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <Stack.Screen name="Search" component={SearchScreen} /> 
    <Stack.Screen name="BooksDetails" component={BooksDetails} /> 

  </Stack.Navigator>
);

const OnboardingStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Onboarding" component={Onboarding} />
  </Stack.Navigator>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error @checkOnboarding:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {viewedOnboarding ? <BottomTabNavigation /> : <OnboardingStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
