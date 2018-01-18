var restaurantCounter = 0;	//Counter for each set of html containers
var numResults = 3; //How many results should be displayed from the search
var defaultImage = "http://www.tasteinsf.com/public/images/default-restaurant-thumbnail-250x244.png"; //If no thumbnail display this image instead

//Display results of search
function makeResultsBox() {
	//Create box
	var box = $('<div>').addClass('wrapper results');

	//Picture
	for (var i = 0; i < numResults; i++) {
		box.append($('<img class="option-'+ (i+1) +'" src='+ defaultImage +'>'))
	}
	//Distance to restaurant
	for (var i = 0; i < numResults; i++) {
		box.append($('<h4>').addClass('distance option-'+ (i+1) +' result-display-text'))
	}
	//Cost
	for (var i = 0; i < numResults; i++) {
		box.append($('<h4>').addClass('cost option-'+ (i+1) +' result-display-text'))
	}
	//Rating
	for (var i = 0; i < numResults; i++) {
		box.append($('<h4>').addClass('rating option-'+ (i+1) +' result-display-text'))
	}
	//Button to choose this one
	for (var i = 0; i < numResults; i++) {
		box.append($('<button>').addClass('btn btn-success option-'+ (i+1) +'').attr('type', 'submit').text('Choose'))
	}

	$('body').append(box);
}

//Restaurant Choice Container Builder
function makeChosenBox() {
	//Create box
	var box = $('<div>').addClass('wrapper chosen-restaurant').attr('choice-number', restaurantCounter);
	//Add content elements
	box
		.append($('<img>'))
		.append($('<div>').addClass('info'))
		.append($('<div>').addClass('map'))
		.append($('<button>')
			.addClass('btn btn-info write-review')
			.attr('choice-number', restaurantCounter)
			.text('Review'));

	$('body').append(box);

	restaurantCounter++;
}


//Restaurant user review container builder
function makeReviewBox(whichChoice) {
	var box = $('<div>').addClass('wrapper review-restaurant').attr('choice-number', restaurantCounter);
	//add content elements
	box
		.append($('<h4>').addClass('review-date'))//Date review written
		.append($('<h4>').addClass('review-rating'))//User rating
		.append($('<div>').addClass('review-comments'));//Field to enter comments

	box.insertAfter($('.chosen-restaurant[choice-number='+ whichChoice +']'));
}

//Click event for adding a review
$('body').on('click', '.btn.write-review',function() {
	console.log('got here');
	var whichChoice = $(this).attr('choice-number');
	makeReviewBox(whichChoice);
});

makeResultsBox();
makeChosenBox();