import express from 'express'
import homeControllers from '../controllers/homeControllers'

let Router = express.Router()

let initWebRoutes = (app) => {
  Router.route('/').get(homeControllers.getHomePage)

  return app.use('/', Router)
}

module.exports = initWebRoutes
