import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import userData from '../../users.json'; // Import user data

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    // Simple authentication logic for demonstration
    const user = userData.users.find(user => user.email === email && user.password === password);
    if (user) {
      // Navigate to the next screen upon successful login
      navigation.navigate('HomeScreen');
    } else {
      // Handle invalid credentials
      alert('Invalid email or password. Please try again.');
    }
  };



  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={[styles.backgroundImage, { width: windowWidth * 1.6, height: windowHeight, resizeMode: 'cover' }]}
        source={require('../../assets/background.png')}
      />
      <View style={styles.overlay}>
        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          style={styles.lightImage1}
          source={require('../../assets/light.png')}
        />
        <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()}
          style={styles.lightImage2}
          source={require('../../assets/light.png')}
        />
      </View>
      <View style={styles.titleContainer}>
        <Animated.Text entering={FadeIn.duration(1000).springify()} style={styles.titleText}>Login</Animated.Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.innerContent}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor={'gray'}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.innerContent}>
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor={'gray'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountCreationContainer}>
        <Text>Vous n'avez pas de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.createAccountText}>Créer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    left: -windowWidth * 0.5,
    top: -10,
    width: windowWidth * 1.6,
    height: windowHeight,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    top: 0,
  },
  lightImage1: {
    height: windowHeight * 0.3,
    width: windowWidth * 0.15,
    top: -60,
  },
  lightImage2: {
    height: windowHeight * 0.29,
    width: windowWidth * 0.15,
    top: -80,
  },
  titleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: windowHeight * 0.23,
  },
  titleText: {
    color: 'white',
    fontSize: windowWidth * 0.1,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.4,
  },
  innerContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: windowWidth * 0.05,
    borderRadius: windowWidth * 0.05,
    width: windowWidth * 0.8,
    maxWidth: 400,
    marginBottom: 10,
  },
  input: {
    height: 40, 
    width: '100%',
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 8, 
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: windowWidth * 0.05,
    width: '80%',
    height: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  accountCreationContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 50,
  },
  createAccountText: {
    color: '#38bdf8', 
    fontWeight: 'bold', 
    marginLeft: 5, 
  },
});
