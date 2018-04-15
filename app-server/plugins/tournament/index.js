'use strict';

 let controller = require('./handler');
 let joi = require('joi');
 
exports.register = function (server, options, next) {
	
	server.route([
		{
		    method: 'POST',								
		    path: '/api/v1/create-teams',
		    config:{
		    	tags: ['api'],
		    	validate:{
		    		payload:{
		    			totalTeams:joi.number().required()
		    		}
		    	}
		    },
		    handler: controller.createTeams
		},
		{
		    method: 'GET',								
		    path: '/api/v1/get-teams',
		    config:{
		    	tags: ['api']
		    },
		    handler: controller.getTeams
		},
		{
		    method: 'PUT',								
		    path: '/api/v1/update-max-match',
		    config:{
		    	tags: ['api'],
		    	validate:{
		    		payload:{
		    			maxMatch: joi.number().required()
		    		}
		    	}
		    },
		    handler: controller.updateMaxMatch
		},
		{
		    method: 'GET',								
		    path: '/api/v1/tournament',
		    config:{
		    	tags: ['api']
		    },
		    handler: controller.getTournament
		},
		{
		    method: 'GET',								
		    path: '/api/v1/results',
		    config:{
		    	tags: ['api']
		    },
		    handler: controller.getResults
		},
		{
		    method: 'PUT',								
		    path: '/api/v1/tournament',
		    config:{
		    	tags: ['api']
		    },
		    handler: controller.updateTournament
		},
	]);
    next();
};

exports.register.attributes = {
    pkg:{"name": "tournament",
        "version": "0.0.1",
        "description": "tournament api ",
        "main": "index.js"
       }
};




