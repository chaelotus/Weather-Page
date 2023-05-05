const $input = document.querySelector(".search-input_city");
const cityName = document.querySelector(".cityName");
const $date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");

const API_KEY = "82643d6b318cc6008f2aca60615e06b2";

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
