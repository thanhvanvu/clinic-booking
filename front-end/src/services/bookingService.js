import axios from '../axios'

const handleGetBookingById = async (data) => {
  try {
    const options = {
      method: 'get',
      url: `/api/get-booking-by-doctorId?doctorId=${data.doctorId}&dateBooking=${data.dateBooking}`,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleUpdateStatusBooking = async (bookingId, action) => {
  try {
    const options = {
      method: 'put',
      url: `/api/update-status-booking?id=${bookingId}&action=${action}`,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}

const handleSendRemedyResult = async (result) => {
  try {
    const options = {
      method: 'post',
      url: `/api/send-remedy-result`,
      data: result,
    }

    return await axios(options)
  } catch (error) {
    console.log(error)
  }
}
export {
  handleGetBookingById,
  handleUpdateStatusBooking,
  handleSendRemedyResult,
}
