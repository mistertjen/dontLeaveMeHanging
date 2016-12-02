// this is extra and only for webpack use
let $ = require('jquery')
const timerFunc = require(__dirname + '/../libraries/timer-lib')

if($('#success').length > 0) {
	// play highfive sound when you reach success
	var audio = new Audio('../sounds/highfive.wav');
	audio.play();

	$.get('/success/matchedHF', data => {
		let HFAskTime = Date.parse(data.HFAskTime) // in ms
		let HFGiveTime = Date.parse(data.HFGiveTime) // in ms
		let difference = HFGiveTime - HFAskTime // in ms
		// always convert difference to positive number. Therefore doesn't matter if HFAsk or HFGive was created first. <-- math thingy
		if (difference < 0) difference *= -1
		
		// save the resulting obj from msToTime
		let timeObj = timerFunc.msToTime(difference)
		
		// uses es6 template string
		if($('#asker').length > 0) {
			// console.log('ask route')
			let successMessage = `${data.HFGiveUserName} from ${data.HFGiveLocation} left you hanging for: ${timeObj.days} days, ${timeObj.hours} hours, ${timeObj.minutes} minutes, ${timeObj.seconds} seconds. `
			$('#success-message').html(successMessage)
		}

		if($('#giver').length > 0) {
			// console.log('give route')
			let successMessage = `You left ${data.HFAskUserName} from ${data.HFAskLocation} hanging for: ${timeObj.days} days, ${timeObj.hours} hours, ${timeObj.minutes} minutes, ${timeObj.seconds} seconds. `
			$('#success-message').html(successMessage)
		}
	})
}
