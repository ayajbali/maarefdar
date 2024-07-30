import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme'; // Make sure to adjust the import path to your theme file
import { Feather } from '@expo/vector-icons'; // Adjust import path for ClockIcon

const logo = require('../../assets/Onboarding/Logo.png'); // Replace with the path to your logo image

const ContactScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.iconRow}>
        <View style={styles.iconBackground}>
          <View style={styles.iconContainer}>
            <Feather name="clock" size={18} color='#525252' />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Adjust this value to move the logo down
    marginBottom: 100,
  },
  logo: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconBackground: {
    borderRadius: 50,
    backgroundColor: COLORS.amber300, // Adjust the color as per your COLORS file
    padding: 10, // Adjust as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 50, // Adjust as needed
    width: 50, // Adjust as needed
    backgroundColor: COLORS.white, // Adjust the color as per your COLORS file
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
