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
    // 2. create options
    const options = {
      method: 'get',
      url: '/api/get-all-users',
    }

    // 3. call api
    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleAddUserApi = async (userInfo) => {
  try {
    // 4. create an option
    const option = {
      method: 'post',
      url: '/api/create-new-user',
      data: userInfo,
    }

    // 5. call API
    return await axios(option)
  } catch (error) {
    console.log(error)
  }
}

const handleEditUserApi = async (userInfo) => {
  try {
    // 4. create an option
    const option = {
      method: 'put',
      url: '/api/edit-user',
      data: userInfo,
    }

    // 5. call API
    return await axios(option)
  } catch (error) {
    console.log(error)
  }
}

const handleDeleteUser = async (userId) => {
  try {
    // 3. create an option
    const options = {
      method: 'delete',
      url: '/api/delete-user',
      data: {
        id: userId,
      },
    }

    // 4. call API
    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

export {
  handleLoginApi,
  getAllUsers,
  handleAddUserApi,
  handleDeleteUser,
  handleEditUserApi,
}
