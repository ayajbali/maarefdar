import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const CitySelectModal = ({ visible, onClose, cities, onSelect }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleConfirm = () => {
    if (selectedCity) {
      onSelect(selectedCity);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Selectionner</Text>

          <FlatList
            data={cities}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.cityOption,
                  item.value === selectedCity && styles.selectedCityOption
                ]}
                onPress={() => handleCitySelect(item.value)}
              >
                <Text style={[
                  styles.cityText,
                  item.value === selectedCity && styles.selectedCityText
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    width: '80%',
    maxHeight: '60%',
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: SIZES.small,
  },
  cityOption: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    marginBottom: SIZES.small,
    alignItems: 'center',
  },
  selectedCityOption: {
    backgroundColor: COLORS.gray, // Gray background for the selected city
  },
  cityText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  selectedCityText: {
    color: COLORS.white, // White text color for the selected city
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.medium,
  },
  button: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
    borderRadius: SIZES.small,
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

export default CitySelectModal;
