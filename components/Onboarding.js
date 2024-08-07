import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Animated } from "react-native";
import slides from "../slides";
import OnboardingItems from './OnboardingItems';
import Paginator from './Paginator';
import NextButton from './NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function onboarding() {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const  navigation = useNavigation ();

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  
  const scrollTo = async()=>{
    if (currentIndex < slides.length - 1 ){
      slidesRef.current.scrollToIndex({index:currentIndex + 1});
    } else{
      try{
        await AsyncStorage.setItem('@viewedOnboarding', 'true');

      }catch(err){
       console.log('Error @setItem:' , err);
      }
    }

  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={32} // Adjusted to 32 as per common recommendation
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50, // Adjust as per your requirement
          }}
          ref={slidesRef} // Added ref assignment correctly
        />
      </View>
      <Paginator data={slides} scrollX = {scrollX} />
      <NextButton scrollTo={scrollTo}        
       navigation={navigation}
 percentage={(currentIndex + 1 ) * (100 / slides.length)}/>
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
});
