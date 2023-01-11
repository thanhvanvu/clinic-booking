import { json } from 'body-parser'
import db from '../models/index'
import CRUDService from '../services/CRUDService'

const getHomePage = async (req, res) => {
  try {
    const usersData = await db.User.findAll() //User is a model in user.js
    return res.render('homepage.ejs', {
      data: JSON.stringify(usersData),
    })
  } catch (error) {
    console.log(error)
  }
}

const getCRUD = (req, res) => {
  return res.render('crud.ejs')
}

// need async-await because creating a new user need more time
const postCRUD = async (req, res) => {
  // send all the information from the client
  const message = await CRUDService.createNewUser(req.body)
  return res.send(message)
}

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
}
