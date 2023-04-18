import { json } from 'body-parser'
import express from 'express'
import db from '../models/index'
import patientService from '../services/patientService'
import emailService from '../services/emailService'
import { v4 as uuidv4 } from 'uuid'
require('dotenv').config()

const buildUrlEmail = (doctorId) => {
  let token = uuidv4()
  let urlResult = `${process.env.REACT_APP_FRONTEND_URL}/verify-booking?token=${token}&doctorId=${doctorId}`
  return { urlConfirm: urlResult, token: token }
}

const createDoctorAppointment = async (req, res) => {
  try {
    let appointmentData = req.body
    if (
      !appointmentData.addressAppointment ||
      !appointmentData.nameClinicAppointment ||
      !appointmentData.dateAppointment ||
      !appointmentData.timeAppointment ||
      !appointmentData.firstName ||
      !appointmentData.lastName ||
      !appointmentData.gender ||
      !appointmentData.email ||
      !appointmentData.phoneNumber ||
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

    // { urlConfirm: urlResult, token: id }
    let urlAndToken = buildUrlEmail(appointmentData.doctorId)

    let response = await patientService.handleBookingDoctorAppointment(
      appointmentData,
      urlAndToken.token
    )

    if (response && response.errCode === 0) {
      // send email to patient before creating the appointment
      await emailService.sendSimpleEmail(
        appointmentData,
        urlAndToken.urlConfirm
      )
    }

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

const verifyBookingAppointment = async (req, res) => {
  try {
    let token = req.query.token
    let doctorId = req.query.doctorId
    if (!token || !doctorId) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await patientService.handleVerifyBookingAppointment(
      token,
      doctorId
    )
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
module.exports = {
  createDoctorAppointment,
  verifyBookingAppointment,
}
