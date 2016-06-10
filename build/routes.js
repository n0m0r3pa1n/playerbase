'use strict';

var _user = require('./routes/user');

var routes = [];
routes = routes.concat(_user.userRoutes);

module.exports.routes = routes;