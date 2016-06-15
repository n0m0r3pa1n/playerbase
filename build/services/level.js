"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createLevel = createLevel;
exports.getLevels = getLevels;
exports.getTotalScore = getTotalScore;
exports.findLevelByValue = findLevelByValue;
exports.findLevelWithTotal = findLevelWithTotal;
exports.getLastLevel = getLastLevel;
exports.getFirstLevel = getFirstLevel;

var _level = require("../models/level");

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

function getTotalScore() {
    return _level2.default.aggregate([{ $group: { _id: null, totalScore: { $sum: "$maximumPoints" } } }]).exec();
}

function findLevelByValue(value) {
    return _level2.default.findOne({ value });
}

function findLevelWithTotal(total) {
    return _level2.default.findOne({ fromTotal: { $lte: total }, toTotal: { $gte: total } });
}

function getLastLevel() {
    return _level2.default.find({}).sort({ fromTotal: -1 }).limit(1).then(function (data) {
        return data[0];
    });
}

function getFirstLevel() {
    return _level2.default.find({}).sort({ fromTotal: 1 }).limit(1).then(function (data) {
        return data[0];
    });
}