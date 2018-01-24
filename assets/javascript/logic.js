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
  var keyword = $("#cuisine").val().replace(/\s+/g, '%20').toLowerCase();
  var lat = userLatitude;
  var lon = userLongitude;

  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + keyword + "&lat=" + lat + "&lon=" + lon +
  "&sort=real_distance&order=desc%20Response%20Body" + "&apikey=" + apiKey;

  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

    var results = []

    //populate reuslts into an array
    for (var x = 0; x < response.restaurants.length; x++) {

      function defaultImg(img){
        if (img===""){
          thumbnail = 'assets/Images/fork.png'
        }else {
          thumbnail = img
        }
        return thumbnail
      }


      var result = {
        'x': x,
        'name': response.restaurants[x].restaurant.name,
        'address': response.restaurants[x].restaurant.location.address,
        'locality': response.restaurants[x].restaurant.location.locality,
        'cuisines': response.restaurants[x].restaurant.cuisines,
        'latitude': response.restaurants[x].restaurant.location.latitude,
        'longitude': response.restaurants[x].restaurant.location.longitude,
        'rating': response.restaurants[x].restaurant.user_rating.aggregate_rating,
        'thumbnail': defaultImg(response.restaurants[x].restaurant.thumb),
        'average_cost_for_two': response.restaurants[x].restaurant.average_cost_for_two,
        'menu_link': response.restaurants[x].restaurant.menu_url,
        'zomato_link': response.restaurants[x].restaurant.url
      }
      results.push(result)
    }

    //choice constructor
    var Choice = function(result) {
      this.createChoice = function() {

        var newChoice = (`
          <div class = "col-md-4 addRestaurant" > <img src="${result.thumbnail}">
            <div class='result-info'>
              <div class="result-text">
                <h4>${result.name}</h4>
                <h4>Rating: ${result.rating}</h4>
                <h4 id="choice-dist-${result.index}"></h4>
                <h4 id="choice-dur-${result.index}"></h4>
              </div>
            </div>
            <button type='button' class='btn btn-success addRestaurant' name="${result.name}" id="${result.index}">Select</button>
          </div>
        `)

        return newChoice;
      }
      getDistance(result.latitude, result.longitude, `choice-dist-${result.index}`, `choice-dur-${result.index}`)
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

        var newOptions = new Choice(result).createChoice()

        $("#choice-div").append(newOptions)
      }
      //Show results element
      $('.results').show()

      if (index + 3 < results.length){
        $('.next-options').remove();
        var nextOptions = $('<button>').addClass('btn btn-primary next-options').attr('startIndex', x).text('Next Options');
        nextOptions.insertAfter("#choice-div");
      }




      //add select button actions
      $(".addRestaurant").on("click", function() {
        event.preventDefault();

        var index = $(this).attr("id")
        var name = results[index].name
        var address = results[index].address
        var locality = results[index].locality
        var cuisines = results[index].cuisines
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
        $("#choice-div").empty();
        $('.results').hide();
      });


      $(".next-options").on("click", function() {
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
  getLatLong(index);
})


//fill log table from firebase
database.ref("/restaurants").on("child_added", function(Snapshot) {

  var entry = Snapshot.val();
  var key = Snapshot.getRef().key;
  var html = $('<div>').addClass('container restaurant-block').attr('id', key).html(`
      <div class="row heading" id="${key}">
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
              <h4>Cuisines: ${entry.cuisines}</h4>
              <h4>Average cost for two: $${entry.average_cost_for_two}</h4>
              <h4><a href=${entry.menu_link} target='_blank'>See menu</a></h4>
              <h4><a href=${entry.zomato_link} target='_blank'>Visit Zomato page</a></h4>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="col-md-6">
          <div class="col-md-6 chosen-map" id="map${key}">
          </div>
          <div class="col-md-6 chosen-address">
            <p class="address">${entry.address}</p>
            <p class="locality">${entry.locality}</p>
          </div>
        </div>
      </div>

      <!-- Display user review -->
    		<div class="row review">
    			<ul class="list-group">
    				<li class="list-group-item list-group-item-warning">

    				</li>
    			</ul>
    		</div>

    	<!-- Enter user-specific review info -->
    	<div class="dropdown input-review">
    		<!-- Dropdown button and toggle -->

    		<button class="btn btn-info btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

    		Add Review
    		<span class="caret"></span>
    		</button>
    		<!-- Input fields -->

    		<form class='form-inline dropdown-menu' onsubmit='addReview(this,"${key}")'>
    			<!-- Rating -->
    			<div class='form-group'>
    				<label for="input-rating">Rating</label><br>
    				<input id='input-rating' type='text' name='rating' required pattern='[1-3]' placeholder='1(bad) - 3(good)'>
    			</div>
    			<!-- Date of review -->
    			<div class='form-group'>
    				<label for="input-date">Date</label><br>

    				<input id='input-date' type='date' name='date' required placeholder='mm/dd/yyyy'>
    			</div>
    			<!-- 1 short description -->
    			<div class='form-group'>
    				<label for="input-description-1">Review</label><br>
    				<input id='input-description-1' type='text' name='description1' required placeholder="How was it?" maxlength='27'>
    			</div>
    			<div class='form-group'>
    				<input id='submit-review' class='btn btn-info' type='submit'>
    			</div>
    		</form>
        <button class='btn btn-warning btn-xs delete-restaurant-button' onclick='deleteRestaurant(this,"${key}")'>X</button>
    	</div>
    </div>`);

  html.insertAfter('.results');

  displayMap(entry.latitude,entry.longitude,`map${key}`)
});

database.ref("/restaurants").on("child_removed", function(oldChildSnapshot) {

	var review = oldChildSnapshot.val();
	var key = oldChildSnapshot.getRef().key;

	$(`#${key}`).remove()

});
