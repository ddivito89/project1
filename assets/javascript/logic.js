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
function getData(index, long, lati) {
  var apiKey = "2d0ccedc51dbe25f162cd3e019b158de";
  var keyword = $("#cuisine").val();
  var lat = '41.8846530';
  //lati;
  var lon = '-87.6274050';
  //long;
  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + keyword + "&lat=" + lat + "&lon=" + lon + "&sort=real_distance&order=desc%20Response%20Body" + "&apikey=" + apiKey;

  console.log(queryURL)

  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

    var results = []

    //populate reuslts into an array
    for (var x = 0; x < response.restaurants.length; x++) {
      var result = {
        'x': x,
        'name': response.restaurants[x].restaurant.name,
        'address': response.restaurants[x].restaurant.location.address,
        'locality': response.restaurants[x].restaurant.location.locality,
        'cuisines': response.restaurants[x].restaurant.cuisines,
        'latitude': response.restaurants[x].restaurant.location.latitude,
        'longitude': response.restaurants[x].restaurant.location.longitude,
        'rating': response.restaurants[x].restaurant.user_rating.aggregate_rating,
        'thumbnail': response.restaurants[x].restaurant.thumb,
        'average_cost_for_two': response.restaurants[x].restaurant.average_cost_for_two,
        'menu_link': response.restaurants[x].restaurant.menu_url,
        'zomato_link': response.restaurants[x].restaurant.url
      }
      results.push(result)
    }

    //choice constructor
    var Choice = function(id, name, address, locality, cuisines, latitude, longitude, rating, thumbnail, average_cost_for_two, menu_link, zomato_link) {
      this.createChoice = function() {
        if (thumbnail===""){
          thumbnail ='assets/images/fork.png'
        }
        var newChoice = (`
        <div class = "col-md-4 addRestaurant" > <img src="${thumbnail}">
          <div class="result-text">
            <h4>${name}</h4>
            <h4>${rating}</h4>
            <h4>distance</h4>
          </div>
          <button class="addRestaurant" name="${name}" id="${id}">Select</button>
        </div>`)
        return newChoice;
      }
    }

    //populate choices to choice div
    function showOptions(index) {

      $("#choice-div").empty()

      var maxIndex = Math.min(index+3, results.length)

      for (var x= index; x < maxIndex; x++) {

        var result = {
          'index': results[x].x,
          'name': results[x].name,
          'cuisines': results[x].cuisines,
          'latitude': results[x].latitude,
          'longitude': results[x].longitude,
          'rating': results[x].rating,
          'thumbnail': results[x].thumbnail,
        }

        var newOptions = new Choice(result.index, result.name, result.address,  result.locality, result.cuisines, result.latitude, result.longitude, result.rating, result.thumbnail, result.average_cost_for_two).createChoice()

        $("#choice-div").append(newOptions)
      }

      if (index+3 < results.length){
        $("#choice-div").append(`<button startIndex="${x}" class="more-options">Next Options</button>`)
      }


      //add select button actions
      $(".addRestaurant").on("click", function() {
        event.preventDefault();

        var index = $(this).attr("id")
        var name = results[index].name
        var address = results[index].address
        var locality = results[index].locality
        var cuisines = results[index].name
        var latitude = results[index].latitude
        var longitude = results[index].longitude
        var rating = results[index].rating
        var thumbnail = results[index].thumbnail
        var average_cost_for_two = results[index].average_cost_for_two
        var menu_link = results[index].menu_link
        var zomato_link = results[index].zomato_link

        database.ref("/restaurants").push({
          'name': name,
          'address': address,
          'locality': locality,
          'cuisines': cuisines,
          'latitude': latitude,
          'longitude': longitude,
          'rating': rating,
          'thumbnail': thumbnail,
          'average_cost_for_two': average_cost_for_two,
          'menu_link': menu_link,
          'zomato_link': zomato_link});
        $("#choice-div").empty()
      });

      $(".more-options").on("click", function() {
        var nextIndex = parseInt($(this).attr("startIndex"))
        showOptions(nextIndex)
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



//fill log table from firebase
database.ref("/restaurants").on("child_added", function(Snapshot) {

  var entry = Snapshot.val()

  $("#choice-log").prepend(`
    <div class="row heading">
      <div class="col-md-12">
        <h3>${entry.name}</h3>
      </div>
    </div>
    <div class="row information">
      <div class="col-md-6">
        <div class="row">
          <!-- Thumbnail -->
          <div class="col-md-6 chosen-thumbnail">
            <img src="${entry.thumbnail}" alt="restaurant picture">
          </div>
          <!-- Text info -->
          <div class="col-md-6 chosen-info">
            <h4>cuisines: ${entry.cuisines}</h4>
            <h4>average_cost_for_two: ${entry.average_cost_for_two}</h4>
            <a href=${entry.menu_link}>Menu</a>
            <a href=${entry.zomato_link} target='_blank'>Link</a>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="col-md-6">
        <div class="col-md-6 chosen-map">
          <img src="assets/images/map-of-middle-earth-small.png" alt="map">
        </div>
        <div class="col-md-6 chosen-address">
          <p class="address">${entry.address}</p>
          <p class="locality">${entry.locality}</p>
        </div>
      </div>
    </div>
  `)
});
