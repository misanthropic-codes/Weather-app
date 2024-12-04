import React from 'react';

interface HourlyForecastProps {
  hourlyData: Array<{
    time: string;
    temp: number;
    condition: {
      text: string;
      icon: string;
    };
  }>;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {hourlyData.map((hour, index) => {
          const time = new Date(hour.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          return (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-xl 
                       shadow-sm hover:shadow-lg transition-all duration-300 transform 
                       hover:-translate-y-1 min-w-[100px] cursor-pointer
                       border border-transparent hover:border-blue-200 dark:hover:border-blue-500"
            >
              <div className="text-gray-600 dark:text-gray-300">{time}</div>
              <div className="relative">
                <img 
                  src={hour.condition.icon} 
                  alt={hour.condition.text} 
                  className="w-12 h-12 my-2 animate-weatherIcon"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent 
                              dark:from-gray-800/20 rounded-full filter blur-sm -z-10"></div>
              </div>
              <div className="font-semibold text-gray-800 dark:text-white">
                {`${Math.round(hour.temp)}°`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};