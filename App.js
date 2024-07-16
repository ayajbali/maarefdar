// App.js
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import AppNavigator from "./navigation/navigator";
import { AuthProvider } from "./context/authcontex/auth";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Authentication state

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

  const checkAuthentication = async () => {

    try {
      const token = await AsyncStorage.getItem('@userToken');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.log('Error @checkAuthentication:', err);
    }
  }

  useEffect(() => {
    checkOnboarding();
    checkAuthentication();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        {viewedOnboarding ? (
          <AppNavigator isAuthenticated={isAuthenticated} />
        ) : (
          <PublicStack />
        )}
      </NavigationContainer>
    </AuthProvider>
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
