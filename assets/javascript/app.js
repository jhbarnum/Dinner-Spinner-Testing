// setting up variables
var movieArray = [];
var data = [];
//var apikey = "mvce6zcsew5md4qhrgqzgjuw";
//var apikey = "f2rwg4z4xzsj7vz3mhnfq9fn";
var apikey = "m8zfezvnzgt2uda46zuqe9e7";
var baseUrl = "https://data.tmsapi.com/v1.1";
var showtimesUrl = baseUrl + '/movies/showings';
//var zipCode = "";
var zipCode = "23222";/////////////////////////////////////////////////////////////////  ZIP CODE!!!!!!!!!
var d = new Date();
var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
var randomRest;
var randomMov;
var clicks = 0;
var dinnerButton = false;
var activityButton = false;
var bothButton = false;
var degree = 1800;
var restArray = [];
var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=1219&entity_type=city&count=100";
var queryURLl = "0356c6221d55cd4bfb3231fee709ccec";
// Zomato api settings
// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://developers.zomato.com/api/v2.1/search?entity_id=1219&entity_type=city&count=100",
//   "method": "GET",
//   "headers": {
//     "user-key": "0356c6221d55cd4bfb3231fee709ccec",
//   }
// };


function testMovies() {

	// IMPORTANT: Fill in your client key
	var clientKey = "js-9qZHzu2Flc59Eq5rx10JdKERovBlJp3TQ3ApyC4TOa3tA8U7aVRnFwf41RpLgtE7";

	var cache = {};
	var container = $("#example1");
	var errorDiv = container.find("div.text-error");
	$.ajax({
		"url": "https://www.zipcodeapi.com/rest/" + "YzxITtsXmLii4NeVFF0uqbrEpSFrC9Rkt15wPWNELbvisYRd7BVh3S6xdIbuhRtK/info.json/23150/degrees",
		"dataType": "json"
	}).done(function (data) {
		console.log(data)
		//handleResp(data);
	});
	/** Handle successful response */


	// Set up event handlers
	// container.find("input[name='zipcode']").on("keyup change", function () {
	// 	// Get zip code
	// 	var zipcode = $(this).val().substring(0, 5);
	// 	if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode)) {
	// 		// Clear error
	// 		errorDiv.empty();

	// 		// Check cache
	// 		if (zipcode in cache) {
	// 			handleResp(cache[zipcode]);
	// 		}
	// 		else {
	// 			// Build url
	// 			var url = "https://www.zipcodeapi.com/rest/" + "YzxITtsXmLii4NeVFF0uqbrEpSFrC9Rkt15wPWNELbvisYRd7BVh3S6xdIbuhRtK/info.json/23222/degrees";

	// 			// Make AJAX request
	// 			$.ajax({
	// 				"url": url,
	// 				"dataType": "json"
	// 			}).done(function (data) {
	// 				handleResp(data);

	// 				// Store in cache
	// 				cache[zipcode] = data;
	// 			}).fail(function (data) {
	// 				if (data.responseText && (json = $.parseJSON(data.responseText))) {
	// 					// Store in cache
	// 					cache[zipcode] = json;

	// 					// Check for error
	// 					if (json.error_msg)
	// 						errorDiv.text(json.error_msg);
	// 				}
	// 				else
	// 					errorDiv.text('Request failed.');
	// 			});
	// 		}
	// 	}
	// }).trigger("change");
};


function handleResp(data) {
	// Check for error
	if (data.error_msg)
		errorDiv.text(data.error_msg);
	else if ("city" in data) {
		console.log(data.city + data.state)
		// Set city and state
		// container.find("input[name='city']").val(data.city);
		// container.find("input[name='state']").val(data.state);
	}
}
//zipAPIKey=YzxITtsXmLii4NeVFF0uqbrEpSFrC9Rkt15wPWNELbvisYRd7BVh3S6xdIbuhRtK

// Assigns a random restaurant from our zomato api results
function randomRestaurant() {
	randomRest = restArray[Math.floor(Math.random() * 19)];
}
// Displays results to the user
function display() {
	//Displays dinner results	
	if (dinnerButton == true) {
		$("#rest-txt").text("Go eat at " + randomRest.restaurant.name);
		console.log(randomRest);
		dinnerButton = false;
		$("#snark").text("Like it or not, you are going to ...");
		var dineDiv = $("<div class='movie'>");
		var address = randomRest.restaurant.location.address;
		var dineAdd = $("<p>").text(randomRest.restaurant.name + " " + address);
		dineDiv.append(dineAdd);
		$("#movies-Info").append(dineDiv);
		$(".movie").hide();
		$("#rest-txt").click(function () {
			$(".movie").toggle();
		});
	}
	//Displays movie results
	if (activityButton == true) {
		$("#rest-txt").text("Watch " + randomMov.title);
		activityButton = false;
		$("#snark").text("I hope you are ready for some fun ...");
		var movieDiv = $("<div class='movie'>");
		var description = randomMov.longDescription;
		for (var e = 0; e < randomMov.showtimes.length; e++) {
			console.log(randomMov.showtimes[e].dateTime);
		}
		var showings = randomMov.showtimes[0].dateTime;
		var showplace = randomMov.showtimes[0].theatre.name;
		var showingDiv = $("<p>").text(showings);
		var descrip = $("<p>").text(description);
		var showTheater = $("<p>").text(showplace);
		movieDiv.append(showingDiv);
		movieDiv.append(showTheater);
		movieDiv.append(descrip);
		$("#movies-Info").append(movieDiv);
		$(".movie").hide();
		$("#rest-txt").click(function () {
			$(".movie").toggle();
			console.log(randomMov.preferredImage.uri)
		});
	}
	// Displays dinner and a movie results
	if (bothButton == true) {
		$("#rest-txt").text("Watch " + randomMov.title + " and eat at " + randomRest.restaurant.name);
		bothButton = false;
		$("#snark").text("I hope you have a journal, you're going to want to remember this ...");
		var dineDiv = $("<div class='movie'>");
		var address = randomRest.restaurant.location.address;
		var dineAdd = $("<p>").text(randomRest.restaurant.name + " " + address);
		dineDiv.append(dineAdd);
		var movieDiv = $("<div class='movie'>");
		var description = randomMov.longDescription;
		var showplace = randomMov.showtimes[0].theatre.name;
		var descrip = $("<p>").text(description);
		var showTheater = $("<p>").text(showplace)
		movieDiv.append(showTheater);
		movieDiv.append(descrip);
		$("#movies-Info").append(movieDiv);
		$("#movies-Info").append(dineDiv);
		$(".movie").hide();
		$("#rest-txt").click(function () {
			$(".movie").toggle();
		});
	}
};
// Picks a random movie
function randomMovie() {
	randomMov = movieArray[Math.floor(Math.random() * movieArray.length)];
}
// Timer to display results when the wheel stops spinning
function timer() {
	setTimeout(display, 6000)
}
// Spins the wheel and resets the page input and output
function spin() {
	timer();
	$("#rest-txt").text("");
	$(".movie").text("");
	clicks++;
	var newDegree = degree * clicks;
	var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
	totalDegree = newDegree + extraDegree;

	$('#wheel .sec').each(function () {
		var t = $(this);
		var noY = 0;
		var c = 0;
		var n = 700;
		var interval = setInterval(function () {
			c++;
			if (c === n) {
				clearInterval(interval);
			}

			var aoY = t.offset().top;
			$("#txt").html(aoY);
			/*23.7 is the minumum offset number that 
			each section can get, in a 30 angle degree.
			So, if the offset reaches 23.7, then we know
			that it has a 30 degree angle and therefore, 
			exactly aligned with the spin btn*/
			if (aoY < 23.89) {
				$('#spin').addClass('spin');
				setTimeout(function () {
					$('#spin').removeClass('spin');
				}, 100);
			}
		}, 10);
		$('#inner-wheel').css({
			'transform': 'rotate(' + totalDegree + 'deg)'
		});
		noY = t.offset().top;
	});
}
// Calls the Zomato and creates an array of objects with the results
function zomatoAjax(zipCode) {
	var zomatoBaseURL = "https://developers.zomato.com/api/v2.1/search?entity_id="
	var zomatoZip = "1219"
	var zomatoBaseURL2 = "&entity_type=city&count=100"
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": zomatoBaseURL + zipCode + zomatoBaseURL2,
		"method": "GET",
		"headers": {
			"user-key": "0356c6221d55cd4bfb3231fee709ccec",
		}
	};
	console.log(settings);
	$.ajax(settings).done(function (response) {
		for (var i = 0; i < 19; i++) {
			restArray.push(response.restaurants[i]);
		}
	});
	//https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=YOUR_API_KEY
}
// Calls Gracenote 
function movieAjax(zipCode) {
	$.ajax({
		url: showtimesUrl,
		data: {
			startDate: today,
			zip: zipCode,
			jsonp: "dataHandler",
			api_key: apikey
		},
		dataType: "jsonp",
	});
}
$(document).on('click', '#zipSubmitButton', function () {

	//zipSubmitBox
	zipCode = document.getElementById("zipSubmitBox").value;
	console.log("hi Jared" + zipCode);
	zomatoAjax(zipCode);
	movieAjax(zipCode);
	testMovies();
	return zipCode;
});


// Creates an array of objects with the results  
function dataHandler(data) {
	console.log(data)
	for (var j = 0; j < data.length; j++) {
		movieArray.push(data[j]);
	}
}

$(document).ready(function () {
	// Event listener for user clicks to assign results or spin
	$(document).on('click', '#activity', function (spin) {
		activityButton = true;
		document.getElementById("both").style = "opacity: 1";
		document.getElementById("dinner").style = "opacity: 1";
		document.getElementById("activity").style = "opacity: 0.6";
		randomMovie();
	});
	$(document).on('click', '#both', function (spin) {
		bothButton = true;
		document.getElementById("dinner").style = "opacity: 1";
		document.getElementById("activity").style = "opacity: 1";
		document.getElementById("both").style = "opacity: 0.6";
		randomRestaurant();
		randomMovie();
	});
	$('#spin').click(function () {
		spin();
	});
	$(document).on('click', '#dinner', function (spin) {
		dinnerButton = true;
		document.getElementById("activity").style = "opacity: 1";
		document.getElementById("both").style = "opacity: 1";
		document.getElementById("dinner").style = "opacity: 0.6";
		randomRestaurant();
	});

});



/////  Get Location -> then api calls

/////  Pick Button

/////  Spin  

/////  