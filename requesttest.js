let request = require('request')

navigator.geolocation.getCurrentPosition(success, error);
// get location
let location = "unknown"
// if browser doesn't support geolocation
if (!navigator.geolocation){
	location = "Location is secret";
	return;
}
// if browser does support geolocation
function success(position) {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;

    let locationURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true";
    
    // Make GET request to locationURL
    // Save in variable e.g. unparsedData
	request(locationURL, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the Google homepage.
	    let unparsedData = body;
		let parsedData = JSON.parse(unparsedData);
		let city = parsedData.results[0].address_components[3].long_name
		let country = parsedData.results[0].address_components[6].long_name
		let location = city + ', ' + country
		console.log(location)
	  }
	})
  }
  // if error
  function error() {
    location = "Location is secret";
  }