const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/canhfask')
	.get((req, res) => {
		let user = req.session.user;
		if (!user) {
			res.render('registerlogin', {message: "Please login to view your profile."})
		}
		else {
			db.HFAsk.findOne ({
				where: {
					 //find first one which hasn't been matched yet to a hfgive
					hfgiveId : null,
					$and: { // AND is your own
						userId: req.session.user.id
					}
				}
			})
			.then(HFAsk => {
				// if there is no HFAsk hanging which is your own, you can ask one, so send true
				if (HFAsk == null) res.send(true)
				// if there is a HFAsk hanging which is your own, you can't ask one, so send false
				else res.send(false)
				// console.log(HFAsk.dataValues)
			})
			.catch(err => {
				res.send(false)
				console.log(err)
			})
		}
	})

module.exports = router