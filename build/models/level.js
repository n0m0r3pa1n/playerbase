"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LevelSchema = exports.LevelSchema = new Schema({
    value: { type: Number, required: true },
    maximum_points: { type: Number, required: true },
    status: String,
    description: String,
    from_total: { type: Number, required: true },
    to_total: { type: Number, required: true },
    icon: String
});

var Level = Mongoose.model("Level", LevelSchema);

exports.default = Level;