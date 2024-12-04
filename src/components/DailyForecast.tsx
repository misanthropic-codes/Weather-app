import React from 'react';

interface DailyForecastProps {
  dailyData: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: {
      text: string;
      icon: string;
    };
  }>;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ dailyData }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {dailyData.map((day, index) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          return (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="w-24">{dayName}</div>
              <img src={day.condition.icon} alt={day.condition.text} className="w-12 h-12" />
              <div className="flex gap-4">
                <span className="font-semibold">{`${Math.round(day.maxTemp)}°`}</span>
                <span className="text-gray-500">{`${Math.round(day.minTemp)}°`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};