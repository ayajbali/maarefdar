import React from 'react'
import { StyleSheet,Text,View  } from 'react-native'
import { useRoute } from '@react-navigation/native';
const BooksDetails= () => {
  const route = useRoute();
  const id= route.params
  console.log(id);

  return (
  <Text>BookDetails </Text>
  )
}

export default BooksDetails
