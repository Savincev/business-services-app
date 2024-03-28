import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, View, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import store from '../store/store';
import { Provider } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [position, setPosition] = useState<string | null>(null);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition(JSON.stringify({
          "latitude": pos.coords.latitude,
          "longitude": pos.coords.longitude
        }));
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
  };

  const postGeolocation = async () => {
    await getCurrentPosition();
    fetch(process.env.EXPO_PUBLIC_IP_ADRESS + ":8000/api/post-geolocation", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: position
    })
  }

  // Send geolocation to server every 15 minutes
  useEffect(() => {
    setInterval(() => {
      postGeolocation();
    }, 900000)
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const navigation = useNavigation();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff'
    },
  };

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Provider store={store}>
      <ThemeProvider value={MyTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', headerTitle: "Info" }} />
          <Stack.Screen name='contacts' options={{ headerTitle: "Контакты" }} />
          <Stack.Screen name="contact" options={{ headerTitle: "Контакт" }} />
          <Stack.Screen name="contactRequest" options={{ headerTitle: 'Запрос контакта' }} />
          <Stack.Screen name="filters" options={{
            headerLeft: () => <Button title='Назад' onPress={() => {
              navigation.goBack();
            }} />,
            headerTitle: 'Фильтры',
            presentation: 'modal',
            headerStyle: { backgroundColor: Colors.altBg },
            headerShadowVisible: false
          }} />
          <Stack.Screen name='chat' options={{}} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
