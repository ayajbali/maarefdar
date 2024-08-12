import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList } from 'react-native';
import styles from './Welcome.style';
import { COLORS } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SearchItem from '../SearchItem'; // Adjust the path if necessary

const books = [
  { id: '1', name: 'Book One', price: '10.00' },
  { id: '2', name: 'Book Two', price: '12.50' },
  // Add more books here
];

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchPress = () => {
    setModalVisible(true);
  };

  const handleSearch = () => {
    // Add your search logic here
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.smallerWelcomeText(COLORS.black)}>Vous Trouvez Ici</Text>
        <Text style={styles.welcomeText(COLORS.primary)}>Vos livres preferes</Text>
      </View>
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Feather name="search" size={24} style={styles.searchIcon} />
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            placeholder="Qu'est ce que vous cherchez?"
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.searchContainer}>
              <Feather name="search" size={24} style={styles.searchIcon} />
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Qu'est ce que vous cherchez?"
                />
              </View>
            </View>
            <FlatList
              data={books}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SearchItem book={item} />}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, { color: COLORS.red }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
