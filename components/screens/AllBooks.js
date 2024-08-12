import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme'; // Import your COLORS

const { width } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';

// Import local images
import book1 from '../../assets/book1.jpg';

const DATA = [
  {
    title: 'Romio and Juliet',
    location: 'Sousse',
    cover: book1,
  },
  {
    title: 'Jungle Party',
    location: 'Sfax',
    date: '13+',
    cover: book1,
  },
  {
    title: 'Jungle Party',
    location: 'Sfax',
    date: '13+',
    cover: book1,
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={[styles.title]} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.itemContainerRow}>
              <Text style={[styles.location]}>
                <EvilIcons
                  name="location"
                  size={16}
                  color="black"
                  style={{ marginRight: 5 }}
                />
                {item.location}
              </Text>
              <Text style={[styles.date]}>{item.date}</Text>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const AllBooks = () => {
  const [data, setData] = useState(DATA);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const navigation = useNavigation(); // Move useNavigation inside the component

  const setActiveIndex = useCallback(
    (activeIndex) => {
      scrollXIndex.setValue(activeIndex);
      setIndex(activeIndex);
    },
    [scrollXIndex]
  );

  useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      const newData = [...data, ...data];
      setData(newData);
    }
  }, [index, data]);

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, [scrollXIndex, scrollXAnimated]);

  return (
    <FlingGestureHandler
      key="right"
      direction={Directions.RIGHT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END && index > 0) {
          setActiveIndex(index - 1);
        }
      }}
    >
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END && index < data.length - 1) {
            setActiveIndex(index + 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, i) => String(i)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index: i,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - i }];
              return (
                <View style={newStyle} index={i} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index: i }) => {
              const inputRange = [i - 1, i, i + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [{ translateX }, { scale }],
                  }}
                >
                  <TouchableOpacity
                     activeOpacity={.9}
                    onPress={() =>
                      navigation.navigate('BooksDetails', {
                        id: i,
                        title: item.title,
                        category: item.category,
                        rating: item.rating,
                        price: item.price,
                        description: item.description,
                      })
                    }
                  >
                    <Image
                      source={item.cover}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 14,
                      }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default AllBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    bottom: -30,
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    paddingHorizontal: SPACING * 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: COLORS.darkGray,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  date: {
    fontSize: 14,
    color: COLORS.gray,
  },
 backButton: {
  position: 'absolute',
  bottom: 80,
  alignSelf: 'center', // Center the button horizontally
  backgroundColor: 'black',
  borderRadius: 25,
  padding: 20,
  elevation: 5, // Adds a shadow for Android
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
},

});
