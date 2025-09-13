// Weather Service using OpenWeather API
// Note: You'll need to get a free API key from https://openweathermap.org/api

export class WeatherService {
  constructor() {
    // Replace with your actual OpenWeather API key
    this.apiKey = 'YOUR_OPENWEATHER_API_KEY';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(lat, lon) {
    try {
      // For demo purposes, return mock data if no API key is provided
      if (this.apiKey === 'YOUR_OPENWEATHER_API_KEY') {
        return this.getMockCurrentWeather();
      }

      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      
      const data = await response.json();
      
      return {
        location: data.name,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      // Return mock data as fallback
      return this.getMockCurrentWeather();
    }
  }

  async getForecast(lat, lon) {
    try {
      // For demo purposes, return mock data if no API key is provided
      if (this.apiKey === 'YOUR_OPENWEATHER_API_KEY') {
        return this.getMockForecast();
      }

      const response = await fetch(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Forecast API request failed');
      }
      
      const data = await response.json();
      
      // Process forecast data to get daily forecasts
      const dailyForecasts = {};
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            maxTemp: item.main.temp_max,
            minTemp: item.main.temp_min,
            condition: item.weather[0].description,
          };
        } else {
          dailyForecasts[date].maxTemp = Math.max(dailyForecasts[date].maxTemp, item.main.temp_max);
          dailyForecasts[date].minTemp = Math.min(dailyForecasts[date].minTemp, item.main.temp_min);
        }
      });
      
      return Object.values(dailyForecasts).slice(0, 5);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      // Return mock data as fallback
      return this.getMockForecast();
    }
  }

  getMockCurrentWeather() {
    return {
      location: 'Kochi, Kerala',
      temperature: 28,
      feelsLike: 32,
      humidity: 75,
      pressure: 1013,
      windSpeed: 3.2,
      condition: 'Partly Cloudy',
      icon: '02d',
    };
  }

  getMockForecast() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const conditions = ['Sunny', 'Partly Cloudy', 'Rainy', 'Cloudy', 'Thunderstorm'];
    
    return days.map((day, index) => ({
      day,
      maxTemp: 28 + Math.floor(Math.random() * 5),
      minTemp: 22 + Math.floor(Math.random() * 3),
      condition: conditions[index],
    }));
  }
}
