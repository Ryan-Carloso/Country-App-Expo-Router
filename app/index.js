import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import useThemeSwitcher from '../componentes/useThemeSwitcher'; // Ajuste o caminho conforme necessário
import ButtonContainer from '../componentes/Header/ButtonContainer';
import Header from '../componentes/Header/header';

// Função para filtrar e ordenar os países
const filterAndSortCountries = (countries, searchTerm, sortOrder, selectedRegion) => {
  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedRegion) {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === selectedRegion
    );
  }

  if (sortOrder === 'alphabetical') {
    filteredCountries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  } else if (sortOrder === 'population') {
    filteredCountries.sort((a, b) => b.population - a.population);
  } else if (sortOrder === 'area') {
    filteredCountries.sort((a, b) => b.area - a.area);
  }

  return filteredCountries;
};

// Função para renderizar um cartão de país
const renderCountry = (item, currentTheme, maxContainerWidth, numColumns, styles, router) => {
  return (
    <TouchableOpacity 
      key={item.cca3}
      onPress={() => {
        router.push({
          pathname: '/countryDetails',
          params: { 
            country: item.cca3,
            theme: currentTheme.type // Certifique-se de que 'type' existe no seu tema
          }
        });      
      }}
    >
      <SafeAreaView style={[styles.countryCard, { width: maxContainerWidth / numColumns - 10, backgroundColor: currentTheme.backgroundColor }]}>
        <View style={styles.flagContainer}>
          <Image
            source={{ uri: item.flags.png }}
            style={styles.flag}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: currentTheme.color }]}>{item.name.common}</Text>
          <Text style={[styles.capital, { color: currentTheme.color }]}>Capital: {item.capital ? item.capital[0] : 'N/A'}</Text>
          <Text style={[styles.region, { color: currentTheme.color }]}>Region: {item.region}</Text>
          <Text style={[styles.population, { color: currentTheme.color }]}>Population: {item.population.toLocaleString()}</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

// Função para renderizar a grade de cartões de países
const renderGrid = (filteredCountries, currentTheme, maxContainerWidth, numColumns, styles, router) => {
  let rows = [];
  for (let i = 0; i < filteredCountries.length; i += numColumns) {
    let rowItems = filteredCountries.slice(i, i + numColumns);
    rows.push(
      <View key={i} style={styles.row}>
        {rowItems.map(item => renderCountry(item, currentTheme, maxContainerWidth, numColumns, styles, router))}
      </View>
    );
  }
  return rows;
};

const HomeScreen = () => {
  const { currentTheme, toggleTheme } = useThemeSwitcher();
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { width } = Dimensions.get('window');
  const maxContainerWidth = width * 0.7;
  const windowWidth = Dimensions.get('window').width;
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log('Current theme:', currentTheme);
  }, [currentTheme]);

  const filteredCountries = filterAndSortCountries(countries, searchTerm, sortOrder, selectedRegion);
  const numColumns = Math.max(1, Math.floor(width / 400));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={[
        styles.containerheader,
        windowWidth < 600 ? 
          { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', } : 
          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }
      ]}>
        <Header currentTheme={currentTheme} toggleTheme={toggleTheme} />
        <ButtonContainer
          style={{ zIndex: 100 }}
          currentTheme={currentTheme}
          setSortOrder={setSortOrder}
          toggleTheme={toggleTheme}
          setSelectedRegion={setSelectedRegion}
          selectedRegion={selectedRegion}
        />
      </View>
      <View style={[
        styles.searchContainer,
        {
          borderColor: currentTheme.backgroundColor,
          backgroundColor: currentTheme.buttonBackground,
        },
      ]}>
        <FontAwesome name="search" size={24} color={currentTheme.color}/>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: currentTheme.color,
              width: maxContainerWidth * 0.4,
              maxWidth: 200,
            },
          ]}
          placeholder="Search by country name"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor={currentTheme.color}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {renderGrid(filteredCountries, currentTheme, maxContainerWidth, numColumns, styles, router)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  containerheader: {
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  countryCard: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 0,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  flagContainer: {
    width: '100%',
    aspectRatio: 3 / 2, // Mantém a proporção da bandeira
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  flag: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  capital: {
    fontSize: 14,
  },
  region: {
    fontSize: 14,
  },
  population: {
    fontSize: 14,
  },
});
