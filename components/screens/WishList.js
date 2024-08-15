import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLORS, SIZES } from '../../constants/theme'; // Adjust the import based on your project structure

const WishList = ({ navigation }) => {
  const sampleData = [
    { id: 1, name: 'Book 1', price: '12 DT', image: require('../../assets/book1.jpg') },
    { id: 2, name: 'Book 2', price: '15 DT', image: require('../../assets/book1.jpg') },
  ];

  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={styles.bookImage} />
        <View style={styles.cartCardTextContainer}>
          <Text style={styles.cartCardText}>{item.name}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Ajouter au panier</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Favoris</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.cartCount}>
            <Text style={styles.cartNumber}>8</Text>
          </View>
          <TouchableOpacity style={styles.shoppingBagButton} onPress={() => navigation.navigate('FavoriteCard')}>
            <Fontisto name="shopping-bag" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        data={sampleData}
        renderItem={({ item }) => <CartCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bckg, // Updated background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.black, // Updated text color
    fontWeight: 'bold',
  },
  shoppingBagButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32, // Added padding to move the entire list down
  },
  cartCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: COLORS.white, // Assuming card background color
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  bookImage: {
    height: 80,
    width: 80,
    marginRight: 16,
  },
  cartCardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cartCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black, // Updated text color
  },
  priceText: {
    fontSize: 14,
    color: COLORS.gray,
    marginVertical: 4,
  },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: COLORS.primary, // Assuming button background color
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addToCartButtonText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default WishList;
