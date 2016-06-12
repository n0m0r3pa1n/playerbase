'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createLevel = createLevel;
exports.getLevels = getLevels;

var _level = require('../models/level');

var _level2 = _interopRequireDefault(_level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createLevel(value, maximum_points, status, description, from_total, to_total, icon) {
    return _level2.default.create({
        value,
        maximum_points,
        status,
        description,
        from_total,
        to_total,
        icon
    });
}

function getLevels() {
    return _level2.default.find({});
}