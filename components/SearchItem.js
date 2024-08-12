import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';

const SearchItem = ({ book }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('BooksDetails', { bookId: book.id });
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
      <Text style={styles.bookTitle}>{book.name}</Text>
      <Text style={styles.bookPrice}>${book.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.small,
    borderColor: COLORS.main,
    borderWidth: 1,
    width: '90%',
    height: '100%', 
  

  },
  bookTitle: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  bookPrice: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
});

export default SearchItem;
