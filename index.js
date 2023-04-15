const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const forecastSection = document.querySelector('.forecast');

const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const weatherIco = document.querySelector('.precipitation-img');
const error400 = document.querySelector('.error400');

searchButton.addEventListener('click', () => {
    const APIKey = '665b2b0576d8479dba0134633231504';
    const city = searchInput.value;

    if (city === '') { return }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        temperature.textContent = `${data.current.temp_c}°C`
        description.textContent = data.current.condition.text
        humidity.textContent = `${data.current.humidity}%`
        windSpeed.textContent = `${data.current.wind_kph}Km/h`
        error400.classList.remove('error400_active')
        forecastSection.classList.add('forecast_active');
        switch (data.current.condition.text) {
            case 'Clear':
                weatherIco.src = './images/clear.png';
                break;
            case 'rain':
                weatherIco.src = './images/rain.png';
                break;
            case 'mist':
                weatherIco.src = './images/mist.png';
                break;
            case 'cloud':
                weatherIco.src = './images/cloud.png';
                break;
            case 'snow':
                weatherIco.src = './images/snow.png';
                break;
            default:
                weatherIco.src = data.current.condition.icon;
        }
    })        

    .catch(() => {
            forecastSection.classList.remove('forecast_active')
            error400.classList.add('error400_active')        
    })
})