import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'
import nodemailer from 'nodemailer'
require('dotenv').config()

const sendSimpleEmail = async (patientInfo) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"HealthCare Consultancy" <${process.env.EMAIL_APP}>`, // sender address
    to: patientInfo.email, // list of receivers
    subject: 'Healthcare Appointment Information', // Subject line
    html: `
    <h3>Dear ${patientInfo.firstName}</h3>

    <p>I am writing to confirm your upcoming appointment with our healthcare center. Your appointment has been scheduled for:

    <p>Date: ${patientInfo.dateAppointment}<p/>
    <p>Time: ${patientInfo.timeAppointment}<p/>
    <p>Address: ${patientInfo.addressAppointment}<p/>

    <p>We kindly remind you to arrive 10-15 minutes early to allow time for check-in and to bring your insurance card and any necessary paperwork with you.</p>

    <p>During your appointment, we will discuss your medical history and any current concerns you may have. We will also perform a physical examination and order any necessary tests to help us diagnose and treat your condition.</p>

    <p>Please kindly confirm that the scheduled time and address for your appointment are correct and click the link below to confirm your appointment</p>

    <p>Thank you for choosing our healthcare center for your medical needs, and we look forward to seeing you soon.</p>

    <p>Sincerely,</p>

    <h4>${patientInfo.nameClinicAppointment}</h4>
    `,
  })
}
module.exports = {
  sendSimpleEmail,
}
