const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/canhfgive')
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
					$and: {
						userId: {
							// AND is not your own hfask
							$not: req.session.user.id
						}
					}
				}
			})
			.then(HFAsk => {
				// if there is no HFAsk hanging that's not your own, you can't give one back, so send false
				if (HFAsk == null) res.send(false)
				// if there is a HFAsk hanging and it's not your own, you van give one, so send true
				else res.send(true)
				// console.log(HFAsk.dataValues)
			})
			.catch(err => {
				res.send(false)
				console.log(err)
			})
		}
	})

module.exports = router