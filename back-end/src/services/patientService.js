import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'
const bcrypt = require('bcryptjs')

const handleBookingDoctorAppointment = async (appointmentData) => {
  try {
    // find user, if not create the account
    let patientUser = await db.User.findOrCreate({
      where: { email: appointmentData.email },
      defaults: {
        email: appointmentData.email,
        roleId: 'R3',
      },
      raw: true,
    })
    // then create a booking appointment, if timeType duplicated, do not create
    if (patientUser && patientUser[0]) {
      await db.Booking.findOrCreate({
        where: { timeType: appointmentData.timeType },
        defaults: {
          statusId: 'S1',
          doctorId: appointmentData.doctorId,
          patientId: patientUser[0].id,
          date: appointmentData.date,
          timeType: appointmentData.timeType,
        },
      })
      return {
        status: 'Success',
        errCode: 0,
        message: 'Booking Appointment Created Successfully!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleBookingDoctorAppointment,
}
