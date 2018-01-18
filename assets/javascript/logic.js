//firebase init
var config = {
  apiKey: "AIzaSyA6JpwRlzcgNROw120C41wrXwq7hDSCv6o",
  authDomain: "restaurantlog-a75c0.firebaseapp.com",
  databaseURL: "https://restaurantlog-a75c0.firebaseio.com",
  projectId: "restaurantlog-a75c0",
  storageBucket: "restaurantlog-a75c0.appspot.com",
  messagingSenderId: "616106182816"
};

firebase.initializeApp(config);
var database = firebase.database();

//pull data from Zomato
function getData(index,long,lati) {
  var apiKey = "2d0ccedc51dbe25f162cd3e019b158de";
  var keyword = $("#cuisine").val();
  var lat = lati;
  var lon = long;
  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + keyword + "&lat=" + lat + "&lon=" + lon +
  "&sort=real_distance&order=desc%20Response%20Body" + "&apikey=" + apiKey;

  console.log(queryURL)

  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

    var results = []

    for (var x=0; x<response.restaurants.length; x++){
      var result = {
        'x': x,
        'name': response.restaurants[x].restaurant.name,
        'address': response.restaurants[x].restaurant.location.address,
        'cuisines': response.restaurants[x].restaurant.cuisines,
        'latitude': response.restaurants[x].restaurant.location.latitude,
        'longitude': response.restaurants[x].restaurant.location.longitude
      }
      results.push(result)
    }

    var Choice = function(id, name, address, cuisines, latitude, longitude) {
      this.createChoice = function() {
        var newChoice = $(`<div class='col-md-4'></div>`);
        newChoice.append(`<p>${name}</p>`)
        newChoice.append(`<p>${address}</p>`)
        newChoice.append(`<p>${cuisines}</p>`)
        newChoice.append(`<p>${latitude}</p>`)
        newChoice.append(`<p>${longitude}</p>`)
        newChoice.append(`<button class="addRestaurant" name="${name}" id="${id}">Select</button>`)
        return newChoice;
      }
    }

    function showOptions(index) {

      $("#choice-div").empty()

      for (var x = index; x < index + 3; x++) {

        var result = {
          'index': results[x].x,
          'name': results[x].name,
          'address': results[x].address,
          'cuisines': results[x].cuisines,
          'latitude': results[x].latitude,
          'longitude': results[x].longitude
        }

        var newOptions = new Choice(result.index, result.name, result.address, result.cuisines, result.latitude, result.longitude).createChoice()

        $("#choice-div").append(newOptions)
      }

      //add select button actions
      $(".addRestaurant").on("click", function() {
        event.preventDefault();

        var index = $(this).attr("id")
        var name = results[index].name
        var address = results[index].address
        var cuisines = results[index].name
        var latitude = results[index].latitude
        var longitude = results[index].longitude

        database.ref("/restaurants").push(
          {name: name,
            address:address,
            cuisines: cuisines,
            latitude: latitude,
            longitude: longitude,
          });

        $("#choice-div").empty()
      });
    }
    showOptions(index)
  });
}

//submit search to Zomato API
$("#submit-keys").on("click", function() {
  var index = 0;
  event.preventDefault();
  getData(index, userLongitude, userLatitude)
})

database.ref("/restaurants").on("child_added", function(Snapshot) {

  var entry = Snapshot.val()

  $("#log-table").prepend(`
    <tr>
      <td>${entry.name}</td>
      <td>${entry.latitude}</td>
      <td>${entry.longitude}</td>
    </tr>
  `)
});