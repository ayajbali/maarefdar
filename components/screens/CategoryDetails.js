import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import ListBooksItem from '../ListBooksItem';
import { Feather } from '@expo/vector-icons';
import ReusableText from '../Reusable/ReusableText'
import reusable from '../Reusable/reusable.style';
const { height: screenHeight } = Dimensions.get('window');

const CategoryDetails = ({ navigation }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/book1.jpg')} style={styles.image} />
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='heart' size={30} color={COLORS.primary} />
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
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name='plus' size={16} />
            </TouchableOpacity>
            <Text style={styles.countText}> {count} </Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name='minus' size={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</Text>
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

        <TouchableOpacity onPress={() => {}}>
          <Feather name="list" size={20} />
        </TouchableOpacity>
      </View>

       <ListBooksItem/>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitles}> Commander toute la categorie  </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop: -SIZES.large, // Ensure the white section overlaps the image
    overflow: 'hidden', // Ensure the rounded corners are visible
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small, // Space between title and rating
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
    borderRadius: SIZES.small,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: SIZES.small - 2,
    marginLeft: SIZES.small / 2,
  },
  cartTitles: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium, // Space between rating and description
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: SIZES.small,
    fontSize: SIZES.small,
    marginHorizontal: SIZES.xsmall,
  },
  incrementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginHorizontal: SIZES.small,
    fontSize: SIZES.small,
  },
  descriptionWrapper: {
    marginTop: SIZES.medium, // Space between rating and description
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
  },
  descriptionText: {
    marginTop: SIZES.small,
    fontSize: SIZES.small,
    textAlign: "justify",
    color: COLORS.darkGray,
  },
});
