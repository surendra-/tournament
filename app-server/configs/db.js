'use strict';

let mongoose = require('mongoose');
// Load the db connection and env config
let init = () => {
  	let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/darwinbox'
  	mongoose.Promise = global.Promise;
  	mongoose.connect(MONGO_URI, {useMongoClient:true});

  	let db = mongoose.connection

  	db.on('error', console.error.bind(console, 'database connection error'));  
  	db.once('open', function callback() {  
    	console.log("Connection with database succeeded.");
	});
};

module.exports = init;

