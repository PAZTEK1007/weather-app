const card = () => {

const apiKey = '785b8de1d01961c956e950a339e714ff';
const app = document.querySelector('#app');
const textInput = document.getElementById("text-input");

const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].main,
            humidity: data.main.humidity,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
        };
    } catch (error) {
        console.error("Erreur lors de la requête à l'API OpenWeather : " + error);
        throw error;
    }
};

const updateWeatherCards = async () => {
    const cities = textInput.value.split(',');
    const weatherDataPromises = cities.map(city => getWeatherData(city.trim()));
    const weatherData = await Promise.all(weatherDataPromises);

    app.innerHTML = "";

    weatherData.forEach(data => {
        const card = document.createElement('div');
        card.classList.add('card');

        const city = document.createElement('h2');
        city.classList.add('city');
        city.textContent = `${data.city}, ${data.country}`;

        const temperature = document.createElement('p');
        temperature.classList.add('temperature');
        temperature.textContent = `${data.temperature} °C`;

        const icon = document.createElement('img');
        icon.classList.add('weatherIcon');

        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = `${data.description}`;

        const humidity = document.createElement('p');
        humidity.classList.add('humidity');
        humidity.textContent = `Humidity: ${data.humidity}%`;

        const temp_min = document.createElement('p');
        temp_min.classList.add('temp_min');
        temp_min.textContent = `Min: ${data.temp_min} °C`;

        const temp_max = document.createElement('p');
        temp_max.classList.add('temp_max');
        temp_max.textContent = `Max: ${data.temp_max} °C`;

        if (data.description === "Clouds") {
            icon.src = "./public/img/icon/cloudy.svg";
        } else if (data.description === "Clear") {
            icon.src = "./public/img/icon/day.svg";
        } else if (data.description === "Rain") {
            icon.src = "./public/img/icon/rainy-1.svg";
        } else if (data.description === "Snow") {
            icon.src = "./public/img/icon/snowy-1.svg";
        } else if (data.description === "Thunderstorm") {
            icon.src = "./public/img/icon/thunder.svg";
        } else if (data.description === "Drizzle") {
            icon.src = "./public/img/icon/rainy-4.svg";
        }

        card.appendChild(city);
        card.appendChild(icon);
        card.appendChild(description);
        card.appendChild(temperature);
        card.appendChild(humidity);
        card.appendChild(temp_min);
        card.appendChild(temp_max);

        app.appendChild(card);
    });
};
textInput.addEventListener("keyup", async function(event) {
    if (event.key === "Enter") {
        await updateWeatherCards();
        await updateCastCards();
    }
});
}


export { card };
