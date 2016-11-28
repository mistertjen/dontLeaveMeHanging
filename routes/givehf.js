const express = require('express')
const request = require('request')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/givehf')
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

				// check if unmatched high five is still hanging and not already resolved
				db.HFAsk.findOne ({
					where: {
						 //find first one which hasn't been matched yet to a hfgive
						hfgiveId : null,
						$and: {
							userId: {
								// AND is not your own hfask
								$not: req.session.user.id
							}
						}
					}
				})
				.then(HFAsk => {
					// if there is still one hanging
					if (HFAsk) {
						// create hfgive with this location
						db.HFGive.create({
							location: location,
							// add userId with id of the user of this session, added to session object after login/registering app.get('/')
							userId: req.session.user.id
						})
						// send result: new hfgive object to the then, so you can reach it in it's nested then
						.then((hfgive)=>{
							db.HFAsk.findOne ({
								where: {
									 //find first one which hasn't been matched yet to a hfgive
										hfgiveId : null,
									 $and: {
										userId: {
												// AND is not your own hfask
												$not: req.session.user.id
											}
									}
								}
							})
							// nested in findOne-then, so it can reach the hfgive id just created through hfgive.dataValues.id
							// send result of findone, so you can update this specific one
							.then((hfask) => {
								// because you gave the whole found hfask as an object, don't use db.HFAsk.update, but hfask.update (only this specific one just found)
								hfask.update({
									// give it the id of the hfgive you just created
									hfgiveId: hfgive.dataValues.id
								})
							})
						})
						.then( () => {
							// there's a match so redirect to /success
							res.redirect('/success')
						})
					}
					else {
						// if there is no one hanging anymore, redirect to index and alert an oops
						res.redirect('/?message=' + encodeURIComponent("Oops"))
					}
				})
				.catch(err => {
					res.send(false)
					console.log(err)
				})
			  }
			})
		// else if location is 'unknown', create one with 'secret location'
		} else {
			// check if unmatched high five is still hanging and not already resolved
			db.HFAsk.findOne ({
				where: {
					 //find first one which hasn't been matched yet to a hfgive
					hfgiveId : null,
					$and: {
						userId: {
							// AND is not your own hfask
							$not: req.session.user.id
						}
					}
				}
			})
			.then(HFAsk => {
				// if there is still one hanging
				if (HFAsk) {
					// create hfask with 'unknown' as location
					db.HFGive.create({
						location: 'secret location',
						// add userId with id of the user of this session, added to session object after login/registering app.get('/')
						userId: req.session.user.id
					})
					// send result: new hfgive object to the then, so you can reach it in it's nested then
					.then((hfgive)=>{
						db.HFAsk.findOne ({
							where: {
								//find first one which hasn't been matched yet to a hfgive
								hfgiveId : null,
								$and: {
									userId: {
										// AND is not your own hfask
										$not: req.session.user.id
									}
								}
							}
						})
						// nested in findOne-then, so it can reach the hfgive id just created through hfgive.dataValues.id
						// send result of findone, so you can update this specific one
						.then((hfask) => {
							// because you gave the whole found hfask as an object, don't use db.HFAsk.update, but hfask.update (only this specific one just found)
							hfask.update({
								// give it the id of the hfgive you just created
								hfgiveId: hfgive.dataValues.id
							})
						})
					})
					.then( () => {
						// there's a match so redirect to /success
						res.redirect('/success')
					})
				} else {
					// if there is no one hanging anymore, redirect to index and alert an oops
					res.redirect('/?message=' + encodeURIComponent("Oops"))
				}
			})
			.catch(err => {
				res.send(false)
				console.log(err)
			})
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router