import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'

const handleGetBookingByDoctorId = async (doctorId, dateBooking) => {
  try {
    let bookings = await db.Booking.findAll({
      where: {
        doctorId: doctorId,
        dateBooking: dateBooking,
        statusId: 'S2',
      },
      include: [
        {
          model: db.Allcode,
          as: 'genderData',
        },

        {
          model: db.Allcode,
          as: 'timeData',
        },

        {
          model: db.User,
          as: 'patientData',
          attributes: ['email'],
        },

        {
          model: db.User,
          as: 'doctorData',
        },
      ],
    })

    return {
      errCode: 0,
      status: 'Success',
      message: 'OK!',
      data: bookings,
    }
  } catch (error) {
    console.log(error)
  }
}

const handleUpdateStatusBooking = async (bookingId, action) => {
  try {
    // find the booking
    let booking = await db.Booking.findOne({
      where: {
        id: bookingId,
      },
    })

    if (booking) {
      if (action === 'CONFIRM') {
        booking.set({
          statusId: 'S3',
        })
      }

      if (action === 'CANCEL') {
        booking.set({
          statusId: 'S4',
        })
      }

      booking.save()

      return {
        errCode: 0,
        status: 'Success',
        message: 'Updated Booking Status Successfully!',
      }
    } else {
      return {
        errCode: 2,
        status: 'Fail',
        message: 'Booking not found!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleGetBookingByDoctorId,
  handleUpdateStatusBooking,
}
