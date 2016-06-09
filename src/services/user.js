import { User } from '../models/user'
import { generateToken } from './authentication'

export function createUser(name, email) {
    return User.findOneOrCreate({ email: email }, { name, email })
        .then((user) => {
            user = user.toObject();
            user.token = generateToken(user._id);

            return user;
        })
}

export function findUserById(id) {
    return User.findOne({ _id: id })
}