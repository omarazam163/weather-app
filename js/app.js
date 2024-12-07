let key = "c986523f9a8143969c2153828240712";
const search = document.querySelector("#search");
const btn = document.querySelector("#find");

//current card
const currentCard = document.getElementById("current-card");
const currentCardDay = document.getElementById("current-card-day");
const currentCardDate = document.getElementById("current-card-date");
const currentCardTemp = document.getElementById("current-card-temp");
const currentCardState = document.getElementById("current-card-state");
const currentCardCity = document.getElementById("current-card-city");
const currentCardWState = document.getElementById("current-card-w-state");
const currentCardWind = document.getElementById("current-card-wind");
const currentCardWindDirection = document.getElementById(
  "current-card-wind-direction"
);

// second cards
//second
const secondCardDay = document.getElementById("second-card-day");
const secondCardTempMax = document.getElementById("second-card-temp-max");
const secondCardTempMin = document.getElementById("second-card-temp-min");
const secondCardState = document.getElementById("second-card-state");
const secondCardWState = document.getElementById("second-card-w-state");

//third
const thirdCardDay = document.getElementById("third-card-day");
const thirdCardTempMax = document.getElementById("third-card-temp-max");
const thirdCardTempMin = document.getElementById("third-card-temp-min");
const thirdCardState = document.getElementById("third-card-state");
const thirdCardWState = document.getElementById("third-card-w-state");

let city ='cairo';
function getCurrentLocation() {
   setAllFieldsToLoading();
   navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try{
      const { latitude, longitude } = pos.coords;
      const apiKey = "pk.2af3dacd9dd26ff3be69b64431d2a023";
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.2af3dacd9dd26ff3be69b64431d2a023&lat=${latitude}&lon=${longitude}&format=json&`
      );
      const data = await response.json();
      dispalyData(data.address.city);
      city = data.address.city;
    }
    catch
    {
      dispalyData(city);
    }
    },
    (error) => {
      console.error("Error getting location:", error.message);
    }
  );
}
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

async function getWeather(search) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${search}&days=3`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (data&&res.status===200) {
    //first card
    const firstCardObj = {
      location: data.location.name,
      DayName: daysOfWeek[new Date(data.current.last_updated).getDay()],
      date: `${new Date(data.current.last_updated).getDay()+1} ${
        months[new Date(data.current.last_updated).getMonth()]
      }`,
      temp: data.current.temp_c,
      stateIcon: data.current.condition.icon,
      stateText: data.current.condition.text,
      wind: data.current.wind_kph,
      windDirection: data.current.wind_dir,
    };
    //second card
    let forecastday2 = data.forecast.forecastday[1];
    const secondCardobj = {
      dayName: daysOfWeek[new Date(forecastday2.date).getDay()],
      maxTemp: forecastday2.day.maxtemp_c,
      minTemp: forecastday2.day.mintemp_c,
      stateIcon: forecastday2.day.condition.icon,
      stateText: forecastday2.day.condition.text,
    };

    //third card
    let forecastday3 = data.forecast.forecastday[2];
    const thirdCardobj = {
      dayName: daysOfWeek[new Date(forecastday3.date).getDay()],
      maxTemp: forecastday3.day.maxtemp_c,
      minTemp: forecastday3.day.mintemp_c,
      stateIcon: forecastday3.day.condition.icon,
      stateText: forecastday3.day.condition.text,
    };
    return { firstCardObj, secondCardobj, thirdCardobj };
  }
}

async function dispalyData(search)
{
  const data = await getWeather(search);
    //first card
    currentCardDay.innerHTML = data.firstCardObj.DayName;
    currentCardDate.innerHTML = data.firstCardObj.date;
    currentCardTemp.children[0].innerHTML = data.firstCardObj.temp;
    currentCardState.attributes["src"].value = data.firstCardObj.stateIcon;
    currentCardCity.innerHTML = data.firstCardObj.location;
    currentCardWState.innerHTML = data.firstCardObj.stateText;
    currentCardWind.innerHTML = data.firstCardObj.wind+"km/h";
    currentCardWindDirection.innerHTML = data.firstCardObj.windDirection;

    //second card
    secondCardDay.innerHTML = data.secondCardobj.dayName;
    secondCardTempMax.innerHTML = data.secondCardobj.maxTemp;
    secondCardTempMin.innerHTML = data.secondCardobj.minTemp;
    secondCardState.attributes["src"].value = data.secondCardobj.stateIcon;
    secondCardWState.innerHTML = data.secondCardobj.stateText;

    //third card
    thirdCardDay.innerHTML = data.thirdCardobj.dayName;
    thirdCardTempMax.innerHTML = data.thirdCardobj.maxTemp;
    thirdCardTempMin.innerHTML = data.thirdCardobj.minTemp;
    thirdCardState.attributes["src"].value = data.thirdCardobj.stateIcon;
    thirdCardWState.innerHTML = data.thirdCardobj.stateText;
}


getCurrentLocation();

btn.addEventListener("click", (e) => {
  city = search.value;
  if(city==='')
  {
    getCurrentLocation();
  }
  else
  {
  dispalyData(city);
  }
});

function setAllFieldsToLoading() {
  const loadingText = "Loading...";

  // First card
  currentCardDay.innerHTML = loadingText;
  currentCardDate.innerHTML = loadingText;
  currentCardTemp.children[0].innerHTML = loadingText;
  currentCardState.attributes["src"].value = ""; 
  currentCardCity.innerHTML = loadingText;
  currentCardWState.innerHTML = loadingText;
  currentCardWind.innerHTML = loadingText;
  currentCardWindDirection.innerHTML = loadingText;

  // Second card
  secondCardDay.innerHTML = loadingText;
  secondCardTempMax.innerHTML = loadingText;
  secondCardTempMin.innerHTML = loadingText;
  secondCardState.attributes["src"].value = ""; 
  secondCardWState.innerHTML = loadingText;

  // Third card
  thirdCardDay.innerHTML = loadingText;
  thirdCardTempMax.innerHTML = loadingText;
  thirdCardTempMin.innerHTML = loadingText;
  thirdCardState.attributes["src"].value = ""; 
  thirdCardWState.innerHTML = loadingText;
}
