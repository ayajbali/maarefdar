import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const logo = require('../../assets/Onboarding/Logo.png');

const cities = ['Sousse', 'Sfax', 'Tunis', 'Monastir'];

const ContactScreen = () => {
  const fadeIn = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ou ce trouve nous ?</Text>
      </View>
      <View style={styles.iconRow}>
        {cities.map((city, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            return {
              opacity: fadeIn.value,
              transform: [{ scale: scale.value }],
            };
          });

          const iconBackgroundStyle = city === 'Sousse'
            ? [styles.iconBackground, { backgroundColor: '#004071' }]
            : styles.iconBackground;

          const textStyle = city === 'Sousse'
            ? [styles.text, { color: COLORS.white }]
            : styles.text;

          return (
            <Animated.View key={index} style={[iconBackgroundStyle, animatedStyle]}>
              <View style={styles.iconContainer}>
                <Feather name="map-pin" size={18} color={COLORS.primary} />
              </View>
              <View style={styles.textContainer}>
                <Text style={textStyle}>{city}</Text>
              </View>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Details:</Text>
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
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: SIZES.medium,
  },
  headerText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginBottom: 20,
    textAlign: 'left',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main, // Default background color
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.neutral700, 
  },
});
