import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants/theme';
import HeightSpacer from './Reusable/HeightSpacer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ item, margin, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card(margin)} onPress={onPress}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/book1.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <HeightSpacer height={5} />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>Category1</Text>
          <Text style={styles.gender} numberOfLines={1}>Category2</Text>
          <Text style={styles.price} numberOfLines={1}>20DT</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle" size={30} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  card: (margin) => ({
    width: (SIZES.width - (SIZES.medium * 3)) / 2, // Adjust width for 2 columns with margin
    height: 280,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    margin: SIZES.medium / 2, // Set margin equally for all sides
  }),
  imageContainer: {
    alignItems: "center",
    height: '66%',
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 2,
  },
  gender: {
    fontWeight: '500',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
