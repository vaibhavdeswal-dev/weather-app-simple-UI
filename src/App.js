import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      const apiKey = "027c1ea13f954804853161520252911";  // Your key
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
        return;
      }

      setWeather(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", borderRadius: "5px" }}
      />

      <button
        onClick={() => fetchWeather(city)}   // <-- FIXED HERE
        style={{
          marginLeft: "10px",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px gray",
            display: "inline-block",
            width: "300px",
          }}
        >
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <img src={weather.current.condition.icon} alt="icon" />
          <h3>{weather.current.temp_c}°C</h3>
          <p>{weather.current.condition.text}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
