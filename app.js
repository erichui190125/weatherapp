$(function(){
  var apiKey = "bb8ea57ff08f1aa16553a658b5af168d";
  var days = 4;
  var metric = "imperial"
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/?cnt=" + days + "&" + "units=" + metric + "&";

  var domEl = {
    location: document.getElementById('location'),
    degree: document.getElementById('degree'),
    highLow: document.getElementById('highLow'),
    day0Name: document.getElementById('day0-name'),
    day1Name: document.getElementById('day1-name'),
    day2Name: document.getElementById('day2-name'),
    day3Name: document.getElementById('day3-name'),
    day1Temp: document.getElementById('day1-temp'),
    day2Temp: document.getElementById('day2-temp'),
    day3Temp: document.getElementById('day3-temp')
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition);
    } else { 
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function handlePosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var url = getApiUrl(lat, long, apiKey);
    callApi(url);
  // show city
  }

  function getApiUrl(lat, long, key) {
    return apiUrl + "lat=" + lat +"&lon=" +  long + "&appid=" + key;
  }

  function callApi(url) {
    console.log(url)
    $.ajax({
      url: url
    }).done(renderModule);
  }

  function renderModule( data ) {
    domEl.location.innerHTML = data.city.name + ", " + data.city.country;
    domEl.degree.innerHTML = Math.round(data.list[0].main.temp);
    domEl.highLow.innerHTML = "H " + Math.round(data.list[0].main.temp_max) + "L " + Math.round(data.list[0].main.temp_min);

    domEl.day0Name.innerHTML = getDayName(data.list[0].dt_txt, -1);
    domEl.day1Name.innerHTML = getDayName(data.list[0].dt_txt, 0);
    domEl.day2Name.innerHTML = getDayName(data.list[0].dt_txt, 1);
    domEl.day3Name.innerHTML = getDayName(data.list[0].dt_txt, 2);
    domEl.day1Temp.innerHTML = Math.round(data.list[1].main.temp);
    domEl.day2Temp.innerHTML = Math.round(data.list[2].main.temp);
    domEl.day3Temp.innerHTML = Math.round(data.list[3].main.temp);
  }

  function getDayName(dateStr, days){
      var date = new Date(dateStr);
      var date = new Date(date.setDate(date.getDate() + days));
      return date.toLocaleDateString("en-US", { weekday: 'long' }).slice(0,3);        
  }

  getLocation();
});

// renderModule(obj);
// http://api.openweathermap.org/data/2.5/forecast?
// lat=35&lon=139&appid=



