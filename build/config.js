"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
global.Joi = require("joi");
global.Boom = require("boom");
global._ = require("lodash");
global.co = require('co');

global.Mongoose = require('mongoose');
global.Schema = Mongoose.Schema;

var PRIVATE_AUTH_KEY = exports.PRIVATE_AUTH_KEY = "playerbase112#?!";
var INTERVAL_DAY = exports.INTERVAL_DAY = 60 * 60 * 24;