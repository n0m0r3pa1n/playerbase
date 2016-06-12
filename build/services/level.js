'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createLevel = createLevel;
exports.getLevels = getLevels;
exports.findLevelByValue = findLevelByValue;

var _level = require('../models/level');

var _level2 = _interopRequireDefault(_level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createLevel(value, maximumPoints, status, description, fromTotal, toTotal, icon) {
    return _level2.default.create({
        value,
        maximumPoints,
        status,
        description,
        fromTotal,
        toTotal,
        icon
    });
}

function getLevels() {
    return _level2.default.find({});
}

function findLevelByValue(value) {
    return _level2.default.findOne({ value });
}