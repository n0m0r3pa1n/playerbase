import { userRoutes } from './routes/user'
import { levelRoutes } from './routes/level'

let routes = [];
routes = routes.concat(userRoutes, levelRoutes);

module.exports.routes = routes;