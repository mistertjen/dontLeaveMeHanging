const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/profile')
	.get((req, res) => {
		res.render('profile')
	})

router.route('/profile/changeEmail')
	.post((req, res) => {
		if (req.body.email !== req.body.email2) {res.redirect('/profile?message=Email doesn\'t match.')}
		else if (req.body.email) {
			db.User.update({
				email: req.body.email
			}, {
				where: {
					// Doesn't work until sessions
					username: req.session.user.name,
					id: req.session.user.id

					// Test with this:
					// id: 1
				}
			})
			res.redirect('/profile?message=Email successfully changed.')
		}
	})

router.route('/profile/changeName')
	.post((req, res) => {
		db.User.update({
			name: req.body.name
		}, {
			where: {
				// Doesn't work until sessions
				username: req.session.user.name,
				id: req.session.user.id

				// Test with this:
				// id: 1
			}
		})
		res.redirect('/profile?message=Name successfully changed.')
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router