import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants/theme';
import HeightSpacer from './Reusable/HeightSpacer';
import ReusableText from './Reusable/ReusableText';

const CategoryItem = ({ item, margin, onPress }) => {
  return (
    <TouchableOpacity style={styles.card(margin)} onPress={onPress}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <HeightSpacer height={5} />
        <View style={{ padding: 10 }}>
          <ReusableText
            text={item.name}
            family={'medium'}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={5} />
          <ReusableText
            text={`${item.numberOfBooks} books`}
            family={'medium'}
            size={SIZES.medium}
            color={COLORS.gray}
          />
          <HeightSpacer height={5} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  card: (margin) => ({
    width: SIZES.width / 2.2,
    height: 250,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    margin: margin,
  }),
  imageContainer: {
    alignItems: "center",
    margin: 10,
    height: 150,
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: 16,
  },
});
