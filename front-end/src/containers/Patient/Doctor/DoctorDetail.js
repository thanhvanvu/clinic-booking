import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import { CommonUtils } from '../../../utils'
import './DoctorDetail.scss'
import DoctorSchedule from './DoctorSchedule'
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
      <>
        {/* show header menu */}
        <HeaderHomePage isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="doctor-detail-summary wrapper">
            <div className="doctor-image">
              <img
                src={this.state.previewImg}
                alt=""
                width="100px"
                height="100px"
              />
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
        <div className="doctor-appointment wrapper">
          <div className="doctor-schedule">
            <DoctorSchedule doctor={this.state.doctor} />
          </div>
          <div className="doctor-clinic-information"></div>
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
