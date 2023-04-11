import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './ClinicDetail.scss'
import DoctorScheduleClinicInfo from '../../../components/DoctorScheduleClinicInfo'
import { handleGetDoctorInSpecialist } from '../../../services/specialistService'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import img from '../../../assets/clinic/2019_Homepage_Featured.jpg'
import HomeFooter from '../../HomePage/HomeFooter'
class ClinicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredArrDoctor: [],
    }
  }

  async componentDidMount() {
    // let specialistId = this.props.match.params.id
    // this.setState({
    //   specialistId: specialistId,
    // })
    // let doctorResponse = await handleGetDoctorInSpecialist(specialistId)
    // if (doctorResponse && doctorResponse.errCode === 0) {
    //   let dataDoctor = doctorResponse.data
    //   this.setState({
    //     filteredArrDoctor: dataDoctor,
    //   })
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let filteredArrDoctor = this.state.filteredArrDoctor
    return (
      <>
        <HeaderHomePage />
        <div className="clinic-top-wrapper">
          <div className="img-background">
            <img src={img} alt="" />
          </div>

          <div className="clinic-wrapper wrapper">
            <div className="clinic-content wrapper">
              <div className="clinic-header">
                <div className="clinic-information">
                  <div className="clinic-information-left">
                    <img className="img-logo" alt="" />
                  </div>
                  <div className="clinic-information-right">
                    <div className="clinic-name-address">
                      <h1 className="clinic-name">dsadadasds</h1>
                      <h4>dasdasd</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clinic-menu wrapper">
              <div className="clinic-menu-introduction">Gioi thieu</div>
              <div className="clinic-menu-docto">Bac Si</div>
            </div>

            <div className="clinic-information1">
              HealthCare Consultancy is Houston's leading comprehensive
              healthcare platform connecting users with over 200 prestigious
              hospitals - clinics, more than 1,500 good specialists and
              thousands of quality medical products and good services.
            </div>

            <div className="clinic-information2">
              From now on, patients can book a clinic at the University Hospital
              of Medicine and Pharmacy 1 through the BookingCare booking system.
              <ul className="info-list">
                <li>Be selected to examine with experienced specialists</li>
                <li>
                  Support to book online before going to the doctor (free of
                  charge)
                </li>
                <li>Reduce waiting time in line for medical check-in</li>
                <li>Receive detailed examination instructions after booking</li>
              </ul>
            </div>
            <div className="clinic-doctor-list">
              <div className="clinic-doctor-list-title clinic-title">
                Bac Si
              </div>
            </div>

            <div className="clinic-introduction">
              <div className=" clinic-introduction-title clinic-title">
                gioi thieu
              </div>
            </div>
          </div>
        </div>

        <HomeFooter />

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
      </>
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
