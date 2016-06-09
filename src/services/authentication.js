const jwt = require("jsonwebtoken")
import { findUserById } from './user'
import { PRIVATE_AUTH_KEY, INTERVAL_DAY } from '../config'

export function validate(decoded, request, callback) {
    findUserById(decoded.userId)
        .then((user) => {
            if(_.isEmpty(user)) {
                callback(null, false, {})
            } else {
                callback(null, true, { user: user })
            }
        });
}

export function generateToken(userId) {
    return jwt.sign({ userId }, PRIVATE_AUTH_KEY, { expiresIn: INTERVAL_DAY });
}