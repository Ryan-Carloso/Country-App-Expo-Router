import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const ToggleThemeButton = ({ currentTheme, toggleTheme }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        {currentTheme.logo.icon}
        <Text style={[styles.buttonText, { color: currentTheme.color }]}>
          {currentTheme.logo.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ToggleThemeButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'NunitoSans-Bold'
  },
});
