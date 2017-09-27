const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('homepage', '/', 'index')
routes.add('post', '/pokemon/:id', 'post')
