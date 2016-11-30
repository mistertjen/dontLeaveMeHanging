// this is extra and only for webpack use
let $ = require('jquery')
const successFunc =require(__dirname + '/../libraries/success-lib')

// initial check for successful match and once again every 2 sec (2000ms).
if($('#profile').length > 0) {
	successFunc.check()
	setInterval(successFunc.check, 2000)
}