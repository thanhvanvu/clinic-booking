import express from 'express'
import homeControllers from '../controllers/homeControllers'

let Router = express.Router()

let initWebRoutes = (app) => {
  Router.route('/').get(homeControllers.getHomePage)

  Router.route('/crud').get(homeControllers.getCRUD)

  Router.route('/post-crud').post(homeControllers.postCRUD)

  Router.route('/get-crud').get(homeControllers.displayGetCRUD)

  Router.route('/edit-crud').get(homeControllers.editCRUD)

  Router.route('/put-crud').post(homeControllers.editPutCRUD)

  Router.route('/delete-crud').get(homeControllers.deletePutCRUD)

  return app.use('/', Router)
}

module.exports = initWebRoutes
