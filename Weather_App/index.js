var temp;
function getCoordinates() {

    var lat = document.getElementById("lat");
    var log = document.getElementById("log");

    if (!navigator.geolocation){
        lat.innerText = "Geolocation is not supported by your browser";
        return;
      }

    function success(position) {
        getTemp(position);
    }

    function error() {
        console.log('Could not get user position.');
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function getTemp(position) {

    var weather = document.getElementById("weather");
    var weatherIcon = document.getElementById("weather-icon");

    var request = $.ajax({
        url: `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
        method: "GET",
        dataType: "JSON"
      });

      request.done(function(msg) {

          var usefulData = {};
          usefulData["state"] = msg.name;
          usefulData["country"] = msg.sys.country;
          usefulData["weather"] = msg.weather[0].main;
          usefulData["weather-id"] = msg.weather[0].id; 
          usefulData["weather-description"] = msg.weather[0].description;
          usefulData["temp"] = msg.main.temp;
          usefulData["pressure"] = msg.main.pressure;
          usefulData["humidity"] = msg.main.humidity;
          usefulData["wind"] = msg.wind.speed;

          temp = usefulData["temp"];

          var iconCodeHtml = '<i class="wi wi-owm-' + usefulData["weather-id"] + '"></i>';
          weatherIcon.innerHTML = iconCodeHtml; 
          weather.innerText = JSON.stringify(usefulData, null, '\t');

          // Fah
          var degrees = document.getElementById("weather-degree");
          degrees.innerHTML = '<p id="temp-val">' + temp + '</p>' + '<i id="degree-icon" class="wi wi-celsius" onclick="convertTemp();"></i>';
      });
       
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}

function convertTemp() {
    var getDegreeClass = document.getElementById("degree-icon").classList;
    if(getDegreeClass[1].includes("celsius")) {
        getDegreeClass.remove("wi-celsius");
        getDegreeClass.add('wi-fahrenheit');
    } else {
        getDegreeClass.remove("wi-fahrenheit");
        getDegreeClass.add('wi-celsius');
    }
}