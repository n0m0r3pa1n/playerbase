"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userRoutes = undefined;

var _user = require("../services/user");

var UserService = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var userRoutes = exports.userRoutes = [{
    method: "POST",
    path: "/users",
    handler: function handler(req, reply) {
        var _req$payload = req.payload;
        var name = _req$payload.name;
        var email = _req$payload.email;

        reply(UserService.createUser(name, email));
    },
    config: {
        validate: {
            payload: {
                name: Joi.string().required(),
                email: Joi.string().email().required()
            }
        },
        auth: false
    }
}, {
    method: "GET",
    path: "/users/{id}",
    handler: function handler(req, reply) {
        UserService.findUserById(req.params.id).then(function (res) {
            if (res) {
                reply(res);
            } else {
                reply(Boom.badRequest(e));
            }
        });
    },
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        auth: AUTH
    }
}];