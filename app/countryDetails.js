import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { lightTheme, darkTheme } from '../componentes/themes';
import axios from 'axios';

const formatPopulation = (population) => {
  if (population >= 1_000_000_000) {
    return (population / 1_000_000_000).toFixed(1) + 'B';
  } else if (population >= 1_000_000) {
    return (population / 1_000_000).toFixed(1) + 'M';
  } else if (population >= 1_000) {
    return (population / 1_000).toFixed(1) + 'K';
  } else {
    return population.toString();
  }
};

const CountryDetailsScreen = () => {
  const { width: screenWidth } = useWindowDimensions();
  const { country: countryCode, theme: themeType } = useLocalSearchParams();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const router = useRouter();

  const theme = themeType === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    const fetchAllCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setAllCountries(response.data);
      } catch (error) {
        console.error('Error fetching all countries:', error);
      }
    };

    fetchCountryData();
    fetchAllCountries();
  }, [countryCode]);

  if (!country) {
    return
  }

  const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].official : 'N/A';
  const officialName = country.name.common;

  const currencyNames = country.currencies 
    ? Object.values(country.currencies).map(currency => currency.name).join(', ')
    : 'N/A';

  const currencySymbol = country.currencies 
    ? Object.values(country.currencies).map(currency => currency.symbol).join(', ')
    : 'N/A';

  const handleBorderCountryPress = (code) => {
    router.push(`/countryDetails?country=${code}&theme=${themeType}`);
  };

  const borderCountries = country.borders 
    ? (
        <View style={styles.containerborder}>
          {country.borders.map(code => {
            const borderCountry = allCountries.find(c => c.cca3 === code);
            return (
              <TouchableOpacity 
                style={[styles.hamburgerButton, { backgroundColor: theme.backgroundColor }]}
                key={code} 
                onPress={() => handleBorderCountryPress(code)}
              >
                <Text style={[styles.buttonText, { color: theme.color }]}>
                  {borderCountry ? borderCountry.name.common : code}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )
    : <Text>N/A</Text>;

  const isSmallScreen = screenWidth < 600;
  const flagWidth = isSmallScreen ? screenWidth * 0.8 : screenWidth * 0.4;
  const flagHeight = isSmallScreen ? screenWidth * 0.8 * 0.67 : screenWidth * 0.4 * 0.67;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <SafeAreaView>
      <View>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text>Back</Text>
      </TouchableOpacity>

      <Text>Where in the World?</Text>
    </View>
        <View style={isSmallScreen ? styles.contentContainerSmallScreen : styles.contentContainerLargeScreen}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: country.flags.png }} style={{ width: flagWidth, height: flagHeight }} resizeMode="contain" />
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.name, { color: theme.color, fontFamily: 'NunitoSans-Bold' }]}>
              {country.name.common}
            </Text>
            <Text style={[styles.textNormal, { color: theme.color }]}>
              Capital: <Text style={{ fontWeight: '400' }}>{country.capital ? country.capital[0] : 'N/A'}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: theme.color }]}>
              Region: <Text style={{ fontWeight: '400' }}>{country.region}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: theme.color }]}>
              Population: <Text style={{ fontWeight: '400' }}>{formatPopulation(country.population)}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: theme.color }]}>
              Currencies: <Text style={{ fontWeight: '400' }}>{currencyNames}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: theme.color }]}>
              Currency Symbols: <Text style={{ fontWeight: '400' }}>{currencySymbol}</Text> 
            </Text>
            <Text style={[styles.textNormal, { color: theme.color, marginTop: 10, fontFamily: 'NunitoSans-Bold' }]}>
              Native Name: <Text style={{ fontWeight: '400' }}>{nativeName}</Text> 
            </Text>
            <Text style={[styles.textNormal, { color: theme.color, fontFamily: 'NunitoSans-Bold' }]}>
              English Name: <Text style={{ fontWeight: '400' }}>{officialName}</Text>
            </Text>
            <Text style={[styles.textNormal, { color: theme.color, marginTop: 10 }]}>
              <Text style={[styles.link, { color: theme.color }]}>
                Borders:
              </Text>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                {borderCountries}
              </View>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: '100%'
  },
  contentContainerSmallScreen: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerLargeScreen: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  containerborder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rowtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'NunitoSans-Bold',
  },
  imageContainer: {
    marginBottom: 20,
  },
  flag: {
    aspectRatio: 3 / 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  textNormal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  hamburgerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default CountryDetailsScreen;
