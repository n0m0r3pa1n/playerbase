"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerSchema = undefined;

var _level = require("./level");

var PlayerSchema = exports.PlayerSchema = new Schema({
    identifier: { type: String, unique: true, index: true },
    level: _level.LevelSchema,
    levelScore: Number,
    levelProgress: Number,
    totalScore: Number,
    totalProgress: Number,
    prestigeLevel: Number
});

var Player = Mongoose.model("Player", PlayerSchema);

exports.default = Player;