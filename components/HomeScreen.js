import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
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