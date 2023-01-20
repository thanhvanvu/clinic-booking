import userService from '../services/userService'

const login = async (req, res) => {
  try {
    // 1. get email, password from the client
    const email = req.body.email
    const password = req.body.password

    // 2. check if not email, pw
    if (!email || !password) {
      return res.status(500).json({
        errorCode: 1,
        message: 'Missing inputs parameter!',
      })
    }

    // 3. find user and compare password
    const userData = await userService.handleUserLogin(email, password)

    // 8. Response data
    return res.status(200).json({
      status: userData.status,
      errCode: userData.errCode,
      message: userData.message,
      user: userData.user ? userData.user : {},
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const usersData = await userService.handleGetAllUsers()

    return res.status(200).json({
      status: 'Success',
      errCode: 0,
      message: 'OK',
      results: usersData.length,
      usersData: usersData,
    })
  } catch (error) {
    console.log(error)
  }
}

const getOneUser = async (req, res) => {
  try {
    const userId = req.body.id
    const userData = await userService.handleGetOneUser(userId)

    return res.status(200).json({
      status: userData.status,
      errCode: userData.errCode,
      message: userData.message,
      user: userData.user,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  login: login,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
}
