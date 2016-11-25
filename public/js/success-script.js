const checkSuccess = () => {
	$.get('/success', (data) => {
		console.log(data)
	})
}

checkSuccess()