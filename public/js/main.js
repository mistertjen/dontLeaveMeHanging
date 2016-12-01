// webpack specific file. Like app.js on the server, it links everything.

// libraries
// these are not necessary to require here, because each files requires its' own libraries, but we do so just to have an overview of the (custom) libraries
let $ = require('jquery')
require(__dirname + '/libraries/timer-lib')
require(__dirname + '/libraries/location-lib')
require(__dirname + '/libraries/check-lib')
require(__dirname + '/libraries/success-lib')

//- scripts
// these are all necessary to require here, these are all the files to be loaded.
require(__dirname + '/scripts/counter-script')
require(__dirname + '/scripts/index-script')
require(__dirname + '/scripts/profile-script')
require(__dirname + '/scripts/success-script')

// stylesheets
// these are all also necessary to require here, these are all the files to be loaded.
require(__dirname + '/../stylesheets/sass/main.scss')

$(document).ready( () => {
	$( () => {
		//highlight current nav
		// looks for # on body, and if a (link) contains the string, than adds a class to that link: active
		$("#index a:contains('Don')").parent().addClass('active');
		$("#profile a:contains('Profile')").parent().addClass('active');
	})
});