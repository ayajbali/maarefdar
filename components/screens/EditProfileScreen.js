import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ImageBackground, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const [avatarSource, setAvatarSource] = useState(require('../../assets/avatar.png'));

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setAvatarSource(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 60 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ImageBackground
                source={avatarSource}
                style={{ height: 150, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Icon name="camera" size={35} color="#fff" style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }} />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 50, fontSize: 20, fontWeight: 'bold' }}>Eya Jbeli</Text>
        </View>
        <View style={[styles.action, { marginTop: 30 }]}>
          <FontAwesome name="user-o" size={20} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Prenom"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <View style={[styles.action, { marginTop: 30 }]}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <View style={[styles.action, { marginTop: 30 }]}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <View style={[styles.action, { marginTop: 30 }]}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <View style={[styles.action, { marginTop: 30 }]}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <View style={[styles.action, { marginTop: 30 }]}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.textInput, { color: colors.text }]}
          />
        </View>
        <TouchableOpacity style={[styles.commandButton1, { marginTop: 50 }]} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Confirmer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.commandButton2, { marginTop: 10 }]} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton1: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  commandButton2: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
