"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LevelSchema = exports.LevelSchema = new Schema({
    value: { type: Number, required: true },
    fromTotal: { type: Number, required: true },
    toTotal: { type: Number, required: true },
    maximumPoints: { type: Number, required: true },
    status: String,
    description: String,
    icon: String
});

var Level = Mongoose.model("Level", LevelSchema);

exports.default = Level;