import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';
import styles from '../styles/search.style';
import { COLORS } from '../../constants/theme';


const SearchScreen = () => {
  return (
   <SafeAreaView>
    <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchbtn}>
          <Feather name="search" size={24} color={COLORS.offwhite}  />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => {}} 
            placeholder="Qu'est ce que vous cherchez?"
          />
        </View>
      </View>
   </SafeAreaView>
  );
};



export default SearchScreen;
