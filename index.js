const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const forecastSection = document.querySelector('.forecast');


const place = document.querySelector('.forecast__place');
const countryPlace = document.querySelector('.forecast__country');
const temperature = document.querySelector('.forecast__temperature');
const description = document.querySelector('.forecast__description');
const pressure = document.querySelector('#pressure')
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const weatherIco = document.querySelector('.forecast__precipitation-img');
const feelsLike = document.querySelector('#feels-like')
const error400 = document.querySelector('.error400');

const setLocation = ({name, country}) => {
    place.textContent = `${name}`
    countryPlace.textContent = `${country}`
};

const setDigits = (current) => {
    console.log(current)
    
    temperature.textContent = `${current.temp_c}°C`;
    description.textContent = current.condition.text;
    pressure.textContent = `${current.pressure_mb} mB`;
    humidity.textContent = `${current.humidity}%`;
    windSpeed.textContent = `${current.wind_kph}Km/h`;
    feelsLike.textContent = `${current.feelslike_c}°C`;

    hideError()
    
};

const setIco = ({text, icon}) => {
    switch (text) {

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
        weatherIco.src = icon;
    }
};

const hideError = () => {
    error400.classList.remove('error400_active');
    forecastSection.classList.add('forecast_active');
};

const showError = () => {
    forecastSection.classList.remove('forecast_active');
    error400.classList.add('error400_active');
};
            
const getForecast = () => {
        const APIKey = '665b2b0576d8479dba0134633231504';
        const city = searchInput.value;

        if (city === '') { return }
                
        fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLocation(data.location)
                setDigits(data.current)
                setIco(data.current.condition)    
            })        
                
        .catch((err) => {
            showError()
            console.log(err.message)    
        })
};

searchButton.addEventListener('click', () => getForecast());