"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerSchema = undefined;

var _level = require("./level");

var PlayerSchema = exports.PlayerSchema = new Schema({
    identifier: { type: String, unique: true, index: true },
    level: _level.LevelSchema,
    level_score: Number,
    level_progress: Number,
    total_score: Number,
    total_progress: Number,
    prestige_level: Number
});

var Player = Mongoose.model("Player", PlayerSchema);

exports.default = Player;