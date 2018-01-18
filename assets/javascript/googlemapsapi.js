var userLongitude;
var userLatitude;
var map, infoWindow;
var map, infoWindow;
      
function initMap() {
  
  infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
         lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      userLongitude = position.coords.longitude;
      userLatitude =  position.coords.latitude;
      getUserCityName();
       
    }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
  } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
     }

}

function getUserCityName(){
    var m_apiKey = "AIzaSyCkAdpuaUbF88OegKKWanqZaEDmKhD_CL4";
    var m_queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+userLatitude+"," + userLongitude + "&key=" + m_apiKey 
    $.ajax({url: m_queryURL, method: 'GET'}).done(function(response) {
        $("#city").val(response.results[3].formatted_address);
    });
}