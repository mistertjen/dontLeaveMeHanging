// check library with all functions concerning checking the database
const checkFunc = {
	buttonHFGive: () => {
		// test if function is called every 2 secs after location is known
		// console.log('i work every 2 secs')
		$.get('/canhfgive', (data) => {
			// console logt if there is an unmatched high five hanging (that's not your own)
			console.log("There is a HFAsk hanging which is not your own, so you can give")
			// if there is one hanging unmatched
			if(data) {
				// get location, with a callback, which is a function
				// which is called in getLocation when it's done
				locationFunc.getLocation( x => {
					// enables button when there is an unmatched hf and the location is known
					locationFunc.enableButton('hfgivebutton')
				})
				// if there is nothing to high five back
			} else {
				// disable button
				locationFunc.disableButton('hfgivebutton')
			}
		})
	},
	buttonHFAsk: () => {
		// test if function is called every 2 secs after location is known
		// console.log('i work every 2 secs')
		$.get('/canhfask', (data) => {
			// console logt if there isn't an unmatched high five hanging from yourself
			console.log("You don't have a HFAsk hanging, so you can ask")
			// if there is one hanging unmatched
			if(data) {
				// get location, with a callback, which is a function
				// which is called in getLocation when it's done
				locationFunc.getLocation( x => {
					// enables button when there is an unmatched hf and the location is known
					locationFunc.enableButton('hfaskbutton')
				})
				// if there is nothing to high five back
			} else {
				// disable button
				locationFunc.disableButton('hfaskbutton')
			}
		})
	}
}