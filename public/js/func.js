const func = {
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
		x = ms / 1000;
		// get amount of seconds that are not a whole minute
		seconds = Math.floor(x % 60)
		// transform to minutes
		x /= 60
		// get amount of minutes that are not a whole hour
		minutes = Math.floor(x % 60)
		// transform to hours
		x /= 60
		// get amount of hours that are not a whole day
		hours = Math.floor(x % 24)
		// transform to days
		days = Math.floor(x / 24)
		const result = {seconds: seconds, minutes: minutes, hours:hours, days: days}
		return result
	}
}