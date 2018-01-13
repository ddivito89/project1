var restaurantCounter = 0;	//Counter for each set of html containers

//Restaurant Choice Container Builder
function makeChosenContainer() {
	var container = $('<div>').addClass('container').attr('choice-number', restaurantCounter);
	container.append($('<div>').addClass('row'));
	container.children('div')
		.append($('<div>').addClass('col-md-8 info'))
		.append($('<div>').addClass('col-md-4 map'));
	container.find('div.info').append($('<img>')).append($('<p>'));

	$('body').append(container);
}

makeChosenContainer();

//Display details of the chosen restaurant
//Enter review info of restaurant
	//Rating 1-10
	//Text box to enter comments












//Don't need this code, but keeping it for copy paste
	// function makeQuestionsContainer() {
	// 	//Create container for questions
	// 	var container = $('<div>').addClass('container questions').attr('restaurant-number', restaurantCounter);
	// 	//row to contain header
	// 	container.append($('<header>').addClass('row'));
	// 	//Row to contain input fields
	// 	container.append($('<div>'));

	// 	//Create elements for questions and user inputs
	// 	var searchQuestions = $('<form>').addClass('form-horizontal');
	// 	for (var i = 0; i < questions.length; i++) {
	// 		var input = $('<div>').addClass('form-group').append($('<input>').attr('id', questions[i]).attr('type', 'text').attr('placeholder', questions[i]));
	// 		searchQuestions.append(input);
	// 	}

	// 	//Create submission element button
	// 	var submitButton = $('<div>').addClass('form-group').append($('<input>').addClass('btn btn-primary').attr('type', 'submit').attr('id', 'submit-keys'));

	// 	//Put elements together
	// 	container.children('div').append(searchQuestions);
	// 	container.children('div').children('form').append(submitButton);
	// 	$('body').append(container);
	// 	$('body').append('<div id="test-div" class="row"></div>');
	// }
