const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const searchform = document.querySelector("[data-searchForm]");
const userinfo = document.querySelector(".user-info-container");
const grantaccess = document.querySelector(".grant-location-container");
const apiKey = "0607c6e47548efd7199e9525f5e6c370";
const loadingscreen = document.querySelector(".loading-container");
const searchInput = document.querySelector("[data-searchInput]");
const grantAccessButton = document.querySelector("[data-grantAccess]");

let curTab = userTab;
curTab.classList.add("current-tab");
getfromsessionstorage();

// Switch Tabs
function switchTab(newTab) {
    if (newTab !== curTab) {
        curTab.classList.remove("current-tab");
        curTab = newTab;
        curTab.classList.add("current-tab");

        if (!searchform.classList.contains("active")) {
            userinfo.classList.remove("active");
            grantaccess.classList.remove("active");
            searchform.classList.add("active");
        } else {
            searchform.classList.remove("active");
            userinfo.classList.remove("active");
            getfromsessionstorage();
        }
    }
}

// Event Listeners for Tabs
userTab.addEventListener("click", () => switchTab(userTab));
searchTab.addEventListener("click", () => switchTab(searchTab));

// Get Data from Session Storage
function getfromsessionstorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantaccess.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchweatherinfo(coordinates);
    }
}

// Fetch Weather Info by Coordinates
async function fetchweatherinfo(coordinates) {
    const { lat, lon } = coordinates;
    grantaccess.classList.remove("active");
    loadingscreen.classList.add("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (response.ok) {
            loadingscreen.classList.remove("active");
            userinfo.classList.add("active");
            renderweatherinfo(data);
            
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        loadingscreen.classList.remove("active");
        alert("Failed to fetch weather information. Please try again...");
    }
}

// Render Weather Info
function renderweatherinfo(data) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText = data?.name || "Unknown Location";
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country?.toLowerCase() || "unknown"}.png`;
    desc.innerText = data?.weather?.[0]?.description || "No description available";
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = `${data?.main?.temp ?? "N/A"}°C`;
    windspeed.innerText = `${data?.wind?.speed ?? "N/A"} m/s`;
    humidity.innerText = `${data?.main?.humidity ?? "N/A"}%`;
    cloudiness.innerText = `${data?.clouds?.all ?? "N/A"}%`;
}

// Get User Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, () => {
            alert("Location access denied. Please enable it to fetch weather data.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Save Coordinates and Fetch Weather Info
function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchweatherinfo(userCoordinates);
}

// Event Listener for Grant Access Button
grantAccessButton.addEventListener("click", getLocation);

// Event Listener for Search Form
searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = searchInput.value.trim();
    if (cityName) {
        fetchSearchWeatherInfo(cityName);
    }
});

// Fetch Weather Info by City Name
async function fetchSearchWeatherInfo(city) {
    loadingscreen.classList.add("active");
    userinfo.classList.remove("active");
    grantaccess.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (response.ok) {
            loadingscreen.classList.remove("active");
            userinfo.classList.add("active");
            renderweatherinfo(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        loadingscreen.classList.remove("active");
        console.error("Error fetching weather data:", error);
        alert("Error 404 : City not found");
    }
}
