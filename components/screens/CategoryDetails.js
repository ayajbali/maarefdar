import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Modal } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import ListBooksItem from '../ListBooksItem';
import ReusableText from '../Reusable/ReusableText';
import reusable from '../Reusable/reusable.style';
import { useNavigation } from '@react-navigation/native';
import AllCategories2 from './AllCategories2';

const { height: screenHeight } = Dimensions.get('window');

const CategoryDetails = () => {
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationSuccess, setConfirmationSuccess] = useState(false); // New state for confirmation
  const navigation = useNavigation();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleOrderConfirmation = () => {
    setModalVisible(true);
  };

  const confirmOrder = () => {
    setConfirmationSuccess(true); // Set success state
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Historique');
    }, 2000); // Show success message for 2 seconds before navigating
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/book1.jpg')} style={styles.image} />
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Category 1</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>20 DT</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name='star' size={20} color='gold' />
            ))}
            <Text style={styles.ratingText}> 4.9</Text>
          </View>

          <View style={styles.incrementRow}>
            <TouchableOpacity onPress={increment}>
              <SimpleLineIcons name='plus' size={16} />
            </TouchableOpacity>
            <Text style={styles.countText}> {count} </Text>
            <TouchableOpacity onPress={decrement}>
              <SimpleLineIcons name='minus' size={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>
            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression...
          </Text>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={styles.iconTextWrapper}>
              <Ionicons name='location-outline' size={18} color={COLORS.primary} />
              <Text style={styles.iconText}> Localisation</Text>
            </View>
            <View style={styles.iconTextWrapper}>
              <MaterialCommunityIcons name='truck-delivery-outline' size={18} color={COLORS.primary} />
              <Text style={styles.iconText}> Livraison</Text>
            </View>
          </View>
        </View>

        <View style={[reusable.rowWithSpace('space-between'), { paddingBottom: 20 }]}>
          <ReusableText
            text={"Livres"}
            family={"bold"}
            size={SIZES.large}
            color={COLORS.black}
          />
          <TouchableOpacity onPress={() => navigation.navigate('AllBooks')}>
            <Feather name="list" size={20} />
          </TouchableOpacity>
        </View>

        {/* Add a wrapper view for AllCategories2 */}
        <View style={styles.allCategoriesContainer}>
          <AllCategories2 />
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={handleOrderConfirmation} style={styles.cartBtn}>
            <Text style={styles.cartTitles}> Commander toute la categorie </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {confirmationSuccess ? (
              <MaterialCommunityIcons name="check-circle" size={60} color="green" />
            ) : (
              <MaterialCommunityIcons name="cart-outline" size={60} color={COLORS.primary} />
            )}
            <Text style={styles.modalTitle}>
              {confirmationSuccess ? "Commande Confirmée!" : "Confirmation de commande"}
            </Text>

            <View style={styles.modalDetails}>
              <View style={styles.priceContainer}>
                <Text style={styles.text}>Nombre des livres:</Text>
                <Text style={styles.text}>10</Text>
              </View>

              <View style={styles.divider} />

              <View style={[styles.priceContainer, { marginTop: SIZES.medium }]}>
                <Text style={styles.grandTotalText}>Grand Total:</Text>
                <Text style={styles.grandTotalText}>200 DT</Text>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    height: screenHeight / 2,
    width: '100%',
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xxLarge + 10,
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 999,
  },
  cartRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: SIZES.width - 44,
  },
  cartBtn: {
    backgroundColor: COLORS.black,
    padding: SIZES.medium,
    borderRadius: SIZES.large,
  },
  cartTitles: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    borderTopLeftRadius: SIZES.large,
    borderTopRightRadius: SIZES.large,
    padding: 20,
    marginTop: -SIZES.large,
    overflow: 'hidden',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  price: {
    paddingHorizontal: 10,
    fontWeight: '500',
    fontSize: SIZES.large,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    padding: 10,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    marginLeft: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: SIZES.small,
    marginLeft: 5,
  },
  incrementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  countText: {
    marginHorizontal: 10,
  },
  descriptionWrapper: {
    marginVertical: SIZES.medium,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
  allCategoriesContainer: {
    marginVertical: SIZES.medium,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalDetails: {
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SIZES.small,
  },
  text: {
    fontSize: SIZES.medium,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.gray,
    marginVertical: SIZES.small,
  },
  grandTotalText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: SIZES.medium,
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: SIZES.medium,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});
