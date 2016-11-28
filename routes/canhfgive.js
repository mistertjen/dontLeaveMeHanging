
const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/canhfgive')
	.get((req, res) => {
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
			if (HFAsk == null) res.send(false)
			else res.send(true)
			console.log(HFAsk.dataValues)
		})
		.catch(err => {
			res.send(false)
			console.log(err)
		})
	})

module.exports = router