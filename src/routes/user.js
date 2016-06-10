import  * as UserService from '../services/user'

export const userRoutes = [
    {
        method: "POST",
        path: "/users",
        handler: (req,reply) => {
            let { name, email } = req.payload;
            reply(UserService.createUser(name, email))
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                }
            },
            auth: false
        }
    },
    {
        method: "GET",
        path: "/users/{id}",
        handler: (req,reply) => {
            UserService.findUserById(req.params.id).then((res) => {
                if(res) {
                    reply(res);
                } else {
                    reply(Boom.badRequest(e));
                }
            })
        },
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            auth: "jwt"
        }
    }
];
