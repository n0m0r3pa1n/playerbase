"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERVAL_DAY = exports.PRIVATE_AUTH_KEY = undefined;

var _extendable_error = require("./errors/extendable_error");

var _extendable_error2 = _interopRequireDefault(_extendable_error);

var _validation_error = require("./errors/validation_error");

var _validation_error2 = _interopRequireDefault(_validation_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.Joi = require("joi");
global.Boom = require("boom");
global._ = require("lodash");
global.co = require('co');

global.Mongoose = require('mongoose');
global.Schema = Mongoose.Schema;

global.ExtendableError = _extendable_error2.default;

global.ValidationError = _validation_error2.default;

var PRIVATE_AUTH_KEY = exports.PRIVATE_AUTH_KEY = "playerbase112#?!";
var INTERVAL_DAY = exports.INTERVAL_DAY = 60 * 60 * 24;