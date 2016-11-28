// check library with all functions concerning checking the database
const checkFunc = {
	buttonHFGive: () => {
		// test if function is called every 2 secs after location is known
		// console.log('i work every 2 secs')
		$.get('/canhfgive', (data) => {
			console.log(data)
			// if there is one hanging unmatched
			if(data) {
				// enable give some love button
				document.getElementById("hfgivebutton").disabled = false;
			}
		})
	}
}