import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';

const BooksDetails = ({ navigation }) => {
  const route = useRoute();
  const { id, title, category, rating, price, description } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [scrollY] = useState(new Animated.Value(0));

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };

  const handleStarPress = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = () => {
    alert(`Rating submitted: ${selectedRating} stars`);
    setModalVisible(false);
  };

  // Interpolating scroll position to adjust background color opacity
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100], // Adjust the range as needed
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
 
      <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name='chevron-back-circle' size={30} color="#000" />
        </TouchableOpacity>
         
      </Animated.View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } 
        )}
      >
        <ImageBackground source={require('../../assets/book1.jpg')} style={styles.ItemBackgroundImage}>
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
                    onPress={() => setModalVisible(true)}
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

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>
            {description || 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.'}
          </Text>
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={styles.commandButtonText}>Commander</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Rating Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Evaluer le livre</Text>
            <View style={styles.starRatingContainer}>
              {[1, 2, 3, 4, 5].map((ratingValue) => (
                <TouchableOpacity
                  key={ratingValue}
                  onPress={() => handleStarPress(ratingValue)}
                >
                  <FontAwesome
                    name="star"
                    size={30}
                    color={ratingValue <= selectedRating ? "#FFD700" : "#CCCCCC"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitRating}
            >
              <Text style={styles.submitButtonText}>Evaluer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BooksDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1, // Ensures header is on top of other content
    backgroundColor: 'rgba(255, 255, 255, 0)', // Initial transparent color
  },
  backButton: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Color for the title
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
    margin: 5,
  },
  descriptionContainer: {
    marginBottom: 20,
    marginLeft: 20, // Move description to the left
    marginRight: 20, // Ensure spacing from the edges
    marginTop: 30, // Add margin to move the title and text down
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10, // Adjust margin to move title down
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify', // Justify the text
  },
  commandButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 10, // Smaller padding for button
    paddingHorizontal: 20, // Smaller padding for button
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Center button horizontally
    marginBottom: 20,
  },
  commandButtonText: {
    color: '#FFFFFF',
    fontSize: 14, // Smaller font size for button
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
