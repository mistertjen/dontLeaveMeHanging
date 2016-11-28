const successFunc = {
	check: () => {
		// post to route, data gets true or false
		$.get('/success/check', (data) => {
			console.log(data)
			// if true (HF is matched in database), then go to /success route
			if(data) location.href = "/success"
		})
	}
}