'use strict';

var _user = require('./routes/user');

var _level = require('./routes/level');

var routes = [];
routes = routes.concat(_user.userRoutes, _level.levelRoutes);

module.exports.routes = routes;