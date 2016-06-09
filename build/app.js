'use strict';

var _config = require('./config');

var _authentication = require('./services/authentication');

var Hapi = require('hapi');
var co = require('co');
var Mongoose = require('mongoose');
var routes = require('./routes').routes;

var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/playerbase';
Mongoose.connect(dbURI);

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require("hapi-auth-jwt2"), function (err) {
    server.auth.strategy("jwt", "jwt", {
        key: _config.PRIVATE_AUTH_KEY,
        validateFunc: _authentication.validate,
        verifyOptions: {
            ignoreExpiration: false,
            algorithms: ["HS256"]
        }
    });

    return server.auth["default"]("jwt");
});

routes.forEach(function (route) {
    route.handler = co.wrap(route.handler);
});
server.route(routes);

server.start(function (err) {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

module.exports.server = server;