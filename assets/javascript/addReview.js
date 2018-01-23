function addReview(form, key) {
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
	var image;
	//Apply styling based on rating
	if (rating === '3') {
		newReview.addClass('list-group-item-success');
		image = 'assets/images/good.png';
	}
	else if (rating === '2') {
		newReview.addClass('list-group-item-warning');
		image = 'assets/images/ok.jpg'
	}
	else {
		newReview.addClass('list-group-item-danger');
		image = 'assets/images/bad.png'
	}
	
	//Generate html structure
	newReview.html(`
		<div class="row review-line">
			<!-- rating -->
			<div class="col-md-1">
				<img src=${image}>
			</div>
			<!-- date of review -->
			<h4 class="col-md-3">${date}</h4>
			<!-- Descriptions -->
			<div class="col-md-8">
				<h4 class='badge'>${description1}</h4>
				<h4 class='badge'>${description2}</h4>
				<h4 class='badge'>${description3}</h4>
			</div>
		</div>
	`);

	//Add to window
	$(`#${key}`).find('ul').prepend(newReview);
;
}