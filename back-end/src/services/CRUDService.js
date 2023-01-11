import bcrypt from 'bcryptjs'
import db from '../models/index'

const salt = bcrypt.genSaltSync(10)

// function to hash password
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // need to wait to hash the password
      const hashPassword = await bcrypt.hashSync(password, salt)

      // resolve same as return
      resolve(hashPassword)
    } catch (error) {
      reject(error)
    }
  })
}

// function to create a new user
const createNewUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // call function to hash a password
      const hashPasswordFromBcrypt = await hashUserPassword(userData.password)

      // create user. User is a model name
      await db.User.create({
        email: userData.email,
        password: hashPasswordFromBcrypt,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        gender: userData.gender === '1' ? true : false,
        roleId: userData.roleId,
        positionId: userData.positionId,
        image: userData.image,
      })
      resolve('User has been created successfully')
    } catch (error) {
      reject(error)
    }
  })
}

// Function get all users from the database
const getAllUser = async () => {
  try {
    const users = await db.User.findAll({
      raw: true,
    })

    return users
  } catch (error) {
    console.log(error)
  }
}

// Function to get the user by ID
const getUserInfoById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

// Function to update user infomation
const updaterUserData = async (userData) => {
  try {
    const user = await db.User.findOne({
      where: { id: userData.id },
    })

    if (user) {
      user.set({
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
      })

      // save updated user into database
      await user.save()

      const allUpdatedUsers = await db.User.findAll({
        raw: true,
      })

      return allUpdatedUsers
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updaterUserData: updaterUserData,
}
