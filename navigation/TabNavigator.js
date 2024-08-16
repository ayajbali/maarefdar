import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import Onboarding from "../components/Onboarding";
import LoginScreen from "../components/screens/LoginScreen";
import SignupScreen from "../components/screens/SignupScreen";
import HomeScreen from "../components/screens/HomePage";
import ProfileScreen from "../components/screens/ProfileScreen";
import EditProfileScreen from "../components/screens/EditProfileScreen";
import CategoryPart from '../components/home/CategoryPart';
import BooksDetails from '../components/screens/BooksDetails';
import Nouveautes from '../components/home/Nouveautes';
import CategoryDetails from '../components/screens/CategoryDetails';
import AllCategories from '../components/screens/AllCategories';
import FavoriteCard from '../components/screens/FavoriteCard';
import Historique from '../components/screens/Historique';
import OrderScreen from '../components/screens/OrdersScreen';
import ContactScreen from '../components/screens/ContactScreen';
import AllBooks from '../components/screens/AllBooks';
import AllCategories2 from '../components/screens/AllCategories2';
import WishList from '../components/screens/WishList';
import Chat from '../components/screens/Chat';

// Create Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PrivateTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="WishList" component={WishList} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Contact" component={ContactScreen} />

  </Tab.Navigator>
);

const PublicStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const PrivateStack = () => (
<>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={PrivateTabs} />
    <Stack.Screen name="Category" component={CategoryPart} />
    <Stack.Screen name="Nouveautes" component={Nouveautes} />
    <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
    <Stack.Screen name="BooksDetails" component={BooksDetails} />
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <Stack.Screen name="AllCategories" component={AllCategories} />
    <Stack.Screen name="OrderScreen" component={OrderScreen} />
    <Stack.Screen name="Historique" component={Historique} />
    <Stack.Screen name="Contact" component={ContactScreen}  />
    <Stack.Screen name="AllBooks" component={AllBooks}  />
    <Stack.Screen name="AllCategories2" component={AllCategories2}  />
    <Stack.Screen name="Chat" component={Chat}  />


  </Stack.Navigator>
  </>
);

const AppNavigator = ({ isAuthenticated }) => (
  <NavigationContainer>
    {isAuthenticated ? <PrivateStack /> : <PublicStack />}
  </NavigationContainer>
);

export default AppNavigator;
