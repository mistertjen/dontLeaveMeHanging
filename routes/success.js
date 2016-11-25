const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/success')
	.get((req, res) => {
		db.HFAsk.findOne({
			where: {
				hfgiveId: true
			}
		})
		.then(x => {
			res.send('success!!!')
		})
		.catch(x => {
			res.send('')
		})
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router