// OpenWeatherMap API Configuration
// Note: Replace with your own API key from https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Main search function
async function handleSearch() {
    const city = searchInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please add your OpenWeatherMap API key to the script.js file');
        return;
    }

    hideError();
    try {
        await fetchWeatherData(city);
    } catch (error) {
        showError('Failed to fetch weather data. Please check the city name and try again.');
        console.error('Error:', error);
    }
}

// Fetch current weather and forecast
async function fetchWeatherData(city) {
    try {
        // Fetch current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&units=imperial&appid=${API_KEY}`
        );

        if (!currentResponse.ok) {
            throw new Error('City not found');
        }

        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=imperial&appid=${API_KEY}`
        );

        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        throw error;
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const {
        name,
        main: { temp, feels_like, humidity, pressure },
        weather: [{ description, icon }],
        wind: { speed }
    } = data;

    // Update DOM
    document.getElementById('cityName').textContent = name;
    document.getElementById('temperature').textContent = Math.round(temp);
    document.getElementById('weatherDescription').textContent = description;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(speed)} mph`;
    document.getElementById('feelsLike').textContent = `${Math.round(feels_like)}°F`;
    document.getElementById('pressure').textContent = `${pressure} mb`;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    // Show current weather section
    currentWeatherDiv.classList.remove('hidden');

    // Clear search input
    searchInput.value = '';
}

// Display 5-day forecast
function displayForecast(data) {
    const forecastList = data.list;
    const dailyForecasts = {};

    // Group forecasts by day
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });

    // Create forecast cards
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    let count = 0;
    for (const date in dailyForecasts) {
        if (count >= 5) break;

        const forecast = dailyForecasts[date];
        const card = createForecastCard(date, forecast);
        forecastContainer.appendChild(card);
        count++;
    }

    // Show forecast section
    forecastDiv.classList.remove('hidden');
}

// Create a forecast card element
function createForecastCard(date, data) {
    const card = document.createElement('div');
    card.className = 'forecast-card';

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    card.innerHTML = `
        <div class="date">${date}</div>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon" class="icon">
        <div class="temp">${temp}°F</div>
        <div class="description">${description}</div>
    `;

    return card;
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    currentWeatherDiv.classList.add('hidden');
    forecastDiv.classList.add('hidden');
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('show');
}

// Initialize
console.log('Weather Dashboard loaded. Add your OpenWeatherMap API key to get started!');