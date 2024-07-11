import React from 'react' ;
import {StyleSheet,  View, Text, TouchableOpacity, ScrollView } from 'react-native';


const ReusableTitle = () => {
  return (
    <TouchableOpacity style={styles.container}>
        <View >
            
        </View>
    </TouchableOpacity>
  )
}

export default ReusableTitle

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius:12,
  }
})