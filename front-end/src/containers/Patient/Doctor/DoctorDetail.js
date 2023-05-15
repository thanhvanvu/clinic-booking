import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import { CommonUtils } from '../../../utils'
import './DoctorDetail.scss'
import DoctorSchedule from './DoctorSchedule'
import DoctorClinicInfo from './DoctorClinicInfo'
import ProfileDoctor from './ProfileDoctor'
import * as actions from '../../../store/actions'
import FooterHomePage from '../../HomePage/FooterHomePage'
import { LANGUAGES } from '../../../utils'
import CommentFacebook from '../../../components/CommentFacebook'

class DoctorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewImg: '',
      doctor: [],
      doctorId: '',
      commentFacebookWidth: '',
    }
  }

  wrapperRef = React.createRef()

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

    this.handleWindowSizeChange()
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

  handleWindowSizeChange = () => {
    const screenWidth = window.innerWidth

    if (screenWidth >= 1200) {
      this.setState({ commentFacebookWidth: 1170 })
    } else if (992 <= screenWidth && screenWidth <= 1199) {
      this.setState({ commentFacebookWidth: 970 })
    } else if (768 <= screenWidth && screenWidth <= 991) {
      this.setState({ commentFacebookWidth: 740 })
    } else if (576 <= screenWidth && screenWidth <= 767) {
      this.setState({ commentFacebookWidth: screenWidth })
    } else {
      this.setState({ commentFacebookWidth: screenWidth })
    }
  }

  render() {
    let doctor = this.state.doctor
    let pageHref = window.location.href
    let commentFacebookWidth = this.state.commentFacebookWidth

    return (
      <div className="doctor-detail">
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
          {doctor && doctor.DoctorInfo && (
            <div
              className="doctor-information-content wrapper"
              ref={this.wrapperRef}
              dangerouslySetInnerHTML={{
                __html: doctor.DoctorInfo.contentHTML,
              }}
            ></div>
          )}
        </div>
        <div className="doctor-feedback">
          <CommentFacebook
            pageHref={pageHref}
            commentFacebookWidth={commentFacebookWidth}
          />
        </div>
        <FooterHomePage />
      </div>
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
