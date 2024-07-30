import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { COLORS, SIZES } from '../constants/theme';
import booksData from '../users.json';
import BookCard from './BookCard';

const ListBooksItem = () => {
  const { books } = booksData;
  const navigation = useNavigation(); // Access navigation using the hook

  const renderItem = ({ item }) => (
    <BookCard
      book={item}
      onPress={() => navigation.navigate('BooksDetails', { id: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    marginTop: SIZES.xsmall,
  },
  listContainer: {
    paddingHorizontal: SIZES.small,
    paddingBottom: SIZES.large, // Add padding at the bottom to accommodate last item visibility
  },
});
