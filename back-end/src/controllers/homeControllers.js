// Connect to DB
import { json } from 'body-parser'
import db from '../models/index'

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

module.exports = {
  getHomePage: getHomePage,
}
