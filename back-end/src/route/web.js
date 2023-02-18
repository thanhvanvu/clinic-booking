import express from 'express'
import homeControllers from '../controllers/homeControllers'
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController'

let Router = express.Router()

let initWebRoutes = (app) => {
  Router.route('/').get(homeControllers.getHomePage)

  Router.route('/crud').get(homeControllers.getCRUD)

  Router.route('/post-crud').post(homeControllers.postCRUD)

  Router.route('/get-crud').get(homeControllers.displayGetCRUD)

  Router.route('/edit-crud').get(homeControllers.editCRUD)

  Router.route('/put-crud').post(homeControllers.editPutCRUD)

  Router.route('/delete-crud').get(homeControllers.deletePutCRUD)

  Router.route('/api/top-doctor-home').get(doctorController.getTopDoctorHome)

  return app.use('/', Router)
}

module.exports = initWebRoutes
