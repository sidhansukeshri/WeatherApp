document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'eacea25a7a4fb172c2f8ad104be734ed'; // Replace with your OpenWeatherMap API key
    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const locationName = document.getElementById('locationName');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const weatherCondition = document.getElementById('weatherCondition');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const visibility = document.getElementById('visibility');
    const unitToggle = document.getElementById('unitToggle');
    const errorMessage = document.getElementById('errorMessage');
    const backgroundImages = {
        '01d': 'clear-sky-day.jpg',
        '01n': 'clear-sky-night.jpg',
        '02d': 'few-clouds-day.jpg',
        '02n': 'few-clouds-night.jpg',
        '03d': 'scattered-clouds.jpg',
        '03n': 'scattered-clouds.jpg',
        '04d': 'broken-clouds.jpg',
        '04n': 'broken-clouds.jpg',
        '09d': 'shower-rain-day.jpg',
        '09n': 'shower-rain-night.jpg',
        '10d': 'rain-day.jpg',
        '10n': 'rain-night.jpg',
        '11d': 'thunderstorm-day.jpg',
        '11n': 'thunderstorm-night.jpg',
        '13d': 'snow-day.jpg',
        '13n': 'snow-night.jpg',
        '50d': 'mist-day.jpg',
        '50n': 'mist-night.jpg',
    };

    unitToggle.addEventListener('change', () => {
        // Handle unit conversion when the toggle changes
        const unit = unitToggle.querySelector('input[name="unit"]:checked').value;

        // Check if temperature has a value and update it with the selected unit
        if (temperature.textContent) {
            const currentTemp = parseFloat(temperature.textContent);
            const convertedTemp = unit === 'metric' ? (currentTemp - 32) * 5/9 : (currentTemp * 9/5) + 32;
            temperature.textContent = `${convertedTemp.toFixed(1)}°${unit === 'metric' ? 'C' : 'F'}`;
        }
    });

    searchButton.addEventListener('click', () => {
        const city = cityInput.value;
        const unit = unitToggle.querySelector('input[name="unit"]:checked').value;

        // Clear previous error message
        errorMessage.textContent = '';

        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(data => {
                    if (data.cod === 200) {
                        locationName.textContent = data.name;
                        temperature.textContent = `${data.main.temp.toFixed(1)}°${unit === 'metric' ? 'C' : 'F'}`;
                        weatherCondition.textContent = data.weather[0].description;
                        humidity.textContent = `Humidity: ${data.main.humidity}%`;
                        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                        visibility.textContent = `Visibility: ${data.visibility} meters`;
                        const iconCode = data.weather[0].icon;
                        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${data.weather[0].description}">`;
                        // Change background image based on weather condition
                        const background = backgroundImages[iconCode] || 'default-background.jpg';
                        document.body.style.backgroundImage = `url('${background}')`;
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
        humidity.textContent = '';
        windSpeed.textContent = '';
        visibility.textContent = '';
        weatherIcon.innerHTML = '';
        // Reset background to default
        document.body.style.backgroundImage = `url('default-background.jpg')`;
    }
});
