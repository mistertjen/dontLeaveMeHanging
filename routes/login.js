// require express, bcrypt
const express = require('express')
const bcrypt = require('bcrypt')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/login')
	.get((req, res) => {
		res.redirect('/')
	})
	// When submit button is clicked on login.pug
	.post((req, res) => {
		if(!req.body.loginemail || !req.body.loginpassword){
			res.redirect('/?message=' + encodeURIComponent("Please fill in all fields to login"));
		} else if(req.body.loginemail.length > 255 || req.body.loginpassword.length > 255) {
			res.redirect('/?message=' + encodeURIComponent("Input cannot be longer than 255 characters"));
		} else {
			// declare variable password which stores the password input under login by user
			let password = req.body.loginpassword;

			// find user in table users with the same email as filled in by user on loginform
			db.User.findOne({
				where: {
					email: req.body.loginemail
				}
			}).then( (user) => {
				if (!user) {
					res.redirect('/?message=' + encodeURIComponent("Invalid email or password"));
					return
				}
				// compare (hashed) input by user for password under login, to his/her stored (hashed) password
				bcrypt.compare(password, user.password, (err, result) => {
					if(err) {
						throw err;
					} else {
						// if user exists and (hashed) password in table matched the filled in (hashed) password
						if (user !== null && result === true) {
							// start session and redirect to index
							req.session.user = user;
							res.redirect('/');
						} else {
							// redirect to login page and say name or password is incorrect 
							res.redirect('/?message=' + encodeURIComponent("Invalid email or password"));
						}
					}
				})
			})
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router