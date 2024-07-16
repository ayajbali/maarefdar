import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import styles from '../styles/Home.style';
import WelcomeScreen from '../home/Welcome';
import Nouveautes from '../home/Nouveautes';
import HeightSpacer from '../Reusable/HeightSpacer';
import CategoryPart from '../home/CategoryPart';

export default function HomePage() {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24} />
          <Text style={styles.location}>Sousse, Tunisie</Text>

          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>

            <TouchableOpacity>
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
        <CategoryPart/>
      </ScrollView>
    </SafeAreaView>
  );
}
