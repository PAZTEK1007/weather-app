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
                    windSpeed: data.wind.speed,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset
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

    app.innerHTML = ""; // Efface le contenu précédent avant d'ajouter les nouvelles cartes.

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
        
        const slideContainer = document.createElement('div');
        slideContainer.classList.add('slide-container');

        const slideList = document.createElement('ul');
        slideList.classList.add('slide-inner');

        const monday = document.createElement('div');
        const titleMonday = document.createElement('h3');
        titleMonday.textContent = "Mon";
        monday.classList.add('day');

        const tuesday = document.createElement('div');
        const titleTuesday = document.createElement('h3');
        tuesday.classList.add('day');
        titleTuesday.textContent = "Tue";

        const wednesday = document.createElement('div');
        const titleWednesday = document.createElement('h3');
        wednesday.classList.add('day'); 
        titleWednesday.textContent = "Wed";

        const thursday = document.createElement('div');
        const titleThursday = document.createElement('h3');
        thursday.classList.add('day');
        titleThursday.textContent = "Thu";

        const friday = document.createElement('div');
        const titleFriday = document.createElement('h3');
        friday.classList.add('day');
        titleFriday.textContent = "Fri";

        const saturday = document.createElement('div');
        const titleSaturday = document.createElement('h3');
        titleSaturday.textContent = "Sat";
        saturday.classList.add('day');

        const sunday = document.createElement('div');
        const titleSunday = document.createElement('h3');
        titleSunday.textContent = "Sun";
        sunday.classList.add('day');

        // Logique pour attribuer l'icône en fonction de la description météo.
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
        monday.appendChild(titleMonday);
        tuesday.appendChild(titleTuesday);
        wednesday.appendChild(titleWednesday);
        thursday.appendChild(titleThursday);
        friday.appendChild(titleFriday);
        saturday.appendChild(titleSaturday);
        sunday.appendChild(titleSunday);

        slideList.appendChild(monday);
        slideList.appendChild(tuesday);
        slideList.appendChild(wednesday);
        slideList.appendChild(thursday);
        slideList.appendChild(friday);
        slideList.appendChild(saturday);
        slideList.appendChild(sunday);

        slideContainer.appendChild(slideList);

        card.appendChild(city);
        card.appendChild(icon);
        card.appendChild(description);
        card.appendChild(temperature);
        card.appendChild(slideContainer);

        app.appendChild(card);
    });
    };

    textInput.addEventListener("keyup", async function(event) {
        if (event.key === "Enter") {
            await updateWeatherCards();
        }
    });
};

export { card };
// Appelez updateWeatherCards() au chargement de la page si vous voulez afficher les prévisions météo par défaut.
// updateWeatherCards();
