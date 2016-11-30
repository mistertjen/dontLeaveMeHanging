// this is extra and only for webpack use
const locationFunc = require(__dirname + '/location-lib')
const checkFunc = require(__dirname + '/check-lib')
const successFunc = require(__dirname + '/success-lib')

// this script executes functions from libraries when it reaches index with the #index
// id index op body index zetten
if($('#index').length > 0) {
	// disable hfaskbutton, because first location should be known + should only enable when you don't already have one hanging
	locationFunc.disableButton('hfaskbutton')
	locationFunc.disableButton('hfgivebutton')
	
	// Do the intial check and pass userlocation to be set on the button submit as soon as it's known.
	checkFunc.buttonHFGive( userlocation => {
		locationFunc.submitLocation('#hfgiveform', userlocation)	
	})
	checkFunc.buttonHFAsk( userlocation => {
		locationFunc.submitLocation('#hfaskform', userlocation)
	})

	// check every 2 seconds if there is a high five which is not your own hanging to give high five
	setInterval(checkFunc.buttonHFGive, 2000)
	setInterval(checkFunc.buttonHFAsk, 2000)

	// initial check for successful match and once again every 2 sec (2000ms).
	successFunc.check()
	setInterval(successFunc.check, 2000)
}