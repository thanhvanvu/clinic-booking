import express from 'express'
import db from '../models/index'
import userController from '../controllers/userController'

const Router = express.Router()

let userRoutes = (app) => {
  Router.route('/api/login').post(userController.login)

  Router.route('/api/get-all-users').get(userController.getAllUsers)

  Router.route('/api/get-one-user').get(userController.getOneUser)

  Router.route('/api/create-new-user').post(userController.createNewUser)

  Router.route('/api/edit-user').put(userController.editUser)

  Router.route('/api/delete-user').delete(userController.deleteUser)

  return app.use('/', Router)
}

module.exports = userRoutes
