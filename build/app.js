'use strict';

const Hapi = require('hapi');
const co = require('co');
const Mongoose = require('mongoose');
const routes = require('./routes').routes;

import { PRIVATE_AUTH_KEY } from './config';
import { validate } from './services/authentication';

var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/playerbase';
Mongoose.connect(dbURI);

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require("hapi-auth-jwt2"), function (err) {
    server.auth.strategy("jwt", "jwt", {
        key: PRIVATE_AUTH_KEY,
        validateFunc: validate,
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

server.start(err => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

module.exports.server = server;