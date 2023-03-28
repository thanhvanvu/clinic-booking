import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import { CommonUtils } from '../../../utils'
import './DoctorDetail.scss'
import DoctorSchedule from './DoctorSchedule'
import DoctorClinicInfo from './DoctorClinicInfo'
import ProfileDoctor from './ProfileDoctor'
import * as actions from '../../../store/actions'
import HomeFooter from '../../HomePage/HomeFooter'
import { LANGUAGES } from '../../../utils'

class DoctorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewImg: '',
      doctor: [],
      doctorId: '',
    }
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let doctorId = this.props.match.params.id
      this.props.getDetailDoctorByIdRedux(doctorId)
      this.setState({ doctorId: doctorId })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentDoctor !== this.props.currentDoctor) {
      let currentDoctor = this.props.currentDoctor
      this.setState({
        previewImg: CommonUtils.convertBufferToBase64(currentDoctor.image),
        doctor: currentDoctor,
      })
    }
  }

  render() {
    let doctor = this.state.doctor
    return (
      <>
        {/* show header menu */}
        <HeaderHomePage isShowBanner={false} />

        <div className="profile-doctor wrapper">
          <div className="profile-doctor-doctor-detail">
            <ProfileDoctor doctorId={doctor.id} />
          </div>
        </div>
        <div className="doctor-appointment wrapper">
          <div className="doctor-schedule">
            <DoctorSchedule doctorId={doctor.id} />
          </div>
          <div className="doctor-clinic-information">
            <DoctorClinicInfo doctorId={doctor.id} />
          </div>
        </div>
        <div className="doctor-information">
          {doctor && doctor.Markdown && doctor.Markdown.contentHTML && (
            <div
              className="doctor-information-content wrapper"
              dangerouslySetInnerHTML={{ __html: doctor.Markdown.contentHTML }}
            ></div>
          )}
        </div>
        <div className="doctor-feedback"></div>
        <HomeFooter />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    currentDoctor: state.homepage.currentDoctor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctorByIdRedux: (userData) =>
      dispatch(actions.getDetailDoctorByIdRedux(userData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail)
