"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.playerRoutes = undefined;

var _player = require("../services/player");

var PlayerService = _interopRequireWildcard(_player);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var playerRoutes = exports.playerRoutes = [{
    method: "GET",
    path: "/players",
    handler: function handler(req, reply) {
        var _req$query = req.query;
        var page = _req$query.page;
        var pageSize = _req$query.pageSize;
        var sort = _req$query.sort;

        reply(PlayerService.getPlayers(page, pageSize, sort));
    },
    config: {
        validate: {
            query: {
                page: Joi.number().optional(),
                pageSize: Joi.number().optional(),
                sort: Joi.string().optional()
            }
        },
        auth: false
    }
}, {
    method: "GET",
    path: "/players/{id}",
    handler: function handler(req, reply) {
        reply(PlayerService.getPlayer(req.param.id));
    },
    config: {
        validate: {
            params: {
                identifier: Joi.string().required()
            }
        },
        auth: false
    }
}, {
    method: "POST",
    path: "/players",
    handler: function* handler(req, reply) {
        var _req$payload = req.payload;
        var identifier = _req$payload.identifier;
        var levelValue = _req$payload.levelValue;
        var levelScore = _req$payload.levelScore;
        var levelProgress = _req$payload.levelProgress;
        var totalScore = _req$payload.totalScore;
        var totalProgress = _req$payload.totalProgress;
        var prestigeLevel = _req$payload.prestigeLevel;

        try {
            var player = yield PlayerService.createPlayer(identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress, prestigeLevel);
            reply(player);
        } catch (e) {
            reply(e);
        }
    },
    config: {
        validate: {
            payload: {
                identifier: Joi.string().required(),
                levelValue: Joi.number().required(),
                levelScore: Joi.number().required(),
                levelProgress: Joi.number().required(),
                totalScore: Joi.number().required(),
                totalProgress: Joi.number().required(),
                prestigeLevel: Joi.number().required()
            }
        },
        auth: 'jwt'
    }
}, {
    method: "POST",
    path: "/players/{id}/points/actions/increase",
    handler: function* handler(req, reply) {
        try {
            reply((yield PlayerService.increasePoints(req.params.id, req.payload.points)));
        } catch (e) {
            reply(Boom.badRequest(e.message));
        }
    },
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: {
                points: Joi.number().required()
            }
        },
        auth: 'jwt'
    }
}, {
    method: "POST",
    path: "/players/{id}/points/actions/decrease",
    handler: function* handler(req, reply) {
        try {
            reply((yield PlayerService.decreasePoints(req.params.id, req.payload.points)));
        } catch (e) {
            reply(Boom.badRequest(e.message));
        }
    },
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: {
                points: Joi.number().required()
            }
        },
        auth: 'jwt'
    }
}];