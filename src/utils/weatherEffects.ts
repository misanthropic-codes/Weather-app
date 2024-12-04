export const getWeatherBackground = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return 'bg-gradient-to-r from-blue-600 to-blue-400';
  }
  if (lowerCondition.includes('snow')) {
    return 'bg-gradient-to-r from-blue-100 to-blue-200';
  }
  if (lowerCondition.includes('cloud')) {
    return 'bg-gradient-to-r from-gray-400 to-gray-300';
  }
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return 'bg-gradient-to-r from-yellow-400 to-orange-500';
  }
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return 'bg-gradient-to-r from-gray-800 to-gray-600';
  }
  if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
    return 'bg-gradient-to-r from-gray-300 to-gray-200';
  }
  
  return 'bg-gradient-to-r from-blue-400 to-blue-300';
};