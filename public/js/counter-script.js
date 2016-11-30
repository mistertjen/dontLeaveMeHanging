// this is extra and only for webpack use
const timerFunc = require(__dirname + '/timer-lib')

// function only called on pages that include a timer class and adds the timeString to the html element.
if ($('.timer').length > 0) { 
	// store dom object, to prevent constant jquery calls.
	const target = $('.timer')

	timerFunc.getHFTimeMs('/timer/HFAskTime', (HFTime) => {
		const now = Date.now() // in ms
		let difference = now - HFTime // in ms

		// save action to be done in interval
		const action = () => {
			// save the resulting obj from msToTime
			let timeObj = timerFunc.msToTime(difference)
			// uses es6 template string
			let timeString = `You have been left having for: ${timeObj.days} days, ${timeObj.hours} hours, ${timeObj.minutes} minutes, ${timeObj.seconds} seconds. `
			target.html(timeString)
			difference += 1000		
		}

		// initial action call and then again every 1000ms
		action()
		setInterval(action, 1000)
	})
}