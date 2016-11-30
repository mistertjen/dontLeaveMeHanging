const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/success')
	.get((req, res) => {
		// only render if a matchPath is set.
		if (req.session.matchedPath) {
			res.render('success', {matchedPath: req.session.matchedPath})
		}
		// else back to root.
		else {res.redirect('/')}
	})

router.route('/success/check')
	.get((req, res) => {
		db.HFAsk.findOne({
			where: {
				// PRODUCTION:
				userId: req.session.user.id,
				// TEST:
				// userId: 1,
				hfgiveId: {
					$ne: null
				}
			},
			include: {all:true}
		})
		.then(HFAsk => {
			if (HFAsk == null) res.send(false)
			else {
				// if not null, then store the matched HF and Path in the session data.
				req.session.matchedPath = 'HFAsk'
				req.session.matchedHF = HFAsk
				//  send true to the client side (the AJAX req), then redirect from there. Res.render not possible here.
				res.send(true)
			}
		})
		.catch(err => {
			res.send(false)
			console.log(err)
		})
	})

router.route('/success/matchedHF')
	.get((req, res) => {
		// find the username of the matching hf. 
		// db.User.findById(req.session.matchedHF.hfgive.userId)
		// .then (HFGiveUser => {
			console.log(req.session.matchedHF)
			// create object with only the specific data to send back.
			let data = {
				HFAskTime: req.session.matchedHF.createdAt,
				HFAskLocation: req.session.matchedHF.location,
				HFAskUserName: req.session.matchedHF.username,
				HFGiveTime: req.session.matchedHF.hfgive.createdAt,
				HFGiveLocation: req.session.matchedHF.hfgive.location,
				HFGiveUserName: req.session.matchedHF.hfgive.username,
			}
			res.send(data)
			// clear session data of the match
			if (req.session.matchedPath === 'HFAsk') {
				db.HFAsk.findById(req.session.matchedHF.id).then(match => match.destroy())
			}

			req.session.matchedHF = ''
			req.session.matchedPath = ''
			// req.session.hfgive = ''
		// })
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router