export const getWeatherData = async (city: string, unit: string) => {
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=5b43226f222518ddfbbd7f501ffd484c`
  );
  const data = await forecast.json();
  return data;
};
