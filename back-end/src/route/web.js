import express from 'express'
import homeControllers from '../controllers/homeControllers'

let Router = express.Router()

let initWebRoutes = (app) => {
  Router.route('/').get(homeControllers.getHomePage)

  Router.route('/crud').get(homeControllers.getCRUD)

  Router.route('/post-crud').post(homeControllers.postCRUD)

  Router.route('/get-crud').get(homeControllers.displayGetCRUD)

  return app.use('/', Router)
}

module.exports = initWebRoutes
