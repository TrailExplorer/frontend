import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        exclude: 'minutely,hourly',
        units: 'metric', // Or 'imperial' for Fahrenheit
        appid: process.env.WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric', // Or 'imperial' for Fahrenheit
          appid: process.env.WEATHER_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  };

