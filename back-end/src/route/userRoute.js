import express from 'express'
import db from '../models/index'
import userController from '../controllers/userController'

const Router = express.Router()

let userRoutes = (app) => {
  // Router.route('/').get(homeControllers.getHomePage)
  Router.route('/api/login').post(userController.login)
  return app.use('/', Router)
}

module.exports = userRoutes
