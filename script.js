const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.getElementById("weather-img");
const temperature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

// fecthing data
async function checkWeather(city) {
  const api_key = "29555096854163134956b43126bce7dd";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  if (weather_data.cod === `404`) {
    not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log(`error`);
    return;
  }
  not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>o</sup>C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
 
  // for images 
  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4DnvhFG1KPned0UdolagOuxQmXlsPojBzhQ&s";
      break;
    case "Clear":
      weather_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIWM7Q_uSENhfZmWwHWmwZXRSpDDur6H-qw&s";
      break;
    case "Rain":
      weather_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnl8F8U7kLYyyxkA1W_UgElt8RT6U9pH4hAQ&s";
      break;
    case "Mist":
      weather_img.src = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png";
      break;
    case "Snow":
      weather_img.src = "https://static.vecteezy.com/system/resources/previews/008/854/795/non_2x/sunny-and-rainy-cloudy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png";
      break;
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
