import { userRoutes } from './routes/user'

let routes = []
routes = routes.concat(userRoutes)

module.exports.routes = routes