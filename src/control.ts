import { getWeatherData } from "./API";
import { getFormData } from "./form";
import { renderForecast } from "./render";

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
  ]
};

const handleForecast = async (city: string) => {
  const response = await getWeatherData(city);
  const forecast = Object.assign(<Forecast>{}, response!)
  renderForecast(forecast);
};

export const handleNewInput = (defaultCity: string | null): void => {
  let city = defaultCity ? defaultCity : getFormData();
  handleForecast(city);
};

/* {
    base: "stations"
clouds:
    all: 7
[[Prototype]]: Object
    cod: 200
coord:
    lat: 56.9942
    lon: 40.9858
[[Prototype]]: Object
dt: 1660236291
id: 555312
main:
    feels_like: 289.54
    grnd_level: 1009
    humidity: 60
    pressure: 1024
    sea_level: 1024
    temp: 290.21
    temp_max: 290.21
    temp_min: 290.21
[[Prototype]]: Object
name: "Ivanovo"
sys:
    country: "RU"
    sunrise: 1660181675
    sunset: 1660237690
[[Prototype]]: Object
timezone: 10800
visibility: 10000
weather: Array(1)
0: {id: 800, main: 'Clear', description: 'clear sky', icon: '01d'}
length: 1
[[Prototype]]: Array(0)
wind:
    deg: 323
    gust: 1.87
    speed: 1.88
[[Prototype]]: Object
[[Prototype]]: Object
} */
