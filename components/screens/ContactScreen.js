import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import contactData from '../../users.json';

const logo = require('../../assets/Onboarding/Logo.png');

const cities = ['Sousse', 'Sfax', 'Tunis', 'Monastir'];
const rectangles = [
  { icon: <Feather name="map-pin" size={18} />, label: 'Localisation', color: COLORS.red },
  { icon: <MaterialIcons name="email" size={18} />, label: 'Mail', color: COLORS.blue },
  { icon: <FontAwesome name="phone" size={18} />, label: 'Phone', color: COLORS.green },
  { icon: <Feather name="activity" size={18} />, label: 'Activities', color: COLORS.orange }
];

const ContactScreen = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [detailsText, setDetailsText] = useState({});
  const fadeIn = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1000 });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const cityDetails = contactData.contact.find(contact => contact.city === selectedCity);
      const newDetailsText = rectangles.reduce((acc, rectangle) => {
        acc[rectangle.label] = cityDetails ? cityDetails[rectangle.label] : '';
        return acc;
      }, {});
      setDetailsText(newDetailsText);
    }
  }, [selectedCity]);

  const renderItem = ({ item }) => {
    const isSelected = detailsText[item.label] !== undefined;

    return (
      <Animatable.View
        animation="zoomInUp"
        duration={3000}
        style={styles.rectangle}
      >
        <View style={styles.rectangleIconContainer}>
          {React.cloneElement(item.icon, { color: item.color })}
        </View>
        <View style={styles.rectangleContent}>
          <Text style={styles.rectangleText}>{item.label}</Text>
          {isSelected && <Text style={styles.detailsText}>{detailsText[item.label]}</Text>}
        </View>
      </Animatable.View>
    );
  };

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
          const isSelected = city === selectedCity;

          const animatedStyle = useAnimatedStyle(() => {
            return {
              opacity: fadeIn.value,
              transform: [{ scale: scale.value }],
            };
          });

          const iconBackgroundStyle = isSelected
            ? [styles.iconBackground, { backgroundColor: COLORS.primary }]
            : [styles.iconBackground, { backgroundColor: COLORS.main }];

          const textStyle = isSelected
            ? [styles.text, { color: COLORS.white }]
            : [styles.text, { color: COLORS.neutral700 }];

          return (
            <TouchableOpacity key={index} onPress={() => setSelectedCity(city)}>
              <Animated.View style={[iconBackgroundStyle, animatedStyle]}>
                <View style={styles.iconContainer}>
                  <Feather name="map-pin" size={18} color={COLORS.primary} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={textStyle}>{city}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>Details:</Text>
      </View>

      <FlatList
        data={rectangles}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.rectanglesContainer}
      />

      {/* Additional title and paragraph */}
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.additionalTitle}>Maison d'édition & Distribution Depuis 1976</Text>
        <Text style={styles.additionalParagraph}>
          Dar El Maaref Edition Diffusion est une maison d'édition tunisienne dévouée à la production de livres culturels, avec un accent particulier sur les ouvrages pour enfants, jeunes et les encyclopédies scientifiques.
        </Text>
        <View style={styles.rectangleUnderText} />
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.gray,
    textAlign: 'left',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 8,
    marginHorizontal: 5,
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  text: {
    fontSize: SIZES.xSmall,
    fontWeight: 'bold',
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: SIZES.medium,
    marginTop: 20,
  },
  rectanglesContainer: {
    width: '100%',
    paddingHorizontal: SIZES.medium,
    marginTop: 30,
    marginBottom: 0,
  },
  row: {
    justifyContent: 'space-between',
  },
  rectangle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.main,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '48%',
    marginHorizontal: '1%',
    backgroundColor: 'transparent',
  },
  rectangleIconContainer: {
    marginRight: 10,
  },
  rectangleContent: {
    flex: 1,
    justifyContent: 'center',
  },
  rectangleText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: SIZES.extraSmall,
    color: COLORS.gray,
    marginTop: 8,
    marginLeft: -20,
    marginBottom: 8,
  },
  additionalInfoContainer: {
    width: '100%',
    paddingHorizontal: SIZES.medium,
    marginTop: 20,
    alignItems: 'flex-start', // Align items to the left
  },
  additionalTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'left', // Align text to the left
    marginBottom: 10,
  },
  additionalParagraph: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    textAlign: 'left', // Align text to the left
  },
  rectangleUnderText: {
    width: '100%',
    borderColor: COLORS.main,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    height: 200, // Adjust height as needed
    marginTop: 20,
  },
});
