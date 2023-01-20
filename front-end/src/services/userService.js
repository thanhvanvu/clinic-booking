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

export { handleLoginApi }
