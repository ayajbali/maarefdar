import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const usersData = require('../../users.json');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = usersData.users[0];
  const [modalVisible, setModalVisible] = useState(false);

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
        <TouchableRipple onPress={() => navigation.navigate('Historique')}>
          <View style={styles.menuItem}>
            <Icon name="history" color="#32CD32" size={25} />
            <Text style={styles.menuItemText}>Historique Commandes</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate('EditProfileScreen')}>
          <View style={styles.menuItem}>
            <Icon name="cog" color="#4682B4" size={25} />
            <Text style={styles.menuItemText}>Paramètres</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            console.log('TouchableRipple pressed');
            setModalVisible(true);
          }}>
          <View style={styles.menuItem}>
            <Icon name="share" color="#E74C3C" size={25} />
            <Text style={styles.menuItemText}>Partager</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('EditProfileScreen')}>
          <View style={styles.menuItem}>
          <Icon name="logout" color={COLORS.gray2} size={25} />
            <Text style={styles.menuItemText}>Déconnecter</Text>
          </View>
        </TouchableRipple>
      </View>

      {/* Modal for showing icons */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => { /* Handle Facebook Press */ }}>
                <Icon name="facebook" color="#3b5998" size={40} />
                <Text style={styles.iconLabel}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { /* Handle Email Press */ }}>
                <Icon name="email" color="#777777" size={40} />
                <Text style={styles.iconLabel}>Mail</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { /* Handle LinkedIn Press */ }}>
                <Icon name="linkedin" color="#0077B5" size={40} />
                <Text style={styles.iconLabel}>LinkedIn</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#f9f9f9', // Off-white background
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconLabel: {
    marginTop: 5,
    textAlign: 'center',
    color: '#333333',
    fontSize: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
