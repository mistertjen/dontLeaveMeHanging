const getHFTimeMs = (route, callback) => {
	$.get(route, (success) => {
		const result = Date.parse(success)
		if (typeof callback == 'function') callback(result)
	})
}

// const msToTime = (ms) => {
// 	// transform to seconds
// 	x = ms / 1000;
// 	// get amount of seconds that are not a whole minute
// 	seconds = Math.floor(x % 60)
// 	// transform to minutes
// 	x /= 60
// 	// get amount of minutes that are not a whole hour
// 	minutes = Math.floor(x % 60)
// 	// transform to hours
// 	x /= 60
// 	// get amount of hours that are not a whole day
// 	hours = Math.floor(x % 24)
// 	// transform to days
// 	days = Math.floor(x / 24)
// 	const result = {seconds: seconds, minutes: minutes, hours:hours, days: days}
// 	return result
// }

// minified
const msToTime = (ms) => {
	x = ms / 1000;seconds = Math.floor(x % 60);x /= 60;minutes = Math.floor(x % 60);x /= 60;hours = Math.floor(x % 24);days = Math.floor(x / 24);const result = {seconds: seconds, minutes: minutes, hours:hours, days: days};return result
}

// function only called on pages that include a timer class and adds the timeString to the html element.
if ($('.timer').length > 0) { 
	// store dom object, to prevent constant jquery calls.
	const target = $('.timer')

	getHFTimeMs('/timer/HFAskTime', (HFTime) => {
		const now = Date.now()
		let difference = now - HFTime

		// save action to be done in interval
		const action = () => {
			let timeObj = msToTime(difference)
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