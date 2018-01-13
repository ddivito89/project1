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
function getData(index) {
  var apiKey = "2d0ccedc51dbe25f162cd3e019b158de";
  var keyword = $("#cuisine").val();
  var lat = "41.884653";
  var lon = "-87.627404599";
  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + keyword + "&lat=" + lat + "&lon=" + lon + "&sort=real_distance&order=desc%20Response%20Body" + "&apikey=" + apiKey;

  console.log(queryURL)

  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
    console.log(response)

    function showOptions(index) {

      $("#choice-div").empty()
      for (var x = index; x < index + 3; x++) {
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
        newOptions.append(`<button class="addRestaurant" name="${name}">Select</button>`)

        $("#choice-div").append(newOptions)
      }
      //add select button actions
      $(".addRestaurant").on("click", function() {
        event.preventDefault();

        var name = $(this).attr("name")
        database.ref("/").push({restaurant: name});

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
  getData(index)
})

database.ref("/").on("child_added", function(Snapshot) {

  var entry = Snapshot.val()
  console.log(entry)

  $("#log-table").prepend(`
    <tr>
      <td>${entry.restaurant}</td>
    </tr>
  `)
});
