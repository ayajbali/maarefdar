import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Modal } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import ListBooksItem from '../ListBooksItem';
import ReusableText from '../Reusable/ReusableText';
import reusable from '../Reusable/reusable.style';
import { useNavigation } from '@react-navigation/native';

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
            Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
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

        <ListBooksItem />

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
    backgroundColor: COLORS.secondary,
    padding: SIZES.small,
    borderRadius: SIZES.medium,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: COLORS.primary,
    marginLeft: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: '500',
    fontSize: SIZES.medium,
    marginLeft: 5,
  },
  incrementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontWeight: '500',
    fontSize: SIZES.medium,
    marginHorizontal: 10,
  },
  descriptionWrapper: {
    marginBottom: SIZES.small,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalDetails: {
    width: '100%',
    marginVertical: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  grandTotalText: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
  },
  text: {
    fontSize: SIZES.medium,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginVertical: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
