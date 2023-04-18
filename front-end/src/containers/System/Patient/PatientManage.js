import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { LANGUAGES } from '../../../utils'
import { BOOKING_ACTIONS } from '../../../utils'
import './PatientManage.scss'
import {
  handleGetBookingById,
  handleSendRemedyResult,
  handleUpdateStatusBooking,
} from '../../../services/bookingService'
import { toast } from 'react-toastify'
import RemedyModal from '../../Modal/RemedyModal'
import { getDetailDoctorById } from '../../../services/userService'
import LoadingOverlay from 'react-loading-overlay-ts'

class PatientManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorId: '',
      dateBooking: new Date().toISOString().substr(0, 10),
      bookingArr: [],

      patientInformation: '',
      patientEmail: '',

      doctorInformation: '',
      doctorClinicData: '',

      isRemedyModalOpen: false,

      isLoading: false,
    }
  }

  async componentDidMount() {
    // call API when component is first mounted
    if (this.props.userInfo) {
      let doctorId = this.props.userInfo.id
      this.setState({
        doctorId: doctorId,
      })

      let data = {
        doctorId: doctorId,
        dateBooking: this.state.dateBooking,
      }

      // call API to get booking
      let response = await handleGetBookingById(data)
      if (response && response.errCode === 0) {
        this.setState({
          bookingArr: response.data,
        })
      }

      // call API to get doctor information for sending remedy
      let doctorResponse = await getDetailDoctorById(doctorId)
      if (doctorResponse && doctorResponse.errCode === 0) {
        let doctorClinicData = doctorResponse.data.DoctorInfo.clinicData
        this.setState({
          doctorInformation: doctorResponse.data,
          doctorClinicData: doctorClinicData,
        })
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // call API when doctor pick dates
    if (prevState.dateBooking !== this.state.dateBooking) {
      let data = {
        doctorId: this.state.doctorId,
        dateBooking: this.state.dateBooking,
      }

      // call API to get booking
      let response = await handleGetBookingById(data)
      if (response && response.errCode === 0) {
        this.setState({
          bookingArr: response.data,
        })
      }
    }
  }

  handleConfirmBooking = async (id) => {
    if (window.confirm('Are you sure to confirm this booking?')) {
      let confirmAction = BOOKING_ACTIONS.CONFIRM

      let response = await handleUpdateStatusBooking(id, confirmAction)

      if (response && response.errCode === 0) {
        toast.success('Confirm booking successfully!')

        let data = {
          doctorId: this.state.doctorId,
          dateBooking: this.state.dateBooking,
        }

        // call API to get booking
        let response = await handleGetBookingById(data)
        if (response && response.errCode === 0) {
          this.setState({
            bookingArr: response.data,
          })
        }
      }
    }
  }

  handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure to cancel this booking?')) {
      let cancelBooking = BOOKING_ACTIONS.CANCEL
      let response = await handleUpdateStatusBooking(id, cancelBooking)
      if (response && response.errCode === 0) {
        toast.error('Cancel booking successfully!')

        let data = {
          doctorId: this.state.doctorId,
          dateBooking: this.state.dateBooking,
        }

        // call API to get booking
        let response = await handleGetBookingById(data)
        if (response && response.errCode === 0) {
          this.setState({
            bookingArr: response.data,
          })
        }
      }
    }
  }

  handleOpenRemedyModal = (patientInformation) => {
    this.setState({
      patientInformation: patientInformation,
      patientEmail: patientInformation.patientData.email,
      isRemedyModalOpen: true,
    })
  }

  handleCloseRemedyModal = () => {
    this.setState({
      isRemedyModalOpen: false,
    })
  }

  handleSendRemedy = async (remedyDataFromChild) => {
    let patientInformation = this.state.patientInformation
    let doctorInformation = this.state.doctorInformation
    let doctorClinicData = this.state.doctorClinicData

    let inputData = {
      ...remedyDataFromChild,
      patientName:
        patientInformation.firstName + ' ' + patientInformation.lastName,
      doctorName:
        doctorInformation.firstName + ' ' + doctorInformation.lastName,
      doctorEmail: doctorInformation.email,
      doctorPhoneNumber: doctorInformation.phoneNumber,
      doctorClinicName: doctorClinicData.name,
      doctorClinicAddress: doctorClinicData.address,
    }

    //set loading = true
    this.setState({
      isLoading: true,
    })

    let response = await handleSendRemedyResult(inputData)
    if (response && response.errCode === 0) {
      toast.success('Send Remedy successfully!')
      this.setState({
        isLoading: false,
        isRemedyModalOpen: false,
      })
    }
  }

  render() {
    let bookingArr = this.state.bookingArr
    let language = this.props.language
    console.log(this.state)
    return (
      <>
        <LoadingOverlay active={this.state.isLoading} spinner text="Loading">
          <div className="manage-patient-container">
            <div className="title">
              <FormattedMessage id="menu.doctor.manage-patient-title" />
            </div>
            <div className="date-booking form-control col-4">
              <input
                type="date"
                name="dateBooking"
                value={this.state.dateBooking}
                onChange={(event) =>
                  this.setState({
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="patient-table-list">
              <table id="customers">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Time</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                  </tr>
                  {bookingArr && bookingArr.length > 0 ? (
                    bookingArr.map((booking, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{booking.firstName}</td>
                          <td>{booking.lastName}</td>
                          <td>
                            {language === LANGUAGES.VI
                              ? booking.genderData.valueVI
                              : language === LANGUAGES.EN
                              ? booking.genderData.valueEN
                              : booking.genderData.valueES}
                          </td>
                          <td>
                            {language === LANGUAGES.VI
                              ? booking.timeData.valueVI
                              : language === LANGUAGES.EN
                              ? booking.timeData.valueEN
                              : booking.timeData.valueES}
                          </td>
                          <td>{booking.phoneNumber}</td>
                          <td>
                            <button
                              className="btn-edit"
                              type="button"
                              onClick={() =>
                                this.handleConfirmBooking(booking.id)
                              }
                            >
                              <FormattedMessage id="menu.doctor.manage-patient-confirm" />
                            </button>

                            <button
                              className="btn-delete"
                              type="button"
                              onClick={() =>
                                this.handleCancelBooking(booking.id)
                              }
                            >
                              <FormattedMessage id="menu.doctor.manage-patient-cancel" />
                            </button>

                            <button
                              className="btn-delete"
                              style={{ backgroundColor: '#0071BA' }}
                              type="button"
                              onClick={() =>
                                this.handleOpenRemedyModal(booking)
                              }
                            >
                              <FormattedMessage id="menu.doctor.manage-patient-send-remedy" />
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <td className="no-booking" colSpan={99}>
                      No data
                    </td>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <RemedyModal
            isOpen={this.state.isRemedyModalOpen}
            handleCloseRemedyModal={this.handleCloseRemedyModal}
            patientEmail={this.state.patientEmail}
            handleSendRemedy={this.handleSendRemedy}
          />
        </LoadingOverlay>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage)
