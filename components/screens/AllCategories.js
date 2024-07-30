import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import CategoryItem from '../CategoryItem';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../../users.json';

const AllCategories = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-circle" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Toute les categories</Text>
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            margin={20}
            onPress={() => navigation.navigate('CategoryDetails', { categoryId: item.id })}
          />
        )}
      />
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  
  },
  backButton: {
    marginLeft: SIZES.medium,  
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,  
    textAlign: 'center',  
    flex: 1,  
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: SIZES.medium,
  },
  listContent: {
    paddingTop: SIZES.xxLarge,  
  },
});
