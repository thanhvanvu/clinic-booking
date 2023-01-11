import bcrypt from 'bcryptjs'
import db from '../models/index'

const salt = bcrypt.genSaltSync(10)

const createNewUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
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

module.exports = {
  createNewUser: createNewUser,
}
