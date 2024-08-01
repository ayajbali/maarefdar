import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

const booksData = [
  {
    id: '1',
    title: 'Book 1',
    category: 'Category 1',
    image: require('../../assets/book1.jpg'),  
    quantity: 2,
    date: '15/07/24',
  },
  {
    id: '2',
    title: 'Book 2',
    category: 'Category 2',
    image: require('../../assets/book1.jpg'), // Replace with actual image source
    quantity: 1,
    date: '20/07/24',
  },
];

const HistoriqueCard = ({ item, onRemove }) => {
  return (
    <View style={styles.cartCard}>
      <Image source={item.image} style={styles.bookImage} />
      <View style={styles.textContainer}>
        <View style={styles.bookInfo}>
          <View>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookCategory}>{item.category}</Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <MaterialCommunityIcons name='truck-delivery-outline' size={24} color={COLORS.red} />
          </View>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => onRemove(item.id)}>
        <FontAwesome name="trash" size={15} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const EmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <Image source={require('../../assets/EmptyCart.png')} style={styles.emptyImage} /> {/* Replace with actual image source */}
    <Text style={styles.emptyText}>Aucune commande</Text>
  </View>
);

const Historique = ({ navigation }) => {
  const [books, setBooks] = useState(booksData);
  const wishlist = [];

  const handleRemoveItem = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historique</Text>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.cartCount}>
            <Text style={styles.cartNumber}>{wishlist.length}</Text>
          </View>
          <TouchableOpacity style={styles.shoppingBagButton} onPress={() => navigation.navigate('FavoriteCard')}>
            <Fontisto name="shopping-bag" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={books}
          renderItem={({ item }) => <HistoriqueCard item={item} onRemove={handleRemoveItem} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Historique;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  backButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZES.small,
    padding: 5,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    flex: 1,
  },
  shoppingBagButton: {
    backgroundColor: COLORS.orange,
    borderRadius: SIZES.small,
    padding: 5,
  },
  cartCount: {
    position: 'absolute',
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: 'regular',
    fontWeight: '600',
    fontSize: SIZES.small,
    color: COLORS.lightWhite,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  bookImage: {
    height: 80,
    width: 80,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookCategory: {
    fontSize: 14,
    color: COLORS.gray,
  },
  orderInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  deleteIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    backgroundColor: COLORS.black,
    borderRadius: 12,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
});
