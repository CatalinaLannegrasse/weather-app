import './style.css';
import { renderWeather, renderLoading } from './dom';

const API_KEY = '55UT52AY6RYUMQFZ62BATYWPJ';

let currentWeatherData = null;
let currentUnit = 'f';

function processData(rawData) {
  return {
    condition: rawData.currentConditions.conditions,
    icon: rawData.currentConditions.icon, // e.g. "rain", "clear-day", "snow"
    temp: Math.round(rawData.currentConditions.temp),
    feelsLike: Math.round(rawData.currentConditions.feelslike),
    humidity: rawData.currentConditions.humidity,
    windSpeed: rawData.currentConditions.windspeed,
    location: rawData.resolvedAddress,
  };
}

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const rawData = await response.json();
    return processData(rawData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

const form = document.getElementById('search-form');
const input = document.getElementById('location-input');
const toggleBtn = document.getElementById('unit-toggle');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = input.value.trim();

  if (location) {
    renderLoading();
    currentWeatherData = await getWeather(location);
    renderWeather(currentWeatherData, currentUnit);
    input.value = '';
  }
});

toggleBtn.addEventListener('click', () => {
  currentUnit = currentUnit === 'f' ? 'c' : 'f';

  if (currentWeatherData) {
    renderWeather(currentWeatherData, currentUnit);
  }
});