   
    
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
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=34d34bfd03ebff0892b49ada97eo706t&unit=metric`;
    
    
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

function getForecast (city) {
  let apiKey = "34d34bfd03ebff0892b49ada97eo706t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}


   function displayForecast (response) {
console.log(response.data);

    let day = ["Tue", "Wed", "Thur", "Fri", "Sat"];
    let forecastHtml = "";

    day.forEach ( function (day) {

    forecastHtml +=  `
    <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>  
          <div class="weather-forecast-icon">⛅</div> 
          <div class="weather-forecast-temps"
          >
          <span class="weather-forecast-high-temp"> 15&deg;</span>
            <span class="weather-forecast-low-temp">9&deg; </span> 
          </div>
        </div>
    `;
    }); 
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
   }

   
   displayForecast ();