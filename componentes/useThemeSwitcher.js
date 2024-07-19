// useThemeSwitcher.js
import { useState } from 'react';
import { lightTheme, darkTheme } from './themes';

const useThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  return { currentTheme, toggleTheme };
};

export default useThemeSwitcher;
