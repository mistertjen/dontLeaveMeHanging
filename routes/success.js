const express = require('express')
// create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

router.route('/success')
	.get((req, res) => {
		// db.User.findById(req.session.user.id)
		// .then
		// 	where: {
		// 		id:
		// 	}
		// })
		db.HFAsk.findOne({
			where: {
				hfgiveId: {
					$ne: null
				}
				// $not:
				// 	{id:2}
				// }	
				// }
				// $and: {
				// 	id: {
				// 		$not: 1
				// 	}
				// }
				// hfgiveId: true
				// id: {
				// 	$ne: 1
				// }
				// $notIn: [{
				// 	id: null
				// }]
			}
		})
		.then(x => {
			if (x == null) res.send('failed')
			else res.send('success!!!')
			console.log(x.dataValues)
			// res.end()
			// console.log(x)
		})
		.catch(x => {
			res.send('')
			console.log(x)
		})
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router