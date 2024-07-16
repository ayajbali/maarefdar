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
import EditProfileScreen from "../components/screens/EditProfileScreen"
 import { useNavigation } from '@react-navigation/native';
import CategoryPart from '../components/home/CategoryPart';
import BooksDetails from '../components/screens/BooksDetails';
import Nouveautes from '../components/home/Nouveautes';
import CategoryDetails from '../components/screens/CategoryDetails';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// Public Stack Navigator
const PublicStack = () => (
  <Stack.Navigator  screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="Onboarding" component={Onboarding}  headerShown ={false} />
    <Stack.Screen name="Login" component={LoginScreen}  headerShown ={false} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Category" component={CategoryPart} />
    <Stack.Screen name="Nouveautes" component={Nouveautes} />
    
  </Stack.Navigator>
);

// Private Tab Navigator
const PrivateTabs = () => (
  <Tab.Navigator  screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen}  headerShown ={false}/>
    <Tab.Screen name="Profile" component={ProfileScreen}  headerShown ={false}/>
    <Tab.Screen name="Search" component={SearchScreen}  />
    <Tab.Screen name="CategoryDetails" component={CategoryDetails}  />
    <Tab.Screen name="BooksDetails" component={BooksDetails}  />
    <Tab.Screen name="EditScreen" component={EditProfileScreen}  />
  </Tab.Navigator>
);

const AppNavigator = ({ isAuthenticated }) => (
  isAuthenticated ? <PrivateTabs /> : <PublicStack />
);

export default AppNavigator;
