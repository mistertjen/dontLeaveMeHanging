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
		// declared without let so now a global variable
		userlocation  = 'unknown';
		undisableButton()
	}
	// if browser does support geolocation
	function success(position) {
		// gets latitude and longtitude from ip adress
		userlocation  = position.coords.latitude + ',' + position.coords.longitude;
		//userloc = 'hallo'
		undisableButton()
	}
	// if error
	function error() {
		userlocation  = 'unknown';
		undisableButton()
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
            value: userlocation
            // test else statement askhf.js
            // value: 'unknown,unknown'
        })
    })
});