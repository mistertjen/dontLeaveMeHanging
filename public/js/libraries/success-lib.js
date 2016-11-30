// this is extra and only for webpack use
let $ = require('jquery')

const successFunc = {
	check: () => {
		// post to standard route, data gets true or false
		$.get('/success/check', (data) => {
			// if true (HF is matched in database), then go to /success route
			if(data) location.href = "/success"
		})
	}
}

// this is extra and only for webpack use
module.exports = {
	check: successFunc.check
}