import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { books } from '../../users.json';
import { SIZES, COLORS } from '../../constants/theme';
import reusable from '../Reusable/reusable.style';
import ReusableText from '../Reusable/ReusableText';
import BookItem from '../BookItem'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';

const Nouveautes = () => {
  const navigation = useNavigation();

  const handleBookPress = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  return (
    <View style={styles.container}>
      <View style={[reusable.rowWithSpace('space-between'), { paddingBottom: 20 }]}>
        <ReusableText
          text={'Nouveautes'}
          family={'medium'}
          size={SIZES.large}
          color={COLORS.black}
        />
      </View>

      <FlatList
        data={books}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ columnGap: SIZES.xSmall }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookItem book={item} onPress={() => handleBookPress(item)} />
        )}
      />
    </View>
  );
};

export default Nouveautes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
  },
});
