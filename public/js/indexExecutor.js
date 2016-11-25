const disableButton = (buttonId) => {
	document.getElementById(buttonId).disabled = true;
}

// id index op body index zetten
if($('#index')) {
	let userlocation = ''
	disableButton('askbutton')
	getLocation()
	// is getLocation klaar && en hangt er niet al eentje
	// dan enable button (HFAsk)

	// is getLocation klaar en is er een HFAsk die niet van jezelf is
	// dan enable button (HFGive)

	// event listener function
	submitWithLocation('#hfaskform')
}