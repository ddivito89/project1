var restaurantCounter = 0;	//Counter for each set of html containers
var numResults = 3; //How many results should be displayed from the search
var defaultImage = "http://www.tasteinsf.com/public/images/default-restaurant-thumbnail-250x244.png"; //If no thumbnail display this image instead

//Display results of search
function makeResultsBox() {
	//Create box
	var box = $('<div>').addClass('wrapper results');

	//Picture
	for (var i = 0; i < numResults; i++) {
		box.append($('<img src='+ defaultImage +'>'))
	}
	//Distance to restaurant
	for (var i = 0; i < numResults; i++) {
		box.append($('<h4>').addClass('distance choice'+ i +' result-display-text'))
	}
	//Cost
	for (var i = 0; i < numResults; i++) {
		box.append($('<h4>').addClass('cost choice'+ i +' result-display-text'))
	}
	//Rating
	for (var i = 0; i < numResults; i++) {
		box.append($('<h4>').addClass('rating choice'+ i +' result-display-text'))
	}
	//Button to choose this one
	for (var i = 0; i < numResults; i++) {
		box.append($('<button>').addClass('btn btn-success choice'+ i +'').attr('type', 'submit').text('Choose'))
	}

	$('body').append(box);
}

//Restaurant Choice Container Builder
function makeChosenBox() {
	//Create box
	var box = $('<div>').addClass('wrapper chosen-restaurant').attr('choice-number', restaurantCounter);
	//Add content elements
	box
		.append($('<div>').addClass('info'))
		.append($('<div>').addClass('map'));
	box.find('div.info').append($('<img>')).append($('<p>'));

	$('body').append(box);

	restaurantCounter++;
}

//Restaurant user review container builder
function makeReviewBox() {
	var container = $('<div>').addClass('container review-restaurant').attr('choice-number', restaurantCounter);
	container.append($('<div>').addClass('row'));
	//add content elements
	container.children('div')
		.append($('<div>').addClass('info'))
		.append($('<div>').addClass('map'));

	$('body').append(container);
}

//Display details of the chosen restaurant
function makeChosenBox() {
	var box = $('<div>').addClass('wrapper chosen-restaurant').attr('choice-number', restaurantCounter);
	//add content elements
	box
		.append($('<div>').addClass('info'))
		.append($('<div>').addClass('map'));

	$('body').append(box);

	restaurantCounter++;
}

makeResultsBox();
makeChosenBox();