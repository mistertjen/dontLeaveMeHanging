const checkSuccess = () => {
	// post to route, data gets true or false
	$.post('/success', (data) => {
		console.log(data)
		// if true (HF is matched in database), then go to /success route
		if(data) location.href = "/success"
	})
}

// initial check and once again every 2 sec (2000ms).
checkSuccess()
setInterval(checkSuccess, 2000)