//VARIABLE DECLARATION
let headerLocationText = document.querySelector("#header_location_text b");
let weatherInfoSunrise = document.querySelector("#weather_info_sunrise");
let weatherInfoSunset = document.querySelector("#weather_info_sunset");
let weatherInfoDateTime = document.querySelector("#weather_info_date-time");
let weatherInfoTemperature = document.querySelector(
  "#weather_info_temperature"
);
let weatherInfoFeelsLike = document.querySelector("#weather_info_feels-like");
let weatherInfoMainCondition = document.querySelector(
  "#weather_info_main-condition"
);
let weatherInfoDescription = document.querySelector(
  "#weather_info_description"
);
let weatherDetails = document.querySelectorAll(".weather_details");
let searchBar = document.querySelector("#header_searchbar");
let weatherIcon = document.querySelector("#weather_info_icon");
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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//FUNCTION DECLARATION

async function start(city) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=64f9370582786e9c3d6ae212be7d171b`
    );
    let data = await response.json();
    console.log(data);
    let dateTime = new Date(data.dt * 1000);
    //CHANGE

    weatherInfoSunrise.innerText = `Sunrise ${new Date(
      data.sys.sunrise * 1000
    ).getHours()}:${new Date(data.sys.sunrise * 1000).getMinutes()}`;
    weatherInfoSunset.innerText = `Sunset ${new Date(
      data.sys.sunset * 1000
    ).getHours()}:${new Date(data.sys.sunset * 1000).getMinutes()}`;
    weatherInfoDateTime.innerText = `${days[dateTime.getDay()]} ${
      months[dateTime.getMonth()]
    } ${dateTime.getDate()} ${dateTime.getFullYear()} ${dateTime.getHours()}:${
      dateTime.getMinutes() < 10
        ? "0" + dateTime.getMinutes()
        : dateTime.getMinutes()
    }`;
    headerLocationText.innerText = `${data.name}`;
    weatherInfoTemperature.innerText = `${data.main.temp.toFixed(0)}°C`;
    weatherInfoFeelsLike.innerText = `Feels Like ${data.main.feels_like.toFixed(
      0
    )}°C`;
    weatherInfoMainCondition.innerText = `Weather Condition: ${data.weather[0].main}`;
    weatherInfoDescription.innerText = `Weather Description: ${data.weather[0].description}`;

    weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}.png)`;

    weatherDetails[0].innerText = `Wind Speed: ${data.wind.speed}m/s ${data.wind.deg}°`;
    weatherDetails[1].innerText = `Humidity: ${data.main.humidity}`;
    weatherDetails[2].innerText = `Pressure: ${data.main.pressure}hPa`;
    weatherDetails[3].innerText = `Min Temp: ${data.main.temp_min.toFixed(0)}°`;
    weatherDetails[4].innerText = `Max Temp: ${data.main.temp_max.toFixed(0)}°`;
  } catch (err) {
    alert("city not found");
  }
}

//MAIN

start("Jaleshwar");

searchBar.onkeyup = (e) => {
  if (e.key == "Enter") {
    start(e.target.value);
  }
};
