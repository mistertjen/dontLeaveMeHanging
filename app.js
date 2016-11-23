// This section sets up an express server dependent on pug, body-parser and express session
// Pug templates are in the 'views' folder and are client-side resources are in the 'public' folder.

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

// settings for pug
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

// sets bodyParser as middleware for all requests that send json or urlendcoded data. rawBody contains the data as buffer, to check for errors if the wrong encoding is being used.
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({ 
	extended: true,
	verify:function(req,res,buf){req.rawBody=buf}
})); 

app.use(express.static(__dirname + '/public'));

// settings for express-session
app.use(session({
	secret:'suuuuuuper secret',
	resave:true,
	saveUninitialized: false
}))

console.log('server config is set')

//=ROUTERS GO HERE





app.listen(8000)