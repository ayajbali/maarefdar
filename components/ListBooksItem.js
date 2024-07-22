import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants/theme';
import booksData from '../users.json';  
import BookCard from './BookCard';

const ListBooksItem = () => {
  const { books } = booksData;

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={({ item }) => <BookCard   />}
        keyExtractor={(item) => item.id.toString()} // Make sure each book has a unique id
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ListBooksItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.medium,
  },
  listContainer: {
    paddingHorizontal: SIZES.small,
  },
});
