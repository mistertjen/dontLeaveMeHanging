// this is extra and only for webpack use
let $ = require('jquery')
const locationFunc = require(__dirname + '/location-lib')

// check library with all functions concerning checking the database
const checkFunc = {
	buttonHFGive: (callback) => {
		// store dom object
		const target = $('.hfgivebutton')
		// test if function is called every 2 secs after location is known
		// console.log('i work every 2 secs')
		$.get('/canhfgive', (data) => {
			// console logt data so true or false
			console.log("buttonHFGive: " + data)
			// if there is one hanging unmatched
			if(data) {
				// get location, with a callback, which is a function
				// which is called in getLocation when it's done
				// userlocation is passed to the callback function to be used further in the chain
				locationFunc.getLocation( userlocation => {
					// enables button when there is an unmatched hf and the location is known
					locationFunc.enableButton('hfgivebutton')
					let buttonString = `Give some love`
					target.html(buttonString)
					if (typeof callback === 'function') callback(userlocation)
				})
				// if there is nothing to high five back
			} else {
				// disable button
				locationFunc.disableButton('hfgivebutton')
				let buttonString = `Nobody's hanging atm`
				target.html(buttonString)
				if (typeof callback === 'function') callback(userlocation)
			}
		})
	},
	buttonHFAsk: (callback) => {
		// store dom object
		const target = $('.hfaskbutton')
		// test if function is called every 2 secs after location is known
		// console.log('i work every 2 secs')
		$.get('/canhfask', (data) => {
			// console logt data so true or false
			console.log("buttonHFAsk: " + data)
			// if there is one hanging unmatched
			if(data) {
				// get location, with a callback, which is a function
				// which is called in getLocation when it's done
				// userlocation is passed to the callback function to be used further in the chain
				locationFunc.getLocation( userlocation => {
					// enables button when there is an unmatched hf and the location is known
					locationFunc.enableButton('hfaskbutton')
					let buttonString = `Don't leave me hanging`
					target.html(buttonString)
					if (typeof callback === 'function') callback(userlocation)
				})
				// if there is nothing to high five back
			} else {
				// disable button
				locationFunc.disableButton('hfaskbutton')
				if (typeof callback === 'function') callback(userlocation)
			}
		})
	}
}

// this is extra and only for webpack use
module.exports = {
	buttonHFGive: checkFunc.buttonHFGive,
	buttonHFAsk: checkFunc.buttonHFAsk
}