import e from 'express'
import db from '../models/index'
const bcrypt = require('bcryptjs')

const handleUserLogin = async (email, password) => {
  try {
    const userData = {}

    // find user in database
    const isUserExist = await checkUserEmail(email)

    if (isUserExist) {
      // find user in database
      let user = await db.User.findOne({
        attributes: ['email', 'roleId', 'password'],
        where: { email: email },
        raw: true, // nice data
      })

      if (user) {
        //compare password
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)

        if (isPasswordCorrect) {
          userData.status = 'Success'
          userData.errCode = 0
          userData.message = 'OK!'
          delete user.password // remove password attribute
          userData.user = user
        } else {
          // return error if password is incorrect
          userData.status = 'Fail'
          userData.errCode = 3
          userData.message = 'Your password is not correct!'
        }
      } else {
        // return error if user not found
        userData.status = 'Fail'
        userData.errCode = 2
        userData.message = 'User not found!'
      }
    } else {
      // return error if email incorrect
      userData.status = 'Fail'
      userData.errCode = 1
      userData.message = 'Your email is not correct!'
    }

    return userData
  } catch (error) {
    console.log(error)
  }
}

const checkUserEmail = async (userEmail) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: userEmail,
      },
    })

    if (user) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
}
