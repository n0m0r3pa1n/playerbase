import { userRoutes } from './routes/user'
import { levelRoutes } from './routes/level'
import { playerRoutes } from './routes/player'

module.exports.routes = [].concat(userRoutes, levelRoutes, playerRoutes);;