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

const updateInfoDoctorById = async (req, res) => {
  try {
    // 1. get data from client
    let doctorInfo = req.body
    if (!doctorInfo || !doctorInfo.doctorId) {
      return res.status(200).json({
        status: 'Fail',
        errCode: '1',
        message: 'Missing required parameters!',
      })
    }

    // 2. send data to service
    let response = await doctorService.updateInfoDoctorById(doctorInfo)

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

const bulkCreateSchedule = async (req, res) => {
  try {
    let scheduleInfo = req.body

    let response = await doctorService.handleBulkCreateSchedule(scheduleInfo)

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

const getScheduleByDoctorId = async (req, res) => {
  try {
    let doctorId = req.query.doctorId
    let date = req.query.date

    let response = await doctorService.handleGetScheduleByDoctorId(
      doctorId,
      date
    )
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

const getDoctorClinicInfoById = async (req, res) => {
  try {
    let doctorId = req.query.doctorId
    if (!doctorId) {
      return res.status(200).json({
        status: 'Fail',
        errCode: '1',
        message: 'Missing required parameters!',
      })
    }
    let response = await doctorService.handleGetDoctorClinicInfoById(doctorId)
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

const createDoctorClinicInfo = async (req, res) => {
  try {
    let doctor_clinic_info = req.body
    console.log('data', doctor_clinic_info)
    if (!doctor_clinic_info) {
      return res.status(200).json({
        status: 'Fail',
        errCode: '1',
        message: 'Missing required parameters!',
      })
    }

    let response = await doctorService.handleCreateDoctorClinicInfo(
      doctor_clinic_info
    )
    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
    })
  } catch (error) {
    console.log(error)
  }
}

const updateDoctorClinicInfo = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  createInfoDoctor: createInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  updateInfoDoctorById: updateInfoDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDoctorId: getScheduleByDoctorId,
  getDoctorClinicInfoById: getDoctorClinicInfoById,
  createDoctorClinicInfo: createDoctorClinicInfo,
  updateDoctorClinicInfo: updateDoctorClinicInfo,
}
