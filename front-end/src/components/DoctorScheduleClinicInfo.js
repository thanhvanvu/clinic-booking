import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './DoctorScheduleClinicInfo.scss'
import ProfileDoctor from '../containers/Patient/Doctor/ProfileDoctor'
import DoctorSchedule from '../containers/Patient/Doctor/DoctorSchedule'
import DoctorClinicInfo from '../containers/Patient/Doctor/DoctorClinicInfo'
class DoctorScheduleClinicInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { doctor, index } = this.props
    return (
      <div className="doctor-content">
        <div className="doctor-content-left">
          <ProfileDoctor
            doctorId={doctor.doctorId}
            cityData={doctor.clinicData.cityData}
            key={index}
            doctorSCSS={true}
          />
        </div>
        <div className="doctor-content-right">
          <div className="doctor-schedule">
            <DoctorSchedule doctorId={doctor.doctorId} key={index} />
          </div>
          <DoctorClinicInfo doctorId={doctor.doctorId} clinicSCSS={true} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorScheduleClinicInfo)
