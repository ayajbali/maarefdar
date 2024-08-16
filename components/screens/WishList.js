import React, { useState } from 'react';
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
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
      setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={styles.bookImage} />
        <View style={styles.cartCardTextContainer}>
          <View style={styles.nameAndQuantityContainer}>
            <Text style={styles.cartCardText}>{item.name}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity}>
                <FontAwesome name="minus-circle" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity}>
                <FontAwesome name="plus-circle" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: COLORS.bckg,
    marginTop: 30,
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
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    flex: 1,
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
  backButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZES.small,
    padding: 5,
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
    paddingTop: 32, 
  },
  cartCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: COLORS.white,
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
  nameAndQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
  },
  quantityContainer: {
    top:20,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: COLORS.gray,
  borderRadius: 8,
  paddingHorizontal: 8,
  paddingVertical: 4,
  width: 80, // Set a specific width
},

  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    color: COLORS.black,
  },
  priceText: {
    fontSize: 14,
    color: COLORS.gray,
    marginVertical: 4,
    top:-5,
  },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: COLORS.primary,
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
