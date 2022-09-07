function fetchWeather(city) {
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=' +
      apiKEY +
      '&units=metric'
  )
    .then((response) => {
      if (!response.ok) {
        alert('No weather found !');
        throw new Error('No weather found !');
      }
      return response.json();
    })
    .then((data) => displayWeather(data));
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  document.querySelector('.location').innerHTML = 'Weather in ' + name;
  document.querySelector('.temp').innerHTML = temp + '°C';
  document.querySelector('.icon').src =
    'https://openweathermap.org/img/wn/' + icon + '.png';
  document.querySelector('.description').innerHTML = description;
  document.querySelector('.humidity').innerHTML = 'Humidity: ' + humidity;
  document.querySelector('.wind').innerHTML = 'Wind speed: ' + speed + 'km/h';
  document.querySelector('.weather-info').classList.remove('loading');
}

function searchWeather() {
  fetchWeather(document.querySelector('#search-bar').value);
}

document
  .querySelector('#search-button')
  .addEventListener('click', () => searchWeather());
document.querySelector('#search-bar').addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    searchWeather();
  }
});

fetchWeather('ipoh');
