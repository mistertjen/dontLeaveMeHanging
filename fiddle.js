const fs = require('fs')

fs.readFile('data.json', 'utf-8', ( err, data) => {
	let parsedData = JSON.parse(data)
	// console.log(parsedData)
	let a = parsedData.results[0].address_components[3].long_name
	let b = parsedData.results[0].address_components[6].long_name

	console.log(a + ', ' + b)
})