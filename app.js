const $input = document.querySelector(".search-input_city");
const cityName = document.querySelector(".cityName");
const $date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const form = document.querySelector(".form");
const $article = document.querySelector(".contents");

const API_KEY = config.apikey;

const cityData = [
  "Seoul",
  "Tokyo",
  "London",
  "New York",
  "Paris",
  "Sydney",
  "Nairobi",
];
const createContents = (name, tempData, weatherData) => {
  const cityName = document.createElement("span");
  cityName.classList.add("cityName");
  cityName.textContent = name;

  const date = document.createElement("span");
  date.classList.add("date");

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid");
  closeIcon.classList.add("fa-xmark");

  const cityWeatherImformation1 = document.createElement("div");
  cityWeatherImformation1.classList.add("city-weather_imformation");

  cityWeatherImformation1.append(cityName, date, closeIcon);

  const temp = document.createElement("span");
  temp.classList.add("temp");
  temp.textContent = tempData;

  const weather = document.createElement("span");
  weather.classList.add("weather");
  weather.textContent = weatherData;

  const cityWeatherImformation2 = document.createElement("div");
  cityWeatherImformation2.classList.add("city-weather_imformation");

  cityWeatherImformation2.append(temp, weather);

  const contentsContainer = document.createElement("section");
  contentsContainer.classList.add("city-weather_contents");

  contentsContainer.append(cityWeatherImformation1, cityWeatherImformation2);

  $article.append(contentsContainer);

  renderContents(contentsContainer);
};
// 도시 이름 검색 후 정보 가져오기
const parsingData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(
        data.name,
        `${Math.floor(data.main.temp)}°`,
        data.weather[0].main
      );
      createContents(
        data.name,
        Math.floor(data.main.temp),
        data.weather[0].main
      );
    });
};
//화면에 뿌리는 함수
const renderContents = (contents) => {
  console.log(contents);
  contents.style.display = "flex";
};

// input에 도시 검색해서 도시 날씨 받아오는 함수
form.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    parsingData(event.target.value);
  }
});
//우선 사용자 지역 위치를 먼저 검사해서 날씨 알아오기
const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cityName.textContent = data.name;
      temp.textContent = `${Math.floor(data.main.temp)}°`;
      weather.textContent = data.weather[0].main;
    })
    .catch((err) => console.log(err));
};
const onGeoError = () => {
  alert("can't find you. No weather for you.");
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const clock = () => {
  const date = new Date();
  $date.textContent = `${date.toLocaleString("ko-KR")}`;
};
setInterval(clock, 1000);
