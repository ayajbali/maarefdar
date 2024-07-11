// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from "../components/Onboarding"
import LoginScreen from "../components/screens/LoginScreen"
import SignupScreen from "../components/screens/SignupScreen"
import HomeScreen from "../components/screens/HomePage"
import ProfileScreen from "../components/screens/ProfileScreen"
import SearchScreen from "../components/screens/Search"
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// Public Stack Navigator
const PublicStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Onboarding" component={Onboarding}   />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// Private Tab Navigator
const PrivateTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = ({ isAuthenticated }) => (
  isAuthenticated ? <PrivateTabs /> : <PublicStack />
);

export default AppNavigator;
