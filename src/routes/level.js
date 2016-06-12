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
            const { value, maximum_points, status, description, from_total, to_total, icon } = req.payload
            reply(LevelService.createLevel(value, maximum_points, status, description, from_total, to_total, icon))
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
    }
];
