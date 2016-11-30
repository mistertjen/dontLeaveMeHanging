const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')
const bcrypt = require('bcrypt')

router.route('/profile')
	.get((req, res) => {
		let user = req.session.user;
		if(user){
			Promise.all([
				db.HFAsk.findAll({
					where: {
						// all own HFAsks
						userId: req.session.user.id,
						// that are matched/have hfgiveId
						hfgiveId:
						{
							$ne: null
						}
					},
					// if false both deleted and non-deleted results will be returned
					// if true only non-deleted results
					paranoid: false,
					// include all associations (user, hfask, hfgive)
					include: [{all:true}]
				}),
				db.HFGive.findAll({
					where: {
						userId: req.session.user.id
					},
					include: [{
						all:true,
						paranoid: false
					}]
				})
			])
			.then(resolvedHFs => {
				// declare variables here so results from inside the if-else-block statements can be passed to the pug file
					// console.log(resolvedHFs[0])
					// console.log(resolvedHFs[1])
				let askResult = ""
				let giveResult = ""

				// if you don't have resolved HFAsks, so array is empty
				if(resolvedHFs[0] == ''){
					// set askResult to 
					askResult = "You didn't receive a high five yet."
				} else if (resolvedHFs[0] !== '') {
					// declare an empty array to store the data in we need on profile.pug
					askResult = []
					// function to calculate the timedifference beteen HFGive and HFAsk
					let msToTime = (ms) => {
							// transform to seconds
							x = ms / 1000;
							// get amount of seconds that are not a whole minute
							seconds = Math.floor(x % 60)
							// transform to minutes
							x /= 60
							// get amount of minutes that are not a whole hour
							minutes = Math.floor(x % 60)
							// transform to hours
							x /= 60
							// get amount of hours that are not a whole day
							hours = Math.floor(x % 24)
							// transform to days
							days = Math.floor(x / 24)
							const result = {seconds: seconds, minutes: minutes, hours:hours, days: days}
							return result
						}
					// loop through resolvedHFs[0] to store all resolved HFAsks as object in askResult array
					for (let i = 0; i < resolvedHFs[0].length; i++) {
						// every loop create object with data we need
						// date parse so you can calculate the difference
						let HFGiveTime = Date.parse(resolvedHFs[0][i].hfgive.createdAt)
						let HFAskTime = Date.parse(resolvedHFs[0][i].createdAt)
						// calculate difference
						let difference = HFGiveTime - HFAskTime // in ms
						// always convert difference to positive number. Therefore doesn't matter if HFAsk or HFGive was created first. <-- math thingy
						if (difference < 0) difference *= -1
						// revert differcence to time object
						let timeObj = msToTime(difference)

						let hfdata = {
							HFGiveName: resolvedHFs[0][i].hfgive.username,
							HFGiveLocation: resolvedHFs[0][i].hfgive.location,
							// whole object so script in pug dissects it
							HFTimeDifference: timeObj
						}
						// push object hfdata to array: askResult
						askResult.push(hfdata)
					}
					// sends user data and message (for example change password), askResult array to pug
				}

				// if you don't have resolved HFGives, so array is empty
				if(resolvedHFs[1] == ''){
					// set giveResult to 
					giveResult = "You didn't give a high five yet."
				} else if (resolvedHFs[1] !== '') {
					// declare an empty array to store the data in we need on profile.pug
					giveResult = []
					// function to calculate the timedifference beteen HFGive and HFAsk
					let msToTime = (ms) => {
							// transform to seconds
							x = ms / 1000;
							// get amount of seconds that are not a whole minute
							seconds = Math.floor(x % 60)
							// transform to minutes
							x /= 60
							// get amount of minutes that are not a whole hour
							minutes = Math.floor(x % 60)
							// transform to hours
							x /= 60
							// get amount of hours that are not a whole day
							hours = Math.floor(x % 24)
							// transform to days
							days = Math.floor(x / 24)
							const result = {seconds: seconds, minutes: minutes, hours:hours, days: days}
							return result
						}
					// loop through resolvedHFs[1] to store all resolved HFGives as object in giveResult array
					for (let i = 0; i < resolvedHFs[1].length; i++) {
						// every loop create object with data we need
						// date parse so you can calculate the difference
						let HFGiveTime = Date.parse(resolvedHFs[1][i].createdAt)
						let HFAskTime = Date.parse(resolvedHFs[1][i].hfask.createdAt)
						// calculate difference
						let difference = HFGiveTime - HFAskTime // in ms
						// always convert difference to positive number. Therefore doesn't matter if HFAsk or HFGive was created first. <-- math thingy
						if (difference < 0) difference *= -1
						// revert difference to time object
						let timeObj = msToTime(difference)

						let hfdata = {
							HFAskName: resolvedHFs[1][i].hfask.username,
							HFAskLocation: resolvedHFs[1][i].hfask.location,
							// whole object so script in pug dissects it
							HFTimeDifference: timeObj
						}
						// push object hfdata to array: giveResult
						giveResult.push(hfdata)
					}
				}

				// render profile with user data, message (such as password change), askResult and giveResult
				res.render('profile', {user: req.session.user, message: req.query.message, askResult: askResult, giveResult: giveResult})
			})
		} else {
			res.render('registerlogin', {message: "Please, log in to view your profile."})
		}
	})

router.route('/profile/changeEmail')
	.post((req, res) => {
		// error handling
		if (req.body.newEmail.length > 255) {res.redirect('/profile?message=' + encodeURIComponent("Input cannot be longer than 255 characters"))}	
		else if (req.body.newEmail !== req.body.confirmNewEmail) res.redirect('/profile?message=' + encodeURIComponent('Email doesn\'t match.'))
		// database and session update
		else if (req.body.newEmail) {
			db.User.update({
				email: req.body.newEmail
			}, {
				where: {
					name: req.session.user.name,
					id: req.session.user.id
				}
			})
			.then(x => {
				req.session.user.email = req.body.newEmail
				res.redirect('/profile?message=' + encodeURIComponent('Email successfully changed.'))
			})
			.catch(x => res.redirect('/profile?message=' + encodeURIComponent('Emailaddress already exists.')))
		}
	})

router.route('/profile/changeName')
	.post((req, res) => {
		// error handling
		if (req.body.newName.length > 255) {res.redirect('/profile?message=' + encodeURIComponent("Input cannot be longer than 255 characters"))}
		// database and session update
		else if (req.body.newName) {
			db.User.update({
				name: req.body.newName
			}, {
				where: {
					name: req.session.user.name,
					id: req.session.user.id
				}
			})
			.then(user => {
				req.session.user.name = req.body.newName
				res.redirect('/profile?message=' + encodeURIComponent('Name successfully changed.'))
			})
		}
	})

router.route('/profile/changePassword')
	.post((req, res) => {
		// error handling
		if (req.body.newPassword.length < 8) {res.redirect('/profile?message=' + encodeURIComponent('Please fill in a new password with 8 characters or more.'))}
		else if (req.body.newPassword.length > 255) {res.redirect('/profile?message=' + encodeURIComponent("Input cannot be longer than 255 characters"))}
		else if (req.body.newPassword !== req.body.confirmNewPassword) {res.redirect('/profile?message=' + encodeURIComponent('New password doesn\'t match.'))}
		// database update
		else if (req.body.newPassword.length) {
			db.User.findById(req.session.user.id)
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