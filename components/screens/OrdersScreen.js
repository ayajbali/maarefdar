import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import OrderItem from '../OrderItem';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const [quantities, setQuantities] = useState({});
  const navigation = useNavigation();
  const [items, setItems] = useState([
    {
      id: '1',
      bookName: 'Sample Book',
      price: '$10.00',
      coverImg: 'https://example.com/image.jpg'
    }
  ]);
  const [confirmation, setConfirmation] = useState(false);

  const handleIncreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity
    }));
  };

  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price.replace('$', ''));
    return sum + (itemPrice * (quantities[item.id] || 0));
  }, 0);

  const totalBooks = items.reduce((sum, item) => sum + (quantities[item.id] || 0), 0);

  const handlePressCommand = () => {
    setConfirmation(true);
    setTimeout(() => {
      setConfirmation(false);
      navigation.navigate('Historique');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/order.png')}
          style={styles.image}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.itemsContainer}>
          <Text style={styles.headerText}>Confirmer votre commande</Text>
          {items.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              quantity={quantities[item.id] || 0}
              onRemove={() => handleRemove(item.id)}
              onIncrease={() => handleIncreaseQuantity(item.id)}
              onDecrease={() => handleDecreaseQuantity(item.id)}
              onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
              style={styles.orderItem}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <View style={styles.priceAndTitle}>
              <Text style={styles.title}>Nombre des produits:</Text>
              <Text style={styles.text}>{totalBooks}</Text>
            </View>
            {items.length > 0 && (
              <View style={styles.priceAndTitle}>
                <Text style={styles.title}>Prix de livre:</Text>
                <Text style={styles.text}>{items[0].price}</Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.priceContainer}>
            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalTitle}>Grand Total:</Text>
              <Text style={styles.grandTotalText}>{totalPrice.toFixed(2)}$</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.commandButton} onPress={handlePressCommand}>
            <Text style={styles.commandButtonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {confirmation && (
        <View style={styles.confirmationContainer}>
          <FontAwesome name="check-circle" size={50} color="green" />
          <Text style={styles.confirmationText}>Commande Confirmée</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 20,
  },
  safeArea: {
    flex: 1,
    marginTop: -50, 
  },
  itemsContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30, 
    color: COLORS.black,
  },
  orderItem: {
    marginBottom: 20, 
  },
  footer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
    marginTop: 20, 
  },
  priceContainer: {
    marginBottom: 10,
    alignItems: 'center', 
  },
  priceAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  grandTotalTitle: {
    color: COLORS.gray,
    fontSize: 18,
    fontWeight: 'bold',
  },
  grandTotalText: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    marginVertical: 10,
  },
  commandButton: {
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 5,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  commandButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.gray,
    fontSize: 15,
  },
  text: {
    color: COLORS.gray,
    fontSize: 15,
  },
  confirmationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmationText: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
  },
});

export default OrderScreen;
