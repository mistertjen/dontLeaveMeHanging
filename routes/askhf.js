const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/askhf')
	// test if button shows
	// .get((req, res) => {
	// 	res.render('index')
	// })
	// When submit button for don't leave me hanging is clicked on index
	.post((req, res) => {
		// get location
		let location = "unknown"

		if (!navigator.geolocation){
			location = "Location is secret";
			return;
		}

		function success(position) {
			let latitude  = position.coords.latitude;
			let longitude = position.coords.longitude;

		    let locationURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true";
		    
		    // Make GET request to locationURL
		    // Save in variable e.g. unparsedData

		    // Parse the data like this:
			
			// let parsedData = JSON.parse(unparsedData)
			// let city = parsedData.results[0].address_components[3].long_name
			// let country = parsedData.results[0].address_components[6].long_name

			// location = city + ', ' + country
		  }

		  function error() {
		    location = "Location is secret";
		  }

		  navigator.geolocation.getCurrentPosition(success, error);
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router