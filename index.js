const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const forecastSection = document.querySelector('.forecast');
const container = document.forms['forecast'];
const searchMe = document.querySelector('.search__me')
const searchMeBtn = searchMe.querySelector('.search__button');

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

class Forecast {
    constructor() {
        this._ApiKey = '665b2b0576d8479dba0134633231504';
    }

    _showError = () => {
        forecastSection.classList.remove('forecast_active');
        error400.classList.add('error400_active');
        searchMe.classList.remove('search__me_hide')
    };

    _hideError = () => {
        error400.classList.remove('error400_active');
        searchMe.classList.add('search__me_hide')
        forecastSection.classList.add('container-fadeIn')
        forecastSection.classList.add('forecast_active');
    };

    _setLocation = ({name, country}) => {
        place.textContent = `${name}`
        countryPlace.textContent = `${country}`
    };

    _setDigits = (current) => {    
        temperature.textContent = `${current.temp_c}°C`;
        description.textContent = current.condition.text;
        pressure.textContent = `${current.pressure_mb} mB`;
        humidity.textContent = `${current.humidity}%`;
        windSpeed.textContent = `${current.wind_kph}Km/h`;
        feelsLike.textContent = `${current.feelslike_c}°C`;
    
        this._hideError()
        
    };

    _setIco = ({text, icon}) => {
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

    getForecast(city) {
        if (city === '') { return }
                
        fetch(`https://api.weatherapi.com/v1/current.json?key=${this._ApiKey}&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                this._setLocation(data.location)
                this._setDigits(data.current)
                this._setIco(data.current.condition)    
            })        
                
        .catch((err) => {
            this._showError()
            console.log(err.message)
        })
    }
};

const api = new Forecast();

container.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let input = searchInput.value;
    api.getForecast(input)
});

searchMeBtn.addEventListener('click', () => {
    const data = ymaps.geolocation;
    api.getForecast(data.city)
});