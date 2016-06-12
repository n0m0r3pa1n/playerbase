"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.levelRoutes = undefined;

var _level = require("../services/level");

var LevelService = _interopRequireWildcard(_level);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var levelRoutes = exports.levelRoutes = [{
    method: "GET",
    path: "/levels",
    handler: function handler(req, reply) {
        reply(LevelService.getLevels());
    },
    config: {
        auth: false
    }
}, {
    method: "POST",
    path: "/levels",
    handler: function handler(req, reply) {
        var _req$payload = req.payload;
        var value = _req$payload.value;
        var maximum_points = _req$payload.maximum_points;
        var status = _req$payload.status;
        var description = _req$payload.description;
        var from_total = _req$payload.from_total;
        var to_total = _req$payload.to_total;
        var icon = _req$payload.icon;

        reply(LevelService.createLevel(value, maximum_points, status, description, from_total, to_total, icon));
    },
    config: {
        validate: {
            payload: {
                value: Joi.number().required(),
                maximum_points: Joi.number().required(),
                status: Joi.string().required(),
                description: Joi.string().required(),
                from_total: Joi.number().required(),
                to_total: Joi.number().required(),
                icon: Joi.string().required()
            }
        },
        auth: 'jwt'
    }
}];