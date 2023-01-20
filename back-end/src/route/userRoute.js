import express from 'express'
import db from '../models/index'
import userController from '../controllers/userController'

const Router = express.Router()

let userRoutes = (app) => {
  Router.route('/api/login').post(userController.login)

  Router.route('/api/get-all-users').get(userController.getAllUsers)

  Router.route('/api/get-one-user').get(userController.getOneUser)

  return app.use('/', Router)
}

module.exports = userRoutes
