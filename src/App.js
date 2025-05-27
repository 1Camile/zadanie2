import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import weatherService from './services/weatherService';

function App() {
  const [countries, setCountries] = useState(["Polska", "USA", "Niemcy", "Francja"]);
  const [cities, setCities] = useState({
    Polska: ["Warszawa", "Kraków", "Gdańsk", "Lublin"],
    USA: ["Nowy Jork", "Los Angeles", "Chicago"],
    Niemcy: ["Berlin", "Monachium", "Hamburg"],
    Francja: ["Paryż", "Marsylia", "Lyon"]
  });
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  // Logowanie daty uruchomienia, portu, imienia i nazwiska autora
  useEffect(() => {
    const now = new Date();
    const author = "Kamila Karwat";
    const port = 3000;
    console.log(`Aplikacja uruchomiona: ${now}`);
    console.log(`Autor: ${author}`);
    console.log(`Nasłuchuję na porcie: ${port}`);
  }, []);

  // Obsługuje wybór kraju
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity('');
  };

  // Obsługuje wybór miasta
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // Obsługuje kliknięcie przycisku
  const handleGetWeather = async () => {
    if (selectedCountry && selectedCity) {
      try {
        const data = await weatherService.getWeather(selectedCity, selectedCountry);
        setWeatherData(data);
      } catch (error) {
        console.error("Błąd pobierania pogody:", error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Wybierz kraj i miasto, aby sprawdzić pogodę</h1>

      <select onChange={handleCountryChange} value={selectedCountry}>
        <option value="">Wybierz kraj</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>

      <select onChange={handleCityChange} value={selectedCity} disabled={!selectedCountry}>
        <option value="">Wybierz miasto</option>
        {selectedCountry && cities[selectedCountry]?.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>

      <button onClick={handleGetWeather}>Sprawdź pogodę</button>

      {weatherData && (
        <Weather data={weatherData} />
      )}
    </div>
  );
}

export default App;
