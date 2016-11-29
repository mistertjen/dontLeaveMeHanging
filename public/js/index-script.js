// this script executes functions from libraries when it reaches index with the #index
// id index op body index zetten
if($('#index')) {
	// because userlocation var is declared here library getlocation can reach and change it
	let userlocation = ''
	// disable hfaskbutton, because first location should be known + should only enable when you don't already have one hanging
	locationFunc.disableButton('hfaskbutton')
	locationFunc.disableButton('hfgivebutton')
	
	// check every 2 seconds if there is a high five which is not your own hanging to give high five
	setInterval(checkFunc.buttonHFGive, 2000)

	// is getLocation klaar en is er een HFAsk die niet van jezelf is
	// dan enable button (HFGive)

	// event listener function: when submit is clicked for #hfaskform
	locationFunc.submitLocation('#hfaskform')

	// initial check for successful match and once again every 2 sec (2000ms).
	successFunc.check()
	setInterval(successFunc.check, 2000)
}