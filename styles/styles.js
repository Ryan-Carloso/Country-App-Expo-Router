import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
    maxWidth: 500,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
  scrollViewContainer: {
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  countryCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  flag: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  capital: {
    fontSize: 14,
    marginBottom: 2,
  },
  region: {
    fontSize: 14,
    marginBottom: 2,
  },
  population: {
    fontSize: 14,
    marginBottom: 2,
  },
  currencies: {
    fontSize: 14,
    marginBottom: 2,
  },
  nativeName: {
    fontSize: 14,
    marginBottom: 2,
  },
  borders: {
    fontSize: 14,
    marginBottom: 2,
  },
  officialName: {
    fontSize: 14,
    marginBottom: 2,
  },
  link: {
    color: 'blue',
  },
});

export default styles;