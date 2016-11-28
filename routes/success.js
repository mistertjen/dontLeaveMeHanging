const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/success')
	.get((req, res) => {
		res.render('success')
	})
	.post((req, res) => {
		db.HFAsk.findOne({
			where: {
				// PRODUCTION:
				// userId: req.session.user.id
				// TEST:
				userId: 1,
				
				hfgiveId: {
					$ne: null
				}
			}
		})
		.then(HFAsk => {
			if (HFAsk == null) res.send(false)
			else res.send(true)
			// console.log(HFAsk.dataValues)
		})
		.catch(err => {
			res.send(false)
			console.log(err)
		})
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router