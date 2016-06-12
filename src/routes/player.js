import  * as PlayerService from '../services/player'

export const playerRoutes = [
    {
        method: "GET",
        path: "/players",
        handler: (req,reply) => {
            const { page, pageSize, sort } = req.query;
            reply(PlayerService.getPlayers(page, pageSize, sort))
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
    },
    {
        method: "GET",
        path: "/players/{identifier}",
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
            const { identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress, prestigeLevel } = req.payload;
            reply(yield PlayerService.createPlayer(identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress, prestigeLevel))
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
    }
];
