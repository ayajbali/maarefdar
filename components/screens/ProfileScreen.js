import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// Import JSON data from users.json
const usersData = require('../../users.json');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = usersData.users[0]; // Change index based on your data structure

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={require('../../assets/avatar.png')}
          size={80}
        />
        <View style={{ marginLeft: 20 }}>
          <Title style={styles.title}>{user.name}</Title>
          <Caption style={styles.caption}>{user.email}</Caption>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <Icon name="map-marker-radius" color="#777777" size={20} style={styles.icon} />
        <Text style={styles.locationText}>{user.address}</Text>
      </View>

      <View style={styles.userInfoSection}>
        <Icon name="phone" color="#777777" size={20} style={styles.icon} />
        <Text style={styles.locationText}>{user.phone}</Text>
      </View>

      <View style={styles.userInfoSection}>
        <Icon name="email" color="#777777" size={20} style={styles.icon} />
        <Text style={styles.locationText}>{user.email}</Text>
      </View>

      <View style={[styles.infoBoxWrapper, { marginBottom: 20 }]}>
        <View style={styles.infoBox}>
          <Title style={styles.infoBoxTitle}>...</Title>
          <Caption style={styles.infoBoxCaption}>Ordres</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Votre Favoris</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share" color="#4682B4" size={25} />
            <Text style={styles.menuItemText}>Partager</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check" color="#27AE60" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate('EditProfileScreen')}>
          <View style={styles.menuItem}>
            <Icon name="cog" color="#E74C3C" size={25} />
            <Text style={styles.menuItemText}>Paramètres</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10, // Adjusted margin bottom for spacing
    borderRadius: 10,
  },
  userInfoSection: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginBottom: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    height: 100,
    marginTop: 10,
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoBoxCaption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  menuWrapper: {
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  icon: {
    marginRight: 20,
  },
  locationText: {
    color: '#777777',
    fontSize: 16,
  },
});

export default ProfileScreen;
