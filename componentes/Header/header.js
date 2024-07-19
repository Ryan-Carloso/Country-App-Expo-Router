import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleThemeButton from '../ToggleThemeButton';

const Header = ({ currentTheme, toggleTheme }) => {
  return (
    <View style={[styles.header, { backgroundColor: currentTheme.headerBackground }]}>
      <Text style={[styles.headerText, { color: currentTheme.color }]}>Where in the World?</Text>
      <ToggleThemeButton currentTheme={currentTheme} toggleTheme={toggleTheme} />
      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
  },
  headerText: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    fontWeight: '800',
    marginRight: '10%',
  },
});