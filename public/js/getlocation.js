function getLocation() {
	// if browser doesn't support geolocation
	if (!navigator.geolocation){
		let latitude  = null;
		let longitude = null;
		console.log(latitude + ', ' + longitude)
	}
	// if browser does support geolocation
	function success(position) {
		let latitude  = position.coords.latitude;
		let longitude = position.coords.longitude;
		console.log(latitude + ', ' + longitude)
	}
	// if error
	function error() {
		let latitude  = null;
		let longitude = null;
		console.log(latitude + ', ' + longitude)
	}

	navigator.geolocation.getCurrentPosition(success, error);
}