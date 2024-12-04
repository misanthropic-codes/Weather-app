import axios, { AxiosError } from 'axios';
import { WeatherData } from '../types/weather';
import { ApiError, handleApiError } from '../utils/errorHandling';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new ApiError('Weather API key is not configured');
  }

  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=yes`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new ApiError('Invalid API key');
      }
      if (error.response?.status === 404) {
        throw new ApiError('Location not found');
      }
      throw new ApiError(error.response?.data?.error?.message || 'Failed to fetch weather data');
    }
    return handleApiError(error);
  }
};