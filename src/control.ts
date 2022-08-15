import { getWeatherData } from "./API";
import { getFormData } from "./form";
import { renderError, renderForecast, renderTemperatureUnit, renderUnitButtons } from "./render";
import { getSettings } from "./storage";

let lastCity = 'Ivanovo';
let currentUnit = 'metric';

export interface Forecast {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      description: string;
    }
  ];
};

const handleForecast = async (city: string) => {
  try {
    const response = await getWeatherData(city, currentUnit);
    if (response.cod !== 200) {
      throw response.message;
    };
    const forecast = Object.assign(<Forecast>{}, response!);
    lastCity = forecast.name;
    localStorage.setItem('city', lastCity);
    renderForecast(forecast);
  } catch (error) {
    renderError(error);
  };
};

export const handleNewInput = (event: Event): void => {
  event.preventDefault();
  let city = getFormData();
  handleForecast(city);
};

export const handleUnitChange = function (this: any) {
  if (currentUnit === this.dataset.unit) {
    return;
  };
  currentUnit = this.dataset.unit;
  localStorage.setItem('unit', currentUnit);
  renderTemperatureUnit(currentUnit);
  renderUnitButtons(this);
  handleForecast(lastCity);
};

const handleLocalSettings = () =>  {
  const localSettings = getSettings();
  if (localSettings.city) {
    lastCity = localSettings.city;
  };
  if (localSettings.unit) {
    currentUnit = localSettings.unit;
  };
};

export const loadFreshPage = () => {
  handleLocalSettings();
  handleForecast(lastCity);
};
