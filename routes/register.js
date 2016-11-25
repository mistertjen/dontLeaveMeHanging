// require express, bcrypt
const express = require('express')
const bcrypt = require('bcrypt')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/register')
	.get((req, res) => {
		res.redirect('/')
	})
	.post((req, res) => {
		// checks if a field is empty, then redirects with message
		if(!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword){
			res.redirect('/?message=' + encodeURIComponent("Please fill in all fields to register"));
		} else if(req.body.password.length < 8) {
			// checks if password is shorter than 8 characters, then redirects with message
			res.redirect('/?message=' + encodeURIComponent("Password must be at least 8 characters long"));
		} else if(req.body.password != req.body.confirmPassword){
			// checks if password and confirm password don't match, then redirects with message
			res.redirect('/?message=' + encodeURIComponent("Please enter the same password twice to register"));
		} else if (req.body.name.length > 255 || req.body.email.length > 255 || req.body.password.length > 255) {
			res.redirect('/?message=' + encodeURIComponent("Input cannot be longer than 255 characters"));
		} else {
			// declare variable password which stores the password input under registration by user
			let password = req.body.password;

			// hash password, and store hashed password in password column in table users
			bcrypt.hash(password, 8, (err, hash) => {
				if (err) {
					throw err;
				} else {
					// create new user (row) in table users
					db.User.create ({
						name: 		req.body.name, 
						email: 		req.body.email,
						// store hashed password 
						password: 	hash
						// catch when email isn't unique, redirect without adding to table users
					}).catch( (err) => {
						res.redirect('/?message=' + encodeURIComponent("Your email is already taken, please register with another email"));
						throw err
					})
					// when email is unique
					.then( () => {
						// check if newly registered user exists in table users
						db.User.findOne({
							where: {
								email: req.body.email
							}
						}).then( (user) => {
							// compare (hashed) typed in password, with (hashed) stored password of this user
							bcrypt.compare(password, user.password, (err, result) => {
								if(err) {
									throw err;
								// if user exists and (hashed) filled in password matches (hashed) password in db
								} else if (user !== null && result === true) {
									// start session and redirect to index
									req.session.user = user;
									res.redirect('/');
								}
							})
						})
					})
				}
			})	
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router