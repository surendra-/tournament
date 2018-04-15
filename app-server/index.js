'use strict';

const Hapi = require('hapi');
const init = require('./configs/db');
const Vision = require('vision');
const Inert = require('inert');
var path = require('path');
const HapiSwagger = require('hapi-swagger');
const server = new Hapi.Server();
server.connection({ port: 8080,routes: {cors: true}});



server.register(require('vision'),function(err){
    if(err) throw err

    server.route({
        method: 'GET',
        path: '/',
        config: {
          handler: function(request, reply) {
            return reply({status:true});
          }
        }
    });
    
});

server.register([
    Inert,
    {
        register: require('hapi-swagger'),
        options: {
               info:{   
                        'title': 'API Documentation',
                        'version': '1.0.0'
                    }
        }
    },
    {register:require('./plugins/tournament')}
],(err)=>{
    init();
	server.start((err) => {
    if (err) {
        throw err;
	    }
	    console.log(`Server running at: ${server.info.uri}`);
	});
});
