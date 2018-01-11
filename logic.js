$("#search-keyword").on("click", function() {
  event.preventDefault();

  var apiKey = "2d0ccedc51dbe25f162cd3e019b158de";
  var keyword = $("#keyword-input").val();
  var lat = "41.884653";
  var lon = "-87.627404599";
  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + keyword +
  "&lat="+lat+"&lon="+lon+"&sort=real_distance&order=desc%20Response%20Body" + "&apikey=" + apiKey;

  console.log(queryURL)

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    console.log(response)
    for(var x=0; x<3; x++)
    {
      var name = response.restaurants[x].restaurant.name
      var address = response.restaurants[x].restaurant.location.address
      var cuisines = response.restaurants[x].restaurant.cuisines
      var restLat = response.restaurants[x].restaurant.location.latitude
      var restLon = response.restaurants[x].restaurant.location.longitude

      var newOptions = $("<div class='col-md-4'></div>")

      newOptions.append(`<p>${name}</p>`)
      newOptions.append(`<p>${address}</p>`)
      newOptions.append(`<p>${cuisines}</p>`)
      newOptions.append(`<p>${restLat}</p>`)
      newOptions.append(`<p>${restLon}</p>`)
      newOptions.append(`<button>Select</button>`)


      $("#test-div").append(newOptions)


    }





  });



})
