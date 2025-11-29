import React, { useState } from "react";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "027c1ea13f954804853161520252911"; // Replace with working key

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setError("No matching location found!");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      setWeather(null);
    }
  };

  return (
    <div className="card">
      <h2>Simple Weather App</h2>

      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-data">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🎐 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
