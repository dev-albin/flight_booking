import React from 'react';
import { Thermometer, Cloud, Sun, CloudRain } from 'lucide-react';

interface WeatherWidgetProps {
  weather: {
    temp: number;
    condition: string;
    icon: string;
  };
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      return <Sun className="w-8 h-8 text-yellow-500" />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud className="w-8 h-8 text-gray-500" />;
    } else if (lowerCondition.includes('rain')) {
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    }
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Weather</h3>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-3xl font-bold text-gray-900">{weather.temp}°C</div>
              <div className="text-gray-600">{weather.condition}</div>
            </div>
          </div>
          <div className="text-4xl">{weather.icon}</div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Thermometer className="w-4 h-4" />
            <span>Current conditions at destination</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;