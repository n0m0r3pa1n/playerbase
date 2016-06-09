'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = validate;
exports.generateToken = generateToken;

var _user = require('./user');

var _config = require('../config');

var jwt = require("jsonwebtoken");
function validate(decoded, request, callback) {
    (0, _user.findUserById)(decoded.userId).then(function (user) {
        if (_.isEmpty(user)) {
            callback(null, false, {});
        } else {
            callback(null, true, { user: user });
        }
    });
}

function generateToken(userId) {
    return jwt.sign({ userId }, _config.PRIVATE_AUTH_KEY, { expiresIn: _config.INTERVAL_DAY });
}