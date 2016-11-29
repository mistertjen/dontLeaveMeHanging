// check library with all functions concerning checking the database
const checkFunc = {
	buttonHFGive: () => {
		// test if function is called every 2 secs after location is known
		// console.log('i work every 2 secs')
		$.get('/canhfgive', (data) => {
			// console logt data so true or false
			console.log("buttonHFGive: " + data)
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
			// console logt data so true or false
			console.log("buttonHFAsk: " + data)
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