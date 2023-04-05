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

// const handleGetAllSpecialist = async () => {
//   try {
//     const options = {
//       method: 'get',
//       url: '/api/get-all-specialist',
//     }

//     return await axios(options)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const handleGetSpecialistById = async (specialistId) => {
//   try {
//     const options = {
//       method: 'get',
//       url: `/api/get-specialist-by-id?id=${specialistId}`,
//     }

//     return await axios(options)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const handleUpdateSpecialistById = async (specialistData) => {
//   try {
//     const options = {
//       method: 'put',
//       url: '/api/update-specialist-by-id',
//       data: specialistData,
//     }

//     return await axios(options)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const handleDeleteSpecialistById = async (specialistId) => {
//   try {
//     const options = {
//       method: 'delete',
//       url: `/api/delete-specialist-by-id?id=${specialistId}`,
//     }

//     return await axios(options)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const handleGetDoctorInSpecialist = async (specialistId) => {
//   try {
//     const options = {
//       method: 'get',
//       url: `/api/get-doctor-specialist?id=${specialistId}`,
//     }

//     return await axios(options)
//   } catch (error) {
//     console.log(error)
//   }
// }
export { handleCreateClinic, handleGetAllClinic }
