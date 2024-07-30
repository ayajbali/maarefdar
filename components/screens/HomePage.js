import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import styles from '../styles/Home.style';
import WelcomeScreen from '../home/Welcome';
import Nouveautes from '../home/Nouveautes';
import HeightSpacer from '../Reusable/HeightSpacer';
import CategoryPart from '../home/CategoryPart';
import { useBooks } from '../../context/books'; // Import the context
import { useNavigation } from '@react-navigation/native';
import CitySelectModal from '../CitySelectModal'; // Adjust path as necessary

export default function HomePage() {
  const navigation = useNavigation();
  const { wishlist } = useBooks();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { label: 'Tunis', value: 'Tunis' },
    { label: 'Sousse', value: 'Sousse' },
    { label: 'Sfax', value: 'Sfax' },
    { label: 'Kairouan', value: 'Kairouan' },
    { label: 'Bizerte', value: 'Bizerte' },
    { label: 'Medenine', value: 'Medenine' },
    { label: 'Gabès', value: 'Gabès' },
    { label: 'Gafsa', value: 'Gafsa' },
    { label: 'Kasserine', value: 'Kasserine' },
    { label: 'Jendouba', value: 'Jendouba' },
    { label: 'Siliana', value: 'Siliana' },
    { label: 'Le Kef', value: 'Le Kef' },
    { label: 'Zaghouan', value: 'Zaghouan' },
    { label: 'Manouba', value: 'Manouba' },
    { label: 'Ariana', value: 'Ariana' },
    { label: 'Ben Arous', value: 'Ben Arous' },
    { label: 'Nabeul', value: 'Nabeul' },
    { label: 'Sidi Bouzid', value: 'Sidi Bouzid' },
    { label: 'Tataouine', value: 'Tataouine' },
    { label: 'Tozeur', value: 'Tozeur' },
    { label: 'Kébili', value: 'Kébili' },
    { label: 'El Kef', value: 'El Kef' },
    { label: 'Hammamet', value: 'Hammamet' },
    { label: 'Mahdia', value: 'Mahdia' },
  ];

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name='location-outline' size={24} />
          </TouchableOpacity>

          <Text style={styles.location}>
            {selectedCity ? `${selectedCity}, Tunisie` : 'Sousse, Tunisie'}
          </Text>

          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{wishlist.length.toString()}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('FavoriteCard')}>
              <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <WelcomeScreen />
        <HeightSpacer height={10} />
        <Nouveautes />
        <HeightSpacer height={10} />
        <CategoryPart />
      </ScrollView>
      <CitySelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        cities={cities}
        onSelect={(city) => setSelectedCity(city)}
        selectedCity={selectedCity}
      />
    </SafeAreaView>
  );
}
