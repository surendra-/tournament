'use strict';

let timestamps = require('mongoose-timestamp');
let mongoose = require('mongoose');
let schema = mongoose.Schema;

let tournamentSchema = schema({
	name:String,
	teams: Array,
	maxMatch:Number,
	matches:[
		{
			winner:String,
			loser:String
		}
	],
	tournamentWinner:String
});


tournamentSchema.plugin(timestamps);

module.exports = mongoose.model('Tournament', tournamentSchema);