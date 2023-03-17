import { json } from 'body-parser'
import express from 'express'
import db from '../models/index'
import patientService from '../services/patientService'

const createDoctorAppointment = async (req, res) => {
  try {
    let appointmentData = req.body

    // check if email exists ?
    if (
      !appointmentData.email ||
      !appointmentData.doctorId ||
      !appointmentData.timeType ||
      !appointmentData.date
    ) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await patientService.handleBookingDoctorAppointment(
      appointmentData
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
module.exports = {
  createDoctorAppointment,
}
