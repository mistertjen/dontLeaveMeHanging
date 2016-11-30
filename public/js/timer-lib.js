// a mini-library containing an object with all timer functions. Set in an object so you can easily access with timerFunc.methodName, makes it semantically easy to see a timerFunc is being used. Also ability to log all timer functions with console.log(timerFunc) in any script file. Important to include these before the custom script files (just like other libraries)

const timerFunc = {
	getHFTimeMs: (route, callback) => {
		// make GET request to the route
		$.get(route, (success) => {
			// parse data to ms and save in result
			const result = Date.parse(success)
			if (typeof callback == 'function') callback(result)
		})
	},
	msToTime: (ms) => {
		// transform to seconds
		let x = ms / 1000;
		// get amount of seconds that are not a whole minute
		let seconds = Math.floor(x % 60)
		// transform to minutes
		x /= 60
		// get amount of minutes that are not a whole hour
		let minutes = Math.floor(x % 60)
		// transform to hours
		x /= 60
		// get amount of hours that are not a whole day
		let hours = Math.floor(x % 24)
		// transform to days
		let days = Math.floor(x / 24)
		const result = {seconds: seconds, minutes: minutes, hours:hours, days: days}
		return result
	}
}

// this is extra and only for webpack use
module.exports = {
	getHFTimeMs: timerFunc.getHFTimeMs,
	msToTime: timerFunc.msToTime
}