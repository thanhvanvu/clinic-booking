import doctorService from '../services/doctorService'

const getTopDoctorHome = async (req, res) => {
  try {
    let limitRecord = parseInt(req.query.limit, 10)

    if (!limitRecord) {
      limitRecord = 10
    }

    const response = await doctorService.handleGetTopDoctor(limitRecord)

    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
      length: response.data.length,
      data: response.data,
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      status: 'Fail',
      message: 'Error from server',
    })
  }
}

const getAllDoctors = async (req, res) => {
  try {
    let response = await doctorService.handleGetAllDoctors()
    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
      length: response.data.length,
      data: response.data,
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      status: 'Fail',
      message: 'Error from server',
    })
  }
}

const createInfoDoctor = async (req, res) => {
  try {
    let infoData = req.body
    let response = await doctorService.handleCreateInfoDoctor(infoData)
    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      status: 'Fail',
      message: 'Error from server',
    })
  }
}

const getDetailDoctorById = async (req, res) => {
  try {
    let doctorId = req.query.id
    let response = await doctorService.handleGetDetailDoctorById(doctorId)

    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
      data: response.data,
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      status: 'Fail',
      message: 'Error from server',
    })
  }
}
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  createInfoDoctor: createInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
}
