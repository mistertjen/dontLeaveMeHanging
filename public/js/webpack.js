/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//- libraries
	// require(__dirname + '/jquery-3.1.1.min.js')
	// let $ = require('jquery')
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);

	//- scripts
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);

	// stylesheets

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// a mini-library containing an object with all timer functions. Set in an object so you can easily access with timerFunc.methodName, makes it semantically easy to see a timerFunc is being used. Also ability to log all timer functions with console.log(timerFunc) in any script file. Important to include these before the custom script files (just like other libraries)

	var timerFunc = {
		getHFTimeMs: function getHFTimeMs(route, callback) {
			// make GET request to the route
			$.get(route, function (success) {
				// parse data to ms and save in result
				var result = Date.parse(success);
				if (typeof callback == 'function') callback(result);
			});
		},
		msToTime: function msToTime(ms) {
			// transform to seconds
			var x = ms / 1000;
			// get amount of seconds that are not a whole minute
			var seconds = Math.floor(x % 60);
			// transform to minutes
			x /= 60;
			// get amount of minutes that are not a whole hour
			var minutes = Math.floor(x % 60);
			// transform to hours
			x /= 60;
			// get amount of hours that are not a whole day
			var hours = Math.floor(x % 24);
			// transform to days
			var days = Math.floor(x / 24);
			var result = { seconds: seconds, minutes: minutes, hours: hours, days: days };
			return result;
		}
	};

	// this is extra and only for webpack use
	module.exports = {
		getHFTimeMs: timerFunc.getHFTimeMs,
		msToTime: timerFunc.msToTime
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// location library with all functions concerning location in an object
	var locationFunc = {
		// get location function
		// using getlocation API
		getLocation: function getLocation(callback) {
			// if browser doesn't support geolocation
			if (!navigator.geolocation) {
				// declared without let so now a global variable
				var userlocation = 'unknown';

				// when userlocation is set, run callback in index-script.js
				if (typeof callback === 'function') callback(userlocation);
			}
			// if browser does support geolocation
			function success(position) {
				// gets latitude and longtitude from ip adress
				var userlocation = position.coords.latitude + ',' + position.coords.longitude;
				// test
				// userlocation  = 'unknown';

				// when userlocation is set, run callback in index-script.js
				if (typeof callback === 'function') callback(userlocation);
			}
			// if error
			function error() {
				var userlocation = 'unknown';

				// when userlocation is set, run callback in index-script.js
				if (typeof callback === 'function') callback(userlocation);
			}
			// call getCurrentPosition
			navigator.geolocation.getCurrentPosition(success, error);
		},
		// submit location to post request
		submitLocation: function submitLocation(formId, userlocation) {
			$(formId).submit(function () {
				// append input to form in the post request so server can reach it
				$(this).append(function (location) {
					return $('<input>', {
						type: 'hidden',
						name: 'location',
						value: userlocation
					});
				});
			});
		},
		disableButton: function disableButton(buttonId) {
			document.getElementById(buttonId).disabled = true;
		},
		enableButton: function enableButton(buttonId) {
			document.getElementById(buttonId).disabled = false;
		}
	};

	// this is extra and only for webpack use
	module.exports = {
		getLocation: locationFunc.getLocation,
		submitLocation: locationFunc.submitLocation,
		disableButton: locationFunc.disableButton,
		enableButton: locationFunc.enableButton
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// this is extra and only for webpack use
	var locationFunc = __webpack_require__(2);

	// check library with all functions concerning checking the database
	var checkFunc = {
		buttonHFGive: function buttonHFGive(callback) {
			// test if function is called every 2 secs after location is known
			// console.log('i work every 2 secs')
			$.get('/canhfgive', function (data) {
				// console logt data so true or false
				console.log("buttonHFGive: " + data);
				// if there is one hanging unmatched
				if (data) {
					// get location, with a callback, which is a function
					// which is called in getLocation when it's done
					// userlocation is passed to the callback function to be used further in the chain
					locationFunc.getLocation(function (userlocation) {
						// enables button when there is an unmatched hf and the location is known
						locationFunc.enableButton('hfgivebutton');
						if (typeof callback === 'function') callback(userlocation);
					});
					// if there is nothing to high five back
				} else {
					// disable button
					locationFunc.disableButton('hfgivebutton');
					if (typeof callback === 'function') callback(userlocation);
				}
			});
		},
		buttonHFAsk: function buttonHFAsk(callback) {
			// test if function is called every 2 secs after location is known
			// console.log('i work every 2 secs')
			$.get('/canhfask', function (data) {
				// console logt data so true or false
				console.log("buttonHFAsk: " + data);
				// if there is one hanging unmatched
				if (data) {
					// get location, with a callback, which is a function
					// which is called in getLocation when it's done
					// userlocation is passed to the callback function to be used further in the chain
					locationFunc.getLocation(function (userlocation) {
						// enables button when there is an unmatched hf and the location is known
						locationFunc.enableButton('hfaskbutton');
						if (typeof callback === 'function') callback(userlocation);
					});
					// if there is nothing to high five back
				} else {
					// disable button
					locationFunc.disableButton('hfaskbutton');
					if (typeof callback === 'function') callback(userlocation);
				}
			});
		}
	};

	// this is extra and only for webpack use
	module.exports = {
		buttonHFGive: checkFunc.buttonHFGive,
		buttonHFAsk: checkFunc.buttonHFAsk
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var successFunc = {
		check: function check() {
			// post to standard route, data gets true or false
			$.get('/success/check', function (data) {
				// if true (HF is matched in database), then go to /success route
				if (data) location.href = "/success";
			});
		}
	};

	// this is extra and only for webpack use
	module.exports = {
		check: successFunc.check
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// this is extra and only for webpack use
	var timerFunc = __webpack_require__(1);

	// function only called on pages that include a timer class and adds the timeString to the html element.
	if ($('.timer').length > 0) {
		(function () {
			// store dom object, to prevent constant jquery calls.
			var target = $('.timer');

			timerFunc.getHFTimeMs('/timer/HFAskTime', function (HFTime) {
				var now = Date.now(); // in ms
				var difference = now - HFTime; // in ms

				// save action to be done in interval
				var action = function action() {
					// save the resulting obj from msToTime
					var timeObj = timerFunc.msToTime(difference);
					// uses es6 template string
					var timeString = 'You have been left having for: ' + timeObj.days + ' days, ' + timeObj.hours + ' hours, ' + timeObj.minutes + ' minutes, ' + timeObj.seconds + ' seconds. ';
					target.html(timeString);
					difference += 1000;
				};

				// initial action call and then again every 1000ms
				action();
				setInterval(action, 1000);
			});
		})();
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// this is extra and only for webpack use
	var locationFunc = __webpack_require__(2);
	var checkFunc = __webpack_require__(3);
	var successFunc = __webpack_require__(4);

	// this script executes functions from libraries when it reaches index with the #index
	// id index op body index zetten
	if ($('#index').length > 0) {
		// disable hfaskbutton, because first location should be known + should only enable when you don't already have one hanging
		locationFunc.disableButton('hfaskbutton');
		locationFunc.disableButton('hfgivebutton');

		// Do the intial check and pass userlocation to be set on the button submit as soon as it's known.
		checkFunc.buttonHFGive(function (userlocation) {
			locationFunc.submitLocation('#hfgiveform', userlocation);
		});
		checkFunc.buttonHFAsk(function (userlocation) {
			locationFunc.submitLocation('#hfaskform', userlocation);
		});

		// check every 2 seconds if there is a high five which is not your own hanging to give high five
		setInterval(checkFunc.buttonHFGive, 2000);
		setInterval(checkFunc.buttonHFAsk, 2000);

		// initial check for successful match and once again every 2 sec (2000ms).
		successFunc.check();
		setInterval(successFunc.check, 2000);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// this is extra and only for webpack use
	var successFunc = __webpack_require__(4);

	// initial check for successful match and once again every 2 sec (2000ms).
	if ($('#profile').length > 0) {
		successFunc.check();
		setInterval(successFunc.check, 2000);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// this is extra and only for webpack use
	var timerFunc = __webpack_require__(1);

	if ($('#success').length > 0) {
		$.get('/success/matchedHF', function (data) {
			var HFAskTime = Date.parse(data.HFAskTime); // in ms
			var HFGiveTime = Date.parse(data.HFGiveTime); // in ms
			var difference = HFGiveTime - HFAskTime; // in ms
			// always convert difference to positive number. Therefore doesn't matter if HFAsk or HFGive was created first. <-- math thingy
			if (difference < 0) difference *= -1;

			// save the resulting obj from msToTime
			var timeObj = timerFunc.msToTime(difference);

			// uses es6 template string
			if ($('#asker').length > 0) {
				// console.log('ask route')
				var successMessage = data.HFGiveUserName + ' from ' + data.HFGiveLocation + ' left you hanging for: ' + timeObj.days + ' days, ' + timeObj.hours + ' hours, ' + timeObj.minutes + ' minutes, ' + timeObj.seconds + ' seconds. ';
				$('#success-message').html(successMessage);
			}

			if ($('#giver').length > 0) {
				// console.log('give route')
				var _successMessage = 'You left ' + data.HFAskUserName + ' from ' + data.HFAskLocation + ' hanging for: ' + timeObj.days + ' days, ' + timeObj.hours + ' hours, ' + timeObj.minutes + ' minutes, ' + timeObj.seconds + ' seconds. ';
				$('#success-message').html(_successMessage);
			}
		});
	}

	//- let .html(timeString)

/***/ }
/******/ ]);