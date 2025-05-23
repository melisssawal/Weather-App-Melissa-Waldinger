   
    
    function showTemp(response) {
    let temp = Math.round(response.data.temperature.current);
    let description = `${response.data.condition.description}`;
    let focusTemperature = document.querySelector("#current-digit-temperature");
    let focusCity = document.querySelector("#current-city");
    let focusTempDescription = document.querySelector("#temp-description");
    let focusHumidity = document.querySelector("#humidity-value");
    let focusWindSpeed = document.querySelector("#windspeed-value");
    let focusIcon = document.querySelector("#temp-icon");

    focusTemperature.innerHTML = `${temp}`;
    focusCity.innerHTML = response.data.city;
    focusTempDescription.innerHTML = `${description}`;
    focusHumidity.innerHTML = `${response.data.temperature.humidity}%`;
    focusWindSpeed.innerHTML = `${response.data.wind.speed}km/h`;
    focusIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class ="current-temperature-icon" />`;
   
    getForecast(response.data.city)
    }
    
    
    function searchCity(event) {
      event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    let city = searchInput.value;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=34d34bfd03ebff0892b49ada97eo706t&units=metric`;
    
    
    axios.get(apiUrl).then(showTemp);
    };  

     
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", searchCity);
    
  
    function formatDate(date) {
      let minutes = date.getMinutes();
      let hours = date.getHours();
      let day = date.getDay();
    
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    
      if (hours < 10) {
        hours = `0${hours}`;
      }
    
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    
      let formattedDay = days[day];
      return `${formattedDay} ${hours}:${minutes}`;
    }
    
    let currentDateELement = document.querySelector("#current-date");
    let currentDate = new Date();
    
    currentDateELement.innerHTML = formatDate(currentDate);

function fixForecastDay (timestamp) {
let forecastDate = new Date (timestamp * 1000);
let date = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

return date [forecastDate.getDay()];

    }

function getForecast (city) {
  let apiKey = "34d34bfd03ebff0892b49ada97eo706t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log (apiUrl);
  axios(apiUrl).then(displayForecast);
}


   function displayForecast (response) {

    let forecastHtml = "";

    response.data.daily.forEach ( function (day, index) {
      if (index  < 5) {

    forecastHtml +=  `
    <div class="weather-forecast-day">
            <div class="weather-forecast-date">${fixForecastDay(day.time)}</div>  
          <div ><img class="weather-forecast-icon" src= "${day.condition.icon_url}" /></div> 
          <div class="weather-forecast-temps"
          >
          <span class="weather-forecast-high-temp"> ${Math.round(day.temperature.maximum)}&deg;</span>
            <span class="weather-forecast-low-temp">${Math.round(day.temperature.minimum)}&deg;</span> 
          </div>
        </div>
    `; 
   }
    }); 
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
   }

   
   displayForecast ();
