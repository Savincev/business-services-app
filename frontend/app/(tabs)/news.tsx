import { Alert, Button, StyleSheet } from 'react-native';

// import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Geolocation from '@react-native-community/geolocation';
import { useState } from 'react';

export default function NewsScreen() {

  const [position, setPosition] = useState<string | null>(null);

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
    alert(position);
    fetch(process.env.EXPO_PUBLIC_IP_ADRESS + ":8000/api/post-geolocation", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: position
    })
  }

  const getLastGeolocation = async () => {
    const geolocation = await fetch(process.env.EXPO_PUBLIC_IP_ADRESS + ":8000/api/get-geolocation");
    const data = await geolocation.json();
    alert(`Долгота: ${data.latitude}\nШирота: ${data.longitude}`);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новости</Text>
      <View style={styles.separator} />
      <Button title='Сохранить местоположение' onPress={postGeolocation} />
      <Button title='Последнее местоположение' onPress={getLastGeolocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
