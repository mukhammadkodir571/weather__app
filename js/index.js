const API_KEY = "906aaabb2b6fbcf91d3868afecc3f7b6";
const BASE_URL = "https://api.openweathermap.org";

let elLocation = selectElement(".info__location");
let elDate = selectElement(".info__date");
let elDegree = selectElement(".info__degree");
let elWeather = selectElement(".info__weather-name");
let elWeatherBetween = selectElement(".info__weather-between");
let elWeatherIcon = selectElement(".weather__icon");
let elInput = selectElement(".form__input");
let elSuggestions = selectElement(".form__suggestions");


let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let getDate = () => {
  let date = new Date();
  return `${days[date.getDay()]}, ${
    months[date.getMonth()]
  }, ${date.getDate()}, ${date.getFullYear()}`;
};

let render = weather => {
 
  elLocation.textContent = weather.name;
  elDegree.textContent = `${Math.round(weather.main.temp - 273.15)}°C`;
  elWeather.textContent = weather.weather[0].main;
   let tempMin = weather.main.temp_min
     ? Math.round(weather.main.temp_min - 273.15)
     : "N/A";
   let tempMax = weather.main.temp_max
     ? Math.round(weather.main.temp_max - 273.15)
    : "N/A";
  


   elWeatherBetween.textContent = `${tempMin}°C / ${tempMax}°C`;

  const iconCode = weather.weather[0].icon;
  elWeatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  elWeatherIcon.alt = weather.weather[0].description;
  elDate.textContent = getDate();
};

let getWeather = async (lat, lon) => {
  let path = `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  let weather = await request(path);
  render(weather);
};
let onSearch = debounce(async (evt) => {
  
  if (evt.target.value) {
    let path = `/geo/1.0/direct?q=${evt.target.value}&limit=5&appid=${API_KEY}`;
    let locations = await request(path);
    elSuggestions.innerHTML = null;
    locations.forEach((location) => {
      let elLi = createElement("li");

      elLi.textContent = location.name;
      elLi.dataset.lat = location.lat;
      elLi.dataset.lon = location.lon;
      elSuggestions.append(elLi);
    })

   
  } else {
    elSuggestions.innerHTML = null;
  }
}, 500)

let onSelectLocation = (evt) => {

  if (evt.target.tagName === "LI") {
    elInput.value = null;
    elSuggestions.innerHTML = null;
  }
  
  let lat = evt.target.dataset.lat;
  let lon = evt.target.dataset.lon;

  elSuggestions.innerHTML = null;


  getWeather(lat, lon);

  
}
elInput.addEventListener('input', onSearch)
elSuggestions.addEventListener('click', onSelectLocation)
getWeather("51.5073219", "-0.1276474");
