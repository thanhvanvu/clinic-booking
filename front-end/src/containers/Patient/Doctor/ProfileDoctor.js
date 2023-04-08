import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { CommonUtils } from '../../../utils'
import moment from 'moment'
import 'moment/locale/es'
import 'moment/locale/vi'
import { connect } from 'react-redux'
import './ProfileDoctor.scss'
import { handleGetProfileDoctorByIf } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import { withRouter } from 'react-router'

// This component will get doctorId as a props from parent component
// doctorId: the id of the doctor will be sent from parent component
// isShowDateTime: default value = false
class ProfileDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorId: '',
      doctorProfile: {},
    }
  }

  async componentDidMount() {
    // get doctorId from parent component
    let doctorId = this.props.doctorId
    let profileDoctor = await this.getProfileDoctorById(doctorId)
    this.setState({
      doctorId: this.props.doctorId,
      doctorProfile: profileDoctor,
    })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      let profileDoctor = await this.getProfileDoctorById(this.props.doctorId)
      this.setState({
        doctorId: this.props.doctorId,
        doctorProfile: profileDoctor,
      })
    }
  }

  getProfileDoctorById = async (doctorId) => {
    let result = {}
    if (doctorId) {
      let response = await handleGetProfileDoctorByIf(doctorId)
      if (response && response.errCode === 0) {
        result = response.data
      }
    }

    return result
  }

  renderTimeBooking = (dataTime) => {
    let timeBooking = {}
    let language = this.props.language
    let timeDate
    let dateBooking

    if (dataTime && dataTime.timeTypeData) {
      timeBooking = dataTime.timeTypeData
      if (LANGUAGES.VI === language) {
        dateBooking = moment(dataTime.date)
          .locale('vi')
          .format('dddd - DD/MM/YYYY')
        dateBooking = CommonUtils.capitalizerFirstLetter(dateBooking)
        timeDate = timeBooking.valueVI + ', ' + dateBooking
      } else if (LANGUAGES.EN === language) {
        dateBooking = moment(dataTime.date)
          .locale('en')
          .format('dddd - DD/MM/YYYY')
        dateBooking = CommonUtils.capitalizerFirstLetter(dateBooking)
        timeDate = timeBooking.valueEN + ', ' + dateBooking
      } else {
        dateBooking = moment(dataTime.date)
          .locale('es')
          .format('dddd - DD/MM/YYYY')
        dateBooking = CommonUtils.capitalizerFirstLetter(dateBooking)
        timeDate = timeBooking.valueES + ', ' + dateBooking
      }
    }

    return (
      <div className="booking-time-content">
        <div>{timeDate}</div>
        <div>
          <FormattedMessage id="doctor-profile.booking-free" />
        </div>
      </div>
    )
  }

  handleViewDoctorDetail = () => {
    const doctorId = this.state.doctorId
    const { history } = this.props
    history.push(`/detail-doctor/${doctorId}`)
  }

  render() {
    let { isShowTimeBooking, selectedScheduleHour, specialist, cityData } =
      this.props
    let doctor = this.state.doctorProfile
    let language = this.props.language
    let title
    if (doctor && doctor.positionData) {
      if (LANGUAGES.VI === language) {
        title =
          doctor.positionData.valueVI +
          ', ' +
          doctor.firstName +
          ' ' +
          doctor.lastName
      } else if (LANGUAGES.EN === language) {
        title =
          doctor.positionData.valueEN +
          ', ' +
          doctor.firstName +
          ' ' +
          doctor.lastName
      } else {
        title =
          doctor.positionData.valueES +
          ', ' +
          doctor.firstName +
          ' ' +
          doctor.lastName
      }
    }
    return (
      <div className="doctor-detail-summary">
        <div
          className={
            specialist === true ? 'doctor-image specialist' : 'doctor-image'
          }
        >
          <img src={doctor.image} alt="" />
          {specialist ? (
            <span onClick={() => this.handleViewDoctorDetail()}>
              <FormattedMessage id="doctor-profile.see-more" />
            </span>
          ) : (
            <></>
          )}
        </div>
        {isShowTimeBooking === true ? (
          <div className="doctor-summary">
            <div className="booking-title">
              <FormattedMessage id="doctor-profile.booking-title" />
            </div>
            <div className="doctor-summary-title">{title}</div>
            {this.renderTimeBooking(selectedScheduleHour)}
          </div>
        ) : (
          <>
            <div className="doctor-summary">
              <div
                className={
                  specialist
                    ? 'doctor-summary-title specialist'
                    : 'doctor-summary-title'
                }
              >
                {title}
              </div>
              <div className="doctor-summary-content">
                {doctor && doctor.DoctorInfo && doctor.DoctorInfo.description}
              </div>

              {specialist ? (
                <div className="doctoc-city">
                  <i class="fas fa-map-marker-alt"></i>{' '}
                  {language === LANGUAGES.VI
                    ? cityData.valueVI
                    : language === LANGUAGES.EN
                    ? cityData.valueEN
                    : cityData.valueES}
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
)
