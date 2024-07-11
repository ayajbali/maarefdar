import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './Welcome.style';
import { COLORS } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.smallerWelcomeText(COLORS.black)}>Vous Trouvez Ici</Text>
        <Text style={styles.welcomeText(COLORS.primary)}>Vos livres preferes</Text>
      </View>
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} style={styles.searchIcon} />
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")} 
            placeholder="Qu'est ce que vous cherchez?"
          />
        </View>
      </View>
    </View>
  );
}
