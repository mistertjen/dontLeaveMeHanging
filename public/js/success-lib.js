const successFunc = {
	check: () => {
		// post to standard route, data gets true or false
		$.get('/success/check', (data) => {
			// if true (HF is matched in database), then go to /success route
			if(data) location.href = "/success"
		})
	}
}