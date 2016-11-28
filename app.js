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

// require routes
const registerRouter = require(__dirname + '/routes/register')
const loginRouter = require(__dirname + '/routes/login')
const logoutRouter = require(__dirname + '/routes/logout')
const indexRouter = require(__dirname + '/routes/index')
const profileRouter = require(__dirname + '/routes/profile')
const askhfRouter = require(__dirname + '/routes/askhf')
const givehfRouter = require(__dirname + '/routes/givehf')
const canhfgiveRouter = require(__dirname + '/routes/canhfgive')
const timerRouter = require(__dirname + '/routes/timer')
const successRouter = require(__dirname + '/routes/success')

// use routes
app.use('/', registerRouter)
app.use('/', loginRouter)
app.use('/', logoutRouter)
app.use('/', indexRouter)
app.use('/', profileRouter)
app.use('/', askhfRouter)
app.use('/', givehfRouter)
app.use('/', canhfgiveRouter)
app.use('/', timerRouter)
app.use('/', successRouter)


app.listen(8000)