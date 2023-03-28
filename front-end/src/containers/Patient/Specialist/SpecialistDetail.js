import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './SpecialistDetail.scss'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorClinicInfo from '../Doctor/DoctorClinicInfo'
import '../Doctor/DoctorSchedule.scss'
class SpecialistDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctorId: [113, 97, 101, 99],
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    let arrDoctorId = this.state.arrDoctorId
    return (
      <div className="container-specialist">
        <HeaderHomePage />
        <div className="specialist-top">
          <div className="specialist-detail wrapper"></div>
        </div>
        <div className="specialist-bottom">
          <div className="specialist-content-wrapper wrapper">
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((doctorId, index) => {
                return (
                  <div className="specialist-content">
                    <div className="specialist-content-left">
                      <ProfileDoctor
                        doctorId={doctorId}
                        key={index}
                        specialist={true}
                      />
                    </div>
                    <div className="specialist-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorId={doctorId} key={index} />
                      </div>
                      <DoctorClinicInfo doctorId={doctorId} specialist={true} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistDetail)
