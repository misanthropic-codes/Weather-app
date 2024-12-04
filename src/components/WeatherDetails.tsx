import React from 'react';
import { Sun, Droplets, Gauge, Eye } from 'lucide-react';

interface WeatherDetailsProps {
  uvIndex: number;
  precipitation: number;
  pressure: number;
  visibility: number;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  uvIndex,
  precipitation,
  pressure,
  visibility,
}) => {
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { text: 'Low', color: 'text-green-500' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-yellow-500' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-500' };
    if (uv <= 10) return { text: 'Very High', color: 'text-red-500' };
    return { text: 'Extreme', color: 'text-purple-500' };
  };

  const uvInfo = getUVLevel(uvIndex);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Sun className="w-5 h-5 text-yellow-500 animate-weatherIcon" />
          <h3 className="text-gray-600 dark:text-gray-300">UV Index</h3>
        </div>
        <div className={`text-xl font-semibold ${uvInfo.color}`}>
          {`${uvIndex} - ${uvInfo.text}`}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="w-5 h-5 text-blue-500 animate-float" />
          <h3 className="text-gray-600 dark:text-gray-300">Precipitation</h3>
        </div>
        <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          {`${precipitation} mm`}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Gauge className="w-5 h-5 text-purple-500 animate-pulse" />
          <h3 className="text-gray-600 dark:text-gray-300">Pressure</h3>
        </div>
        <div className="text-xl font-semibold text-purple-600 dark:text-purple-400">
          {`${pressure} hPa`}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-5 h-5 text-green-500 animate-pulse" />
          <h3 className="text-gray-600 dark:text-gray-300">Visibility</h3>
        </div>
        <div className="text-xl font-semibold text-green-600 dark:text-green-400">
          {`${visibility} km`}
        </div>
      </div>
    </div>
  );
};