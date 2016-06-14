const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
global.cache = myCache;

global.Joi = require("joi");
global.Boom = require("boom");
global._ = require("lodash");
global.co = require('co');

global.Promise = require('bluebird')
global.Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
global.Schema = Mongoose.Schema;


import ExtendableError from './errors/extendable_error';
global.ExtendableError = ExtendableError;
import ValidationError from './errors/validation_error'
global.ValidationError = ValidationError;

export const PRIVATE_AUTH_KEY = "playerbase112#?!";
export const INTERVAL_DAY = 60 * 60 * 24;
