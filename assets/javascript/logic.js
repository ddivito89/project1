function getData(index,long,lati) {
  var apiKey = "2d0ccedc51dbe25f162cd3e019b158de";
  var keyword = $("#cuisine").val();
  var lat = lati;
  var lon = long;
  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + keyword + "&lat=" + lat + "&lon=" + lon +
  "&sort=real_distance&order=desc%20Response%20Body" + "&apikey=" + apiKey;

  console.log(queryURL)

  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
    console.log(response)

    function showOptions(index) {

      $("#restaurantList").empty()
      for (var x = index; x < index + 9 ; x++) {
        var name = response.restaurants[x].restaurant.name
        var address = response.restaurants[x].restaurant.location.address
        var cuisines = response.restaurants[x].restaurant.cuisines
        var restLat = response.restaurants[x].restaurant.location.latitude
        var restLon = response.restaurants[x].restaurant.location.longitude

        
        var newOptions = $("<div class='col-md-4 panel panel-primary'>")
        var newOptions1 = $("<div class='panel-heading'>") 
        newOptions1.append("<h3 class='panel-title'>" + name +"</h3>")
        newOptions.append(newOptions1)
        var newOptions2 = $("<div class='panel-body'>") 
        newOptions2.append(`<p>${address}</p>`)
        newOptions2.append(`<p>${cuisines}</p>`)
        newOptions2.append(`<p>${restLat}</p>`)
        newOptions2.append(`<p>${restLon}</p>`)
        newOptions2.append(`<button>Select</button>`)
        newOptions.append(newOptions2)

        $("#restaurantList").append(newOptions)
      }
    }
    showOptions(index)
  });
}

$("#submit-keys").on("click", function() {
  var index = 0;
  event.preventDefault();
  getData(index, userLongitude, userLatitude)
})

