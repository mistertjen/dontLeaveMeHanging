const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')
const bcrypt = require('bcrypt')

router.route('/profile')
	.get((req, res) => {
		// needs active session
		res.render('profile', {user:req.session.user, message: req.query.message})
		
		// TEST with this:
		// db.User.findById(1)
		// .then(user => res.render('profile', {user:user}))
	})

router.route('/profile/changeEmail')
	.post((req, res) => {
		if (req.body.newEmail.length > 255) {res.redirect('/profile?message=' + encodeURIComponent("Input cannot be longer than 255 characters"))}	
		else if (req.body.newEmail !== req.body.confirmNewEmail) res.redirect('/profile?message=' + encodeURIComponent('Email doesn\'t match.'))
		else if (req.body.newEmail) {
			db.User.update({
				email: req.body.newEmail
			}, {
				where: {
					// Doesn't work until sessions
					name: req.session.user.name,
					id: req.session.user.id

					// Test with this:
					// id: 1
				}
			})
			.then(x => res.redirect('/profile?message=' + encodeURIComponent('Email successfully changed.')))
			.catch(x => res.redirect('/profile?message=' + encodeURIComponent('Emailaddress already exists.')))
		}
	})

router.route('/profile/changeName')
	.post((req, res) => {
		if (req.body.newName.length > 255) {res.redirect('/profile?message=' + encodeURIComponent("Input cannot be longer than 255 characters"))}
		else if (req.body.newName) {
			req.session.user.name = req.body.newName
			db.User.update({
				name: req.body.newName
			}, {
				where: {
					// Doesn't work until sessions
					name: req.session.user.name,
					id: req.session.user.id

					// Test with this:
					// id: 1
				}
			})
			.then(user => {
				res.redirect('/profile?message=' + encodeURIComponent('Name successfully changed.'))
			})
		}
	})

router.route('/profile/changePassword')
	.post((req, res) => {
		if (req.body.newPassword.length < 8) {res.redirect('/profile?message=' + encodeURIComponent('Please fill in a new password with 8 characters or more.'))}
		else if (req.body.newPassword.length > 255) {res.redirect('/profile?message=' + encodeURIComponent("Input cannot be longer than 255 characters"))}
		else if (req.body.newPassword !== req.body.confirmNewPassword) {res.redirect('/profile?message=' + encodeURIComponent('New password doesn\'t match.'))}
		else if (req.body.newPassword.length) {
			// Needs sessions
			db.User.findById(req.session.user.id)
			// Test with this:
			// db.User.findById(1)
			.then(user => {
				bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
					user.update({
						password: hash
					})
					.then(x => {
						res.redirect('/profile?message=' + encodeURIComponent('Password successfully changed.'))
					})
				})
			})
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router