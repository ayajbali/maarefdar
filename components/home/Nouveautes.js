import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { books } from '../../users.json';
import { SIZES, COLORS } from '../../constants/theme';
import reusable from '../Reusable/reusable.style';
import ReusableText from '../Reusable/ReusableText';
import BookItem from '../BookItem'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons'
import HeightSpacer from '../Reusable/HeightSpacer';

const Nouveautes = () => {
  const navigation = useNavigation();

  const handleBookPress = (book) => {
    navigation.navigate('BooksDetails', { id: book.id });
  };

  return (
    <View style={styles.container}>
      <View style={[reusable.rowWithSpace("space-between"), {paddingBottom:20}]}>
      < ReusableText
      text ={"Nouveautes"}
      family={"medium"}
      size={SIZES.large}
      color={COLORS.black}
      />
      
      <TouchableOpacity onPress={() =>{}}>
        <Feather name="list" size={20}/>
      </TouchableOpacity>
     
     
     <FlatList/>
     </View>
     <HeightSpacer height={10} />
      <FlatList
        data={books}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ columnGap: SIZES.xSmall }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookItem book={item} onPress={() => navigation.navigate('BooksDetails')} />
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
