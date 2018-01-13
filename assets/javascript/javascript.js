//Answer questions to narrow down search

var restaurantCounter = 0;	//Counter for each set of html containers
var questions = ['first', 'second', 'third', 'fourth'];	//store text for input fields

function makeQuestionsContainer() {
	//Create container for questions
	var container = $('<div>').addClass('container questions').attr('restaurant-number', restaurantCounter);

	//Create elements for questions and user inputs
	var searchQuestions = $('<form>').addClass('form-group');
	for (var i = 0; i < questions.length; i++) {
		var input = $('<input>').attr('question-number', i).attr('type', 'text').attr('placeholder', questions[i]);
		searchQuestions.append(input);
	}

	//Create submission element button
	var submitButton = $('<input>').addClass('btn btn-primary').attr('type', 'submit');

	//Put elements together
	container.append(searchQuestions).append(submitButton);
	$('body').append(container);
}


//Display results of restaurant search
	//Show results side by side
	//Button to select restaurant

//Display details of the chosen restaurant
	//picture
	//Map
	//Link to menu

//Enter review info of restaurant
	//Rating 1-10
	//Text box to enter comments
