import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'

const handleBookingDoctorAppointment = async (appointmentData, token) => {
  try {
    // find user, if not create the account
    let patientUser = await db.User.findOrCreate({
      where: { email: appointmentData.email },
      defaults: {
        email: appointmentData.email,
        firstName: appointmentData.firstName,
        lastName: appointmentData.lastName,
        gender: appointmentData.gender,
        phoneNumber: appointmentData.phoneNumber,
        address: appointmentData.address,
        roleId: 'R3',
      },
      raw: true,
    })

    console.log('>>>>check', patientUser[0].id)

    // then create a booking appointment, if timeType duplicated, do not create
    if (patientUser && patientUser[0]) {
      await db.Booking.findOrCreate({
        where: {
          timeType: appointmentData.timeType,
          dateBooking: appointmentData.dateAppointment,
          firstName: appointmentData.firstName,
          lastName: appointmentData.lastName,
          patientId: patientUser[0].id,
        },
        defaults: {
          statusId: 'S1',
          doctorId: appointmentData.doctorId,
          patientId: patientUser[0].id,
          firstName: appointmentData.firstName,
          lastName: appointmentData.lastName,
          phoneNumber: appointmentData.phoneNumber,
          address: appointmentData.address,
          dateOfBirth: appointmentData.date,
          dateBooking: appointmentData.dateAppointment,
          gender: appointmentData.gender,
          timeType: appointmentData.timeType,
          note: appointmentData.examNote,
          token: token,
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

const handleVerifyBookingAppointment = async (token, doctorId) => {
  try {
    // find the appointment with doctorId and toklen
    let appointment = await db.Booking.findOne({
      where: {
        doctorId: doctorId,
        token: token,
        statusId: 'S1',
      },
    })

    if (!appointment) {
      return {
        errCode: 1,
        status: 'Fail',
        message: 'Appointment has been already activated or does not exist!',
      }
    } else {
      // change status from pending to confirmed
      await appointment.set({
        statusId: 'S2',
      })

      await appointment.save()

      return {
        errCode: 0,
        status: 'Ok',
        message: 'Appointment activated!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleBookingDoctorAppointment,
  handleVerifyBookingAppointment,
}
