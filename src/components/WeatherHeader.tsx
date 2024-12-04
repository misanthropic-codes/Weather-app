import React from 'react';
import { MapPin, Droplets, Wind } from 'lucide-react';
import { getWeatherBackground } from '../utils/weatherEffects';

interface WeatherHeaderProps {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
}

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  location,
  country,
  temperature,
  condition,
  feelsLike,
  humidity,
  windSpeed,
}) => {
  const bgClass = getWeatherBackground(condition);

  return (
    <div className={`${bgClass} p-8 rounded-t-3xl text-white relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-weather-pattern opacity-10"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 hover:scale-105 transition-transform cursor-pointer">
          <MapPin className="w-6 h-6 animate-pulse" />
          <h2 className="text-2xl font-semibold">{`${location}, ${country}`}</h2>
        </div>

        <div className="flex items-center gap-8 my-6 transform hover:scale-105 transition-all duration-300">
          <div className="text-7xl font-bold tracking-tighter hover:text-yellow-200 transition-colors">
            {`${Math.round(temperature)}°`}
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-medium">{condition}</div>
            <div className="text-lg opacity-90 group-hover:opacity-100 transition-opacity">
              {`Feels like ${Math.round(feelsLike)}°`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <Droplets className="w-5 h-5 animate-float" />
            <div>
              <div className="text-sm opacity-90">Humidity</div>
              <div className="font-semibold text-lg">{`${humidity}%`}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <Wind className="w-5 h-5 animate-float" />
            <div>
              <div className="text-sm opacity-90">Wind</div>
              <div className="font-semibold text-lg">{`${Math.round(windSpeed)} km/h`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};