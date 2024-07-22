import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for star icon
import { LinearGradient } from 'expo-linear-gradient';

const BooksDetails = ({ navigation }) => {
  const route = useRoute();
  const { id, title, category, rating, price } = route.params;

  const EnableBackHandler = true;

  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/book1.jpg')} style={styles.ItemBackgroundImage}>
        {EnableBackHandler ? (
          <View style={styles.overlayContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name='chevron-back-circle' size={30} color="#000" />
            </TouchableOpacity>
          </View>
        ) : null}
        <LinearGradient
          colors={['#000000', '#808080']} // Black to Gray gradient
          start={[0, 0]}
          end={[1, 1]}
          style={styles.gradientOverlay}
        >
          <View style={styles.textContainer}>
            <View style={styles.contentRow}>
              <View style={styles.textContent}>
                <Text style={styles.bookTitle}>{title || 'Default Title'}</Text>
                <Text style={styles.categoryTitle}>{category || 'Default Category'}</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{`(${rating || 0})`}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{`Price: $${price || 0}`}</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleHeartPress}
                >
                  <FontAwesome
                    name="heart"
                    size={20}
                    color={isFavorite ? "#FFD700" : "#FFFFFF"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => alert('Rate this book!')}
                >
                  <FontAwesome
                    name="star"
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.whiteBackground} />
    </View>
  );
};

export default BooksDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ItemBackgroundImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  backButton: {
    marginTop: 30,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.7,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bookTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 5,
  },
  priceContainer: {
    backgroundColor: '#000', // Black background for price
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 16, // Increase font size for price
    fontWeight: 'bold', // Make price bold
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
