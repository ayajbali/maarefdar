import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styles from '../styles/Home.style';
import WelcomeScreen from '../home/Welcome';
// import Nouveautes from '../home/Nouveautes';
import HeightSpacer from '../Reusable/HeightSpacer';
import CategoryPart from '../home/CategoryPart';
import { useBooks } from '../../context/books'; // Import the context
import { useNavigation } from '@react-navigation/native';
import CitySelectModal from '../CitySelectModal'; // Adjust path as necessary

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

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

  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

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
        {/* <Nouveautes /> */}
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
      <TouchableOpacity
        style={localStyles.chatbotIcon}
        onPress={() => {
          // Action à effectuer lors de l'appui sur l'icône du chatbot
          console.log('Chatbot icon clicked');
        }}
      >
        <Animated.View style={[localStyles.animatedIcon, animatedStyle]}>
          <MaterialIcons name="chat" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  chatbotIcon: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue', // change to your preferred color
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
