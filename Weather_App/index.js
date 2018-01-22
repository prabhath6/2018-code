var temp;
function getCoordinates() {

    var lat = document.getElementById("lat");
    var log = document.getElementById("log");

    if (!navigator.geolocation) {
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

    request.done(function (msg) {
        var humidity = document.getElementById("weather-humidity");
        var temp_min = document.getElementById("weather-min");
        var temp_max = document.getElementById("weather-max");
        var wind_speed = document.getElementById("weather-speed");

        var usefulData = {};
        usefulData["state"] = msg.name;
        usefulData["country"] = msg.sys.country;
        usefulData["weather"] = msg.weather[0].main;
        temp_min.innerText = msg.main.temp_max;
        temp_max.innerText = msg.main.temp_min;
        humidity.innerText = msg.main.humidity;
        wind_speed.innerText = msg.wind.speed;
        temp = msg.main.temp;
        var iconCodeHtml = '<i class="wi wi-owm-' + msg.weather[0].id + '"></i>';
        weatherIcon.innerHTML = iconCodeHtml;
        weather.innerText = JSON.stringify(usefulData, null, '\t');

        var tempVal = document.getElementById("temp-val");
        tempVal.innerText = temp;
    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function convertTemp() {
    var getDegreeClass = document.getElementById("degree-icon").classList;
    var getDegrees = document.getElementById("temp-val");
    var getDegreesConverted = parseFloat(getDegrees.innerText);
    if (getDegreeClass[1].includes("celsius")) {
        getDegrees.innerText = ((getDegreesConverted * (9 / 5)) + 32).toFixed(2);
        getDegreeClass.remove("wi-celsius");
        getDegreeClass.add('wi-fahrenheit');
    } else {
        getDegrees.innerText = ((getDegreesConverted - 32) * (5 / 9)).toFixed(2);
        getDegreeClass.remove("wi-fahrenheit");
        getDegreeClass.add('wi-celsius');
    }
}