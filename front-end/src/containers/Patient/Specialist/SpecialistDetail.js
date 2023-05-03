import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './SpecialistDetail.scss'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import FooterHomePage from '../../HomePage/FooterHomePage'
import {
  handleGetSpecialistById,
  handleGetDoctorInSpecialist,
} from '../../../services/specialistService'
import { handleGetAllCode } from '../../../services/userService'
import { CommonUtils } from '../../../utils'
import { LANGUAGES } from '../../../utils'
import '../Doctor/DoctorSchedule.scss'
import DoctorScheduleClinicInfo from '../../../components/DoctorScheduleClinicInfo'
class SpecialistDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialistId: '',
      currentSpecialist: {},
      allDoctorInspecialist: {},
      isSeemore: false,
      arrDoctor: [],
      filteredArrDoctor: [],
      arrCity: [],
    }
  }

  async componentDidMount() {
    //#region  Get specialist information by id
    if (this.props && this.props.match && this.props.match.params) {
      let specialistId = this.props.match.params.id
      this.setState({
        specialistId: specialistId,
      })

      let response = await handleGetSpecialistById(specialistId)
      if (response && response.errCode === 0) {
        let currentSpecialist = response.data
        currentSpecialist.image = CommonUtils.convertBufferToBase64(
          currentSpecialist.image
        )
        this.setState({
          currentSpecialist: currentSpecialist,
        })
      }

      let doctorResponse = await handleGetDoctorInSpecialist(specialistId)
      if (doctorResponse && doctorResponse.errCode === 0) {
        let dataDoctor = doctorResponse.data

        this.setState({
          arrDoctor: dataDoctor,
          filteredArrDoctor: dataDoctor,
        })
      }
    }
    //#endregion

    let cityResponse = await handleGetAllCode('CITY')
    if (cityResponse && cityResponse.errCode === 0) {
      let cityData = cityResponse.type

      if (cityData.length > 0) {
        // move the last element to the top
        let lastCity = cityData.pop()
        cityData.unshift(lastCity)
        this.setState({
          arrCity: cityData,
        })
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleClickSeeMore = () => {
    this.setState({
      isSeemore: !this.state.isSeemore,
    })
  }

  handleCity = (event) => {
    // filter arrDoctor with selected city
    let arrDoctor = this.state.arrDoctor
    let cityKeymap = event.target.value
    console.log(cityKeymap)
    console.log(arrDoctor)

    if (cityKeymap === 'CT0') {
      this.setState({
        filteredArrDoctor: this.state.arrDoctor,
      })
    } else {
      let filteredArrDoctor = arrDoctor.filter(
        (doctor) => doctor.clinicData.cityData.keyMap === cityKeymap
      )
      this.setState({
        filteredArrDoctor: filteredArrDoctor,
      })
    }
  }

  render() {
    let filteredArrDoctor = this.state.filteredArrDoctor
    let arrCity = this.state.arrCity
    let language = this.props.language
    let currentSpecialist = this.state.currentSpecialist
    let specialistDetailHTML = this.state.currentSpecialist.descriptionHTML

    return (
      <div className="container-specialist">
        <HeaderHomePage />
        <div
          className="specialist-top"
          style={{
            backgroundImage: `url(${currentSpecialist.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
          }}
        >
          <div className="specialist-detail-transparent ">
            <div className="specialist-detail-wrapper wrapper">
              <div
                className={
                  this.state.isSeemore
                    ? 'specialist-detail see-more'
                    : 'specialist-detail '
                }
                dangerouslySetInnerHTML={{ __html: specialistDetailHTML }}
              ></div>
              <span onClick={() => this.handleClickSeeMore()}>
                {this.state.isSeemore ? 'See less' : 'See more'}
              </span>
            </div>
          </div>
        </div>
        <div className="specialist-bottom">
          <div className="specialist-content-wrapper wrapper">
            <select
              className="doctor-city"
              defaultValue="CT0"
              onChange={(event) => this.handleCity(event)}
            >
              {arrCity &&
                arrCity.length > 0 &&
                arrCity.map((city, index) => {
                  return (
                    <option value={city.keyMap} key={index}>
                      {language === LANGUAGES.EN
                        ? city.valueEN
                        : language === LANGUAGES.VI
                        ? city.valueVI
                        : city.valueES}
                    </option>
                  )
                })}
            </select>
            {filteredArrDoctor &&
              filteredArrDoctor.length > 0 &&
              filteredArrDoctor.map((doctor, index) => {
                return (
                  /* <div className="specialist-content">
                    <div className="specialist-content-left">
                      <ProfileDoctor
                        doctorId={doctor.doctorId}
                        cityData={doctor.clinicData.cityData}
                        key={index}
                        specialist={true}
                      />
                    </div>
                    <div className="specialist-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule
                          doctorId={doctor.doctorId}
                          key={index}
                        />
                      </div>
                      <DoctorClinicInfo
                        doctorId={doctor.doctorId}
                        specialist={true}
                      />
                    </div>
                  </div> */

                  <DoctorScheduleClinicInfo doctor={doctor} key={index} />
                )
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistDetail)
