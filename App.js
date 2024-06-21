import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';

const Loading =()=>{
  <View>

    <ActivityIndicator size={large}/>
  </View>

};
export default function App() {
  return (
    <View style={styles.container}>
    <Onboarding/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
