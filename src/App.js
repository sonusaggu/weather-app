import React, {useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };
  
  const getWeather = async () => {
    if (!city) return;
  
    setLoading(true);
    setError('');
  
    try {
      const apiKey = 'e9e43d1f5f283fb4e23a19d83c8bb0fa';  // Replace with your API key
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter city" 
          value={city} 
          onChange={handleInputChange} 
        />
        <button type="submit" disabled={loading}>Get Weather</button>
      </form>
  
      {loading && <p>Loading...</p>}
  
      {error && <p>{error}</p>}
  
      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <h3>{weatherData.main.temp}°C</h3>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
  
}

export default App;
