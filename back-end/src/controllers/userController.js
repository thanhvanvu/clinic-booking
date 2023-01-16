import userService from '../services/userService'

const login = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(500).json({
        errorCode: 1,
        message: 'Missing inputs parameter!',
      })
    }

    // find user and compare password
    const userData = await userService.handleUserLogin(email, password)

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

module.exports = {
  login: login,
}
