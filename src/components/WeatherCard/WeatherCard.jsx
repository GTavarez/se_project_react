import "./WeatherCard.css";

import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureContext from "../../context/CurrentTemperatureUnit";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureContext);
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
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg;{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherData.isDay ? "day" : "night"}time ${
          weatherData.condition
        }weather`}
        className="weather-card__image"
      ></img>
    </section>
  );
}

export default WeatherCard;
