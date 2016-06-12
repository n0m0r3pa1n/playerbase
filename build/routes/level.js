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
        var maximumPoints = _req$payload.maximumPoints;
        var status = _req$payload.status;
        var description = _req$payload.description;
        var fromTotal = _req$payload.fromTotal;
        var toTotal = _req$payload.toTotal;
        var icon = _req$payload.icon;

        reply(LevelService.createLevel(value, maximumPoints, status, description, fromTotal, toTotal, icon));
    },
    config: {
        validate: {
            payload: {
                value: Joi.number().required(),
                maximumPoints: Joi.number().required(),
                status: Joi.string().required(),
                description: Joi.string().required(),
                fromTotal: Joi.number().required(),
                toTotal: Joi.number().required(),
                icon: Joi.string().required()
            }
        },
        auth: 'jwt'
    }
}];