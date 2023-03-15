import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './ProfileDoctor.scss'
import { handleGetProfileDoctorByIf } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'

// This component will get doctorId as a props from parent component
class ProfileDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorProfile: {},
    }
  }

  async componentDidMount() {
    // get doctorId from parent component
    let doctorId = this.props.doctorId
    let profileDoctor = await this.getProfileDoctorById(doctorId)
    this.setState({
      doctorProfile: profileDoctor,
    })
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

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      let profileDoctor = await this.getProfileDoctorById(this.props.doctorId)
      this.setState({
        doctorProfile: profileDoctor,
      })
    }
  }

  render() {
    console.log(this.state.doctorProfile)
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
      <div className="doctor-detail-container">
        <div className="doctor-detail-summary wrapper">
          <div className="doctor-image">
            <img src={doctor.image} alt="" width="120px" height="120px" />
          </div>
          <div className="doctor-summary">
            <div className="doctor-summary-title">{title}</div>
            <div className="doctor-summary-content">
              {doctor &&
                doctor.Markdown &&
                doctor.Markdown.description &&
                doctor.Markdown.description}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
