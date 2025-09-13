import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { WeatherService } from '../services/WeatherService';

const WeatherScreen = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const weatherService = new WeatherService();

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  const getLocationAndWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied. Using default location (Kochi, Kerala).');
        await fetchWeatherData({ latitude: 9.9312, longitude: 76.2673 }); // Kochi coordinates
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await fetchWeatherData(location.coords);
    } catch (error) {
      console.error('Error getting location:', error);
      setError('Unable to get location. Using default location (Kochi, Kerala).');
      await fetchWeatherData({ latitude: 9.9312, longitude: 76.2673 });
    }
  };

  const fetchWeatherData = async (coords) => {
    try {
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(coords.latitude, coords.longitude),
        weatherService.getForecast(coords.latitude, coords.longitude)
      ]);
      
      setWeatherData(currentWeather);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to fetch weather data. Please check your internet connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (location) {
      await fetchWeatherData(location.coords);
    } else {
      await getLocationAndWeather();
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear': 'sunny',
      'clouds': 'cloudy',
      'rain': 'rainy',
      'drizzle': 'rainy',
      'thunderstorm': 'thunderstorm',
      'snow': 'snow',
      'mist': 'partly-sunny',
      'fog': 'partly-sunny',
    };
    return iconMap[condition?.toLowerCase()] || 'partly-sunny';
  };

  const getFarmingAdvice = (weather) => {
    if (!weather) return '';
    
    const temp = weather.temperature;
    const condition = weather.condition?.toLowerCase();
    
    if (condition?.includes('rain')) {
      return 'Good time for planting! Ensure proper drainage to prevent waterlogging.';
    } else if (temp > 35) {
      return 'Hot weather - increase irrigation frequency and provide shade for young plants.';
    } else if (temp < 20) {
      return 'Cool weather - protect sensitive crops from cold stress.';
    } else {
      return 'Favorable weather conditions for most crops.';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {error && (
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text style={styles.errorText}>{error}</Text>
          </Card.Content>
        </Card>
      )}

      {weatherData && (
        <Card style={styles.currentWeatherCard}>
          <Card.Content>
            <View style={styles.currentWeatherHeader}>
              <View>
                <Title style={styles.locationText}>
                  {weatherData.location}
                </Title>
                <Text style={styles.conditionText}>
                  {weatherData.condition}
                </Text>
              </View>
              <Ionicons
                name={getWeatherIcon(weatherData.condition)}
                size={60}
                color="#2E7D32"
              />
            </View>
            
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperature}>
                {Math.round(weatherData.temperature)}°C
              </Text>
              <Text style={styles.feelsLike}>
                {t('weather.feelsLike')}: {Math.round(weatherData.feelsLike)}°C
              </Text>
            </View>

            <View style={styles.weatherDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="water" size={20} color="#2196F3" />
                <Text style={styles.detailText}>
                  {weatherData.humidity}% {t('weather.humidity')}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="leaf" size={20} color="#4CAF50" />
                <Text style={styles.detailText}>
                  {weatherData.windSpeed} m/s {t('weather.windSpeed')}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="speedometer" size={20} color="#FF9800" />
                <Text style={styles.detailText}>
                  {weatherData.pressure} hPa {t('weather.pressure')}
                </Text>
              </View>
            </View>

            <Card style={styles.adviceCard}>
              <Card.Content>
                <Title style={styles.adviceTitle}>🌱 Farming Advice</Title>
                <Paragraph style={styles.adviceText}>
                  {getFarmingAdvice(weatherData)}
                </Paragraph>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>
      )}

      {forecastData.length > 0 && (
        <Card style={styles.forecastCard}>
          <Card.Content>
            <Title style={styles.forecastTitle}>{t('weather.forecast')}</Title>
            {forecastData.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>{day.day}</Text>
                <Ionicons
                  name={getWeatherIcon(day.condition)}
                  size={24}
                  color="#2E7D32"
                />
                <Text style={styles.forecastTemp}>
                  {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      <Button
        mode="contained"
        onPress={onRefresh}
        style={styles.refreshButton}
        icon="refresh"
      >
        {t('weather.refresh')}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorCard: {
    margin: 16,
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    color: '#C62828',
    textAlign: 'center',
  },
  currentWeatherCard: {
    margin: 16,
    elevation: 4,
  },
  currentWeatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  conditionText: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
  temperatureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  feelsLike: {
    fontSize: 16,
    color: '#666',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  adviceCard: {
    backgroundColor: '#E8F5E8',
    marginTop: 8,
  },
  adviceTitle: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 8,
  },
  adviceText: {
    color: '#333',
    fontSize: 14,
  },
  forecastCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  forecastTemp: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  refreshButton: {
    margin: 16,
    marginTop: 0,
  },
});

export default WeatherScreen;
