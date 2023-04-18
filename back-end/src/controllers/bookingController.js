import { json } from 'body-parser'
import express from 'express'
import db from '../models/index'
import bookingService from '../services/bookingService'
import emailService from '../services/emailService'

const getBookingByDoctorId = async (req, res) => {
  try {
    let doctorId = req.query.doctorId
    let dateBooking = req.query.dateBooking
    if (!doctorId || !dateBooking) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await bookingService.handleGetBookingByDoctorId(
      doctorId,
      dateBooking
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

const updateStatusBooking = async (req, res) => {
  try {
    let bookingId = req.query.id
    let action = req.query.action
    if (!bookingId || !action) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await bookingService.handleUpdateStatusBooking(
      bookingId,
      action
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

const sendRemedyResult = async (req, res) => {
  try {
    let dataSend = req.body
    let response = await emailService.sendRemedyEmail(dataSend)
    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getBookingByDoctorId,
  updateStatusBooking,
  sendRemedyResult,
}
