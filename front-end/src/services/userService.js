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

const handleGetAllDoctors = async () => {
  try {
    // 2. create options
    const options = {
      method: 'get',
      url: '/api/get-all-doctors',
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

const handleGetAllCode = async (typeInput) => {
  try {
    // 3. create an option
    const options = {
      method: 'get',
      url: `/api/get-all-code?type=${typeInput}`,
    }

    // 4. call API
    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleGetTopDoctors = async (limitRecord) => {
  try {
    // 3. create an option
    const options = {
      method: 'get',
      url: `/api/top-doctor-home?limit=${limitRecord}`,
    }

    // 4. call API
    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleCreateDoctorInfo = async (doctorInfo) => {
  try {
    const options = {
      method: 'post',
      url: '/api/save-info-doctor',
      data: doctorInfo,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const getDetailDoctorById = async (doctorId) => {
  try {
    const options = {
      method: 'get',
      url: `/api/get-detail-doctor-by-id?id=${doctorId}`,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleUpdateInfoDoctorById = async (doctorInfo) => {
  try {
    const options = {
      method: 'put',
      url: '/api/update-info-doctor',
      data: doctorInfo,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleSaveBulkSchedule = async (scheduleInfo) => {
  try {
    const options = {
      method: 'post',
      url: '/api/bulk-create-schedule',
      data: scheduleInfo,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleGetScheduleByDoctorId = async (doctorId, date) => {
  try {
    const options = {
      method: 'get',
      url: `/api/get-schedule?doctorId=${doctorId}&date=${date}`,
    }
    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleGetDoctorClinicInfo = async (doctorId) => {
  try {
    const options = {
      method: 'get',
      url: `/api/get-doctor-clinic-info?doctorId=${doctorId}`,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleCreateDoctorClinicInfo = async (ClinicInfo) => {
  try {
    console.log('service', ClinicInfo)
    const options = {
      method: 'post',
      url: '/api/create-doctor-clinic-info',
      data: ClinicInfo,
    }

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
  handleGetAllCode,
  handleGetTopDoctors,
  handleGetAllDoctors,
  handleCreateDoctorInfo,
  getDetailDoctorById,
  handleUpdateInfoDoctorById,
  handleSaveBulkSchedule,
  handleGetScheduleByDoctorId,
  handleGetDoctorClinicInfo,
  handleCreateDoctorClinicInfo,
}
