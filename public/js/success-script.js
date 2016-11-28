if($('#success').length > 0) {
	// timerFunc.getHFTimeMs('/success/matchedHF', (matchedHF) => {
	$.get('/success/matchedHF', data => {
		// console.log(data)
		let HFAskTime = Date.parse(data.HFAskTime) // in ms
		let HFGiveTime = Date.parse(data.HFGiveTime) // in ms
		let difference = HFGiveTime - HFAskTime // in ms
		// always convert difference to positive number. Therefore doesn't matter if HFAsk or HFGive was created first. <-- math thingy
		if (difference < 0) difference *= -1
		
		// save the resulting obj from msToTime
		let timeObj = timerFunc.msToTime(difference)
		
		// uses es6 template string
		let timeString = `You have been left having for: ${timeObj.days} days, ${timeObj.hours} hours, ${timeObj.minutes} minutes, ${timeObj.seconds} seconds. `

		$('#timeString').html(timeString)
		$('#location').html(`From ${data.HFGiveLocation}`)
		$('#username').html(`By ${data.HFGiveUserName}`)
	})
}
	
	//- let .html(timeString)
