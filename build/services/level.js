'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUser = createUser;
exports.findUserById = findUserById;

var _models = require('../models/');

var _authentication = require('./authentication');

function createUser(name, email) {
    return _models.User.findOneOrCreate({ email: email }, { name, email }).then(function (user) {
        user = user.toObject();
        user.token = (0, _authentication.generateToken)(user._id);

        return user;
    });
}

function findUserById(id) {
    return _models.User.findOne({ _id: id });
}