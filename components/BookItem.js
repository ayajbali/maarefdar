import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { AntDesign } from '@expo/vector-icons'; // Use AntDesign for filled heart icon
import { useBooks } from '../context/books';

const BookItem = ({ book, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Initialize isFavorite state locally
  const { addToWishlist, removeFromWishlist, wishlist } = useBooks();

  useEffect(() => {
    // Check if the book is already in the wishlist when the component mounts
    const isBookFavorite = wishlist.some(item => item.id === book.id);
    setIsFavorite(isBookFavorite);
  }, [wishlist, book.id]);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleHeartPress = () => {
    if (isFavorite) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
    setIsFavorite(!isFavorite);  
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.container, isPressed && styles.containerPressed]}>
        <Image source={{ uri: book.coverImg }} style={styles.bookCover} />
        <View style={styles.infoContainer}>
          <Text style={[styles.bookTitle, isPressed && styles.textPressed]}>{book.bookName}</Text>
          <Text style={[styles.categoryName, isPressed && styles.textPressed, styles.categoryMargin]}>{book.categoryId}</Text>
          <View style={styles.bottomRow}>
            <Text style={[styles.price, isPressed && styles.textPressed]}>${book.price}</Text>
            <TouchableOpacity onPress={handleHeartPress}>
              <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color={isFavorite ? COLORS.red : (isPressed ? COLORS.white : COLORS.primary)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: SIZES.base,
    marginHorizontal: SIZES.small,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
    elevation: 4,
    width: 240, // Adjust width as needed
    height: 120, // Adjust height as needed
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
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  categoryName: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  categoryMargin: {
    marginBottom: 20, 
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10, 
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
