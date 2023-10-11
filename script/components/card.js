const cardComponent = async () => {
    const app = document.querySelector('#app');
    const textInput = document.getElementById("text-input");
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

        const icon = document.createElement('img');
        icon.classList.add('weatherIcon');

        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = `${data.description}`;

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

        fragment.appendChild(card);
    });

    app.appendChild(fragment);

    textInput.addEventListener("keyup", async function(event) {
        if (event.key === "Enter") {
            app.innerHTML = "";
            await cardComponent();
        }
    });

};

export { cardComponent };
