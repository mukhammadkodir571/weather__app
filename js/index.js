const API_KEY = "906aaabb2b6fbcf91d3868afecc3f7b6";
const BASE_URL = "https://api.openweathermap.org";

let elLocation = selectElement(".info__location");
let elDate = selectElement(".info__date");
let elDegree = selectElement(".info__degree");
let elWeather = selectElement(".info__weather-name");
let elWeatherBetween = selectElement(".info__weather-between");
let elWeatherIcon = selectElement(".weather__icon");
let elInput = selectElement(".form__input");


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
  console.log(weather);
  elLocation.textContent = weather.name;
  elDegree.textContent = `${Math.round(weather.main.temp - 273.15)}°C`;
  elWeather.textContent = weather.weather[0].main;
  elWeatherBetween.textContent = `${Math.round(
    weather.main.temp_min - 273.15
  )}°C / ${Math.round(weather.main.temp_max - 273.15)}°C`;

  const iconCode = weather.weather[0].icon;
  elWeatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  elWeatherIcon.alt = weather.weather[0].description;
  elDate.textContent = getDate();

  // ✅ Corrected video element selection
  const backgroundVideo = document.getElementById("background__video");

  if (backgroundVideo) {
    const weatherCondition = weather.weather[0].main.toLowerCase();

    if (weatherCondition.includes("cloud")) {
      backgroundVideo.src = "videos/cloudy.mp4";
    } else if (weatherCondition.includes("clear")) {
      backgroundVideo.src = "videos/sunny.mp4";
    } else if (weatherCondition.includes("rain")) {
      backgroundVideo.src = "videos/rain.mp4";
    } else if (weatherCondition.includes("snow")) {
      backgroundVideo.src = "videos/snow.mp4";
    } else if (
      weatherCondition.includes("haze") ||
      weatherCondition.includes("mist") ||
      weatherCondition.includes("fog")
    ) {
      backgroundVideo.src = "videos/haze.mp4"; // Add your haze video path
    } else {
      backgroundVideo.src = "videos/default.mp4"; // Default video path
    }
  }
};

let getWeather = async (lat, lon) => {
  let path = `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  let weather = await request(path);
  render(weather);
};
let onSearch = debounce(async (evt) => {
  if (evt.target.value) {
    let path = `/geo/1.0/direct?q=${evt.target.value}&limit=5&appid=${API_KEY}`;
    let location = await request(path);
    console.log(location);
  }
},500)
elInput.addEventListener('input', onSearch)
// getWeather("51.5073219", "-0.1276474");
