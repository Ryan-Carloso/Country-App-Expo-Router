import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ButtonContainer = ({ currentTheme, setSortOrder, setSelectedRegion, selectedRegion }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.hamburgerButton, { backgroundColor: currentTheme.buttonBackground }]}
        onPress={toggleFilterVisibility}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color: currentTheme.color }]}>Filters</Text>
        <AntDesign name="caretdown" size={24} color={currentTheme.color} />
      </TouchableOpacity>

      {isFilterVisible && (
        <View style={[styles.animatedContainer, { backgroundColor: currentTheme.buttonBackground }]}>
          <Text style={[styles.modalTitle, { color: currentTheme.color }]}>Sort Options</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
            onPress={() => { setSortOrder('alphabetical'); toggleFilterVisibility(); }}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: currentTheme.color }]}>Sort Alphabetically</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
            onPress={() => { setSortOrder('population'); toggleFilterVisibility(); }}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: currentTheme.color }]}>Sort by Population</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
            onPress={() => { setSortOrder('area'); toggleFilterVisibility(); }}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: currentTheme.color }]}>Sort by Area</Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: currentTheme.color }]}>Region Filters</Text>
          <View style={styles.regionContainer}>
            {['Europe', 'Asia', 'Africa', 'Oceania', 'Americas'].map((region) => (
              <TouchableOpacity
                key={region}
                style={[
                  styles.regionButton,
                  { backgroundColor: selectedRegion === region ? '#007bff' : currentTheme.buttonBackground }
                ]}
                onPress={() => { setSelectedRegion(region); toggleFilterVisibility(); }}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, { color: currentTheme.color }]}>{region}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ButtonContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold'
  },
  hamburgerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animatedContainer: {
    position: 'absolute',
    top: 60,
    width: '70%',
    maxWidth: 300,
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2000,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'NunitoSans-Bold'
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'NunitoSans-Bold'
  },
  regionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  regionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'NunitoSans-Bold'
  },
});
