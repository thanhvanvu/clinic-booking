import React, { Component } from 'react'
import { CommonUtils } from '../../utils'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './BookingModal.scss'
import { Modal } from 'reactstrap'
import { LANGUAGES } from '../../utils'
import ProfileDoctor from '../Patient/Doctor/ProfileDoctor'
import * as actions from '../../store/actions'
import {
  handleCreateBookingAppointment,
  handleGetDoctorClinicInfo,
} from '../../services/userService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'react-loading-overlay-ts'

// Booking Modal
// isModalBooking: check to open the modal
// closeBookingModal: a function from parent, to close the modal
// selectedScheduleHour: time information
// doctorId: id Doctor  important
class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDoctor: {},
      clinicInfo: {},
      doctorClinicPrice: '',
      doctorId: '',
      selectedScheduleHour: {},
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      timeType: '',
      phoneNumber: '',
      date: '',
      address: '',
      examNote: '',
      isValidInput: {},

      isLoading: false,
    }
  }

  componentDidMount() {
    this.props.getGenderStart()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.selectedScheduleHour !== this.props.selectedScheduleHour) {
      this.setState({
        selectedScheduleHour: this.props.selectedScheduleHour,
        timeType: this.props.selectedScheduleHour.timeType,
      })
    }

    if (prevProps.doctorId !== this.props.doctorId) {
      let doctorId = this.props.doctorId
      let response = await handleGetDoctorClinicInfo(doctorId)
      if (response && response.errCode === 0) {
        let currentDoctor = response.data
        let doctorClinicPrice = currentDoctor.priceData
        this.setState({
          currentDoctor: currentDoctor,
          doctorId: currentDoctor.doctorId,
          doctorClinicPrice: doctorClinicPrice,
          clinicInfo: currentDoctor.clinicData,
        })
      }
    }
  }

  handleCreateBookingAppointment = async () => {
    if (window.confirm('Are you sure to book the appointment ?')) {
      // check valid input
      let isValid = CommonUtils.checkValidateInput({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
      })

      if (isValid && isValid[1]) {
        this.setState({
          isLoading: true,
        })
        //create booking appointment
        let response = await handleCreateBookingAppointment({
          doctorAppointment: this.state.currentDoctor.doctorData.firstName,
          addressAppointment: this.state.clinicInfo.address,
          nameClinicAppointment: this.state.clinicInfo.name,
          dateAppointment: this.state.selectedScheduleHour.date,
          timeAppointment: this.state.selectedScheduleHour.timeTypeData.valueEN,
          priceAppointment: this.state.currentDoctor.priceData.valueEN,
          doctorId: this.state.doctorId,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          gender: this.state.gender,
          timeType: this.state.timeType,
          phoneNumber: this.state.phoneNumber,
          date: this.state.date,
          address: this.state.address,
          examNote: this.state.examNote,
        })

        if (response && response.errCode === 0) {
          toast.success('Booked a new appointment successfully!')
          this.setState({
            isLoading: false,
          })

          // close the modal
          this.props.closeBookingModal()
        }
      } else {
        this.setState({
          isValidInput: isValid[0],
        })
      }
    }
  }

  handleGenderChange = (event) => {
    this.setState({
      isValidInput: { ...this.state.isValidInput, gender: true },
      gender: event.target.value,
    })
  }

  handleOnchangeBooking = (event) => {
    let newState = {
      ...this.state,
      [event.target.name]: event.target.value,
      isValidInput: { ...this.state.isValidInput, [event.target.name]: true },
    }
    this.setState(newState)
  }

  render() {
    let {
      isModalBooking,
      closeBookingModal,
      selectedScheduleHour,
      language,
      genders,
    } = this.props

    // get doctorId from component parent
    let doctorId
    if (selectedScheduleHour) {
      doctorId = selectedScheduleHour.doctorId
    }

    let doctorClinicPrice = this.state.doctorClinicPrice
    let isValid = this.state.isValidInput

    return (
      <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
        <Modal
          isOpen={isModalBooking}
          className="booking-modal"
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <ProfileDoctor
                doctorId={doctorId}
                isShowTimeBooking={true}
                selectedScheduleHour={selectedScheduleHour}
              />
            </div>
            <div className="booking-modal-body">
              <div className="row">
                <div className=" booking-body-content price-booking">
                  <span>
                    <FormattedMessage id="booking.price" />
                  </span>
                  <span className="price">
                    {doctorClinicPrice
                      ? language === LANGUAGES.EN
                        ? doctorClinicPrice.valueEN
                        : LANGUAGES.VI
                        ? doctorClinicPrice.valueVI
                        : doctorClinicPrice.valueES
                      : ''}
                  </span>
                </div>
                <div
                  className={
                    isValid.email === false
                      ? 'col-11 booking-body-content invalid'
                      : 'col-11 booking-body-content'
                  }
                >
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleOnchangeBooking}
                    className="col-12"
                    placeholder="Patient email (required)"
                  />
                </div>
                <div
                  className={
                    isValid.firstName === false
                      ? 'col-5 booking-body-content invalid'
                      : 'col-5 booking-body-content'
                  }
                >
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleOnchangeBooking}
                    className="col-12 "
                    placeholder="Patient first name (required)"
                  />
                </div>
                <div
                  className={
                    isValid.lastName === false
                      ? 'col-5 booking-body-content invalid'
                      : 'col-5 booking-body-content'
                  }
                >
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleOnchangeBooking}
                    className="col-12 "
                    placeholder="Patient last name (required)"
                  />
                </div>
                <div className="col-12 fullname-note">
                  <FormattedMessage id="booking.fullname-note-placeholder" />
                </div>
                <div className="col-11 booking-body-content gender">
                  {genders &&
                    genders.map((gender, index) => {
                      return (
                        <>
                          <input
                            type="radio"
                            id={gender.keyMap}
                            value={gender.keyMap}
                            name="gender"
                            onChange={this.handleGenderChange}
                          />
                          <label
                            htmlFor={gender.keyMap}
                            key={index}
                            className={
                              isValid.gender === false ? ' invalid' : ''
                            }
                          >
                            {language === LANGUAGES.EN
                              ? gender.valueEN
                              : language === LANGUAGES.VI
                              ? gender.valueVI
                              : gender.valueES}
                          </label>
                        </>
                      )
                    })}
                </div>
                <div
                  className={
                    isValid.phoneNumber === false
                      ? 'col-11 booking-body-content invalid'
                      : 'col-11 booking-body-content'
                  }
                >
                  <i className="fas fa-phone"></i>
                  <input
                    type="tel"
                    className="col-12"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.handleOnchangeBooking}
                    placeholder="Phone number (required)"
                  />
                </div>
                <div
                  className={
                    isValid.date === false
                      ? 'col-11 booking-body-content invalid'
                      : 'col-11 booking-body-content'
                  }
                >
                  <i className="fas fa-calendar-alt"></i>
                  <input
                    type="date"
                    className="col-12"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleOnchangeBooking}
                    placeholder="Date of birth (required)"
                  />
                </div>

                <div className="col-11 booking-body-content">
                  <i className="fas fa-map-marker-alt"></i>
                  <input
                    className="col-12"
                    placeholder="Address"
                    id="address1"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleOnchangeBooking}
                  />
                </div>
                <div className="col-11 booking-body-content exam-note">
                  <i className="fas fa-file-medical"></i>
                  <textarea
                    className="col-12"
                    name="examNote"
                    value={this.state.note}
                    onChange={this.handleOnchangeBooking}
                    id="note"
                    cols="30"
                    rows="3"
                    placeholder="Examination Reason"
                  ></textarea>
                </div>
                <div className="col-11 booking-body-content total-price">
                  <div className="initial-price">
                    <span>
                      <FormattedMessage id="booking.price" />
                    </span>
                    {doctorClinicPrice
                      ? language === LANGUAGES.EN
                        ? doctorClinicPrice.valueEN
                        : LANGUAGES.VI
                        ? doctorClinicPrice.valueVI
                        : doctorClinicPrice.valueES
                      : ''}
                  </div>
                  <div className="booking-fee">
                    <span>
                      <FormattedMessage id="booking.booking-fee" />
                    </span>
                    <span>
                      <FormattedMessage id="booking.booking-free" />
                    </span>
                  </div>
                  <div className="total">
                    <span>
                      <FormattedMessage id="booking.total-fee" />
                    </span>
                    {doctorClinicPrice
                      ? language === LANGUAGES.EN
                        ? doctorClinicPrice.valueEN
                        : LANGUAGES.VI
                        ? doctorClinicPrice.valueVI
                        : doctorClinicPrice.valueES
                      : ''}
                  </div>
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="confirm-booking"
                onClick={this.handleCreateBookingAppointment}
              >
                <FormattedMessage id="booking.confirm" />
              </button>
              <button className="cancel-booking" onClick={closeBookingModal}>
                <FormattedMessage id="booking.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
