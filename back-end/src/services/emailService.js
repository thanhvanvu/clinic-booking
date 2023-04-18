import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'
import nodemailer from 'nodemailer'

const sendRemedyEmail = async (dataSend) => {
  try {
    //   {   // encoded string as an attachment
    //     filename: 'text1.txt',
    //     content: 'aGVsbG8gd29ybGQh',
    //     encoding: 'base64'
    // },
    // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
    // need to get the content after base64,
    let remedyFileImg
    if (dataSend.remedyFileImg) {
      remedyFileImg = dataSend.remedyFileImg.split(',')[1]
    }

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
      to: `${dataSend.patientEmail}`, // list of receivers
      subject: 'Examination results', // Subject line
      attachments: [
        {
          // encoded string as an attachment
          filename: `${dataSend.patientName}.jpg`,
          content: remedyFileImg,
          encoding: 'base64',
        },
      ],
      html: `
      <h3>Dear ${dataSend.patientName},</h3>

      <p>I hope this email finds you in good health. I am writing to you today to discuss the results of your recent examination. I have attached a copy of the report for your convenience.</p


      <p>Please don't hesitate to contact me if you have any questions or concerns regarding your examination results. I would be happy to address any issues you may have and provide further guidance as needed.</p>

      <p>I recommend scheduling a follow-up appointment with me to discuss any further steps that may need to be taken based on the results of your examination.</p>

      <p>Thank you for entrusting me with your healthcare needs. I look forward to seeing you at your next appointment.</p>

      <p>Sincerely,</p>

      <p><b>Doctor: ${dataSend.doctorName}</b><p/>
      <p><b>Email: ${dataSend.doctorEmail}</b><p/>
      <p><b>Phone number: ${dataSend.doctorPhoneNumber}</b><p/>
      <p><b>Clinic: ${dataSend.doctorClinicName}</b><p/>
      <p><b>Address: ${dataSend.doctorClinicAddress}</b><p/>

    `,
    })

    return {
      errCode: 0,
      status: 'OK',
      message: 'Send email successfully!',
    }
  } catch (error) {
    console.log(error)
  }
}

const sendSimpleEmail = async (patientInfo, urlConfirm) => {
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

    <p><b>Doctor: ${patientInfo.doctorAppointment}</b><p/>
    <p><b>Date: ${patientInfo.dateAppointment}</b><p/>
    <p><b>Time: ${patientInfo.timeAppointment}</b><p/>
    <p><b>Address: ${patientInfo.addressAppointment}</b><p/>
    <p><b>Price: ${patientInfo.priceAppointment}</b><p/>

    <p>We kindly remind you to arrive 10-15 minutes early to allow time for check-in and to bring your insurance card and any necessary paperwork with you.</p>

    <p>During your appointment, we will discuss your medical history and any current concerns you may have. We will also perform a physical examination and order any necessary tests to help us diagnose and treat your condition.</p>

    <p>Please kindly confirm that the scheduled time and address for your appointment are correct and click the link below to confirm your appointment</p>

    <a href=${urlConfirm}>Click here to confirm the appointment</a>

    <p>Thank you for choosing our healthcare center for your medical needs, and we look forward to seeing you soon.</p>

    <p>Sincerely,</p>

    <h4>${patientInfo.nameClinicAppointment}</h4>
    `,
  })
}
module.exports = {
  sendSimpleEmail,
  sendRemedyEmail,
}
