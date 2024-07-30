import { Image, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const FavoriteCardItem = ({ item, quantity, onIncrease, onDecrease, onUpdateQuantity, onRemove }) => {
  const { bookName, price, coverImg } = item;
  const [inputQuantity, setInputQuantity] = useState(quantity);
  const [modalVisible, setModalVisible] = useState(false);

  const handleIncrease = () => {
    if (quantity >= 10) {
      setModalVisible(true);
    } else {
      onIncrease();
    }
  };

  const handleSaveQuantity = () => {
    if (Number(inputQuantity) > 0) {
      onUpdateQuantity(Number(inputQuantity));
      setModalVisible(false);
    } else {
      Alert.alert("Invalid Quantity", "Please enter a valid quantity.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: coverImg }} style={styles.image} />
      <View style={styles.itemInformations}>
        <Text style={styles.bookName}>{bookName}</Text>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.actionContainer}>
          <View style={styles.addToCart}>
            <TouchableOpacity style={styles.buttonIcon} onPress={onDecrease}>
              <Feather name="minus" size={16} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.itemCount}>{quantity}</Text>
            <TouchableOpacity style={styles.buttonIcon} onPress={handleIncrease}>
              <Feather name="plus" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.basketButton} onPress={onRemove}>
            <FontAwesome name="shopping-basket" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Ecrivez la quantite</Text>
            <TextInput
              style={styles.modalTextInput}
              keyboardType="numeric"
              onChangeText={(text) => setInputQuantity(text)}
              value={String(inputQuantity)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveQuantity}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    paddingHorizontal: 10,
    height: 100,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZES.small,
    marginVertical: 5,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '30%',
    height: '100%',
    borderRadius: SIZES.small,
  },
  itemInformations: {
    flex: 1,
    marginLeft: 10,
  },
  bookName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  price: {
    fontSize: 14,
    color: COLORS.gray,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  addToCart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderRadius: SIZES.small,
    padding: 5,
    paddingHorizontal: 10,
  },
  buttonIcon: {
    marginHorizontal: 5,
  },
  itemCount: {
    fontSize: 16,
    color: COLORS.white,
    marginHorizontal: 10,
  },
  basketButton: {
    backgroundColor: 'red',
    borderRadius: SIZES.small,
    padding: 5,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%', // Adjust width if needed
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: 'black', // Add border for debugging
    borderWidth: 2, // Add border width for debugging
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: SIZES.medium,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: COLORS.black,
    borderRadius: SIZES.small,
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default FavoriteCardItem;