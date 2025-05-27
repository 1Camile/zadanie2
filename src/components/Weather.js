import React from 'react';

const Weather = ({ data }) => {
  return (
    <div className="weather-info">
      <h2>Pogoda w {data.name}</h2>
      <p>Temperatura: {data.main.temp}°C</p>
      <p>Wilgotność: {data.main.humidity}%</p>
      <p>Warunki: {data.weather[0].description}</p>
    </div>
  );
};

export default Weather;
