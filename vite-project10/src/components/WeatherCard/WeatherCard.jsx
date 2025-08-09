import "./WeatherCard.css";

import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  /*   const weatherOptionCondition = filteredOptions[0]?.condition;*/

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg;</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        }weather`}
        className="weather-card__image"
      ></img>
    </section>
  );
}

export default WeatherCard;
