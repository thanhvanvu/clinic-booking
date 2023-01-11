import { json } from 'body-parser'
import db from '../models/index'
import CRUDService from '../services/CRUDService'

const getHomePage = async (req, res) => {
  try {
    const usersData = await db.User.findAll() //User is a model in user.js

    // send data to views
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
  // get data back and save into message
  const message = await CRUDService.createNewUser(req.body)
  return res.send(message)
}

const displayGetCRUD = async (req, res) => {
  try {
    const usersData = await CRUDService.getAllUser()
    console.log(usersData)

    // send data to views
    return res.render('userInformation.ejs', {
      dataTable: usersData,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
}
