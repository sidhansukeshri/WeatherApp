document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'eacea25a7a4fb172c2f8ad104be734ed'; // Replace with your OpenWeatherMap API key
    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const locationName = document.getElementById('locationName');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const weatherCondition = document.getElementById('weatherCondition');
    const errorMessage = document.getElementById('errorMessage');

    searchButton.addEventListener('click', () => {
        const city = cityInput.value;

        // Clear previous error message
        errorMessage.textContent = '';

        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(data => {
                    if (data.cod === 200) {
                        locationName.textContent = data.name;
                        temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
                        weatherCondition.textContent = data.weather[0].description;
                        const iconCode = data.weather[0].icon;
                        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${data.weather[0].description}">`;
                    } else {
                        errorMessage.textContent = 'City not found';
                        clearWeatherInfo();
                    }
                })
                .catch(error => {
                    errorMessage.textContent = 'An error occurred. Please try again later.';
                    clearWeatherInfo();
                });
        } else {
            errorMessage.textContent = 'Please enter a city name.';
            clearWeatherInfo();
        }
    });

    function clearWeatherInfo() {
        locationName.textContent = '';
        temperature.textContent = '';
        weatherCondition.textContent = '';
        weatherIcon.innerHTML = '';
    }
});
