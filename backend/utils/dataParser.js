// Example utility to parse data from an external API
// This is highly dependent on the actual API response format

const parseWeatherData = (apiResponse) => {
  // Assuming the API returns a complex object
  if (!apiResponse || !apiResponse.data) {
    return null;
  }
  
  const { main, weather, wind, name } = apiResponse.data;

  return {
    location: name,
    temperature: main.temp,
    humidity: main.humidity,
    description: weather[0].description,
    windSpeed: wind.speed,
  };
};

module.exports = {
  parseWeatherData,
};