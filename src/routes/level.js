import  * as LevelService from '../services/level'

export const levelRoutes = [
    {
        method: "GET",
        path: "/levels",
        handler: (req,reply) => {
            reply(LevelService.getLevels())
        },
        config: {
            auth: false
        }
    },
    {
        method: "POST",
        path: "/levels",
        handler: (req,reply) => {
            const { value, maximumPoints, status, description, fromTotal, toTotal, icon } = req.payload
            reply(LevelService.createLevel(value, maximumPoints, status, description, fromTotal, toTotal, icon))
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
    }
];
