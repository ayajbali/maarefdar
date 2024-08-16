import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather, FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import FavoriteCardItem from '../FavoriteCardItem';
import { useBooks } from '../../context/books';
import { useNavigation } from '@react-navigation/native';
import EmptyCartImage from '../../assets/EmptyCart.png';

const FavoriteCard = () => {
  const navigation = useNavigation();
  const { wishlist, removeFromWishlist, setIsFavorite, isFavorite,passerCommande } = useBooks();
  const [quantities, setQuantities] = useState(
    wishlist.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      wishlist.forEach(item => {
        total += item.price * quantities[item.id];
      });
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [quantities, wishlist]);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setIsFavorite(false);
  };

  const handleIncreaseQuantity = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities, [id]: prevQuantities[id] + 1 };
      if (newQuantities[id] > 10) {
        Alert.alert(
          "Attention",
          "Ecrivez la quantitez que vous souhaite comander",
          [
            {
              text: "Enregistrer",
              onPress: () => {
                // Logic to save the desired quantity
              }
            }
          ],
          { cancelable: true }
        );
        return prevQuantities; // Keep previous quantities if limit is reached
      }
      return newQuantities;
    });
  };

  const handleDecreaseQuantity = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities, [id]: Math.max(1, prevQuantities[id] - 1) };
      return newQuantities;
    });
  };

  const handlePressCommand = async () => {
    Alert.alert(
      "Confirmation",
      "Vous confirmez la commande?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Confirmer",
          onPress: async () => {
            setOrderConfirmed(true);
            setConfirmationVisible(true);
  
            const orderData = wishlist.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: quantities[item.id],
            }));
  
            try {
              await passerCommande({ items: orderData, total: totalPrice });
              console.log("Commande créée avec succès");
  
              setQuantities((prevQuantities) => {
                const clearedQuantities = Object.keys(prevQuantities).reduce((acc, key) => ({ ...acc, [key]: 1 }), {});
                return clearedQuantities;
              });
              wishlist.forEach(item => removeFromWishlist(item.id));
              setTimeout(() => setConfirmationVisible(false), 3000);
            } catch (error) {
              console.error('Error creating command:', error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={24} color={COLORS.gray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Panier</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{wishlist.length}</Text>
            </View>
            <TouchableOpacity style={styles.shoppingBagButton} onPress={() => navigation.navigate('FavoriteCard')}>
              <Fontisto name="shopping-bag" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={24} style={styles.searchIcon} />
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=""
              onPressIn={() => { }}
              placeholder="Qu'est ce que vous cherchez?"
            />
          </View>
        </View>

        {confirmationVisible && (
          <View style={styles.confirmationContainer}>
            <Entypo name="check" size={40} color="green" />
            <Text style={styles.confirmationText}>Commande Confirmée!</Text>
          </View>
        )}

        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <FavoriteCardItem
              key={item.id}
              item={item}
              quantity={quantities[item.id]}
              onRemove={() => handleRemove(item.id)}
              onIncrease={() => handleIncreaseQuantity(item.id)}
              onDecrease={() => handleDecreaseQuantity(item.id)}
              onUpdateQuantity={() => { }}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Image source={EmptyCartImage} style={styles.emptyImage} />
            <Text style={styles.emptyCartText}>Votre liste est vide</Text>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <View style={styles.priceAndTitle}>
              <Text style={styles.title}>Nombre des produits:</Text>
              <Text style={styles.text}>{wishlist.length}</Text>
            </View>
            <View style={styles.priceAndTitle}>
              <Text style={styles.title}>Nombre des livres:</Text>
              <Text style={styles.text}>{totalPrice.toFixed(2)}$</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceContainer}>
            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalTitle}>Grand Total:</Text>
              <Text style={styles.grandTotalText}>{totalPrice.toFixed(2)}$</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.commandButton} onPress={handlePressCommand}>
            <Text style={styles.commandButtonText}>Commander</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SIZES.large,
    marginTop: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 40,
    paddingHorizontal: SIZES.small,
    width: '90%',
  },
  searchIcon: {
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
  },
  priceContainer: {
    marginTop: 40,
    width: '90%',
  },
  priceAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  title: {
    color: COLORS.gray,
    fontSize: 15,
  },
  text: {
    color: COLORS.gray,
    fontSize: 15,
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: -30,
  },
  grandTotalTitle: {
    color: COLORS.gray,
    fontSize: 15,
  },
  grandTotalText: {
    color: COLORS.gray,
    fontSize: 15,
  },
  divider: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginVertical: 30,
    width: '90%',
  },
  commandButton: {
    backgroundColor: COLORS.black,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
    borderRadius: SIZES.medium,
    alignItems: 'center',
    marginBottom: 30,
  },
  commandButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  confirmationContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  confirmationText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 20,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default FavoriteCard;
