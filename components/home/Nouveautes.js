import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { books, categories } from '../../users.json'; // Ensure the path is correct
import { SIZES, COLORS } from '../../constants/theme';
import reusable from '../Reusable/reusable.style';
import ReusableText from '../Reusable/ReusableText';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import HeightSpacer from '../Reusable/HeightSpacer';
import BookItem from '../BookItem';

const Nouveautes = () => {
  const navigation = useNavigation();

  const handleBookPress = (book) => {
    const category = categories.find((cat) => cat.id === book.categoryId);
    const categoryName = category ? category.name : 'Unknown';
    console.log('Navigating with book data:', book, 'Category:', categoryName);
    navigation.navigate('BooksDetails', { 
      id: book.id, 
      title: book.bookName, 
      category: categoryName, 
      rating: book.rating, 
      price: book.price 
    });
  };

  const renderItem = ({ item }) => {
    const category = categories.find((cat) => cat.id === item.categoryId);
    const categoryName = category ? category.name : 'Unknown';

    return (
      <BookItem book={item} category={categoryName} onPress={() => handleBookPress(item)} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}>
        <ReusableText
          text={"Nouveautes"}
          family={"medium"}
          size={SIZES.large}
          color={COLORS.black}
        />
        
      </View>
      <HeightSpacer height={10} />
      <FlatList
        data={books}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ columnGap: SIZES.xSmall }}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
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
