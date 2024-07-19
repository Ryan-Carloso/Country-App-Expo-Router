import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export const lightTheme = {
  type: 'light',
  backgroundColor: 'hsl(0, 0%, 100%)',
  color: '#000',
  buttonBackground: 'hsl(0, 0%, 98%)',
  logo: {
    icon: <Feather name="sun" size={24} color="black" />,
    text: 'White mode'
  }
};

export const darkTheme = {
  type: 'dark',
  backgroundColor: 'hsl(207, 26%, 17%)',
  color: '#fff',
  buttonBackground: 'hsl(209, 23%, 22%)',
  logo: {
    icon: <MaterialIcons name="dark-mode" size={24} color="white" />,
    text: 'Dark mode'
  }
};
