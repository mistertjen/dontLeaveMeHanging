const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/timer')
	.get((req, res) => {
		res.render('timer')
	})

router.route('/timer/HFAskTime')
	.get((req, res) => {
		db.HFAsk.findOne({
			where: {
				// needs active session
				// userId: req.session.user.id
				
				// TEST with this:
				userId: 1
			}
		})
		.then(HFAsk => {
			let UTCTime = HFAsk.dataValues.updatedAt;
			res.send(UTCTime)
		})
	})


// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router