const Hapi = require('hapi'),
    mongoose = require('mongoose'),
    Hoek = require('hoek'),
    Path = require('path'),
    Blipp = require('blipp'), // module display all router
    Good = require('good'),
    _ = require('lodash'); // log request

const config = require('./config');

const server = new Hapi.Server();

server.connection({ port: 4000, host: 'localhost' });

global.Vue = require('vue');
var layout = fs.readFileSync('./views/index.html', 'utf8');


var routes = require('./routes/app');



server.register([require('vision'), require('inert'), {
    register: require('hapi-bodyparser'),
    options: {
        parser: { allowDots: true, strictNullHandling: true },
        // sanitizer: { 
        //     trim: true, 
        //     stripNullorEmpty: true  
        // }, 
        merge: false,
        body: false
    }
}], (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            html: {
                compile: function (template) {

                    Mustache.parse(template);

                    return function (context) {

                        return Mustache.render(template, context);
                    };
                }
            }
        },
        // relativeTo: __dirname,
        path: './views'
    });





    server.route([
        {
            method: 'GET',
            path: '/public/{param*}',

            handler: {
                directory: {
                    path: './public'
                }
            }
        },
        {
            method: 'GET',
            path: '/www/{param*}',

            handler: {
                directory: {
                    path: './www'
                }
            }
        },
        ...routes
    ]);


});


server.register([
    {
        register: Blipp,
    }
    , {
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }], (err) => {

        server.start((err) => {
            if (err) {
                throw err;
            }
            // Create a new Mongoose connection instance
            mongoose.Promise = global.Promise;
            global.db = mongoose.connect(config.db, { promiseLibrary: global.Promise, useMongoClient: true });
            console.log(`Server running at: ${server.info.uri}`);
        });

    });

module.exports = server;


