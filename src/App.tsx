import React, { useState, useEffect } from 'react';
import { WeatherHeader } from './components/WeatherHeader';
import { WeatherDetails } from './components/WeatherDetails';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { SearchBar } from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { getWeatherData } from './services/weatherApi';
import { WeatherData } from './types/weather';
import { ApiError } from './utils/errorHandling';
import { useTheme } from './hooks/useTheme';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const fetchWeatherData = async (location: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to fetch weather data';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl dark:text-white animate-pulse">Loading weather data...</div>
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-500 animate-fadeIn">{error}</div>
      </div>
    );
  }

  if (!weatherData) return null;

  const hourlyData = weatherData.forecast.forecastday[0].hour
    .filter((hour) => new Date(hour.time) > new Date())
    .slice(0, 24)
    .map((hour) => ({
      time: hour.time,
      temp: hour.temp_c,
      condition: hour.condition,
    }));

  const dailyData = weatherData.forecast.forecastday.map((day) => ({
    date: day.date,
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    condition: day.day.condition,
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="w-full max-w-4xl animate-fadeIn">
        <SearchBar onSearch={fetchWeatherData} isLoading={loading} />
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden animate-slideIn">
          <WeatherHeader
            location={weatherData.location.name}
            country={weatherData.location.country}
            temperature={weatherData.current.temp_c}
            condition={weatherData.current.condition.text}
            feelsLike={weatherData.current.feelslike_c}
            humidity={weatherData.current.humidity}
            windSpeed={weatherData.current.wind_kph}
          />
          
          <WeatherDetails
            uvIndex={weatherData.current.uv}
            precipitation={weatherData.current.precip_mm}
            pressure={weatherData.current.pressure_mb}
            visibility={weatherData.current.vis_km}
          />

          <HourlyForecast hourlyData={hourlyData} />
          
          <DailyForecast dailyData={dailyData} />
        </div>
      </div>
    </div>
  );
}

export default App;