import { json } from 'body-parser'
import e from 'express'
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
    // console.log(usersData)

    // send data to views
    return res.render('userInformation.ejs', {
      dataTable: usersData,
    })
  } catch (error) {
    console.log(error)
  }
}

const editCRUD = async (req, res) => {
  try {
    // use query to get the parameter from the url
    const userId = req.query.id

    // check if url has id or not
    if (userId) {
      // get user info by id
      const userData = await CRUDService.getUserInfoById(userId)
      // console.log(userData)

      // send data to views
      return res.render('editCrud.ejs', {
        data: userData,
      })
    } else {
      return res.send('User not found')
    }
  } catch (error) {
    console.log(error)
  }
}

const editPutCRUD = async (req, res) => {
  const userData = req.body
  const allUpdatedUsers = await CRUDService.updaterUserData(userData)

  // update the userInformation page
  return res.render('userInformation.ejs', {
    dataTable: allUpdatedUsers,
  })
}

const deletePutCRUD = async (req, res) => {
  // use query to get the parameter from the url
  const userId = req.query.id

  if (userId) {
    const allUpdatedUsers = await CRUDService.deleteUserById(userId)

    return res.render('userInformation.ejs', {
      dataTable: allUpdatedUsers,
    })
  } else {
    return res.send('user not found')
  }
}

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  editCRUD: editCRUD,
  editPutCRUD: editPutCRUD,
  deletePutCRUD: deletePutCRUD,
}
