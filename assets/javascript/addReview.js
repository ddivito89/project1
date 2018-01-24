function addReview(form, key) {
	event.preventDefault();

	//Get input values
	var rating 			= form.rating.value;
	var date 			= form.date.value;
	var description1 	= form.description1.value;

	var convertedDate = moment(date, "YYYY-MM-DD");
	date = convertedDate.format("MM/DD/YYYY")


	//Clear onput fields
	$("#input-rating").val("");
	$("#input-date").val("");
	$("#input-description-1").val("");
	$("#input-description-2").val("");
	$("#input-description-3").val("");

	//Close input form
	// $('#sumit-review').dropdown("toggle");
	$('.input-review').removeClass('open');

	//Create element


	database.ref(`/reviews`).push({
		'restaurantKey': key,
		'description1':description1,
		'date':date,
		'rating':rating
	});

}

function reviewToPage(restaurantKey, key, rating, description1, description2, description3, date){

	var newReview = $("<li>").addClass('list-group-item');
	newReview.attr('id',key)
	var image;
	//Apply styling based on rating
	if (rating === '3') {
		newReview.addClass('list-group-item-success');
		image = 'assets/Images/good.png';
	}
	else if (rating === '2') {
		newReview.addClass('list-group-item-warning');
		image = 'assets/Images/ok.jpg'
	}
	else {
		newReview.addClass('list-group-item-danger');
		image = 'assets/Images/bad.png'
	}

	newReview.html(`
		<div class="row review-line">
			<!-- rating -->
			<div class="col-md-1">
				<img src=${image}>
			</div>
			<!-- date of review -->
			<h4 class="col-md-2">${date}</h4>
			<!-- Descriptions -->
			<div class="col-md-9">
				<h4 class='badge'>${description1}</h4>
				<button class='btn btn-warning btn-xs delete-review-button' onclick='deleteReview(this,"${key}")'>X</button>
			</div>
		</div>
	`);

	//Add to window
	$(`#${restaurantKey}`).find('ul').prepend(newReview);
}
//Generate html structure


database.ref("/reviews").on("child_added", function(Snapshot) {

	var review = Snapshot.val();
	var key = Snapshot.getRef().key;

	reviewToPage(review.restaurantKey, key, review.rating, review.description1, review.description2, review.description3, review.date)
});

database.ref("/reviews").on("child_removed", function(oldChildSnapshot) {

	var review = oldChildSnapshot.val();
	var key = oldChildSnapshot.getRef().key;

	$(`#${key}`).remove()


});

function deleteRestaurant(form, key) {
	event.preventDefault();
	database.ref("/restaurants").child(key).remove()
}

function deleteReview(form, key) {
	event.preventDefault();
	database.ref("/reviews").child(key).remove()
}
