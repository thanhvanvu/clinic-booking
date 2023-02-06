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

const createNewUser = async (req, res) => {
  try {
    // 1. get information from the form
    const userInfomation = req.body

    // 2. send the data to service, and get the result
    const userData = await userService.handleCreateNewUser(userInfomation)

    // 6. send response
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

const editUser = async (req, res) => {
  try {
    // 1. get data from client
    const userData = req.body

    if (!userData.id) {
      return res.status(200).json({
        status: 'Fail',
        errCode: '1',
        message: 'Missing required parameters!',
      })
    }
    // 2. send data to service
    const message = await userService.editUserById(userData)

    return res.status(200).json({
      status: message.status,
      errCode: message.errCode,
      message: message.message,
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    // 1. req.body returns an object
    const userId = req.body.id

    // 2. check if id is exist?
    if (!userId) {
      return res.status(200).json({
        status: 'Fail',
        errCode: 1,
        message: 'Missing required parameters!',
      })
    }

    // 3. go to service to delete user
    const message = await userService.deleteUserById(userId)

    return res.status(200).json({
      status: message.status,
      errCode: message.errCode,
      message: message.message,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllCodes = async (req, res) => {
  try {
    // 1. get type from the url
    const codeType = req.query.type

    // 2. send type to service
    const response = await userService.handleGetAllCodes(codeType)

    return res.status(200).json({
      status: response.status,
      errCode: response.errCode,
      message: response.message,
      type: response.type,
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      status: 'Fail',
      errorCode: -1,
      message: 'Error from server',
    })
  }
}

module.exports = {
  login: login,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  createNewUser: createNewUser,
  editUser: editUser,
  deleteUser: deleteUser,
  getAllCodes: getAllCodes,
}
