import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { AntDesign ,FontAwesome } from '@expo/vector-icons';

const BookCard = ({ book, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
       <Animated.View style={[styles.container, isPressed && styles.containerPressed]}>
        <Image source={{ uri: book.coverImg }} style={styles.bookCover} />
        <View style={styles.infoContainer}>
          <Text style={[styles.bookTitle, isPressed && styles.textPressed]}>{book.bookName}</Text>
          <Text style={[styles.ageRestriction, isPressed && styles.textPressed]}>{book.ageRestriction}</Text>
          <View style={styles.bottomRow}>
            <Text style={[styles.price, isPressed && styles.textPressed]}>${book.price}</Text>
            <TouchableOpacity onPress={handleHeartPress}>
              <FontAwesome
                name="plus" // Name of the icon
                size={24} // Size of the icon
                color={isPressed ? COLORS.red : COLORS.primary} // Conditional color based on state
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: SIZES.small,  
    marginHorizontal: 0,  
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
    elevation: 4,
    width: '100%',  
    height: 100,
  },
  containerPressed: {
    backgroundColor: COLORS.primary,
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: SIZES.small,
  },
  bookTitle: {
    fontSize: SIZES.small, 
    fontWeight: 'bold',
    color: COLORS.black,
  },
  ageRestriction: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: SIZES.base,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  price: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  textPressed: {
    color: COLORS.white,
  },
});
