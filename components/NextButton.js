import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';

export default function NextButton({ percentage, scrollTo, navigation }) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100;
      
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  const handlePress = () => {
    if (percentage < 100) {
      scrollTo();
    } else {
      navigation.navigate('Login'); // Navigate to the Login screen
    }
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${center},${center}`}>
          <Circle
            stroke="#E6E7E8"
            fill="none"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="#00B0FF"
            fill="none"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity onPress={handlePress} style={[styles.button, { left: center - 33, top: center - 10 }]} activeOpacity={0.6}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#00B0FF',
    borderRadius: 100,
    padding: 20,
  },
});
