Weather Application
This is a simple weather application that allows users to check the weather by either searching for a city or by using their current geolocation. It fetches real-time weather data from OpenWeatherMap API and displays it in a clean and user-friendly interface.

Features:
Current Weather: Fetches and displays the current weather data including temperature, wind speed, humidity, and cloudiness.
Geolocation Support: Users can grant location access to get weather information based on their current location.
Search Functionality: Allows users to search for weather information for any city around the world.
Responsive Design: Built with Tailwind CSS to provide a responsive and mobile-friendly interface.

Tech Stack:
HTML: Structure and layout of the application.
CSS: Styled using Tailwind CSS for utility-first styling.
JavaScript: Fetches and handles weather data from the OpenWeatherMap API.
API Key: Weather data is fetched using OpenWeatherMap's free API service.

Setup Instructions:

Clone this repository:
git clone https://github.com/aryannn03/weather-app.git

Open the project in VS Code or any editor that supports live server functionality.
Launch Using "Go Live":

If you're using VS Code, open the project folder and click on the Go Live button in the bottom-right corner (make sure you have the "Live Server" extension installed).
Alternatively, you can right-click the index.html file and choose Open with Live Server.

It can also be accessed by using this link : https://aryannn03.github.io/Weather-Application/

Usage:
When the page loads, you can either:
Grant Location Access to use your geolocation and get the current weather data.
Search for a City by typing the city name in the search box and clicking the search button.

The weather data includes:
City name
Country flag
Description of the weather
Weather icon
Current temperature (°C)
Wind speed (m/s)
Humidity (%)
Cloudiness (%)

Code Structure:
index.html: The main HTML structure of the weather app.
styles.css: Custom styles for the app (using Tailwind CSS).
script.js: JavaScript logic to fetch weather data from the OpenWeatherMap API and handle user interactions.
tailwind.config.js: Tailwind CSS configuration file.


