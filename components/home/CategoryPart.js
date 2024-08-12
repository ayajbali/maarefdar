import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import reusable from '../Reusable/reusable.style';
import { COLORS, SIZES } from '../../constants/theme';
import ReusableText from '../Reusable/ReusableText';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../../users.json';
import CategoryItem from '../CategoryItem';

const CategoryPart = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const filterCategories = (language) => {
    if (language === 'All') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category => category.language === language);
      setFilteredCategories(filtered);
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    filterCategories(language);
  };

  return (
    <View style={styles.container}>
      <View style={[reusable.rowWithSpace('space-between'), { paddingBottom: 20 }]}>
        <ReusableText
          text={"Nos Categories"}
          family={"medium"}
          size={SIZES.large}
          color={COLORS.black}
        />

        <TouchableOpacity onPress={() => navigation.navigate('AllCategories2')}>
          <Feather name="list" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.languageFilterContainer}>
        <TouchableOpacity
          style={[styles.languageCircle, selectedLanguage === 'All' ? styles.selectedCircle : null]}
          onPress={() => handleLanguageChange('All')}
        />
        <TouchableOpacity
          style={[styles.languageCircle, selectedLanguage === 'Arabic' ? styles.selectedCircle : null]}
          onPress={() => handleLanguageChange('Arabic')}
        />
        <TouchableOpacity
          style={[styles.languageCircle, selectedLanguage === 'French' ? styles.selectedCircle : null]}
          onPress={() => handleLanguageChange('French')}
        />
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: SIZES.medium }}
        renderItem={({ item }) => (
          <CategoryItem item={item} margin={10} onPress={() => navigation.navigate('CategoryDetails', { categoryId: item.id })} />
        )}
      />
    </View>
  );
};

export default CategoryPart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
  },
  languageFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  languageCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.black,
    marginHorizontal: 5,
  },
  selectedCircle: {
    backgroundColor: COLORS.gray,
  },
});
