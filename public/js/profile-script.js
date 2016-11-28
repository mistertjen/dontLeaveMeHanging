// initial check for successful match and once again every 2 sec (2000ms).
if($('#profile').length > 0) {
	successFunc.check()
	setInterval(successFunc.check, 2000)
}