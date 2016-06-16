import  * as PlayerService from '../services/player'

export const playerRoutes = [
    {
        method: "GET",
        path: "/players",
        handler: (req,reply) => {
            const { page, pageSize, sortBy, sortDirection } = req.query;
            reply(PlayerService.getPlayers(page, pageSize, sortBy, sortDirection))
        },
        config: {
            validate: {
                query: {
                    page: Joi.number().optional(),
                    pageSize: Joi.number().optional(),
                    sortBy: Joi.string().optional(),
                    sortDirection: Joi.string().optional()
                }
            },
            auth: false
        }
    },
    {
        method: "GET",
        path: "/players/{id}",
        handler: (req,reply) => {
            reply(PlayerService.getPlayer(req.param.id))
        },
        config: {
            validate: {
                params: {
                    identifier: Joi.string().required()
                }
            },
            auth: false
        }
    },
    {
        method: "POST",
        path: "/players",
        handler: function* (req,reply) {
            const { identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress } = req.payload;
            try {
                const player = yield PlayerService.createPlayer(identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress);
                reply(player)
            } catch (e) {
                reply(Boom.badRequest(e.message));
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
                    totalProgress: Joi.number().required()
                }
            },
            auth: AUTH
        }
    },
    {
        method: "POST",
        path: "/players/{id}/points/actions/increase",
        handler: function* (req,reply) {
            try {
                reply(yield PlayerService.increasePoints(req.params.id, req.payload.points));
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
                    points: Joi.number().min(1).required()
                }
            },
            auth: AUTH
        }
    },
    {
        method: "POST",
        path: "/players/{id}/points/actions/decrease",
        handler: function* (req,reply) {
            try {
                reply(yield PlayerService.decreasePoints(req.params.id, req.payload.points));
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
                    points: Joi.number().min(1).required()
                }
            },
            auth: AUTH
        }
    }
];
