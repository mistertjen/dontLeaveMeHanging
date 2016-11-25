// location library with all functions concerning location in an object
const locationFunc = {
	// get location function
	// using getlocation API
	getLocation: () => {
		// if browser doesn't support geolocation
		if (!navigator.geolocation){
			// declared without let so now a global variable
			userlocation  = 'unknown';
			document.getElementById("hfaskbutton").disabled = false;
		}
		// if browser does support geolocation
		function success(position) {
			// gets latitude and longtitude from ip adress
			userlocation  = position.coords.latitude + ',' + position.coords.longitude;
			//userloc = 'hallo'
			document.getElementById("hfaskbutton").disabled = false;
		}
		// if error
		function error() {
			userlocation  = 'unknown';
			document.getElementById("hfaskbutton").disabled = false;
		}
		// call getCurrentPosition
		navigator.geolocation.getCurrentPosition(success, error);
	},
	// submit location to post request
	submitLocation: (formId) => { 
		$(formId).submit(function () {
			// append input to form in the post request so server can reach it
		    $(this).append(function (location) {
		        return   $('<input>', {
		            type: 'hidden',
		            name: 'location',
		            value: userlocation
		        })
		    })
		});
	}
}