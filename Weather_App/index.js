var userPosition;

function getCoordinates() {

    var lat = document.getElementById("lat");
    var log = document.getElementById("log");

    if (!navigator.geolocation){
        lat.innerText = "Geolocation is not supported by your browser";
        return;
      }

    function success(position) {
        lat.innerText = position.coords.latitude;
        log.innerText = position.coords.longitude;

        userPosition = position;
        getTemp(position);
    }

    function error() {
        console.log('Could not get user position.');
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function getTemp(position) {

    var request = $.ajax({
        url: `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
        method: "GET",
        dataType: "JSON"
      });

      request.done(function( msg ) {
          console.log(msg);
      });
       
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}