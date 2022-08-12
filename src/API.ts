export const getWeatherData = async (city: string) => {
  let data: any;
  try {
    const forecast = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5b43226f222518ddfbbd7f501ffd484c`
    );
    data = await forecast.json();
    if (data.cod !== 200) {
      throw data.message;
    }
    return data;
  } catch (err) {
    console.log(err); //TODO error handler
    return err;
  }
};
