import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './ClinicDetail.scss'
import DoctorScheduleClinicInfo from '../../../components/DoctorScheduleClinicInfo'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import img from '../../../assets/clinic/2019_Homepage_Featured.jpg'
import FooterHomePage from '../../HomePage/FooterHomePage'
import {
  handleGetClinicById,
  handleGetDoctorByClinicId,
} from '../../../services/clinicService'
import { CommonUtils } from '../../../utils'
class ClinicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clinicId: '',
      clinicData: '',
      filteredArrDoctor: [],
      isFocus: '',
    }
  }

  async componentDidMount() {
    let clinicId = this.props.match.params.id

    this.setState({
      clinicId: clinicId,
    })

    let doctorResponse = await handleGetDoctorByClinicId(clinicId)
    if (doctorResponse && doctorResponse.errCode === 0) {
      let dataDoctor = doctorResponse.data
      this.setState({
        filteredArrDoctor: dataDoctor,
      })
    }

    let clinicResponse = await handleGetClinicById(clinicId)
    if (clinicResponse && clinicResponse.errCode === 0) {
      let clinicData = clinicResponse.data
      clinicData.image = CommonUtils.convertBufferToBase64(clinicData.image)
      clinicData.logo = CommonUtils.convertBufferToBase64(clinicData.logo)
      this.setState({
        clinicData: clinicData,
      })
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleClickViewIntroduction = (type) => {
    const targetElement = document.querySelector('#clinic-introduction')
    targetElement.scrollIntoView({ behavior: 'smooth' })
    this.setState({
      isFocus: type,
    })
  }

  handleClickViewDoctor = (type) => {
    const targetElement = document.querySelector('#clinic-doctor')
    targetElement.scrollIntoView({ behavior: 'smooth' })
    this.setState({
      isFocus: type,
    })
  }

  render() {
    let filteredArrDoctor = this.state.filteredArrDoctor
    let clinicData = this.state.clinicData

    return (
      <div className="clinic-detail">
        <HeaderHomePage />
        <div className="clinic-top-wrapper">
          <div className="img-background">
            <img src={clinicData ? clinicData.image : ''} alt="" />
          </div>

          <div className="clinic-wrapper wrapper">
            <div className="clinic-content wrapper">
              <div className="clinic-header">
                <div className="clinic-information">
                  <div className="clinic-information-left">
                    <img
                      className="img-logo"
                      alt=""
                      src={clinicData ? clinicData.logo : ''}
                    />
                  </div>
                  <div className="clinic-information-right">
                    <div className="clinic-name-address">
                      <h1 className="clinic-name">
                        {clinicData ? clinicData.name : ''}
                      </h1>
                      <h4>{clinicData ? clinicData.address : ''}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clinic-menu wrapper">
              <div
                className={
                  this.state.isFocus === 'introduction'
                    ? 'clinic-menu-introduction focus'
                    : 'clinic-menu-introduction'
                }
                onClick={() => this.handleClickViewIntroduction('introduction')}
              >
                <FormattedMessage id="homepage.clinic.introduction" />
              </div>
              <div
                className={
                  this.state.isFocus === 'doctor'
                    ? 'clinic-menu-doctor focus'
                    : 'clinic-menu-doctor'
                }
                onClick={() => this.handleClickViewDoctor('doctor')}
              >
                <FormattedMessage id="homepage.clinic.doctor" />
              </div>
            </div>

            <div className="clinic-information1">
              <FormattedMessage id="homepage.clinic.intro1" />
            </div>

            <div className="clinic-information2">
              <FormattedMessage id="homepage.clinic.intro2.title" />
              <ul className="info-list">
                <li>
                  <FormattedMessage id="homepage.clinic.intro2.list1" />
                </li>
                <li>
                  <FormattedMessage id="homepage.clinic.intro2.list2" />
                </li>
                <li>
                  <FormattedMessage id="homepage.clinic.intro2.list3" />
                </li>
                <li>
                  <FormattedMessage id="homepage.clinic.intro2.list4" />
                </li>
              </ul>
            </div>

            <div className="clinic-introduction">
              <div
                className=" clinic-introduction-title clinic-title"
                id="clinic-introduction"
              >
                <FormattedMessage id="homepage.clinic.introduction" />
              </div>
              <div
                className="clinic-data"
                dangerouslySetInnerHTML={{
                  __html: clinicData.descriptionHTML,
                }}
              />
            </div>

            <div className="clinic-doctor-list" id="clinic-doctor">
              <div className="clinic-doctor-list-title clinic-title">
                <FormattedMessage id="homepage.clinic.doctor" />
              </div>
              {filteredArrDoctor &&
                filteredArrDoctor.length > 0 &&
                filteredArrDoctor.map((doctor, index) => {
                  return (
                    <DoctorScheduleClinicInfo doctor={doctor} key={index} />
                  )
                })}
            </div>
          </div>
        </div>
        <FooterHomePage />
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail)
