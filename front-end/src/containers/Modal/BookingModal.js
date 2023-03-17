import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './BookingModal.scss'
import { Modal } from 'reactstrap'
import { LANGUAGES } from '../../utils'
import ProfileDoctor from '../Patient/Doctor/ProfileDoctor'
import * as actions from '../../store/actions'
class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDoctor: {},
      doctorClinicPrice: '',
    }
  }

  componentDidMount() {
    this.props.getGenderStart()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentDoctor !== this.props.currentDoctor) {
      let currentDoctor = this.props.currentDoctor
      let doctorClinicPrice
      if (
        currentDoctor &&
        currentDoctor.DoctorInfo &&
        currentDoctor.DoctorInfo.priceData
      ) {
        doctorClinicPrice = currentDoctor.DoctorInfo.priceData
      }
      this.setState({
        doctorClinicPrice: doctorClinicPrice,
      })
    }
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
    return (
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
                  {language === LANGUAGES.EN
                    ? doctorClinicPrice.valueEN
                    : language === LANGUAGES.VI
                    ? doctorClinicPrice.valueVI
                    : doctorClinicPrice.valueES}
                </span>
              </div>
              <div className="col-11 booking-body-content">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  className="col-12 "
                  placeholder="Patient email (required)"
                />
              </div>
              <div className="col-11 booking-body-content">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  className="col-12 "
                  placeholder="Patient first and last name (required)"
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
                          defaultChecked={index === 0}
                          id={gender.keyMap}
                          value={gender.keyMap}
                          name="gender"
                        />
                        <label htmlFor={gender.keyMap} key={index}>
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
              <div className="col-11 booking-body-content">
                <i className="fas fa-phone"></i>
                <input
                  type="number"
                  className="col-12"
                  placeholder="Phone number (required)"
                />
              </div>
              <div className="col-11 booking-body-content">
                <i className="fas fa-calendar-alt"></i>
                <input
                  className="col-12"
                  placeholder="Year of birth (required)"
                />
              </div>

              <div className="col-11 booking-body-content">
                <i className="fas fa-map-marker-alt"></i>
                <input className="col-12" placeholder="Address" />
              </div>
              <div className="col-11 booking-body-content exam-note">
                <i className="fas fa-file-medical"></i>
                <textarea
                  className="col-12"
                  name=""
                  id=""
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
                  <span>
                    {language === LANGUAGES.EN
                      ? doctorClinicPrice.valueEN
                      : language === LANGUAGES.VI
                      ? doctorClinicPrice.valueVI
                      : doctorClinicPrice.valueES}
                  </span>
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
                  <span>
                    {language === LANGUAGES.EN
                      ? doctorClinicPrice.valueEN
                      : language === LANGUAGES.VI
                      ? doctorClinicPrice.valueVI
                      : doctorClinicPrice.valueES}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="confirm-booking">
              <FormattedMessage id="booking.confirm" />
            </button>
            <button className="cancel-booking" onClick={closeBookingModal}>
              <FormattedMessage id="booking.cancel" />
            </button>
          </div>
        </div>
      </Modal>
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
