// App.js
import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "./navigation/navigator";
import { AuthContext, AuthProvider } from "./context/authcontex/auth";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const MainApp = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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
  };

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.log('Error @checkAuthentication:', err);
    }
  };

  useEffect(() => {
    checkOnboarding();
    checkAuthentication();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {viewedOnboarding ? (
        <AppNavigator isAuthenticated={isAuthenticated} />
      ) : (
        <Loading />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
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
