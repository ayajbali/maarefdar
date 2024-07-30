import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigator from "./navigation/TabNavigator"; // Ensure this path is correct
import { AuthContext, AuthProvider } from "./context/authcontex/auth";
import { BooksProvider } from "./context/books";

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" />
  </View>
);

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

  return <AppNavigator isAuthenticated={isAuthenticated} />;
};

export default function App() {
  return (
    <AuthProvider>
     <BooksProvider>
      <MainApp />
      </BooksProvider>
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
