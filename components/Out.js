import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Out() {
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Out</Text>
      <TouchableOpacity onPress={clearOnboarding} style={styles.button}>
        <Text style={{ color: 'white' }}>Clear Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#00B0FF',
    borderRadius: 100,
    padding: 20,
  },
});
