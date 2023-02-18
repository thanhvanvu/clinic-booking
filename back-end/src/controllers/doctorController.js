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
}
