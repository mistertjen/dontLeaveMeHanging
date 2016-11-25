// require sequelize
const Sequelize = require('sequelize')

// connect to database dontleavemehanging
let db = new Sequelize('dontleavemehanging', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})

// create model for tables users, HFAsk, HFGive
let User = db.define('user', {
	// say name has to be unique in this table for login purposes
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING, 
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	paranoid: true
})

let HFAsk = db.define('hfask', {
	location: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	paranoid: true
})

let HFGive = db.define('hfgive', {
	location: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	paranoid: true
})

// define relations
User.hasMany(HFAsk)
HFAsk.belongsTo(User)
User.hasMany(HFGive)
HFGive.belongsTo(User)
// foreign key gets placed on HFAsk, so when it doesn't have one, it isn't answered yet 
HFGive.hasOne(HFAsk)
HFAsk.belongsTo(HFGive)

// {force: true}: so all tables in db are deleted
db.sync({force:true}).then(() => {
	console.log("Database synced")
	//test data
	User.create({
		name: "Freddie Mercury",
		email: "bohemian@rhapsody.com",
		password: "dontstopmenow",
		hfasks: [{
			location: "Barcelona"
		}] 
	}, 
		// option object
		{
		include: [HFAsk]
	})
	User.create({
		name: "Timothy Blob",
		email: "xxx@rhapsody.com",
		password: "skalmlamk",
		hfgives: [{
			location: "Amsterdam"
		}] 
	}, 
		// option object
		{
		include: [HFGive]
	})
})

// by requiring database.js the code runs one time, by sending User, HFAsk, HFGive in an object you can access and create a user and high fives in routes
// for example: db.User.create
module.exports = {User:User, HFAsk:HFAsk, HFGive:HFGive}

