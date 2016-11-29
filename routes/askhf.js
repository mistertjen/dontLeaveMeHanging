const express = require('express')
const request = require('request')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/askhf')
	// redirect to root, so if your logged in shows buttons, otherwise login
	.get((req, res) => {
		// req.session.id = 1
		res.redirect('/')
	})
	// When submit button for don't leave me hanging is clicked on index
	.post((req, res) => {
		// if location is coordinates and not the string 'unknown'
		if(req.body.location != 'unknown') {
			console.log(req.body.location)
			// use google maps api to show all data about the coordinates in a json object on this url
			let locationURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + req.body.location + "&sensor=true";
			console.log(locationURL)
			// Make GET request to locationURL
    		// Save in variable e.g. unparsedData
			request(locationURL, (error, response, body) => {
			  if (!error && response.statusCode == 200) {
			  	// body is html of the url, in this case because of api only json object
			    let unparsedData = body;
			    // parse json data into javascript object
				let parsedData = JSON.parse(unparsedData);
				// store city and location from object
				let city = parsedData.results[0].address_components[3].long_name
				let country = parsedData.results[0].address_components[6].long_name
				// store location
				let location = city + ', ' + country
				// test
				// console.log(location)

				// create hfask with this location
				db.HFAsk.create({
					username: req.session.user.name,
					location: location,
					// add userId with id of the user of this session, added to session object after login/registering app.get('/')
					userId: req.session.user.id
				})
				.then( () => {
					res.redirect('/')
				})
			  }
			})
		} else {
			// create hfask with 'unknown' as location
			db.HFAsk.create({
				username: req.session.user.name,
				location: 'secret location',
				// add userId with id of the user of this session, added to session object after login/registering app.get('/')
				userId: req.session.user.id
			})
			.then( () => {
				res.redirect('/')
			})
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router