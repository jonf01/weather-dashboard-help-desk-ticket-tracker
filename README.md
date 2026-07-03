# Weather Dashboard

A beautiful, responsive weather dashboard that fetches real-time weather data and displays current conditions along with a 5-day forecast.

## Features

✨ **Current Weather Display**
- City name and weather description
- Current temperature with "feels like" temperature
- Humidity, wind speed, and pressure
- Weather icon visualization

📅 **5-Day Forecast**
- Daily weather predictions
- Temperature and conditions
- Visual weather icons

🔍 **Easy Search**
- Search weather by city name
- Real-time error handling
- Responsive design for all devices

## Getting Started

### Prerequisites

- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Setup Instructions

1. **Get an API Key**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate a free API key
   - Wait a few minutes for the key to activate

2. **Add Your API Key**
   - Open `script.js`
   - Find this line: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key

3. **Open the App**
   - Open `index.html` in your web browser
   - Or use a local server (e.g., `python -m http.server 8000`)

### How to Use

1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View current weather and 5-day forecast
4. Search for another city anytime

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6)** - Dynamic functionality
- **OpenWeatherMap API** - Weather data

## API Reference

This project uses the OpenWeatherMap API:
- Current Weather: `/weather`
- 5-Day Forecast: `/forecast`

[OpenWeatherMap Documentation](https://openweathermap.org/api)

## File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # JavaScript logic and API calls
└── README.md       # This file
```

## Features Included

- ✅ Search by city name
- ✅ Display current temperature
- ✅ Show humidity, wind speed, pressure
- ✅ 5-day weather forecast
- ✅ Responsive mobile design
- ✅ Error handling
- ✅ Beautiful gradient background
- ✅ Smooth animations

## Future Enhancements

- [ ] Geolocation-based weather
- [ ] Temperature unit toggle (°F / °C)
- [ ] Saved favorite cities
- [ ] Hourly forecast
- [ ] Weather alerts
- [ ] Dark/light theme toggle

## License

This project is open source and available under the MIT License.

## Notes

- The free tier of OpenWeatherMap API is limited to 60 requests per minute
- Forecast data updates every 3 hours
- Make sure your API key has proper permissions enabled

---

**Enjoy your weather dashboard! 🌤️**