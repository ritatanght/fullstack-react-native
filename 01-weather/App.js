import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';
import SearchInput from './components/SearchInput';
import { useEffect, useState } from 'react';

export default function App() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');

  useEffect(() => {
    setLocation('San Francisco');
  }, []);

  const handleUpdateLocation = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const locationId = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(locationId);
      setError(false);
      setLocation(location);
      setWeather(weather);
      setTemperature(temperature);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={getImageForWeather('Clear')}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
          <Text style={[styles.largeText, styles.textStyle]}>24°</Text>

          <SearchInput
            placeholder="Search any city"
            onSubmit={handleUpdateLocation}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    textAlign: 'center',
    // platform is a built-in React Native API that we need to import
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
});
