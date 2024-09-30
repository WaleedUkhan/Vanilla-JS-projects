// API key from OpenWeatherMap website
const apiKey = "2f384269930e518a7ec08e841db00f97";

// Function to fetch and display current weather data
function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Parse and display current weather data
      const cityName = data.name;
      const temperature = data.main.temp;
      const weatherCondition = data.weather[0].description;
      const weatherIcon = data.weather[0].icon; // Get the weather icon code

      document.getElementById("city-name").textContent = cityName;
      document.getElementById(
        "temperature"
      ).textContent = `Temperature: ${temperature}°C`;
      document.getElementById(
        "weather-condition"
      ).textContent = `Condition: ${weatherCondition}`;
      document.getElementById(
        "weather-icon"
      ).src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`; // Set the weather icon
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Function to fetch and display 5-day weather forecast data
function fetchWeatherForecast(city) {
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(forecastApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("5-Day Forecast Data:", data);
      displayWeatherForecast(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Function to display the 5-day weather forecast
function displayWeatherForecast(data) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = ""; // Clear any previous forecast data

  // Loop through the forecast data and extract information for each day
  for (let i = 0; i < data.list.length; i += 8) {
    // OpenWeatherMap API gives data every 3 hours, so we take every 8th entry for daily data
    const forecast = data.list[i];
    const date = new Date(forecast.dt_txt).toLocaleDateString(undefined, {
      weekday: "short",
    });
    const temperature = forecast.main.temp;
    const weatherCondition = forecast.weather[0].description;
    const weatherIcon = forecast.weather[0].icon; // Get the forecast icon code

    // Create forecast elements
    const forecastDay = document.createElement("div");
    forecastDay.classList.add("forecast-day");

    forecastDay.innerHTML = `
            <p>${date}</p>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="Weather Icon"> <!-- Add icon here -->
            <p>Temp: ${temperature}°C</p>
            <p>${weatherCondition}</p>
        `;

    // Append the forecast day to the forecast container
    forecastContainer.appendChild(forecastDay);
  }
}

// Event listener for search button
document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    fetchWeatherData(city);
    fetchWeatherForecast(city);
    document.getElementById("city-input").value = ""; // Clear the input field after search
  } else {
    alert("Please enter a city name.");
  }
});
