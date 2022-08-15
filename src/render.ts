import { Forecast } from "./control";

const renderLocation = (city: string, country: string) => {
  const locationH1: HTMLHeadingElement = document.querySelector('.content_location')!;
  locationH1.textContent = `${city}, ${country}`;
};

const renderDegrees = (temp: number) => {
  const degreesSpan = document.querySelector('.content_degrees')!;
  const formattedTemp = Math.round(temp).toString();
  degreesSpan.textContent = formattedTemp;
};

const renderCondition = (condition: string) => {
  const conditionP = document.querySelector('.condition')!;
  conditionP.textContent = condition[0].toUpperCase() + condition.slice(1);
};

const renderFeelsLike = (temp: number) => {
  const feelsLikeP = document.querySelector('.feels_like')!;
  const formattedTemp = Math.round(temp).toString();
  feelsLikeP.textContent = `Feels like ${formattedTemp}`;
};

const renderHumidity = (humidity: number) => {
  const humidityP = document.querySelector('.humidity')!;
  const formattedHumidity = Math.round(humidity).toString();
  humidityP.textContent = `Humidity ${formattedHumidity}%`;
};

export const renderError = (message: any) => {
  const alert = document.querySelector('.search_alert')!;
  const formattedMessage: string = message.toString();
  alert.textContent = formattedMessage;
};

export const renderUnitButtons = (unit: string) => {
  const buttons = document.querySelectorAll('.unit_button').forEach(e => {
    e.classList.remove('pressed');
  });
  const button = document.querySelector(`.${unit}`)!;
  button.classList.add('pressed');
};

export const renderTemperatureUnit = (unit: string) => {
  const temperatureUnit = document.querySelector('.content_degrees_units')!;
  if (unit === 'metric') {
    temperatureUnit.textContent = '°C';
  };
  if (unit === 'imperial') {
    temperatureUnit.textContent = '°F';
  };
};

export const renderForecast = (forecast: Forecast) => {
  renderError('');
  renderLocation(forecast.name, forecast.sys.country);
  renderDegrees(forecast.main.temp);
  renderCondition(forecast.weather[0].description);
  renderFeelsLike(forecast.main.feels_like);
  renderHumidity(forecast.main.humidity);
};
