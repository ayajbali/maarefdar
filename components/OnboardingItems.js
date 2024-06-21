import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from "react-native";
import Paginator from './Paginator';
import NextButton from './NextButton';
export default function OnboardingItems({ item }) {
  const { width } = useWindowDimensions();
  const imageSize = item.size ? { width: item.size.width, height: item.size.height } : { width: width, height: '100%' };

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, imageSize]} />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#00B0FF',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  }
});
