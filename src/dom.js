function toCelsius(f) {
  return Math.round(((f - 32) * 5) / 9);
}

function applyWeatherTheme(icon) {
  document.body.className = '';

  if (icon.includes('clear')) {
    document.body.classList.add('theme-clear');
  } else if (icon.includes('rain') || icon.includes('showers')) {
    document.body.classList.add('theme-rain');
  } else if (icon.includes('snow') || icon.includes('sleet')) {
    document.body.classList.add('theme-snow');
  } else if (icon.includes('thunder')) {
    document.body.classList.add('theme-thunder');
  } else if (icon.includes('cloud') || icon.includes('fog')) {
    document.body.classList.add('theme-cloudy');
  } else {
    document.body.classList.add('theme-default');
  }
}

export function renderWeather(data, currentUnit = 'f') {
  const display = document.getElementById('weather-display');

  if (!data) {
    display.innerHTML = `<p class="error">Location not found. Please try again!</p>`;
    return;
  }

  applyWeatherTheme(data.icon);

  const isCelsius = currentUnit === 'c';
  const displayTemp = isCelsius ? toCelsius(data.temp) : data.temp;
  const displayFeelsLike = isCelsius ? toCelsius(data.feelsLike) : data.feelsLike;
  const unitLetter = isCelsius ? 'C' : 'F';
  const speedUnit = isCelsius ? 'km/h' : 'mph';

  const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${data.icon}.svg`;

  display.innerHTML = `
    <h2 class="location">${data.location}</h2>
    <div class="weather-icon-container">
      <img src="${iconUrl}" alt="${data.condition}" class="weather-icon" />
    </div>
    <div class="temp-container">
    <span class="temp">${displayTemp}\u00B0${unitLetter}</span> 
    <span class="condition">${data.condition}</span>
    </div>
    <div class="details">
      <p>Feels Like <strong>${displayFeelsLike}\u00B0${unitLetter}</strong></p>
      <p>Humidity <strong>${data.humidity}%</strong></p>
      <p>Wind <strong>${data.windSpeed} ${speedUnit}</strong></p>
    </div>
  `;
}

export function renderLoading() {
  const display = document.getElementById('weather-display');
  display.innerHTML = `
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="loading-text">Fetching weather data...</p>
    </div>
  `;
}