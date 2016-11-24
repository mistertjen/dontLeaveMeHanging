// on page load disable button with id hfaskbutton
document.getElementById("hfaskbutton").disabled = true;

// on page load of index
getLocation()

// gets called when getLocation is finished
// enables button
function undisableButton() {
    document.getElementById("hfaskbutton").disabled = false;
}

// get location function
// using getlocation API
function getLocation(callback) {
	// if browser doesn't support geolocation
	if (!navigator.geolocation){
		// declared without let so it's a global variable
		latitude  = 'unknown';
		longitude = 'unknown';
		undisableButton()
		console.log(latitude + ', ' + longitude)
	}
	// if browser does support geolocation
	function success(position) {
		// gets latitude and longtitude from ip adress
		latitude  = position.coords.latitude;
		longitude = position.coords.longitude;
		undisableButton()
		console.log(latitude + ', ' + longitude)
	}
	// if error
	function error() {
		latitude  = 'unknown';
		longitude = 'unknown';
		undisableButton()
		console.log(latitude + ', ' + longitude)
	}
	// call getCurrentPosition
	navigator.geolocation.getCurrentPosition(success, error);
}

// when submit is clicked
$('#hfaskform').submit(function () {
	// append input to form in the post request so server can reach it
    $(this).append(function (location) {
        return   $('<input>', {
            type: 'hidden',
            name: 'location',
            value: latitude + ',' + longitude
            // test else statement askhf.js
            // value: 'unknown,unknown'
        })
    })
});