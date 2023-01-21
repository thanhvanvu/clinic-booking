import axios from '../axios'

const handleLoginApi = (username, password) => {
  // key email, password must be the same from backend side
  const userData = {
    email: username,
    password: password,
  }

  const options = {
    method: 'post',
    url: '/api/login',
    data: userData,
  }

  return axios(options)
}

const getAllUsers = async () => {
  try {
    const options = {
      method: 'get',
      url: '/api/get-all-users',
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}
export { handleLoginApi, getAllUsers }
