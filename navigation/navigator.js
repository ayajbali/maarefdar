
// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from "../components/Onboarding"
import LoginScreen from "../components/screens/LoginScreen"
import SignupScreen from "../components/screens/SignupScreen"
import HomeScreen from "../components/screens/HomePage"
import ProfileScreen from "../components/screens/ProfileScreen"
 import EditProfileScreen from "../components/screens/EditProfileScreen"
 import { useNavigation } from '@react-navigation/native';
import CategoryPart from '../components/home/CategoryPart';
import BooksDetails from '../components/screens/BooksDetails';
import Nouveautes from '../components/home/Nouveautes';
import CategoryDetails from '../components/screens/CategoryDetails';
import AllCategories from '../components/screens/AllCategories';
import FavoriteCard from '../components/screens/FavoriteCard';
import Historique from '../components/screens/Historique';
import ContactScreen from '../components/screens/ContactScreen';
import AllBooks from '../components/screens/AllBooks';
import AllCategories2 from '../components/screens/AllCategories2';
const Stack = createStackNavigator();


 export const navigator = () => (
    <Stack.Navigator  screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="Onboarding" component={Onboarding}  headerShown ={false} />
      <Stack.Screen name="Login" component={LoginScreen}  headerShown ={false} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Category" component={CategoryPart} />
      <Stack.Screen name="Nouveautes" component={Nouveautes} />
      <Stack.Screen name="Home" component={HomeScreen}  headerShown ={false}/>
      <Stack.Screen name="Profile" component={ProfileScreen}  headerShown ={false}/>
      <Stack.Screen name="CategoryDetails" component={CategoryDetails}  />
      <Stack.Screen name="BooksDetails" component={BooksDetails}  />
      <Stack.Screen name="EditScreen" component={EditProfileScreen}  />
      <Stack.Screen name="AllCategories" component={AllCategories}  />
      <Stack.Screen name="FavoriteCard" component={FavoriteCard}  />
      <Stack.Screen name="Historique" component={Historique}  />
      <Stack.Screen name="Contact" component={ContactScreen}  />
      <Stack.Screen name="AllBooks" component={AllBooks}  />
      <Stack.Screen name="AllCategories2" component={AllCategories2}  />


    </Stack.Navigator>
  );
  