import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name='index' 
        options={{ 
          title: 'home', 
          headerShown: false // Oculta el encabezado en la pantalla 'index'
        }} 
      />
      <Stack.Screen 
        name='countryDetails' 
        options={{ 
          title: 'Where in the World?', 
          headerShown: false // Oculta el encabezado en la pantalla 'countryDetails'
        }} 
      />
    </Stack>
  );
}
