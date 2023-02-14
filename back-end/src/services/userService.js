import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

const handleUserLogin = async (email, password) => {
  try {
    const userData = {}

    // 4. find user in database
    const isUserExist = await checkUserEmail(email)

    if (isUserExist) {
      // 6. find 1 user in database
      let user = await db.User.findOne({
        attributes: ['email', 'firstName', 'lastName', 'roleId', 'password'],
        where: { email: email },
        raw: true, // nice data
      })

      if (user) {
        // 7. Compare password
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
    // 5. fine 1 user in database
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

const handleGetAllUsers = async () => {
  try {
    const usersData = await db.User.findAll({
      raw: true,
    })
    return usersData
  } catch (error) {
    console.log(error)
  }
}

const handleGetOneUser = async (userId) => {
  try {
    const userData = {}

    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    })

    if (user) {
      userData.status = 'Success'
      userData.errCode = 0
      userData.message = 'OK'
      delete user.password // remove password attribute
      userData.user = user
    } else {
      userData.status = 'Fail'
      userData.errCode = 1
      userData.message = 'User not found'
    }

    return userData
  } catch (error) {
    console.log(error)
  }
}

const handleCreateNewUser = async (userInfomation) => {
  try {
    // 3. check if email is exist or not?
    const isEmailExist = await checkUserEmail(userInfomation.email)

    if (isEmailExist === false) {
      // 4. hash the password from the client
      const hashedPassword = await hashUserPassword(userInfomation.password)

      // 5. create the new user
      const user = await db.User.create({
        email: userInfomation.email,
        password: hashedPassword,
        firstName: userInfomation.firstName,
        lastName: userInfomation.lastName,
        address: userInfomation.address,
        phoneNumber: userInfomation.phoneNumber,
        gender: userInfomation.gender,
        roleId: userInfomation.roleId,
        positionId: userInfomation.positionId,
        image: userInfomation.image,
      })

      return {
        status: 'Success',
        errCode: 0,
        message: 'User created successfully!',
        user,
      }
    } else {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Your email is already used!',
        user: {},
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const hashUserPassword = async (userPassword) => {
  try {
    // 4. hash the password
    const hashedPassword = await bcrypt.hashSync(userPassword, salt)

    return hashedPassword
  } catch (error) {
    console.log(error)
  }
}

const deleteUserById = async (userID) => {
  try {
    // 4. find the user by id first
    const user = await db.User.findOne({
      where: { id: userID },
    })

    // 5. delete user
    if (user) {
      await user.destroy()

      return {
        status: 'Success',
        errCode: 0,
        message: 'User deleted successfully',
      }
    } else {
      return {
        status: 'Fail',
        errCode: 2,
        message: 'User not found',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const editUserById = async (userData) => {
  try {
    // 3. find the user in database
    const user = await db.User.findOne({
      where: { id: userData.id },
    })

    // 4. update user
    if (user) {
      await user.set({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        gender: userData.gender === '1' ? true : false,
        roleId: userData.roleId,
        positionId: userData.positionId,
        image: userData.image,
      })

      await user.save()

      return {
        status: 'Success',
        errCode: 0,
        message: 'User Updated Successfully!',
      }
    } else {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'User not found!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetAllCodes = async (codeType) => {
  try {
    // 3. check if codeType is exist
    if (!codeType) {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Missing code types',
      }
    } else {
      if (codeType === 'all') {
        const type = await db.Allcode.findAll()
        return {
          status: 'Success',
          errCode: 0,
          message: 'OK',
          type: type,
        }
      }
      const type = await db.Allcode.findAll({
        raw: true,
        where: { type: codeType },
      })
      return {
        status: 'Success',
        errCode: 0,
        message: 'OK',
        type: type,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  handleGetAllUsers: handleGetAllUsers,
  handleGetOneUser: handleGetOneUser,
  handleCreateNewUser: handleCreateNewUser,
  deleteUserById: deleteUserById,
  editUserById: editUserById,
  handleGetAllCodes: handleGetAllCodes,
}
