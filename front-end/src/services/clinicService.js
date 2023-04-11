import axios from '../axios'

const handleGetAllClinic = async () => {
  try {
    const options = {
      method: 'get',
      url: '/api/get-all-clinic',
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleGetClinicById = async (clinicId) => {
  try {
    const options = {
      method: 'get',
      url: `/api/get-clinic-by-id?id=${clinicId}`,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleGetDoctorByClinicId = async (clinicId) => {
  try {
    const options = {
      method: 'get',
      url: `/api/get-doctor-by-clinicId?id=${clinicId}`,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleCreateClinic = async (clinicData) => {
  try {
    const options = {
      method: 'post',
      url: '/api/create-clinic',
      data: clinicData,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleUpdateClinic = async (clinicData) => {
  try {
    const options = {
      method: 'put',
      url: '/api/update-clinic',
      data: clinicData,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleDeleteClinic = async (clinicId) => {
  try {
    const options = {
      method: 'delete',
      url: `/api/delete-clinic?id=${clinicId}`,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

export {
  handleCreateClinic,
  handleGetAllClinic,
  handleUpdateClinic,
  handleDeleteClinic,
  handleGetDoctorByClinicId,
  handleGetClinicById,
}
