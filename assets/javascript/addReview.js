function addReview(form) {
	event.preventDefault();

	//Get input values
	var rating 			= form.rating.value;
	var date 			= form.date.value;
	var description1 	= form.description1.value;
	var description2 	= form.description2.value;
	var description3 	= form.description3.value;

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
	var newReview = $("<li>").addClass('list-group-item');
	//Apply styling based on rating
	if (rating / 7 > .66) {
		newReview.addClass('list-group-item-success');
	}
	else if (rating / 7 > .33) {
		newReview.addClass('list-group-item-warning');
	}
	else {
		newReview.addClass('list-group-item-danger');
	}
	
	//Generate html structure
	newReview.html(`
		<div class="row">
			<!-- rating -->
			<h4 class="col-md-2">${rating} / 7</h4>
			<!-- Descriptions -->
			<div class="col-md-9">
				<h4>${description1}</h4>
				<h4>${description2}</h4>
				<h4>${description3}</h4>
			</div>
			<!-- date of review -->
			<h4 class="col-md-1 badge">${date}</h4>
		</div>
	`);

	//Add to window
	$('.restaurant-block').find('ul').prepend(newReview);
;
}