import express from 'express'
import homeControllers from '../controllers/homeControllers'
import userController from '../controllers/userController'
import patientController from '../controllers/patientController'
import doctorController from '../controllers/doctorController'
import specialistController from '../controllers/specialistController'
import clinicController from '../controllers/clinicController'
import bookingController from '../controllers/bookingController'

let Router = express.Router()

let initWebRoutes = (app) => {
  Router.route('/').get(homeControllers.getHomePage)

  Router.route('/crud').get(homeControllers.getCRUD)
  Router.route('/post-crud').post(homeControllers.postCRUD)
  Router.route('/get-crud').get(homeControllers.displayGetCRUD)
  Router.route('/edit-crud').get(homeControllers.editCRUD)
  Router.route('/put-crud').post(homeControllers.editPutCRUD)
  Router.route('/delete-crud').get(homeControllers.deletePutCRUD)

  Router.route('/api/top-doctor-home').get(doctorController.getTopDoctorHome)
  Router.route('/api/get-all-doctors').get(doctorController.getAllDoctors)
  Router.route('/api/save-info-doctor').post(doctorController.createInfoDoctor)
  Router.route('/api/update-info-doctor').put(
    doctorController.updateInfoDoctorById
  )
  Router.route('/api/get-detail-doctor-by-id').get(
    doctorController.getDetailDoctorById
  )
  Router.route('/api/get-profile-doctor-by-id').get(
    doctorController.getProfileDoctorById
  )

  Router.route('/api/get-doctor-clinic-info').get(
    doctorController.getDoctorClinicInfoById
  )
  Router.route('/api/create-doctor-clinic-info').post(
    doctorController.createDoctorClinicInfo
  )
  Router.route('/api/update-doctor-clinic-info').put(
    doctorController.updateDoctorClinicInfo
  )

  Router.route('/api/bulk-create-schedule').post(
    doctorController.bulkCreateSchedule
  )
  Router.route('/api/get-schedule').get(doctorController.getScheduleByDoctorId)

  //Patient
  Router.route('/api/patient-booking-appointment').post(
    patientController.createDoctorAppointment
  )
  Router.route('/api/verify-booking-appointment').post(
    patientController.verifyBookingAppointment
  )

  //Specialist
  Router.route('/api/create-specialist').post(
    specialistController.createSpecialist
  )
  Router.route('/api/get-all-specialist').get(
    specialistController.getAllSpecialist
  )
  Router.route('/api/get-specialist-by-id').get(
    specialistController.getSpecialistById
  )
  Router.route('/api/update-specialist-by-id').put(
    specialistController.updateSpecialistById
  )
  Router.route('/api/delete-specialist-by-id').delete(
    specialistController.deleteSpecialistById
  )
  Router.route('/api/get-doctor-specialist').get(
    specialistController.getDoctorInSpecialist
  )

  //Clinic
  Router.route('/api/get-all-clinic').get(clinicController.getAllClinic)
  Router.route('/api/get-clinic-by-id').get(clinicController.getClinicById)
  Router.route('/api/get-doctor-by-clinicId').get(
    clinicController.getDoctorByClinicId
  )
  Router.route('/api/create-clinic').post(clinicController.createClinic)
  Router.route('/api/update-clinic').put(clinicController.updateClinic)
  Router.route('/api/delete-clinic').delete(clinicController.deleteClinic)

  //Booking
  Router.route('/api/get-booking-by-doctorId').get(
    bookingController.getBookingByDoctorId
  )
  Router.route('/api/update-status-booking').put(
    bookingController.updateStatusBooking
  )
  Router.route('/api/send-remedy-result').post(
    bookingController.sendRemedyResult
  )
  return app.use('/', Router)
}

module.exports = initWebRoutes
