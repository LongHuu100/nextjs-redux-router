const APP_ROUTES = require('../app.router');
const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

const ROUTES = APP_ROUTES.name;
ROUTES.forEach(route => routes.add(route))
