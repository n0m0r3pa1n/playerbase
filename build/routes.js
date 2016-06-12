'use strict';

var _user = require('./routes/user');

var _level = require('./routes/level');

var _player = require('./routes/player');

module.exports.routes = [].concat(_user.userRoutes, _level.levelRoutes, _player.playerRoutes);;