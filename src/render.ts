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
}

const renderFeelsLike = (temp: number) => {
  const feelsLikeP = document.querySelector('.feels_like')!;
  const formattedTemp = Math.round(temp).toString();
  feelsLikeP.textContent = `Feels like ${formattedTemp}`;
}

const renderHumidity = (humidity: number) => {
  const humidityP = document.querySelector('.humidity')!;
  const formattedHumidity = Math.round(humidity).toString();
  humidityP.textContent = `Humidity ${formattedHumidity}%`;
}

export const renderForecast = (forecast: Forecast) => {
  renderLocation(forecast.name, forecast.sys.country);
  renderDegrees(forecast.main.temp);
  renderCondition(forecast.weather[0].description);
  renderFeelsLike(forecast.main.feels_like);
  renderHumidity(forecast.main.humidity);

  console.log(forecast);
};
