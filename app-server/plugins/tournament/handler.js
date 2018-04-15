'use strict';

let funcs = {};
let Tournament = require('../../models/tournament');
funcs.createTeams = (request, reply)=>{
	let teams = []
	let totalTeams = request.payload.totalTeams;
	for(let i=0;i<totalTeams;i++){
		teams.push('A'+i+'Z');
	}

	Tournament.findById('5a3a2a396a12ab413a551633',function(err, tour){
		if(err) return reply({status:false, message:err});
		if(!tour){
			let tournament = new Tournament();
			tournament._id = '5a3a2a396a12ab413a551633',
			tournament.name = 'T '+(+new Date());
			tournament.teams = teams;
			tournament.save(function(err,t){
				if(err) return reply({status:false, message:err});
				return reply({status:true, message:'Teams are created'})
			})
		}
		else{
			tour.name = 'T '+(+new Date());
			tour.teams = teams;
			tour.save(function(err,t){
				if(err) return reply({status:false, message:err});
				return reply({status:true, message:'Teams are created'})
			})
		}
	})
}

funcs.getTeams = (request, reply) =>{
	Tournament.find({},function(err, tours){
		if(err) return reply({status:false, message:err});
		if(tours.length<1) return reply({status:false, message:'teams not found'});
		else return reply({status:true, data:tours[0].teams});
	})
}

funcs.updateMaxMatch = (request, reply) =>{
	Tournament.findByIdAndUpdate('5a3a2a396a12ab413a551633',{$set:{maxMatch:request.payload.maxMatch}},
		function(err, t){
			if(err) return reply({status:false, message:err});
			return reply({status:true, message:'Tournament is updated'})
	})
}

funcs.updateTournament = (request, reply) =>{
	let upObj = request.payload
	Tournament.findByIdAndUpdate('5a3a2a396a12ab413a551633',{$set:upObj},
	function(err,t){
		if(err) return reply({status:false, message:err});
		return reply({status:true, data:t});
	})
}

funcs.getTournament = (request, reply) =>{
	Tournament.findById('5a3a2a396a12ab413a551633',function(err,t){
		if(err) return reply({status:false, message:err});
		return reply({status:true, data:t});
	})
}

funcs.getResults = (request, reply)=>{
	Tournament.findById('5a3a2a396a12ab413a551633',function(err,t){
		if(err) return reply({status:false, message:err});
		return reply({status:true, data:{matches:t.matches, winner:t.tournamentWinner}})
	})
}



module.exports = funcs;