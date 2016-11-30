// location library with all functions concerning location in an object
const locationFunc = {
	// get location function
	// using getlocation API
	getLocation: (callback) => {
		// if browser doesn't support geolocation
		if (!navigator.geolocation){
			// declared without let so now a global variable
			let userlocation = 'unknown';

			// when userlocation is set, run callback in index-script.js
			if (typeof callback === 'function') callback(userlocation)
		}
		// if browser does support geolocation
		function success(position) {
			// gets latitude and longtitude from ip adress
			let userlocation = position.coords.latitude + ',' + position.coords.longitude;
			// test
			// userlocation  = 'unknown';
			
			// when userlocation is set, run callback in index-script.js
			if (typeof callback === 'function') callback(userlocation)
		}
		// if error
		function error() {
			let userlocation = 'unknown';

			// when userlocation is set, run callback in index-script.js
			if (typeof callback === 'function') callback(userlocation)
		}
		// call getCurrentPosition
		navigator.geolocation.getCurrentPosition(success, error);
	},
	// submit location to post request
	submitLocation: (formId, userlocation) => { 
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
	},
	disableButton: (buttonId) => {
		document.getElementById(buttonId).disabled = true;
	},
	enableButton: (buttonId) => {
		document.getElementById(buttonId).disabled = false;
	}
}

// this is extra and only for webpack use
module.exports = {
	getLocation: locationFunc.getLocation,
	submitLocation: locationFunc.submitLocation,
	disableButton: locationFunc.disableButton,
	enableButton: locationFunc.enableButton
}