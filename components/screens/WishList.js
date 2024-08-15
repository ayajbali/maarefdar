import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants/theme';

const WishList = () => {
  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
        </View>
      </View>
    );
  };

  const sampleData = [
    { id: 1, name: 'Book 1', image: require('../../assets/book1.jpg') },
    { id: 2, name: 'Book 2', image: require('../../assets/book1.jpg') },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Favoris</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={sampleData}
        renderItem={({ item }) => <CartCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default WishList;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Adds margin between cards
  },
});
