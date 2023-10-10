
const data = async () => {

const apiKey = "785b8de1d01961c956e950a339e714ff";
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
            windSpeed: data.wind.speed,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        };
    } catch (error) {
        console.error("Erreur lors de la requête à l'API OpenWeather : " + error);
    }
};

const cardComponent = async () => {
    const cities = textInput.value.split(',');
    const weatherDataPromises = cities.map(city => getWeatherData(city));
    const weatherData = await Promise.all(weatherDataPromises);

    const fragment = document.createDocumentFragment();

    weatherData.forEach(data => {
        const card = document.createElement('div');
        card.classList.add('card');

        const city = document.createElement('h2');
        city.classList.add('city');
        city.textContent = `${data.city}, ${data.country}`;

        const temperature = document.createElement('p');
        temperature.classList.add('temperature');
        temperature.textContent = `${data.temperature} °C`;

        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = `${data.description}`;

        card.appendChild(city);
        card.appendChild(description);
        card.appendChild(temperature);

        fragment.appendChild(card);
    });

    app.appendChild(fragment);
};

textInput.addEventListener("keyup", async function(event) {
    if (event.key === "Enter") {
        app.innerHTML = "";
        await cardComponent();
    }
});
};

export { data };